const User = require('../models/user');

const getLeaderboard = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'totalexpense'], // Ensure we select these attributes
            order: [['totalexpense', 'DESC']]
        });

        console.log('Leaderboard data:', users); // Log the data being sent
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching leaderboard:', error.message);
        res.status(500).json({ message: 'Error fetching leaderboard.' });
    }
};

module.exports = { getLeaderboard };