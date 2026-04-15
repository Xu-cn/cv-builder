"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, Github, Linkedin, Download, MapPin, ArrowDown } from "lucide-react";

// ─── Types ───────────────────────────────────────────
type Lang = "fr" | "en";

// ─── Translations ────────────────────────────────────
const T = {
  fr: {
    nav: ["Intro", "Stack", "Projets", "Finance", "Sport"],
    download: "Télécharger",
    hero: {
      role: "Ingénieur en Système d'Information et Cybersécurité",
      tagline: ["Curieux par nature — je touche à tout.", "Code, hardware, marchés, sport."],
      educationLabel: "Formation",
      educationSub: "SI",
      jobLabel: "Poste actuel",
      jobSub: "Software Engineer",
    },
    stack: {
      label: "Stack technique",
      title: "Ce que je maîtrise",
      groups: ["Langages", "Frameworks", "Outils"],
      about: (
        <>
          Ingénieur diplômé de l&apos;ECE Paris, spécialisé en{" "}
          <span className="text-teal-400">Systèmes d&apos;Information et Cybersécurité</span>.
          Expérience en développement embarqué, développement web full-stack, outils DevOps
          et analyse de données. Actuellement en poste chez Stellantis.
        </>
      ),
    },
    projects: {
      label: "Portfolio",
      title: "Projets",
      items: [
        {
          subtitle: "PFE · ECE Paris · ING-5 · 2024",
          description:
            "Projet de fin d'études réalisé en équipe de 6 à l'ECE Paris. Conception d'un système de pilotage de fauteuil roulant électrique par mouvements de tête, à partir d'un capteur inertiel BNO055 et d'un microcontrôleur ESP32. Développement embarqué en C++, conception d'un PCB dédié, intégration d'une interface OLED et d'une barre LED.",
        },
        {
          subtitle: "Stellantis · 2024–2025",
          description:
            "Dashboard de suivi des KPIs sur la BOM (Bill of Materials) des véhicules. Visualisation et analyse des indicateurs clés de performance sur la nomenclature véhicule — suivi des écarts, alertes et reporting pour les équipes ingénierie.",
        },
      ],
    },
    finance: {
      label: "Intérêt personnel",
      title: "Finance & Géopolitique",
      p1: "Intérêt marqué pour la géopolitique, la finance et la fiscalité. Lecture régulière de l'actualité économique et internationale, avec un suivi des marchés financiers et des politiques fiscales.",
      p2: "Compréhension des mécanismes macro-économiques, des flux de capitaux et des enjeux fiscaux — tant à l'échelle personnelle qu'internationale. Utilisation de DAX et Power BI pour l'analyse de données.",
      items: ["Finance de marché", "Géopolitique", "Fiscalité", "Macro-économie", "Flux de capitaux"],
    },
    sport: {
      label: "En dehors du clavier",
      title: "Sport",
      labels: ["Street Workout", "Padel", "Escalade", "Foot à 5", "Ski"],
      subs: ["Musculation & calisthenics", "Compétitif", "Bloc & voie", "Hebdomadaire", "Alpin"],
    },
  },
  en: {
    nav: ["Intro", "Stack", "Projects", "Finance", "Sport"],
    download: "Download",
    hero: {
      role: "Systems & Cybersecurity Engineer",
      tagline: ["Curious by nature — I dabble in everything.", "Code, hardware, markets, sport."],
      educationLabel: "Education",
      educationSub: "IS",
      jobLabel: "Current role",
      jobSub: "Software Engineer",
    },
    stack: {
      label: "Tech stack",
      title: "What I know",
      groups: ["Languages", "Frameworks", "Tools"],
      about: (
        <>
          Graduate engineer from ECE Paris, specialized in{" "}
          <span className="text-teal-400">Information Systems & Cybersecurity</span>.
          Experience in embedded development, full-stack web development, DevOps tooling
          and data analysis. Currently working at Stellantis.
        </>
      ),
    },
    projects: {
      label: "Portfolio",
      title: "Projects",
      items: [
        {
          subtitle: "Final Year Project · ECE Paris · ING-5 · 2024",
          description:
            "Final year project at ECE Paris, team of 6. Designed a head-movement controlled electric wheelchair system using a BNO055 inertial sensor and an ESP32 microcontroller. Embedded development in C++, dedicated PCB design, OLED interface and LED bar integration.",
        },
        {
          subtitle: "Stellantis · 2024–2025",
          description:
            "KPI tracking dashboard for vehicle BOM (Bill of Materials) at Stellantis. Visualization and analysis of key performance indicators on vehicle nomenclature — variance tracking, alerts and reporting for engineering teams.",
        },
      ],
    },
    finance: {
      label: "Personal interest",
      title: "Finance & Geopolitics",
      p1: "Strong interest in geopolitics, finance and taxation. Regular reading of economic and international news, with a focus on financial markets and fiscal policies.",
      p2: "Understanding of macro-economic mechanisms, capital flows and fiscal issues — at both personal and international scale. Using DAX and Power BI for data analysis.",
      items: ["Financial markets", "Geopolitics", "Taxation", "Macroeconomics", "Capital flows"],
    },
    sport: {
      label: "Off keyboard",
      title: "Sport",
      labels: ["Street Workout", "Padel", "Climbing", "5-a-side", "Skiing"],
      subs: ["Strength & calisthenics", "Competitive", "Bouldering & lead", "Weekly", "Alpine"],
    },
  },
} as const;

