import { useState, useRef, useEffect, type CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Heart, Calendar, Play, Pause, Gift, Camera } from "lucide-react";
import heroWedding from "@/assets/hero-wedding.jpg";
import type { InvitationData } from "@/types/invitation";
import { formatViDate, getCountdownItems } from "@/types/invitation";

/* ═══════════════════════════════════════════════════════════
   RED TRADITIONAL WEDDING TEMPLATE
   Phong cách: Truyền thống Việt Nam, sang trọng
   Palette: Đỏ rượu/đỏ sẫm (Primary), Vàng gold (Accent), Be/Cream (Bg)
   ═══════════════════════════════════════════════════════════ */

const RED_DARK = "#7a0b14";
const RED_PRIMARY = "#9c0e1a";
const GOLD = "#d4af37";
const GOLD_MUTED = "rgba(212, 175, 55, 0.4)";
const CREAM = "#fcf9f2";
const CREAM_DK = "#f5ebd8";
const TEXT_DARK = "#3a1c1d";
const TEXT_RED = "#7a0b14";

const SERIF_FONT = "'Cormorant Garamond', 'Playfair Display', serif";
const BODY_FONT = "'Be Vietnam Pro', sans-serif";
const BOLD_SERIF = "'Playfair Display', serif";

// Inject fonts if needed
const fontLink = document.querySelector('link[data-red-trad]');
if (!fontLink) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.dataset.redTrad = "1";
  link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Playfair+Display:wght@400;600;700&display=swap";
  document.head.appendChild(link);
}

// ─── Double Happiness SVG ───
function DoubleHappiness({ className = "", style = {} }) {
  return (
    <svg className={className} style={{ ...style, fill: "currentColor" }} viewBox="0 0 100 100" aria-label="Song Hỷ">
      <path d="M15,20 h15 v-10 h8 v10 h24 v-10 h8 v10 h15 v8 h-15 v12 h15 v8 h-15 v12 h15 v8 h-15 v12 h-8 v-12 h-24 v12 h-8 v-12 h-15 v-8 h15 v-12 h-15 v-8 h15 v-12 h-15 z 
               M38,28 h-8 v12 h8 z M38,48 h-8 v12 h8 z M70,28 h-8 v12 h8 z M70,48 h-8 v12 h8 z" 
            fillRule="evenodd"/>
    </svg>
  );
}

