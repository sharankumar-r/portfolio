/* ---------- Content & Data ---------- */
const GITHUB = "https://github.com/sharankumar-r";

const skillsData = [
  {
    category: "Languages",
    items: ["Python", "C", "C++", "JavaScript", "TypeScript", "SQL"]
  },
  {
    category: "Frontend & Full-Stack",
    items: ["Next.js 14", "React", "HTML5", "CSS3 / Tailwind CSS", "shadcn/ui", "@dnd-kit", "Responsive UI"]
  },
  {
    category: "Backend & Databases",
    items: ["Python HTTP Server", "REST APIs", "Supabase", "PostgreSQL", "JSON API Design"]
  },
  {
    category: "Cybersecurity & Networking",
    items: ["TCP/IP", "Socket Programming", "Concurrent Port Scanning", "Network Diagnostics", "Log Analysis", "Authenticated Encryption (AES/HMAC)"]
  },
  {
    category: "Developer Tooling & Testing",
    items: ["Git", "GitHub", "Linux Shell", "pytest", "mypy", "Ruff", "Polars", "Tkinter", "zlib"]
  }
];

const projectsData = [
  {
    id: "taskflow",
    title: "TaskFlow ⚡",
    subtitle: "Dark, sleek task management app built with Next.js 14, TypeScript, Supabase, and shadcn/ui",
    badge: "Featured Full-Stack App",
    featured: true,
    category: "fullstack",
    points: [
      "Multiple Task Lists — Create, customize, and manage separate organized workspaces (Work, Personal, Projects, etc.).",
      "Rich Task Fields & Interactive Due Date Picker — Intuitive form dialogs with calendar popup, time selection, disabled visual states, priority tags, and status tracking.",
      "Drag & Drop Reordering & Calendar View — Fluid board and list reordering powered by @dnd-kit alongside an interactive timeline calendar view.",
      "Filtering, Search & Smart Sorting — Full-text search with multi-faceted filtering (priority, status, overdue) and flexible sorting by due date, priority, title, or manual order.",
      "Push Notifications & Categories — Browser push alerts for due and overdue tasks via Service Worker, plus user-defined color-coded categories.",
      "Safe Deletion Workflows — Confirmation modal dialogs for safely removing tasks, lists, and custom categories."
    ],
    tech: ["Next.js 14", "TypeScript", "Supabase", "shadcn/ui", "Tailwind CSS", "@dnd-kit", "Service Worker"],
    url: "https://github.com/sharankumar-r/TaskFlow"
  },
  {
    id: "log-analyzer",
    title: "Multi-Format Log Analyzer",
    subtitle: "High-throughput Python CLI for network security log ingestion and analysis",
    badge: "Systems & Security",
    featured: false,
    category: "systems",
    points: [
      "Parses and analyzes network logs from four major ecosystems (Palo Alto, Ubiquiti UniFi, WatchGuard, Cisco Meraki) with dedicated parsers for firewall events, system logs, and flow records.",
      "Leverages Polars transformations, columnar aggregation, and chunked processing on massive datasets; documented benchmarks include ~1,044,470 Meraki records processed in under 60 seconds.",
      "Features configurable noise filtering, suspicious IP analysis, and HTML/JSON report exports, reinforced with pytest suites, mypy static typing, and Ruff linting."
    ],
    tech: ["Python", "Polars", "Rich", "Typer", "mypy", "Ruff", "pytest"],
    url: GITHUB
  },
  {
    id: "port-scanner",
    title: "Port Scanner & Web Security Dashboard",
    subtitle: "Concurrent TCP scanner paired with a browser-based diagnostic interface",
    badge: "Networking & Security",
    featured: false,
    category: "cybersecurity",
    points: [
      "High-concurrency Python TCP port scanner with configurable port ranges, fine-grained socket timeouts, and automatic common service identification using ThreadPoolExecutor.",
      "Real-time browser security dashboard engineered with HTML, CSS, JavaScript, and Python's native HTTP server, exposing lightweight JSON REST endpoints.",
      "Supports CLI and interactive web modes, DNS/hostname resolution, live scan progress streaming, and exportable structured results."
    ],
    tech: ["Python", "TCP/IP", "Socket Programming", "ThreadPoolExecutor", "HTTP Server", "HTML5", "CSS3", "JavaScript", "REST APIs"],
    url: GITHUB
  },
  {
    id: "files-encryption",
    title: "Files Compressor with Encryption",
    subtitle: "Cross-platform file compression and cryptographic archive utility",
    badge: "Applied Cryptography",
    featured: false,
    category: "cybersecurity",
    points: [
      "Combines batch file archiving and high-ratio zlib compression (level 9) with Fernet authenticated encryption (AES-128-CBC + HMAC-SHA256) inside a custom binary container format.",
      "Provides cryptographic key generation, authentication verification, and guarded extraction to detect tampering or invalid keys before decrypting files.",
      "Modern Tkinter/ttk GUI featuring multi-file selection, live progress indicators, secure destination management, and cross-platform native dialogs."
    ],
    tech: ["Python", "cryptography", "Fernet", "AES-128-CBC", "HMAC-SHA256", "zlib", "Tkinter GUI"],
    url: "https://github.com/sharankumar-r/Files-Encryption"
  }
];

