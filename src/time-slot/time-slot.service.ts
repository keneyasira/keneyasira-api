import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { Appointment } from '../appointment/models/appointment.model';
import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { EstablishmentHasPractician } from '../establishment-has-practician/models/establishment-has-practician.model';
import { QueryParams } from '../typings/query.typings';
import { transformSortParamsToSequelizeFormat } from '../utils/sequelize.helpers';
import { CreateTimeSlotDto } from './dtos/create-time-slot.dto';
import { UpdateTimeSlotDto } from './dtos/update-time-slot.dto';
import { TimeSlot, TimeSlotAttributes } from './models/time-slot.model';

@Injectable()
export class TimeSlotService {
    constructor(private readonly logger: ApplicationLoggerService) {}

    async findAndCountAll(
        options: QueryParams,
    ): Promise<{ data: TimeSlotAttributes[]; total: number }> {
        const offset = options?.limit && options.page ? options.limit * (options.page - 1) : 0;

        const { rows: data, count: total } = await TimeSlot.findAndCountAll({
            limit: options?.limit,
            offset,
            order: transformSortParamsToSequelizeFormat(options.sort),
            raw: true,
        });

        return { data, total };
    }

    async find(timeSlotId: string) {
        const timeSlot = (await TimeSlot.findByPk(timeSlotId))?.get({ plain: true });

        if (!timeSlot) {
            throw new NotFoundException('TimeSlot not found');
        }

        return timeSlot;
    }

    async create(createTimeSlotDto: CreateTimeSlotDto) {
        // check that the practician in the time slot belongs to the establishment
        if (createTimeSlotDto.practicianId) {
            const establishmentHasPractician = await EstablishmentHasPractician.findOne({
                where: {
                    establishmentId: createTimeSlotDto.establishmentId,
                    practicianId: createTimeSlotDto.practicianId,
                },
            });

            if (!establishmentHasPractician) {
                throw new BadRequestException('Practician does not belong to Establishment');
            }
        }

        // TODO check that another time slot on the same time does not exist for the establishment and/or practician

        const createdTimeSlot = await TimeSlot.create(createTimeSlotDto);

        const createdTimeSlotValue = createdTimeSlot.get({ plain: true });

        this.logger.info(`Created timeSlot`, {
            createdTimeSlot: createdTimeSlotValue,
        });

        return createdTimeSlotValue;
    }

    async update(updateTimeSlotDto: UpdateTimeSlotDto) {
        const [affectedRows, [updatedTimeSlot]] = await TimeSlot.update(
            {
                ...updateTimeSlotDto,
            },
            {
                where: {
                    id: updateTimeSlotDto.id,
                },
                returning: true,
            },
        );

        if (!affectedRows) {
            throw new NotFoundException('TimeSlot not found');
        }

        return await updatedTimeSlot.get({ plain: true });
    }

    async delete(timeSlotId: string) {
        // do not delete timeslots for which you can find appointments
        const appointments = await Appointment.count({
            where: {
                timeSlotId,
            },
        });

        if (appointments) {
            throw new BadRequestException(
                'Cannot delete timeslot that is associated to appointments',
            );
        }

        const deletedCount = await TimeSlot.destroy({
            where: {
                id: timeSlotId,
            },
        });

        if (!deletedCount) {
            throw new NotFoundException('TimeSlot not found');
        }

        this.logger.info(`TimeSlotService - deleted (${deletedCount}) timeSlot`, {
            timeSlotId,
        });
    }
}
