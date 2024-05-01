import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

import { BaseDatabaseConfig, Config } from './default';

class ProdDatabaseConfig extends BaseDatabaseConfig {
    logging = false;

    @IsString()
    @IsNotEmpty()
    host = process.env.POSTGRES_HOST!;

    @IsString()
    @IsNotEmpty()
    username = process.env.POSTGRES_USER!;

    @IsString()
    @IsNotEmpty()
    password = process.env.POSTGRES_PASSWORD!;

    @IsString()
    @IsNotEmpty()
    database = process.env.POSTGRES_DB!;

    @IsNumber()
    @IsNotEmpty()
    port = Number(process.env.POSTGRES_PORT!);
}

class ProdConfig extends Config {
    nodeEnv = 'production';

    @IsString()
    @IsNotEmpty()
    version = process.env.VERSION!;

    @IsString()
    @IsNotEmpty()
    env = process.env.ENV!;

    @IsNumber()
    @IsNotEmpty()
    port = Number(process.env.APP_PORT!);

    database = new ProdDatabaseConfig();

    @IsUrl()
    @IsNotEmpty()
    sentryDSN = process.env.SENTRY_DSN!;
}

export default new ProdConfig();
