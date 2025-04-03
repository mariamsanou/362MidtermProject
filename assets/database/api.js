const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const pool = new Pool({
    user: 'your_username',
    host: 'localhost',
    database: 'your_database',
    password: 'your_password',
    port: 5432
});

app.use(cors());
app.use(express.json());

// Get reviews for a specific restaurant
app.get('/reviews/:restaurant', async (req, res) => {
    try {
        const { restaurant } = req.params;
        const result = await pool.query('SELECT * FROM reviews WHERE restaurant_name = $1', [restaurant]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// Post a new review
app.post('/reviews', async (req, res) => {
    try {
        const { restaurant_name, user_name, rating, review_text } = req.body;
        await pool.query(
            'INSERT INTO reviews (restaurant_name, user_name, rating, review_text) VALUES ($1, $2, $3, $4)',
            [restaurant_name, user_name, rating, review_text]
        );
        res.status(201).send("Review added");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

// Get average rating of a restaurant
app.get('/average-rating/:restaurant', async (req, res) => {
    try {
        const { restaurant } = req.params;
        const result = await pool.query('SELECT AVG(rating) FROM reviews WHERE restaurant_name = $1', [restaurant]);
        res.json({ average: result.rows[0].avg });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

app.listen(5000, () => console.log('Server running on port 5000'));
