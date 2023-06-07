const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
    idUser: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    surname: Sequelize.STRING,
    gender:Sequelize.STRING,
    email: Sequelize.STRING,
    //password:Sequelize.password,
    role: Sequelize.STRING
});

module.exports = User;