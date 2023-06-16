const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Paper = sequelize.define('paper', {
    idEdition: {
        type: Sequelize.SMALLINT,
        primaryKey: true
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
    startPage: Sequelize.VARCHAR(15), 
    endPage: Sequelize.VARCHAR(15),
    abstract: Sequelize.TEXT,
    idJournal: {
        type: Sequelize.INT,
        allowNull: false,
    },
    idJournalIssue: {
        type: Sequelize.INT,
        allowNull: false,
    },
    paperFilePath: Sequelize.STRING    
});

module.exports = Paper;