import { Injectable, NotFoundException } from '@nestjs/common';

import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { QueryParams } from '../typings/query.typings';
import { transformSortParamsToSequelizeFormat } from '../utils/sequelize.helpers';
import { CreateAppointmentStatusDto } from './dtos/create-appointment-status.dto';
import { UpdateAppointmentStatusDto } from './dtos/update-appointment-status.dto';
import { AppointmentStatus, AppointmentStatusAttributes } from './models/appointment-status.model';

@Injectable()
export class AppointmentStatusService {
    constructor(private readonly logger: ApplicationLoggerService) {}

    async findAndCountAll(
        options: QueryParams,
    ): Promise<{ data: AppointmentStatusAttributes[]; total: number }> {
        const offset = options?.limit && options.page ? options.limit * (options.page - 1) : 0;
        const { rows: data, count: total } = await AppointmentStatus.findAndCountAll({
            limit: options?.limit,
            offset,
            order: transformSortParamsToSequelizeFormat(options.sort),
        });

        return {
            data: data.map((row) => row.get({ plain: true })),
            total,
        };
    }

    async find(AppointmentStatusId: string) {
        const appointmentStatus = await AppointmentStatus.findOne({
            where: {
                id: AppointmentStatusId,
            },
        });

        if (!appointmentStatus) {
            throw new NotFoundException('Appointment status not found');
        }

        const row = appointmentStatus.get({ plain: true });

        return { data: row };
    }

    async create(appointmentStatusData: CreateAppointmentStatusDto) {
        const appointmentStatus = await AppointmentStatus.create(appointmentStatusData);

        const createdAppointmentStatusValue = appointmentStatus.get({ plain: true });

        this.logger.info(`Created appointment status`, {
            createdAppointmentStatus: createdAppointmentStatusValue,
        });

        return { data: createdAppointmentStatusValue };
    }

    async update(updateAppointmentStatusDto: UpdateAppointmentStatusDto) {
        const [affectedRows, [updatedAppointmentStatus]] = await AppointmentStatus.update(
            {
                ...updateAppointmentStatusDto,
            },
            {
                where: {
                    id: updateAppointmentStatusDto.id,
                },
                returning: true,
            },
        );

        if (!affectedRows) {
            throw new NotFoundException('Appointment status not found');
        }

        return { data: updatedAppointmentStatus.get({ plain: true }) };
    }

    async delete(AppointmentStatusToDeleteId: string): Promise<void> {
        const deletedCount = await AppointmentStatus.destroy({
            where: { id: AppointmentStatusToDeleteId },
        });

        if (!deletedCount) {
            throw new NotFoundException('Appointment status not found');
        }

        this.logger.info(`deleted (${deletedCount}) AppointmentStatus`, {
            AppointmentStatusToDeleteId,
        });
    }
}
