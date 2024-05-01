import { BaseDatabaseConfig, BaseLoggerConfig, Config } from './default';

class TestDatabaseConfig extends BaseDatabaseConfig {
    host = process.env.POSTGRES_HOST || 'localhost';
    database = 'smartfit_api_test';
    logging = console.log;
}

class TestLoggerConfig extends BaseLoggerConfig {
    enabled = true;
    level = 'error';
}

class TestConfig extends Config {
    nodeEnv = 'test';
    database = new TestDatabaseConfig();
    logger = new TestLoggerConfig();
}

export default new TestConfig();
