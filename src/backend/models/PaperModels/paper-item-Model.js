const Sequelize = require("sequelize");
const sequelize = require("../../util/database");

const PaperItem = sequelize.define("paperItem", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  }

});

module.exports = PaperItem;
