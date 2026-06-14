import React, { useEffect, useState } from "react";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";

const motion = {
  div: ({ initial, animate, exit, transition, whileInView, viewport, children, ...props }) => (
    <div {...props}>{children}</div>
  ),
};

function AnimatePresence({ children }) {
  return <>{children}</>;
}

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
const instagramHandle = "@parentegoaltending";
const campPostUrl = "https://www.instagram.com/p/DYqrdsTjWvZ/";
const phoneDisplay = "(647) 523-4438";
const phoneHref = "tel:+16475234438";
const emailAddress = "albert.parente@gmail.com";
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

const G = `
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;700;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,300&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'DM Sans',sans-serif;background:${C.white};color:${C.ink}}
.ub{font-family:'Unbounded',sans-serif}
.section{scroll-margin-top:92px}
.accent-bar{display:inline-block;width:40px;height:3px;background:${C.red};border-radius:2px;margin-bottom:20px}

.cta-primary{position:relative;overflow:hidden;background:${C.red};color:#fff;font-family:'Unbounded',sans-serif;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;border:none;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:10px;padding:18px 32px;border-radius:2px;transition:color .35s}
.cta-primary::before{content:'';position:absolute;inset:0;background:${C.black};transform:scaleX(0);transform-origin:left;transition:transform .35s cubic-bezier(.76,0,.24,1)}
.cta-primary:hover::before{transform:scaleX(1)}
.cta-primary span,.cta-primary svg{position:relative;z-index:1}

.cta-outline{display:inline-flex;align-items:center;gap:10px;font-family:'Unbounded',sans-serif;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;padding:17px 31px;border-radius:2px;border:1.5px solid ${C.black};color:${C.black};text-decoration:none;transition:background .25s,color .25s,border-color .25s}
.cta-outline:hover{background:${C.black};color:#fff;border-color:${C.black}}

.nav-link{font-size:13px;font-weight:500;color:${C.charcoal};text-decoration:none;position:relative;padding-bottom:2px}
.nav-link::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1.5px;background:${C.red};transition:width .25s ease}
.nav-link:hover::after{width:100%}
.nav-link:hover{color:${C.red}}

.prog-card{border:1px solid ${C.border};border-radius:2px;padding:36px 32px;background:#fff;transition:border-color .25s,transform .25s,box-shadow .25s}
.prog-card:hover{border-color:${C.red};transform:translateY(-4px);box-shadow:0 16px 48px rgba(176,42,46,.10)}

.form-input{width:100%;padding:18px 20px;min-height:58px;border:1px solid ${C.border};border-radius:2px;font-family:'DM Sans',sans-serif;font-size:18px;color:${C.ink};background:#fff;outline:none;transition:border-color .2s,box-shadow .2s}
.form-input:focus{border-color:${C.red};box-shadow:0 0 0 3px rgba(176,42,46,.08)}
.form-input::placeholder{color:${C.muted}}
.form-select{appearance:none;background-image:linear-gradient(45deg,transparent 50%,${C.ink} 50%),linear-gradient(135deg,${C.ink} 50%,transparent 50%);background-position:calc(100% - 24px) 50%,calc(100% - 16px) 50%;background-size:8px 8px,8px 8px;background-repeat:no-repeat;padding-right:52px}
.required-star{color:${C.red};margin-left:4px;font-weight:900}

.legal-page{
  max-width:900px;
  margin:0 auto;
  padding:120px 24px 70px;
  color:${C.ink};
  line-height:1.7;
  background:${C.white};
}

.legal-page h1{
  font-family:'Unbounded',sans-serif;
  font-size:clamp(34px,5vw,54px);
  font-weight:900;
  margin-bottom:24px;
  color:${C.ink};
}

.legal-page h2{
  font-family:'Unbounded',sans-serif;
  font-size:24px;
  margin-top:36px;
  margin-bottom:12px;
  color:${C.ink};
}

.legal-page h3{
  font-family:'Unbounded',sans-serif;
  font-size:18px;
  margin-top:24px;
  margin-bottom:10px;
  color:${C.ink};
}

.legal-page p,
.legal-page li{
  font-size:16px;
  color:${C.mid};
}

.legal-page ul{
  padding-left:24px;
  margin-top:12px;
}


.cookie-backdrop{
  position:fixed;
  inset:0;
  z-index:10000;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:22px;
  background:rgba(10,10,10,.72);
  backdrop-filter:blur(8px);
}

.cookie-modal{
  width:min(620px,100%);
  max-height:calc(100vh - 44px);
  overflow:auto;
  background:#fff;
  color:${C.ink};
  border-radius:22px;
  border:1px solid ${C.border};
  box-shadow:0 28px 90px rgba(0,0,0,.42);
  padding:30px;
}

.cookie-modal h3{
  font-family:'Unbounded',sans-serif;
  font-size:clamp(22px,4vw,30px);
  line-height:1.1;
  margin-bottom:14px;
  color:${C.ink};
}

.cookie-modal p{
  margin:0 0 16px;
  line-height:1.65;
  font-size:15px;
  color:${C.mid};
}

.cookie-options{
  display:grid;
  gap:12px;
  margin:20px 0 22px;
}

.cookie-option{
  display:flex;
  gap:12px;
  align-items:flex-start;
  padding:14px;
  border:1px solid ${C.border};
  border-radius:14px;
  background:${C.soft};
}

.cookie-option input{
  margin-top:4px;
  accent-color:${C.red};
}

.cookie-option strong{
  display:block;
  font-size:14px;
  margin-bottom:4px;
  color:${C.ink};
}

.cookie-option span{
  display:block;
  font-size:13px;
  line-height:1.45;
  color:${C.mid};
}

.cookie-buttons{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:10px;
}

.cookie-buttons button{
  border:none;
  border-radius:999px;
  padding:13px 16px;
  cursor:pointer;
  font-weight:800;
  font-family:'DM Sans',sans-serif;
}

.cookie-buttons .cookie-accept{
  grid-column:1 / -1;
  background:${C.red};
  color:#fff;
}

.cookie-buttons .cookie-save{
  background:${C.black};
  color:#fff;
}

.cookie-buttons .cookie-essential{
  background:${C.soft};
  color:${C.ink};
  border:1px solid ${C.border};
}

.cookie-note{
  margin-top:14px!important;
  font-size:12px!important;
  color:${C.muted}!important;
}

@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-100%)}}
.marquee-track{display:flex;width:max-content}
.marquee-inner{display:flex;white-space:nowrap;animation:marquee 18s linear infinite;will-change:transform}

.hero-last-line{white-space:normal}

@media (min-width:769px){.show-mobile{display:none!important}}

@media (max-width:900px){
  .grid-2,.grid-hero,.grid-3,.grid-camp,.grid-contact{grid-template-columns:1fr!important;gap:32px!important}
  .sticky-col{position:static!important}
}

@media (min-width:769px) and (max-width:900px){
  .grid-hero>div:last-child{
    display:none!important;
  }
}

@media (max-width:768px){
  html,body{overflow-x:hidden!important;max-width:100vw!important}
  .hide-mobile{display:none!important}
  .section{scroll-margin-top:76px}

  .hero-section{
    padding:0 0 48px!important;
    min-height:auto!important;
    overflow:hidden!important;
  }

  .grid-hero{
    grid-template-columns:1fr!important;
    min-height:auto!important;
    align-items:start!important;
    padding-top:0!important;
    margin-left:0!important;
    transform:none!important;
    gap:0!important;
    width:100%!important;
  }

  .grid-hero>div:first-child{
    padding:96px 20px 36px!important;
    margin-left:0!important;
    width:100%!important;
    max-width:100%!important;
    box-sizing:border-box!important;
  }

  .grid-hero>div:last-child{
    display:none!important;
  }

  section{padding-left:20px!important;padding-right:20px!important;overflow:hidden!important}
  nav{padding-left:18px!important;padding-right:18px!important}

  h1{
    font-size:clamp(31px,9.4vw,44px)!important;
    line-height:.96!important;
    letter-spacing:-.04em!important;
    max-width:100%!important;
    overflow-wrap:break-word!important;
    word-break:break-word!important;
  }
  .hero-last-line{white-space:normal!important}
  section{
  content-visibility:auto;
  contain-intrinsic-size:800px;
}

.hero-section,
nav,
header{
  content-visibility:visible;
  contain-intrinsic-size:auto;
}

@media (prefers-reduced-motion: reduce){
  *{
    animation:none!important;
    transition:none!important;
    scroll-behavior:auto!important;
  }
}

  h2{font-size:clamp(34px,10vw,48px)!important;line-height:1!important}
  h3{font-size:22px!important}
  p{font-size:17px!important;line-height:1.7!important}
  .cta-primary,.cta-outline{width:100%;justify-content:center;min-height:58px;padding:18px 22px!important}
  .prog-card{padding:28px 22px!important}
  .form-input{font-size:16px;min-height:54px;padding:16px 18px}

  .hero-stat-val{font-size:23px!important}
  .hero-stat-label{font-size:12px!important}

  .marquee-track .marquee-inner{animation-duration:14s!important}
  .marquee-inner>div{padding:14px 20px!important;font-size:11px!important}

  .legal-page{
    padding:100px 18px 50px;
  }

  .cookie-modal{
    padding:22px;
    border-radius:18px;
  }

  .cookie-buttons{
    grid-template-columns:1fr;
  }
}

@media (max-width:560px){
  .mobile-1{grid-template-columns:1fr!important}

  .hero-stats{
    gap:16px!important;
    margin-top:40px!important;
    padding-top:28px!important;
  }
}

@media (max-width:480px){
  section{padding-top:56px!important;padding-bottom:56px!important}
  h1{
    font-size:clamp(22px,6.5vw,30px)!important;
    line-height:1!important;
    letter-spacing:-0.04em!important;
  }
  h2{font-size:clamp(30px,11vw,42px)!important}
  .accent-bar{margin-bottom:14px}
  .prog-card{border-radius:8px}
}
`;

