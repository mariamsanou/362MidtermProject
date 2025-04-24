const defaultBathroomLocations = [
    { id: 'campus-center-first', name: 'Campus Center First Floor', reviews: [] },
    { id: 'campus-center-second', name: 'Campus Center Second Floor', reviews: [] },
    { id: 'etec', name: 'ETEC', reviews: [] },
    { id: 'academic-buildings', name: 'Academic Buildings', reviews: [] }
];

// Function to load initial data
function loadInitialData() {
    const stored = localStorage.getItem('bathroomLocations');
    if (!stored) {
        localStorage.setItem('bathroomLocations', JSON.stringify(defaultBathroomLocations));
    }
    defaultBathroomLocations.forEach(location => showReviews(location.id));
}

// Submit review
function submitReview(locationId) {
    const name = document.getElementById(`user-name-${locationId}`).value.trim();
    const comment = document.getElementById(`review-comment-${locationId}`).value.trim();
    const rating = parseInt(document.getElementById(`review-rating-${locationId}`).value);

    if (!name || !comment || isNaN(rating) || rating < 1 || rating > 5) {
        alert("Please enter a valid name, comment, and rating between 1-5.");
        return;
    }

    const review = { name, comment, rating };
    saveReview(locationId, review);

    // Clear form
    document.getElementById(`user-name-${locationId}`).value = '';
    document.getElementById(`review-comment-${locationId}`).value = '';
    document.getElementById(`review-rating-${locationId}`).value = '';

    // Refresh reviews
    showReviews(locationId);
    hideReviewForm(locationId);
    alert("Thank you for your review!"); // User feedback
}

// Display reviews and average rating
function showReviews(locationId) {
    const reviews = getReviews(locationId);
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

// Save review to local storage
function saveReview(locationId, review) {
    const locations = JSON.parse(localStorage.getItem('bathroomLocations'));
    const location = locations.find(loc => loc.id === locationId);
    location.reviews.push(review);
    localStorage.setItem('bathroomLocations', JSON.stringify(locations));
}

// Get reviews from local storage
function getReviews(locationId) {
    const locations = JSON.parse(localStorage.getItem('bathroomLocations'));
    const location = locations.find(loc => loc.id === locationId);
    return location ? location.reviews : [];
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
window.onload = loadInitialData;

// Add event listeners to buttons
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default anchor behavior

        // Determine which function to call based on the button's text or data attribute
        const locationId = this.getAttribute('data-location-id');
        if (this.textContent.includes('View Reviews')) {
            showReviews(locationId);
        } else if (this.textContent.includes('Leave Review')) {
            showReviewForm(locationId);
        }
    });
});