/* ---------- Helper DOM Builder ---------- */
const el = (tag, props = {}, children = []) => {
  const node = Object.assign(document.createElement(tag), props);
  [].concat(children).forEach(child => {
    if (child !== null && child !== undefined) {
      node.append(typeof child === "string" ? document.createTextNode(child) : child);
    }
  });
  return node;
};

/* ---------- Render Skills ---------- */
function renderSkills() {
  const container = document.getElementById("skills-list");
  if (!container) return;
  container.innerHTML = "";

  skillsData.forEach(group => {
    const card = el("div", { className: "skill-category-card" }, [
      el("dt", {}, group.category),
      el("dd", {}, [
        el("ul", { className: "tags", "aria-label": `${group.category} technologies` },
          group.items.map(item => el("li", {}, item))
        )
      ])
    ]);
    container.appendChild(card);
  });
}

/* ---------- Render Projects with Filter ---------- */
function renderProjects(filter = "all") {
  const container = document.getElementById("projects-list");
  if (!container) return;
  container.innerHTML = "";

  const filtered = filter === "all"
    ? projectsData
    : projectsData.filter(p => p.category === filter);

  filtered.forEach(p => {
    const card = el("article", {
      className: `card ${p.featured ? "featured" : ""}`,
      id: `project-${p.id}`
    }, [
      el("div", { className: "card-top" }, [
        el("h3", {}, p.title),
        p.badge ? el("span", { className: "card-badge" }, p.badge) : null
      ]),
      el("p", { className: "sub" }, p.subtitle),
      el("ul", { className: "points" }, p.points.map(pt => el("li", {}, pt))),
      el("ul", { className: "tags", "aria-label": `${p.title} tech stack` },
        p.tech.map(t => el("li", {}, t))
      ),
      el("div", { className: "card-footer" }, [
        el("a", {
          className: "repo",
          href: p.url,
          target: "_blank",
          rel: "noopener noreferrer",
          ariaLabel: `View ${p.title} repository on GitHub`
        }, [
          el("span", {}, "Explore on GitHub"),
          el("span", { "aria-hidden": "true" }, "→")
        ])
      ])
    ]);

    container.appendChild(card);
  });
}

/* ---------- Setup Project Filter Buttons ---------- */
function setupProjectFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter") || "all";
      renderProjects(filter);
    });
  });
}

/* ---------- Toast Notification Utility ---------- */
function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = el("div", { id: "toast", className: "toast", role: "status", "aria-live": "polite" });
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

/* ---------- Clipboard Helper ---------- */
function copyText(text, successMsg = "Copied to clipboard!") {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMsg);
    }).catch(() => {
      fallbackCopy(text, successMsg);
    });
  } else {
    fallbackCopy(text, successMsg);
  }
}

function fallbackCopy(text, successMsg) {
  const tempInput = document.createElement("input");
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  try {
    document.execCommand("copy");
    showToast(successMsg);
  } catch (err) {
    showToast("Failed to copy");
  }
  document.body.removeChild(tempInput);
}