function ArrowSvg({ size = 16 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>;
}

function CheckSvg({ size = 14 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>;
}

function IGSvg({ size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>;
}

function scrollToSection(href) {
  const target = document.querySelector(href);
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function handleInternalNav(event, href, afterClick) {
  event.preventDefault();
  scrollToSection(href);
  if (typeof afterClick === "function") afterClick();
}

function LogoMark({ size = "100%", style = {} }) {
  return (
    <img
      src="/images/optimized/parente-optimized.webp"
      srcSet="/images/optimized/parente-mobile.webp 600w, /images/optimized/parente-optimized.webp 900w"
      sizes="(max-width: 768px) 600px, 900px"
      alt="Parente Goaltending logo"
      loading="eager"
      fetchPriority="high"
      style={{ width: size, height: size, objectFit: "contain", objectPosition: "center", display: "block", flexShrink: 0, ...style }}
    />
  );
}

function Ticker() {
  const items = ["Skill", "Technique", "Confidence", "Compete", "Discipline", "Game Situations"];
  const renderItems = (offset = 0) => items.map((item, i) => (
    <div key={`${item}-${offset}-${i}`} className="ub" style={{ padding: "18px 40px", fontSize: 12, fontWeight: 900, letterSpacing: ".18em", textTransform: "uppercase", color: i % 2 ? C.gold : "#fff", flexShrink: 0, whiteSpace: "nowrap" }}>{item}</div>
  ));

  return (
    <div style={{ overflow: "hidden", background: C.ink, color: "#fff", borderTop: `3px solid ${C.red}`, borderBottom: `3px solid ${C.red}` }}>
      <div className="marquee-track">
        <div className="marquee-inner">{renderItems(0)}</div>
        <div className="marquee-inner" aria-hidden="true">{renderItems(1)}</div>
      </div>
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? "rgba(250,250,250,.96)" : "transparent", borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent", backdropFilter: scrolled ? "blur(12px)" : "none", transition: "background .3s, border-color .3s" }}>
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <a href="#home" onClick={(e) => handleInternalNav(e, "#home")} style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
        <div style={{ width: 38, height: 38, borderRadius: 4, overflow: "hidden", background: C.soft, border: `1px solid ${C.border}` }}>
          <LogoMark />
        </div>
        <div>
          <div className="ub" style={{ fontSize: 13, fontWeight: 900, letterSpacing: ".06em", color: C.ink, lineHeight: 1 }}>PARENTE</div>
          <div style={{ fontSize: 9, letterSpacing: ".24em", color: C.red, fontWeight: 500, textTransform: "uppercase", lineHeight: 1.4 }}>GOALTENDING</div>
        </div>
      </a>

      <nav style={{ display: "flex", gap: 28 }} className="hide-mobile">
        {navLinks.map(([label, href]) => <a key={href} href={href} onClick={(e) => handleInternalNav(e, href)} className="nav-link">{label}</a>)}
      </nav>

      <a href="#contact" onClick={(e) => handleInternalNav(e, "#contact")} className="cta-primary hide-mobile" style={{ padding: "13px 24px", fontSize: 10 }}>
        <span>Book Training</span><ArrowSvg size={13} />
      </a>

      <button onClick={() => setOpen(v => !v)} aria-label="menu" className="show-mobile" style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5, padding: 4 }}>
        {[0, 1, 2].map(i => <span key={i} style={{ display: "block", width: 24, height: 1.5, background: C.ink, borderRadius: 2, transition: "transform .3s, opacity .3s", transform: open ? (i === 0 ? "translateY(6.5px) rotate(45deg)" : i === 2 ? "translateY(-6.5px) rotate(-45deg)" : "") : "", opacity: open && i === 1 ? 0 : 1 }} />)}
      </button>
    </div>

    <AnimatePresence>
      {open && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: "hidden", background: C.white, borderTop: `1px solid ${C.border}` }}>
        <div style={{ padding: "24px 32px", display: "flex", flexDirection: "column", gap: 20 }}>
          {navLinks.map(([label, href]) => <a key={href} href={href} onClick={(e) => handleInternalNav(e, href, () => setOpen(false))} className="ub" style={{ fontSize: 22, fontWeight: 700, color: C.ink, textDecoration: "none" }}>{label}</a>)}
          <a href="#contact" className="cta-primary" style={{ alignSelf: "flex-start", marginTop: 8 }} onClick={(e) => handleInternalNav(e, "#contact", () => setOpen(false))}>
            <span>Book Training</span><ArrowSvg size={13} />
          </a>
        </div>
      </motion.div>}
    </AnimatePresence>
  </header>;
}

function Hero() {
  return <section className="section hero-section" id="home" style={{ minHeight: "100vh", background: C.soft, display: "flex", flexDirection: "column" }}>
    <div className="grid-hero" style={{ flex: 1, maxWidth: 1280, margin: "0 auto", padding: "72px 32px 0", width: "100%", display: "grid", gridTemplateColumns: "1.05fr .95fr", alignItems: "start", gap: 64 }}>
      <motion.div initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .9, ease: [0.16, 1, 0.3, 1] }} style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
          <div style={{ width: 2, height: 32, background: C.red }} />
          <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: ".22em", textTransform: "uppercase", color: C.mid }}>Master your goaltending skills</span>
        </div>

        <h1 className="ub hero-h1" style={{ fontSize: "clamp(40px,5.5vw,76px)", fontWeight: 900, lineHeight: 1, letterSpacing: "-.02em", color: C.ink }}>
          TRAIN WITH AN <br /><span style={{ color: C.red }}>EXPERT</span><br /><span className="hero-last-line">GOALTENDING COACH</span>
        </h1>

        <p style={{ marginTop: 32, maxWidth: 440, fontSize: 16, lineHeight: 1.8, color: C.mid, fontWeight: 300 }}>
          At Parente Goaltending, we develop elite goaltenders through personalized coaching built to improve technique, confidence, movement, and game performance.
        </p>

        <div style={{ marginTop: 44, display: "flex", gap: 14, flexWrap: "wrap" }}>
          <a href="#contact" onClick={(e) => handleInternalNav(e, "#contact")} className="cta-primary"><span>Start Training</span><ArrowSvg size={14} /></a>
          <a href="#programs" onClick={(e) => handleInternalNav(e, "#programs")} className="cta-outline">View Programs</a>
        </div>

        <div className="hero-stats" style={{ marginTop: 64, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, paddingTop: 40, borderTop: `1px solid ${C.border}`, maxWidth: 720 }}>
          {[["1:1", "Personal sessions"], ["100%", "Goalie-specific"], ["By Appt.", "Flexible schedule"]].map(([v, l]) => (
            <div key={l} style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              <div className="ub hero-stat-val" style={{ fontSize: 28, fontWeight: 900, color: C.ink, lineHeight: 1 }}>{v}</div>
              <div className="hero-stat-label" style={{ fontSize: 12, color: C.mid, marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .9, delay: .15, ease: [0.16, 1, 0.3, 1] }} style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-start", padding: "132px 0 80px", background: "transparent" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 42, flexWrap: "wrap", width: "100%" }}>
          <LogoMark size="100%" style={{ width: "min(260px,42vw)", height: "auto", background: "transparent" }} />
          <div>
            <div className="ub" style={{ fontSize: 13, letterSpacing: ".26em", color: C.mid, marginBottom: 18 }}>COACH</div>
            <div className="ub" style={{ fontSize: "clamp(32px,4vw,58px)", lineHeight: 1, fontWeight: 900, color: C.ink }}>ALBERT PARENTE</div>
            <div style={{ fontSize: 18, color: C.mid, marginTop: 22 }}>Available by appointment · {phoneDisplay}</div>
          </div>
        </div>
      </motion.div>
    </div>
    <Ticker />
  </section>;
}

function About() {
  return <section id="about" className="section" style={{ background: "#fff", padding: "120px 32px" }}>
    <div style={{ maxWidth: 1280, margin: "0 auto" }}>
      <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 64, alignItems: "start", marginBottom: 80 }}>
        <div>
          <div className="accent-bar" />
          <div className="ub" style={{ fontSize: 10, letterSpacing: ".24em", textTransform: "uppercase", color: C.mid, fontWeight: 700 }}>About</div>
        </div>
        <h2 className="ub" style={{ fontSize: "clamp(28px,4vw,56px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-.02em", color: C.ink }}>
          Our mission is to develop elite goaltenders.<br /><span style={{ color: C.red }}>The work is personal.</span>
        </h2>
      </div>

      <hr style={{ border: "none", borderTop: `1px solid ${C.border}`, marginBottom: 80 }} />

      <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 48 }}>
        {[
          ["Mission", "At Parente Goaltending, we are dedicated to developing elite goaltenders through personalized coaching. Our mission is to enhance each player's skills and confidence on the ice."],
          ["Approach", "Sessions are built around the individual goalie: their current level, movement habits, strengths, development needs, and competition goals."],
          ["Results", "Goalies leave with clear technical corrections, stronger habits, and feedback they can apply immediately in practices and games."]
        ].map(([title, body]) => (
          <div key={title}>
            <div className="ub" style={{ fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: C.red, marginBottom: 16 }}>{title}</div>
            <p style={{ fontSize: 16, lineHeight: 1.85, color: C.mid, fontWeight: 300 }}>{body}</p>
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

  return <section id="meet-albert" className="section" style={{ background: C.soft, padding: "120px 32px" }}>
    <div style={{ maxWidth: 1280, margin: "0 auto" }}>
      <div className="grid-2" style={{ display: "grid", gridTemplateColumns: ".95fr 1.05fr", gap: 72, alignItems: "start" }}>
        <div className="sticky-col" style={{ position: "sticky", top: 100 }}>
          <div className="accent-bar" />
          <h2 className="ub" style={{ fontSize: "clamp(30px,4vw,56px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-.02em", color: C.ink }}>
            Meet<br /><span style={{ color: C.red }}>Albert</span>
          </h2>
          <p style={{ marginTop: 28, fontSize: 16, lineHeight: 1.85, color: C.mid, fontWeight: 300, maxWidth: 420 }}>
            Founder, owner, and lead coach of Parente Goaltending.
          </p>
          <div style={{ marginTop: 38, background: "#fff", border: `1px solid ${C.border}`, padding: 28 }}>
            <div style={{ width: 84, height: 84, marginBottom: 24 }}><LogoMark /></div>
            <div className="ub" style={{ fontSize: 22, fontWeight: 900, color: C.ink }}>Albert Parente</div>
            <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.8, color: C.mid }}>
              Vaughan, Ontario goalie development coach with Jr. A hockey experience, college hockey experience in the ACHA, and a coaching philosophy built on structure, detail, realistic game situations, and honest development.
            </p>
          </div>
        </div>

        <div style={{ background: "#fff", border: `1px solid ${C.border}`, padding: "48px 44px" }}>
          <div className="ub" style={{ fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: C.red, marginBottom: 28 }}>My story</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            {story.map(p => <p key={p} style={{ fontSize: 16, lineHeight: 1.85, color: C.mid, fontWeight: 300 }}>{p}</p>)}
          </div>
          <div className="grid-3" style={{ marginTop: 44, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
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
  return <section id="programs" className="section" style={{ background: C.soft, padding: "120px 32px" }}>
    <div style={{ maxWidth: 1280, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64, flexWrap: "wrap", gap: 24 }}>
        <div>
          <div className="accent-bar" />
          <h2 className="ub" style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 900, letterSpacing: "-.02em", color: C.ink }}>Programs</h2>
        </div>
        <p style={{ maxWidth: 390, fontSize: 15, lineHeight: 1.75, color: C.mid, fontWeight: 300 }}>
          Four development paths — each built to create measurable improvement on the ice.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 2 }}>
        {programs.map((p, i) => (
          <motion.div key={p.title} className="prog-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .5, delay: i * .07 }}>
            <h3 className="ub" style={{ fontSize: 20, fontWeight: 900, color: C.ink, marginBottom: 16 }}>{p.title}</h3>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: C.mid, marginBottom: 28, fontWeight: 300 }}>{p.desc}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {p.points.map(pt => <div key={pt} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: C.charcoal }}><CheckSvg /> {pt}</div>)}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>;
}

