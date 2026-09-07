import React, { Component, Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from "react";
import "./styles.css";

const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.jsx"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy.jsx"));

const C = {
  red: "#B02A2E",
  redDark: "#7A1C1F",
  gold: "#C8922A",
  black: "#0A0A0A",
  ink: "#111111",
  charcoal: "#1C1C1C",
  mid: "#777777",
  muted: "#AAAAAA",
  border: "#E2E2E2",
  soft: "#F5F4F2",
  white: "#FAFAFA",
};

const instagramUrl = "https://www.instagram.com/parentegoaltending?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";
const instagramDmUrl = "https://ig.me/m/parentegoaltending";
const campPostUrl = "https://www.instagram.com/p/DYqrdsTjWvZ/";
const emailAddress = "parentegoaltending@gmail.com";
const businessName = "Parente Goaltending";

const navLinks = [
  ["About", "#about"],
  ["Meet Albert", "#meet-albert"],
  ["Programs", "#programs"],
  ["Camps", "#camps"],
  ["Training", "#training"],
  ["Contact", "#contact"],
];

const programs = [
  {
    title: "Private Goalie Training",
    desc: "One-on-one coaching focused on the goalie's exact technical needs, age, level, and development goals.",
    points: ["Personalized feedback", "High-repetition technical work", "Clear development priorities"],
  },
  {
    title: "Semi-Private Training",
    desc: "Fast-paced goalie-specific training with competitive reps, pressure, and game-like habits.",
    points: ["Competitive environment", "Game-situation drills", "Efficient on-ice reps"],
  },
  {
    title: "Team Goalie Development",
    desc: "Structured goalie support for teams and organizations that want consistent development through the season.",
    points: ["Club support", "Season-long development", "Team-specific goalie plans"],
  },
  {
    title: "Video Review",
    desc: "Detailed analysis of game or practice footage with simple, actionable feedback goalies can apply immediately.",
    points: ["Game footage analysis", "Technical corrections", "Actionable next steps"],
  },
];

const camp = {
  title: "Weekend Summer Camp",
  eyebrow: "Parente Goaltending Camp",
  dates: "August 28 – August 30, 2026",
  location: "Emery Village Training Rinks",
  address: "5601 Steeles Ave W Unit 12, North York, ON M9L 1S7",
  locationUrl: "https://www.google.com/maps/search/?api=1&query=5601%20Steeles%20Ave%20W%20Unit%2012%2C%20North%20York%2C%20ON%20M9L%201S7",
  price: "$525 + HST",
  capacity: "Only 6 goalies maximum",
  ratio: "2:1 goalie-to-coach ratio",
  ageLevel: "Any age & level",
  jersey: "Every attendee gets a jersey",
  schedule: [
    ["Friday", "Aug 28", ["6:15 – 8:15 PM on ice"]],
    ["Saturday", "Aug 29", ["10:15 AM – 12:15 PM on ice", "1:30 – 2:30 PM dryland"]],
    ["Sunday", "Aug 30", ["10:15 AM – 12:15 PM on ice", "1:30 – 2:30 PM dryland"]],
  ],
  details: ["2 hours on ice per day", "1 hour dryland Saturday & Sunday", "Elite goalie development", "Skill, technique, and confidence"],
};


function ArrowSvg({ size = 16 }) {
  return <svg aria-hidden="true" focusable="false" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>;
}

function CheckSvg({ size = 14 }) {
  return <svg aria-hidden="true" focusable="false" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>;
}

function IGSvg({ size = 18 }) {
  return <svg aria-hidden="true" focusable="false" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>;
}

// Preserve scroll position on iOS as well as desktop. Shared by both overlays.
let scrollLockCount = 0;
let savedScrollState;
function usePageScrollLock(locked) {
  useLayoutEffect(() => {
    if (!locked) return undefined;
    if (scrollLockCount++ === 0) {
      const body = document.body;
      const keys = ["position", "top", "left", "right", "width", "overflow", "paddingRight"];
      savedScrollState = {
        y: window.scrollY,
        styles: Object.fromEntries(keys.map(key => [key, body.style[key]])),
      };
      const gutter = window.innerWidth - document.documentElement.clientWidth;
      const padding = parseFloat(getComputedStyle(body).paddingRight) || 0;
      Object.assign(body.style, {
        position: "fixed", top: `-${savedScrollState.y}px`, left: "0", right: "0",
        width: "100%", overflow: "hidden", paddingRight: `${padding + gutter}px`,
      });
    }
    return () => {
      if (--scrollLockCount === 0 && savedScrollState) {
        const { y, styles } = savedScrollState;
        Object.assign(document.body.style, styles);
        window.scrollTo({ top: y, behavior: "instant" });
        savedScrollState = undefined;
      }
    };
  }, [locked]);
}

function scrollToSection(href) {
  const target = document.getElementById(href.replace(/^#/, ""));
  if (!target) return;
  target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "start" });
}

