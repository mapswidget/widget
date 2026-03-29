const https = require('https');

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
                console.log("--- DATE REALE GASITE ---");
                console.log(JSON.stringify(output, null, 2));
            } else {
                console.log("!!! EROARE DE LA GOOGLE !!!");
                console.log("Status:", json.status);
                console.log("Mesaj:", json.error_message || "Niciun mesaj suplimentar.");
                if (json.status === "REQUEST_DENIED") {
                    console.log("Sfat: Verifica daca ai activat 'Places API' in Google Cloud si daca ai un card valid atasat contului (chiar daca e gratis).");
                }
            }
        } catch (e) {
            console.log("Eroare la procesarea datelor:", e.message);
        }
    });
}).on("error", (err) => { console.log("Eroare conexiune: " + err.message); });
