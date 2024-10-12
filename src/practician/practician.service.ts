import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { QueryParams } from '../typings/query.typings';
import { CreatePracticianDto } from './dtos/create-practician.dto';
import { Practician, PracticianAttributes } from './models/practician.model';
import { transformSortParamsToSequelizeFormat } from '../utils/sequelize.helpers';
import { User } from '../user/models/user.model';
import { UserRole } from '../user-role/models/user-role.model';
import { Role } from '../role/models/role.model';
import { ROLE_NAMES } from '../role/role.service';
import { UpdatePracticianDto } from './dtos/update-practician.dto';
import { TimeSlot, TimeSlotAttributes } from '../time-slot/models/time-slot.model';
import { Appointment, AppointmentAttributes } from '../appointment/models/appointment.model';
import { Establishment } from '../establishment/models/establishment.model';
import { Patient } from '../patient/models/patient.model';

@Injectable()
export class PracticianService {
    constructor(private readonly logger: ApplicationLoggerService) {}

    async findAndCountAll(
        options: QueryParams,
    ): Promise<{ data: PracticianAttributes[]; total: number }> {
        const offset = options?.limit && options.page ? options.limit * (options.page - 1) : 0;

        const { rows: data, count: total } = await Practician.findAndCountAll({
            limit: options?.limit,
            include: [
                {
                    model: User,
                },
            ],
            offset,
            order: transformSortParamsToSequelizeFormat(options.sort),
            raw: true,
        });

        return { data, total };
    }

    async find(practicianId: string): Promise<PracticianAttributes> {
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

        return practician.get({ plain: true });
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
            raw: true,
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
                    include: [{
                        model: User,
                    }]
                },
                {
                    model: Establishment,
                },
                {
                    model: Patient,
                    include: [{
                        model: User,
                    }]
                },
                {
                    model: TimeSlot,
                }
            ],
            limit: options?.limit,
            offset,
            order: transformSortParamsToSequelizeFormat(options.sort),
            raw: true,
        });

        return { data, total };
    }

    async create(createPracticianDto: CreatePracticianDto): Promise<PracticianAttributes> {
        // check if the user already exists with the same email
        const [user, isCreated] = await User.findOrCreate({
            where: {
                email: createPracticianDto.email,
            },
            defaults: createPracticianDto,
        });

        if (!isCreated) {
            throw new ConflictException('User already exists with the same email');
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
        });

        const practician = await Practician.create({
            userId: user.id,
        });

        const practicianValue = await this.find(practician.id);

        if (!practicianValue) {
            throw new Error('Practician could not be created');
        }

        return practicianValue;
    }

    async update(updatePracticianDto: UpdatePracticianDto): Promise<PracticianAttributes> {
        const practicianToBeUpdated = await Practician.findOne({
            where: {
                id: updatePracticianDto.id,
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

        const [affectedRows, []] = await User.update(
            {
                ...practicianToBeUpdated.user.get({ plain: true }),
                ...updatePracticianDto,
            },
            {
                where: {
                    id: updatePracticianDto.id,
                },
                returning: true,
            },
        );

        if (!affectedRows) {
            throw new NotFoundException('User associated with practician not found');
        }

        return await this.find(updatePracticianDto.id);
    }

    async delete(practicianId: string): Promise<void> {
        const deletedCount = await Practician.destroy({
            where: {
                id: practicianId,
            },
        });

        if (!deletedCount) {
            throw new NotFoundException('Practician not found');
        }

        this.logger.info(`PracticianService - deleted (${deletedCount}) practician`, {
            practicianId,
        });
    }
}
