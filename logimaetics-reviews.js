(async function() {
    try {
        // Adaugam un timestamp ca sa luam datele proaspete si aici
        const response = await fetch('https://mapswidget.github.io/widget/data.json?t=' + Date.now());
        if (!response.ok) return;
        const data = await response.json();

        var style = document.createElement('style');
        style.innerHTML = `
            #v-badge { position: fixed; left: 15px; bottom: 100px; background: white; border: 1px solid #dadce0; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); display: flex; flex-direction: column; align-items: center; padding: 10px 15px; cursor: pointer; z-index: 10000; font-family: sans-serif; }
            #v-overlay { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 10001; align-items: center; justify-content: center; backdrop-filter: blur(3px); }
            #v-modal { background: white; width: 92%; max-width: 450px; border-radius: 12px; overflow: hidden; font-family: sans-serif; box-shadow: 0 24px 38px rgba(0,0,0,0.3); position: relative; }
            .v-header { background: #4285F4; color: white; padding: 18px; text-align: center; font-weight: bold; font-size: 18px; }
            
            /* FORTAM BARA DE SCROLL SA FIE VIZIBILA */
            .v-body { 
                padding: 15px !important; 
                max-height: 350px !important; 
                overflow-y: scroll !important; 
                background: #f8f9fa !important; 
                display: block !important;
            }
            
            /* Stil pentru bara de scroll */
            .v-body::-webkit-scrollbar { width: 10px !important; display: block !important; }
            .v-body::-webkit-scrollbar-thumb { background: #4285F4 !important; border-radius: 10px; }
            .v-body::-webkit-scrollbar-track { background: #eee; }

            .v-card { background: white; margin-bottom: 15px; padding: 15px; border-radius: 10px; border: 1px solid #e0e0e0; box-shadow: 0 2px 4px rgba(0,0,0,0.05); text-align: left; }
            .v-rev-name { font-weight: bold; color: #202124; display: block; }
            .v-star { color: #fabb05; font-size: 14px; margin: 4px 0; }
            .v-rev-text { font-size: 13.5px; color: #3c4043; line-height: 1.5; font-style: italic; }
            
            .v-footer { padding: 18px; background: white; border-top: 1px solid #eee; text-align: center; }
            .v-btn { display: inline-block; width: 90%; padding: 13px; background: #4285F4; color: white !important; text-decoration: none !important; border-radius: 8px; font-weight: bold; }
            .v-close { position: absolute; top: 10px; right: 15px; color: white; cursor: pointer; font-size: 26px; z-index: 10; }
        `;
        document.head.appendChild(style);

        var html = `
            <div id="v-badge" onclick="document.getElementById('v-overlay').style.display='flex'">
                <div style="font-weight:bold; font-size:17px;">${data.rating}.0 <span style="color:#fabb05">★★★★★</span></div>
                <div style="font-size:12px; color:#70757a;">Logimaetics ELECTRIC</div>
            </div>
            <div id="v-overlay" onclick="if(event.target == this) this.style.display='none'">
                <div id="v-modal">
                    <span class="v-close" onclick="document.getElementById('v-overlay').style.display='none'">×</span>
                    <div class="v-header">Recenzii Logimaetics ELECTRIC</div>
                    <div class="v-body" id="v-scroll-body">
                        ${data.reviews.slice(0, 6).map(r => `
                            <div class="v-card">
                                <span class="v-rev-name">${r.nume}</span>
                                <div class="v-star">★★★★★</div>
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
    } catch(e) { console.log("Eroare:", e); }
})();