// ─── Decorative Corner Flourish ───
function CornerFlourish({ className = "", position = "tl" }) {
  /* position: tl, tr, bl, br */
  let transform = "";
  if (position === "tr") transform = "scaleX(-1)";
  if (position === "bl") transform = "scaleY(-1)";
  if (position === "br") transform = "scale(-1, -1)";
  return (
    <svg className={`absolute pointer-events-none ${className}`} style={{ transform }} width="100" height="100" viewBox="0 0 100 100" fill="none">
      <path d="M0,0 C40,0 80,10 90,40 C95,55 90,80 100,100 C70,95 40,80 30,60 C20,40 10,20 0,0 Z" fill="url(#goldGrad)" opacity="0.15"/>
      <path d="M0,0 C30,15 50,40 60,70 C65,85 60,95 70,100 C50,85 30,60 20,40 C10,20 5,10 0,0 Z" fill="url(#goldGrad)" opacity="0.3"/>
      <defs>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor={GOLD} stopOpacity="1" />
          <stop offset="1" stopColor={GOLD} stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-12 opacity-80">
      <div className="h-px bg-gradient-to-r from-transparent to-[#d4af37] w-16" />
      <DoubleHappiness className="w-5 h-5 text-[#d4af37]" />
      <div className="h-px bg-gradient-to-l from-transparent to-[#d4af37] w-16" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* PREVIEW CARD (Builder Panel — interactive)                  */
/* ─────────────────────────────────────────────────────────── */
export function PreviewCard({ data }: { data: InvitationData }) {
  const [isOpen, setIsOpen] = useState(false);
  const br = data.theme.borderRadius;
  const dateStr = formatViDate(data.event.date);
  const countdown = getCountdownItems(data.event.date);

  return (
    <div className="max-w-md mx-auto overflow-hidden relative" style={{ borderRadius: `${br}px`, background: CREAM, color: TEXT_DARK, border: `2px solid ${RED_DARK}` }}>
      {/* Background texture simulation */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%237a0b14' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")` }} />

      {/* ── Toggle bar: switch between Closed / Open ── */}
      <div className="relative z-20 flex items-center justify-center gap-1 p-2" style={{ background: RED_DARK }}>
        <button
          onClick={() => setIsOpen(false)}
          className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
          style={{
            fontFamily: BODY_FONT,
            background: !isOpen ? GOLD : "transparent",
            color: !isOpen ? RED_DARK : GOLD,
            border: `1px solid ${!isOpen ? GOLD : GOLD_MUTED}`,
            fontSize: "0.6rem",
            letterSpacing: "0.05em",
          }}
        >
          Vỏ thiệp
        </button>
        <button
          onClick={() => setIsOpen(true)}
          className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
          style={{
            fontFamily: BODY_FONT,
            background: isOpen ? GOLD : "transparent",
            color: isOpen ? RED_DARK : GOLD,
            border: `1px solid ${isOpen ? GOLD : GOLD_MUTED}`,
            fontSize: "0.6rem",
            letterSpacing: "0.05em",
          }}
        >
          Thiệp mở
        </button>
      </div>

      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* ═══ CLOSED: Envelope Cover ═══ */
          <motion.div
            key="closed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35 }}
          >
            {/* Red Header Bar */}
            <div className="w-full h-24 flex items-center justify-center relative shadow-lg" style={{ background: RED_DARK }}>
              <DoubleHappiness className="h-16 w-16 text-[#fdfaf4]" />
            </div>

            <div className="px-6 py-8 text-center relative z-10 cursor-pointer" onClick={() => setIsOpen(true)}>
              <p style={{ fontFamily: SERIF_FONT, fontSize: "0.8rem", color: RED_PRIMARY, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                Lễ Thành Hôn
              </p>
              
              <h1 className="mt-4" style={{ fontFamily: BOLD_SERIF, fontSize: "2rem", color: RED_DARK, lineHeight: 1.1 }}>
                {data.couple.brideName || "Cô dâu"}
              </h1>
              <p style={{ fontFamily: SERIF_FONT, fontSize: "1.2rem", color: GOLD, margin: "4px 0" }}>&amp;</p>
              <h1 style={{ fontFamily: BOLD_SERIF, fontSize: "2rem", color: RED_DARK, lineHeight: 1.1 }}>
                {data.couple.groomName || "Chú rể"}
              </h1>

              <SectionDivider />

              <p style={{ fontFamily: BODY_FONT, fontSize: "0.75rem", color: TEXT_RED, fontWeight: 500 }}>
                {dateStr}
              </p>
              <p className="mt-2" style={{ fontFamily: BODY_FONT, fontSize: "0.65rem", color: "#666" }}>
                {data.event.time} · {data.event.venue}
              </p>

              {/* Small photo preview */}
              <div className="mt-6 mx-auto w-40 h-40 overflow-hidden border-[3px]" style={{ borderColor: GOLD, borderRadius: `${br}px`, padding: 4, background: "white" }}>
                <img src={heroWedding} alt="Couple" className="w-full h-full object-cover" style={{ borderRadius: `${br - 4}px` }} />
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); setIsOpen(true); }}
                className="mt-8 px-8 py-2.5 text-white shadow-md transition-transform hover:scale-105 active:scale-95"
                style={{ background: RED_DARK, borderRadius: 30, fontFamily: SERIF_FONT, fontSize: "0.9rem", letterSpacing: "0.05em", cursor: "pointer" }}
              >
                Mở thiệp
              </button>
            </div>
          </motion.div>
        ) : (
          /* ═══ OPEN: Full invitation content preview ═══ */
          <motion.div
            key="open"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Hero Banner */}
            <div className="w-full py-6 px-4 text-center relative" style={{ background: RED_DARK }}>
              <DoubleHappiness className="h-10 w-10 text-[#fdfaf4] mx-auto mb-3" />
              <h2 style={{ fontFamily: BOLD_SERIF, fontSize: "1.4rem", color: CREAM, lineHeight: 1.15 }}>{data.couple.brideName}</h2>
              <p style={{ fontFamily: SERIF_FONT, fontSize: "1rem", color: GOLD, margin: "2px 0" }}>&amp;</p>
              <h2 style={{ fontFamily: BOLD_SERIF, fontSize: "1.4rem", color: CREAM, lineHeight: 1.15 }}>{data.couple.groomName}</h2>
              <p className="mt-2" style={{ fontFamily: BODY_FONT, fontSize: "0.65rem", color: CREAM, opacity: 0.7 }}>{dateStr}</p>
            </div>

            {/* Family Section mini */}
            <div className="px-5 py-6 text-center" style={{ background: CREAM }}>
              <SectionDivider />
              <h3 className="mb-4 uppercase tracking-[0.1em]" style={{ fontFamily: SERIF_FONT, fontSize: "0.9rem", color: RED_DARK, fontWeight: 600 }}>Thông Tin Gia Đình</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-right pr-3 border-r" style={{ borderColor: GOLD_MUTED }}>
                  <p style={{ fontFamily: BODY_FONT, fontSize: "0.5rem", color: TEXT_RED, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>Nhà Gái</p>
                  <p className="mt-1" style={{ fontFamily: BOLD_SERIF, fontSize: "0.9rem", color: RED_DARK }}>{data.couple.brideName}</p>
                </div>
                <div className="text-left pl-3">
                  <p style={{ fontFamily: BODY_FONT, fontSize: "0.5rem", color: TEXT_RED, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>Nhà Trai</p>
                  <p className="mt-1" style={{ fontFamily: BOLD_SERIF, fontSize: "0.9rem", color: RED_DARK }}>{data.couple.groomName}</p>
                </div>
              </div>
            </div>

            {/* Event mini */}
            <div className="px-5 py-5 text-center" style={{ background: CREAM_DK }}>
              <h3 className="mb-3 uppercase tracking-[0.1em]" style={{ fontFamily: SERIF_FONT, fontSize: "0.9rem", color: RED_DARK, fontWeight: 600 }}>Sự Kiện</h3>
              <p style={{ fontFamily: BOLD_SERIF, fontSize: "1.4rem", color: RED_DARK }}>{data.event.time}</p>
              <p className="mt-1" style={{ fontFamily: BODY_FONT, fontSize: "0.65rem", color: TEXT_DARK, opacity: 0.8 }}>{data.event.venue}</p>
              <p style={{ fontFamily: BODY_FONT, fontSize: "0.6rem", color: TEXT_DARK, opacity: 0.6 }}>{data.event.address}</p>

              {/* Countdown mini */}
              <div className="grid grid-cols-4 gap-2 mt-4">
                {countdown.map(d => (
                  <div key={d.l} className="py-2 text-center" style={{ background: "rgba(122,11,20,0.06)", borderRadius: `${Math.max(4,br-4)}px` }}>
                    <p style={{ fontFamily: BOLD_SERIF, fontSize: "1rem", color: RED_DARK }}>{d.n}</p>
                    <p style={{ fontFamily: BODY_FONT, fontSize: "0.4rem", textTransform: "uppercase", color: GOLD, fontWeight: 600 }}>{d.l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RSVP + Wishes placeholder */}
            {(data.rsvp.enabled || data.wishes.enabled) && (
              <div className="px-5 py-5" style={{ background: RED_DARK }}>
                {data.rsvp.enabled && (
                  <div className="bg-white p-4 mb-3" style={{ borderRadius: `${br}px` }}>
                    <p className="text-center mb-2" style={{ fontFamily: BOLD_SERIF, fontSize: "0.85rem", color: RED_DARK }}>Xin Lưu Bút</p>
                    <div className="h-6 rounded mb-2" style={{ background: "#fdfaf4", border: `1px solid ${GOLD_MUTED}` }}/>
                    <div className="h-6 rounded" style={{ background: RED_DARK }}/>
                  </div>
                )}
                {data.wishes.enabled && (
                  <div className="p-4 border" style={{ borderColor: GOLD_MUTED, borderRadius: `${br}px`, background: "rgba(255,255,255,0.08)" }}>
                    <p className="text-center mb-2" style={{ fontFamily: BOLD_SERIF, fontSize: "0.85rem", color: GOLD }}>Lời Chúc Phúc</p>
                    <div className="h-12 rounded" style={{ background: "rgba(255,255,255,0.06)", border: `1px solid rgba(212,175,55,0.15)` }}/>
                  </div>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="py-4 text-center" style={{ background: RED_DARK }}>
              <p style={{ fontFamily: BODY_FONT, fontSize: "0.6rem", color: GOLD, opacity: 0.7 }}>
                Sự hiện diện của quý khách là niềm vinh hạnh!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* INVITATION HERO (Full page renderer for this template)     */
/* ─────────────────────────────────────────────────────────── */
export function InvitationHero({ data }: { data: InvitationData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldAutoPlayMusic, setShouldAutoPlayMusic] = useState(false);
  const br = data.theme.borderRadius || 12;

  const handleOpen = () => {
    setIsOpen(true);
    // User interacted! Safe to autoplay music now.
    if (data.music.enabled && data.music.url) {
      setShouldAutoPlayMusic(true);
    }
  };

  return (
    <div className="min-h-screen text-center font-serif text-[#3a1c1d]" style={{ background: CREAM, overflowX: "hidden" }}>
      
      {/* ═══ ENVELOPE COVER (ANIMATED) ═══ */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: RED_DARK }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Paper texture overlay */}
            <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")` }} />

            <motion.div
              className="relative w-[90%] max-w-sm aspect-[3/4] flex flex-col items-center justify-center p-8 bg-white shadow-2xl"
              style={{ borderRadius: `${br}px`, border: `4px solid ${RED_DARK}`, background: CREAM_DK }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <CornerFlourish position="tl" className="top-0 left-0" />
              <CornerFlourish position="tr" className="top-0 right-0" />
              <CornerFlourish position="bl" className="bottom-0 left-0" />
              <CornerFlourish position="br" className="bottom-0 right-0" />

              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: RED_DARK }}>
                <DoubleHappiness className="h-8 w-8 text-[#fcf9f2]" />
              </div>

              <h2 style={{ fontFamily: BOLD_SERIF, fontSize: "1.75rem", color: RED_DARK, lineHeight: 1.2 }}>
                {data.couple.brideName}
              </h2>
              <p style={{ fontFamily: SERIF_FONT, fontSize: "1.2rem", color: GOLD, margin: "4px 0" }}>&amp;</p>
              <h2 style={{ fontFamily: BOLD_SERIF, fontSize: "1.75rem", color: RED_DARK, lineHeight: 1.2 }}>
                {data.couple.groomName}
              </h2>

              <div className="h-px w-24 mx-auto my-6" style={{ background: GOLD }} />

              <p style={{ fontFamily: BODY_FONT, fontSize: "0.8rem", color: RED_DARK, letterSpacing: "0.05em", fontWeight: 500 }}>
                {formatViDate(data.event.date)}
              </p>

              <p className="mt-4 mb-8" style={{ fontFamily: SERIF_FONT, fontSize: "0.9rem", color: TEXT_DARK }}>
                Thân Mời Gia Đình &amp; Bạn Bè
              </p>

              <motion.button
                onClick={handleOpen}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full text-white font-medium shadow-[0_4px_14px_rgba(122,11,20,0.4)]"
                style={{ background: `linear-gradient(to right, ${RED_DARK}, ${RED_PRIMARY})`, fontFamily: BODY_FONT, letterSpacing: "0.05em" }}
              >
                Mở thiệp
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ INNER CONTENT ═══ */}
      {/* Background texture across the whole page */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-[-1]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")` }} />

      <div className="relative z-10">
        
        {/* 1. HERO SECTION */}
        <section className="relative min-h-screen flex flex-col items-center pt-16 px-6 overflow-hidden">
          {/* Header Banner */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={isOpen ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full absolute top-0 left-0 h-40 flex flex-col items-center justify-center pt-8"
            style={{ background: RED_DARK }}
          >
            <p style={{ fontFamily: SERIF_FONT, fontSize: "1rem", color: CREAM, letterSpacing: "0.15em", textTransform: "uppercase" }}>
              {data.couple.brideName} &amp; {data.couple.groomName}
            </p>
            <div className="absolute -bottom-8 bg-white p-2 rounded-full shadow-lg" style={{ background: CREAM }}>
               <DoubleHappiness className="h-16 w-16" style={{ color: RED_DARK }} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isOpen ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-40 max-w-md w-full"
          >
            {/* Main Photo inside a classic frame */}
            <div className="relative rounded-t-[100px] overflow-hidden p-[6px] shadow-2xl mx-auto" style={{ background: `linear-gradient(45deg, ${GOLD}, ${CREAM}, ${GOLD})`, maxWidth: 320 }}>
              <div className="rounded-t-[94px] overflow-hidden bg-white h-[400px]">
                <img src={heroWedding} alt="Couple" className="w-full h-full object-cover" />
              </div>
            </div>

            <SectionDivider />

            <h1 style={{ fontFamily: BOLD_SERIF, fontSize: "clamp(2.5rem, 8vw, 3.5rem)", color: RED_DARK, lineHeight: 1 }}>
              {data.couple.brideName}
            </h1>
            <p style={{ fontFamily: BOLD_SERIF, fontSize: "2rem", color: GOLD, opacity: 0.8, margin: "-4px 0" }}>&amp;</p>
            <h1 style={{ fontFamily: BOLD_SERIF, fontSize: "clamp(2.5rem, 8vw, 3.5rem)", color: RED_DARK, lineHeight: 1 }}>
              {data.couple.groomName}
            </h1>

            <p className="mt-6 uppercase tracking-[0.2em]" style={{ fontFamily: BODY_FONT, fontSize: "0.75rem", color: TEXT_RED, fontWeight: 600 }}>
              Lễ Thành Hôn
            </p>
            <p className="mt-2" style={{ fontFamily: SERIF_FONT, fontSize: "1.2rem", color: TEXT_DARK }}>
              {formatViDate(data.event.date)}
            </p>
          </motion.div>
        </section>

        {/* 2. FAMILY / INFO SECTION */}
        <section className="py-16 px-6 max-w-3xl mx-auto text-center">
          <SectionDivider />
          <h2 className="mb-10 uppercase tracking-[0.15em]" style={{ fontFamily: SERIF_FONT, fontSize: "1.4rem", color: RED_DARK, fontWeight: 600 }}>
            Thông Tin Gia Đình
          </h2>
          
          <div className="grid grid-cols-2 gap-8 md:gap-16">
            <div className="text-right border-r px-4 md:px-8" style={{ borderColor: GOLD_MUTED }}>
              <p style={{ fontFamily: BODY_FONT, fontSize: "0.65rem", color: TEXT_RED, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>Nhà Gái</p>
              <p className="mt-3" style={{ fontFamily: BOLD_SERIF, fontSize: "1.2rem", color: RED_DARK }}>Bố Cô Dâu</p>
              <p style={{ fontFamily: BOLD_SERIF, fontSize: "1.2rem", color: RED_DARK }}>Mẹ Cô Dâu</p>
              <p className="mt-4" style={{ fontFamily: SERIF_FONT, fontSize: "0.9rem", color: TEXT_DARK }}>Trưởng Nữ</p>
              <p style={{ fontFamily: BOLD_SERIF, fontSize: "1.5rem", color: RED_DARK, marginTop: 4 }}>{data.couple.brideName}</p>
            </div>
            <div className="text-left px-4 md:px-8">
              <p style={{ fontFamily: BODY_FONT, fontSize: "0.65rem", color: TEXT_RED, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>Nhà Trai</p>
              <p className="mt-3" style={{ fontFamily: BOLD_SERIF, fontSize: "1.2rem", color: RED_DARK }}>Bố Chú Rể</p>
              <p style={{ fontFamily: BOLD_SERIF, fontSize: "1.2rem", color: RED_DARK }}>Mẹ Chú Rể</p>
              <p className="mt-4" style={{ fontFamily: SERIF_FONT, fontSize: "0.9rem", color: TEXT_DARK }}>Thứ Nam</p>
              <p style={{ fontFamily: BOLD_SERIF, fontSize: "1.5rem", color: RED_DARK, marginTop: 4 }}>{data.couple.groomName}</p>
            </div>
          </div>
        </section>

        {/* 3. EVENT SCHEDULE */}
        <section className="py-16 px-6 relative" style={{ background: CREAM_DK }}>
          <div className="max-w-xl mx-auto text-center border p-8 md:p-12 bg-white/70" style={{ borderColor: GOLD_MUTED, borderRadius: `${br}px` }}>
            <h2 className="uppercase tracking-[0.15em] mb-8" style={{ fontFamily: SERIF_FONT, fontSize: "1.4rem", color: RED_DARK, fontWeight: 600 }}>
              Sự Kiện Trọng Đại
            </h2>

            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-center gap-4 text-left">
                <div className="p-3 bg-[#7a0b14] text-white rounded-full"><Heart className="w-5 h-5" /></div>
                <div>
                  <h3 style={{ fontFamily: BOLD_SERIF, fontSize: "1.2rem", color: RED_DARK }}>Lễ Gia Tiên</h3>
                  <p style={{ fontFamily: BODY_FONT, fontSize: "0.8rem", color: TEXT_DARK, opacity: 0.8 }}><Clock className="w-3 h-3 inline mr-1" /> 09:00 Sáng</p>
                </div>
              </div>
              <div className="h-px w-12 mx-auto" style={{ background: GOLD_MUTED }} />
              <div className="flex items-center justify-center gap-4 text-left">
                <div className="p-3 bg-[#7a0b14] text-white rounded-full"><Gift className="w-5 h-5" /></div>
                <div>
                  <h3 style={{ fontFamily: BOLD_SERIF, fontSize: "1.2rem", color: RED_DARK }}>Tiệc Mừng Cưới</h3>
                  <p style={{ fontFamily: BODY_FONT, fontSize: "0.8rem", color: TEXT_DARK, opacity: 0.8 }}><Clock className="w-3 h-3 inline mr-1" /> {data.event.time}</p>
                </div>
              </div>
            </div>

            <p className="mt-10 mb-2 uppercase tracking-widest font-bold" style={{ fontFamily: BODY_FONT, fontSize: "0.7rem", color: TEXT_RED }}>Tại {data.event.venue}</p>
            <p style={{ fontFamily: SERIF_FONT, fontSize: "1rem", color: TEXT_DARK }}>{data.event.address}</p>

             {/* Countdown within Event Section */}
            <div className="mt-12">
              <p className="uppercase tracking-widest mb-4" style={{ fontFamily: BODY_FONT, fontSize: "0.65rem", color: RED_PRIMARY, fontWeight: 600 }}>Cùng đếm ngược</p>
              <div className="flex justify-center gap-3 md:gap-6">
                {getCountdownItems(data.event.date).map((d) => (
                  <div key={d.l} className="text-center">
                    <p style={{ fontFamily: BOLD_SERIF, fontSize: "1.8rem", color: RED_DARK }}>{d.n}</p>
                    <p style={{ fontFamily: BODY_FONT, fontSize: "0.6rem", textTransform: "uppercase", color: GOLD, fontWeight: 600 }}>{d.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. GALLERY */}
        <section className="py-16 px-6 max-w-4xl mx-auto">
          <SectionDivider />
          <h2 className="text-center mb-10 uppercase tracking-[0.15em]" style={{ fontFamily: SERIF_FONT, fontSize: "1.4rem", color: RED_DARK, fontWeight: 600 }}>
            Album Ảnh Cưới
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
             {/* Using placeholders or actual gallery */}
             {(data.gallery?.length > 0 ? data.gallery.slice(0, 6) : [heroWedding, heroWedding, heroWedding]).map((img, i) => (
               <div key={i} className="aspect-[3/4] overflow-hidden" style={{ borderRadius: `${br}px` }}>
                 <img src={img} alt="Gallery" className="w-full h-full object-cover origin-center transition-transform hover:scale-110 duration-700" />
               </div>
             ))}
          </div>
        </section>

        {/* 5. MAP */}
        <section className="py-16 px-6 text-center max-w-3xl mx-auto">
          <SectionDivider />
          <h2 className="mb-6 uppercase tracking-[0.15em]" style={{ fontFamily: SERIF_FONT, fontSize: "1.4rem", color: RED_DARK, fontWeight: 600 }}>
            Bản Đồ Chỉ Đường
          </h2>
          {data.map.embedUrl ? (
            <div className="overflow-hidden border-2 shadow-sm mb-4" style={{ borderColor: GOLD, borderRadius: `${br}px` }}>
              <iframe src={data.map.embedUrl} className="w-full h-64 md:h-80" loading="lazy" title="Bản đồ" />
            </div>
          ) : (
             <div className="h-64 flex items-center justify-center border border-dashed mb-4 bg-white/50" style={{ borderColor: GOLD_MUTED, borderRadius: `${br}px` }}>
               <p style={{ fontFamily: BODY_FONT, fontSize: "0.8rem", color: TEXT_RED }}><MapPin className="inline w-4 h-4 mr-1"/> Chưa có bản đồ Google Maps</p>
             </div>
          )}
          {data.map.directions && (
            <p style={{ fontFamily: BODY_FONT, fontSize: "0.85rem", color: TEXT_DARK, opacity: 0.8 }}>{data.map.directions}</p>
          )}
        </section>

        {/* 6. RSVP & MESSAGES */}
        {(data.rsvp.enabled || data.wishes.enabled) && (
          <section className="py-16 px-6" style={{ background: RED_DARK }}>
            <div className="max-w-2xl mx-auto grid gap-12">
              
              {/* RSVP Form Design */}
              {data.rsvp.enabled && (
                <div className="bg-white p-8 md:p-12 text-center" style={{ borderRadius: `${br}px` }}>
                  <h2 className="mb-2" style={{ fontFamily: BOLD_SERIF, fontSize: "1.6rem", color: RED_DARK }}>Xin Lưu Bút</h2>
                  <p className="mb-8" style={{ fontFamily: BODY_FONT, fontSize: "0.8rem", color: TEXT_DARK, opacity: 0.7 }}>Sự báo hiếu của quý vị là niềm vinh hạnh của gia đình</p>
                  
                  <div className="space-y-4 text-left">
                    <input className="w-full p-3 border outline-none bg-[#fdfaf4] focus:border-[#7a0b14] transition-colors" placeholder="Tên khách mời *" style={{ fontFamily: BODY_FONT, fontSize: "0.9rem", borderColor: GOLD_MUTED, borderRadius: `${Math.max(4, br-4)}px` }} />
                    <input className="w-full p-3 border outline-none bg-[#fdfaf4] focus:border-[#7a0b14] transition-colors" placeholder="Điện thoại" style={{ fontFamily: BODY_FONT, fontSize: "0.9rem", borderColor: GOLD_MUTED, borderRadius: `${Math.max(4, br-4)}px` }} />
                    <select className="w-full p-3 border outline-none bg-[#fdfaf4]" style={{ fontFamily: BODY_FONT, fontSize: "0.9rem", borderColor: GOLD_MUTED, borderRadius: `${Math.max(4, br-4)}px` }}>
                      <option>Sẽ tham dự</option>
                      <option>Không thể tham dự</option>
                    </select>
                    <button className="w-full mt-4 py-3 text-white font-bold tracking-widest uppercase hover:opacity-90 transition-opacity pb-3" style={{ background: RED_DARK, fontFamily: BODY_FONT, fontSize: "0.85rem", borderRadius: `${Math.max(4, br-4)}px` }}>
                      Gửi Xác Nhận
                    </button>
                  </div>
                </div>
              )}

              {/* Wishes Placeholder */}
              {data.wishes.enabled && (
                <div className="bg-white/10 p-8 rounded-xl text-center border overflow-hidden relative" style={{ borderColor: GOLD_MUTED }}>
                   <div className="absolute top-0 right-0 p-4 opacity-10">
                     <DoubleHappiness className="h-20 w-20 text-white" />
                   </div>
                   <h2 className="mb-6" style={{ fontFamily: BOLD_SERIF, fontSize: "1.6rem", color: GOLD }}>Lời Chúc Phúc</h2>
                   <input className="w-full p-3 mb-3 bg-white/20 text-white placeholder-white/50 outline-none border border-transparent focus:border-white/40" placeholder="Tên của bạn" style={{ fontFamily: BODY_FONT, fontSize: "0.9rem", borderRadius: `${Math.max(4, br-4)}px` }} />
                   <textarea className="w-full p-3 mb-4 bg-white/20 text-white placeholder-white/50 outline-none border border-transparent focus:border-white/40 resize-none h-24" placeholder="Viết vài lời chúc..." style={{ fontFamily: BODY_FONT, fontSize: "0.9rem", borderRadius: `${Math.max(4, br-4)}px` }} />
                   <button className="px-8 py-2.5 text-white font-medium border-2" style={{ borderColor: GOLD, borderRadius: 30, fontFamily: BODY_FONT, fontSize: "0.85rem" }}>
                     Gửi Lời Chúc
                   </button>
                </div>
              )}

            </div>
          </section>
        )}

        {/* 7. GIFT / MỪNG CƯỚI */}
        <section className="py-20 px-6 max-w-2xl mx-auto text-center" style={{ background: CREAM }}>
          <SectionDivider />
          <h2 className="mb-3 uppercase tracking-[0.15em]" style={{ fontFamily: SERIF_FONT, fontSize: "1.4rem", color: RED_DARK, fontWeight: 600 }}>
            Hộp Mừng Cưới
          </h2>
          <p className="mb-10" style={{ fontFamily: BODY_FONT, fontSize: "0.85rem", color: TEXT_DARK, opacity: 0.8 }}>Gửi trao yêu thương và may mắn</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white border shadow-sm flex flex-col items-center" style={{ borderColor: GOLD_MUTED, borderRadius: `${br}px` }}>
               <h3 className="mb-4" style={{ fontFamily: BOLD_SERIF, fontSize: "1.1rem", color: RED_DARK }}>Mừng Nhà Gái</h3>
               <div className="w-32 h-32 bg-gray-100 flex items-center justify-center rounded-lg border border-gray-200 mb-4 overflow-hidden p-2">
                 <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Gift`} alt="QR" className="w-full h-full object-contain" />
               </div>
               <p style={{ fontFamily: BODY_FONT, fontSize: "0.75rem", color: TEXT_DARK, fontWeight: 600 }}>Ngân hàng VCB</p>
               <p style={{ fontFamily: BODY_FONT, fontSize: "0.75rem", color: TEXT_DARK }}>123456789 - {data.couple.brideName}</p>
            </div>
            <div className="p-6 bg-white border shadow-sm flex flex-col items-center" style={{ borderColor: GOLD_MUTED, borderRadius: `${br}px` }}>
               <h3 className="mb-4" style={{ fontFamily: BOLD_SERIF, fontSize: "1.1rem", color: RED_DARK }}>Mừng Nhà Trai</h3>
               <div className="w-32 h-32 bg-gray-100 flex items-center justify-center rounded-lg border border-gray-200 mb-4 overflow-hidden p-2">
                 <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Gift`} alt="QR" className="w-full h-full object-contain" />
               </div>
               <p style={{ fontFamily: BODY_FONT, fontSize: "0.75rem", color: TEXT_DARK, fontWeight: 600 }}>Ngân hàng TCB</p>
               <p style={{ fontFamily: BODY_FONT, fontSize: "0.75rem", color: TEXT_DARK }}>987654321 - {data.couple.groomName}</p>
            </div>
          </div>
        </section>

        {/* Footer info */}
        <div className="py-6 text-center" style={{ background: RED_DARK }}>
          <p style={{ fontFamily: BODY_FONT, fontSize: "0.7rem", color: GOLD, opacity: 0.8 }}>
            Sự hiện diện của quý khách là niềm vinh hạnh cho gia đình chúng tôi!
          </p>
        </div>

      </div>
    </div>
  );
}

// Ensure the page Style respects the full page flag if exported
export const pageStyle: CSSProperties = {
  background: CREAM,
};
