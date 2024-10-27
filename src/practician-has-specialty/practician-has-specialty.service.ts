import { Injectable, NotFoundException } from '@nestjs/common';

import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { Practician } from '../practician/models/practician.model';
import { Specialty } from '../specialty/models/specialty.model';
import { QueryParams } from '../typings/query.typings';
import { transformSortParamsToSequelizeFormat } from '../utils/sequelize.helpers';
import { CreatePracticianHasSpecialtyDto } from './dtos/create-practician-has-specialty.dto';
import {
    PracticianHasSpecialty,
    PracticianHasSpecialtyAttributes,
} from './models/practician-has-specialty.model';

@Injectable()
export class PracticianHasSpecialtyService {
    constructor(private readonly logger: ApplicationLoggerService) {}

    async findAndCountAll(
        options: QueryParams,
    ): Promise<{ data: PracticianHasSpecialtyAttributes[]; total: number }> {
        const offset = options?.limit && options.page ? options.limit * (options.page - 1) : 0;

        const { rows: data, count: total } = await PracticianHasSpecialty.findAndCountAll({
            limit: options?.limit,
            offset,
            order: transformSortParamsToSequelizeFormat(options.sort),
            include: [
                {
                    model: Practician,
                },
                {
                    model: Specialty,
                },
            ],
        });

        return { data: data.map((row) => row.get({ plain: true })), total };
    }

    async find(practicianHasSpecialtyId: string) {
        const practicianHasSpecialtyToFind = (
            await PracticianHasSpecialty.findByPk(practicianHasSpecialtyId, {
                include: [{ model: Practician }, { model: Specialty }],
            })
        )?.get({ plain: true });

        if (!practicianHasSpecialtyToFind) {
            throw new NotFoundException('Practician Has Specialty not found');
        }

        return { data: [practicianHasSpecialtyToFind] };
    }

    async create(createPracticianHasSpecialtyDto: CreatePracticianHasSpecialtyDto) {
        const createdPracticianHasSpecialty = (
            await PracticianHasSpecialty.create(createPracticianHasSpecialtyDto)
        ).get({ plain: true });

        if (!createdPracticianHasSpecialty) {
            throw new Error('Practician Has Specialty could not be created');
        }

        this.logger.info(`PracticianHasSpecialtyService - Created user-role`, {
            createdPracticianHasSpecialty,
        });

        const practicianHasSpecialty = (
            await PracticianHasSpecialty.findByPk(createdPracticianHasSpecialty.id, {
                include: [{ model: Practician }, { model: Specialty }],
            })
        )?.get({ plain: true });

        return { data: [practicianHasSpecialty] };
    }

    async delete(practicianHasSpecialtyToDeleteId: string) {
        const deletedCount = await PracticianHasSpecialty.destroy({
            where: { id: practicianHasSpecialtyToDeleteId },
        });

        if (!deletedCount) {
            throw new NotFoundException('Practician Has Specialty not found');
        }

        this.logger.info(
            `PracticianHasSpecialtyService - deleted (${deletedCount}) practicianHasSpecialty`,
            {
                practicianHasSpecialtyToDeleteId,
            },
        );
    }
}
