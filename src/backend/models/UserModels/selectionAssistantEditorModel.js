const Sequelize = require("sequelize");
const sequelize = require("../../util/database");

const User = require("./userModel");

const SelectionAssistantEditor = sequelize.define("selectionassistanteditor", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
});

module.exports = SelectionAssistantEditor;