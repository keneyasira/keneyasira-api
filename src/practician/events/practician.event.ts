interface EventPayload {
    practicianId: string;
}

export const PracticianEvents = {
    PRACTICIAN_CREATED: 'practician.created',
    PRACTICIAN_UPDATED: 'practician.updated',
    PRACTICIAN_DELETED: 'practician.deleted',
} as const;

export class PracticianCreatedEvent {
    name: 'practician.created';

    constructor(public payload: EventPayload) {}
}

export class PracticianUpdatedEvent {
    name: 'practician.updated';

    constructor(public payload: EventPayload) {}
}

export class PracticianDeletedEvent {
    name: 'practician.deleted';

    constructor(public payload: EventPayload) {}
}
