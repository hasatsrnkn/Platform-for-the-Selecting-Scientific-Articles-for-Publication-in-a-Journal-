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
  doi: Sequelize.STRING,
  pmid: Sequelize.BIGINT,
  abstract: Sequelize.TEXT,
  idJournal: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  idJournalIssue: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  paperFilePath: Sequelize.STRING,
});

module.exports = Paper;
