document.getElementById('reviewForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;
    const rating = document.getElementById('rating').value;
    const facilityId = document.getElementById('facility').value;
  
    const res = await fetch('/api/ratings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, comment, rating, facilityId }),
    });
    
    const data = await res.json();
    console.log('Submitted:', data);
  });
  
  