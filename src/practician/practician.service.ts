import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { type Includeable, Op } from 'sequelize';

import { Appointment, AppointmentAttributes } from '../appointment/models/appointment.model';
import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { Establishment } from '../establishment/models/establishment.model';
import { Patient } from '../patient/models/patient.model';
import { Role } from '../role/models/role.model';
import { ROLE_NAMES } from '../role/role.service';
import { Specialty } from '../specialty/models/specialty.model';
import { TimeSlot, TimeSlotAttributes } from '../time-slot/models/time-slot.model';
import { QueryParams } from '../typings/query.typings';
import { User } from '../user/models/user.model';
import { UserRole } from '../user-role/models/user-role.model';
import {
    buildUserSearchQuery,
    transformSortParamsToSequelizeFormat,
} from '../utils/sequelize.helpers';
import { CreatePracticianDto } from './dtos/create-practician.dto';
import { UpdatePracticianDto } from './dtos/update-practician.dto';
import { PracticianDeletedEvent } from './events/practician.event';
import { Practician, PracticianAttributes } from './models/practician.model';

@Injectable()
export class PracticianService {
    constructor(
        private readonly logger: ApplicationLoggerService,
        private eventEmitter: EventEmitter2,
    ) {}

    async findAndCountAll(
        options: QueryParams,
    ): Promise<{ data: PracticianAttributes[]; total: number }> {
        const offset = options?.limit && options.page ? options.limit * (options.page - 1) : 0;

        const include: Includeable[] = [
            {
                model: User,
                where: buildUserSearchQuery(options.search),
            },
        ];

        if (options.search?.specialty) {
            include.push({
                model: Specialty,
                where: {
                    name: { [Op.iLike]: `%${options.search.specialty}%` },
                },
                required: true
            });
        }

        const { rows: data, count: total } = await Practician.findAndCountAll({
            limit: options?.limit,
            offset,
            order: transformSortParamsToSequelizeFormat(options.sort),
            include,
            distinct: true,
        });

        return { data: data.map((row) => row.get({ plain: true })), total };
    }

    async find(practicianId: string) {
        const practician = await Practician.findOne({
            where: {
                id: practicianId,
            },
            include: [
                {
                    model: User,
                },
            ],
        });

        if (!practician) {
            throw new NotFoundException('Practician not found');
        }

        return { data: practician.get({ plain: true }) };
    }

    async findPracticianTimeSlots(
        practicianId: string,
        options: QueryParams,
    ): Promise<{ data: TimeSlotAttributes[]; total: number }> {
        const offset = options?.limit && options.page ? options.limit * (options.page - 1) : 0;

        const { rows: data, count: total } = await TimeSlot.findAndCountAll({
            where: {
                practicianId: practicianId,
            },
            limit: options?.limit,
            offset,
            order: transformSortParamsToSequelizeFormat(options.sort),
        });

        return { data, total };
    }

    async findPracticianAppointments(
        practicianId: string,
        options: QueryParams,
    ): Promise<{ data: AppointmentAttributes[]; total: number }> {
        const offset = options?.limit && options.page ? options.limit * (options.page - 1) : 0;

        const { rows: data, count: total } = await Appointment.findAndCountAll({
            where: {
                practicianId: practicianId,
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

    async create(createPracticianPayload: CreatePracticianDto & { createdBy: string }) {
        // check if the User already exists with the same email or phone
        const [user, isCreated] = await User.findOrCreate({
            where: {
                [Op.or]: [
                    { phone: createPracticianPayload.phone ?? '[phone-undefined]' },
                    { email: createPracticianPayload.email ?? '[email-undefined]' },
                ],
            },
            defaults: { ...createPracticianPayload },
        });

        if (!isCreated) {
            throw new ConflictException('User already exists with the same email or phone');
        }

        const role = await Role.findOne({
            where: {
                name: ROLE_NAMES.PRACTICIAN,
            },
        });

        if (!role) {
            throw new NotFoundException('Practician role not found');
        }

        await UserRole.create({
            userId: user.id,
            roleId: role.id,
            createdBy: createPracticianPayload.createdBy,
        });

        const practician = await Practician.create({
            userId: user.id,
            createdBy: createPracticianPayload.createdBy,
        });

        const practicianValue = await this.find(practician.id);

        if (!practicianValue) {
            throw new Error('Practician could not be created');
        }

        // emit patient create event

        return practicianValue;
    }

    async update(updatePracticianPayload: UpdatePracticianDto & { updatedBy: string }) {
        const { id, ...userUpdateData } = updatePracticianPayload;

        const practicianToBeUpdated = await Practician.findOne({
            where: {
                id,
            },
            include: [
                {
                    model: User,
                },
            ],
        });

        if (!practicianToBeUpdated) {
            throw new NotFoundException('Practician not found');
        }

        const [affectedRows, _] = await User.update(
            {
                ...practicianToBeUpdated.user.get({ plain: true }),
                ...userUpdateData,
            },
            {
                where: {
                    id: practicianToBeUpdated.user.id,
                },
                returning: true,
            },
        );

        if (!affectedRows) {
            throw new NotFoundException('User associated with practician not found');
        }

        // emit practician update event

        return this.find(updatePracticianPayload.id);
    }

    async delete(deletePayload: { practicianId: string; deletedBy: string }): Promise<void> {
        const deletedCount = await Practician.destroy({
            where: {
                id: deletePayload.practicianId,
            },
        });

        if (!deletedCount) {
            throw new NotFoundException('Practician not found');
        }

        // emit practician delete event
        this.eventEmitter.emit(
            'practician.deleted',
            new PracticianDeletedEvent({
                practicianId: deletePayload.practicianId,
            }),
        );

        await Practician.update(
            { deletedBy: deletePayload.deletedBy },
            {
                where: {
                    id: deletePayload.practicianId,
                },
            },
        );

        // emit practician delete event

        this.logger.info(`PracticianService - deleted (${deletedCount}) practician`, {
            id: deletePayload.practicianId,
        });
    }
}
