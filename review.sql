CREATE TABLE reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(100),
  location VARCHAR(100),
  rating INT,
  review TEXT,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
