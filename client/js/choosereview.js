const locationSelect = document.getElementById('location');
    const categorySelect = document.getElementById('category');

    const locations = {
      dining: ['Jamals', 'Halal Shack', 'Starbucks', 'Subway'],
      study: ['Science Library', 'Campus Center', 'Lecture Center Lounge']
    };

    categorySelect.addEventListener('change', () => {
      const selectedCategory = categorySelect.value;
      locationSelect.innerHTML = '<option value="">-- Select Location --</option>';

      if (locations[selectedCategory]) {
        locations[selectedCategory].forEach(place => {
          const option = document.createElement('option');
          option.value = place;
          option.textContent = place;
          locationSelect.appendChild(option);
        });
      }
    });

    document.getElementById('reviewForm').addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Review submitted! 🎉');
      this.reset();
    });