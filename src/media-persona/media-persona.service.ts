import { Injectable, NotFoundException } from '@nestjs/common';

import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { Media } from '../media/models/media.model';
import { Persona } from '../persona/models/persona.model';
import { QueryParams } from '../typings/query.typings';
import { User } from '../user/models/user.model';
import { transformSortParamsToSequelizeFormat } from '../utils/sequelize.helpers';
import { CreateMediaPersonaDto } from './dtos/create-media-persona.dto';
import { MediaPersona, MediaPersonaAttributes } from './models/media-persona.model';

@Injectable()
export class MediaPersonaService {
    constructor(private readonly logger: ApplicationLoggerService) {}

    async findAndCountAll(
        options: QueryParams,
    ): Promise<{ data: MediaPersonaAttributes[]; total: number }> {
        const offset = options?.limit && options.page ? options.limit * (options.page - 1) : 0;

        const { rows, count: total } = await MediaPersona.findAndCountAll({
            limit: options?.limit,
            offset,
            order: transformSortParamsToSequelizeFormat(options.sort),
            include: [
                {
                    model: Media,
                    attributes: ['id', 'title', 'url'],
                },
                {
                    model: Persona,
                    attributes: ['id', 'title'],
                },
            ],
        });

        const data = rows.map((row) => row.toJSON());

        return { data, total };
    }

    async find(mediaPersonaId: string): Promise<MediaPersonaAttributes> {
        const mediaPersona = await MediaPersona.findOne({
            where: {
                id: mediaPersonaId,
            },
            include: [
                {
                    model: Media,
                    attributes: ['id', 'title', 'url'],
                },
                {
                    model: Persona,
                    attributes: ['id', 'title'],
                },
            ],
        });

        if (!mediaPersona) {
            throw new NotFoundException();
        }

        return mediaPersona.toJSON();
    }

    async create(
        createMediaPersonaDto: CreateMediaPersonaDto,
        connectedUserEmail: string,
    ): Promise<MediaPersonaAttributes> {
        const connectedUser = await User.findOne({
            where: {
                email: connectedUserEmail,
            },
            raw: true,
        });

        if (!connectedUser) {
            throw new NotFoundException(`Connected user not found`);
        }

        const createdMediaPersona = await MediaPersona.create(
            {
                ...createMediaPersonaDto,
                createdBy: connectedUser?.id,
            },
            {
                returning: true,
            },
        );

        const createdMediaPersonaValue = createdMediaPersona.toJSON();

        this.logger.info(`MediaPersonaService - Created media persona`, {
            createdMediaPersona: createdMediaPersonaValue,
        });

        return createdMediaPersonaValue;
    }

    async delete(mediaPersonaToBeDeletedId: string, connectedUserEmail: string): Promise<number> {
        const connectedUser = await User.findOne({
            where: {
                email: connectedUserEmail,
            },
            raw: true,
        });

        const deletedCount = await MediaPersona.destroy({
            where: { id: mediaPersonaToBeDeletedId },
        });

        await MediaPersona.update(
            {
                deletedBy: connectedUser?.id,
            },
            {
                where: { id: mediaPersonaToBeDeletedId },
                paranoid: false,
            },
        );

        this.logger.info(`MediaPersonaService - deleted (${deletedCount}) media persona`, {
            mediaPersonaId: mediaPersonaToBeDeletedId,
        });

        return deletedCount;
    }
}
