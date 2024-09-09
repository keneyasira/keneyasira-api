import { Module } from '@nestjs/common';

import { CoreModule } from '../core/core.module';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';

@Module({
    providers: [AppointmentService],
    controllers: [AppointmentController],
    imports: [CoreModule],
    exports: [AppointmentService],
})
export class AppointmentModule {}
