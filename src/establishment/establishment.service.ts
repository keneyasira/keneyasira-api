import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstablishmentDto } from './dtos/create-establishment.dto';
import { UpdateEstablishmentDto } from './dtos/update-establishment.dto';
import { ApplicationLoggerService } from 'src/core/logger/application.logger.service';
import { Establishment, EstablishmentAttributes } from './models/establishment.model';
import { transformSortParamsToSequelizeFormat } from 'src/utils/sequelize.helpers';
import { QueryParams } from 'src/typings/query.typings';
import OpenLocationCode from 'open-location-code-typescript';

@Injectable()
export class EstablishmentService {
    constructor(private readonly logger: ApplicationLoggerService) {}

    async findAndCountAll(
        options: QueryParams,
    ): Promise<{ data: EstablishmentAttributes[]; total: number }> {
        const offset = options?.limit && options.page ? options.limit * (options.page - 1) : 0;

        const { rows: data, count: total } = await Establishment.findAndCountAll({
            limit: options?.limit,
            offset,
            order: transformSortParamsToSequelizeFormat(options.sort),
            raw: true,
        });

        return { data, total };
    }

    async find(establishmentId: string) {
        // Implement the logic to find a single establishment
        const establishment = (await Establishment.findByPk(establishmentId))?.get({ plain: true });

        if (!establishment) {
            throw new NotFoundException('Establishment not found');
        }

        return establishment;
    }

    async create(createEstablishmentDto: CreateEstablishmentDto) {
        // Implement the logic to create an establishment
        const createdEstablishment = await Establishment.create(createEstablishmentDto);

        const createdEstablishmentValue = createdEstablishment.get({ plain: true });

        this.logger.info(`Created establishment`, {
            createdEstablishment: createdEstablishmentValue,
        });

        return createdEstablishmentValue;
    }

    async update(updateEstablishmentDto: UpdateEstablishmentDto) {

        const [affectedRows, [updatedEstablishment]] = await Establishment.update(
            {
                ...updateEstablishmentDto,
            },
            {
                where: {
                    id: updateEstablishmentDto.id,
                },
                returning: true,
            },
        );

        if (!affectedRows) {
            throw new NotFoundException('Establishment not found');
        }

        const updatedEstablishmentValue = updatedEstablishment.get({ plain: true });

        this.logger.info(`Updated (${affectedRows}) establishment`, {
            updatedEstablishment: updatedEstablishmentValue,
        });

        return updatedEstablishmentValue;
    }

    async delete(establishmentId: string) {
        const deletedCount = await Establishment.destroy({
            where: {
                id: establishmentId,
            },
        });

        if (!deletedCount) {
            throw new NotFoundException('Establishment not found');
        }

        this.logger.info(`EstablishmentService - deleted (${deletedCount}) establishment`, {
            establishmentId,
        });
    }
}
