const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isPremium: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // Track if the user is a premium member
    },
});

module.exports = User;