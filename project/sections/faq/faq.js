(function () {
    const faqRoot = () => document.getElementById('faq');

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.faq-toggle');
        if (!btn || !faqRoot()?.contains(btn)) return;

        const item = btn.closest('.faq-item');
        if (!item) return;

        const panel = document.getElementById(btn.getAttribute('aria-controls') || '');
        const willOpen = !item.classList.contains('is-open');

        item.classList.toggle('is-open', willOpen);
        btn.setAttribute('aria-expanded', String(willOpen));
        if (panel) {
            panel.hidden = !willOpen;
        }
    });

    document.addEventListener('submit', (e) => {
        const form = e.target.closest('.faq-catalog-form');
        if (!form || !faqRoot()?.contains(form)) return;
        e.preventDefault();
    });
})();
