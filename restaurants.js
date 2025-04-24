// restaurants.js

function showReviews(restaurantId) {
  const reviews = getReviews(restaurantId);
  const container = document.getElementById(`reviews-${restaurantId}`);
  const ratingDisplay = document.querySelector(`#rating-${restaurantId}`);

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
