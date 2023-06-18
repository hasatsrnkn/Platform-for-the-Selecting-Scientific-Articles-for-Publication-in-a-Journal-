const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Paper = sequelize.define("paper", {
  idPaper: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: { type: Sequelize.STRING, allowNull: false },
  authors: {
    type: Sequelize.TEXT, allowNull: false
  },
  doi: Sequelize.STRING,
  pmid: Sequelize.STRING,
  abstract: Sequelize.TEXT,
  idJournal: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  idJournalIssue: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  paperFilePath: Sequelize.STRING,
});

module.exports = Paper;
