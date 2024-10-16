const User = require('../models/user');

const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Save the user directly without hashing the password
        const newUser = await User.create({ name, email, password });
        res.status(201).json({ message: 'User created successfully.', userId: newUser.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user.' });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ where: { email } });
        if (!user) {
            // User not found
            return res.status(404).json({ message: 'User not found.' });
        }

        // Check if the password matches
        if (user.password !== password) {  // Avoid plain text in production
            // Unauthorized access
            return res.status(401).json({ message: 'User not authorized.' });
        }

        // If login is successful
        res.status(200).json({ message: 'User login successful.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in.' });
    }
};



module.exports = { signup, login }; // Ensure login is exported