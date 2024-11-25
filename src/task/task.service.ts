import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { ApplicationLoggerService } from '../core/logger/application.logger.service';

@Injectable()
export class TaskService {
    constructor(private readonly logger: ApplicationLoggerService) {}

    @Cron(CronExpression.EVERY_30_MINUTES)
    handleCron() {
        this.logger.debug('Called every 30 seconds');
    }
}
