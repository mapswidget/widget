(async function() {
    try {
        // Citim datele din fisierul data.json de pe GitHub-ul tau
        const response = await fetch('https://mapswidget.github.io/widget/data.json');
        if (!response.ok) return;
        const data = await response.json();

        // Design-ul exact din imagine (Carduri albe pe fundal gri deschis)
        var style = document.createElement('style');
        style.innerHTML = `
            #v-badge { position: fixed; left: 15px; bottom: 100px; background: white; border: 1px solid #dadce0; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); display: flex; flex-direction: column; align-items: center; padding: 10px 15px; cursor: pointer; z-index: 10000; font-family: 'Segoe UI', Roboto, sans-serif; transition: 0.3s; }
            #v-badge:hover { transform: scale(1.05); }
            .v-star { color: #fabb05; font-size: 16px; margin: 5px 0; }
            #v-overlay { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 10001; align-items: center; justify-content: center; backdrop-filter: blur(3px); }
            #v-modal { background: white; width: 90%; max-width: 450px; border-radius: 12px; overflow: hidden; font-family: 'Segoe UI', Roboto, sans-serif; box-shadow: 0 24px 38px rgba(0,0,0,0.3); position: relative; }
            .v-header { background: #4285F4; color: white; padding: 20px; text-align: center; font-weight: bold; font-size: 18px; border-bottom: 1px solid #dadce0; }
            .v-body { padding: 15px; max-height: 400px; overflow-y: auto; background: #f8f9fa; text-align: left; }
            .v-card { background: white; margin-bottom: 15px; padding: 15px; border-radius: 8px; border: 1px solid #e0e0e0; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
            .v-rev-name { font-weight: bold; color: #202124; font-size: 15px; }
            .v-rev-text { font-size: 13.5px; color: #3c4043; line-height: 1.5; font-style: italic; margin-top: 5px; }
            .v-footer { padding: 20px; background: white; border-top: 1px solid #e0e0e0; text-align: center; }
            .v-btn { display: inline-block; width: 90%; padding: 12px; background: #4285F4; color: white !important; text-decoration: none !important; border-radius: 6px; font-weight: bold; font-size: 15px; transition: 0.2s; box-shadow: 0 2px 5px rgba(66,133,244,0.3); }
            .v-btn:hover { background: #357ae8; }
            .v-close { position: absolute; top: 12px; right: 18px; color: white; cursor: pointer; font-size: 26px; font-weight: bold; }
        `;
        document.head.appendChild(style);

        // Structura HTML
        var html = `
            <div id="v-badge" onclick="document.getElementById('v-overlay').style.display='flex'">
                <div style="font-weight:bold; font-size:17px;">${data.rating}.0 <span class="v-star">★★★★★</span></div>
                <div style="font-size:12px; color:#70757a;">Logimaetics ELECTRIC</div>
            </div>
            <div id="v-overlay" onclick="if(event.target == this) this.style.display='none'">
                <div id="v-modal">
                    <span class="v-close" onclick="document.getElementById('v-overlay').style.display='none'">×</span>
                    <div class="v-header">Recenzii Logimaetics ELECTRIC</div>
                    <div class="v-body">
                        ${data.reviews.slice(0, 6).map(r => `
                            <div class="v-card">
                                <div class="v-rev-name">${r.nume}</div>
                                <div class="v-star">${'★'.repeat(r.stele)}</div>
                                <div class="v-rev-text">"${r.text}"</div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="v-footer">
                        <a href="https://www.google.com/maps/place/?q=place_id:ChIJLZVUTHVdRUcRHNA4ECvyp_s8" target="_blank" class="v-btn">
                            Vezi toate cele ${data.total} recenzii pe Google
                        </a>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', html);
    } catch(e) { console.log("Widget error:", e); }
})();
