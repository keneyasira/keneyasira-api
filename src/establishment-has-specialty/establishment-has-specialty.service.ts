import { Injectable, NotFoundException } from '@nestjs/common';

import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { Establishment } from '../establishment/models/establishment.model';
import { Specialty } from '../specialty/models/specialty.model';
import { QueryParams } from '../typings/query.typings';
import { transformSortParamsToSequelizeFormat } from '../utils/sequelize.helpers';
import { CreateEstablishmentHasSpecialtyDto } from './dtos/create-establishment-has-specialty.dto';
import {
    EstablishmentHasSpecialty,
    EstablishmentHasSpecialtyAttributes,
} from './models/establishment-has-specialty.model';

@Injectable()
export class EstablishmentHasSpecialtyService {
    constructor(private readonly logger: ApplicationLoggerService) {}

    async findAndCountAll(
        options: QueryParams,
    ): Promise<{ data: EstablishmentHasSpecialtyAttributes[]; total: number }> {
        const offset = options?.limit && options.page ? options.limit * (options.page - 1) : 0;

        const { rows: data, count: total } = await EstablishmentHasSpecialty.findAndCountAll({
            limit: options?.limit,
            offset,
            order: transformSortParamsToSequelizeFormat(options.sort),
            include: [
                {
                    model: Establishment,
                },
                {
                    model: Specialty,
                },
            ],
        });

        return { data: data.map((row) => row.get({ plain: true })), total };
    }

    async find(establishmentHasSpecialtyId: string) {
        const establishmentHasSpecialtyToFind = (
            await EstablishmentHasSpecialty.findByPk(establishmentHasSpecialtyId, {
                include: [{ model: Establishment }, { model: Specialty }],
            })
        )?.get({ plain: true });

        if (!establishmentHasSpecialtyToFind) {
            throw new NotFoundException('Establishment Has Specialty not found');
        }

        return { data: establishmentHasSpecialtyToFind };
    }

    async create(createEstablishmentHasSpecialtyDto: CreateEstablishmentHasSpecialtyDto) {
        const createdEstablishmentHasSpecialty = (
            await EstablishmentHasSpecialty.create(createEstablishmentHasSpecialtyDto)
        ).get({ plain: true });

        if (!createdEstablishmentHasSpecialty) {
            throw new Error('Establishment Has Specialty could not be created');
        }

        this.logger.info(`EstablishmentHasSpecialtyService - Created establishment-has-specialty`, {
            createdEstablishmentHasSpecialty,
        });

        const establishmentHasSpecialty = (
            await EstablishmentHasSpecialty.findByPk(createdEstablishmentHasSpecialty.id, {
                include: [{ model: Establishment }, { model: Specialty }],
            })
        )?.get({ plain: true });

        return { data: establishmentHasSpecialty };
    }

    async delete(establishmentHasSpecialtyToDeleteId: string) {
        const deletedCount = await EstablishmentHasSpecialty.destroy({
            where: { id: establishmentHasSpecialtyToDeleteId },
        });

        if (!deletedCount) {
            throw new NotFoundException('Establishment Has Specialty not found');
        }

        this.logger.info(
            `EstablishmentHasSpecialtyService - deleted (${deletedCount}) establishmentHasSpecialty`,
            {
                establishmentHasSpecialtyToDeleteId,
            },
        );
    }
}
