async function submitReview(event, restaurantId) {
    event.preventDefault();

    const userName = document.getElementById("reviewer-name").value;
    const rating = document.getElementById("review-rating").value;
    const reviewText = document.getElementById("review-text").value;

    await fetch("http://localhost:3000/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ restaurantId, userName, rating, reviewText })
    });

    viewReviews(restaurantId);
}
