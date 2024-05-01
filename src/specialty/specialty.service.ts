import { Injectable, NotFoundException } from '@nestjs/common';

import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { QueryParams } from '../typings/query.typings';
import { User } from '../user/models/user.model';
import { transformSortParamsToSequelizeFormat } from '../utils/sequelize.helpers';
import { CreateSpecialtyDto } from './dtos/create-specialty.dto';
import { UpdateSpecialtyDto } from './dtos/update-specialty.dto';
import { Specialty, SpecialtyAttributes } from './models/specialty.model';

@Injectable()
export class SpecialtyService {
    constructor(private readonly logger: ApplicationLoggerService) {}

    async findAndCountAll(
        options: QueryParams,
    ): Promise<{ data: SpecialtyAttributes[]; total: number }> {
        const offset = options?.limit && options.page ? options.limit * (options.page - 1) : 0;

        const { rows: data, count: total } = await Specialty.findAndCountAll({
            limit: options?.limit,
            offset,
            order: transformSortParamsToSequelizeFormat(options.sort),
            raw: true,
        });

        return { data, total };
    }

    async find(SpecialtyId: string): Promise<SpecialtyAttributes> {
        const specialty = await Specialty.findOne({
            where: {
                id: SpecialtyId,
            },
            raw: true,
        });

        if (!specialty) {
            throw new NotFoundException();
        }

        return specialty;
    }

    async create(
        createSpecialtyDto: CreateSpecialtyDto,
        connectedUserEmail: string,
    ): Promise<SpecialtyAttributes> {
        const connectedUser = await User.findOne({
            where: {
                email: connectedUserEmail,
            },
            raw: true,
        });

        const createdSpecialty = await Specialty.create(
            {
                ...createSpecialtyDto,
                createdBy: connectedUser?.id,
            },
            { raw: true },
        );

        const createdSpecialtyValue = createdSpecialty.toJSON();

        this.logger.info(`Created access group`, { createdSpecialty: createdSpecialtyValue });

        return createdSpecialtyValue;
    }

    async update(
        updateSpecialtyDto: UpdateSpecialtyDto,
        connectedUserEmail: string,
    ): Promise<SpecialtyAttributes> {
        const connectedUser = await User.findOne({
            where: {
                email: connectedUserEmail,
            },
            raw: true,
        });

        const [affectedRows, [updatedSpecialty]] = await Specialty.update(
            {
                ...updateSpecialtyDto,
                updatedBy: connectedUser?.id,
            },
            {
                where: {
                    id: updateSpecialtyDto.id,
                },
                returning: true,
            },
        );

        const updateSpecialtyValue = updatedSpecialty.toJSON();

        this.logger.info(`Updated (${affectedRows}) access group`, {
            updatedSpecialty: updateSpecialtyValue,
        });

        return updateSpecialtyValue;
    }

    async delete(SpecialtyToDeleteId: string, connectedUserEmail: string): Promise<number> {
        const connectedUser = await User.findOne({
            where: {
                email: connectedUserEmail,
            },
            raw: true,
        });

        const deletedCount = await Specialty.destroy({
            where: { id: SpecialtyToDeleteId },
        });

        await Specialty.update(
            {
                deletedBy: connectedUser?.id,
            },
            {
                where: { id: SpecialtyToDeleteId },
                paranoid: false,
            },
        );

        this.logger.info(`deleted (${deletedCount}) specialty(ies)`, {
            imageId: SpecialtyToDeleteId,
        });

        return deletedCount;
    }
}
