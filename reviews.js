async function viewReviews(restaurantId) {
    const response = await fetch(`http://localhost:3000/reviews/${restaurantId}`);
    const reviews = await response.json();

    const reviewContainer = document.getElementById("reviews");
    reviewContainer.innerHTML = "";

    reviews.forEach(review => {
        const reviewDiv = document.createElement("div");
        reviewDiv.classList.add("review");
        reviewDiv.innerHTML = `
            <h4>${review.user_name} (${review.rating}/5)</h4>
            <p>${review.review_text}</p>
            <small>${new Date(review.created_at).toLocaleString()}</small>
        `;
        reviewContainer.appendChild(reviewDiv);
    });
}