// ─── Static data ─────────────────────────────────────
const TECH_GROUPS = [
  {
    accent: "#14b8a6",
    items: [
      { name: "C",           brand: "#00599C", icon: "C"   },
      { name: "Java",        brand: "#f89820", icon: "☕"  },
      { name: "C#",          brand: "#9B4F96", icon: "C#"  },
      { name: "JavaScript",  brand: "#F7DF1E", icon: "JS"  },
      { name: "DAX",         brand: "#F2C811", icon: "⊞"   },
    ],
  },
  {
    accent: "#818cf8",
    items: [
      { name: "Next.js", brand: "#e2e8f0", icon: "▲"  },
      { name: "React",   brand: "#61DAFB", icon: "⚛"  },
      { name: ".NET",    brand: "#512BD4", icon: ".N"  },
    ],
  },
  {
    accent: "#fb7185",
    items: [
      { name: "GitHub",    brand: "#e2e8f0", icon: "⬡"  },
      { name: "GitLab",    brand: "#FC6D26", icon: "◆"  },
      { name: "Docker",    brand: "#2496ED", icon: "🐳" },
      { name: "Ansible",   brand: "#EE0000", icon: "⚙"  },
      { name: "TeamCity",  brand: "#00B4E3", icon: "▶"  },
      { name: "Power BI",  brand: "#F2C811", icon: "📊" },
      { name: "Fabric",    brand: "#742774", icon: "◈"  },
    ],
  },
];

const PROJECTS = [
  { num: "01", title: "GYROMOTION", tags: ["C++", "ESP32", "BNO055", "PCB Design", "Hardware"], accent: "#14b8a6" },
  { num: "02", title: "KPI DASHBOARD", tags: ["Power BI", "DAX", "Fabric", "Data Analysis"], accent: "#818cf8" },
];

const SPORT_EMOJIS = ["💪", "🎾", "🧗", "⚽", "⛷️"];

