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
        });

        if (!specialty) {
            throw new NotFoundException('Specialty not found');
        }

        return specialty.get({ plain: true });
    }

    async create(
        createSpecialtyDto: CreateSpecialtyDto
    ): Promise<SpecialtyAttributes> {

        const createdSpecialty = await Specialty.create(createSpecialtyDto,
        );

        const createdSpecialtyValue = createdSpecialty.get({ plain: true });

        this.logger.info(`Created specialty`, { createdSpecialty: createdSpecialtyValue });

        return createdSpecialtyValue;
    }

    async update(
        updateSpecialtyDto: UpdateSpecialtyDto
    ): Promise<SpecialtyAttributes> {

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

        return updatedSpecialtyValue;
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
