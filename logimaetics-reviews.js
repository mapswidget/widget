(async function() {
    try {
        const response = await fetch('https://mapswidget.github.io/widget/data.json');
        if (!response.ok) return;
        const data = await response.json();

        var style = document.createElement('style');
        style.innerHTML = `
            #v-badge { position: fixed; left: 15px; bottom: 100px; background: white; border: 1px solid #dadce0; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); display: flex; flex-direction: column; align-items: center; padding: 10px 15px; cursor: pointer; z-index: 10000; font-family: 'Segoe UI', Tahoma, sans-serif; transition: 0.3s; }
            #v-badge:hover { transform: scale(1.05); }
            .v-star { color: #fabb05; font-size: 14px; margin: 4px 0; }
            #v-overlay { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 10001; align-items: center; justify-content: center; backdrop-filter: blur(3px); }
            #v-modal { background: white; width: 92%; max-width: 450px; border-radius: 12px; overflow: hidden; font-family: 'Segoe UI', Tahoma, sans-serif; box-shadow: 0 24px 38px rgba(0,0,0,0.3); position: relative; }
            .v-header { background: #4285F4; color: white; padding: 18px; text-align: center; font-weight: bold; font-size: 18px; }
            
            /* CORPUL CU SCROLL BAR VERTICALA */
            .v-body { 
                padding: 15px; 
                max-height: 380px; 
                overflow-y: scroll; /* Fortam aparitia barei de scroll */
                background: #f8f9fa; 
                text-align: left; 
            }
            
            /* Personalizare bara de scroll (sa arate ca in poza ta) */
            .v-body::-webkit-scrollbar { width: 8px; }
            .v-body::-webkit-scrollbar-track { background: #f1f1f1; }
            .v-body::-webkit-scrollbar-thumb { background: #ccc; border-radius: 10px; }
            .v-body::-webkit-scrollbar-thumb:hover { background: #999; }

            .v-card { background: white; margin-bottom: 15px; padding: 15px; border-radius: 10px; border: 1px solid #e0e0e0; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
            .v-rev-name { font-weight: bold; color: #202124; font-size: 15px; margin-bottom: 2px; display: block; }
            .v-rev-text { font-size: 13.5px; color: #3c4043; line-height: 1.5; font-style: italic; margin-top: 5px; }
            
            .v-footer { padding: 18px; background: white; border-top: 1px solid #eee; text-align: center; }
            .v-btn { display: inline-block; width: 90%; padding: 13px; background: #4285F4; color: white !important; text-decoration: none !important; border-radius: 8px; font-weight: bold; font-size: 15px; transition: 0.2s; }
            .v-btn:hover { background: #357ae8; box-shadow: 0 4px 8px rgba(66,133,244,0.3); }
            .v-close { position: absolute; top: 10px; right: 15px; color: white; cursor: pointer; font-size: 26px; z-index: 10; font-weight: bold; }
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
                    <div class="v-header">Recenzii Logimaetics ELECTRIC</div>
                    <div class="v-body">
                        ${data.reviews.slice(0, 6).map(r => `
                            <div class="v-card">
                                <span class="v-rev-name">${r.nume}</span>
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
