(function () {
    const IMG_SRC = "assets/hero.jpg";

    const MATERIAL_STEPS = [
        {
            tabLabel: "Raw Material",
            badgeTitle: "Raw Material",
            title: "High-Grade Raw Material Selection",
            desc: "We start with certified PE100 virgin resin selected for density, melt flow, and long-term hydrostatic strength. Batch traceability ensures every extrusion run meets specification before it enters the line.",
            bullets: ["PE100 grade material", "Optimal molecular weight distribution"]
        },
        {
            tabLabel: "Extrusion",
            badgeTitle: "Extrusion",
            title: "Precision Single-Screw Extrusion",
            desc: "The polymer is melted and homogenized in a temperature-controlled barrel, then forced through a profile die to form a continuous melt tube at tightly controlled pressure and throughput.",
            bullets: ["Stable melt temperature profiling", "Consistent throughput monitoring"]
        },
        {
            tabLabel: "Cooling",
            badgeTitle: "Cooling",
            title: "Controlled Water-Bath Cooling",
            desc: "The hot extrudate passes through calibrated cooling zones where circulating water removes heat gradually—preventing warping while locking in dimensional stability.",
            bullets: ["Multi-zone temperature control", "Even heat extraction across wall thickness"]
        },
        {
            tabLabel: "Sizing",
            badgeTitle: "Sizing",
            title: "Vacuum Sizing & Calibration",
            desc: "Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity along the entire length of the pipe.",
            bullets: ["Tight OD tolerance bands", "Uniform wall thickness control"]
        },
        {
            tabLabel: "Quality Control",
            badgeTitle: "Quality Control",
            title: "In-Line Inspection & Testing",
            desc: "Automated gauging and sample-based testing verify dimensions, surface quality, and mechanical indicators—non-conforming sections are flagged before finishing operations.",
            bullets: ["Continuous dimensional scanning", "Batch sampling to standards"]
        },
        {
            tabLabel: "Marking",
            badgeTitle: "Marking",
            title: "Durable Product Marking",
            desc: "Batch codes, standards references, and production data are applied with high-contrast, abrasion-resistant marking for traceability across storage, transport, and installation.",
            bullets: ["Legible long-life marking", "Standards-aligned information layout"]
        },
        {
            tabLabel: "Cutting",
            badgeTitle: "Cutting",
            title: "Accurate Length Cutting",
            desc: "Finished pipe is cut to ordered lengths with square ends and clean finishes, ready for coupling, fusion, or end preparation according to project requirements.",
            bullets: ["Length accuracy to order", "Clean, square cut faces"]
        },
        {
            tabLabel: "Packaging",
            badgeTitle: "Packaging",
            title: "Protective Bundling & Dispatch",
            desc: "Pipes are bundled, strapped, and protected for yard handling and shipment—minimizing abrasion and UV exposure until they reach the job site.",
            bullets: ["Secure strapping patterns", "Site-ready labeling and handling"]
        }
    ];

    function escapeHtml(text) {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
    }

    function initMaterialSection(root) {
        const tabsContainer = root.querySelector("#material-tabs");
        const badge = root.querySelector("#material-badge");
        const titleEl = root.querySelector("#material-title");
        const descEl = root.querySelector("#material-desc");
        const bulletsEl = root.querySelector("#material-bullets");
        const imgEl = root.querySelector("#material-img");
        const panelRegion = root.querySelector("#material-panel-region");
        const prevBtn = root.querySelector("#material-prev");
        const nextBtn = root.querySelector("#material-next");

        if (!tabsContainer || !badge || !titleEl || !descEl || !bulletsEl || !imgEl || !panelRegion || !prevBtn || !nextBtn) return;

        let current = 0;

        tabsContainer.innerHTML = MATERIAL_STEPS.map(
            (step, i) =>
                `<button type="button" class="material-tab" role="tab" id="material-tab-${i}" aria-selected="${i === 0}" aria-controls="material-panel-region" data-step="${i}">${escapeHtml(step.tabLabel)}</button>`
        ).join("");

        const tabButtons = () => tabsContainer.querySelectorAll(".material-tab");

        function render() {
            const step = MATERIAL_STEPS[current];
            badge.textContent = `Step ${current + 1}/8: ${step.badgeTitle}`;
            titleEl.textContent = step.title;
            descEl.textContent = step.desc;
            bulletsEl.innerHTML = step.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("");

            if (imgEl.getAttribute("src") !== IMG_SRC) {
                imgEl.src = IMG_SRC;
            }
            imgEl.alt = `${step.title} — manufacturing`;

            tabButtons().forEach((btn, i) => {
                const active = i === current;
                btn.classList.toggle("is-active", active);
                btn.setAttribute("aria-selected", String(active));
                btn.setAttribute("tabindex", active ? "0" : "-1");
            });

            panelRegion.setAttribute("aria-labelledby", `material-tab-${current}`);

            prevBtn.disabled = current === 0;
            nextBtn.disabled = current === MATERIAL_STEPS.length - 1;
        }

        tabsContainer.addEventListener("click", (e) => {
            const btn = e.target.closest(".material-tab");
            if (!btn) return;
            const i = parseInt(btn.getAttribute("data-step"), 10);
            if (Number.isNaN(i)) return;
            current = i;
            render();
        });

        prevBtn.addEventListener("click", () => {
            if (current > 0) {
                current -= 1;
                render();
            }
        });

        nextBtn.addEventListener("click", () => {
            if (current < MATERIAL_STEPS.length - 1) {
                current += 1;
                render();
            }
        });

        render();
    }

    document.addEventListener("componentloaded", (e) => {
        if (e.detail && e.detail.id === "materialSection") {
            const root = document.getElementById("materialSection");
            if (root) initMaterialSection(root);
        }
    });
})();
