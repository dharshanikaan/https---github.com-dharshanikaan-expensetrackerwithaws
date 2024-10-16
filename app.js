const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const userRoutes = require('./routes/userroutes');
const sequelize = require('./util/database');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve the signup HTML file at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});

// Use the user routes
app.use('/api', userRoutes);

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