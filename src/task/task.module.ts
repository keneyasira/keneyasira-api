import { Module } from '@nestjs/common';

import { CoreModule } from '../core/core.module';
import { TaskService } from './task.service';

@Module({
    providers: [TaskService],
    controllers: [],
    imports: [CoreModule],
    exports: [TaskService],
})
export class TaskModule {}
