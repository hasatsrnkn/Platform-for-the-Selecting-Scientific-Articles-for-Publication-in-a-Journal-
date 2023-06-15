const Sequelize = require("sequelize");
const sequelize = require("../../util/database");

const User = require("./userModel");
const Grade = require("../gradeModel");

const Reviewer = sequelize.define("reviewer", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

Reviewer.hasOne(Grade, {
  foreignKey: { name: "idUser", unique: true, onDelete: "CASCADE" },
  sourceKey: "id",
  primaryKey: true,
  onDelete: "CASCADE",

});
Grade.belongsTo(Reviewer, {
  foreignKey: "idUser",
  targetKey: "id",
  constraints: true,
  onDelete: "CASCADE",
});

module.exports = Reviewer;
