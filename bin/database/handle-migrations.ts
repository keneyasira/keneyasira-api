import { Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { SequelizeStorage, Umzug } from 'umzug';

const acceptedOptions = ['RUN', 'REVERT_ONE'];

const option = (process.argv[2] || '').toUpperCase();
let connection: Sequelize;
let exitCode = 0;

async function main() {
    if (!acceptedOptions.includes(option)) {
        throw new Error(
            `The option "${option}" is not recognized. It should be: ${acceptedOptions.join(
                ' or ',
            )}`,
        );
    }
    const ormconfig = await import('../../config/ormconfig');

    connection = new Sequelize(ormconfig);

    const umzug = new Umzug({
        migrations: {
            glob: '**/database/migrations/*.js',
            resolve: ({ name, path, context }) => {
                console.log('Migration file path: ', path);
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const migration = require(path as string);

                return {
                    // adjust the parameters Umzug will
                    // pass to migration methods when called
                    name,
                    up: async () => migration.up(context, Sequelize),
                    down: async () => migration.down(context, Sequelize),
                };
            },
        },
        context: connection.getQueryInterface(),
        storage: new SequelizeStorage({ sequelize: connection }),
        logger: console,
    });

    switch (option) {
        case 'RUN':
            await (async () => {
                try {
                    await connection.authenticate();
                    await umzug.up();
                    console.log('Connection established and migrations run.');
                } catch (error) {
                    console.error('Unable to connect to the database:', error);
                }
            })();
            break;
        case 'REVERT_ONE':
            await (async () => {
                try {
                    await connection.authenticate();
                    await umzug.down();
                    console.log('Connection established and migration undone.');
                } catch (error) {
                    console.error('Unable to connect to the database:', error);
                }
            })();
            break;
    }
}

main()
    .then(() => {
        Logger.log(`Migrations were run !`);
    })
    .catch((e) => {
        console.log(e);
        Logger.error(e.message);
        exitCode = 1;
    })
    .finally(async () => {
        if (connection) {
            await connection.close();
        }
        process.exit(exitCode);
    });
