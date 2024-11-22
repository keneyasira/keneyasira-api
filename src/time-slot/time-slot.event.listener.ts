import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import {
    AppointmentCancelledEvent,
    AppointmentCreatedEvent,
    AppointmentEvents,
} from '../appointment/events/appointment.event';
import { Appointment } from '../appointment/models/appointment.model';
import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { TimeSlot } from './models/time-slot.model';

@Injectable()
export class TimeSlotEventListener {
    constructor(private readonly logger: ApplicationLoggerService) {}

    @OnEvent(AppointmentEvents.APPOINTMENT_CREATED, { async: true })
    async handleAppointmentCreatedEvent(event: AppointmentCreatedEvent) {
        // handle and process "AppointmentCreatedEvent" event
        const createdAppointment = await Appointment.findOne({
            where: {
                id: event.payload.appointmentId,
            },
            paranoid: false,
            include: [{ model: TimeSlot, attributes: ['id'] }],
        });

        if (!createdAppointment) {
            this.logger.error(`Error setting timeSlot to unavailable from event`, event);

            return;
        }

        await TimeSlot.update(
            {
                available: false,
            },
            {
                where: {
                    id: createdAppointment.timeSlotId,
                },
            },
        );
    }

    @OnEvent(AppointmentEvents.APPOINTMENT_CANCELLED, { async: true })
    async handleAppointmentCancelledEvent(event: AppointmentCancelledEvent) {
        // handle and process "AppointmentCancelledEvent" event
        const cancelledAppointment = await Appointment.findOne({
            where: {
                id: event.payload.appointmentId,
            },
            paranoid: false,
            include: [{ model: TimeSlot, attributes: ['id'] }],
        });

        if (!cancelledAppointment) {
            this.logger.error(`Error setting timeSlot to unavailable from event`, event);

            return;
        }

        await TimeSlot.update(
            {
                available: true,
            },
            {
                where: {
                    id: cancelledAppointment.timeSlotId,
                },
            },
        );
    }
}
