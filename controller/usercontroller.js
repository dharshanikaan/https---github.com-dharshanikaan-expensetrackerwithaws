const User = require('../models/user');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user.' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'User not authorized.' });
        }

        // Here, you might want to set a session or token
        res.status(200).json({ message: 'User login successful.', userId: user.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in.' });
    }
};

module.exports = { signup, login };