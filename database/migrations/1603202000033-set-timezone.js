module.exports = {
    up: (queryInterface) => queryInterface.sequelize.query(`SET TIMEZONE ='Europe/Berlin'`),
    down: (queryInterface) => queryInterface.sequelize.query(`SET TIMEZONE='GMT';`),
};
