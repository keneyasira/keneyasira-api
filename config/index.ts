import { validateOrReject } from 'class-validator';
import { config as dotEnvConfig } from 'dotenv';
import { resolve } from 'path';

import { Config } from './default';

export async function getConfig(): Promise<Config> {
    const nodeEnv = process.env.NODE_ENV || 'development';

    dotEnvConfig({ path: resolve(process.cwd(), `.env.${nodeEnv}`) });

    const { default: config } = await import(`./${nodeEnv}`);

    await validateOrReject(config);

    return config;
}
