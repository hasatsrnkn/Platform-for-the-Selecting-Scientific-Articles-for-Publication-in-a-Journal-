const Sequelize = require("sequelize");
const sequelize = require("../../util/database");

const Grade = require("../gradeModel");
const Review = require("../reviewModel");

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

Reviewer.hasMany(Review, {
  foreignKey: { name: "idUser", onDelete: "CASCADE" },
  sourceKey: "id",
  primaryKey: true,
  onDelete: "CASCADE",
});

Review.belongsTo(Reviewer, {
  foreignKey: "idUser",
  targetKey: "id",
  constraints: true,
  onDelete: "CASCADE",
});

module.exports = Reviewer;
