const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Grade = sequelize.define("grade", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  grade1: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  grade2: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  grade3: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  grade4: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  grade5: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  grade6: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  grade7: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  grade8: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  grade9: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  grade10: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  grade11: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  grade12: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  grade13: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = Grade;
