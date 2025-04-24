const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Connect to DB
require('./config/db')();


// Serve static files from the client folder (move this up)
app.use(express.static(path.join(__dirname, '../client')));

// JSON middleware
app.use(express.json());

// Routes
const ratingRoutes = require('./routes/ratingroutes');
app.use('/api/ratings', ratingRoutes);

// Default route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.get('/test', (req, res) => {
    res.send('Server is alive!');
  });
  

// Start server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
