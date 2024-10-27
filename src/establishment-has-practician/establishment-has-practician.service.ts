import { Injectable, NotFoundException } from '@nestjs/common';

import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { Establishment } from '../establishment/models/establishment.model';
import { Practician } from '../practician/models/practician.model';
import { QueryParams } from '../typings/query.typings';
import { transformSortParamsToSequelizeFormat } from '../utils/sequelize.helpers';
import { CreateEstablishmentHasPracticianDto } from './dtos/create-establishment-has-practician.dto';
import {
    EstablishmentHasPractician,
    EstablishmentHasPracticianAttributes,
} from './models/establishment-has-practician.model';

@Injectable()
export class EstablishmentHasPracticianService {
    constructor(private readonly logger: ApplicationLoggerService) {}

    async findAndCountAll(
        options: QueryParams,
    ): Promise<{ data: EstablishmentHasPracticianAttributes[]; total: number }> {
        const offset = options?.limit && options.page ? options.limit * (options.page - 1) : 0;

        const { rows: data, count: total } = await EstablishmentHasPractician.findAndCountAll({
            limit: options?.limit,
            offset,
            order: transformSortParamsToSequelizeFormat(options.sort),
            include: [
                {
                    model: Establishment,
                },
                {
                    model: Practician,
                },
            ],
        });

        return { data: data.map((row) => row.get({ plain: true })), total };
    }

    async find(establishmentHasPracticianId: string) {
        const establishmentHasPracticianToFind = (
            await EstablishmentHasPractician.findByPk(establishmentHasPracticianId, {
                include: [{ model: Establishment }, { model: Practician }],
            })
        )?.get({ plain: true });

        if (!establishmentHasPracticianToFind) {
            throw new NotFoundException('Establishment Has Practician not found');
        }

        return { data: [establishmentHasPracticianToFind] };
    }

    async create(createEstablishmentHasPracticianDto: CreateEstablishmentHasPracticianDto) {
        const createdEstablishmentHasPractician = (
            await EstablishmentHasPractician.create(createEstablishmentHasPracticianDto)
        ).get({ plain: true });

        if (!createdEstablishmentHasPractician) {
            throw new Error('Establishment Has Practician could not be created');
        }

        this.logger.info(
            `EstablishmentHasPracticianService - Created establishment-has-practician`,
            {
                createdEstablishmentHasPractician,
            },
        );

        const establishmentHasPractician = (
            await EstablishmentHasPractician.findByPk(createdEstablishmentHasPractician.id, {
                include: [{ model: Establishment }, { model: Practician }],
            })
        )?.get({ plain: true });

        return { data: [establishmentHasPractician] };
    }

    async delete(establishmentHasPracticianToDeleteId: string) {
        const deletedCount = await EstablishmentHasPractician.destroy({
            where: { id: establishmentHasPracticianToDeleteId },
        });

        if (!deletedCount) {
            throw new NotFoundException('Establishment Has Practician not found');
        }

        this.logger.info(
            `EstablishmentHasPracticianService - deleted (${deletedCount}) establishmentHasPractician`,
            {
                establishmentHasPracticianToDeleteId,
            },
        );
    }
}
