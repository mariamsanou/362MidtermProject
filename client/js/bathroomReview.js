// bathroomReview.js

// Submit review to the server
async function submitReview(locationId) {
    const name = document.getElementById(`user-name-${locationId}`).value.trim();
    const comment = document.getElementById(`review-comment-${locationId}`).value.trim();
    const rating = parseInt(document.getElementById(`review-rating-${locationId}`).value);

    if (!name || !comment || isNaN(rating) || rating < 1 || rating > 5) {
        alert("Please enter a valid name, comment, and rating between 1-5.");
        return;
    }

    const review = { locationId, name, comment, rating };

    // Send review to the server
    const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    });

    if (response.ok) {
        // Clear form
        document.getElementById(`user-name-${locationId}`).value = '';
        document.getElementById(`review-comment-${locationId}`).value = '';
        document.getElementById(`review-rating-${locationId}`).value = '';

        // Refresh reviews
        showReviews(locationId);
        hideReviewForm(locationId);
        alert("Thank you for your review!");
    } else {
        alert("Failed to submit review.");
    }
}

// Display reviews from the server
async function showReviews(locationId) {
    const response = await fetch(`/api/reviews/${locationId}`);
    const reviews = await response.json();
    const container = document.getElementById(`reviews-${locationId}`);
    const ratingDisplay = document.getElementById(`rating-${locationId}`);

    if (reviews.length === 0) {
        container.innerHTML = "<p>No reviews yet.</p>";
        ratingDisplay.textContent = "Average Rating: No reviews";
        return;
    }

    let total = 0;
    const reviewHTML = reviews.map(review => {
        total += review.rating;
        return `
            <div class="review">
                <strong>${review.name}</strong>
                <p>${review.comment}</p>
                <p>Rating: ${review.rating}/5</p>
            </div>
        `;
    }).join('');

    const averageRating = (total / reviews.length).toFixed(1);
    container.innerHTML = reviewHTML;
    ratingDisplay.textContent = `Average Rating: ${averageRating}/5`;
}

// Show review form
function showReviewForm(locationId) {
    document.getElementById(`review-form-${locationId}`).style.display = 'block';
}

// Hide review form
function hideReviewForm(locationId) {
    document.getElementById(`review-form-${locationId}`).style.display = 'none';
}

// Load initial data on page load
window.onload = function() {
    const locations = ['campus-center-first', 'campus-center-second', 'etec', 'academic-buildings'];
    locations.forEach(location => showReviews(location));
};