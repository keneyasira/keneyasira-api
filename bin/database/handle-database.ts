import { Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

const acceptedClauses = ['CREATE', 'DROP'];
const clause = (process.argv[2] || '').toUpperCase();
let connection: Sequelize;
let exitCode = 0;

async function main() {
    if (!acceptedClauses.includes(clause)) {
        throw new Error(
            `the clause "${clause}" is not recognized. It should be: ${acceptedClauses.join(
                ' or ',
            )}`,
        );
    }

    const ormconfig = await import('../../config/ormconfig');

    connection = new Sequelize({ ...ormconfig, database: 'postgres' });
    await connection.query(`${clause} DATABASE "${ormconfig.database}";`);
}

main()
    .then(() => {
        Logger.log(`database was ${clause === 'CREATE' ? 'created' : 'dropped'}!`);
    })
    .catch((e) => {
        Logger.error(e.message);
        exitCode = 1;
    })
    .finally(async () => {
        if (connection) {
            await connection.close();
        }
        process.exit(exitCode);
    });