/* ---------- Active Navigation Scroll Spy ---------- */
function setupScrollSpy() {
  const sections = document.querySelectorAll("main section[id], .hero[id]");
  const navLinks = document.querySelectorAll("nav a[href^='#']");

  window.addEventListener("scroll", () => {
    let current = "";
    const scrollPos = window.scrollY + 140;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = sec.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (current && link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }, { passive: true });
}

/* ---------- Interactive Terminal Simulator ---------- */
let terminalOutput;
let terminalCaret;

const terminalCommands = {
  help: () => "Available commands:\n  • taskflow   - Details on TaskFlow Next.js 14 app\n  • projects   - View all open-source projects\n  • skills     - Summarize technical stack\n  • contact    - Get email & phone\n  • clear      - Clear terminal screen",
  whoami: () => "sharan-kumar-r // CS undergraduate & full-stack builder",
  taskflow: () => "TaskFlow ⚡:\n  Full-stack Next.js 14 task app with Supabase PostgreSQL,\n  shadcn/ui, drag & drop (@dnd-kit), calendar views & push alerts.\n  Repo: https://github.com/sharankumar-r/TaskFlow",
  projects: () => "Active projects:\n  1. TaskFlow ⚡ (Next.js 14, Supabase, TypeScript)\n  2. Multi-Format Log Analyzer (Python, Polars, 1M+ rows/min)\n  3. Port Scanner Dashboard (Python, Sockets, HTTP server)\n  4. Files Compressor & Encryption (AES-128-CBC, Fernet, Tkinter)",
  skills: () => "Key skills:\n  Full-Stack: Next.js 14, React, TypeScript, Tailwind, REST\n  Backend & Systems: Python, Polars, C/C++, Supabase\n  Cybersecurity: Network diagnostics, port scanning, cryptography",
  status: () => "[ok] Open to software engineering & cybersecurity roles",
  contact: () => "Email: sharankumarrno@gmail.com\nPhone: +91 96635 71484\nGitHub: github.com/sharankumar-r",
  clear: () => {
    if (terminalOutput) {
      terminalOutput.textContent = "";
      if (terminalCaret) terminalOutput.appendChild(terminalCaret);
    }
    return "";
  }
};

async function executeCommand(cmdName) {
  if (!terminalOutput) return;
  const cmd = cmdName.trim().toLowerCase();
  
  if (cmd === "clear") {
    terminalCommands.clear();
    return;
  }

  const promptLine = el("span", { className: "p" }, `$ ${cmd}\n`);
  terminalOutput.insertBefore(promptLine, terminalCaret);

  const handler = terminalCommands[cmd];
  const response = handler ? handler() : `bash: command not found: ${cmd}. Type 'help' for options.`;

  if (response) {
    const outSpan = el("span", { className: "cmd-out" }, `${response}\n\n`);
    terminalOutput.insertBefore(outSpan, terminalCaret);
  }

  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

async function bootTerminal() {
  terminalOutput = document.getElementById("term-out");
  if (!terminalOutput) return;

  const initialScript = [
    ["p", "$ whoami"],
    ["", "sharan-kumar-r"],
    ["p", "$ cat focus.txt"],
    ["", "full-stack development (Next.js 14)\ncybersecurity & network diagnostics\nhigh-performance Python utilities"],
    ["p", "$ ls featured-projects/"],
    ["", "taskflow-app/  log-analyzer/  port-scanner/  files-encryption/"],
    ["p", "$ status"],
    ["ok", "[ok] ready for software engineering opportunities"]
  ];

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  terminalCaret = el("span", { className: "caret" });
  terminalOutput.append(terminalCaret);

  for (const [cls, text] of initialScript) {
    const s = el("span", { className: cls });
    terminalOutput.insertBefore(s, terminalCaret);

    if (cls === "p" && !reduceMotion) {
      for (const char of text) {
        s.textContent += char;
        await sleep(28);
      }
    } else {
      s.textContent = text;
    }

    terminalOutput.insertBefore(document.createTextNode("\n"), terminalCaret);
    if (!reduceMotion) await sleep(cls === "p" ? 180 : 320);
  }

  // Setup terminal shortcut buttons
  document.querySelectorAll(".term-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const cmd = btn.getAttribute("data-cmd");
      if (cmd) executeCommand(cmd);
    });
  });
}

/* ---------- Initialize Application ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderSkills();
  renderProjects("all");
  setupProjectFilters();
  setupScrollSpy();
  bootTerminal();

  // Update Year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Copy Email Buttons
  document.querySelectorAll(".copy-email-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      copyText("sharankumarrno@gmail.com", "Email copied to clipboard: sharankumarrno@gmail.com");
    });
  });

  // Copy Phone Buttons
  document.querySelectorAll(".copy-phone-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      copyText("+919663571484", "Phone copied to clipboard: +91 96635 71484");
    });
  });
});
