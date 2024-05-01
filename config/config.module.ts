import { Module } from '@nestjs/common';

import { getConfig } from '.';
import { Config } from './default';

@Module({
    exports: [Config],
    providers: [
        {
            provide: Config,
            useFactory: async () => {
                try {
                    return await getConfig();
                } catch (err) {
                    throw new Error((err as Error).toString());
                }
            },
        },
    ],
})
export class ConfigModule {}
