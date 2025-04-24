// healthReviews.js

// Sample initial data
const defaultFacilities = [
    { id: 'library', name: 'Library', reviews: [] },
    { id: 'science-library', name: 'Science Library', reviews: [] },
    { id: 'etec', name: 'ETEC', reviews: [] }
];

// Function to load initial data
function loadInitialData() {
    const stored = localStorage.getItem('academics');
    if (!stored) {
        localStorage.setItem('academics', JSON.stringify(defaultFacilities));
    }
    defaultFacilities.forEach(facility => showReviews(facility.id));
}

// Submit review
function submitReview(facilityId) {
    const name = document.getElementById(`user-name-${facilityId}`).value;
    const comment = document.getElementById(`review-comment-${facilityId}`).value;
    const rating = parseInt(document.getElementById(`review-rating-${facilityId}`).value);

    if (!name || !comment || isNaN(rating) || rating < 1 || rating > 5) {
        alert("Please enter a name, comment, and rating between 1-5.");
        return;
    }

    const review = { name, comment, rating };
    saveReview(facilityId, review);

    // Clear form
    document.getElementById(`user-name-${facilityId}`).value = '';
    document.getElementById(`review-comment-${facilityId}`).value = '';
    document.getElementById(`review-rating-${facilityId}`).value = '';

    // Refresh reviews
    showReviews(facilityId);
    hideReviewForm(facilityId);
}

// Display reviews and average rating
function showReviews(facilityId) {
    const reviews = getReviews(facilityId);
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
                <p><strong>${review.name}</strong></p>
                <p>${review.comment}</p>
                <p>Rating: ${review.rating}/5</p>
                <hr>
            </div>
        `;
    }).join("");

    const avg = (total / reviews.length).toFixed(1);
    ratingDisplay.textContent = `Average Rating: ${avg}/5`;

    container.innerHTML = reviewHTML;
}

// Save review to local storage
function saveReview(facilityId, review) {
    const locations = JSON.parse(localStorage.getItem('academics'));
    const location = locations.find(loc => loc.id === facilityId);
    location.reviews.push(review);
    localStorage.setItem('academics', JSON.stringify(locations));
}

// Get reviews from local storage
function getReviews(facilityId) {
    const locations = JSON.parse(localStorage.getItem('academics'));
    const location = locations.find(loc => loc.id === facilityId);
    return location ? location.reviews : [];
}

// Show review form
function showReviewForm(facilityId) {
    document.getElementById(`review-form-${facilityId}`).style.display = 'block';
}

// Hide review form
function hideReviewForm(facilityId) {
    document.getElementById(`review-form-${facilityId}`).style.display = 'none';
}

// Load initial data on page load
window.onload = loadInitialData;

// Add event listeners to buttons
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default anchor behavior

        // Determine which function to call based on the button's text or data attribute
        const facilityId = this.getAttribute('data-location-id');
        if (this.textContent.includes('View Reviews')) {
            showReviews(facilityId);
        } else if (this.textContent.includes('Leave Review')) {
            showReviewForm(facilityId);
        }
    });
});

