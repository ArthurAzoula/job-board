const { Sequelize } = require('sequelize');

module.exports = new Sequelize('job_board', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});