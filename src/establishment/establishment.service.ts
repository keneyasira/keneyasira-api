import { Injectable, NotFoundException } from '@nestjs/common';
import { Op } from 'sequelize';

import { Appointment, AppointmentAttributes } from '../appointment/models/appointment.model';
import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { EstablishmentAffiliation } from '../establishment-affiliation/models/establishment-affiliation.model';
import { EstablishmentType } from '../establishment-type/models/establishment-type.model';
import { Patient } from '../patient/models/patient.model';
import { Practician, type PracticianAttributes } from '../practician/models/practician.model';
import { Specialty } from '../specialty/models/specialty.model';
import { TimeSlot, TimeSlotAttributes } from '../time-slot/models/time-slot.model';
import { QueryParams } from '../typings/query.typings';
import { User } from '../user/models/user.model';
import {
    buildEstablishmentSearchQuery,
    transformSortParamsToSequelizeFormat,
} from '../utils/sequelize.helpers';
import { CreateEstablishmentDto } from './dtos/create-establishment.dto';
import { UpdateEstablishmentDto } from './dtos/update-establishment.dto';
import { Establishment, EstablishmentAttributes } from './models/establishment.model';

@Injectable()
export class EstablishmentService {
    constructor(private readonly logger: ApplicationLoggerService) {}

    async findAndCountAll(
        options: QueryParams,
    ): Promise<{ data: EstablishmentAttributes[]; total: number }> {
        const offset = options?.limit && options.page ? options.limit * (options.page - 1) : 0;

        const include = [];

        if (options.establishmentSearch?.specialty || options.establishmentSearch?.nameSearch) {
            include.push({
                model: Specialty,
                through: { attributes: [] },
                where: {
                    name: {
                        [Op.iLike]: `%${options.establishmentSearch.specialty ?? options.establishmentSearch?.nameSearch}%`,
                    },
                },
                attributes: ['id', 'name'],
                required: true,
            });
        }

        const { rows: data, count: total } = await Establishment.findAndCountAll({
            limit: options?.limit,
            offset,
            order: transformSortParamsToSequelizeFormat(options.sort),
            where: buildEstablishmentSearchQuery(options.establishmentSearch),
            include: [
                { model: EstablishmentAffiliation, attributes: ['id', 'name'] },
                { model: EstablishmentType, attributes: ['id', 'name'] },
                ...include,
            ],
            distinct: true,
        });

        return { data: data.map((row) => row.get({ plain: true })), total };
    }

    async find(establishmentId: string) {
        // Implement the logic to find a single establishment
        const establishment = (
            await Establishment.findByPk(establishmentId, {
                include: [
                    {
                        model: Specialty,
                        through: { attributes: [] },
                        attributes: ['id', 'name'],
                    },
                    { model: EstablishmentAffiliation, attributes: ['id', 'name'] },
                    { model: EstablishmentType, attributes: ['id', 'name'] },
                ],
            })
        )?.get({ plain: true });

        if (!establishment) {
            throw new NotFoundException('Establishment not found');
        }

        return { data: establishment };
    }

    async findEstablishmentTimeSlots(
        establishmentId: string,
        options: QueryParams,
    ): Promise<{ data: TimeSlotAttributes[]; total: number }> {
        const offset = options?.limit && options.page ? options.limit * (options.page - 1) : 0;

        const { rows: data, count: total } = await TimeSlot.findAndCountAll({
            where: {
                establishmentId: establishmentId,
            },
            limit: options?.limit,
            offset,
            order: transformSortParamsToSequelizeFormat(options.sort),
        });

        return { data: data.map((row) => row.get({ plain: true })), total };
    }

    async findEstablishmentAppointments(
        establishmentId: string,
        options: QueryParams,
    ): Promise<{ data: AppointmentAttributes[]; total: number }> {
        const offset = options?.limit && options.page ? options.limit * (options.page - 1) : 0;

        const { rows: data, count: total } = await Appointment.findAndCountAll({
            where: {
                establishmentId: establishmentId,
            },
            include: [
                {
                    model: Practician,
                    include: [
                        {
                            model: User,
                        },
                    ],
                },
                {
                    model: Establishment,
                },
                {
                    model: Patient,
                    include: [
                        {
                            model: User,
                        },
                    ],
                },
                {
                    model: TimeSlot,
                },
            ],
            limit: options?.limit,
            offset,
            order: transformSortParamsToSequelizeFormat(options.sort),
        });

        return { data: data.map((row) => row.get({ plain: true })), total };
    }

    async findEstablishmentPracticians(
        establishmentId: string,
        options: QueryParams,
    ): Promise<{ data: PracticianAttributes[]; total: number }> {
        const offset = options?.limit && options.page ? options.limit * (options.page - 1) : 0;

        const { rows: data, count: total } = await Practician.findAndCountAll({
            include: [
                {
                    model: Establishment,
                    where: {
                        id: establishmentId,
                    },
                    attributes: [],
                    required: true,
                    through: { attributes: [] },
                },
            ],
            limit: options?.limit,
            offset,
            order: transformSortParamsToSequelizeFormat(options.sort),
        });

        return { data: data.map((row) => row.get({ plain: true })), total };
    }

    async create(createEstablishmentDto: CreateEstablishmentDto) {
        const { type, affiliation, ...createPayload } = createEstablishmentDto;
        //get establishment type
        const establishmentType = await EstablishmentType.findOne({
            where: { name: type },
            attributes: ['id'],
        });

        if (!establishmentType) {
            throw new NotFoundException('Establishment Type not found');
        }

        //get establishment affiliation
        const establishmentAffiliation = await EstablishmentAffiliation.findOne({
            where: { name: affiliation },
            attributes: ['id'],
        });

        if (!establishmentAffiliation) {
            throw new NotFoundException('Establishment Affiliation not found');
        }

        // Implement the logic to create an establishment
        const createdEstablishment = await Establishment.create({
            ...createPayload,
            establishmentTypeId: establishmentType.id,
            establishmentAffiliationId: establishmentAffiliation.id,
        });

        const createdEstablishmentValue = createdEstablishment.get({ plain: true });

        this.logger.info(`Created establishment`, {
            createdEstablishment: createdEstablishmentValue,
        });

        return { data: createdEstablishmentValue };
    }

    async update(updateEstablishmentDto: UpdateEstablishmentDto) {
        const { type, affiliation, ...updatePayload } = updateEstablishmentDto;
        let establishmentTypeId, establishmentAffiliationId;

        if (type) {
            //get establishment type
            const establishmentType = await EstablishmentType.findOne({
                where: { name: type },
                attributes: ['id'],
            });

            if (!establishmentType) {
                throw new NotFoundException('Establishment Type not found');
            }

            establishmentTypeId = establishmentType.id;
        }

        if (affiliation) {
            //get establishment affiliation
            const establishmentAffiliation = await EstablishmentAffiliation.findOne({
                where: { name: affiliation },
                attributes: ['id'],
            });

            if (!establishmentAffiliation) {
                throw new NotFoundException('Establishment Affiliation not found');
            }

            establishmentAffiliationId = establishmentAffiliation.id;
        }

        const [affectedRows, [updatedEstablishment]] = await Establishment.update(
            {
                ...updatePayload,
                ...(establishmentTypeId ? { establishmentTypeId } : {}),
                ...(establishmentAffiliationId ? { establishmentAffiliationId } : {}),
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

        return { data: updatedEstablishmentValue };
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
