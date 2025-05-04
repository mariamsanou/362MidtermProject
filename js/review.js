// Function to load initial data
function loadInitialData() {
    const stored = localStorage.getItem('reviews');
    if (!stored) {
        localStorage.setItem('reviews', JSON.stringify({})); // Initialize with an empty object
    }
    // Show reviews for all restaurants on load
    const restaurantIds = ['restaurant-1', 'restaurant-2', 'restaurant-3', 'restaurant-4', 'restaurant-5', 
                           'restaurant-6', 'restaurant-7', 'restaurant-8', 'restaurant-9', 'restaurant-10', 
                           'restaurant-11', 'restaurant-12', 'restaurant-13', 'restaurant-14', 'restaurant-15', 
                           'restaurant-16', 'restaurant-17', 'restaurant-18', 'restaurant-19', 'restaurant-20'];
    restaurantIds.forEach(id => showReviews(id));
}

// Function to submit a review
function submitReview(restaurantId) {
    const name = document.getElementById(`user-name-${restaurantId}`).value.trim();
    const comment = document.getElementById(`review-comment-${restaurantId}`).value.trim();
    const rating = parseInt(document.getElementById(`review-rating-${restaurantId}`).value);

    if (!name || !comment || isNaN(rating) || rating < 1 || rating > 5) {
        alert("Please enter a valid name, comment, and rating between 1-5.");
        return;
    }

    const review = { name, comment, rating };
    saveReview(restaurantId, review);

    // Clear form fields
    document.getElementById(`user-name-${restaurantId}`).value = '';
    document.getElementById(`review-comment-${restaurantId}`).value = '';
    document.getElementById(`review-rating-${restaurantId}`).value = '';

    // Refresh reviews
    showReviews(restaurantId);
    hideReviewForm(restaurantId);
    alert("Thank you for your review!"); // User feedback
}

// Function to show reviews for a restaurant
function showReviews(restaurantId) {
    const reviews = getReviews(restaurantId);
    const container = document.getElementById(`reviews-${restaurantId}`);
    const ratingDisplay = document.getElementById(`rating-${restaurantId}`);

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
                <hr>
            </div>
        `;
    }).join('');

    const averageRating = (total / reviews.length).toFixed(1);
    container.innerHTML = reviewHTML;
    ratingDisplay.textContent = `Average Rating: ${averageRating}/5`;
}

// Function to show the review form
function showReviewForm(restaurantId) {
    document.getElementById(`review-form-${restaurantId}`).style.display = 'block';
}

// Function to hide the review form
function hideReviewForm(restaurantId) {
    document.getElementById(`review-form-${restaurantId}`).style.display = 'none';
}

// Function to get reviews from local storage
function getReviews(restaurantId) {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || {};
    return reviews[restaurantId] || [];
}

// Function to save a review to local storage
function saveReview(restaurantId, review) {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || {};
    if (!reviews[restaurantId]) {
        reviews[restaurantId] = [];
    }
    reviews[restaurantId].push(review);
    localStorage.setItem('reviews', JSON.stringify(reviews));
}

// Load initial data on page load
window.onload = loadInitialData;

// Add event listeners to buttons
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default anchor behavior

        // Determine which function to call based on the button's text
        const restaurantId = this.getAttribute('data-location-id');
        if (this.textContent.includes('View Reviews')) {
            showReviews(restaurantId);
        } else if (this.textContent.includes('Leave Reviews')) {
            showReviewForm(restaurantId);
        }
    });
});