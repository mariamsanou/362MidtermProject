//
//  healthReviews.js
//  
//
//  Created by W. Mariam Sanou on 4/21/25.
//
// healthReviews.js

// Function to submit a review for a health facility
async function submitReview(locationId) {
    const name = document.getElementById(`user-name-${locationId}`).value.trim();
    const comment = document.getElementById(`review-comment-${locationId}`).value.trim();
    const rating = parseInt(document.getElementById(`review-rating-${locationId}`).value);

    // Validate input
    if (!name || !comment || isNaN(rating) || rating < 1 || rating > 5) {
        alert("Please enter a valid name, comment, and rating between 1-5.");
        return;
    }

    const review = { name, comment, rating };

    // Send review to the server (you can implement this function)
    await saveReviewToServer(locationId, review);

    // Clear form fields
    document.getElementById(`user-name-${locationId}`).value = '';
    document.getElementById(`review-comment-${locationId}`).value = '';
    document.getElementById(`review-rating-${locationId}`).value = '';

    // Refresh reviews
    showReviews(locationId);
    hideReviewForm(locationId);
}

// Function to show reviews for a health facility
async function showReviews(locationId) {
    const reviews = await getReviewsFromServer(locationId);
    const container = document.getElementById(`reviews-${locationId}`);
    const ratingDisplay = document.querySelector(`#rating-${locationId}`);

    if (reviews.length === 0) {
        container.innerHTML = "<p>No reviews yet.</p>";
        if (ratingDisplay) ratingDisplay.textContent = "Average Rating: No reviews";
        return;
    }

    let total = 0;
    const reviewHTML = reviews.map(review => {
        total += review.rating;
        return `
            <div class="review">
                <p><strong>${review.name}</strong></p>
                <p>${review.comment}</p>
                <p>Rating: ${review.rating}/5</p>
                <hr>
            </div>
        `;
    }).join("");

    const avg = (total / reviews.length).toFixed(1);
    if (ratingDisplay) ratingDisplay.textContent = `Average Rating: ${avg}/5`;

    container.innerHTML = reviewHTML;
}

// Function to show the review form
function showReviewForm(locationId) {
    document.getElementById(`review-form-${locationId}`).style.display = 'block';
}

// Function to hide the review form
function hideReviewForm(locationId) {
    document.getElementById(`review-form-${locationId}`).style.display = 'none';
}

// Function to get reviews from the server for a health facility
async function getReviewsFromServer(locationId) {
    const response = await fetch(`/api/reviews/${locationId}`);
    if (!response.ok) {
        console.error('Failed to fetch reviews:', response.statusText);
        return [];
    }
    return await response.json();
}

// Function to save a review to the server for a health facility
async function saveReviewToServer(locationId, review) {
    const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ locationId, ...review })
    });

    if (!response.ok) {
        alert("Failed to submit review.");
        console.error('Error submitting review:', response.statusText);
    }
}

// Call this function to load initial data when the page loads
function loadInitialData() {
    const facilities = ['library', 'science-library', 'etec'];
    facilities.forEach(locationId => showReviews(locationId));
}

// Load initial data on page load
window.onload = loadInitialData;