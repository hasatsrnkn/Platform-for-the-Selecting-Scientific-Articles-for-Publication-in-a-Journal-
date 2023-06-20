const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const SectionEditor = require("./UserModels/sectionEditorModel");

const Paper = require("./PaperModels/paperModel");
const Reviewer = require("./UserModels/reviewerModel");

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


Section.hasMany(Reviewer, {
  foreignKey: { name: "idSection" },
  sourceKey: "idSection",
  primaryKey: true,
});

Reviewer.belongsTo(Section, {
  foreignKey: "idSection",
  targetKey: "idSection",
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
});

module.exports = Section;
