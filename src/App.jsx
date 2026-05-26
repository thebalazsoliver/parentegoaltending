import React, { useEffect, useState } from "react";

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
const instagramApiEndpoint = "/api/instagram/latest";
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
    title: "Small Group Sessions",
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

const fallbackInstagramPosts = [
  { id: "fallback-1", title: "Latest Training Reel", caption: "Connect Instagram API to show the newest reel automatically.", permalink: instagramUrl, media_url: "", media_type: "REEL" },
  { id: "fallback-2", title: "Latest On-Ice Clip", caption: "This card will update with the latest Instagram post once the backend endpoint is connected.", permalink: instagramUrl, media_url: "", media_type: "VIDEO" },
  { id: "fallback-3", title: "Latest Session Highlight", caption: "Show recent drills, goalie movement, and training updates directly from Instagram.", permalink: instagramUrl, media_url: "", media_type: "IMAGE" },
];

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

@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.marquee-inner{display:flex;white-space:nowrap;animation:marquee 22s linear infinite}

@media (min-width:769px){.show-mobile{display:none!important}}

@media (max-width:900px){
  .grid-2,.grid-hero,.grid-3,.grid-camp,.grid-contact{grid-template-columns:1fr!important;gap:32px!important}
  .sticky-col{position:static!important}
}

/* 769px–900px: hero 1 oszlopos, jobb oldal elrejtve, szöveg bal oldalt marad */
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

  /* Hero bal oldal: bal oldalt marad, szoros padding a nav alatt */
  .grid-hero>div:first-child{
    padding:88px 20px 32px!important;
    margin-left:0!important;
    width:100%!important;
    max-width:100%!important;
    box-sizing:border-box!important;
  }

  /* Hero jobb oldal (logó + Albert): elrejtés mobilon */
  .grid-hero>div:last-child{
    display:none!important;
  }

  section{padding-left:20px!important;padding-right:20px!important;overflow:hidden!important}
  nav{padding-left:18px!important;padding-right:18px!important}

  h1{
    font-size:clamp(34px,11vw,48px)!important;
    line-height:.95!important;
    letter-spacing:-.07em!important;
    max-width:100%!important;
    overflow-wrap:break-word!important;
    word-break:break-word!important;
  }

  h2{font-size:clamp(34px,10vw,48px)!important;line-height:1!important}
  h3{font-size:22px!important}
  p{font-size:16px!important;line-height:1.65!important}
  .cta-primary,.cta-outline{width:100%;justify-content:center;min-height:52px;padding:16px 20px!important}
  .prog-card{padding:28px 22px!important}
  .form-input{font-size:16px;min-height:54px;padding:16px 18px}

  /* Ticker gyorsabb mobilon */
  .marquee-inner{animation-duration:14s!important}

  /* Ticker szöveg kisebb mobilon */
  .marquee-inner>div{padding:14px 20px!important;font-size:11px!important}
}

@media (max-width:560px){
  .mobile-1{grid-template-columns:1fr!important}

  /* Stats sor a hero alján: 3 oszlop marad de kisebb */
  .hero-stats{
    gap:16px!important;
    margin-top:40px!important;
    padding-top:28px!important;
  }
}

