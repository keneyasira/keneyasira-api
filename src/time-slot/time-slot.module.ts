import { Module } from '@nestjs/common';
import { TimeSlotController } from './time-slot.controller';
import { TimeSlotService } from './time-slot.service';
import { CoreModule } from '../core/core.module';

@Module({
    controllers: [TimeSlotController],
    providers: [TimeSlotService],
    exports: [TimeSlotService],
    imports: [CoreModule],
})
export class TimeSlotModule {}
