const express = require('express');
const { signup } = require('../controller/usercontroller');

const router = express.Router();

// Sign up route
router.post('/signup', signup);

module.exports = router;