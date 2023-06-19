const Sequelize = require("sequelize");
const sequelize = require("../../util/database");
const Section = require("../sectionModel");

const ChiefEditor = sequelize.define("chiefeditor", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

ChiefEditor.hasMany(Section, {
  foreignKey: { name: "idChiefEditor" },
  sourceKey: "id",
  primaryKey: true,
});

Section.belongsTo(ChiefEditor, {
  foreignKey: "idChiefEditor",
  targetKey: "id",
});

module.exports = ChiefEditor;
