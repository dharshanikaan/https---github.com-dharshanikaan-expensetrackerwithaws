const express = require('express');
const { signup, login, createOrder, handlePaymentSuccess } = require('../controller/usercontroller');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/premium', authenticateToken, createOrder);
router.post('/premium/success', authenticateToken, handlePaymentSuccess);

module.exports = router;