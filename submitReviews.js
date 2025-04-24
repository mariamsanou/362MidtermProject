// submitReview.js

function submitReview(restaurantId) {
  const name = document.getElementById(`user-name-${restaurantId}`).value;
  const comment = document.getElementById(`review-comment-${restaurantId}`).value;
  const rating = parseInt(document.getElementById(`review-rating-${restaurantId}`).value);

  if (!name || !comment || isNaN(rating) || rating < 1 || rating > 5) {
    alert("Please enter a name, comment, and rating between 1-5.");
    return;
  }

  const review = { name, comment, rating };
  saveReview(restaurantId, review);

  // Clear form fields
  document.getElementById(`user-name-${restaurantId}`).value = '';
  document.getElementById(`review-comment-${restaurantId}`).value = '';
  document.getElementById(`review-rating-${restaurantId}`).value = '';

  showReviews(restaurantId);
  hideReviewForm(restaurantId);
}
