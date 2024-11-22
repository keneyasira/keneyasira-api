import { Module } from '@nestjs/common';

import { CoreModule } from '../core/core.module';
import { TimeSlotController } from './time-slot.controller';
import { TimeSlotEventListener } from './time-slot.event.listener';
import { TimeSlotService } from './time-slot.service';

@Module({
    controllers: [TimeSlotController],
    providers: [TimeSlotService, TimeSlotEventListener],
    exports: [TimeSlotService, TimeSlotEventListener],
    imports: [CoreModule],
})
export class TimeSlotModule {}
