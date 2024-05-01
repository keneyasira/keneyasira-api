import { Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

let connection: Sequelize;
let exitCode = 0;

async function main() {
    const ormconfig = await import('../../config/ormconfig');

    connection = new Sequelize(ormconfig);
    await connection.query(`
        TRUNCATE access_group,
                 difficulty,
                 image,
                 media,
                 pack,
                 page_type,
                 persona,
                 tag,
                 user,
                 media_group,
                 media_order_in_group,
                 media_persona,
                 media_tag,
                 pack_media_group,
                 page,
                 page_tag,
                 highlight,
                 sponsor,
                 section,
                 category,
                 thematic,
                 user_pack_access_group,               
      `);
}

main()
    .then(() => {
        Logger.log(`database has been cleaned!`);
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
