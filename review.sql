CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  location_id TEXT NOT NULL,
  username TEXT NOT NULL,
  comment TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
