(function () {
    const SCROLL_STEP = 200;
    const EDGE_EPS = 2;

    function escapeHtml(text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
    }

    function renderCards(track) {
        if (typeof industries === "undefined" || !track) return;
        track.innerHTML = industries
            .map(
                (item) => `
            <article class="industry-card" role="listitem">
                <div class="industry-card-media">
                    <img src="${escapeHtml(item.image)}" alt="" width="420" height="420" loading="lazy" decoding="async">
                    <div class="industry-card-blur" aria-hidden="true"></div>
                    <div class="industry-card-overlay" aria-hidden="true"></div>
                    <div class="industry-card-content">
                        <h3 class="industry-card-title">${escapeHtml(item.title)}</h3>
                        <p class="industry-card-desc">${escapeHtml(item.desc)}</p>
                    </div>
                </div>
            </article>
        `
            )
            .join("");

        track.querySelectorAll(".industry-card-media img").forEach((img, i) => {
            const t = industries[i];
            if (t) img.alt = `${t.title} — application photo`;
        });
    }

    function updateNavState(scrollEl, prevBtn, nextBtn) {
        if (!scrollEl || !prevBtn || !nextBtn) return;
        const maxScroll = scrollEl.scrollWidth - scrollEl.clientWidth;
        const left = scrollEl.scrollLeft;
        prevBtn.disabled = left <= EDGE_EPS;
        nextBtn.disabled = left >= maxScroll - EDGE_EPS;
        prevBtn.setAttribute("aria-disabled", String(prevBtn.disabled));
        nextBtn.setAttribute("aria-disabled", String(nextBtn.disabled));
    }

    function initIndustriesCarousel(root) {
        const track = root.querySelector("#industries-track");
        const scrollEl = root.querySelector("#industries-scroll");
        const prevBtn = root.querySelector(".industries-nav-prev");
        const nextBtn = root.querySelector(".industries-nav-next");

        if (!track || !scrollEl || !prevBtn || !nextBtn) return;

        renderCards(track);

        const refresh = () => updateNavState(scrollEl, prevBtn, nextBtn);

        prevBtn.addEventListener("click", () => {
            scrollEl.scrollBy({ left: -SCROLL_STEP, behavior: "smooth" });
        });

        nextBtn.addEventListener("click", () => {
            scrollEl.scrollBy({ left: SCROLL_STEP, behavior: "smooth" });
        });

        scrollEl.addEventListener("scroll", refresh, { passive: true });
        window.addEventListener("resize", refresh);

        scrollEl.addEventListener("keydown", (e) => {
            if (e.key === "ArrowLeft") {
                e.preventDefault();
                scrollEl.scrollBy({ left: -SCROLL_STEP, behavior: "smooth" });
            } else if (e.key === "ArrowRight") {
                e.preventDefault();
                scrollEl.scrollBy({ left: SCROLL_STEP, behavior: "smooth" });
            }
        });

        if (typeof ResizeObserver !== "undefined") {
            const ro = new ResizeObserver(() => refresh());
            ro.observe(scrollEl);
        }

        requestAnimationFrame(refresh);
    }

    document.addEventListener("componentloaded", (e) => {
        if (e.detail && e.detail.id === "industries") {
            const root = document.getElementById("industries");
            if (root) initIndustriesCarousel(root);
        }
    });
})();
