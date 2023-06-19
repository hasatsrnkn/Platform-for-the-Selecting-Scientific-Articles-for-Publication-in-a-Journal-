const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const SectionEditor = require("./UserModels/sectionEditorModel");

const Paper = require("./paperModel");


const Section = sequelize.define("section", {
  idSection: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

Section.hasMany(SectionEditor, {
  foreignKey: { name: "idSection" },
  sourceKey: "idSection",
  primaryKey: true,
});

SectionEditor.belongsTo(Section, {
  foreignKey: "idSection",
  targetKey: "idSection",
});

Section.hasMany(Paper, {
  foreignKey: { name: "idSection" },
  sourceKey: "idSection",
  primaryKey: true,
});

Paper.belongsTo(Section, {
  foreignKey: "idSection",
  targetKey: "idSection",
})

module.exports = Section;
