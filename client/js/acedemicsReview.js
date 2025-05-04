const defaultFacilities = [
    { id: 'humanities', name: 'Humanities', reviews: [] },
    { id: 'taconic', name: 'Taconic', reviews: [] },
    { id: 'social-science', name: 'Social Science', reviews: [] },
    { id: 'catskill', name: 'Catskill', reviews: [] },
    { id: 'arts-sciences', name: 'Arts & Sciences', reviews: [] },
    { id: 'fine-arts', name: 'Fine Arts', reviews: [] },
    { id: 'pine-bush', name: 'Pine Bush', reviews: [] },
    { id: 'biology', name: 'Biology', reviews: [] },
    { id: 'performing-arts', name: 'Performing Arts', reviews: [] }
];

// Function to load initial data
function loadInitialData() {
    const stored = localStorage.getItem('academics');
    if (!stored) {
        localStorage.setItem('academics', JSON.stringify(defaultFacilities));
    }
    const facilities = JSON.parse(localStorage.getItem('academics'));
    facilities.forEach(facility => showReviews(facility.id));
}

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
                <p>Submitted on: ${new Date(review.createdAt).toLocaleString()}</p>
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