(function () {
    function escapeHtml(text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
    }

    function renderTestimonials(track) {
        if (typeof testimonials === "undefined" || !track) return;
        track.innerHTML = testimonials
            .map(
                (t) => `
            <article class="proven-card" role="listitem">
                <span class="proven-quote" aria-hidden="true">&#8220;</span>
                <h3 class="proven-card-title">${escapeHtml(t.headline)}</h3>
                <p class="proven-card-body">${escapeHtml(t.body)}</p>
                <footer class="proven-card-footer">
                    <span class="proven-avatar" aria-hidden="true"></span>
                    <div class="proven-author">
                        <span class="proven-name">${escapeHtml(t.name)}</span>
                        <span class="proven-role">${escapeHtml(t.role)}</span>
                    </div>
                </footer>
            </article>
        `
            )
            .join("");
    }

    document.addEventListener("componentloaded", (e) => {
        if (e.detail && e.detail.id === "provenResults") {
            const root = document.getElementById("provenResults");
            const track = root && root.querySelector("#proven-track");
            if (track) renderTestimonials(track);
        }
    });
})();
