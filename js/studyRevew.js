const defaultFacilities = [
    { id: 'library', name: 'Library' },
    { id: 'science-library', name: 'Science Library' },
    { id: 'etec', name: 'ETEC' }
];

// Load initial data on page load
window.onload = function() {
    const facilities = ['library', 'science-library', 'etec'];
    facilities.forEach(facility => showReviews(facility));
};

// Submit review to the server
async function submitReview(facilityId) {
    const name = document.getElementById(`user-name-${facilityId}`).value.trim();
    const comment = document.getElementById(`review-comment-${facilityId}`).value.trim();
    const rating = parseInt(document.getElementById(`review-rating-${facilityId}`).value);

    if (!name || !comment || isNaN(rating) || rating < 1 || rating > 5) {
        alert("Please enter a valid name, comment, and rating between 1-5.");
        return;
    }

    const review = { locationId: facilityId, name, comment, rating };

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
        document.getElementById(`user-name-${facilityId}`).value = '';
        document.getElementById(`review-comment-${facilityId}`).value = '';
        document.getElementById(`review-rating-${facilityId}`).value = '';

        // Refresh reviews
        showReviews(facilityId);
        hideReviewForm(facilityId);
        alert("Thank you for your review!");
    } else {
        alert("Failed to submit review.");
    }
}

// Display reviews from the server
async function showReviews(facilityId) {
    const response = await fetch(`/api/reviews/${facilityId}`);
    const reviews = await response.json();
    const container = document.getElementById(`reviews-${facilityId}`);
    const ratingDisplay = document.getElementById(`rating-${facilityId}`);

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
                <p>Submitted on: ${new Date(review.createdAt).toLocaleString()}</p> <!-- Display creation date -->
                <hr>
            </div>
        `;
    }).join('');

    const averageRating = (total / reviews.length).toFixed(1);
    container.innerHTML = reviewHTML;
    ratingDisplay.textContent = `Average Rating: ${averageRating}/5`;
}

// Show review form
function showReviewForm(facilityId) {
    document.getElementById(`review-form-${facilityId}`).style.display = 'block';
}

// Hide review form
function hideReviewForm(facilityId) {
    document.getElementById(`review-form-${facilityId}`).style.display = 'none';
}