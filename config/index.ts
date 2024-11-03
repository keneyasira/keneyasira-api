import { validateOrReject } from 'class-validator';
import { config as dotEnvConfig } from 'dotenv';
import { resolve } from 'path';

import { Config } from './default';

export async function getConfig(): Promise<Config> {
    const nodeEnv = process.env.NODE_ENV || 'development';

    dotEnvConfig({ path: resolve(process.cwd(), `.env.${nodeEnv}`) });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { default: config } = await import(`./${nodeEnv}`);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await validateOrReject(config);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return config;
}
