const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Section = sequelize.define('section', {
    idSection: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Section;