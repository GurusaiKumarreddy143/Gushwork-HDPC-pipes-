function sanitizeComponentHtml(html) {
    let cleaned = html;

    // Remove live-server injected comment + script blocks.
    cleaned = cleaned
        .replace(/<!--\s*Code injected by live-server\s*-->[\s\S]*?<\/script>/gi, "")
        .replace(/\/\/\s*<!\[CDATA\[\s*<--\s*For SVG support[\s\S]*?\/\/\s*\]\]>/gi, "")
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");

    // If websocket text leaked as plain text lines, strip those lines only.
    cleaned = cleaned
        .replace(/^.*For SVG support.*$/gim, "")
        .replace(/^.*WebSocket.*$/gim, "")
        .replace(/^.*Live reload enabled\..*$/gim, "")
        .replace(/^.*Upgrade your browser\..*$/gim, "");

    return cleaned;
}

function loadComponent(id, file) {
    fetch(file)
        .then((res) => res.text())
        .then((data) => {
            const target = document.getElementById(id);
            if (!target) return;
            target.innerHTML = sanitizeComponentHtml(data);
            document.dispatchEvent(new CustomEvent("componentloaded", { detail: { id } }));
        });
}

loadComponent("navbar", "components/navbar/navbar.html");
loadComponent("hero", "sections/hero/hero.html");
loadComponent("specifications", "sections/specifications/specifications.html");
loadComponent("features", "sections/features/features.html");
loadComponent("industries", "sections/industries/industries.html");
loadComponent("faq", "sections/faq/faq.html");
loadComponent("materialSection", "sections/materialSection/material.html");
loadComponent("resources", "sections/resources/resources.html");
loadComponent("contact", "sections/contact/contact.html");
loadComponent("footer", "sections/footer/footer.html");
loadComponent("provenResults", "sections/provenResults/proven.html");
loadComponent("completepipping", "sections/completepipping/completepip.html");
loadComponent("manufacture", "sections/manufacture/manufacture.html");

