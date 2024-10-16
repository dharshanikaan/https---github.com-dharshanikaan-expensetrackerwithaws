const express = require('express');
const { signup, login } = require('../controller/usercontroller');

const router = express.Router();

// Sign up route
router.post('/signup', signup);

// Login route
router.post('/login', login);

module.exports = router;