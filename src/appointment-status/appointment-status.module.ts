import { Module } from '@nestjs/common';

import { CoreModule } from '../core/core.module';
import { AppointmentStatusController } from './appointment-status.controller';
import { AppointmentStatusService } from './appointment-status.service';

@Module({
    providers: [AppointmentStatusService],
    controllers: [AppointmentStatusController],
    imports: [CoreModule],
    exports: [AppointmentStatusService],
})
export class AppointmentStatusModule {}
