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

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define a Review schema
const reviewSchema = new mongoose.Schema({
  locationId: { type: String, required: true },
  name: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 }
}, { timestamps: true }); // Add timestamps option

const Review = mongoose.model('Review', reviewSchema);

// API endpoint to submit a review
app.post('/api/reviews', async (req, res) => {
const { locationId, name, comment, rating } = req.body;
const review = new Review({ locationId, name, comment, rating });
await review.save();
res.status(201).send(review);
});

// API endpoint to get reviews for a specific location
app.get('/api/reviews/:locationId', async (req, res) => {
const reviews = await Review.find({ locationId: req.params.locationId });
res.send(reviews);
});

app.get('/test', (req, res) => {
    res.send('Server is alive!');
  });
  

// Start server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
