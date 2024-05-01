import { Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { SequelizeStorage, Umzug } from 'umzug';

const acceptedOptions = ['UP', 'DOWN'];

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
            glob: '**/database/seeders/*.js',
            resolve: ({ name, path, context }) => {
                console.log('Seeders file path: ', path);
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const seeder = require(path as string);

                return {
                    // adjust the parameters Umzug will
                    // pass to seeder methods when called
                    name,
                    up: async () => seeder.up(context, Sequelize),
                    down: async () => seeder.down(context, Sequelize),
                };
            },
        },
        context: connection.getQueryInterface(),
        storage: new SequelizeStorage({ sequelize: connection }),
        logger: console,
    });

    switch (option) {
        case 'UP':
            await (async () => {
                try {
                    await connection.authenticate();
                    await umzug.up();
                    console.log('Connection established and seeders run.');
                } catch (error) {
                    console.error('Unable to connect to the database:', error);
                }
            })();
            break;
        case 'DOWN':
            await (async () => {
                try {
                    await connection.authenticate();
                    await umzug.down({ to: 0 });
                    console.log('Connection established and seeders undone.');
                } catch (error) {
                    console.error('Unable to connect to the database:', error);
                }
            })();
            break;
    }
}

main()
    .then(() => {
        Logger.log(`Seeders ${option} !`);
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
