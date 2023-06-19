const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Organization = sequelize.define("organization", {
  idOrganization: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: { type: Sequelize.TEXT, allowNull: false },
  country: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

module.exports = Organization;
