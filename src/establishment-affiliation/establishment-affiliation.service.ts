import { Injectable, NotFoundException } from '@nestjs/common';

import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { QueryParams } from '../typings/query.typings';
import { transformSortParamsToSequelizeFormat } from '../utils/sequelize.helpers';
import { CreateEstablishmentAffiliationDto } from './dtos/create-establishment-affiliation.dto';
import { UpdateEstablishmentAffiliationDto } from './dtos/update-establishment-affiliation.dto';
import {
    EstablishmentAffiliation,
    EstablishmentAffiliationAttributes,
} from './models/establishment-affiliation.model';

@Injectable()
export class EstablishmentAffiliationService {
    constructor(private readonly logger: ApplicationLoggerService) {}

    async findAndCountAll(
        options: QueryParams,
    ): Promise<{ data: EstablishmentAffiliationAttributes[]; total: number }> {
        const offset = options?.limit && options.page ? options.limit * (options.page - 1) : 0;
        const { rows: data, count: total } = await EstablishmentAffiliation.findAndCountAll({
            limit: options?.limit,
            offset,
            order: transformSortParamsToSequelizeFormat(options.sort),
        });

        return {
            data: data.map((row) => row.get({ plain: true })),
            total,
        };
    }

    async find(EstablishmentAffiliationId: string) {
        const establishmentAffiliation = await EstablishmentAffiliation.findOne({
            where: {
                id: EstablishmentAffiliationId,
            },
        });

        if (!establishmentAffiliation) {
            throw new NotFoundException('Establishment affiliation not found');
        }

        const row = establishmentAffiliation.get({ plain: true });

        return { data: row };
    }

    async create(establishmentAffiliationData: CreateEstablishmentAffiliationDto) {
        const establishmentAffiliation = await EstablishmentAffiliation.create(establishmentAffiliationData);

        const createdEstablishmentAffiliationValue = establishmentAffiliation.get({ plain: true });

        this.logger.info(`Created establishment affiliation`, {
            createdEstablishmentAffiliation: createdEstablishmentAffiliationValue,
        });

        return { data: createdEstablishmentAffiliationValue };
    }

    async update(updateEstablishmentAffiliationDto: UpdateEstablishmentAffiliationDto) {
        const [affectedRows, [updatedEstablishmentAffiliation]] = await EstablishmentAffiliation.update(
            {
                ...updateEstablishmentAffiliationDto,
            },
            {
                where: {
                    id: updateEstablishmentAffiliationDto.id,
                },
                returning: true,
            },
        );

        if (!affectedRows) {
            throw new NotFoundException('Establishment affiliation not found');
        }

        return { data: updatedEstablishmentAffiliation.get({ plain: true }) };
    }

    async delete(EstablishmentAffiliationToDeleteId: string): Promise<void> {
        const deletedCount = await EstablishmentAffiliation.destroy({
            where: { id: EstablishmentAffiliationToDeleteId },
        });

        if (!deletedCount) {
            throw new NotFoundException('Establishment affiliation not found');
        }

        this.logger.info(`deleted (${deletedCount}) EstablishmentAffiliation`, {
            EstablishmentAffiliationToDeleteId,
        });
    }
}
