const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Paper = sequelize.define('paper', {
    idPaper: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: Sequelize.STRING,
    author: Sequelize.STRING,
    journal:Sequelize.STRING,
    doi: Sequelize.BIGINT,  // what is doi?
    pmid:Sequelize.BIGINT  // what is pmid?
});

module.exports = Paper;