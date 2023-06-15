const Sequelize = require("sequelize");
const sequelize = require("../../util/database");


const ChiefEditor = sequelize.define("chiefeditor", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
});

module.exports = ChiefEditor;