function Camps() {
  return <section id="camps" className="section" style={{ background: "#fff", padding: "120px 32px" }}>
    <div style={{ maxWidth: 1280, margin: "0 auto" }}>
      <div style={{ marginBottom: 48 }}>
        <div className="accent-bar" />
        <div className="ub" style={{ fontSize: 10, letterSpacing: ".24em", textTransform: "uppercase", color: C.mid, fontWeight: 700 }}>Camps</div>
        <h2 className="ub" style={{ marginTop: 22, fontSize: "clamp(28px,4vw,52px)", fontWeight: 900, lineHeight: 1.05, color: C.ink }}>
          Weekend <span style={{ color: C.red }}>Summer Camp</span>
        </h2>
      </div>

      <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .5 }} style={{ border: `1px solid ${C.border}`, background: C.soft }}>
        <div className="grid-camp" style={{ display: "grid", gridTemplateColumns: ".92fr 1.08fr", alignItems: "stretch" }}>
          <div style={{ background: `linear-gradient(135deg,${C.ink},${C.redDark})`, color: "#fff", padding: 44, position: "relative", overflow: "hidden", minHeight: 430 }}>
            <div style={{ position: "absolute", right: -80, top: -80, width: 260, height: 260, borderRadius: "50%", background: "rgba(200,146,42,.24)", filter: "blur(42px)" }} />
            <div style={{ position: "absolute", left: -90, bottom: -110, width: 280, height: 280, borderRadius: "50%", background: "rgba(176,42,46,.42)", filter: "blur(42px)" }} />
            <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
                <div style={{ width: 76, height: 76, background: "#fff" }}><LogoMark /></div>
                <div className="ub" style={{ border: "1px solid rgba(255,255,255,.16)", padding: "10px 14px", fontSize: 10, letterSpacing: ".18em", color: C.gold, textTransform: "uppercase" }}>{camp.price}</div>
              </div>

              <div>
                <div className="ub" style={{ fontSize: 11, letterSpacing: ".2em", color: C.gold, textTransform: "uppercase" }}>{camp.eyebrow}</div>
                <h3 className="ub" style={{ marginTop: 14, fontSize: "clamp(38px,5vw,68px)", fontWeight: 900, lineHeight: .95 }}>{camp.title}</h3>
                <div className="ub" style={{ marginTop: 26, fontSize: 22, color: C.gold, fontWeight: 900 }}>{camp.dates}</div>
                <a href={camp.locationUrl} target="_blank" rel="noreferrer" style={{ marginTop: 10, color: "rgba(255,255,255,.78)", fontWeight: 500, textDecoration: "none", display: "inline-block", lineHeight: 1.5 }}>
                  {camp.location}<br /><span style={{ color: "rgba(255,255,255,.55)", fontSize: 13 }}>{camp.address}</span>
                </a>
              </div>
            </div>
          </div>

          <div style={{ padding: 40, background: "#fff", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: C.mid, fontWeight: 300, maxWidth: 680 }}>
                A focused Parente Goaltending weekend camp built for goalies who want high-quality reps, detailed feedback, and a competitive training environment.
              </p>

              <div className="mobile-1" style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
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

              <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 2 }}>
                {[camp.capacity, camp.ratio, camp.ageLevel, camp.jersey].map(item => (
                  <div key={item} style={{ border: `1px solid ${C.border}`, padding: 18, background: C.soft, display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <CheckSvg />
                    <span style={{ fontSize: 13, lineHeight: 1.5, color: C.ink, fontWeight: 700 }}>{item}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 32 }}>
                <div className="ub" style={{ fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: C.red, marginBottom: 12 }}>Schedule</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: 2 }}>
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
      </motion.div>
    </div>
  </section>;
}

