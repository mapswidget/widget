const https = require('https');
const fs = require('fs');

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const PLACE_ID = process.env.GOOGLE_PLACE_ID;
const URL = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating,user_ratings_total&key=${API_KEY}`;

https.get(URL, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.status === "OK") {
                const output = {
                    rating: json.result.rating,
                    total: json.result.user_ratings_total,
                    reviews: json.result.reviews.map(r => ({
                        nume: r.author_name,
                        text: r.text,
                        stele: r.rating
                    }))
                };
                fs.writeFileSync('data.json', JSON.stringify(output, null, 2));
                console.log("Succes! Datele au fost salvate in data.json");
            } else {
                console.log("Eroare Google API:", json.status, json.error_message);
                process.exit(1);
            }
        } catch (e) {
            console.log("Eroare procesare JSON:", e.message);
            process.exit(1);
        }
    });
}).on("error", (err) => {
    console.log("Eroare conexiune: " + err.message);
    process.exit(1);
});
