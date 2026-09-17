/* ============================================================
 *  main.js — 渲染与交互
 *  内容全部来自 data.js，改内容不用动这里
 * ============================================================ */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ---------- 通用：按 data-* 填充文本 ---------- */
function fillText() {
  $$("[data-name]").forEach(el => (el.textContent = PROFILE.name));
  $$("[data-name-en]").forEach(el => (el.textContent = PROFILE.nameEn));
  $$("[data-school]").forEach(el => (el.textContent = PROFILE.school));
  $$("[data-major]").forEach(el => (el.textContent = PROFILE.major));
  $$("[data-grade]").forEach(el => (el.textContent = PROFILE.grade));
  $$("[data-role]").forEach(el => (el.textContent = PROFILE.role));
  $$("[data-intro]").forEach(el => (el.textContent = PROFILE.intro.replace(/\s+/g, " ")));
  $$("[data-hobby-title]").forEach(el => (el.textContent = HOBBY.title));
  $$("[data-hobby-sub]").forEach(el => (el.textContent = `${HOBBY.title} · ${HOBBY.subtitle}`));
  $$("[data-hobby-desc]").forEach(el => (el.textContent = HOBBY.desc));
  document.title = `${PROFILE.name} · 个人主页 | ${PROFILE.school} · ${PROFILE.major}`;
}

/* ---------- Hero 打字机 ---------- */
function initTyped() {
  const el = $("#typed");
  if (!el) return;
  const words = PROFILE.keywords;
  let wi = 0, ci = 0, deleting = false;

  (function tick() {
    const word = words[wi];
    el.textContent = word.slice(0, ci);
    let delay = deleting ? 55 : 110;
    if (!deleting && ci === word.length) { delay = 1600; deleting = true; }
    else if (deleting && ci === 0) { deleting = false; wi = (wi + 1) % words.length; delay = 320; }
    else { ci += deleting ? -1 : 1; }
    setTimeout(tick, delay);
  })();
}

/* ---------- Hero 统计 ---------- */
function initStats() {
  const stats = [
    { num: PROJECTS.length, label: "项目作品" },
    { num: HONORS.length, label: "荣誉奖项" },
    { num: TIMELINE.length, label: "成长节点" },
    { num: "∞", label: "摸鱼时长" }
  ];
  $("#heroStats").innerHTML = stats
    .map(s => `<div class="stat reveal"><b>${s.num}</b><span>${s.label}</span></div>`)
    .join("");
}

/* ---------- 技能 ---------- */
function initSkills() {
  $("#skillBars").innerHTML =
    `<h3 class="section-title" style="font-size:20px;margin-bottom:24px">熟练度</h3>` +
    SKILLS.map(
      s => `<div class="bar-item">
        <div class="bar-top"><span>${s.name}</span><span>${s.level}%</span></div>
        <div class="bar-track"><div class="bar-fill" data-level="${s.level}"></div></div>
      </div>`
    ).join("");

  const renderTags = (id, arr) => {
    $(id).innerHTML = arr.map(t => `<span class="tag">${t}</span>`).join("");
  };
  renderTags("#tagCore", SKILL_TAGS.core);
  renderTags("#tagAi", SKILL_TAGS.ai);
  renderTags("#tagWeb", SKILL_TAGS.web);
}

/* ---------- 项目 ---------- */
const CATEGORY_ICON = { ai: "🤖", embedded: "🔧", web: "🌐", other: "📦" };

function renderProjects(filter = "all") {
  const list = filter === "all" ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  if (!list.length) {
    $("#projectGrid").innerHTML =
      `<div class="add-hint"><span class="plus">·</span><p>这个分类还没有项目，去 <code>data.js</code> 里加一条吧。</p></div>`;
    return;
  }

  $("#projectGrid").innerHTML = list
    .map(
      (p, i) => `
    <article class="project-card reveal" style="transition-delay:${i * 60}ms">
      ${p.featured ? `<span class="featured-flag">精选</span>` : ""}
      <div class="pc-top">
        <div class="pc-emoji">${CATEGORY_ICON[p.category] || "📦"}</div>
        <div class="pc-meta"><span class="pc-year">${p.year}</span>${p.role}</div>
      </div>
      <h3>${p.title}</h3>
      <p class="pc-sub">${p.subtitle}</p>
      <p class="pc-desc">${p.desc}</p>
      ${p.highlights?.length
        ? `<ul class="pc-highlights">${p.highlights.map(h => `<li>${h}</li>`).join("")}</ul>`
        : ""}
      <div class="pc-tags">${p.tags.map(t => `<span>${t}</span>`).join("")}</div>
      ${p.links?.length
        ? `<div class="pc-links">${p.links
            .map(l => `<a href="${l.href}" target="_blank" rel="noopener">${l.label} ↗</a>`)
            .join("")}</div>`
        : ""}
    </article>`
    )
    .join("");

  observeReveal();
  bindCardGlow();
}

function initFilters() {
  const keys = ["all", ...new Set(PROJECTS.map(p => p.category))];
  $("#projectFilters").innerHTML = keys
    .map(k => `<button class="filter-btn ${k === "all" ? "active" : ""}" data-filter="${k}">${PROJECT_CATEGORIES[k] || k}</button>`)
    .join("");

  $$("#projectFilters .filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      $$("#projectFilters .filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderProjects(btn.dataset.filter);
    });
  });
}

/* 鼠标跟随光效 */
function bindCardGlow() {
  $$(".project-card").forEach(card => {
    card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });
}

