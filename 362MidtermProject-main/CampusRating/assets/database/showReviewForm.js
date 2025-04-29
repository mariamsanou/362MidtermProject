async function showReviews(restaurantId) {
    const response = await fetch(`/restaurants/${restaurantId}/reviews`);
    const reviews = await response.json();
    const reviewsContainer = document.getElementById(`reviews-${restaurantId}`);
    reviewsContainer.innerHTML = ''; // Clear previous reviews

    reviews.forEach(review => {
        const reviewDiv = document.createElement('div');
        reviewDiv.innerHTML = `<strong>${review.user}</strong>: ${review.comment} (Rating: ${review.rating}/5)`;
        reviewsContainer.appendChild(reviewDiv);
    });

    reviewsContainer.style.display = 'block'; // Show reviews
}

function showReviewForm(restaurantId) {
    const reviewForm = document.getElementById(`review-form-${restaurantId}`);
    reviewForm.style.display = reviewForm.style.display === 'none' ? 'block' : 'none';
}

async function submitReview(restaurantId) {
    const userName = document.getElementById(`user-name-${restaurantId}`).value;
    const reviewComment = document.getElementById(`review-comment-${restaurantId}`).value;
    const reviewRating = document.getElementById(`review-rating-${restaurantId}`).value;

    const response = await fetch(`/restaurants/${restaurantId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: userName,
            comment: reviewComment,
            rating: parseInt(reviewRating)
        })
    });

    if (response.ok) {
        // Clear the form fields
        document.getElementById(`user-name-${restaurantId}`).value = '';
        document.getElementById(`review-comment-${restaurantId}`).value = '';
        document.getElementById(`review-rating-${restaurantId}`).value = '';

        // Fetch and display the updated reviews
        showReviews(restaurantId);
    } else {
        console.error('Failed to submit review');
    }
}