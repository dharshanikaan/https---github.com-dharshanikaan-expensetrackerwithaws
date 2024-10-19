const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Expense = sequelize.define('Expense', {
    amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

module.exports = Expense;