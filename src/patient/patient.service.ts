import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { QueryParams } from '../typings/query.typings';
import { User } from '../user/models/user.model';
import { transformSortParamsToSequelizeFormat } from '../utils/sequelize.helpers';
import { CreatePatientDto } from './dtos/create-patient.dto';
import { UpdatePatientDto, UpdatePatientPayload } from './dtos/update-patient.dto';
import { Patient, PatientAttributes } from './models/patient.model';
import { errorToPlainObject } from '../utils/error.helper';

@Injectable()
export class PatientService {
    constructor(private readonly logger: ApplicationLoggerService) {}

    async findAndCountAll(
        options: QueryParams,
    ): Promise<{ data: PatientAttributes[]; total: number }> {
        const offset = options?.limit && options.page ? options.limit * (options.page - 1) : 0;

        const { rows, count: total } = await Patient.findAndCountAll({
            limit: options?.limit,
            offset,
            order: transformSortParamsToSequelizeFormat(options.sort),
            include: [
                {
                    model: User,
                },
            ],
        });

        const data = rows.map((row) => row.toJSON());

        return { data, total };
    }

    async find(patientId: string): Promise<PatientAttributes> {
        try {
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

            return patient.toJSON();
        } catch (error) {
            this.logger.error(
                `PatientService - failed to get patient, ${(error as Error).message}`,
                {
                    error: errorToPlainObject(error as Error),
                },
            );
            throw error;
        }
    }

    async create(createPatientDto: CreatePatientDto): Promise<PatientAttributes | undefined> {

            // check if the user already exists with the same email
            const [user, isCreated] = await User.findOrCreate({
                where: {
                    email: createPatientDto.email,
                },
                defaults: createPatientDto,
            });
    
            if (!isCreated) {
                throw new ConflictException('User already exists with the same email');
            }
        
            const createdPatient = await Patient.create({
                ...createPatientDto,
            });

            const createdPatientValue = createdPatient.toJSON();

            this.logger.info(`PatientService - Created Patient`, {
                createdPatient: createdPatientValue,
            });

            const patient = await Patient.findByPk(createdPatientValue.id, {
                include: [
                    {
                        model: User,
                    },
                ],
            });

            return patient?.toJSON();

    }

    async update(updatePatientDto: UpdatePatientDto): Promise<PatientAttributes> {
        const [affectedRows, [updatedPatient]] = await Patient.update(
            {
                ...updatePatientDto,
            },
            {
                where: {
                    id: updatePatientDto.id,
                },
                returning: true,
            },
        );

        if (!affectedRows) {
            throw new NotFoundException('Patient not found');
        }

        const updatedPatientValue = updatedPatient.toJSON();

        this.logger.info(`PatientService - Updated (${affectedRows}) Patient`, {
            updatedPatient: updatedPatientValue,
        });

        const patient = await Patient.findByPk(updatedPatientValue.id, {
            include: [
                {
                    model: User,
                },
            ],
        });

        if (!patient) {
            throw new NotFoundException('Patient not found');
        }

        return patient.get({ plain: true });
    }

    async delete(patientToDeleteId: string): Promise<void> {

            const deletedCount = await Patient.destroy({
                where: { id: patientToDeleteId },
            });

            if (!deletedCount) {
                throw new NotFoundException('Patient not found');
            }

            this.logger.info(`PatientService - deleted (${deletedCount}) patient`, {
                patientToDeleteId,
            });

    }
}
