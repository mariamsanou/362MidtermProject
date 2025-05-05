const locations = [
    { id: 'loc001', name: "Dining: Jamal's" },
    { id: 'loc002', name: 'Dining: 518 Market' },
    { id: 'loc003', name: 'Dining: Al Dent' },
    { id: 'loc004', name: 'Dining: Calypso' },
    { id: 'loc005', name: 'Dining: Corner Deli' },
    { id: 'loc006', name: 'Dining: Baba\'s Pizza' },
    { id: 'loc007', name: 'Dining: Fountain Grill' },
    { id: 'loc008', name: 'Dining: NIKOS' },
    { id: 'loc009', name: 'Dining: UMAI SUSHI' },
    { id: 'loc010', name: 'Dining: Starbucks' },
    { id: 'loc011', name: 'Dining: Stocks and Stems' },
    { id: 'loc012', name: 'Dining: Subconnection' },
    { id: 'loc013', name: 'Dining: Halal Shack' },
    { id: 'loc014', name: 'Dining: 1844 Restaurant' },
    { id: 'loc015', name: 'Dining: Tres Habanero' },
    { id: 'loc016', name: 'Dining: Umai Fusion' },
    { id: 'loc017', name: 'Dining: Fresh Fruit Bar' },
    { id: 'loc018', name: 'Dining: Sweet Shop' },
    { id: 'loc019', name: 'Dining: East Cafe' },
    { id: 'loc020', name: 'Dining: Spice Market' },
    { id: 'loc101', name: 'Academic: Lecture Center' },
    { id: 'loc102', name: 'Academic: Humanities Building' },
    { id: 'loc103', name: 'Academic: Physics' },
    { id: 'loc104', name: 'Academic: Arts & Sciences' },
    { id: 'loc105', name: 'Academic: Massary School of Business' },
    { id: 'loc106', name: 'Academic: Earth Science' },
    { id: 'loc107', name: 'Academic: Social Sciences' },
    { id: 'loc108', name: 'Academic: ETEC' },
    { id: 'loc109', name: 'Academic: Taconic' },
    { id: 'loc110', name: 'Academic: Fine Arts' },
    { id: 'loc111', name: 'Academic: Catskill' },
    { id: 'loc112', name: 'Academic: Pine Bush' },
    { id: 'loc113', name: 'Academic: Biology' },
    { id: 'loc114', name: 'Academic: Performing Arts' },
    { id: 'loc115', name: 'Academic: Chemistry' },
    { id: 'loc116', name: 'Academic: Physical Education' },
    { id: 'loc117', name: 'Academic: Life Science' },
    { id: 'loc301', name: 'Study: Main Library' },
    { id: 'loc302', name: 'Study: Science Library' },
    { id: 'loc303', name: 'Study: Campus Center Lounge' },
    { id: 'loc304', name: 'Study: Humanities Study Nook' },
    { id: 'loc305', name: 'Study: ETEC' },
    { id: 'loc201', name: 'Bathroom: Campus Center - 1st Floor' },
    { id: 'loc202', name: 'Bathroom: Campus Center - 2nd Floor' },
    { id: 'loc204', name: 'Bathroom: Academic Buildings' },
    { id: 'loc205', name: 'Bathroom: ETEC' },
    { id: 'loc401', name: 'Event: Performing Arts Center' },
    { id: 'loc402', name: 'Event: Lecture Center' },
    { id: 'loc403', name: 'Event: Campus Center Ballroom' },
    { id: 'loc405', name: 'Event: The Podium' },
    { id: 'loc501', name: 'Fitness: The Well on Colonial' },
    { id: 'loc502', name: 'Health: Broadview Center' }
];

// Load initial reviews for each location on page load
window.onload = function() {
    locations.forEach(location => showReviews(location.id));
};

// Submit review to the server
async function submitReview(locationId) {
    const name = document.getElementById(`user-name-${locationId}`).value.trim();
    const comment = document.getElementById(`review-comment-${locationId}`).value.trim();
    const rating = parseInt(document.getElementById(`review-rating-${locationId}`).value);

    if (!name || !comment || isNaN(rating) || rating < 1 || rating > 5) {
        alert("Please enter a valid name, comment, and rating between 1-5.");
        return;
    }

    const review = { locationId, name, comment, rating };

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
        document.getElementById(`user-name-${locationId}`).value = '';
        document.getElementById(`review-comment-${locationId}`).value = '';
        document.getElementById(`review-rating-${locationId}`).value = '';

        // Refresh reviews
        showReviews(locationId);
        alert("Thank you for your review!");
    } else {
        alert("Failed to submit review.");
    }
}

// Display reviews from the server
async function showReviews(locationId) {
    const response = await fetch(`/api/reviews/${locationId}`);
    const reviews = await response.json();
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
function showReviewForm(locationId) {
    document.getElementById(`review-form-${locationId}`).style.display = 'block';
}

// Hide review form
function hideReviewForm(locationId) {
    document.getElementById(`review-form-${locationId}`).style.display = 'none';
}
