interface EventPayload {
    patientId: string;
}

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
