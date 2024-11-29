import { Injectable, NotFoundException } from '@nestjs/common';

import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { QueryParams } from '../typings/query.typings';
import { transformSortParamsToSequelizeFormat } from '../utils/sequelize.helpers';
import { CreateEstablishmentTypeDto } from './dtos/create-establishment-type.dto';
import { UpdateEstablishmentTypeDto } from './dtos/update-establishment-type.dto';
import { EstablishmentType, EstablishmentTypeAttributes } from './models/establishment-type.model';

@Injectable()
export class EstablishmentTypeService {
    constructor(private readonly logger: ApplicationLoggerService) {}

    async findAndCountAll(
        options: QueryParams,
    ): Promise<{ data: EstablishmentTypeAttributes[]; total: number }> {
        const offset = options?.limit && options.page ? options.limit * (options.page - 1) : 0;
        const { rows: data, count: total } = await EstablishmentType.findAndCountAll({
            limit: options?.limit,
            offset,
            order: transformSortParamsToSequelizeFormat(options.sort),
        });

        return {
            data: data.map((row) => row.get({ plain: true })),
            total,
        };
    }

    async find(EstablishmentTypeId: string) {
        const establishmentType = await EstablishmentType.findOne({
            where: {
                id: EstablishmentTypeId,
            },
        });

        if (!establishmentType) {
            throw new NotFoundException('Establishment type not found');
        }

        const row = establishmentType.get({ plain: true });

        return { data: row };
    }

    async create(establishmentTypeData: CreateEstablishmentTypeDto) {
        const establishmentType = await EstablishmentType.create(establishmentTypeData);

        const createdEstablishmentTypeValue = establishmentType.get({ plain: true });

        this.logger.info(`Created establishment type`, {
            createdEstablishmentType: createdEstablishmentTypeValue,
        });

        return { data: createdEstablishmentTypeValue };
    }

    async update(updateEstablishmentTypeDto: UpdateEstablishmentTypeDto) {
        const [affectedRows, [updatedEstablishmentType]] = await EstablishmentType.update(
            {
                ...updateEstablishmentTypeDto,
            },
            {
                where: {
                    id: updateEstablishmentTypeDto.id,
                },
                returning: true,
            },
        );

        if (!affectedRows) {
            throw new NotFoundException('Establishment type not found');
        }

        return { data: updatedEstablishmentType.get({ plain: true }) };
    }

    async delete(EstablishmentTypeToDeleteId: string): Promise<void> {
        const deletedCount = await EstablishmentType.destroy({
            where: { id: EstablishmentTypeToDeleteId },
        });

        if (!deletedCount) {
            throw new NotFoundException('Establishment type not found');
        }

        this.logger.info(`deleted (${deletedCount}) EstablishmentType`, {
            EstablishmentTypeToDeleteId,
        });
    }
}
