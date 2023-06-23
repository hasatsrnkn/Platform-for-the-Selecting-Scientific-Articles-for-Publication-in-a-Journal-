const Sequelize = require("sequelize");
const sequelize = require("../../util/database");

const PaperItem = sequelize.define("paperItem", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  reviewed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },

  assigned: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },

  bidLevel: {
    type: Sequelize.INTEGER, 
    defaultValue: 0,
  }

  
});

module.exports = PaperItem;
