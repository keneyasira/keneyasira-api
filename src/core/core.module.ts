import { ConfigModule } from '@config/config.module';
import ormconfig from '@config/ormconfig';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';
import { TerminusModule } from '@nestjs/terminus';

import { Specialty } from '../specialty/models/specialty.model';
import { User } from '../user/models/user.model';
import { CustomExceptionFilter } from './custom-exception.filter';
import { ApplicationLoggerService } from './logger/application.logger.service';
import { RequestLoggerInterceptor } from './logger/request.logger.interceptor';
import { HealthController } from './monitoring/health/health.controller';
import { ResponseInterceptor } from './response.interceptor';
import { Role } from '../role/models/role.model';
import { UserRole } from '../user-role/models/user-role.model';
import { Patient } from '../patient/models/patient.model';
import { AppointmentStatus } from '../appointment-status/models/appointment-status.model';
import { Appointment } from '../appointment/models/appointment.model';
import { Establishment } from '../establishment/models/establishment.model';
import { EstablishmentHasPractician } from '../establishment-has-practician/models/establishment-has-practician.model';
import { EstablishmentHasSpecialty } from '../establishment-has-specialty/models/establishment-has-specialty.model';
import { Practician } from '../practician/models/practician.model';
import { PracticianHasSpecialty } from '../practician-has-specialty/models/practician-has-specialty.model';
import { TimeSlot } from '../time-slot/models/time-slot.model';
@Module({
    imports: [
        ConfigModule,
        SequelizeModule.forRoot({
            ...ormconfig,
            models: [
                Appointment,
                AppointmentStatus,
                Establishment,
                EstablishmentHasPractician,
                EstablishmentHasSpecialty,
                Patient,
                Practician,
                PracticianHasSpecialty,
                Role,
                Specialty,
                TimeSlot,
                User,
                UserRole,
            ],
        }),
        TerminusModule,
    ],
    exports: [ConfigModule, ApplicationLoggerService],
    providers: [
        ApplicationLoggerService,
        {
            provide: APP_INTERCEPTOR,
            // XXX this is used specifically to override it during the test
            useClass: RequestLoggerInterceptor,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseInterceptor,
        },
        {
            provide: APP_FILTER,
            useClass: CustomExceptionFilter,
        },
    ],
    controllers: [HealthController],
})
export class CoreModule {}
