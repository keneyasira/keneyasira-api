import { Module } from '@nestjs/common';

import { CoreModule } from '../core/core.module';
import { TimeSlotController } from './time-slot.controller';
import { TimeSlotService } from './time-slot.service';

@Module({
    controllers: [TimeSlotController],
    providers: [TimeSlotService],
    exports: [TimeSlotService],
    imports: [CoreModule],
})
export class TimeSlotModule {}
