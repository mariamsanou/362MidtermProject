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



exports.createRating = async (req, res) => {
    const { locationId, name, rating, comment } = req.body;

    const newRating = new Rating({
        locationId,
        name,
        comment,
        rating,
    });

    try {
        const savedRating = await newRating.save();
        res.status(201).json({ success: true, data: savedRating });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
