interface EventPayload {
    adminId: string;
}

export class AdminCreatedEvent {
    name: 'admin.created';

    constructor(public payload: EventPayload) {}
}

export class AdminUpdatedEvent {
    name: 'admin.updated';

    constructor(public payload: EventPayload) {}
}

export class AdminDeletedEvent {
    name: 'admin.deleted';

    constructor(public payload: EventPayload) {}
}