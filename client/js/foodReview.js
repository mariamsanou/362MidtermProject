// Function to load initial data
function loadInitialData() {
    const restaurantIds = Array.from({ length: 20 }, (_, i) => `restaurant-${i + 1}`);
    restaurantIds.forEach(id => showReviews(id));
}

// Function to submit a review
async function submitReview(restaurantId) {
    const name = document.getElementById(`user-name-${restaurantId}`).value.trim();
    const comment = document.getElementById(`review-comment-${restaurantId}`).value.trim();
    const rating = parseInt(document.getElementById(`review-rating-${restaurantId}`).value);

    if (!name || !comment || isNaN(rating) || rating < 1 || rating > 5) {
        alert("Please enter a valid name, comment, and rating between 1-5.");
        return;
    }

    const review = { locationId: restaurantId, name, comment, rating };

    try {
        const res = await fetch('/api/reviews', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(review)
        });

        if (!res.ok) throw new Error("Failed to submit review");

        // Clear form fields
        document.getElementById(`user-name-${restaurantId}`).value = '';
        document.getElementById(`review-comment-${restaurantId}`).value = '';
        document.getElementById(`review-rating-${restaurantId}`).value = '';

        showReviews(restaurantId);
        hideReviewForm(restaurantId);
        alert("Thank you for your review!");
    } catch (error) {
        console.error(error);
        alert("There was an error submitting your review.");
    }
}

// Function to show reviews for a restaurant
async function showReviews(restaurantId) {
    const container = document.getElementById(`reviews-${restaurantId}`);
    const ratingDisplay = document.getElementById(`rating-${restaurantId}`);
    if (!container || !ratingDisplay) return;

    try {
        const res = await fetch(`/api/reviews/${restaurantId}`);
        if (!res.ok) throw new Error("Failed to fetch reviews");

        const reviews = await res.json();

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
    } catch (error) {
        console.error(error);
        container.innerHTML = "<p>Error loading reviews.</p>";
    }
}

function showReviewForm(restaurantId) {
    const form = document.getElementById(`review-form-${restaurantId}`);
    if (form) form.style.display = 'block';
}

function hideReviewForm(restaurantId) {
    const form = document.getElementById(`review-form-${restaurantId}`);
    if (form) form.style.display = 'none';
}

// DOM load setup
window.addEventListener('DOMContentLoaded', () => {
    loadInitialData();

    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const restaurantId = this.getAttribute('data-location-id');
            if (!restaurantId) return;

            if (this.textContent.includes('View Reviews')) {
                showReviews(restaurantId);
            } else if (this.textContent.includes('Leave Review')) {
                showReviewForm(restaurantId);
            }
        });
    });
});