function Training() {
  return <section id="training" className="section" style={{ background: C.ink, padding: "120px 32px", color: "#fff" }}>
    <div style={{ maxWidth: 1280, margin: "0 auto" }}>
      <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        <div>
          <div style={{ display: "inline-block", width: 40, height: 2, background: C.red, marginBottom: 20 }} />
          <h2 className="ub" style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-.02em" }}>
            Details That<br /><span style={{ color: C.red }}>Transfer Into Games</span>
          </h2>
          <p style={{ marginTop: 28, fontSize: 16, lineHeight: 1.85, color: "rgba(255,255,255,.5)", fontWeight: 300, maxWidth: 480 }}>
            Training is built around goalie-specific habits that actually show up in games: movement, positioning, tracking, control, and confidence under pressure.
          </p>
          <a href="#contact" onClick={(e) => handleInternalNav(e, "#contact")} className="cta-primary" style={{ marginTop: 40 }}>
            <span>Start Training</span><ArrowSvg size={14} />
          </a>
        </div>

        <div style={{ padding: "42px 44px", borderLeft: `3px solid ${C.red}`, background: "rgba(176,42,46,.08)" }}>
          <div className="ub" style={{ fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: C.red, marginBottom: 18 }}>Training system</div>
          <h3 className="ub" style={{ fontSize: "clamp(24px,3vw,38px)", lineHeight: 1.08 }}>Technical reps with clear feedback</h3>
          <p style={{ marginTop: 24, fontSize: 18, lineHeight: 1.7, color: "rgba(255,255,255,.82)", fontStyle: "italic", fontWeight: 300 }}>
            “The focus is not just doing more drills. The focus is understanding why each movement matters, correcting details in real time, and building habits that help goalies perform when the game speeds up.”
          </p>
          <div style={{ marginTop: 22, fontSize: 12, letterSpacing: ".14em", color: C.gold, fontWeight: 500, textTransform: "uppercase" }}>Coach Albert Parente</div>
        </div>
      </div>
    </div>
  </section>;
}

