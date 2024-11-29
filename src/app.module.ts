import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';

import { AdminModule } from './admin/admin.module';
import { AppointmentModule } from './appointment/appointment.module';
import { AppointmentStatusModule } from './appointment-status/appointment-status.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { CollaboratorModule } from './collaborator/collaborator.module';
import { CoreModule } from './core/core.module';
import { RootController } from './core/root.controller';
import { EstablishmentModule } from './establishment/establishment.module';
import { EstablishmentAffiliationModule } from './establishment-affiliation/establishment-affiliation.module';
import { EstablishmentHasPracticianModule } from './establishment-has-practician/establishment-has-practician.module';
import { EstablishmentHasSpecialtyModule } from './establishment-has-specialty/establishment-has-specialty.module';
import { EstablishmentTypeModule } from './establishment-type/establishment-type.module';
import { PatientModule } from './patient/patient.module';
import { PracticianModule } from './practician/practician.module';
import { PracticianHasSpecialtyModule } from './practician-has-specialty/practician-has-specialty.module';
import { RoleModule } from './role/role.module';
import { SpecialtyModule } from './specialty/specialty.module';
import { TimeSlotModule } from './time-slot/time-slot.module';
import { UserModule } from './user/user.module';
import { UserRoleModule } from './user-role/user-role.module';

@Module({
    imports: [
        AdminModule,
        AppointmentModule,
        AppointmentStatusModule,
        AuthenticationModule,
        CollaboratorModule,
        CoreModule,
        EstablishmentAffiliationModule,
        EstablishmentModule,
        EstablishmentHasSpecialtyModule,
        EstablishmentHasPracticianModule,
        EstablishmentTypeModule,
        PatientModule,
        PracticianModule,
        PracticianHasSpecialtyModule,
        SpecialtyModule,
        RoleModule,
        TimeSlotModule,
        UserModule,
        UserRoleModule,
        EventEmitterModule.forRoot({
            // set this to `true` to use wildcards
            wildcard: false,
            // the delimiter used to segment namespaces
            delimiter: '.',
            // set this to `true` if you want to emit the newListener event
            newListener: false,
            // set this to `true` if you want to emit the removeListener event
            removeListener: false,
            // the maximum amount of listeners that can be assigned to an event
            maxListeners: 10,
            // show event name in memory leak message when more than maximum amount of listeners is assigned
            verboseMemoryLeak: false,
            // disable throwing uncaughtException if an error event is emitted and it has no listeners
            ignoreErrors: false,
        }),
        ScheduleModule.forRoot(),
    ],
    controllers: [RootController],
})
export class AppModule {}
