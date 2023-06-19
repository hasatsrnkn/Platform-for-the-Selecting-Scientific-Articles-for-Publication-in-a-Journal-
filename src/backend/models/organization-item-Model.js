const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const OrganizationItem = sequelize.define("organizationItem", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  organizationEmail: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = OrganizationItem;
