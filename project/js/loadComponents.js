function loadComponent(id, file) {

    fetch(file)
        .then(res => res.text())
        .then(data => {
            // Live Server can inject websocket scripts into fetched HTML fragments.
            // Strip those blocks so component markup is not corrupted.
            const sanitized = data
                // Live Server can inject a websocket script inside SVG blocks.
                // Keep the closing </svg> while removing injected content.
                .replace(/<!--\s*Code injected by live-server\s*-->[\s\S]*?<\/svg>/gi, "</svg>")
                .replace(/<!--\s*Code injected by live-server\s*-->[\s\S]*?<\/script>/gi, "")
                .replace(/<script[^>]*>[\s\S]*?live-server[\s\S]*?<\/script>/gi, "")
                .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");

            document.getElementById(id).innerHTML = sanitized
        })

}

loadComponent("navbar", "components/navbar/navbar.html")

loadComponent("hero", "sections/hero/hero.html")

loadComponent("specifications", "sections/specifications/specifications.html")

loadComponent("features", "sections/features/features.html")

loadComponent("industries", "sections/industries/industries.html")

loadComponent("faq", "sections/faq/faq.html")

loadComponent("resources", "sections/resources/resources.html")

loadComponent("contact", "sections/contact/contact.html")

loadComponent("footer", "sections/footer/footer.html")
loadComponent("materialSection", "sections/materialSection/material.html")
loadComponent("provenResults", "sections/provenResults/proven.html")
loadComponent("completepipping", "sections/completepipping/completepip.html")
loadComponent("manufacture", "sections/manufacture/manufacture.html")