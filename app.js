const D = window.CHALK_DATA;

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

function renderSteps() {
  $("#session-steps").innerHTML = D.blocks.map((block, index) => `
    <a class="step-pill" href="#${block.id}">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <strong>${block.label}</strong>
      <em>${block.subtitle}</em>
    </a>
  `).join("");
}

function renderSources(activeId = null) {
  $("#source-list").innerHTML = D.sources.map((source) => `
    <button class="source-chip ${activeId === source.id ? "active" : ""}" type="button" data-source="${source.id}" style="--source:${source.color}">
      <span>${source.label}</span>
      <em>${source.ref}</em>
    </button>
  `).join("");
}

function renderBoard(activeId = null) {
  const phrases = activeId ? D.boardPhrases.filter((p) => p.source === activeId) : D.boardPhrases;
  $("#thread-board").innerHTML = `
    <svg class="thread-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      ${phrases.map((p, i) => `<path d="M 5 ${20 + i * 10} C 26 ${p.y - 18}, ${p.x - 16} ${p.y - 5}, ${p.x} ${p.y}" />`).join("")}
    </svg>
    ${phrases.map((p) => {
      const source = D.sources.find((s) => s.id === p.source);
      return `
        <button class="phrase-card" type="button" data-source="${p.source}" style="left:${p.x}%; top:${p.y}%; --source:${source.color}">
          <span class="greek">${p.text}</span>
          <em>${p.ref} · ${p.en}</em>
        </button>
      `;
    }).join("")}
  `;
}

function renderTimeline() {
  $("#timeline").innerHTML = D.blocks.map((block, index) => `
    <li>
      <span>${String(index + 1).padStart(2, "0")}</span>
      <strong>${block.label}</strong>
      <em>${block.subtitle}</em>
    </li>
  `).join("");
}

function renderMovements() {
  $("#movement-grid").innerHTML = D.movements.map((move) => `
    <article class="movement-card">
      <span class="movement-num">${move.number}</span>
      <div>
        <p>${move.ref}</p>
        <h3>${move.title}</h3>
        <strong>${move.summary}</strong>
        <em>${move.christ}</em>
        <small>${move.note}</small>
      </div>
    </article>
  `).join("");
}

function renderMarks(active = "all") {
  $("#mark-controls").innerHTML = D.marks.map((mark) => `
    <button class="${mark.id === active ? "active" : ""}" type="button" data-mark="${mark.id}">
      ${mark.label}
    </button>
  `).join("");

  $("#mark-list").innerHTML = D.pulpitOutline.map((section) => {
    const items = section.items.filter((item) => active === "all" || item.mark === active);
    if (!items.length) return "";
    return `
      <article class="outline-section">
        <h3>${section.section}</h3>
        <div class="outline-items">
          ${items.map((item) => `
            <div class="outline-item" data-mark="${item.mark}">
              <span>${item.mark}</span>
              <p>${item.text}</p>
            </div>
          `).join("")}
        </div>
      </article>
    `;
  }).join("");
}

function renderSessionTabs(activeId = D.blocks[0].id) {
  $("#session-tabs").innerHTML = D.blocks.map((block) => `
    <button class="${block.id === activeId ? "active" : ""}" type="button" data-block="${block.id}">
      <span>${block.label}</span>
      <em>${block.subtitle}</em>
    </button>
  `).join("");
  renderSessionPanel(activeId);
}

