interface EventPayload {
    patientId: string;
}

export const PatientEvents = {
    PATIENT_CREATED: 'patient.created',
    PATIENT_UPDATED: 'patient.updated',
    PATIENT_DELETED: 'patient.deleted',
} as const;

export class PatientCreatedEvent {
    name: 'patient.created';

    constructor(public payload: EventPayload) {}
}

export class PatientUpdatedEvent {
    name: 'patient.updated';

    constructor(public payload: EventPayload) {}
}

export class PatientDeletedEvent {
    name: 'patient.deleted';

    constructor(public payload: EventPayload) {}
}
