const User = require('../models/user');

const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        const newUser = await User.create({ name, email, password });
        res.status(201).json({ message: 'User created successfully.', userId: newUser.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user.' });
    }
};

module.exports = { signup };