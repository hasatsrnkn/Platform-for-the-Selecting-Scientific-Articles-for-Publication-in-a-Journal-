const Sequelize = require("sequelize");

const sequelize = require("../../util/database");
const Reviewer = require("./reviewerModel");
const ChiefEditor = require("./chiefEditorModel");
const VicePresident = require("./vicePresidentModel");
const SelectionAssistantEditor = require("./selectionAssistantEditorModel")
const SectionEditor = require("./sectionEditorModel");

const User = sequelize.define("user", {
  idUser: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  surname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: Sequelize.STRING,
});

User.hasOne(ChiefEditor, {
  foreignKey: { name: "idUser", unique: true },
  sourceKey: "idUser",
  primaryKey: true,
});
ChiefEditor.belongsTo(User, { foreignKey: "idUser", targetKey: "idUser" });

User.hasOne(Reviewer, {
  foreignKey: { name: "idUser", unique: true },
  sourceKey: "idUser",
  primaryKey: true,
});
Reviewer.belongsTo(User, { foreignKey: "idUser", targetKey: "idUser" });

User.hasOne(SectionEditor, {
  foreignKey: { name: "idUser", unique: true },
  sourceKey: "idUser",
  primaryKey: true,
});
SectionEditor.belongsTo(User, { foreignKey: "idUser", targetKey: "idUser" });

User.hasOne(SelectionAssistantEditor, {
  foreignKey: { name: "idUser", unique: true },
  sourceKey: "idUser",
  primaryKey: true,
});
SelectionAssistantEditor.belongsTo(User, { foreignKey: "idUser", targetKey: "idUser" });

User.hasOne(VicePresident, {
  foreignKey: { name: "idUser", unique: true },
  sourceKey: "idUser",
  primaryKey: true,
});
VicePresident.belongsTo(User, { foreignKey: "idUser", targetKey: "idUser" });

module.exports = User;