function setActiveBlock(id, shouldScroll = true, shouldUpdateHash = true) {
  renderSessionTabs(id);
  if (shouldUpdateHash) history.replaceState(null, "", `#${id}`);
  if (shouldScroll) $(".session").scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderSessionPanel(activeId) {
  const block = D.blocks.find((item) => item.id === activeId);
  let interactive = "";
  if (activeId === "teaching") interactive = renderTeachingTopics();
  if (activeId === "equipping") interactive = renderEquippingBlanks();
  if (activeId === "application") interactive = renderQuestionDeck(D.applicationQuestions, "Application questions");
  if (activeId === "missions") interactive = renderQuestionDeck(D.missionsQuestions, "Missions questions");

  $("#session-panel").innerHTML = `
    <div class="panel-kicker">${block.label}</div>
    <h3>${block.title}</h3>
    <p class="panel-aim">${block.aim}</p>
    <ul class="panel-beats">
      ${block.beats.map((beat) => `<li>${beat}</li>`).join("")}
    </ul>
    ${interactive}
    <div class="discussion">
      <span>Discussion prompt</span>
      <p>${block.prompt}</p>
    </div>
  `;
}

function renderTeachingTopics() {
  return `
    <div class="teaching-frame">
      <span>Romans 3:9-20 moves like a courtroom closing argument</span>
      <strong>Charge -> Witness -> Evidence -> Verdict -> Conclusion -> But now</strong>
    </div>
    <div class="sketch-strip">
      ${D.teachingSketch.map((step) => `
        <button class="sketch-card" type="button">
          <span>${step.ref}</span>
          <strong>${step.title}</strong>
          <em>${step.text}</em>
        </button>
      `).join("")}
    </div>
    <div class="flow-strip">
      ${D.teachingFlow.map((step, index) => `
        <button class="flow-card" type="button">
          <span>${step.ref}</span>
          <strong>${index + 1}. ${step.title}</strong>
          <em>${step.label}</em>
          <p>${step.body}</p>
        </button>
      `).join("")}
    </div>
    <div class="mini-heading">Body-parts evidence</div>
    <div class="body-strip">
      ${D.bodyParts.map((item) => `
        <button class="body-card" type="button">
          <span>${item.ref}</span>
          <strong>${item.part}</strong>
          <em>${item.image}</em>
        </button>
      `).join("")}
    </div>
    <div class="mini-heading">Key words and phrases</div>
    <div class="term-strip">
      ${D.keyTerms.map((term) => `
        <button class="term-card" type="button">
          <span class="term-ref">${term.ref}</span>
          <span class="greek">${term.greek}</span>
          <strong>${term.gloss}</strong>
          <em>${term.note}</em>
          <small>${term.cue}</small>
        </button>
      `).join("")}
    </div>
    <div class="mini-heading">Theological categories</div>
    <div class="category-strip">
      ${D.categories.map((cat) => `
        <button class="category-card" type="button">
          <span>${cat.ref}</span>
          <strong>${cat.title}</strong>
          <p>${cat.text}</p>
        </button>
      `).join("")}
    </div>
    <div class="mini-heading">Romans3 lecture modules</div>
    <div class="topic-grid">
      ${D.teachingTopics.map((topic) => `
        <button class="topic-card" type="button">
          <span>${topic.label}</span>
          <strong>${topic.title}</strong>
          <em>${topic.text}</em>
          <small>${topic.cue}</small>
        </button>
      `).join("")}
    </div>
  `;
}

function renderEquippingBlanks() {
  return `
    <div class="blank-board" id="blank-board">
      ${D.equippingBlanks.map((blank, index) => `
        <button class="blank-line" type="button" data-blank="${index}">
          <span>${blank.prompt}</span>
          <strong>${blank.answer}</strong>
          <em>${blank.help}</em>
        </button>
      `).join("")}
    </div>
  `;
}

function renderQuestionDeck(questions, label) {
  return `
    <div class="question-deck" aria-label="${label}">
      ${questions.map((question, index) => `
        <button class="question-card" type="button">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <strong>${question}</strong>
        </button>
      `).join("")}
    </div>
  `;
}

function wireInteractions() {
  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute("href").slice(1);
    if (!D.blocks.some((block) => block.id === id)) return;
    event.preventDefault();
    setActiveBlock(id);
  });

  $("#source-list").addEventListener("click", (event) => {
    const button = event.target.closest("[data-source]");
    if (!button) return;
    const id = button.dataset.source;
    const isActive = button.classList.contains("active");
    renderSources(isActive ? null : id);
    renderBoard(isActive ? null : id);
  });

  $("#board-toggle").addEventListener("click", () => {
    const shell = $(".board-shell");
    shell.classList.toggle("sources-hidden");
    $("#board-toggle").textContent = shell.classList.contains("sources-hidden") ? "Show sources" : "Hide sources";
  });

  $("#session-tabs").addEventListener("click", (event) => {
    const button = event.target.closest("[data-block]");
    if (!button) return;
    setActiveBlock(button.dataset.block, false);
  });

  $("#session-panel").addEventListener("click", (event) => {
    const blank = event.target.closest(".blank-line");
    if (blank) blank.classList.toggle("revealed");
    const question = event.target.closest(".question-card");
    if (question) question.classList.toggle("active");
    const topic = event.target.closest(".topic-card");
    if (topic) topic.classList.toggle("active");
    const term = event.target.closest(".term-card");
    if (term) term.classList.toggle("active");
    const teachingCard = event.target.closest(".sketch-card, .flow-card, .body-card, .category-card");
    if (teachingCard) teachingCard.classList.toggle("active");
  });

  $("#mark-controls").addEventListener("click", (event) => {
    const button = event.target.closest("[data-mark]");
    if (!button) return;
    renderMarks(button.dataset.mark);
  });

  $("#copy-handout").addEventListener("click", async () => {
    await navigator.clipboard.writeText(D.handout);
    $("#copy-handout").textContent = "Copied";
    setTimeout(() => { $("#copy-handout").textContent = "Copy outline"; }, 1200);
  });
}

function revealOnScroll() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.14 });
  $$(".section-band, .movement-card, .leader-card").forEach((el) => observer.observe(el));
}

function init() {
  renderSteps();
  renderSources();
  renderBoard();
  renderTimeline();
  renderMovements();
  renderMarks();
  const hashBlock = location.hash.slice(1);
  const hasBlockHash = D.blocks.some((block) => block.id === hashBlock);
  const initialBlock = hasBlockHash ? hashBlock : D.blocks[0].id;
  renderSessionTabs(initialBlock);
  $("#handout-text").textContent = D.handout;
  wireInteractions();
  revealOnScroll();
  if (hasBlockHash) {
    requestAnimationFrame(() => $(".session").scrollIntoView({ behavior: "auto", block: "start" }));
    window.addEventListener("load", () => {
      setTimeout(() => $(".session").scrollIntoView({ behavior: "auto", block: "start" }), 120);
    }, { once: true });
  }
}

init();
