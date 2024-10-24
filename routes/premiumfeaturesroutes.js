const express = require('express');
const { getLeaderboard } = require('../controller/premiumfeaturescontroller');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Route to get leaderboard
router.get('/leaderboard', authenticateToken, getLeaderboard);

module.exports = router;