const Expense = require('../models/expense');

const addExpense = async (req, res) => {
    const { amount, description, category } = req.body;
    const userId = req.userId; // Get userId from the token

    if (!amount || !description || !category) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newExpense = await Expense.create({ amount, description, category, userId });
        res.status(201).json(newExpense);
    } catch (error) {
        console.error('Error adding expense:', error.message);
        res.status(500).json({ message: 'Error adding expense.', error: error.message });
    }
};

const getExpenses = async (req, res) => {
    const userId = req.userId; // Get userId from the token

    try {
        const expenses = await Expense.findAll({ where: { userId } });
        res.status(200).json(expenses);
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({ message: 'Error fetching expenses.' });
    }
};

const deleteExpense = async (req, res) => {
    const { expenseId } = req.body;
    const userId = req.userId; // Get userId from the token

    try {
        const expense = await Expense.findOne({ where: { id: expenseId, userId } });

        if (!expense) {
            return res.status(404).json({ message: 'Expense not found or user not authorized.' });
        }

        await Expense.destroy({ where: { id: expenseId } });
        res.status(200).json({ message: 'Expense deleted successfully.' });
    } catch (error) {
        console.error('Error deleting expense:', error.message);
        res.status(500).json({ message: 'Error deleting expense.', error: error.message });
    }
};

module.exports = { addExpense, getExpenses, deleteExpense };