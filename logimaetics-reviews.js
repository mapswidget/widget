(async function() {
    try {
        const response = await fetch('https://mapswidget.github.io/widget/data.json');
        const data = await response.json();

        var style = document.createElement('style');
        style.innerHTML = `
            #v-badge { position: fixed; left: 15px; bottom: 100px; background: white; border: 1px solid #dadce0; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); display: flex; flex-direction: column; align-items: center; padding: 10px 15px; cursor: pointer; z-index: 10000; font-family: 'Segoe UI', Roboto, sans-serif; transition: 0.3s; }
            #v-badge:hover { transform: translateY(-5px); }
            .v-star { color: #fabb05; font-size: 18px; }
            #v-overlay { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 10001; align-items: center; justify-content: center; backdrop-filter: blur(4px); }
            #v-modal { background: white; width: 90%; max-width: 400px; border-radius: 15px; overflow: hidden; position: relative; box-shadow: 0 20px 40px rgba(0,0,0,0.4); text-align: center; }
            .v-header { background: #4285F4; color: white; padding: 20px; font-weight: bold; font-size: 18px; }
            .v-slider-container { position: relative; padding: 25px; min-height: 180px; display: flex; align-items: center; background: #f9f9f9; }
            .v-slide { display: none; width: 100%; animation: fadeIn 0.5s; }
            .v-slide.active { display: block; }
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            .v-rev-text { font-style: italic; color: #444; margin: 10px 0; line-height: 1.5; font-size: 14px; }
            .v-rev-name { font-weight: bold; color: #222; margin-top: 10px; display: block; }
            .v-footer { padding: 20px; border-top: 1px solid #eee; }
            .v-btn-google { display: inline-block; background: #ea4335; color: white !important; text-decoration: none !important; padding: 12px 25px; border-radius: 50px; font-weight: bold; font-size: 14px; transition: 0.3s; box-shadow: 0 4px 10px rgba(234,67,53,0.3); }
            .v-btn-google:hover { background: #d33828; transform: scale(1.05); }
            .v-close { position: absolute; top: 10px; right: 15px; color: white; cursor: pointer; font-size: 28px; z-index: 10; }
        `;
        document.head.appendChild(style);

        var html = `
            <div id="v-badge" onclick="document.getElementById('v-overlay').style.display='flex'">
                <div style="font-weight:bold; font-size:17px;">${data.rating}.0 <span class="v-star">★★★★★</span></div>
                <div style="font-size:12px; color:#70757a;">Logimaetics ELECTRIC</div>
            </div>
            <div id="v-overlay" onclick="if(event.target == this) this.style.display='none'">
                <div id="v-modal">
                    <span class="v-close" onclick="document.getElementById('v-overlay').style.display='none'">×</span>
                    <div class="v-header">Ce spun clienții noștri</div>
                    <div class="v-slider-container">
                        ${data.reviews.slice(0, 6).map((r, index) => `
                            <div class="v-slide ${index === 0 ? 'active' : ''}">
                                <div class="v-star">★★★★★</div>
                                <div class="v-rev-text">"${r.text}"</div>
                                <span class="v-rev-name">- ${r.nume}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="v-footer">
                        <a href="https://www.google.com/maps/place/?q=place_id:ChIJLZVUTHVdRUcRHNA4ECvyp_s8" target="_blank" class="v-btn-google">
                            CLICK AICI PENTRU TOATE RECENZIILE
                        </a>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', html);

        // Logica de automatizare Slider
        let currentSlide = 0;
        const slides = document.querySelectorAll('.v-slide');
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 4000); // Schimbă slide-ul la fiecare 4 secunde

    } catch(e) { console.log("Widget error:", e); }
})();
