const Sequelize = require("sequelize");
const sequelize = require("../../util/database");

const User = require("./userModel");

const SectionEditor = sequelize.define("sectioneditor", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
});

module.exports = SectionEditor;