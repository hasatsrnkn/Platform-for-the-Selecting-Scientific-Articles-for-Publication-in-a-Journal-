const Sequelize = require("sequelize");
const sequelize = require("../../util/database");

const User = require("./userModel");

const VicePresident = sequelize.define("vicepresident", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
});

module.exports = VicePresident;