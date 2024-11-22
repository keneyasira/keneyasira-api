import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Op } from 'sequelize';

import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { Role } from '../role/models/role.model';
import { ROLE_NAMES } from '../role/role.service';
import { QueryParams } from '../typings/query.typings';
import { User } from '../user/models/user.model';
import { UserRole } from '../user-role/models/user-role.model';
import { transformSortParamsToSequelizeFormat } from '../utils/sequelize.helpers';
import { CreatePatientDto } from './dtos/create-patient.dto';
import { UpdatePatientDto } from './dtos/update-patient.dto';
import { PatientDeletedEvent, PatientEvents } from './events/patient.event';
import { Patient, PatientAttributes } from './models/patient.model';

@Injectable()
export class PatientService {
    constructor(
        private readonly logger: ApplicationLoggerService,
        private eventEmitter: EventEmitter2,
    ) {}

    async findAndCountAll(
        options: QueryParams,
    ): Promise<{ data: PatientAttributes[]; total: number }> {
        const offset = options?.limit && options.page ? options.limit * (options.page - 1) : 0;

        const { rows: data, count: total } = await Patient.findAndCountAll({
            limit: options?.limit,
            offset,
            order: transformSortParamsToSequelizeFormat(options.sort),
            include: [
                {
                    model: User,
                },
            ],
        });

        return { data: data.map((row) => row.get({ plain: true })), total };
    }

    async find(patientId: string) {
        const patient = await Patient.findOne({
            where: {
                id: patientId,
            },
            include: [
                {
                    model: User,
                },
            ],
        });

        if (!patient) {
            throw new NotFoundException('Patient not found');
        }

        return { data: patient.get({ plain: true }) };
    }

    async create(createPatientDto: CreatePatientDto & { createdBy?: string }) {
        // check if the User already exists with the same email or phone
        const [user, isCreated] = await User.findOrCreate({
            where: {
                [Op.or]: [
                    {
                        email: createPatientDto.email ?? '[email-undefined]',
                    },
                    {
                        phone: createPatientDto.phone ?? '[phone-undefined]',
                    },
                ],
            },
            defaults: createPatientDto,
        });

        if (!isCreated) {
            throw new ConflictException('User already exists with the same email or phone');
        }

        const role = await Role.findOne({
            where: {
                name: ROLE_NAMES.PATIENT,
            },
        });

        if (!role) {
            throw new NotFoundException('Practician role not found');
        }

        await UserRole.create({
            userId: user.id,
            roleId: role.id,
            createdBy: createPatientDto.createdBy,
        });

        const createdPatient = await Patient.create({
            userId: user.id,
            birthDate: createPatientDto.birthDate,
            createdBy: createPatientDto.createdBy,
        });

        const createdPatientValue = createdPatient.get({ plain: true });

        this.logger.info(`PatientService - Created Patient`, {
            createdPatient: createdPatientValue,
        });

        // TODO emit patient create event

        return this.find(createdPatientValue.id);
    }

    async update(updatePatientPayload: UpdatePatientDto & { updatedBy: string }) {
        const { id, birthDate, ...userUpdateData } = updatePatientPayload;
        const patientToBeUpdated = await Patient.findOne({
            where: {
                id,
            },
            include: [
                {
                    model: User,
                },
            ],
        });

        if (!patientToBeUpdated) {
            throw new NotFoundException('Patient not found');
        }

        if (birthDate) {
            await Patient.update(
                {
                    birthDate,
                    updatedBy: updatePatientPayload.updatedBy,
                },
                {
                    where: {
                        id: updatePatientPayload.id,
                    },
                },
            );
        }

        const [affectedRows, _] = await User.update(
            {
                ...patientToBeUpdated.user.get({ plain: true }),
                ...userUpdateData,
                updatedBy: updatePatientPayload.updatedBy,
            },
            {
                where: {
                    id: patientToBeUpdated.user.id,
                },
                returning: true,
            },
        );

        if (!affectedRows) {
            throw new NotFoundException('User associated with practician not found');
        }

        this.logger.info(`PatientService - Updated Patient`, patientToBeUpdated.id);

        // TODO emit patient update event

        return this.find(patientToBeUpdated.id);
    }

    async delete(deletePayload: { patientId: string; deletedBy: string }): Promise<void> {
        const deletedCount = await Patient.destroy({
            where: { id: deletePayload.patientId },
        });

        if (!deletedCount) {
            throw new NotFoundException('Patient not found');
        }

        // emit patient delete event
        this.eventEmitter.emit(
            PatientEvents.PATIENT_DELETED,
            new PatientDeletedEvent({
                patientId: deletePayload.patientId,
            }),
        );

        this.logger.info(`PatientService - deleted (${deletedCount}) patient`, {
            deletePayload,
        });
    }
}
