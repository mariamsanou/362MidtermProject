const Rating = require('../models/Rating');

// Get all ratings
exports.getRatings = async (req, res) => {
    try {
        const ratings = await Rating.find();
        res.json(ratings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new rating
exports.createRating = async (req, res) => {
    const { location, rating, comment } = req.body;

    const newRating = new Rating({
        location,
        rating,
        comment,
    });

    try {
        const savedRating = await newRating.save();
        res.status(201).json(savedRating);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};