/* eslint-disable @typescript-eslint/no-var-requires */
import { validateSync } from 'class-validator';
import { config as dotEnvConfig } from 'dotenv';
import { resolve } from 'path';

import { Config } from './default';

function selectConfig(nodeEnv: string): Config {
    dotEnvConfig({ path: resolve(process.cwd(), `.env.${nodeEnv}`) });

    const { default: config } = require(`./${nodeEnv}`);

    validateSync(config);

    return config;
}

const { database } = selectConfig(process.env.NODE_ENV || 'development');

export = database;