function LatestInstagramPosts() {
  return <section id="instagram" className="section" style={{ background: C.soft, padding: "100px 32px" }}>
    <div style={{ maxWidth: 1280, margin: "0 auto", textAlign: "center" }}>
      <div className="accent-bar" />

      <div className="ub" style={{ fontSize: 10, letterSpacing: ".24em", textTransform: "uppercase", color: C.mid, fontWeight: 700 }}>
        Follow us
      </div>

      <h2 className="ub" style={{ marginTop: 22, fontSize: "clamp(28px,4vw,52px)", fontWeight: 900, color: C.ink }}>
        Follow us on <span style={{ color: C.red }}>Instagram</span>
      </h2>

      <p style={{ margin: "18px auto 0", maxWidth: 560, color: C.mid, lineHeight: 1.7, fontSize: 16, fontWeight: 300 }}>
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

  return <section id="contact" className="section" style={{ background: "#fff", padding: "120px 32px" }}>
    <div style={{ maxWidth: 1280, margin: "0 auto" }}>
      <div className="grid-contact" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
        <div>
          <div className="accent-bar" />
          <h2 className="ub" style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-.02em", color: C.ink }}>
            Let's Build a<br /><span style={{ color: C.red }}>Better Goalie.</span>
          </h2>
          <p style={{ marginTop: 28, fontSize: 16, lineHeight: 1.85, color: C.mid, fontWeight: 300, maxWidth: 420 }}>
            Training is available by appointment. Send a message with the goalie's age, level, and goals — we'll be in touch.
          </p>

          <div style={{ marginTop: 48, display: "flex", flexDirection: "column", borderTop: `1px solid ${C.border}` }}>
            {[["Phone", phoneDisplay, phoneHref], ["Email", emailAddress, `mailto:${emailAddress}`], ["Hours", "By appointment", null]].map(([label, val, href]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 24, padding: "24px 0", borderBottom: `1px solid ${C.border}` }}>
                <div className="ub" style={{ width: 72, fontSize: 10, letterSpacing: ".18em", color: C.mid, fontWeight: 700, textTransform: "uppercase", flexShrink: 0 }}>{label}</div>
                {href ? <a href={href} style={{ fontSize: 15, fontWeight: 500, color: C.ink, textDecoration: "none" }}>{val}</a> : <span style={{ fontSize: 15, fontWeight: 500, color: C.ink }}>{val}</span>}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ background: C.soft, padding: "48px 44px", border: `1px solid ${C.border}` }}>
          <div className="ub" style={{ fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: C.red, marginBottom: 28 }}>Send a Message</div>

          <div className="mobile-1" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={labelStyle}>Name<span className="required-star">*</span></span>
              <input value={formData.name} onChange={e => setField("name", e.target.value)} required placeholder="Your name" className="form-input" />
            </label>

            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={labelStyle}>Email<span className="required-star">*</span></span>
              <input type="email" value={formData.email} onChange={e => setField("email", e.target.value)} required placeholder="you@email.com" className="form-input" />
            </label>

            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={labelStyle}>Phone</span>
              <input value={formData.phone} onChange={e => setField("phone", e.target.value)} placeholder="Phone number" className="form-input" />
            </label>

            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={labelStyle}>Goalie Age</span>
              <input value={formData.goalieAge} onChange={e => setField("goalieAge", e.target.value)} placeholder="e.g. 14" className="form-input" />
            </label>
          </div>

          <label style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 14 }}>
            <span style={labelStyle}>Training Interest<span className="required-star">*</span></span>
            <select value={formData.trainingInterest} onChange={e => setField("trainingInterest", e.target.value)} className="form-input form-select" required>
              {["Private Goalie Training", "Semi-Private Training", "Team Goalie Development", "Video Review", "Goalie Camps"].map(o => <option key={o}>{o}</option>)}
            </select>
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 14 }}>
            <span style={labelStyle}>Message<span className="required-star">*</span></span>
            <textarea value={formData.message} onChange={e => setField("message", e.target.value)} required placeholder="Goalie's age, team, level, training goals, preferred times..." className="form-input" style={{ minHeight: 120, resize: "vertical" }} />
          </label>

          <button type="submit" className="cta-primary" style={{ width: "100%", justifyContent: "center", marginTop: 24, borderRadius: 2 }}>
            <span>Send Message</span><ArrowSvg size={14} />
          </button>

          <p style={{ marginTop: 14, fontSize: 11, color: C.muted, textAlign: "center" }}>
            The button opens a pre-filled email to Parente Goaltending.
          </p>
        </form>
      </div>
    </div>
  </section>;
}

