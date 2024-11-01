interface EventPayload {
    practicianId: string;
}

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
