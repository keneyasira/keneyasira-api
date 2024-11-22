interface EventPayload {
    appointmentId: string;
}

export const AppointmentEvents = {
    APPOINTMENT_CREATED: 'appointment.created',
    APPOINTMENT_UPDATED: 'appointment.updated',
    APPOINTMENT_DELETED: 'appointment.deleted',
    APPOINTMENT_CANCELLED: 'appointment.cancelled',
} as const;

export class AppointmentCreatedEvent {
    name: 'appointment.created';

    constructor(public payload: EventPayload) {}
}

export class AppointmentUpdatedEvent {
    name: 'appointment.updated';

    constructor(public payload: EventPayload) {}
}

export class AppointmentDeletedEvent {
    name: 'appointment.deleted';

    constructor(public payload: EventPayload) {}
}

export class AppointmentCancelledEvent {
    name: 'appointment.cancelled';

    constructor(public payload: EventPayload) {}
}