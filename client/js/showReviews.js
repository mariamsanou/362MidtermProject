function showReviews(restaurantId) {
    const reviewList = document.getElementById(`reviews-${restaurantId}`);
    reviewList.style.display = reviewList.style.display === "none" ? "block" : "none";

    // Optional: Refresh reviews if needed (you can add real API fetch later)
}
