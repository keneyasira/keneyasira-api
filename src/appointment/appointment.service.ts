import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { QueryParams } from '../typings/query.typings';
import { transformSortParamsToSequelizeFormat } from '../utils/sequelize.helpers';
import { AppointmentAttributes, Appointment } from './models/appointment.model';
import { Practician } from '../practician/models/practician.model';
import { Establishment } from '../establishment/models/establishment.model';
import { Patient } from '../patient/models/patient.model';
import { TimeSlot } from '../time-slot/models/time-slot.model';
import { User } from '../user/models/user.model';
import { UpdateAppointmentDto } from './dtos/update-appointment.dto';
import { CreateAppointmentDto } from './dtos/create-appointment.dto';
import { AppointmentStatus } from '../appointment-status/models/appointment-status.model';

export const STATUS_NAMES = {
    SCHEDULED: 'scheduled',
    CANCELLED: 'cancelled',
    COMPLETED: 'completed',
    NO_SHOW: 'no_show',
} as const;

const IncludeValues = [
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
];

@Injectable()
export class AppointmentService {
    constructor(private readonly logger: ApplicationLoggerService) {}

    async findAndCountAll(
        options: QueryParams,
    ): Promise<{ data: AppointmentAttributes[]; total: number }> {
        const offset = options?.limit && options.page ? options.limit * (options.page - 1) : 0;

        const { rows: data, count: total } = await Appointment.findAndCountAll({
            limit: options?.limit,
            include: IncludeValues,
            offset,
            order: transformSortParamsToSequelizeFormat(options.sort),
            raw: true,
        });

        return { data, total };
    }

    async find(appointmentId: string) {
        // Implement the logic to find a single appointment
        const appointment = (await Appointment.findByPk(appointmentId))?.get({ plain: true });

        if (!appointment) {
            throw new NotFoundException('Appointment not found');
        }

        return appointment;
    }

    async create(createAppointmentDto: CreateAppointmentDto) {
        // check that the timeslot is available and exists
        const { establishmentId, practicianId } = await this.checkAndReturnTimeSlot(
            createAppointmentDto.timeSlotId,
        );

        const appointmentStatus = await AppointmentStatus.findOne({
            where: { name: STATUS_NAMES.SCHEDULED },
        });

        if (!appointmentStatus?.id) {
            throw new BadRequestException('Cannot find appointment status');
        }

        // Implement the logic to create an appointment
        const createdAppointment = await Appointment.create({
            ...createAppointmentDto,
            establishmentId,
            practicianId,
            appointmentStatusId: appointmentStatus?.id,
        });

        const createdAppointmentValue = createdAppointment.get({ plain: true });

        this.logger.info(`Created appointment`, {
            createdAppointment: createdAppointmentValue,
        });

        return createdAppointmentValue;
    }

    private async checkAndReturnTimeSlot(timeSlotId: string | undefined) {
        if (!timeSlotId) {
            throw new BadRequestException('TimeSlotId is undefined');
        }

        const timeSlot = (await TimeSlot.findByPk(timeSlotId))?.get({
            plain: true,
        });

        if (!timeSlot) {
            throw new BadRequestException('TimeSlot does not exist');
        }

        if (!timeSlot.available) {
            throw new BadRequestException('TimeSlot is not available');
        }

        return timeSlot;
    }

    async update(updateAppointmentDto: UpdateAppointmentDto) {
        let updatePayload: Record<string, string> = {};

        if (updateAppointmentDto.timeSlotId) {
            // check that the timeslot is available and exists
            const { establishmentId, practicianId } = await this.checkAndReturnTimeSlot(
                updateAppointmentDto.timeSlotId,
            );
            updatePayload = {
                establishmentId,
                practicianId,
            };
        }

        if (updateAppointmentDto.appointmentStatusId) {
            updatePayload = {
                ...updatePayload,
                appointmentStatusId: updateAppointmentDto.appointmentStatusId,
            };
        }

        const [affectedRows, [updatedAppointment]] = await Appointment.update(
            {
                ...updatePayload,
            },
            {
                where: {
                    id: updateAppointmentDto.id,
                },
                returning: true,
            },
        );

        if (!affectedRows) {
            throw new NotFoundException('Appointment not found');
        }

        const updatedAppointmentValue = updatedAppointment.get({ plain: true });

        this.logger.info(`Updated (${affectedRows}) appointment`, {
            updatedAppointment: updatedAppointmentValue,
        });

        return this.find(updatedAppointmentValue.id);
    }

    async delete(appointmentId: string) {
        const deletedCount = await Appointment.destroy({
            where: {
                id: appointmentId,
            },
        });

        if (!deletedCount) {
            throw new NotFoundException('Appointment not found');
        }

        this.logger.info(`AppointmentService - deleted (${deletedCount}) appointment`, {
            appointmentId,
        });
    }
}