function Footer({ setPage, openLegalPage, openCookieSettings }) {
  function goToHomeSection(href) {
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

  return <footer style={{ background: C.ink, padding: "48px 32px", borderTop: `3px solid ${C.red}` }}>
    <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 32, height: 32, background: C.white }}>
          <LogoMark />
        </div>
        <span className="ub" style={{ fontSize: 13, fontWeight: 900, color: "#fff", letterSpacing: ".06em" }}>
          {businessName.toUpperCase()}
        </span>
      </div>

      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
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

function CookieConsentModal({ forceOpen, onClose }) {
  const storageKey = "parenteCookieConsentV1";
  const [visible, setVisible] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (!saved) setVisible(true);
    } catch (error) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (forceOpen) setVisible(true);
  }, [forceOpen]);

  useEffect(() => {
    if (!visible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  function saveConsent(settings) {
    const consent = {
      necessary: true,
      analytics: Boolean(settings.analytics),
      marketing: Boolean(settings.marketing),
      answeredAt: new Date().toISOString(),
    };

    try {
      window.localStorage.setItem(storageKey, JSON.stringify(consent));
    } catch (error) {
      // If localStorage is blocked, still let the visitor continue after choosing.
    }

    setVisible(false);
    if (typeof onClose === "function") onClose();
  }

  if (!visible) return null;

  return (
    <div
      className="cookie-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-title"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="cookie-modal">
        <div className="accent-bar" />
        <h3 id="cookie-title">Cookie Settings</h3>
        <p>
          <h3 id="cookie-title">Cookie Settings</h3>
        <p>
          We use necessary cookies to make this website work. With your permission, we
          may also use analytics and marketing cookies to improve the website and
          understand how visitors use it. Please choose your cookie preferences before
          using the site.
        </p>
        </p>

        <div className="cookie-options">
          <label className="cookie-option">
            <input type="checkbox" checked disabled readOnly />
            <span>
              <strong>Necessary cookies</strong>
              <span>Required for basic website functions. These cannot be turned off.</span>
            </span>
          </label>

          <label className="cookie-option">
            <input
              type="checkbox"
              checked={analytics}
              onChange={(event) => setAnalytics(event.target.checked)}
            />
            <span>
              <strong>Analytics cookies</strong>
              <span>Help us understand how visitors use the website so we can improve it.</span>
            </span>
          </label>

          <label className="cookie-option">
            <input
              type="checkbox"
              checked={marketing}
              onChange={(event) => setMarketing(event.target.checked)}
            />
            <span>
              <strong>Marketing cookies</strong>
              <span>May be used for embedded content or marketing-related features.</span>
            </span>
          </label>
        </div>

        <div className="cookie-buttons">
          <button
            type="button"
            className="cookie-accept"
            onClick={() => saveConsent({ analytics: true, marketing: true })}
          >
            Accept all cookies
          </button>

          <button
            type="button"
            className="cookie-essential"
            onClick={() => saveConsent({ analytics: false, marketing: false })}
          >
            Necessary only
          </button>

          <button
            type="button"
            className="cookie-save"
            onClick={() => saveConsent({ analytics, marketing })}
          >
            Save preferences
          </button>
        </div>

        <p className="cookie-note">
          You can change your choice later from the Cookie Settings link in the footer.
        </p>
      </div>
    </div>
  );
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

export default function ParenteGoaltendingLandingPage() {
  const [page, setPage] = useState(() => {
    if (window.location.hash === "#privacy") return "privacy";
    if (window.location.hash === "#cookies") return "cookies";
    return "home";
  });
  const [cookieSettingsOpen, setCookieSettingsOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.hash === "#privacy") {
        setPage("privacy");
      } else if (window.location.hash === "#cookies") {
        setPage("cookies");
      } else {
        setPage("home");
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 50);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  function openLegalPage(nextPage) {
    const nextHash = nextPage === "privacy" ? "#privacy" : "#cookies";
    window.history.pushState({ page: nextPage }, "", nextHash);
    setPage(nextPage);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: G }} />

      {page === "home" && (
        <>
          <Nav />
          <Hero />
          <About />
          <MeetAlbert />
          <Programs />
          <Camps />
          <Training />
          <LatestInstagramPosts />
          <Contact />
        </>
      )}

      {page === "privacy" && (
        <LegalPageShell title="Privacy Policy" setPage={setPage}>
          <PrivacyPolicy />
        </LegalPageShell>
      )}

      {page === "cookies" && (
        <LegalPageShell title="Cookie Policy" setPage={setPage}>
          <CookiePolicy />
        </LegalPageShell>
      )}

      <Footer
        setPage={setPage}
        openLegalPage={openLegalPage}
        openCookieSettings={() => setCookieSettingsOpen(true)}
      />
      <CookieConsentModal
        forceOpen={cookieSettingsOpen}
        onClose={() => setCookieSettingsOpen(false)}
      />
    </>
  );
}