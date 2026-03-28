const fs = require('fs');
const axios = require('axios');

async function updateReviews() {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data.result;
    
    const result = {
      rating: data.rating,
      total_reviews: data.user_ratings_total,
      reviews: data.reviews.map(r => ({
        nume: r.author_name,
        text: r.text,
        stele: r.rating
      }))
    };

    fs.writeFileSync('data.json', JSON.stringify(result, null, 2));
    console.log("Recenzii actualizate cu succes!");
  } catch (e) { console.error("Eroare:", e); }
}
updateReviews();
