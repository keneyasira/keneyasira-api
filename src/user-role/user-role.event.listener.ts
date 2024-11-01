import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { ApplicationLoggerService } from '../core/logger/application.logger.service';
import { PatientDeletedEvent } from '../patient/events/patient.event';
import { Patient } from '../patient/models/patient.model';
import { PracticianDeletedEvent } from '../practician/events/practician.event';
import { Practician } from '../practician/models/practician.model';
import { Role } from '../role/models/role.model';
import { ROLE_NAMES } from '../role/role.service';
import { User } from '../user/models/user.model';
import { UserRole } from './models/user-role.model';

@Injectable()
export class UserRoleEventListener {
    constructor(private readonly logger: ApplicationLoggerService) {}

    @OnEvent('patient.deleted', { async: true })
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
                role: patientRole.id,
            },
        });
    }

    @OnEvent('practician.deleted', { async: true })
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
                role: practicianRole.id,
            },
        });
    }

    // @OnEvent('collaborator.deleted')
    // handleCollaboratorDeletedEvent(event: CollaboratorDeletedEvent) {
    //     // handle and process "OrderCreatedEvent" event
    // }

    // @OnEvent('admin.deleted')
    // handleAdminDeletedEvent(event: AdminDeletedEvent) {
    //     // handle and process "OrderCreatedEvent" event
    // }
}
