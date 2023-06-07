const Sequelize = require("sequelize");

const sequelize = new Sequelize("review-platform", "root", "Qwe220995", {
  // review-platform is the name of database
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
