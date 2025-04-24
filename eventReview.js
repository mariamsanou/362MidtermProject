const defaultEventLocations = [
    { id: 'podium', name: 'The Podium', reviews: [] },
    { id: 'dutch-quad', name: 'Dutch Quad', reviews: [] },
    { id: 'lecture-center', name: 'Lecture Center', reviews: [] },
    { id: 'performing-arts-center', name: 'Performing Arts Center', reviews: [] }
];

// Function to load initial data
function loadInitialData() {
    const stored = localStorage.getItem('eventLocations');
    if (!stored) {
        localStorage.setItem('eventLocations', JSON.stringify(defaultEventLocations));
    }
    defaultEventLocations.forEach(location => showReviews(location.id));
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

// Show form
function showReviewForm(locationId) {
    document.getElementById(`review-form-${locationId}`).style.display = 'block';
}

// Hide form
function hideReviewForm(locationId) {
    document.getElementById(`review-form-${locationId}`).style.display = 'none';
}

// Retrieve reviews from localStorage
function getReviews(locationId) {
    const locations = JSON.parse(localStorage.getItem('eventLocations')) || [];
    const location = locations.find (loc => loc.id === locationId);
    return location ? location.reviews : [];
}

// Save review to localStorage
function saveReview(locationId, review) {
    const locations = JSON.parse(localStorage.getItem('eventLocations')) || [];
    const location = locations.find(loc => loc.id === locationId);
    
    if (location) {
        location.reviews.push(review);
        localStorage.setItem('eventLocations', JSON.stringify(locations));
    } else {
        console.error(`Location with ID ${locationId} not found.`);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', loadInitialData);