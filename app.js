(function () {
  "use strict";

  const D = window.TEAM_DATA;
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  const state = {
    activeSection: "hero",
    revealedBlanks: new Set()
  };

  // Helpers — these are used by Equip in Task 12
  function renderBlankTemplate(template, blanksByKey, scopeId) {
    return template.replace(/\{([a-z])\}/g, (_, key) => {
      const blank = blanksByKey[key];
      if (!blank) return `{${key}}`;
      const id = `${scopeId}-${key}`;
      return `<button type="button" class="blank" data-blank-id="${id}" data-answer="${blank.answer}">_______</button>`;
    });
  }

  function blanksToMap(blanks) {
    const m = {};
    (blanks || []).forEach(b => { m[b.key] = b; });
    return m;
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, (m) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[m]));
  }

  // ── HERO ─────────────────────────────────────────────────────────────
  function renderHero() {
    const el = $("#hero");
    if (!el || !D || !D.meta) return;
    const m = D.meta;
    el.innerHTML = `
      <div class="hero-inner reveal">
        <h1 class="title">${m.passage}</h1>
        <p class="subtitle">${m.burden}</p>
        <p class="muted">${m.takeHome}</p>
      </div>
    `;
  }

  // Renderer dispatch — populated in later tasks
  const teachRenderers = {
    catena(el, block) {
      const sources = block.sources;
      const phrases = block.phrases;

      const head = document.createElement("div");
      head.className = "teach-head";
      head.innerHTML = `
        <div class="eyebrow">CATENA</div>
        <h2 class="title">${block.title}</h2>
        ${block.blurb ? `<p class="muted">${block.blurb}</p>` : ""}
      `;
      el.appendChild(head);

      const chips = document.createElement("div");
      chips.className = "catena-chips";
      chips.innerHTML = sources.map(s => `
        <button class="catena-chip" data-src="${s.id}"
                style="background: oklch(0.50 0.13 ${s.hue}); color: #fff;">
          <span class="chip-label">${s.label}</span>
          <span class="chip-ref">${s.ref}</span>
        </button>
      `).join("");
      el.appendChild(chips);

      const svgWrap = document.createElement("div");
      svgWrap.className = "catena-svg-wrap";
      svgWrap.innerHTML = `
        <svg class="catena-svg" viewBox="0 0 600 140" preserveAspectRatio="none">
          ${sources.map((s, i) => {
            const x = 60 + i * (480 / (sources.length - 1));
            return `<path class="catena-curve" data-src="${s.id}"
              d="M ${x} 10 Q ${x} 80 ${(x + 300) / 2} 130"
              stroke="oklch(0.50 0.13 ${s.hue})" fill="none" stroke-width="2.5" opacity="0.35"/>`;
          }).join("")}
          <line x1="40" y1="130" x2="560" y2="130" stroke="#222" stroke-width="2"/>
        </svg>
      `;
      el.appendChild(svgWrap);

      const verses = document.createElement("ol");
      verses.className = "catena-verses";
      verses.innerHTML = phrases.map(p => {
        const src = sources.find(s => s.id === p.sourceId);
        return `
          <li class="catena-line" data-src="${p.sourceId}"
              style="--src-bg: oklch(0.92 0.04 ${src ? src.hue : 0});">
            <span class="v">${p.ref}</span>
            <span class="t">${p.text}</span>
          </li>
        `;
      }).join("");
      el.appendChild(verses);

      let activeSrc = null;
      function setActive(srcId) {
        activeSrc = srcId;
        $$(".catena-chip", el).forEach(c => c.dataset.active = (c.dataset.src === srcId) ? "true" : "false");
        $$(".catena-curve", el).forEach(c => c.style.opacity = (c.dataset.src === srcId) ? "1" : "0.15");
        $$(".catena-line", el).forEach(line => line.dataset.active = (line.dataset.src === srcId) ? "true" : "false");
      }
      chips.addEventListener("click", (e) => {
        const btn = e.target.closest(".catena-chip");
        if (!btn) return;
        if (activeSrc === btn.dataset.src) {
          activeSrc = null;
          $$(".catena-chip", el).forEach(c => c.dataset.active = "false");
          $$(".catena-curve", el).forEach(c => c.style.opacity = "0.35");
          $$(".catena-line", el).forEach(line => line.dataset.active = "false");
        } else {
          setActive(btn.dataset.src);
        }
      });
    },

    "greek-terms"(el, block) {
      const head = document.createElement("div");
      head.className = "teach-head";
      head.innerHTML = `
        <h2 class="title">${block.title}</h2>
        ${block.blurb ? `<p class="muted">${block.blurb}</p>` : ""}
      `;
      el.appendChild(head);

      const grid = document.createElement("div");
      grid.className = "greek-grid";
      grid.innerHTML = block.terms.map((t, i) => `
        <button class="greek-chip" data-i="${i}" aria-expanded="false">
          <div class="gk-greek greek">${t.greek}</div>
          <div class="gk-gloss">${t.gloss}</div>
        </button>
      `).join("");
      el.appendChild(grid);

      const detail = document.createElement("div");
      detail.className = "greek-detail";
      detail.hidden = true;
      el.appendChild(detail);

      let activeIdx = null;
      grid.addEventListener("click", (e) => {
        const btn = e.target.closest(".greek-chip");
        if (!btn) return;
        const i = Number(btn.dataset.i);
        if (activeIdx === i) {
          activeIdx = null;
          detail.hidden = true;
          $$(".greek-chip", el).forEach(c => c.setAttribute("aria-expanded", "false"));
          return;
        }
        activeIdx = i;
        const t = block.terms[i];
        $$(".greek-chip", el).forEach(c => c.setAttribute("aria-expanded", c.dataset.i === String(i) ? "true" : "false"));
        detail.hidden = false;
        detail.innerHTML = `
          <div class="gd-greek greek">${t.greek}</div>
          <div class="gd-gloss"><em>${t.gloss}</em> · <span class="muted">${t.ref}</span></div>
          <div class="gd-note">${t.note}</div>
          <div class="gd-cue">${t.cue}</div>
        `;
      });
    },

    "courtroom-chain"(el, block) {
      const head = document.createElement("div");
      head.className = "teach-head";
      head.innerHTML = `
        <div class="eyebrow">COURTROOM</div>
        <h2 class="title">${block.title}</h2>
        ${block.blurb ? `<p class="muted">${block.blurb}</p>` : ""}
      `;
      el.appendChild(head);

      const chain = document.createElement("div");
      chain.className = "court-chain";
      chain.innerHTML = block.nodes.map((n, i) => `
        ${i > 0 ? `<div class="court-arrow" data-i="${i}">→</div>` : ""}
        <button class="court-node ${n.terminal ? "terminal" : ""}" data-i="${i}">
          <div class="cn-ref">${n.ref}</div>
          <div class="cn-label">${n.label}</div>
        </button>
      `).join("");
      el.appendChild(chain);

      const note = document.createElement("div");
      note.className = "court-note";
      note.hidden = true;
      el.appendChild(note);

      let activeIdx = null;
      function paint() {
        $$(".court-node", el).forEach(n => {
          const i = Number(n.dataset.i);
          n.dataset.state = i < activeIdx ? "passed"
                          : i === activeIdx ? "active"
                          : "upcoming";
        });
        $$(".court-arrow", el).forEach(a => {
          const i = Number(a.dataset.i);
          a.dataset.state = i <= activeIdx ? "passed" : "upcoming";
        });
      }

      chain.addEventListener("click", (e) => {
        const btn = e.target.closest(".court-node");
        if (!btn) return;
        const i = Number(btn.dataset.i);
        activeIdx = (activeIdx === i) ? null : i;
        if (activeIdx == null) {
          $$(".court-node", el).forEach(n => n.dataset.state = "upcoming");
          $$(".court-arrow", el).forEach(a => a.dataset.state = "upcoming");
          note.hidden = true;
          return;
        }
        paint();
        const n = block.nodes[activeIdx];
        note.hidden = false;
        note.innerHTML = `<strong>${n.ref}</strong> · ${n.note}`;
      });
    },

    "body-parts"(el, block) {
      const head = document.createElement("div");
      head.className = "teach-head";
      head.innerHTML = `
        <div class="eyebrow">BODY-PARTS</div>
        <h2 class="title">${block.title}</h2>
        ${block.blurb ? `<p class="muted">${block.blurb}</p>` : ""}
      `;
      el.appendChild(head);

      const list = document.createElement("ol");
      list.className = "body-mosaic";
      list.innerHTML = block.phrases.map((p, i) => {
        const isClimax = !!p.climax;
        const bg = isClimax ? null : `oklch(0.92 0.05 ${p.hue})`;
        return `
          <li class="bp-line${isClimax ? " climax" : ""}"
              data-i="${i}"
              ${bg ? `style="--bp-bg: ${bg};"` : ""}>
            <span class="bp-text">${p.english}</span>
            <span class="bp-meta">— <span class="bp-part">${p.part}</span> · ${p.image} <span class="bp-ref">(${p.ref})</span></span>
          </li>
        `;
      }).join("");
      el.appendChild(list);

      const climaxIdx = block.phrases.findIndex(p => p.climax);
      let activeIdx = climaxIdx >= 0 ? climaxIdx : 0;
      function paint() {
        $$(".bp-line", el).forEach(line => {
          line.dataset.active = String(Number(line.dataset.i) === activeIdx);
        });
      }
      paint();

      list.addEventListener("click", (e) => {
        const li = e.target.closest(".bp-line");
        if (!li) return;
        activeIdx = Number(li.dataset.i);
        paint();
      });
    }
  };

  function renderTeach() {
    const mount = $("#teach-blocks");
    if (!mount || !D || !D.teach) return;
    mount.innerHTML = "";
    D.teach.forEach((block, i) => {
      const renderer = teachRenderers[block.kind];
      if (!renderer) {
        console.warn(`No renderer for teach kind "${block.kind}"`);
        return;
      }
      const blockEl = document.createElement("article");
      blockEl.className = `teach-block teach-block--${block.kind} reveal`;
      blockEl.dataset.kind = block.kind;
      blockEl.dataset.index = String(i);
      renderer(blockEl, block);
      mount.appendChild(blockEl);
    });
  }

  function fillBlank(btn) {
    if (btn.classList.contains("filled")) return;
    btn.textContent = btn.dataset.answer;
    btn.classList.add("filled");
    state.revealedBlanks.add(btn.dataset.blankId);
  }

  function renderEquip() {
    const mount = $("#equip-panel");
    if (!mount || !D || !D.equip) return;
    const eq = D.equip;

    const bigIdeaMap = blanksToMap(eq.bigIdea.blanks);
    const bigIdeaHtml = renderBlankTemplate(eq.bigIdea.template, bigIdeaMap, "bi");

    const moveCards = eq.movements.map((mv, i) => {
      const nameMap = { a: { answer: mv.nameBlank.answer } };
      const nameHtml = renderBlankTemplate(mv.nameTemplate, nameMap, `mv${i}-name`);
      const christMap = blanksToMap(mv.christ.blanks);
      const christHtml = renderBlankTemplate(mv.christ.template, christMap, `mv${i}-ch`);
      return `
        <article class="eq-card">
          <div class="eq-card-roman">${mv.roman}</div>
          <div class="eq-card-name">${nameHtml}</div>
          <div class="eq-card-ref">${mv.ref}</div>
          <div class="eq-card-summary">${mv.summary}</div>
          <div class="eq-card-christ"><em>${christHtml}</em></div>
        </article>
      `;
    }).join("");

    const tw = eq.thisWeek;
    const twHtml = renderBlankTemplate(tw.template, blanksToMap(tw.blanks), "tw");

    mount.innerHTML = `
      <div class="eyebrow">EQUIP</div>
      <p class="eq-bigidea">${bigIdeaHtml}</p>
      <div class="eq-cards">${moveCards}</div>
      <p class="eq-thisweek"><strong class="eyebrow eyebrow-inline">THIS WEEK</strong> · ${twHtml}</p>
      <div class="eq-actions">
        <button type="button" class="reveal-all" id="equip-reveal-all">Reveal all <kbd>r</kbd></button>
      </div>
    `;

    mount.addEventListener("click", (e) => {
      const blank = e.target.closest(".blank");
      if (blank) { fillBlank(blank); return; }
      if (e.target.closest("#equip-reveal-all")) {
        $$(".blank", mount).forEach(b => fillBlank(b));
      }
    });
  }
  function renderApply() {
    return renderSlides("#apply-slides", D.apply, "APPLY");
  }
  function renderMission() {
    return renderSlides("#mission-slides", D.mission, "MISSION");
  }

  function renderSlides(mountSel, items, label) {
    const mount = $(mountSel);
    if (!mount || !items) return;
    const total = items.length;
    mount.innerHTML = items.map((q, i) => {
      const dots = items.map((_, k) => `<span class="dot ${k === i ? "active" : ""}"></span>`).join("");
      return `
        <article class="slide reveal" data-i="${i}">
          <div class="eyebrow">${label} · ${i + 1} of ${total}</div>
          <p class="question">${escapeHtml(q.question)}</p>
          <div class="pagination">${dots}</div>
        </article>
      `;
    }).join("");
  }
  function renderSendOut() {
    const mount = $("#send-out-panel");
    if (!mount || !D || !D.sendOut) return;
    const so = D.sendOut;
    const link = so.deeperLink
      ? `<p class="send-link"><a href="${so.deeperLink.url}" target="_blank" rel="noopener">${so.deeperLink.label} →</a></p>`
      : "";
    mount.innerHTML = `
      <div class="eyebrow">CLOSE</div>
      <h2 class="title send-th">Take-home truth</h2>
      <p class="send-truth"><em>${escapeHtml(so.takeHome)}</em></p>
      ${link}
    `;
  }
  function renderRail() {
    const rail = $("#rail");
    if (!rail) return;
    const stops = [
      { id: "hero",      letter: "·" },
      { id: "teach",     letter: "T" },
      { id: "equip",     letter: "E" },
      { id: "apply",     letter: "A" },
      { id: "mission",   letter: "M" },
      { id: "send-out",  letter: "·" }
    ];
    rail.innerHTML = stops.map(s =>
      `<button class="rail-letter" data-target="${s.id}" data-state="upcoming"
               aria-label="Jump to ${s.id}">${s.letter}</button>`
    ).join("");
    rail.addEventListener("click", (e) => {
      const btn = e.target.closest(".rail-letter");
      if (!btn) return;
      const target = document.getElementById(btn.dataset.target);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function setupRailObserver() {
    const stops = ["hero", "teach", "equip", "apply", "mission", "send-out"];
    const sections = stops.map(id => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return;

    let active = "hero";
    function paint() {
      $$(".rail-letter").forEach(btn => {
        const t = btn.dataset.target;
        const tIdx = stops.indexOf(t);
        const aIdx = stops.indexOf(active);
        if (tIdx < aIdx) btn.dataset.state = "passed";
        else if (tIdx === aIdx) btn.dataset.state = "active";
        else btn.dataset.state = "upcoming";
      });
    }
    paint();

    const obs = new IntersectionObserver((entries) => {
      const visible = entries.filter(e => e.isIntersecting);
      if (visible.length) {
        visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        active = visible[0].target.id;
        state.activeSection = active;
        paint();
      }
    }, { rootMargin: "-30% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75] });

    sections.forEach(s => obs.observe(s));
  }
  function setupKeyboard() {
    const sectionIds = ["hero", "teach", "equip", "apply", "mission", "send-out"];

    function scrollSlide(dir) {
      const sec = state.activeSection;
      if (sec !== "apply" && sec !== "mission") return false;
      const mountSel = sec === "apply" ? "#apply-slides" : "#mission-slides";
      const slides = $$(`${mountSel} > .slide`);
      if (!slides.length) return false;
      const viewMid = window.scrollY + window.innerHeight / 2;
      let curIdx = 0;
      slides.forEach((s, i) => {
        const r = s.getBoundingClientRect();
        const top = window.scrollY + r.top;
        if (top < viewMid) curIdx = i;
      });
      const next = Math.max(0, Math.min(slides.length - 1, curIdx + dir));
      slides[next].scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    }

    function jump(idx) {
      const id = sectionIds[idx];
      const t = id ? document.getElementById(id) : null;
      if (t) t.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    window.addEventListener("keydown", (e) => {
      if (e.target.closest("input, textarea, [contenteditable]")) return;
      switch (e.key) {
        case "ArrowDown":
        case " ":
        case "PageDown":
          if (scrollSlide(+1)) e.preventDefault();
          break;
        case "ArrowUp":
        case "PageUp":
          if (scrollSlide(-1)) e.preventDefault();
          break;
        case "1": jump(1); e.preventDefault(); break;
        case "2": jump(2); e.preventDefault(); break;
        case "3": jump(3); e.preventDefault(); break;
        case "4": jump(4); e.preventDefault(); break;
        case "Home": jump(0); e.preventDefault(); break;
        case "End":  jump(5); e.preventDefault(); break;
        case "r":
          if (state.activeSection === "equip") {
            $$(".blank").forEach(b => fillBlank(b));
            e.preventDefault();
          }
          break;
        case "f":
          if (document.fullscreenElement) document.exitFullscreen();
          else document.documentElement.requestFullscreen().catch(() => {});
          e.preventDefault();
          break;
        case "?":
          toggleKbdHelp();
          e.preventDefault();
          break;
        case "Escape":
          if (document.fullscreenElement) document.exitFullscreen();
          $("#kbd-help").hidden = true;
          break;
      }
    });
  }

  function toggleKbdHelp() {
    const el = $("#kbd-help");
    if (!el) return;
    if (el.hidden) {
      el.hidden = false;
      el.innerHTML = `
        <div class="kbd-help-card">
          <h3>Keyboard</h3>
          <ul>
            <li><kbd>↓</kbd>/<kbd>Space</kbd>/<kbd>PgDn</kbd> — advance</li>
            <li><kbd>↑</kbd>/<kbd>PgUp</kbd> — back</li>
            <li><kbd>1</kbd>/<kbd>2</kbd>/<kbd>3</kbd>/<kbd>4</kbd> — Teach / Equip / Apply / Mission</li>
            <li><kbd>Home</kbd>/<kbd>End</kbd> — top / bottom</li>
            <li><kbd>r</kbd> — reveal all blanks (in Equip)</li>
            <li><kbd>f</kbd> — fullscreen</li>
            <li><kbd>Esc</kbd> — exit fullscreen / close help</li>
          </ul>
        </div>
      `;
      el.addEventListener("click", () => { el.hidden = true; }, { once: true });
    } else {
      el.hidden = true;
    }
  }

  function setupReveal() {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );
    $$(".reveal").forEach(el => obs.observe(el));
  }

  function init() {
    if (!D) {
      console.error("window.TEAM_DATA is missing");
      return;
    }
    renderHero();
    renderTeach();
    renderEquip();
    renderApply();
    renderMission();
    renderSendOut();
    renderRail();
    setupRailObserver();
    setupKeyboard();
    setupReveal();
    if (D.mission) {
      const seen = new Set();
      D.mission.forEach(q => (q.tags || []).forEach(t => seen.add(t)));
      const need = ["evangelism", "apologetics", "home", "abroad"];
      const missing = need.filter(t => !seen.has(t));
      if (missing.length) {
        console.warn(`Mission missing tag categories: ${missing.join(", ")}`);
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Expose for debugging
  window.__TEAM = { D, state, $, $$, fillBlank };
})();
