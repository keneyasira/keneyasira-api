import { Config } from '@config/default';
import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class RootController {
    constructor(private readonly config: Config) {}

    @Get()
    getInfo(): {
        name: string | undefined;
        version: string | undefined;
        environment: string | undefined;
    } {
        return {
            name: this.config.name,
            version: this.config.version,
            environment: this.config.nodeEnv,
        };
    }
}
