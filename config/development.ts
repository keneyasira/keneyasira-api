import { BaseDatabaseConfig, Config } from './default';

class DevDatabaseConfig extends BaseDatabaseConfig {}

class DevConfig extends Config {
    database = new DevDatabaseConfig();
}

export default new DevConfig();