function isPlainClick(event) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

function handleInternalNav(event, href, afterClick) {
  if (!isPlainClick(event)) return;
  event.preventDefault();
  window.history.replaceState({ page: "home" }, "", href);
  if (typeof afterClick === "function") afterClick();
  requestAnimationFrame(() => scrollToSection(href));
}

function LogoMark({ size = "100%", style = {}, hero = false, eager = false, sizes = "84px" }) {
  const widths = hero ? [64, 128, 320, 520, 780] : [64, 128, 256];
  return (
    <img
      src={`/images/optimized/parente-logo-${hero ? 520 : 128}-v2.webp`}
      srcSet={widths.map(width => `/images/optimized/parente-logo-${width}-v2.webp ${width}w`).join(", ")}
      sizes={sizes}
      alt="Parente Goaltending logo"
      width="900"
      height="900"
      loading={eager ? "eager" : "lazy"}
      fetchPriority={hero ? "high" : "auto"}
      decoding="async"
      style={{ width: size, height: size, objectFit: "contain", objectPosition: "center", display: "block", flexShrink: 0, ...style }}
    />
  );
}

function Ticker() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(() => !document.hidden);
  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", update);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  const items = ["Skill", "Technique", "Confidence", "Compete", "Discipline", "Game Situations"];
  const renderItems = (offset = 0) => items.map((item, i) => (
    <div key={`${item}-${offset}-${i}`} className="ub ticker-item" style={{ color: i % 2 ? C.gold : "#fff" }}>{item}</div>
  ));
  return (
    <div ref={ref} className="ticker" data-running={visible && pageVisible ? "true" : "false"}>
      <div className="marquee-track">
        <div className="marquee-inner">{renderItems(0)}</div>
        <div className="marquee-inner ticker-copy" aria-hidden="true">{renderItems(1)}</div>
      </div>
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 40);
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);
  const toggleRef = useRef(null);
  const panelRef = useRef(null);
  const pendingHref = useRef(null);
  usePageScrollLock(open);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        if (!scrollLockCount) setScrolled(window.scrollY > 40);
        frame = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", onScroll); };
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onChange = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!open) {
      if (pendingHref.current) {
        const href = pendingHref.current;
        pendingHref.current = null;
        const frame = requestAnimationFrame(() => scrollToSection(href));
        return () => cancelAnimationFrame(frame);
      }
      return undefined;
    }
    const regions = [...document.querySelectorAll("[data-overlay-background]")];
    const inertStates = regions.map(element => element.inert);
    regions.forEach(element => { element.inert = true; });
    panelRef.current?.querySelector("a")?.focus({ preventScroll: true });
    function onKey(event) {
      if (event.key === "Escape") { event.preventDefault(); setOpen(false); }
      if (event.key !== "Tab") return;
      const focusable = [...headerRef.current.querySelectorAll("a[href], button:not([disabled])")]
        .filter(element => element.getClientRects().length);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || !headerRef.current.contains(document.activeElement))) {
        event.preventDefault(); last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      regions.forEach((element, index) => { element.inert = inertStates[index]; });
      if (toggleRef.current?.getClientRects().length) toggleRef.current.focus({ preventScroll: true });
    };
  }, [open]);

  function navigate(event, href) {
    if (!isPlainClick(event)) return;
    if (!open) { handleInternalNav(event, href); return; }
    event.preventDefault();
    window.history.replaceState({ page: "home" }, "", href);
    pendingHref.current = href;
    setOpen(false);
  }

  return (
    <>
      {open && <div className="mobile-menu-backdrop" aria-hidden="true" onClick={() => setOpen(false)} />}
      <header ref={headerRef} className={`site-header${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
        <div className="nav-bar">
          <a href="#home" onClick={event => navigate(event, "#home")} className="nav-brand">
            <div className="nav-logo"><LogoMark eager sizes="38px" /></div>
            <div>
              <div className="ub" style={{ fontSize: 13, fontWeight: 900, letterSpacing: ".06em", color: C.ink, lineHeight: 1 }}>PARENTE</div>
              <div style={{ fontSize: 9, letterSpacing: ".24em", color: C.red, fontWeight: 500, textTransform: "uppercase", lineHeight: 1.4 }}>GOALTENDING</div>
            </div>
          </a>
          <nav className="desktop-navigation" aria-label="Main navigation">
            {navLinks.map(([label, href]) => <a key={href} href={href} onClick={event => navigate(event, href)} className="nav-link">{label}</a>)}
          </nav>
          <a href="#contact" onClick={event => navigate(event, "#contact")} className="cta-primary desktop-booking">
            <span>Book Training</span><ArrowSvg size={13} />
          </a>
          <button ref={toggleRef} type="button" onClick={() => setOpen(value => !value)}
            aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation"
            className="menu-toggle">
            {[0, 1, 2].map(i => <span key={i} aria-hidden="true" />)}
          </button>
        </div>
        <div ref={panelRef} id="mobile-navigation" className="mobile-navigation" hidden={!open}>
          <nav className="mobile-navigation-inner" aria-label="Mobile navigation">
            {navLinks.map(([label, href]) => <a key={href} href={href} onClick={event => navigate(event, href)} className="ub mobile-nav-link">{label}</a>)}
            <a href="#contact" className="cta-primary mobile-booking" onClick={event => navigate(event, "#contact")}>
              <span>Book Training</span><ArrowSvg size={13} />
            </a>
          </nav>
        </div>
      </header>
    </>
  );
}

function Hero() {
  return <section className="section hero-section" id="home">
    <div className="grid-hero">
      <div className="hero-content">
        <div className="hero-eyebrow">
          <div style={{ width: 2, height: 32, background: C.red }} />
          <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: ".22em", textTransform: "uppercase", color: C.mid }}>Master your goaltending skills</span>
        </div>

        <h1 className="ub hero-h1">
          TRAIN WITH AN <br /><span style={{ color: C.red }}>EXPERT</span><br /><span className="hero-last-line">GOALTENDING COACH</span>
        </h1>

        <p className="hero-copy">
          At Parente Goaltending, we develop elite goaltenders through personalized coaching built to improve technique, confidence, movement, and game performance.
        </p>

        <div className="hero-actions">
          <a href="#contact" onClick={(e) => handleInternalNav(e, "#contact")} className="cta-primary"><span>Start Training</span><ArrowSvg size={14} /></a>
          <a href="#programs" onClick={(e) => handleInternalNav(e, "#programs")} className="cta-outline">View Programs</a>
        </div>

        <div className="hero-stats">
          {[["1:1", "Personal sessions"], ["100%", "Goalie-specific"], ["By Appt.", "Flexible schedule"]].map(([v, l]) => (
            <div key={l} style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              <div className="ub hero-stat-val">{v}</div>
              <div className="hero-stat-label" style={{ fontSize: 12, color: C.mid, marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-visual">
        <div style={{ display: "flex", alignItems: "flex-start", gap: 42, flexWrap: "wrap", width: "100%" }}>
          <LogoMark hero eager sizes="(min-width: 1024px) 260px, 1px" size="100%" style={{ width: "min(260px,42vw)", height: "auto", background: "transparent" }} />
          <div>
            <div className="ub" style={{ fontSize: 13, letterSpacing: ".26em", color: C.mid, marginBottom: 18 }}>COACH</div>
            <div className="ub" style={{ fontSize: "clamp(32px,4vw,58px)", lineHeight: 1, fontWeight: 900, color: C.ink }}>ALBERT PARENTE</div>
            <div style={{ fontSize: 18, color: C.mid, marginTop: 22 }}>Available by appointment</div>
          </div>
        </div>
      </div>
    </div>
    <Ticker />
  </section>;
}

function About() {
  return <section id="about" className="section about-section">
    <div style={{ maxWidth: 1280, margin: "0 auto" }}>
      <div className="grid-2 about-heading">
        <div>
          <div className="accent-bar" />
          <div className="ub" style={{ fontSize: 10, letterSpacing: ".24em", textTransform: "uppercase", color: C.mid, fontWeight: 700 }}>About</div>
        </div>
        <h2 className="ub about-title">
          Our mission is to develop elite goaltenders.<br /><span style={{ color: C.red }}>The work is personal.</span>
        </h2>
      </div>

      <hr className="about-divider" />

      <div className="grid-3 about-grid">
        {[
          ["Mission", "At Parente Goaltending, we are dedicated to developing elite goaltenders through personalized coaching. Our mission is to enhance each player's skills and confidence on the ice."],
          ["Approach", "Sessions are built around the individual goalie: their current level, movement habits, strengths, development needs, and competition goals."],
          ["Results", "Goalies leave with clear technical corrections, stronger habits, and feedback they can apply immediately in practices and games."]
        ].map(([title, body]) => (
          <div key={title}>
            <div className="ub" style={{ fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: C.red, marginBottom: 16 }}>{title}</div>
            <p className="about-copy">{body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>;
}

function MeetAlbert() {
  const story = [
    "My name is Albert Parente, and goaltending has been a major part of my life for as long as I can remember.",
    "I grew up in Vaughan, Ontario, and had the opportunity to play Jr. A hockey before continuing my career at the college level in the ACHA. During my time with the North York Renegades, I was proud to be recognized as an All-Star South Goalie of the Year — an experience that helped shape the way I see the position, the game, and the work it takes to keep improving.",
    "After my playing career, I knew I wanted to stay involved in the game and give back to the next generation of goalies. That passion led me into goalie development and eventually to Parente Goaltending.",
    "My goal is to help goalies build more than just technical skills. I want every athlete I work with to develop confidence, compete level, discipline, and a deeper understanding of the position. My training is built around structure, detail, realistic game situations, and honest development.",
    "I believe every goalie has their own path. My job is to help them understand their game, trust their ability, and prepare for the next step in their hockey journey."
  ];

  return <section id="meet-albert" className="section coach-section">
    <div style={{ maxWidth: 1280, margin: "0 auto" }}>
      <div className="grid-2 meet-grid">
        <div className="sticky-col">
          <div className="accent-bar" />
          <h2 className="ub coach-title">
            Meet<br /><span style={{ color: C.red }}>Albert</span>
          </h2>
          <p className="coach-copy">
            Founder, owner, and lead coach of Parente Goaltending.
          </p>
          <div className="coach-summary">
            <div style={{ width: 84, height: 84, marginBottom: 24 }}><LogoMark /></div>
            <div className="ub" style={{ fontSize: 22, fontWeight: 900, color: C.ink }}>Albert Parente</div>
            <p className="coach-copy-2">
              Vaughan, Ontario goalie development coach with Jr. A hockey experience, college hockey experience in the ACHA, and a coaching philosophy built on structure, detail, realistic game situations, and honest development.
            </p>
          </div>
        </div>

        <div className="coach-story">
          <div className="ub" style={{ fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: C.red, marginBottom: 28 }}>My story</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            {story.map(p => <p className="coach-copy-3" key={p}>{p}</p>)}
          </div>
          <div className="grid-3 coach-highlights">
            {["All-Star South Goalie of the Year", "Jr. A / ACHA playing background", "Confidence, compete level, discipline"].map(label => (
              <div key={label} style={{ border: `1px solid ${C.border}`, padding: 24, background: C.soft }}>
                <div style={{ fontSize: 13, lineHeight: 1.45, color: C.ink, fontWeight: 700 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>;
}

function Programs() {
  return <section id="programs" className="section programs-section">
    <div style={{ maxWidth: 1280, margin: "0 auto" }}>
      <div className="programs-heading">
        <div>
          <div className="accent-bar" />
          <h2 className="ub programs-title">Programs</h2>
        </div>
        <p className="programs-copy">
          Four development paths — each built to create measurable improvement on the ice.
        </p>
      </div>

      <div className="programs-grid">
        {programs.map((p) => (
          <div key={p.title} className="prog-card">
            <h3 className="ub programs-subtitle">{p.title}</h3>
            <p className="programs-copy-2">{p.desc}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {p.points.map(pt => <div key={pt} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: C.charcoal }}><CheckSvg /> {pt}</div>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>;
}

function Camps() {
  return <section id="camps" className="section camps-section">
    <div style={{ maxWidth: 1280, margin: "0 auto" }}>
      <div style={{ marginBottom: 48 }}>
        <div className="accent-bar" />
        <div className="ub" style={{ fontSize: 10, letterSpacing: ".24em", textTransform: "uppercase", color: C.mid, fontWeight: 700 }}>Camps</div>
        <h2 className="ub camps-title">
          Weekend <span style={{ color: C.red }}>Summer Camp</span>
        </h2>
      </div>

      <div style={{ border: `1px solid ${C.border}`, background: C.soft }}>
        <div className="grid-camp camp-grid">
          <div className="camp-poster">
            <div className="camp-glow" aria-hidden="true" style={{ position: "absolute", right: -80, top: -80, width: 260, height: 260, borderRadius: "50%", background: "rgba(200,146,42,.24)", filter: "blur(42px)" }} />
            <div className="camp-glow" aria-hidden="true" style={{ position: "absolute", left: -90, bottom: -110, width: 280, height: 280, borderRadius: "50%", background: "rgba(176,42,46,.42)", filter: "blur(42px)" }} />
            <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div className="camp-poster-top">
                <div style={{ width: 76, height: 76, background: "#fff" }}><LogoMark sizes="76px" /></div>
                <div className="ub" style={{ border: "1px solid rgba(255,255,255,.16)", padding: "10px 14px", fontSize: 10, letterSpacing: ".18em", color: C.gold, textTransform: "uppercase" }}>{camp.price}</div>
              </div>

              <div>
                <div className="ub" style={{ fontSize: 11, letterSpacing: ".2em", color: C.gold, textTransform: "uppercase" }}>{camp.eyebrow}</div>
                <h3 className="ub camps-subtitle">{camp.title}</h3>
                <div className="ub" style={{ marginTop: 26, fontSize: 22, color: C.gold, fontWeight: 900 }}>{camp.dates}</div>
                <a href={camp.locationUrl} target="_blank" rel="noreferrer" style={{ marginTop: 10, color: "rgba(255,255,255,.78)", fontWeight: 500, textDecoration: "none", display: "inline-block", lineHeight: 1.5 }}>
                  {camp.location}<br /><span style={{ color: "rgba(255,255,255,.55)", fontSize: 13 }}>{camp.address}</span>
                </a>
              </div>
            </div>
          </div>

          <div className="camp-information">
            <div>
              <p className="camps-copy">
                A focused Parente Goaltending weekend camp built for goalies who want high-quality reps, detailed feedback, and a competitive training environment.
              </p>

              <div className="mobile-1 camp-meta">
                <div style={{ border: `1px solid ${C.border}`, padding: 18, background: C.soft }}>
                  <div className="ub" style={{ fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: C.red, marginBottom: 8 }}>Price</div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: C.ink }}>{camp.price}</div>
                </div>

                <a href={camp.locationUrl} target="_blank" rel="noreferrer" style={{ border: `1px solid ${C.border}`, padding: 18, background: C.soft, textDecoration: "none" }}>
                  <div className="ub" style={{ fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: C.red, marginBottom: 8 }}>Location</div>
                  <div style={{ fontSize: 14, fontWeight: 900, color: C.ink, lineHeight: 1.4 }}>{camp.location}</div>
                  <div style={{ marginTop: 4, fontSize: 12, color: C.mid, lineHeight: 1.5 }}>{camp.address}</div>
                </a>
              </div>

              <div className="camp-features">
                {[camp.capacity, camp.ratio, camp.ageLevel, camp.jersey].map(item => (
                  <div key={item} style={{ border: `1px solid ${C.border}`, padding: 18, background: C.soft, display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <CheckSvg />
                    <span style={{ fontSize: 13, lineHeight: 1.5, color: C.ink, fontWeight: 700 }}>{item}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 32 }}>
                <div className="ub" style={{ fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: C.red, marginBottom: 12 }}>Schedule</div>
                <div className="camp-schedule">
                  {camp.schedule.map(([day, date, sessions]) => (
                    <div key={day} style={{ border: `1px solid ${C.border}`, background: C.soft, padding: 20 }}>
                      <div className="ub" style={{ fontSize: 14, fontWeight: 900, color: C.ink }}>{day}</div>
                      <div style={{ color: C.red, fontSize: 12, fontWeight: 700, marginTop: 4 }}>{date}</div>
                      <div style={{ marginTop: 14 }}>
                        {sessions.map(s => <div key={s} style={{ fontSize: 13, fontWeight: 600, color: C.charcoal, lineHeight: 1.65 }}>{s}</div>)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 10 }}>
                {camp.details.map(detail => <span key={detail} style={{ border: `1px solid ${C.border}`, background: "#fff", padding: "10px 12px", fontSize: 12, fontWeight: 700, color: C.charcoal }}>{detail}</span>)}
              </div>
            </div>

            <div style={{ marginTop: 34, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href={campPostUrl} target="_blank" rel="noreferrer" className="cta-primary"><span>View Camp Post</span><IGSvg size={14} /></a>
              <a href="#contact" onClick={(e) => handleInternalNav(e, "#contact")} className="cta-outline">Request Info</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>;
}

function Training() {
  return <section id="training" className="section training-section">
    <div style={{ maxWidth: 1280, margin: "0 auto" }}>
      <div className="grid-2 training-grid">
        <div>
          <div style={{ display: "inline-block", width: 40, height: 2, background: C.red, marginBottom: 20 }} />
          <h2 className="ub training-title">
            Details That<br /><span style={{ color: C.red }}>Transfer Into Games</span>
          </h2>
          <p className="training-copy">
            Training is built around goalie-specific habits that actually show up in games: movement, positioning, tracking, control, and confidence under pressure.
          </p>
          <a href="#contact" onClick={(e) => handleInternalNav(e, "#contact")} className="cta-primary" style={{ marginTop: 40 }}>
            <span>Start Training</span><ArrowSvg size={14} />
          </a>
        </div>

        <div className="training-quote">
          <div className="ub" style={{ fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: C.red, marginBottom: 18 }}>Training system</div>
          <h3 className="ub training-subtitle">Technical reps with clear feedback</h3>
          <p className="training-copy-2">
            “The focus is not just doing more drills. The focus is understanding why each movement matters, correcting details in real time, and building habits that help goalies perform when the game speeds up.”
          </p>
          <div style={{ marginTop: 22, fontSize: 12, letterSpacing: ".14em", color: C.gold, fontWeight: 500, textTransform: "uppercase" }}>Coach Albert Parente</div>
        </div>
      </div>
    </div>
  </section>;
}

function LatestInstagramPosts() {
  return <section id="instagram" className="section instagram-section">
    <div style={{ maxWidth: 1280, margin: "0 auto", textAlign: "center" }}>
      <div className="accent-bar" />

      <div className="ub" style={{ fontSize: 10, letterSpacing: ".24em", textTransform: "uppercase", color: C.mid, fontWeight: 700 }}>
        Follow us
      </div>

      <h2 className="ub instagram-title">
        Follow us on <span style={{ color: C.red }}>Instagram</span>
      </h2>

      <p className="instagram-copy">
        Follow Parente Goaltending on Instagram for training clips, goalie development content,
        camp updates, and behind-the-scenes moments from the ice.
      </p>

      <div style={{ marginTop: 34 }}>
        <a href={instagramUrl} target="_blank" rel="noreferrer" className="cta-outline">
          <IGSvg size={16} /> Follow on Instagram <ArrowSvg size={13} />
        </a>
      </div>
    </div>
  </section>;
}

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    goalieAge: "",
    trainingInterest: "Private Goalie Training",
    message: "",
  });

  const setField = (field, value) => setFormData(current => ({ ...current, [field]: value }));

  function handleSubmit(e) {
    e.preventDefault();
    const subject = encodeURIComponent("Parente Goaltending Training Request");
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nGoalie age: ${formData.goalieAge}\nTraining interest: ${formData.trainingInterest}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
  }

  const labelStyle = { fontSize: 11, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: C.charcoal };

  return <section id="contact" className="section contact-section">
    <div style={{ maxWidth: 1280, margin: "0 auto" }}>
      <div className="grid-contact contact-grid">
        <div>
          <div className="accent-bar" />
          <h2 className="ub contact-title">
            Let's Build a<br /><span style={{ color: C.red }}>Better Goalie.</span>
          </h2>
          <p className="contact-copy">
            Training is available by appointment. Send a message with the goalie's age, level, and goals — we'll be in touch.
          </p>

          <div className="contact-actions">
            <a
              href={instagramDmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-primary"
              aria-label="Message Parente Goaltending on Instagram (opens in a new tab)"
            >
              <IGSvg size={16} /><span>Message on Instagram</span>
            </a>
            <a href={`mailto:${emailAddress}`} className="cta-outline">
              Email us
            </a>
          </div>

          <div style={{ marginTop: 48, display: "flex", flexDirection: "column", borderTop: `1px solid ${C.border}` }}>
            {[["Instagram", "@parentegoaltending", instagramUrl], ["Email", emailAddress, `mailto:${emailAddress}`], ["Hours", "By appointment", null]].map(([label, val, href]) => (
              <div key={label} className="contact-detail">
                <div className="ub" style={{ width: 72, fontSize: 10, letterSpacing: label === "Instagram" ? "0" : ".18em", color: C.mid, fontWeight: 700, textTransform: "uppercase", flexShrink: 0 }}>{label}</div>
                {href ? <a
                  href={href}
                  target={href === instagramUrl ? "_blank" : undefined}
                  rel={href === instagramUrl ? "noopener noreferrer" : undefined}
                  aria-label={href === instagramUrl ? "Open the Parente Goaltending Instagram profile (opens in a new tab)" : undefined}
                  style={{ fontSize: 15, fontWeight: 500, color: C.ink, textDecoration: "none" }}
                >{val}</a> : <span style={{ fontSize: 15, fontWeight: 500, color: C.ink }}>{val}</span>}
              </div>
            ))}
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="ub" style={{ fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: C.red, marginBottom: 28 }}>Send a Message</div>

          <div className="mobile-1 contact-fields">
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={labelStyle}>Name<span className="required-star">*</span></span>
              <input name="name" autoComplete="name" value={formData.name} onChange={e => setField("name", e.target.value)} required placeholder="Your name" className="form-input" />
            </label>

            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={labelStyle}>Email<span className="required-star">*</span></span>
              <input name="email" autoComplete="email" type="email" value={formData.email} onChange={e => setField("email", e.target.value)} required placeholder="you@email.com" className="form-input" />
            </label>

            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={labelStyle}>Phone</span>
              <input name="phone" type="tel" autoComplete="tel" value={formData.phone} onChange={e => setField("phone", e.target.value)} placeholder="Phone number" className="form-input" />
            </label>

            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={labelStyle}>Goalie Age</span>
              <input name="goalieAge" inputMode="numeric" value={formData.goalieAge} onChange={e => setField("goalieAge", e.target.value)} placeholder="e.g. 14" className="form-input" />
            </label>
          </div>

          <label style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 14 }}>
            <span style={labelStyle}>Training Interest<span className="required-star">*</span></span>
            <select name="trainingInterest" value={formData.trainingInterest} onChange={e => setField("trainingInterest", e.target.value)} className="form-input form-select" required>
              {["Private Goalie Training", "Semi-Private Training", "Team Goalie Development", "Video Review", "Goalie Camps"].map(o => <option key={o}>{o}</option>)}
            </select>
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 14 }}>
            <span style={labelStyle}>Message<span className="required-star">*</span></span>
            <textarea name="message" value={formData.message} onChange={e => setField("message", e.target.value)} required placeholder="Goalie's age, team, level, training goals, preferred times..." className="form-input" style={{ minHeight: 120, resize: "vertical" }} />
          </label>

          <button type="submit" className="cta-primary" style={{ width: "100%", justifyContent: "center", marginTop: 24, borderRadius: 2 }}>
            <span>Send Message</span><ArrowSvg size={14} />
          </button>

          <p className="contact-copy-2">
            The button opens a pre-filled email to Parente Goaltending.
          </p>
        </form>
      </div>
    </div>
  </section>;
}

function Footer({ setPage, openLegalPage, openCookieSettings }) {
  function goToHomeSection(href) {
    window.history.pushState({ page: "home" }, "", href);
    setPage("home");
    setTimeout(() => {
      scrollToSection(href);
    }, 50);
  }

  const footerButtonStyle = {
    background: "none",
    border: "none",
    fontSize: 12,
    color: "rgba(255,255,255,.4)",
    textDecoration: "none",
    cursor: "pointer",
    padding: 0,
    fontFamily: "DM Sans, sans-serif",
  };

  return <footer className="site-footer" data-overlay-background>
    <div className="footer-inner">
      <div className="footer-brand">
        <div style={{ width: 32, height: 32, background: C.white }}>
          <LogoMark sizes="32px" />
        </div>
        <span className="ub" style={{ fontSize: 13, fontWeight: 900, color: "#fff", letterSpacing: ".06em" }}>
          {businessName.toUpperCase()}
        </span>
      </div>

      <div className="footer-links">
        <button onClick={() => goToHomeSection("#home")} style={footerButtonStyle}>Home</button>

        {navLinks.map(([label, href]) => (
          <button key={href} onClick={() => goToHomeSection(href)} style={footerButtonStyle}>
            {label}
          </button>
        ))}

        <button onClick={() => openLegalPage("privacy")} style={footerButtonStyle}>
          Privacy Policy
        </button>

        <button onClick={() => openLegalPage("cookies")} style={footerButtonStyle}>
          Cookie Policy
        </button>

        <button onClick={openCookieSettings} style={footerButtonStyle}>
          Cookie Settings
        </button>
      </div>

      <div style={{ fontSize: 12, color: "rgba(255,255,255,.3)" }}>
        © 2025 {businessName}
      </div>
    </div>
  </footer>;
}

const consentStorageKey = "parenteCookieConsentV1";
function readStoredConsent() {
  try {
    const value = JSON.parse(window.localStorage.getItem(consentStorageKey));
    if (value?.necessary === true && typeof value.analytics === "boolean" && typeof value.marketing === "boolean") return value;
  } catch { /* Blocked storage or malformed data: keep optional features disabled. */ }
  return null;
}

function CookieConsentModal({ forceOpen, onClose }) {
  const [initialConsent] = useState(readStoredConsent);
  const [visible, setVisible] = useState(() => initialConsent === null);
  const [analytics, setAnalytics] = useState(initialConsent?.analytics ?? false);
  const [marketing, setMarketing] = useState(initialConsent?.marketing ?? false);
  const dialogRef = useRef(null);
  const titleRef = useRef(null);
  usePageScrollLock(visible);

  useEffect(() => {
    if (!forceOpen) return;
    const consent = readStoredConsent();
    setAnalytics(consent?.analytics ?? false);
    setMarketing(consent?.marketing ?? false);
    setVisible(true);
  }, [forceOpen]);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (visible && !dialog.open) {
      dialog.showModal();
      titleRef.current?.focus({ preventScroll: true });
    } else if (!visible && dialog.open) dialog.close();
    return () => { if (dialog.open) dialog.close(); };
  }, [visible]);

  function dismiss() {
    // Closing or pressing Escape never grants or saves consent.
    setVisible(false);
    onClose?.();
  }

  function saveConsent(settings) {
    const consent = {
      necessary: true,
      analytics: Boolean(settings.analytics),
      marketing: Boolean(settings.marketing),
      answeredAt: new Date().toISOString(),
    };
    try { window.localStorage.setItem(consentStorageKey, JSON.stringify(consent)); }
    catch { /* The choice still closes the dialog when storage is unavailable. */ }
    setAnalytics(consent.analytics);
    setMarketing(consent.marketing);
    dismiss();
  }

  return (
    <dialog ref={dialogRef} className="cookie-modal" aria-labelledby="cookie-title"
      aria-describedby="cookie-description" onCancel={event => { event.preventDefault(); dismiss(); }}>
      <button type="button" className="cookie-close" aria-label="Close cookie settings" onClick={dismiss}>{"\u00d7"}</button>
      <div className="accent-bar" />
      <h3 ref={titleRef} id="cookie-title" tabIndex={-1}>Cookie Settings</h3>
      <p id="cookie-description">
        We use necessary cookies to make this website work. With your permission, we
        may also use analytics and marketing cookies to improve the website and
        understand how visitors use it. Please choose your cookie preferences before
        using the site.
      </p>
      <div className="cookie-options">
        <label className="cookie-option">
          <input type="checkbox" checked disabled readOnly />
          <span><strong>Necessary cookies</strong><span>Required for basic website functions. These cannot be turned off.</span></span>
        </label>
        <label className="cookie-option">
          <input type="checkbox" checked={analytics} onChange={event => setAnalytics(event.target.checked)} />
          <span><strong>Analytics cookies</strong><span>Help us understand how visitors use the website so we can improve it.</span></span>
        </label>
        <label className="cookie-option">
          <input type="checkbox" checked={marketing} onChange={event => setMarketing(event.target.checked)} />
          <span><strong>Marketing cookies</strong><span>May be used for embedded content or marketing-related features.</span></span>
        </label>
      </div>
      <div className="cookie-buttons">
        <button type="button" className="cookie-accept" onClick={() => saveConsent({ analytics: true, marketing: true })}>Accept all cookies</button>
        <button type="button" className="cookie-essential" onClick={() => saveConsent({ analytics: false, marketing: false })}>Necessary only</button>
        <button type="button" className="cookie-save" onClick={() => saveConsent({ analytics, marketing })}>Save preferences</button>
      </div>
      <p className="cookie-note">You can change your choice later from the Cookie Settings link in the footer.</p>
    </dialog>
  );
}

class LegalPageErrorBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (this.state.failed) return (
      <div className="legal-load-status" role="alert">
        <p>This page could not be loaded. Please check your connection and try again.</p>
        <button className="cta-outline" type="button" onClick={() => window.location.reload()}>Reload page</button>
      </div>
    );
    return this.props.children;
  }
}

function LegalLoading() {
  return <div className="legal-load-status" role="status" aria-live="polite">Loading page...</div>;
}

function LegalPageShell({ title, setPage, children }) {
  function backToWebsite() {
    window.history.replaceState({ page: "home" }, "", window.location.pathname + window.location.search);
    setPage("home");
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  }

  return (
    <>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px 0" }}>
        <button
          type="button"
          onClick={backToWebsite}
          className="cta-outline"
          style={{
            background: "transparent",
            cursor: "pointer",
            marginTop: 24,
          }}
          aria-label={`Back to website from ${title}`}
        >
          ← Back to website
        </button>
      </div>
      {children}
    </>
  );
}

function pageFromLocation() {
  if (window.location.hash === "#privacy") return "privacy";
  if (window.location.hash === "#cookies") return "cookies";
  return "home";
}

export default function ParenteGoaltendingLandingPage() {
  const [page, setPage] = useState(pageFromLocation);
  const [cookieSettingsOpen, setCookieSettingsOpen] = useState(false);
  useEffect(() => {
    function onLocationChange() {
      const nextPage = pageFromLocation();
      setPage(nextPage);
      requestAnimationFrame(() => {
        if (nextPage === "home") scrollToSection(window.location.hash || "#home");
        else window.scrollTo({ top: 0, behavior: "instant" });
      });
    }
    window.addEventListener("popstate", onLocationChange);
    window.addEventListener("hashchange", onLocationChange);
    if (pageFromLocation() === "home" && window.location.hash) {
      requestAnimationFrame(() => scrollToSection(window.location.hash));
    }
    return () => {
      window.removeEventListener("popstate", onLocationChange);
      window.removeEventListener("hashchange", onLocationChange);
    };
  }, []);

  function openLegalPage(nextPage) {
    const nextHash = nextPage === "privacy" ? "#privacy" : "#cookies";
    window.history.pushState({ page: nextPage }, "", nextHash);
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  return (
    <>
      {page === "home" && (
        <>
          <a className="skip-link" href="#main-content">Skip to content</a>
          <Nav />
          <main id="main-content" tabIndex={-1} data-overlay-background>
            <Hero />
            <About />
            <MeetAlbert />
            <Programs />
            <Camps />
            <Training />
            <LatestInstagramPosts />
            <Contact />
          </main>
        </>
      )}
      {page === "privacy" && (
        <LegalPageShell title="Privacy Policy" setPage={setPage}>
          <LegalPageErrorBoundary key="privacy"><Suspense fallback={<LegalLoading />}><PrivacyPolicy /></Suspense></LegalPageErrorBoundary>
        </LegalPageShell>
      )}
      {page === "cookies" && (
        <LegalPageShell title="Cookie Policy" setPage={setPage}>
          <LegalPageErrorBoundary key="cookies"><Suspense fallback={<LegalLoading />}><CookiePolicy /></Suspense></LegalPageErrorBoundary>
        </LegalPageShell>
      )}
      <Footer setPage={setPage} openLegalPage={openLegalPage} openCookieSettings={() => setCookieSettingsOpen(true)} />
      <CookieConsentModal forceOpen={cookieSettingsOpen} onClose={() => setCookieSettingsOpen(false)} />
    </>
  );
}
