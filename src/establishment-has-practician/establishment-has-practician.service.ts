import { Injectable, NotFoundException } from '@nestjs/common';
import {
    EstablishmentHasPractician,
    EstablishmentHasPracticianAttributes,
} from './models/establishment-has-practician.model';
import { ApplicationLoggerService } from 'src/core/logger/application.logger.service';
import { CreateEstablishmentHasPracticianDto } from './dtos/create-establishment-has-practician.dto';
import { Practician } from 'src/practician/models/practician.model';
import { Establishment } from 'src/establishment/models/establishment.model';
import { transformSortParamsToSequelizeFormat } from 'src/utils/sequelize.helpers';
import { QueryParams } from 'src/typings/query.typings';

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
            raw: true,
        });
        return { data, total };
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

        return establishmentHasPracticianToFind;
    }

    async create(createEstablishmentHasPracticianDto: CreateEstablishmentHasPracticianDto) {
        const createdEstablishmentHasPractician = (
            await EstablishmentHasPractician.create(createEstablishmentHasPracticianDto)
        ).get({ plain: true });

        if (!createdEstablishmentHasPractician) {
            throw new Error('Establishment Has Practician could not be created');
        }

        this.logger.info(`EstablishmentHasPracticianService - Created establishment-has-practician`, {
            createdEstablishmentHasPractician,
        });

        return (
            await EstablishmentHasPractician.findByPk(createdEstablishmentHasPractician.id, {
                include: [{ model: Establishment }, { model: Practician }],
            })
        )?.get({ plain: true });
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