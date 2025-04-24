document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/restaurants')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('restaurants-container');
            container.innerHTML = '';
            data.forEach(restaurant => {
                container.innerHTML += `
                    <div class="location-card">
                        <div class="location-info">
                            <h2>${restaurant.name}</h2>
                            <p class="rating">Average Rating: ${restaurant.rating}/5</p>
                            <a href="${restaurant.link}" class="button">View Dining</a>
                        </div>
                    </div>`;
            });
        })
        .catch(error => console.error('Error:', error));
});