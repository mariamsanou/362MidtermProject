const defaultEventLocations = [
    { id: 'podium', name: 'The Podium' },
    { id: 'dutch-quad', name: 'Dutch Quad' },
    { id: 'lecture-center', name: 'Lecture Center' },
    { id: 'performing-arts-center', name: 'Performing Arts Center' }
];

function loadInitialData() {
    defaultEventLocations.forEach(location => showReviews(location.id));
}

async function submitReview(locationId) {
    const name = document.getElementById(`user-name-${locationId}`).value.trim();
    const comment = document.getElementById(`review-comment-${locationId}`).value.trim();
    const rating = parseInt(document.getElementById(`review-rating-${locationId}`).value);

    if (!name || !comment || isNaN(rating) || rating < 1 || rating > 5) {
        alert("Please enter a valid name, comment, and rating between 1-5.");
        return;
    }

    try {
        await fetch('/api/reviews', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, comment, rating, locationId })
        });

        // Clear form and refresh UI
        document.getElementById(`user-name-${locationId}`).value = '';
        document.getElementById(`review-comment-${locationId}`).value = '';
        document.getElementById(`review-rating-${locationId}`).value = '';

        showReviews(locationId);
        hideReviewForm(locationId);
        alert("Thank you for your review!");
    } catch (err) {
        console.error(err);
        alert("Failed to submit review.");
    }
}

async function showReviews(locationId) {
    const container = document.getElementById(`reviews-${locationId}`);
    const ratingDisplay = document.getElementById(`rating-${locationId}`);

    try {
        const res = await fetch(`/api/reviews/${locationId}`);
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
                    <p><strong>${review.name}</strong></p>
                    <p>${review.comment}</p>
                    <p>Rating: ${review.rating}/5</p>
                    <hr>
                </div>`;
        }).join("");

        const avg = (total / reviews.length).toFixed(1);
        ratingDisplay.textContent = `Average Rating: ${avg}/5`;
        container.innerHTML = reviewHTML;

    } catch (err) {
        console.error(err);
        container.innerHTML = "<p>Error loading reviews.</p>";
    }
}

function showReviewForm(locationId) {
    document.getElementById(`review-form-${locationId}`).style.display = 'block';
}

function hideReviewForm(locationId) {
    document.getElementById(`review-form-${locationId}`).style.display = 'none';
}

document.addEventListener('DOMContentLoaded', loadInitialData);
