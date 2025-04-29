require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // Import path module

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Define a Restaurant schema
const RestaurantSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    link: String,
    reviews: [{ 
        user: String, 
        comment: String, 
        rating: Number 
    }]
});

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

// API to get all restaurants
// API to get reviews for a specific restaurant
app.get('/restaurants/:id/reviews', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        res.json(restaurant.reviews);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// API to add a review for a specific restaurant
app.post('/restaurants/:id/reviews', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        restaurant.reviews.push(req.body);
        await restaurant.save();
        res.json(restaurant.reviews);
    } catch (err) {
        res.status(500).send(err.message);
    }
});