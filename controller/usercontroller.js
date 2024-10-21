const Razorpay = require('razorpay');
const User = require('../models/user');
const Order = require('../models/order');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const razorpay = new Razorpay({
    key_id: 'your_key_id',
    key_secret: 'your_key_secret'
});
const createOrder = async (req, res) => {
    try {
        const options = {
            amount: 50000, // Amount in paisa (₹500)
            currency: "INR",
            receipt: `receipt#${Date.now()}`,
            notes: {
                userId: req.userId
            }
        };

        const order = await razorpay.orders.create(options);
        await Order.create({ userId: req.userId, orderId: order.id, status: 'PENDING' });
        res.status(201).json({ orderId: order.id });
    } catch (error) {
        console.error('Error creating order:', error); // Log the complete error
        res.status(500).json({ message: 'Error creating order.', error: error.message });
    }
};
const handlePaymentSuccess = async (req, res) => {
    const { orderId, paymentId } = req.body;

    try {
        const order = await Order.findOne({ where: { orderId } });
        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }

        order.status = 'SUCCESSFUL'; // Update order status
        await order.save();

        // Update user to premium
        await User.update({ isPremium: true }, { where: { id: order.userId } });

        res.status(200).json({ message: 'Payment successful.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error handling payment.' });
    }
};

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

        const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({ message: 'User login successful.', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in.' });
    }
};

module.exports = { signup, login, createOrder, handlePaymentSuccess };