//
//  healthReviews.js
//  
//
//  Created by W. Mariam Sanou on 4/21/25.
//
// healthReviews.js

// Function to submit a review for a health facility
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

    // Clear form fields
    document.getElementById(`user-name-${facilityId}`).value = '';
    document.getElementById(`review-comment-${facilityId}`).value = '';
    document.getElementById(`review-rating-${facilityId}`).value = '';

    showReviews(facilityId);
    hideReviewForm(facilityId);
}

// Function to show reviews for a health facility
function showReviews(facilityId) {
    const reviews = getReviews(facilityId);
    const container = document.getElementById(`reviews-${facilityId}`);
    const ratingDisplay = document.querySelector(`#rating-${facilityId}`);

    if (reviews.length === 0) {
        container.innerHTML = "<p>No reviews yet.</p>";
        if (ratingDisplay) ratingDisplay.textContent = "Average Rating: No reviews";
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
    if (ratingDisplay) ratingDisplay.textContent = `Average Rating: ${avg}/5`;

    container.innerHTML = reviewHTML;
}

// Function to show the review form
function showReviewForm(facilityId) {
    document.getElementById(`review-form-${facilityId}`).style.display = 'block';
}

// Function to hide the review form
function hideReviewForm(facilityId) {
    document.getElementById(`review-form-${facilityId}`).style.display = 'none';
}

// Function to get reviews from local storage for a health facility
function getReviews(facilityId) {
    const facilities = JSON.parse(localStorage.getItem('healthFacilities')) || [];
    const facility = facilities.find(f => f.id === facilityId);
    return facility ? facility.reviews : [];
}

// Function to save a review to local storage for a health facility
function saveReview(facilityId, review) {
    const facilities = JSON.parse(localStorage.getItem('healthFacilities')) || [];
    const facility = facilities.find(f => f.id === facilityId);
    if (facility) {
        facility.reviews.push(review);
        localStorage.setItem('healthFacilities', JSON.stringify(facilities));
    }
}

// Call this function to load initial data when the page loads
loadInitialData();
