import { Module } from '@nestjs/common';
import { AppointmentModule } from './appointment/appointment.module';
import { AppointmentStatusModule } from './appointment-status/appointment-status.module';
import { CoreModule } from './core/core.module';
import { EstablishmentModule } from './establishment/establishment.module';
import { PatientModule } from './patient/patient.module';
import { PracticianHasSpecialtyModule } from './practician-has-specialty/practician-has-specialty.module';
import { PracticianModule } from './practician/practician.module';
import { RoleModule } from './role/role.module';
import { RootController } from './core/root.controller';
import { SpecialtyModule } from './specialty/specialty.module';
import { TimeSlotModule } from './time-slot/time-slot.module';
import { UserModule } from './user/user.module';
import { UserRoleModule } from './user-role/user-role.module';
import { EstablishmentHasSpecialtyModule } from './establishment-has-specialty/establishment-has-specialty.module';
import { EstablishmentHasPracticianModule } from './establishment-has-practician/establishment-has-practician.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
    imports: [
        AppointmentModule,
        AppointmentStatusModule,
        AuthenticationModule,
        CoreModule,
        EstablishmentModule,
        EstablishmentHasSpecialtyModule,
        EstablishmentHasPracticianModule,
        PatientModule,
        PracticianModule,
        PracticianHasSpecialtyModule,
        SpecialtyModule,
        RoleModule,
        TimeSlotModule,
        UserModule,
        UserRoleModule,
    ],
    controllers: [RootController],
})
export class AppModule {}