// ─── Component ───────────────────────────────────────
export function CVPageClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeSection, setActiveSection] = useState(0);
  const [lang, setLang] = useState<Lang>("fr");
  const isScrolling = useRef(false);
  const t = T[lang];

  // Lock body scroll so only our container scrolls
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Wheel → section-by-section navigation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling.current) return;
      const dir = e.deltaY > 0 ? 1 : -1;
      setActiveSection((prev) => {
        const next = Math.max(0, Math.min(prev + dir, sectionRefs.current.length - 1));
        if (next !== prev) {
          isScrolling.current = true;
          sectionRefs.current[next]?.scrollIntoView({ behavior: "smooth" });
          setTimeout(() => { isScrolling.current = false; }, 900);
        }
        return next;
      });
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  // Touch swipe → section-by-section on mobile
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let startY = 0;

    const handleTouchStart = (e: TouchEvent) => { startY = e.touches[0].clientY; };
    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrolling.current) return;
      const diff = startY - e.changedTouches[0].clientY;
      if (Math.abs(diff) < 50) return;
      const dir = diff > 0 ? 1 : -1;
      setActiveSection((prev) => {
        const next = Math.max(0, Math.min(prev + dir, sectionRefs.current.length - 1));
        if (next !== prev) {
          isScrolling.current = true;
          sectionRefs.current[next]?.scrollIntoView({ behavior: "smooth" });
          setTimeout(() => { isScrolling.current = false; }, 900);
        }
        return next;
      });
    };

    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchend", handleTouchEnd);
    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  // IntersectionObserver → reveal animations + active section tracking
  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = parseInt(el.dataset.delay ?? "0");
            setTimeout(() => el.classList.add("animate-in"), delay);
          }
        });
      },
      { threshold: 0.1 }
    );

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActiveSection(idx);
          }
        });
      },
      { threshold: 0.5, root: containerRef.current }
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => revealObserver.observe(el));
    sectionRefs.current.forEach((el) => el && sectionObserver.observe(el));

    return () => { revealObserver.disconnect(); sectionObserver.disconnect(); };
  }, []);

  const setRef = (idx: number) => (el: HTMLElement | null) => { sectionRefs.current[idx] = el; };
  const goTo = (idx: number) => { sectionRefs.current[idx]?.scrollIntoView({ behavior: "smooth" }); setActiveSection(idx); };

  return (
    <div
      id="cv-scroll-container"
      ref={containerRef}
      className="h-screen overflow-y-scroll bg-[#050505] text-white"
      style={{ scrollbarWidth: "none" }}
    >
      {/* ── Language switcher ── */}
      <div className="no-print fixed top-4 right-4 z-50 flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-2 py-1 backdrop-blur-sm">
        <button
          onClick={() => setLang("fr")}
          title="Français"
          className={`text-base leading-none transition-opacity ${lang === "fr" ? "opacity-100" : "opacity-30 hover:opacity-60"}`}
        >
          🇫🇷
        </button>
        <span className="w-px h-3 bg-white/20" />
        <button
          onClick={() => setLang("en")}
          title="English"
          className={`text-base leading-none transition-opacity ${lang === "en" ? "opacity-100" : "opacity-30 hover:opacity-60"}`}
        >
          🇬🇧
        </button>
      </div>

      {/* ── Side nav dots ── */}
      <nav className="no-print fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3">
        {t.nav.map((name, i) => (
          <button key={i} onClick={() => goTo(i)} title={name} className="group flex items-center gap-2 justify-end">
            <span className={`text-xs font-mono transition-all duration-300 ${activeSection === i ? "opacity-100 text-teal-400" : "opacity-0 text-gray-500 group-hover:opacity-100"}`}>
              {name}
            </span>
            <span className={`block rounded-full transition-all duration-300 ${activeSection === i ? "w-3 h-3 bg-teal-400" : "w-1.5 h-1.5 bg-gray-600 group-hover:bg-gray-400"}`} />
          </button>
        ))}
      </nav>

      {/* ── Download button ── */}
      <button
        onClick={() => window.print()}
        className="no-print fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50 flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-black font-semibold text-sm px-4 py-2.5 rounded-full shadow-lg shadow-teal-500/25 transition-all hover:scale-105"
      >
        <Download className="w-4 h-4" />
        {t.download}
      </button>

      {/* ════════════════════════════════════════════
          00 — HERO
      ════════════════════════════════════════════ */}
      <section ref={setRef(0)} className="relative min-h-screen flex flex-col justify-between px-5 sm:px-16 py-10 sm:py-12 overflow-hidden">
        <span aria-hidden className="pointer-events-none absolute bottom-0 left-0 text-[30vw] font-black leading-none text-white/[0.03] select-none">XC</span>

        {/* Top line — logos */}
        <div data-reveal className="flex flex-wrap items-center justify-between gap-4">
          {/* ECE Paris */}
          <div className="flex items-center gap-3">
            <img src="/logos/ece.png" alt="ECE Paris" className="h-7 sm:h-8 w-auto" />
            <div>
              <p className="text-[10px] font-mono text-gray-600 tracking-widest uppercase">{t.hero.educationLabel}</p>
              <p className="text-xs text-gray-400 font-medium">{t.hero.educationSub}</p>
            </div>
          </div>
          {/* Stellantis */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-[10px] font-mono text-gray-600 tracking-widest uppercase">{t.hero.jobLabel}</p>
              <p className="text-xs text-gray-400 font-medium">{t.hero.jobSub}</p>
            </div>
            <img src="/logos/stellantis.png" alt="Stellantis" className="h-7 sm:h-8 w-auto" />
          </div>
        </div>

        {/* Name */}
        <div className="flex-1 flex flex-col justify-center">
          <p data-reveal data-delay="100" className="text-sm font-mono text-teal-400 tracking-[0.3em] uppercase mb-4">
            {t.hero.role}
          </p>
          <h1 data-reveal data-delay="200" className="text-[13vw] sm:text-[11vw] font-black leading-[0.9] tracking-tighter text-white">
            XU<br />
            <span className="text-transparent" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.3)" }}>CHEN</span>
          </h1>
          <p data-reveal data-delay="350" className="mt-8 text-gray-400 text-lg max-w-md leading-relaxed">
            {t.hero.tagline[0]}<br />{t.hero.tagline[1]}
          </p>

          {/* Contact links */}
          <div data-reveal data-delay="500" className="mt-8 flex flex-wrap gap-4 text-sm">
            {[
              { icon: Mail,     label: "xuchen2001@gmail.com", href: "mailto:xuchen2001@gmail.com" },
              { icon: Linkedin, label: "LinkedIn",              href: "https://linkedin.com"        },
              { icon: Github,   label: "GitHub",                href: "https://github.com/Xu-cn"   },
              { icon: MapPin,   label: "Paris",                 href: null                          },
            ].map(({ icon: Icon, label, href }) =>
              href ? (
                <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-teal-400 transition-colors">
                  <Icon className="w-4 h-4" />{label}
                </a>
              ) : (
                <span key={label} className="flex items-center gap-2 text-gray-600">
                  <Icon className="w-4 h-4" />{label}
                </span>
              )
            )}
          </div>
        </div>

        <div data-reveal data-delay="700" className="flex items-center gap-3 text-xs text-gray-700 font-mono animate-bounce">
          <ArrowDown className="w-4 h-4" /><span>scroll</span>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          01 — STACK
      ════════════════════════════════════════════ */}
      <section ref={setRef(1)} className="min-h-screen flex flex-col justify-center px-5 sm:px-16 py-16 sm:py-20 border-t border-white/5">
        <div data-reveal className="flex items-center gap-4 mb-16">
          <span className="text-5xl sm:text-7xl font-black text-white/[0.06] select-none leading-none">01</span>
          <div>
            <p className="text-xs font-mono text-teal-400 tracking-[0.25em] uppercase">{t.stack.label}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1">{t.stack.title}</h2>
          </div>
        </div>

        <div className="space-y-12">
          {TECH_GROUPS.map((group, gi) => (
            <div key={gi} data-reveal data-delay={String(gi * 120)}>
              <div className="flex items-center gap-4 mb-6">
                <p className="text-[10px] font-mono tracking-[0.3em] uppercase" style={{ color: group.accent }}>
                  {t.stack.groups[gi]}
                </p>
                <span className="flex-1 h-px bg-white/[0.05]" />
              </div>
              <div className="flex flex-wrap gap-4">
                {group.items.map((item) => (
                  <div key={item.name}
                    className="flex items-center gap-3 px-5 py-3.5 rounded-2xl border transition-all hover:scale-[1.03] hover:brightness-125 cursor-default"
                    style={{ borderColor: `${item.brand}30`, background: `${item.brand}0d` }}
                  >
                    <span className="text-lg leading-none" style={{ color: item.brand }}>{item.icon}</span>
                    <span className="text-sm font-semibold text-gray-100 tracking-wide">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div data-reveal data-delay="400" className="mt-12 max-w-2xl">
          <p className="text-gray-500 leading-relaxed">{t.stack.about}</p>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          02 — PROJETS
      ════════════════════════════════════════════ */}
      <section ref={setRef(2)} className="min-h-screen flex flex-col justify-center px-5 sm:px-16 py-16 sm:py-20 border-t border-white/5">
        <div data-reveal className="flex items-center gap-4 mb-16">
          <span className="text-5xl sm:text-7xl font-black text-white/[0.06] select-none leading-none">02</span>
          <div>
            <p className="text-xs font-mono text-indigo-400 tracking-[0.25em] uppercase">{t.projects.label}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1">{t.projects.title}</h2>
          </div>
        </div>

        <div className="space-y-8">
          {PROJECTS.map((p, i) => (
            <div key={p.num} data-reveal data-delay={String(i * 150)}
              className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.05] p-8 transition-colors overflow-hidden"
            >
              <span className="absolute left-0 top-0 w-1 h-full rounded-l-2xl" style={{ background: p.accent }} />
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <span className="text-5xl font-black leading-none flex-shrink-0 opacity-20" style={{ color: p.accent }}>{p.num}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-2xl font-bold text-white tracking-tight">{p.title}</h3>
                  <p className="text-xs font-mono text-gray-500 mt-1 mb-4 tracking-wider">{t.projects.items[i].subtitle}</p>
                  <p className="text-gray-400 leading-relaxed mb-5">{t.projects.items[i].description}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span key={tag} className="text-xs font-mono px-3 py-1 rounded-full border" style={{ borderColor: `${p.accent}40`, color: p.accent }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════
          03 — FINANCE
      ════════════════════════════════════════════ */}
      <section ref={setRef(3)} className="min-h-screen flex flex-col justify-center px-5 sm:px-16 py-16 sm:py-20 border-t border-white/5">
        <div data-reveal className="flex items-center gap-4 mb-16">
          <span className="text-5xl sm:text-7xl font-black text-white/[0.06] select-none leading-none">03</span>
          <div>
            <p className="text-xs font-mono text-green-400 tracking-[0.25em] uppercase">{t.finance.label}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1">{t.finance.title}</h2>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 max-w-3xl">
          <div data-reveal data-delay="100">
            <p className="text-gray-400 leading-relaxed text-lg">{t.finance.p1}</p>
            <p className="text-gray-500 leading-relaxed mt-4">{t.finance.p2}</p>
          </div>
          <div data-reveal data-delay="250" className="space-y-3">
            {t.finance.items.map((item, i) => (
              <div key={item} className="flex items-center gap-3 text-gray-300 py-3 border-b border-white/[0.05]">
                <span className="text-green-400 font-mono text-xs w-5 text-right opacity-50">{String(i + 1).padStart(2, "0")}</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          04 — SPORT
      ════════════════════════════════════════════ */}
      <section ref={setRef(4)} className="min-h-screen flex flex-col justify-center px-5 sm:px-16 py-16 sm:py-20 border-t border-white/5">
        <div data-reveal className="flex items-center gap-4 mb-16">
          <span className="text-5xl sm:text-7xl font-black text-white/[0.06] select-none leading-none">04</span>
          <div>
            <p className="text-xs font-mono text-rose-400 tracking-[0.25em] uppercase">{t.sport.label}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1">{t.sport.title}</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl">
          {SPORT_EMOJIS.map((emoji, i) => (
            <div key={i} data-reveal data-delay={String(i * 100)}
              className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 p-6 text-center transition-all hover:-translate-y-1"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{emoji}</div>
              <p className="font-bold text-sm text-white">{t.sport.labels[i]}</p>
              <p className="text-xs text-gray-600 mt-1">{t.sport.subs[i]}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div data-reveal data-delay="500" className="mt-20 pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-gray-700 text-sm font-mono">xuchen2001@gmail.com · Paris, France</p>
          <div className="flex gap-4">
            <a href="mailto:xuchen2001@gmail.com" className="text-gray-700 hover:text-teal-400 transition-colors"><Mail className="w-5 h-5" /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-teal-400 transition-colors"><Linkedin className="w-5 h-5" /></a>
            <a href="https://github.com/Xu-cn" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-teal-400 transition-colors"><Github className="w-5 h-5" /></a>
          </div>
        </div>
      </section>
    </div>
  );
}
