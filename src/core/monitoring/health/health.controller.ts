import { Controller, Get } from '@nestjs/common';
import {
    HealthCheck,
    HealthCheckResult,
    HealthCheckService,
    SequelizeHealthIndicator,
} from '@nestjs/terminus';

import { Public } from '../../../authentication/decorators/is-public.decorator';

@Controller('health')
export class HealthController {
    constructor(
        private readonly healthCheckService: HealthCheckService,
        private readonly sequelizeHealthIndicator: SequelizeHealthIndicator,
    ) {}

    @Public()
    @Get()
    @HealthCheck()
    healthCheck(): Promise<HealthCheckResult> {
        return this.healthCheckService.check([
            async () => this.sequelizeHealthIndicator.pingCheck('database', { timeout: 500 }),
        ]);
    }
}
