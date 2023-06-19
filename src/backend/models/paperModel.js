const Sequelize = require("sequelize");

const sequelize = require("../util/database");
const Review = require("./reviewModel");

const Paper = sequelize.define("paper", {
  idPaper: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: { type: Sequelize.STRING, allowNull: false },
  authors: {
    type: Sequelize.TEXT,
    allowNull: false,
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

Paper.hasMany(Review, {
  foreignKey: { name: "idPaper", onDelete: "CASCADE" },
  sourceKey: "idPaper",
  primaryKey: true,
  onDelete: "CASCADE",
});

Review.belongsTo(Paper, {
  foreignKey: "idPaper",
  targetKey: "idPaper",
  constraints: true,
  onDelete: "CASCADE",
});

module.exports = Paper;
