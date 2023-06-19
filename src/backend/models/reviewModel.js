const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Review = sequelize.define('review', {
    idReview: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    topicImportance: Sequelize.INTEGER,
    include: Sequelize.INTEGER,
    scientificPracticalImpact:Sequelize.INTEGER,
    scientificContent: Sequelize.INTEGER,
    originality: Sequelize.INTEGER,
    literature: Sequelize.INTEGER,
    presentation:Sequelize.INTEGER,
    comment: Sequelize.TEXT,
    fullReview: Sequelize.BOOLEAN,
});



module.exports = Review;