@media (max-width:480px){
  section{padding-top:56px!important;padding-bottom:56px!important}
  h1{
    font-size:clamp(32px,10.5vw,44px)!important;
    line-height:0.95!important;
    letter-spacing:-0.075em!important;
  }
  h2{font-size:clamp(30px,11vw,42px)!important}
  .accent-bar{margin-bottom:14px}
  .prog-card{border-radius:8px}
}
`;

function ArrowSvg({ size = 16 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" /></svg>; }
function CheckSvg({ size = 14 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>; }
function IGSvg({ size = 18 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>; }
function scrollToSection(href) { const target = document.querySelector(href); if (target) target.scrollIntoView({ behavior: "smooth", block: "start" }); }
function handleInternalNav(event, href, afterClick) { event.preventDefault(); scrollToSection(href); if (typeof afterClick === "function") afterClick(); }
function LogoMark({ size = "100%", style = {} }) { return <img src="/parente.webp" alt="Parente Goaltending logo" style={{ width: size, height: size, objectFit: "contain", objectPosition: "center", display: "block", flexShrink: 0, ...style }} />; }

function Ticker() {
  const items = ["Skill", "Technique", "Confidence", "Compete", "Discipline", "Game Situations"];
  return <div style={{ overflow: "hidden", background: C.ink, color: "#fff", borderTop: `3px solid ${C.red}`, borderBottom: `3px solid ${C.red}` }}><div className="marquee-inner">{[...items, ...items, ...items, ...items].map((item, i) => <div key={`${item}-${i}`} className="ub" style={{ padding: "18px 40px", fontSize: 12, fontWeight: 900, letterSpacing: ".18em", textTransform: "uppercase", color: i % 2 ? C.gold : "#fff" }}>{item}</div>)}</div></div>;
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", onScroll); return () => window.removeEventListener("scroll", onScroll); }, []);
  return <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? "rgba(250,250,250,.96)" : "transparent", borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent", backdropFilter: scrolled ? "blur(12px)" : "none", transition: "background .3s, border-color .3s" }}>
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <a href="#hero" onClick={(e) => handleInternalNav(e, "#hero")} style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}><div style={{ width: 38, height: 38, borderRadius: 4, overflow: "hidden", background: C.soft, border: `1px solid ${C.border}` }}><LogoMark /></div><div><div className="ub" style={{ fontSize: 13, fontWeight: 900, letterSpacing: ".06em", color: C.ink, lineHeight: 1 }}>PARENTE</div><div style={{ fontSize: 9, letterSpacing: ".24em", color: C.red, fontWeight: 500, textTransform: "uppercase", lineHeight: 1.4 }}>GOALTENDING</div></div></a>
      <nav style={{ display: "flex", gap: 28 }} className="hide-mobile">{navLinks.map(([label, href]) => <a key={href} href={href} onClick={(e) => handleInternalNav(e, href)} className="nav-link">{label}</a>)}</nav>
      <a href="#contact" onClick={(e) => handleInternalNav(e, "#contact")} className="cta-primary hide-mobile" style={{ padding: "13px 24px", fontSize: 10 }}><span>Book Training</span><ArrowSvg size={13} /></a>
      <button onClick={() => setOpen(v => !v)} aria-label="menu" className="show-mobile" style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5, padding: 4 }}>{[0,1,2].map(i => <span key={i} style={{ display: "block", width: 24, height: 1.5, background: C.ink, borderRadius: 2, transition: "transform .3s, opacity .3s", transform: open ? (i === 0 ? "translateY(6.5px) rotate(45deg)" : i === 2 ? "translateY(-6.5px) rotate(-45deg)" : "") : "", opacity: open && i === 1 ? 0 : 1 }} />)}</button>
    </div>
    <AnimatePresence>{open && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: "hidden", background: C.white, borderTop: `1px solid ${C.border}` }}><div style={{ padding: "24px 32px", display: "flex", flexDirection: "column", gap: 20 }}>{navLinks.map(([label, href]) => <a key={href} href={href} onClick={(e) => handleInternalNav(e, href, () => setOpen(false))} className="ub" style={{ fontSize: 22, fontWeight: 700, color: C.ink, textDecoration: "none" }}>{label}</a>)}<a href="#contact" className="cta-primary" style={{ alignSelf: "flex-start", marginTop: 8 }} onClick={(e) => handleInternalNav(e, "#contact", () => setOpen(false))}><span>Book Training</span><ArrowSvg size={13} /></a></div></motion.div>}</AnimatePresence>
  </header>;
}

function Hero() {
  return <section className="section hero-section" id="home" style={{ minHeight: "100vh", background: C.soft, display: "flex", flexDirection: "column" }}><div className="grid-hero" style={{ flex: 1, maxWidth: 1280, margin: "0 auto", padding: "72px 32px 0", width: "100%", display: "grid", gridTemplateColumns: "1.05fr .95fr", alignItems: "start", gap: 64 }}>
    <motion.div initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .9, ease: [0.16,1,0.3,1] }} style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}><div style={{ width: 2, height: 32, background: C.red }} /><span style={{ fontSize: 11, fontWeight: 500, letterSpacing: ".22em", textTransform: "uppercase", color: C.mid }}>Master your goaltending skills</span></div>
      <h1 className="ub" style={{ fontSize: "clamp(40px,5.5vw,76px)", fontWeight: 900, lineHeight: 1, letterSpacing: "-.02em", color: C.ink }}>TRAIN WITH AN <br /><span style={{ color: C.red }}>EXPERT</span><br />GOALTENDING COACH</h1>
      <p style={{ marginTop: 32, maxWidth: 440, fontSize: 16, lineHeight: 1.8, color: C.mid, fontWeight: 300 }}>At Parente Goaltending, we develop elite goaltenders through personalized coaching built to improve technique, confidence, movement, and game performance.</p>
      <div style={{ marginTop: 44, display: "flex", gap: 14, flexWrap: "wrap" }}><a href="#contact" onClick={(e) => handleInternalNav(e, "#contact")} className="cta-primary"><span>Start Training</span><ArrowSvg size={14} /></a><a href="#programs" onClick={(e) => handleInternalNav(e, "#programs")} className="cta-outline">View Programs</a></div>
      <div className="hero-stats" style={{ marginTop: 64, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32, paddingTop: 40, borderTop: `1px solid ${C.border}`, maxWidth: 720 }}>{[["1:1","Personal sessions"],["100%","Goalie-specific"],["By Appt","Flexible schedule"]].map(([v,l]) => <div key={l}><div className="ub" style={{ fontSize: 28, fontWeight: 900, color: C.ink }}>{v}</div><div style={{ fontSize: 12, color: C.mid, marginTop: 4 }}>{l}</div></div>)}</div>
    </motion.div>
    <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .9, delay: .15, ease: [0.16,1,0.3,1] }} style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-start", padding: "132px 0 80px", background: "transparent" }}><div style={{ display: "flex", alignItems: "flex-start", gap: 42, flexWrap: "wrap", width: "100%" }}><LogoMark size="100%" style={{ width: "min(260px,42vw)", height: "auto", background: "transparent" }} /><div><div className="ub" style={{ fontSize: 13, letterSpacing: ".26em", color: C.mid, marginBottom: 18 }}>COACH</div><div className="ub" style={{ fontSize: "clamp(32px,4vw,58px)", lineHeight: 1, fontWeight: 900, color: C.ink }}>ALBERT PARENTE</div><div style={{ fontSize: 18, color: C.mid, marginTop: 22 }}>Available by appointment · {phoneDisplay}</div></div></div></motion.div>
  </div><Ticker /></section>;
}

function About() {
  return <section id="about" className="section" style={{ background: "#fff", padding: "120px 32px" }}><div style={{ maxWidth: 1280, margin: "0 auto" }}><div className="grid-2" style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 64, alignItems: "start", marginBottom: 80 }}><div><div className="accent-bar" /><div className="ub" style={{ fontSize: 10, letterSpacing: ".24em", textTransform: "uppercase", color: C.mid, fontWeight: 700 }}>About</div></div><h2 className="ub" style={{ fontSize: "clamp(28px,4vw,56px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-.02em", color: C.ink }}>Our mission is to develop elite goaltenders.<br /><span style={{ color: C.red }}>The work is personal.</span></h2></div><hr style={{ border: "none", borderTop: `1px solid ${C.border}`, marginBottom: 80 }} /><div className="grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 48 }}>{[["Mission", "At Parente Goaltending, we are dedicated to developing elite goaltenders through personalized coaching. Our mission is to enhance each player's skills and confidence on the ice."],["Approach", "Sessions are built around the individual goalie: their current level, movement habits, strengths, development needs, and competition goals."],["Results", "Goalies leave with clear technical corrections, stronger habits, and feedback they can apply immediately in practices and games."]].map(([title, body]) => <div key={title}><div className="ub" style={{ fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: C.red, marginBottom: 16 }}>{title}</div><p style={{ fontSize: 16, lineHeight: 1.85, color: C.mid, fontWeight: 300 }}>{body}</p></div>)}</div></div></section>;
}

function MeetAlbert() {
  const story = ["My name is Albert Parente, and goaltending has been a major part of my life for as long as I can remember.", "I grew up in Vaughan, Ontario, and had the opportunity to play Jr. A hockey before continuing my career at the college level in the ACHA. During my time with the North York Renegades, I was proud to be recognized as an All-Star South Goalie of the Year — an experience that helped shape the way I see the position, the game, and the work it takes to keep improving.", "After my playing career, I knew I wanted to stay involved in the game and give back to the next generation of goalies. That passion led me into goalie development and eventually to Parente Goaltending.", "My goal is to help goalies build more than just technical skills. I want every athlete I work with to develop confidence, compete level, discipline, and a deeper understanding of the position. My training is built around structure, detail, realistic game situations, and honest development.", "I believe every goalie has their own path. My job is to help them understand their game, trust their ability, and prepare for the next step in their hockey journey."];
  return <section id="meet-albert" className="section" style={{ background: C.soft, padding: "120px 32px" }}><div style={{ maxWidth: 1280, margin: "0 auto" }}><div className="grid-2" style={{ display: "grid", gridTemplateColumns: ".95fr 1.05fr", gap: 72, alignItems: "start" }}><div className="sticky-col" style={{ position: "sticky", top: 100 }}><div className="accent-bar" /><h2 className="ub" style={{ fontSize: "clamp(30px,4vw,56px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-.02em", color: C.ink }}>Meet<br /><span style={{ color: C.red }}>Albert</span></h2><p style={{ marginTop: 28, fontSize: 16, lineHeight: 1.85, color: C.mid, fontWeight: 300, maxWidth: 420 }}>Founder, owner, and lead coach of Parente Goaltending.</p><div style={{ marginTop: 38, background: "#fff", border: `1px solid ${C.border}`, padding: 28 }}><div style={{ width: 84, height: 84, marginBottom: 24 }}><LogoMark /></div><div className="ub" style={{ fontSize: 22, fontWeight: 900, color: C.ink }}>Albert Parente</div><p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.8, color: C.mid }}>Mississauga, Ontario goalie development coach with Jr. A hockey experience, college hockey experience in the ACHA, and a coaching philosophy built on structure, detail, realistic game situations, and honest development.</p></div></div><div style={{ background: "#fff", border: `1px solid ${C.border}`, padding: "48px 44px" }}><div className="ub" style={{ fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: C.red, marginBottom: 28 }}>My story</div><div style={{ display: "flex", flexDirection: "column", gap: 22 }}>{story.map(p => <p key={p} style={{ fontSize: 16, lineHeight: 1.85, color: C.mid, fontWeight: 300 }}>{p}</p>)}</div><div className="grid-3" style={{ marginTop: 44, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>{["All-Star South Goalie of the Year", "Jr. A / ACHA playing background", "Confidence, compete level, discipline"].map(label => <div key={label} style={{ border: `1px solid ${C.border}`, padding: 24, background: C.soft }}><div style={{ fontSize: 13, lineHeight: 1.45, color: C.ink, fontWeight: 700 }}>{label}</div></div>)}</div></div></div></div></section>;
}

function Programs() {
  return <section id="programs" className="section" style={{ background: C.soft, padding: "120px 32px" }}><div style={{ maxWidth: 1280, margin: "0 auto" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64, flexWrap: "wrap", gap: 24 }}><div><div className="accent-bar" /><h2 className="ub" style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 900, letterSpacing: "-.02em", color: C.ink }}>Programs</h2></div><p style={{ maxWidth: 390, fontSize: 15, lineHeight: 1.75, color: C.mid, fontWeight: 300 }}>Four development paths — each built to create measurable improvement on the ice.</p></div><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 2 }}>{programs.map((p, i) => <motion.div key={p.title} className="prog-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .5, delay: i * .07 }}><h3 className="ub" style={{ fontSize: 20, fontWeight: 900, color: C.ink, marginBottom: 16 }}>{p.title}</h3><p style={{ fontSize: 14, lineHeight: 1.8, color: C.mid, marginBottom: 28, fontWeight: 300 }}>{p.desc}</p><div style={{ display: "flex", flexDirection: "column", gap: 10 }}>{p.points.map(pt => <div key={pt} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: C.charcoal }}><CheckSvg /> {pt}</div>)}</div></motion.div>)}</div></div></section>;
}

function Camps() {
  return <section id="camps" className="section" style={{ background: "#fff", padding: "120px 32px" }}><div style={{ maxWidth: 1280, margin: "0 auto" }}><div style={{ marginBottom: 48 }}><div className="accent-bar" /><div className="ub" style={{ fontSize: 10, letterSpacing: ".24em", textTransform: "uppercase", color: C.mid, fontWeight: 700 }}>Camps</div><h2 className="ub" style={{ marginTop: 22, fontSize: "clamp(28px,4vw,52px)", fontWeight: 900, lineHeight: 1.05, color: C.ink }}>Weekend <span style={{ color: C.red }}>Summer Camp</span></h2></div><motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .5 }} style={{ border: `1px solid ${C.border}`, background: C.soft }}><div className="grid-camp" style={{ display: "grid", gridTemplateColumns: ".92fr 1.08fr", alignItems: "stretch" }}><div style={{ background: `linear-gradient(135deg,${C.ink},${C.redDark})`, color: "#fff", padding: 44, position: "relative", overflow: "hidden", minHeight: 430 }}><div style={{ position: "absolute", right: -80, top: -80, width: 260, height: 260, borderRadius: "50%", background: "rgba(200,146,42,.24)", filter: "blur(42px)" }} /><div style={{ position: "absolute", left: -90, bottom: -110, width: 280, height: 280, borderRadius: "50%", background: "rgba(176,42,46,.42)", filter: "blur(42px)" }} /><div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}><div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}><div style={{ width: 76, height: 76, background: "#fff" }}><LogoMark /></div><div className="ub" style={{ border: "1px solid rgba(255,255,255,.16)", padding: "10px 14px", fontSize: 10, letterSpacing: ".18em", color: C.gold, textTransform: "uppercase" }}>{camp.price}</div></div><div><div className="ub" style={{ fontSize: 11, letterSpacing: ".2em", color: C.gold, textTransform: "uppercase" }}>{camp.eyebrow}</div><h3 className="ub" style={{ marginTop: 14, fontSize: "clamp(38px,5vw,68px)", fontWeight: 900, lineHeight: .95 }}>{camp.title}</h3><div className="ub" style={{ marginTop: 26, fontSize: 22, color: C.gold, fontWeight: 900 }}>{camp.dates}</div><a href={camp.locationUrl} target="_blank" rel="noreferrer" style={{ marginTop: 10, color: "rgba(255,255,255,.78)", fontWeight: 500, textDecoration: "none", display: "inline-block", lineHeight: 1.5 }}>{camp.location}<br /><span style={{ color: "rgba(255,255,255,.55)", fontSize: 13 }}>{camp.address}</span></a></div></div></div><div style={{ padding: 40, background: "#fff", display: "flex", flexDirection: "column", justifyContent: "space-between" }}><div><p style={{ fontSize: 16, lineHeight: 1.8, color: C.mid, fontWeight: 300, maxWidth: 680 }}>A focused Parente Goaltending weekend camp built for goalies who want high-quality reps, detailed feedback, and a competitive training environment.</p><div className="mobile-1" style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}><div style={{ border: `1px solid ${C.border}`, padding: 18, background: C.soft }}><div className="ub" style={{ fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: C.red, marginBottom: 8 }}>Price</div><div style={{ fontSize: 20, fontWeight: 900, color: C.ink }}>{camp.price}</div></div><a href={camp.locationUrl} target="_blank" rel="noreferrer" style={{ border: `1px solid ${C.border}`, padding: 18, background: C.soft, textDecoration: "none" }}><div className="ub" style={{ fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: C.red, marginBottom: 8 }}>Location</div><div style={{ fontSize: 14, fontWeight: 900, color: C.ink, lineHeight: 1.4 }}>{camp.location}</div><div style={{ marginTop: 4, fontSize: 12, color: C.mid, lineHeight: 1.5 }}>{camp.address}</div></a></div><div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 2 }}>{[camp.capacity,camp.ratio,camp.ageLevel,camp.jersey].map(item => <div key={item} style={{ border: `1px solid ${C.border}`, padding: 18, background: C.soft, display: "flex", gap: 10, alignItems: "flex-start" }}><CheckSvg /><span style={{ fontSize: 13, lineHeight: 1.5, color: C.ink, fontWeight: 700 }}>{item}</span></div>)}</div><div style={{ marginTop: 32 }}><div className="ub" style={{ fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: C.red, marginBottom: 12 }}>Schedule</div><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: 2 }}>{camp.schedule.map(([day,date,sessions]) => <div key={day} style={{ border: `1px solid ${C.border}`, background: C.soft, padding: 20 }}><div className="ub" style={{ fontSize: 14, fontWeight: 900, color: C.ink }}>{day}</div><div style={{ color: C.red, fontSize: 12, fontWeight: 700, marginTop: 4 }}>{date}</div><div style={{ marginTop: 14 }}>{sessions.map(s => <div key={s} style={{ fontSize: 13, fontWeight: 600, color: C.charcoal, lineHeight: 1.65 }}>{s}</div>)}</div></div>)}</div></div><div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 10 }}>{camp.details.map(detail => <span key={detail} style={{ border: `1px solid ${C.border}`, background: "#fff", padding: "10px 12px", fontSize: 12, fontWeight: 700, color: C.charcoal }}>{detail}</span>)}</div></div><div style={{ marginTop: 34, display: "flex", gap: 12, flexWrap: "wrap" }}><a href={campPostUrl} target="_blank" rel="noreferrer" className="cta-primary"><span>View Camp Post</span><IGSvg size={14} /></a><a href="#contact" onClick={(e) => handleInternalNav(e, "#contact")} className="cta-outline">Request Info</a></div></div></div></motion.div></div></section>;
}

function Training() {
  return <section id="training" className="section" style={{ background: C.ink, padding: "120px 32px", color: "#fff" }}><div style={{ maxWidth: 1280, margin: "0 auto" }}><div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}><div><div style={{ display: "inline-block", width: 40, height: 2, background: C.red, marginBottom: 20 }} /><h2 className="ub" style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-.02em" }}>Details That<br /><span style={{ color: C.red }}>Transfer Into Games</span></h2><p style={{ marginTop: 28, fontSize: 16, lineHeight: 1.85, color: "rgba(255,255,255,.5)", fontWeight: 300, maxWidth: 480 }}>Training is built around goalie-specific habits that actually show up in games: movement, positioning, tracking, control, and confidence under pressure.</p><a href="#contact" onClick={(e) => handleInternalNav(e, "#contact")} className="cta-primary" style={{ marginTop: 40 }}><span>Start Training</span><ArrowSvg size={14} /></a></div><div style={{ padding: "42px 44px", borderLeft: `3px solid ${C.red}`, background: "rgba(176,42,46,.08)" }}><div className="ub" style={{ fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: C.red, marginBottom: 18 }}>Training system</div><h3 className="ub" style={{ fontSize: "clamp(24px,3vw,38px)", lineHeight: 1.08 }}>Technical reps with clear feedback</h3><p style={{ marginTop: 24, fontSize: 18, lineHeight: 1.7, color: "rgba(255,255,255,.82)", fontStyle: "italic", fontWeight: 300 }}>“The focus is not just doing more drills. The focus is understanding why each movement matters, correcting details in real time, and building habits that help goalies perform when the game speeds up.”</p><div style={{ marginTop: 22, fontSize: 12, letterSpacing: ".14em", color: C.gold, fontWeight: 500, textTransform: "uppercase" }}>Coach Albert Parente</div></div></div></div></section>;
}

function LatestInstagramPosts() {
  const [posts, setPosts] = useState(fallbackInstagramPosts);
  const [isLive, setIsLive] = useState(false);
  useEffect(() => { let mounted = true; async function loadPosts() { try { const response = await fetch(instagramApiEndpoint); if (!response.ok) throw new Error("Instagram endpoint unavailable"); const data = await response.json(); const latestPosts = Array.isArray(data) ? data : data.posts; if (mounted && Array.isArray(latestPosts) && latestPosts.length) { setPosts(latestPosts.slice(0, 3)); setIsLive(true); } } catch { if (mounted) { setPosts(fallbackInstagramPosts); setIsLive(false); } } } loadPosts(); return () => { mounted = false; }; }, []);
  return <section style={{ background: C.soft, padding: "100px 32px" }}><div style={{ maxWidth: 1280, margin: "0 auto" }}><div style={{ display: "flex", justifyContent: "space-between", gap: 32, alignItems: "flex-end", flexWrap: "wrap", marginBottom: 48 }}><div><div className="accent-bar" /><h2 className="ub" style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 900 }}>Instagram</h2></div><div style={{ maxWidth: 430 }}><div className="ub" style={{ fontSize: 14, color: C.ink, fontWeight: 900 }}>{instagramHandle}</div><p style={{ marginTop: 6, color: C.mid, lineHeight: 1.6, fontSize: 14 }}>{isLive ? "Live from Instagram." : "Preview cards shown until the Instagram backend endpoint is connected."}</p></div></div><div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 2 }}>{posts.map((post, index) => { const imageUrl = post.thumbnail_url || post.media_url; const title = post.title || "Instagram Post"; const caption = post.caption || "View the latest training update on Instagram."; const permalink = post.permalink || instagramUrl; return <a key={post.id || `${title}-${index}`} href={permalink} target="_blank" rel="noreferrer" style={{ minHeight: 360, border: `1px solid ${C.border}`, background: "#fff", padding: 28, textDecoration: "none", color: C.ink, display: "flex", flexDirection: "column", justifyContent: "space-between" }}><div style={{ height: 170, background: C.ink, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>{imageUrl ? <img src={imageUrl} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ width: 120, height: 120 }}><LogoMark /></div>}</div><div><div className="ub" style={{ fontSize: 11, color: C.red, letterSpacing: ".18em", textTransform: "uppercase", marginTop: 24 }}>{post.media_type || "Instagram"}</div><h3 className="ub" style={{ marginTop: 12, fontSize: 20, fontWeight: 900 }}>{title}</h3><p style={{ marginTop: 12, fontSize: 14, color: C.mid, lineHeight: 1.6 }}>{caption}</p></div></a>; })}</div><div style={{ marginTop: 42 }}><a href={instagramUrl} target="_blank" rel="noreferrer" className="cta-outline">Follow on Instagram <ArrowSvg size={13} /></a></div></div></section>;
}

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", goalieAge: "", trainingInterest: "Private Goalie Training", message: "" });
  const setField = (field, value) => setFormData(current => ({ ...current, [field]: value }));
  function handleSubmit(e) { e.preventDefault(); const subject = encodeURIComponent("Parente Goaltending Training Request"); const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nGoalie age: ${formData.goalieAge}\nTraining interest: ${formData.trainingInterest}\n\nMessage:\n${formData.message}`); window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`; }
  const labelStyle = { fontSize: 11, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: C.charcoal };
  return <section id="contact" className="section" style={{ background: "#fff", padding: "120px 32px" }}><div style={{ maxWidth: 1280, margin: "0 auto" }}><div className="grid-contact" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}><div><div className="accent-bar" /><h2 className="ub" style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-.02em", color: C.ink }}>Let's Build a<br /><span style={{ color: C.red }}>Better Goalie.</span></h2><p style={{ marginTop: 28, fontSize: 16, lineHeight: 1.85, color: C.mid, fontWeight: 300, maxWidth: 420 }}>Training is available by appointment. Send a message with the goalie's age, level, and goals — we'll be in touch.</p><div style={{ marginTop: 48, display: "flex", flexDirection: "column", borderTop: `1px solid ${C.border}` }}>{[["Phone", phoneDisplay, phoneHref],["Email", emailAddress, `mailto:${emailAddress}`],["Hours", "By appointment", null]].map(([label, val, href]) => <div key={label} style={{ display: "flex", alignItems: "center", gap: 24, padding: "24px 0", borderBottom: `1px solid ${C.border}` }}><div className="ub" style={{ width: 72, fontSize: 10, letterSpacing: ".18em", color: C.mid, fontWeight: 700, textTransform: "uppercase", flexShrink: 0 }}>{label}</div>{href ? <a href={href} style={{ fontSize: 15, fontWeight: 500, color: C.ink, textDecoration: "none" }}>{val}</a> : <span style={{ fontSize: 15, fontWeight: 500, color: C.ink }}>{val}</span>}</div>)}</div></div><form onSubmit={handleSubmit} style={{ background: C.soft, padding: "48px 44px", border: `1px solid ${C.border}` }}><div className="ub" style={{ fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: C.red, marginBottom: 28 }}>Send a Message</div><div className="mobile-1" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}><label style={{ display: "flex", flexDirection: "column", gap: 6 }}><span style={labelStyle}>Name<span className="required-star">*</span></span><input value={formData.name} onChange={e => setField("name", e.target.value)} required placeholder="Your name" className="form-input" /></label><label style={{ display: "flex", flexDirection: "column", gap: 6 }}><span style={labelStyle}>Email<span className="required-star">*</span></span><input type="email" value={formData.email} onChange={e => setField("email", e.target.value)} required placeholder="you@email.com" className="form-input" /></label><label style={{ display: "flex", flexDirection: "column", gap: 6 }}><span style={labelStyle}>Phone</span><input value={formData.phone} onChange={e => setField("phone", e.target.value)} placeholder="Phone number" className="form-input" /></label><label style={{ display: "flex", flexDirection: "column", gap: 6 }}><span style={labelStyle}>Goalie Age</span><input value={formData.goalieAge} onChange={e => setField("goalieAge", e.target.value)} placeholder="e.g. 14" className="form-input" /></label></div><label style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 14 }}><span style={labelStyle}>Training Interest<span className="required-star">*</span></span><select value={formData.trainingInterest} onChange={e => setField("trainingInterest", e.target.value)} className="form-input form-select" required>{["Private Goalie Training", "Small Group Sessions", "Team Goalie Development", "Video Review", "Goalie Camps"].map(o => <option key={o}>{o}</option>)}</select></label><label style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 14 }}><span style={labelStyle}>Message<span className="required-star">*</span></span><textarea value={formData.message} onChange={e => setField("message", e.target.value)} required placeholder="Goalie's age, team, level, training goals, preferred times..." className="form-input" style={{ minHeight: 120, resize: "vertical" }} /></label><button type="submit" className="cta-primary" style={{ width: "100%", justifyContent: "center", marginTop: 24, borderRadius: 2 }}><span>Send Message</span><ArrowSvg size={14} /></button><p style={{ marginTop: 14, fontSize: 11, color: C.muted, textAlign: "center" }}>The button opens a pre-filled email to Parente Goaltending.</p></form></div></div></section>;
}

function Footer() {
  return <footer style={{ background: C.ink, padding: "48px 32px", borderTop: `3px solid ${C.red}` }}><div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}><div style={{ display: "flex", alignItems: "center", gap: 12 }}><div style={{ width: 32, height: 32, background: C.white }}><LogoMark /></div><span className="ub" style={{ fontSize: 13, fontWeight: 900, color: "#fff", letterSpacing: ".06em" }}>{businessName.toUpperCase()}</span></div><div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>{navLinks.map(([label, href]) => <a key={href} href={href} onClick={(e) => handleInternalNav(e, href)} style={{ fontSize: 12, color: "rgba(255,255,255,.4)", textDecoration: "none" }}>{label}</a>)}</div><div style={{ fontSize: 12, color: "rgba(255,255,255,.3)" }}>© 2025 {businessName}</div></div></footer>;
}

export default function ParenteGoaltendingLandingPage() {
  return <><style dangerouslySetInnerHTML={{ __html: G }} /><Nav /><Hero /><About /><MeetAlbert /><Programs /><Camps /><Training /><LatestInstagramPosts /><Contact /><Footer /></>;
}
