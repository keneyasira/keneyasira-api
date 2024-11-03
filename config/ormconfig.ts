/* eslint-disable @typescript-eslint/no-var-requires */
import { validateSync } from 'class-validator';
import { config as dotEnvConfig } from 'dotenv';
import { resolve } from 'path';

import { Config } from './default';

function selectConfig(nodeEnv: string): Config {
    dotEnvConfig({ path: resolve(process.cwd(), `.env.${nodeEnv}`) });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-require-imports
    const { default: config } = require(`./${nodeEnv}`);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    validateSync(config);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return config;
}

const { database } = selectConfig(process.env.NODE_ENV || 'development');

export = database;
