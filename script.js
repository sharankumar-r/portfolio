/* ---------- Content: edit here ---------- */
const GITHUB = "https://github.com/sharankumar-r";

const skills = [
  ["Languages", ["Python", "C", "C++", "JavaScript"]],
  ["Web Development", ["HTML5", "CSS3", "Responsive Web Design", "Web Architecture", "JavaScript"]],
  ["Backend & APIs", ["Python", "HTTP Server", "REST APIs", "JSON"]],
  ["Cybersecurity & Networking", ["TCP/IP", "Socket Programming", "Port Scanning", "Network Diagnostics", "Log Analysis", "Authenticated Encryption"]],
  ["Libraries & Tools", ["Polars", "Typer", "Rich", "Tkinter", "cryptography", "zlib", "Git", "GitHub", "Linux Shell", "pytest", "mypy", "Ruff"]]
];

const projects = [
  {
    title: "Multi-Format Log Analyzer",
    subtitle: "Python CLI for network log analysis",
    points: [
      "Parses and analyzes network logs from four vendor ecosystems (Palo Alto, Ubiquiti UniFi, WatchGuard, Cisco Meraki) with vendor-specific parsers for firewall events, system logs, and flow records.",
      "Uses Polars transformations, aggregation, and chunked processing on large datasets; documented benchmarks include about 1,044,470 Meraki records in roughly 60 seconds.",
      "Includes configurable noise detection, top IP analysis, and HTML and JSON report exports, backed by tests, type checking, linting, and dependency management."
    ],
    tech: ["Python", "Polars", "Rich", "mypy", "Ruff"],
    url: GITHUB
  },
  {
    title: "Port Scanner & Web Security Dashboard",
    subtitle: "Concurrent TCP scanner with a browser-based diagnostic interface",
    points: [
      "Python TCP port scanner with configurable port ranges, socket timeouts, common service identification, and concurrent scanning using ThreadPoolExecutor.",
      "Browser dashboard built with HTML, CSS, JavaScript, and Python's built-in HTTP server, exposing JSON endpoints for scan execution and status checks.",
      "CLI and interactive modes, hostname/DNS resolution, progress reporting, and structured scan results."
    ],
    tech: ["Python", "TCP/IP", "Socket Programming", "ThreadPoolExecutor", "HTTP Server", "HTML5", "CSS3", "JavaScript", "JSON", "REST"],
    url: GITHUB
  },
  {
    title: "Files Compressor with Encryption",
    subtitle: "Cross-platform file compression utility",
    points: [
      "Python desktop utility combining batch file archiving and zlib compression (level 9) with Fernet authenticated encryption in a custom container format.",
      "Implements key generation, decryption, authentication and integrity checks, and guarded extraction that detects invalid keys or tampered data before restoring files.",
      "Tkinter/ttk GUI with multi-file selection, progress feedback, destination path management, and cross-platform dialogs."
    ],
    tech: ["cryptography", "Fernet", "AES-128-CBC", "HMAC-SHA256", "zlib", "File I/O", "Tkinter"],
    url: "https://github.com/sharankumar-r/Files-Encryption"
  }
];

/* ---------- Rendering ---------- */
const el = (tag, props = {}, children = []) => {
  const n = Object.assign(document.createElement(tag), props);
  [].concat(children).forEach(c => n.append(c));
  return n;
};

const skillsList = document.getElementById("skills-list");
if (skillsList) {
  skillsList.append(
    ...skills.flatMap(([group, items]) => [
      el("div", {}, [
        el("dt", { textContent: group }),
        el("dd", {}, [
          el("ul", { className: "tags" }, items.map(t => el("li", { textContent: t })))
        ])
      ])
    ])
  );
}

const projectCard = p => el("article", { className: "card" }, [
  el("h3", { textContent: p.title }),
  el("p", { className: "sub", textContent: p.subtitle }),
  el("ul", { className: "points" }, p.points.map(t => el("li", { textContent: t }))),
  el("ul", { className: "tags", "aria-label": "Technologies" }, p.tech.map(t => el("li", { textContent: t }))),
  el("a", { className: "repo", href: p.url, rel: "noopener", textContent: "View on GitHub →", ariaLabel: `${p.title} on GitHub` })
]);

const projectsList = document.getElementById("projects-list");
if (projectsList) {
  projectsList.append(...projects.map(projectCard));
}

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* Decorative hero terminal */
(async () => {
  const out = document.getElementById("term-out");
  if (!out) return;

  const lines = [
    ["p", "$ whoami"],
    ["", "sharan-kumar-r"],
    ["p", "$ cat focus.txt"],
    ["", "full-stack development\ncybersecurity\nnetwork diagnostics"],
    ["p", "$ ls projects/"],
    ["", "log-analyzer  port-scanner  files-encryption"],
    ["p", "$ status"],
    ["ok", "[ok] open to opportunities"]
  ];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const caret = el("span", { className: "caret" });
  out.append(caret);

  for (const [cls, text] of lines) {
    const s = el("span", { className: cls });
    out.insertBefore(s, caret);
    if (cls === "p" && !reduce) {
      for (const ch of text) {
        s.textContent += ch;
        await sleep(35);
      }
    } else {
      s.textContent = text;
    }
    out.insertBefore(document.createTextNode("\n"), caret);
    if (!reduce) await sleep(cls === "p" ? 250 : 400);
  }
})();
