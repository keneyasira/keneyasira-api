import { ValidateNested } from 'class-validator';
import { Dialect, Options } from 'sequelize';

export class BaseDatabaseConfig implements Options {
    define = {
        underscored: true,
        paranoid: true,
        // this option is for sequelize to no pluralize the table names
        freezeTableName: true,
    };
    dialect: Dialect = 'postgres';
    host = 'localhost';
    username = process.env.POSTGRES_HOST || 'postgres';
    password = process.env.POSTGRES_PASSWORD || 'postgres';
    database = process.env.POSTGRES_DB || 'keneyasira_api_development';
    port = Number(process.env.POSTGRES_PORT) || 5432;
    keepConnectionAlive = true;
    // pool options from https://node-postgres.com/api/pool
    pool = {
        // we don't want to wait indefinitely when a new client cannot be created
        // e.g. when the postgres server has reached its max allowed clients
        idle: 5000,
        max: 10,
    };
    modelMatch = (filename: string, member: string) => {
        return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
    };
}

export class BaseLoggerConfig {
    enabled = true;
    level = 'info';
    omitFieldForLogs = ['password'];
    omitRoutes = ['/', '/health', '/api-docs'];
}

export class BaseRateLimitConfig {
    max = 300;
    windowMs = 1000;
}

export class BaseClientConfig {
    adminUrl = process.env.ADMIN_CLIENT_URL || 'http://localhost:4200';
    patientUrl = process.env.PATIENT_CLIENT_URL || 'http://localhost:4201';
    practicianUrl = process.env.PRACTICIAN_CLIENT_URL || 'http://localhost:4202';
    collaboratorUrl = process.env.COLLABORATOR_CLIENT_URL || 'http://localhost:4203';
}

export class Config {
    name = 'keneyasira-api';
    version = 'dev';
    nodeEnv = 'development';
    env = 'development';
    port = 4000;
    jwt_secret = process.env.JWT_SECRET || 'secret';

    @ValidateNested()
    database = new BaseDatabaseConfig();

    @ValidateNested()
    logger = new BaseLoggerConfig();

    @ValidateNested()
    ratelimit = new BaseRateLimitConfig();

    @ValidateNested()
    clients = new BaseClientConfig();

    querySearch = {
        limit: {
            default: 25,
            max: 1000,
        },
        defaultLocale: 'fr-FR',
    };

    blacklistProperties = [];
}
