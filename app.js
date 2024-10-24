require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const userRoutes = require('./routes/userroutes');
const expenseRoutes = require('./routes/expenseroutes');
const purchaseRoutes = require('./routes/purchaseroutes');
const premiumFeaturesRoutes = require('./routes/premiumfeaturesroutes');
const sequelize = require('./util/database');

// Import models
const User = require('./models/user'); // Adjust the path as needed
const Expense = require('./models/expense'); // Adjust the path as needed

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve HTML files
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/expenses', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'expenses.html'));
});

app.get('/premium', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'premiumfeatures.html'));
});

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/premium', purchaseRoutes);
app.use('/api/premium', premiumFeaturesRoutes); // This should come after purchaseRoutes

// Set up associations
User.associate({ Expense });
Expense.associate({ User });

// Error handling for unmatched routes
app.use((req, res) => {
    res.status(404).send('Not Found');
});

// Sync database and start server
sequelize.sync()
    .then(() => {
        app.listen(3000, () => {
            console.log('Server running on http://localhost:3000');
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });