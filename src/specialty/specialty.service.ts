import { Injectable, NotFoundException } from '@nestjs/common';

import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { QueryParams } from '../typings/query.typings';
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
        });

        return { data: data.map((row) => row.get({ plain: true })), total };
    }

    async find(SpecialtyId: string) {
        const specialty = await Specialty.findOne({
            where: {
                id: SpecialtyId,
            },
        });

        if (!specialty) {
            throw new NotFoundException('Specialty not found');
        }

        return { data: specialty.get({ plain: true }) };
    }

    async create(createSpecialtyDto: CreateSpecialtyDto) {
        const [createdSpecialty, _] = await Specialty.findOrCreate({
            where: {
                name: createSpecialtyDto.name,
            },
            defaults: createSpecialtyDto,
        });

        const createdSpecialtyValue = createdSpecialty.get({ plain: true });

        this.logger.info(`Created specialty`, { createdSpecialty: createdSpecialtyValue });

        return { data: createdSpecialtyValue };
    }

    async update(updateSpecialtyDto: UpdateSpecialtyDto) {
        const [affectedRows, [updatedSpecialty]] = await Specialty.update(
            {
                ...updateSpecialtyDto,
            },
            {
                where: {
                    id: updateSpecialtyDto.id,
                },
                returning: true,
            },
        );

        if (!affectedRows) {
            throw new NotFoundException('Specialty not found');
        }

        const updatedSpecialtyValue = updatedSpecialty.get({ plain: true });

        this.logger.info(`Updated (${affectedRows}) specialty`, {
            updatedSpecialty: updatedSpecialtyValue,
        });

        return { data: updatedSpecialtyValue };
    }

    async delete(specialtyToDeleteId: string): Promise<number> {
        const deletedCount = await Specialty.destroy({
            where: { id: specialtyToDeleteId },
        });

        this.logger.info(`deleted (${deletedCount}) specialty(ies)`, {
            specialtyToDeleteId,
        });

        return deletedCount;
    }
}
