const Sequelize = require("sequelize");

const sequelize = new Sequelize("review-platform", "root", "", {
  // review-platform is the name of database
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
