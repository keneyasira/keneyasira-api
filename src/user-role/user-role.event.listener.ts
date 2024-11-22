import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { AdminDeletedEvent, AdminEvents } from '../admin/events/admin.event';
import { Admin } from '../admin/models/admin.model';
import {
    CollaboratorDeletedEvent,
    CollaboratorEvents,
} from '../collaborator/events/collaborator.event';
import { Collaborator } from '../collaborator/models/collaborator.model';
import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { PatientDeletedEvent, PatientEvents } from '../patient/events/patient.event';
import { Patient } from '../patient/models/patient.model';
import { PracticianDeletedEvent, PracticianEvents } from '../practician/events/practician.event';
import { Practician } from '../practician/models/practician.model';
import { Role } from '../role/models/role.model';
import { ROLE_NAMES } from '../role/role.service';
import { User } from '../user/models/user.model';
import { UserRole } from './models/user-role.model';

@Injectable()
export class UserRoleEventListener {
    constructor(private readonly logger: ApplicationLoggerService) {}

    @OnEvent(PatientEvents.PATIENT_DELETED, { async: true })
    async handlePatientDeletedEvent(event: PatientDeletedEvent) {
        // handle and process "PatientDeletedEvent" event
        const deletedPatient = await Patient.findOne({
            where: {
                id: event.payload.patientId,
            },
            paranoid: false,
            include: [{ model: User, attributes: ['id'] }],
        });

        if (!deletedPatient) {
            this.logger.error(`Error deleting patient from event`, event);

            return;
        }

        const patientRole = await Role.findOne({
            where: {
                name: ROLE_NAMES.PATIENT,
            },
        });

        if (!patientRole) {
            this.logger.error(`Error deleting patient from event, patient role not found`, event);

            return;
        }

        await UserRole.destroy({
            where: {
                userId: deletedPatient.user.id,
                roleId: patientRole.id,
            },
        });
    }

    @OnEvent(PracticianEvents.PRACTICIAN_DELETED, { async: true })
    async handlePracticianDeletedEvent(event: PracticianDeletedEvent) {
        // handle and process "PracticianDeletedEvent" event
        const deletedPractician = await Practician.findOne({
            where: {
                id: event.payload.practicianId,
            },
            paranoid: false,
            include: [{ model: User, attributes: ['id'] }],
        });

        if (!deletedPractician) {
            this.logger.error(`Error deleting practician from event`, event);

            return;
        }

        const practicianRole = await Role.findOne({
            where: {
                name: ROLE_NAMES.PRACTICIAN,
            },
        });

        if (!practicianRole) {
            this.logger.error(
                `Error deleting practician from event, practician role not found`,
                event,
            );

            return;
        }

        await UserRole.destroy({
            where: {
                userId: deletedPractician.user.id,
                roleId: practicianRole.id,
            },
        });
    }

    @OnEvent(CollaboratorEvents.COLLABORATOR_DELETED, { async: true })
    async handleCollaboratorDeletedEvent(event: CollaboratorDeletedEvent) {
        const deletedCollaborator = await Collaborator.findOne({
            where: {
                id: event.payload.collaboratorId,
            },
            paranoid: false,
            include: [{ model: User, attributes: ['id'] }],
        });

        if (!deletedCollaborator) {
            this.logger.error(`Error deleting collaborator from event`, event);

            return;
        }

        const collaboratorRole = await Role.findOne({
            where: {
                name: ROLE_NAMES.COLLABORATOR,
            },
        });

        if (!collaboratorRole) {
            this.logger.error(
                `Error deleting collaborator from event, collaborator role not found`,
                event,
            );

            return;
        }

        await UserRole.destroy({
            where: {
                userId: deletedCollaborator.user.id,
                roleId: collaboratorRole.id,
            },
        });
    }

    @OnEvent(AdminEvents.ADMIN_DELETED, { async: true })
    async handleAdminDeletedEvent(event: AdminDeletedEvent) {
        const deletedAdmin = await Admin.findOne({
            where: {
                id: event.payload.adminId,
            },
            paranoid: false,
            include: [{ model: User, attributes: ['id'] }],
        });

        if (!deletedAdmin) {
            this.logger.error(`Error deleting administrator from event`, event);

            return;
        }

        const administratorRole = await Role.findOne({
            where: {
                name: ROLE_NAMES.ADMIN,
            },
        });

        if (!administratorRole) {
            this.logger.error(
                `Error deleting administrator from event, administrator role not found`,
                event,
            );

            return;
        }

        await UserRole.destroy({
            where: {
                userId: deletedAdmin.user.id,
                roleId: administratorRole.id,
            },
        });
    }
}