/* ---------- 荣誉 ---------- */
function initHonors() {
  $("#honorList").innerHTML = HONORS.map(
    (h, i) => `
    <div class="honor-item reveal" style="transition-delay:${i * 80}ms">
      <div class="honor-medal">${i === 0 ? "🏆" : "🎖️"}</div>
      <div>
        <div class="honor-award">${h.award}</div>
        <h3>${h.title}</h3>
        <p>${h.desc}</p>
      </div>
      <div class="honor-year">${h.year}</div>
    </div>`
  ).join("");
}

/* ---------- 时间线 ---------- */
function initTimeline() {
  $("#timelineWrap").innerHTML = TIMELINE.map(
    t => `
    <div class="tl-item reveal">
      <div class="tl-card">
        <div class="tl-year">${t.year}</div>
        <h3>${t.title}</h3>
        <div class="tl-org">${t.org}</div>
        <p>${t.desc}</p>
      </div>
    </div>`
  ).join("");
}

/* ---------- 摸鱼 ---------- */
function initHobby() {
  $("#hobbyBars").innerHTML =
    `<h3 class="section-title" style="font-size:20px;margin-bottom:24px">摸鱼能力雷达</h3>` +
    HOBBY.skills
      .map(
        s => `<div class="bar-item">
        <div class="bar-top"><span>${s.name}</span><span>${s.level}%</span></div>
        <div class="bar-track"><div class="bar-fill" data-level="${s.level}"></div></div>
      </div>`
      )
      .join("");

  let qi = 0;
  const show = () => ($("#quoteBox").textContent = HOBBY.quotes[qi]);
  show();
  $("#quoteBtn").addEventListener("click", () => {
    qi = (qi + 1) % HOBBY.quotes.length;
    const box = $("#quoteBox");
    box.style.opacity = 0;
    setTimeout(() => { show(); box.style.opacity = 1; }, 180);
  });
}

/* ---------- 联系方式 ---------- */
const ICONS = {
  mail: '<svg viewBox="0 0 24 24"><path d="M4 6h16v12H4z"/><path d="m4 7 8 6 8-6"/></svg>',
  github: '<svg viewBox="0 0 24 24"><path d="M9 19c-4 1.5-4-2.5-6-3m12 5v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6-1.5 6-6.5a5 5 0 0 0-1.4-3.4 4.6 4.6 0 0 0-.1-3.5s-1.4-.4-4.5 1.7a12.3 12.3 0 0 0-6.2 0C4.8 1.7 3.4 2.1 3.4 2.1a4.6 4.6 0 0 0-.1 3.5A5 5 0 0 0 2 9c0 5 3 6.2 6 6.5a3.4 3.4 0 0 0-.9 2.6V21"/></svg>',
  phone: '<svg viewBox="0 0 24 24"><path d="M6 2h3l2 5-2.5 1.5a12 12 0 0 0 5 5L15 11l5 2v3a2 2 0 0 1-2.2 2A15 15 0 0 1 4 4.2 2 2 0 0 1 6 2Z"/></svg>',
  map: '<svg viewBox="0 0 24 24"><path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>'
};

function initContact() {
  $("#contactGrid").innerHTML = PROFILE.contacts
    .map(
      c => `<a class="contact-item" href="${c.href}" ${c.href.startsWith("http") ? 'target="_blank" rel="noopener"' : ""}>
        <div class="ci-icon">${ICONS[c.icon] || ICONS.mail}</div>
        <div><div class="ci-label">${c.label}</div><div class="ci-value">${c.value}</div></div>
      </a>`
    )
    .join("");
}

/* ---------- 滚动：入场 / 技能条 / 导航 ---------- */
let io;
function observeReveal() {
  if (io) io.disconnect();
  io = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          $$(".bar-fill", e.target).forEach(f => (f.style.width = f.dataset.level + "%"));
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );
  $$(".reveal:not(.in)").forEach(el => io.observe(el));
}

function initScroll() {
  const nav = $("#nav");
  const links = $$(".nav-links a");
  const sections = $$("main section[id]");

  const onScroll = () => {
    nav.classList.toggle("scrolled", scrollY > 40);
    let cur = "";
    sections.forEach(s => { if (scrollY >= s.offsetTop - 200) cur = s.id; });
    links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + cur));
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ---------- 移动端菜单 ---------- */
function initMenu() {
  const btn = $("#navToggle"), menu = $("#navLinks");
  btn.addEventListener("click", () => menu.classList.toggle("open"));
  $$(".nav-links a").forEach(a => a.addEventListener("click", () => menu.classList.remove("open")));
}

/* ---------- 摸鱼彩蛋：空闲一会儿就弹出来 ---------- */
function initEgg() {
  const egg = $("#egg"), count = $("#eggCount");
  let idle = setTimeout(show, 20000), sec = 0, timer = null;

  function show() {
    egg.classList.add("show");
    timer = setInterval(() => { count.textContent = ++sec; }, 1000);
  }
  ["mousemove", "keydown", "wheel", "touchstart"].forEach(ev =>
    addEventListener(ev, () => {
      clearTimeout(idle); clearInterval(timer);
      egg.classList.remove("show"); sec = 0; count.textContent = 0;
      idle = setTimeout(show, 45000);
    }, { passive: true })
  );
}

/* ---------- 启动 ---------- */
(function init() {
  fillText();
  initTyped();
  initStats();
  initSkills();
  initFilters();
  renderProjects();
  initHonors();
  initTimeline();
  initHobby();
  initContact();
  initScroll();
  initMenu();
  initEgg();
  observeReveal();
  $("#year").textContent = new Date().getFullYear();
})();
