const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Section = sequelize.define('section', {
    idSection: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING
});

module.exports = Section;