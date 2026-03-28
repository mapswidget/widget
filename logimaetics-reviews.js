(async function() {
    try {
        const response = await fetch('https://mapswidget.github.io/widget/data.json');
        const data = await response.json();

        var style = document.createElement('style');
        style.innerHTML = `
            #vlad-badge { position: fixed; left: 15px; bottom: 85px; background: white; border: 2px solid #4285F4; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); display: flex; flex-direction: column; align-items: center; padding: 8px 12px; cursor: pointer; z-index: 10000; font-family: sans-serif; }
            .vlad-row-1 { font-weight: 800; font-size: 16px; color: #333; display: flex; align-items: center; gap: 5px; }
            .vlad-row-2 { font-size: 11px; color: #666; font-weight: 600; margin-top: 2px; }
            .vlad-star-gold { color: #f1c40f; }
            #vlad-overlay { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.75); z-index: 10001; align-items: center; justify-content: center; }
            #vlad-modal { background: white; width: 90%; max-width: 400px; border-radius: 16px; overflow: hidden; font-family: sans-serif; position: relative; }
            .vlad-modal-header { background: #4285F4; color: white; padding: 15px; text-align: center; font-weight: bold; }
            .vlad-modal-body { padding: 15px; max-height: 350px; overflow-y: auto; }
            .vlad-rev-card { border-bottom: 1px solid #eee; padding: 10px 0; }
        `;
        document.head.appendChild(style);

        var html = `
            <div id="vlad-badge" onclick="document.getElementById('vlad-overlay').style.display='flex'">
                <div class="vlad-row-1">${data.rating}.0 <span class="vlad-star-gold">★★★★★</span></div>
                <div class="vlad-row-2">Google (${data.total} recenzii)</div>
            </div>
            <div id="vlad-overlay" onclick="if(event.target == this) this.style.display='none'">
                <div id="vlad-modal">
                    <div class="vlad-modal-header">Recenzii Logimaetics ELECTRIC</div>
                    <div class="vlad-modal-body">
                        ${data.reviews.map(r => `
                            <div class="vlad-rev-card">
                                <strong>${r.nume}</strong><br>
                                <span class="vlad-star-gold">★★★★★</span><br>
                                <small style="font-style:italic;">"${r.text}"</small>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', html);
    } catch(e) { console.log("Eroare widget:", e); }
})();
