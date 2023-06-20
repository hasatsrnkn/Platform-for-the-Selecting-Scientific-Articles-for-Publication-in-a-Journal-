const Sequelize = require("sequelize");

const sequelize = require("../../util/database");
const Reviewer = require("./reviewerModel");
const ChiefEditor = require("./chiefEditorModel");
const VicePresident = require("./vicePresidentModel");
const SelectionAssistantEditor = require("./selectionAssistantEditorModel");
const SectionEditor = require("./sectionEditorModel");
const Organization = require("../OrganizationModels/organizationModel");
const OrganizationItem = require("../OrganizationModels/organization-item-Model");

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
  resetToken: Sequelize.STRING,
  resetTokenExpiration: Sequelize.DATE,
});

User.belongsToMany(Organization, { through: OrganizationItem });
Organization.belongsToMany(User, { through: OrganizationItem });

User.hasOne(ChiefEditor, {
  foreignKey: { name: "idUser", unique: true },
  sourceKey: "idUser",
  primaryKey: true,
  onDelete: "CASCADE",
});
ChiefEditor.belongsTo(User, {
  foreignKey: "idUser",
  targetKey: "idUser",
  onDelete: "CASCADE",
  constraints: true,
});

User.hasOne(Reviewer, {
  foreignKey: { name: "idUser", unique: true },
  sourceKey: "idUser",
  primaryKey: true,
  onDelete: "CASCADE",
});
Reviewer.belongsTo(User, {
  foreignKey: "idUser",
  targetKey: "idUser",
  onDelete: "CASCADE",
  constraints: true,
});

User.hasOne(SectionEditor, {
  foreignKey: { name: "idUser", unique: true },
  sourceKey: "idUser",
  primaryKey: true,
  onDelete: "CASCADE",
});
SectionEditor.belongsTo(User, {
  foreignKey: "idUser",
  targetKey: "idUser",
  onDelete: "CASCADE",
  constraints: true,
});

User.hasOne(SelectionAssistantEditor, {
  foreignKey: { name: "idUser", unique: true },
  sourceKey: "idUser",
  primaryKey: true,
  onDelete: "CASCADE",
});
SelectionAssistantEditor.belongsTo(User, {
  foreignKey: "idUser",
  targetKey: "idUser",
  onDelete: "CASCADE",
  constraints: true,
});

User.hasOne(VicePresident, {
  foreignKey: { name: "idUser", unique: true },
  sourceKey: "idUser",
  primaryKey: true,
  onDelete: "CASCADE",
});
VicePresident.belongsTo(User, {
  foreignKey: "idUser",
  targetKey: "idUser",
  onDelete: "CASCADE",
});

module.exports = User;
