module.exports = {
    up: (queryInterface) =>
        queryInterface.sequelize.query(`
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
            CREATE EXTENSION IF NOT EXISTS "ltree" 
            `),
    down: (queryInterface) =>
        queryInterface.sequelize.query(`
            DROP EXTENSION IF EXISTS "uuid-ossp";
            DROP EXTENSION IF EXISTS "ltree";
            `),
};
