// showReviewForm.js

function showReviewForm(restaurantId) {
  document.getElementById(`review-form-${restaurantId}`).style.display = 'block';
}

function hideReviewForm(restaurantId) {
  document.getElementById(`review-form-${restaurantId}`).style.display = 'none';
}
