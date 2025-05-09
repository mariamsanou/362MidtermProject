const express = require('express');
const router = express.Router();
const Rating = require('../models/rating');

// POST - Submit a new rating
router.post('/', async (req, res) => {
  const { locationId, name, comment, rating } = req.body;

  // Basic validation
  if (!locationId || !name || !comment || typeof rating !== 'number' || rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  try {
    const newRating = new Rating(req.body);
    const saved = await newRating.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET - Get ratings for a specific location
router.get('/:locationId', async (req, res) => {
  try {
    const ratings = await Rating.find({ locationId: req.params.locationId }).sort({ createdAt: -1 });
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;