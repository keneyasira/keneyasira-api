interface EventPayload {
    adminId: string;
}

export const AdminEvents = {
    ADMIN_CREATED: 'admin.created',
    ADMIN_UPDATED: 'admin.updated',
    ADMIN_DELETED: 'admin.deleted',
} as const;

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