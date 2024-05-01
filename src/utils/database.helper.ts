/* istanbul ignore file */
import { execSync } from 'child_process';
import { SequelizeOptions } from 'sequelize-typescript';

export function execSqlFile(filePath: string, options: SequelizeOptions): void {
    const { host, port, username, password, database } = options;

    execSync(`psql -h ${host} -p ${port} -U ${username} -f ${filePath} ${database}`, {
        env: {
            ...process.env,
            PGPASSWORD: password && typeof password === 'string' ? password : undefined,
        },
        stdio: ['ignore'],
    });
}
