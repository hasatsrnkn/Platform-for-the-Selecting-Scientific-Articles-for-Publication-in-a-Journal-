const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Rewiew = sequelize.define('review', {
    idReview: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    topicImportance: Sequelize.INTEGER,
    include: Sequelize.INTEGER,
    scientficPracticalImpact:Sequelize.INTEGER,
    scientficContent: Sequelize.INTEGER,
    originality: Sequelize.INTEGER,
    literature: Sequelize.INTEGER,
    presentation:Sequelize.INTEGER,
    comment: Sequelize.TEXT
});

module.exports = Rewiew;