interface EventPayload {
    collaboratorId: string;
}

export const CollaboratorEvents = {
    COLLABORATOR_CREATED: 'collaborator.created',
    COLLABORATOR_UPDATED: 'collaborator.updated',
    COLLABORATOR_DELETED: 'collaborator.deleted',
} as const;

export class CollaboratorCreatedEvent {
    name: 'collaborator.created';

    constructor(public payload: EventPayload) {}
}

export class CollaboratorUpdatedEvent {
    name: 'collaborator.updated';

    constructor(public payload: EventPayload) {}
}

export class CollaboratorDeletedEvent {
    name: 'collaborator.deleted';

    constructor(public payload: EventPayload) {}
}