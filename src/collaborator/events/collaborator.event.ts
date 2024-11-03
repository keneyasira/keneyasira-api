interface EventPayload {
    collaboratorId: string;
}

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