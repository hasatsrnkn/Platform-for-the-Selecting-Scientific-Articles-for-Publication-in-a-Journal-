const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Paper = sequelize.define('paper', {
    idEdition: {
        type: Sequelize.SMALLINT,
        // primaryKey: true
    },
    idPaper: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: Sequelize.STRING,
    doi: Sequelize.STRING,  
    pmid:Sequelize.BIGINT, 
    startPage: Sequelize.STRING, 
    endPage: Sequelize.STRING,
    abstract: Sequelize.TEXT,
    idJournal: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    idJournalIssue: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    paperFilePath: Sequelize.STRING    
});

module.exports = Paper;