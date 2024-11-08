import { IsNotEmpty, IsNumber, IsString, IsUrl, ValidateNested } from 'class-validator';

import { BaseClientConfig, BaseDatabaseConfig, Config } from './default';

export class ProdClientConfig extends BaseClientConfig {
    @IsUrl()
    @IsNotEmpty()
    adminUrl = process.env.ADMIN_CLIENT_URL!;

    @IsUrl()
    @IsNotEmpty()
    patientUrl = process.env.PATIENT_CLIENT_URL!;

    @IsUrl()
    @IsNotEmpty()
    practicianUrl = process.env.PRACTICIAN_CLIENT_URL!;

    @IsUrl()
    @IsNotEmpty()
    collaboratorUrl = process.env.COLLABORATOR_CLIENT_URL!;
}

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

    @ValidateNested()
    database = new ProdDatabaseConfig();

    @ValidateNested()
    clients = new ProdClientConfig();

    @IsString()
    @IsNotEmpty()
    jwt_secret = process.env.JWT_SECRET!;
}

export default new ProdConfig();
