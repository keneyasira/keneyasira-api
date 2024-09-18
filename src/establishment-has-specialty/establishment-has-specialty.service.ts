import { Injectable, NotFoundException } from '@nestjs/common';
import {
    EstablishmentHasSpecialty,
    EstablishmentHasSpecialtyAttributes,
} from './models/establishment-has-specialty.model';
import { ApplicationLoggerService } from 'src/core/logger/application.logger.service';
import { CreateEstablishmentHasSpecialtyDto } from './dtos/create-establishment-has-specialty.dto';
import { Specialty } from 'src/specialty/models/specialty.model';
import { Establishment } from 'src/establishment/models/establishment.model';
import { transformSortParamsToSequelizeFormat } from 'src/utils/sequelize.helpers';
import { QueryParams } from 'src/typings/query.typings';

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
            raw: true,
        });
        return { data, total };
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

        return establishmentHasSpecialtyToFind;
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

        return (
            await EstablishmentHasSpecialty.findByPk(createdEstablishmentHasSpecialty.id, {
                include: [{ model: Establishment }, { model: Specialty }],
            })
        )?.get({ plain: true });
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