import { useState, type CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Heart, Calendar, Gift, Camera, Send } from "lucide-react";
import heroWedding from "@/assets/hero-wedding.jpg";
import type { InvitationData } from "@/types/invitation";
import { formatViDate, getCountdownItems } from "@/types/invitation";
import {
  FadeInSection, StaggerContainer, StaggerItem, RevealText,
  ScaleInView, FloatingElement, GlowPulse, ShimmerButton,
  AnimatedDivider, CountdownPop, RotateSlow,
} from "./motion-primitives";

/* ═══════════════════════════════════════════════════════════════════
   RED DRAGON ENVELOPE — Premium Traditional Vietnamese Wedding
   ─────────────────────────────────────────────────────────────────
   Palette : Deep wine red / Gold accent / Warm cream / Beige
   Motifs  : Dragon, clouds, Song Hỷ, traditional patterns
   Feature : Envelope open animation, full-page invitation
   ═══════════════════════════════════════════════════════════════════ */

/* ── Design Tokens ── */
const C = {
  redDeep:    "#5c0a0e",
  redDark:    "#7a0b14",
  redPrimary: "#9c1b26",
  redWine:    "#8b1a1a",
  gold:       "#d4a843",
  goldLight:  "#e8c668",
  goldMuted:  "rgba(212,168,67,0.35)",
  goldSheer:  "rgba(212,168,67,0.10)",
  cream:      "#fdf8ef",
  creamDark:  "#f5ebd8",
  paper:      "#fefcf6",
  ivory:      "#faf5e8",
  textDark:   "#3a1518",
  textBody:   "#5c2d30",
  textMuted:  "#8a6055",
  shadow:     "0 12px 48px rgba(92,10,14,0.18)",
  shadowCard: "0 4px 24px rgba(92,10,14,0.08)",
} as const;

const DISPLAY = "'Playfair Display', serif";
const SERIF   = "'Cormorant Garamond', serif";
const BODY    = "'Be Vietnam Pro', sans-serif";

/* ── Google Fonts injection ── */
const fontLink = document.querySelector("link[data-red-dragon]");
if (!fontLink) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.dataset.redDragon = "1";
  link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Be+Vietnam+Pro:wght@300;400;500;600&display=swap";
  document.head.appendChild(link);
}

/* ═══ SVG DECORATIONS ═══ */

function DoubleHappiness({ size = 48, color = C.gold, opacity = 1 }: { size?: number; color?: string; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill={color} opacity={opacity} aria-label="Song Hỷ">
      <path d="M15,20 h15 v-10 h8 v10 h24 v-10 h8 v10 h15 v8 h-15 v12 h15 v8 h-15 v12 h15 v8 h-15 v12 h-8 v-12 h-24 v12 h-8 v-12 h-15 v-8 h15 v-12 h-15 v-8 h15 v-12 h-15 z M38,28 h-8 v12 h8 z M38,48 h-8 v12 h8 z M70,28 h-8 v12 h8 z M70,48 h-8 v12 h8 z" fillRule="evenodd"/>
    </svg>
  );
}

function DragonSVG({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg className={`absolute pointer-events-none select-none ${className}`} width="200" height="280" viewBox="0 0 200 280" fill="none"
      style={{ opacity: 0.06, transform: flip ? "scaleX(-1)" : undefined }}>
      <path d="M100,10 C60,30 30,70 25,120 C20,170 45,220 80,250 C90,258 100,260 110,258 C140,248 165,210 170,165 C175,120 155,70 130,40 C120,28 110,18 100,10 Z" fill={C.redDark}/>
      <path d="M100,40 C75,55 55,90 50,130 C45,170 60,210 85,235 C90,238 95,240 100,238 C120,228 140,195 145,155 C150,115 135,75 115,55 C110,48 105,42 100,40 Z" fill={C.redDark} opacity={0.5}/>
      <circle cx="80" cy="90" r="4" fill={C.gold} opacity={0.3}/>
      <circle cx="120" cy="85" r="4" fill={C.gold} opacity={0.3}/>
      <path d="M60,60 C55,55 45,58 40,65 C35,72 38,80 45,82" stroke={C.gold} strokeWidth="1" fill="none" opacity={0.15}/>
      <path d="M140,55 C145,50 155,53 160,60 C165,67 162,75 155,77" stroke={C.gold} strokeWidth="1" fill="none" opacity={0.15}/>
    </svg>
  );
}

function CloudPattern({ className = "" }: { className?: string }) {
  return (
    <svg className={`absolute pointer-events-none select-none ${className}`} width="120" height="60" viewBox="0 0 120 60" fill="none" style={{ opacity: 0.05 }}>
      <path d="M10,40 C10,25 25,15 40,18 C42,8 55,2 68,8 C75,3 90,5 95,15 C105,12 115,20 112,32 C118,38 115,50 105,48 C100,55 85,55 80,48 C70,55 55,52 50,45 C40,52 20,50 15,42 Z" fill={C.gold}/>
    </svg>
  );
}

function CornerOrnament({ position = "tl" }: { position?: "tl" | "tr" | "bl" | "br" }) {
  let transform = "";
  if (position === "tr") transform = "scaleX(-1)";
  if (position === "bl") transform = "scaleY(-1)";
  if (position === "br") transform = "scale(-1,-1)";
  return (
    <svg className="absolute pointer-events-none" width="80" height="80" viewBox="0 0 80 80" fill="none"
      style={{ transform, opacity: 0.2,
        top: position.includes("t") ? 8 : "auto",
        bottom: position.includes("b") ? 8 : "auto",
        left: position.includes("l") ? 8 : "auto",
        right: position.includes("r") ? 8 : "auto",
      }}>
      <path d="M0,0 C30,0 60,10 70,30 C76,42 72,65 80,80" stroke={C.gold} strokeWidth="1" fill="none"/>
      <path d="M0,0 C20,12 40,35 48,55 C52,65 50,75 58,80" stroke={C.gold} strokeWidth="0.7" fill="none"/>
      <circle cx="0" cy="0" r="3" fill={C.gold} opacity={0.4}/>
      <path d="M5,5 L15,5 L15,15" stroke={C.gold} strokeWidth="0.8" fill="none"/>
    </svg>
  );
}

function SectionTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="text-center mb-10 md:mb-14">
      <div className="flex items-center justify-center gap-4 mb-4">
        <div className="h-px w-12 md:w-20" style={{ background: `linear-gradient(90deg, transparent, ${C.gold})` }}/>
        <DoubleHappiness size={20} color={C.gold} opacity={0.5}/>
        <div className="h-px w-12 md:w-20" style={{ background: `linear-gradient(90deg, ${C.gold}, transparent)` }}/>
      </div>
      <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(1.2rem, 4vw, 1.8rem)", color: C.redDark, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
        {children}
      </h2>
      {sub && <p className="mt-2" style={{ fontFamily: SERIF, fontSize: "0.85rem", color: C.textMuted, fontStyle: "italic" }}>{sub}</p>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PREVIEW CARD  (Builder LivePreview panel — interactive)
   ═══════════════════════════════════════════════════════════════════ */
export function PreviewCard({ data }: { data: InvitationData }) {
  const [isOpen, setIsOpen] = useState(false);
  const br = data.theme.borderRadius;
  const dateStr = formatViDate(data.event.date);
  const countdown = getCountdownItems(data.event.date);
  const weddingDay = data.event.date ? new Date(data.event.date) : null;
  const dayOfWeek = weddingDay ? weddingDay.toLocaleDateString("vi-VN", { weekday: "long" }) : "";
  const dayNum = weddingDay ? weddingDay.getDate() : "";
  const monthNum = weddingDay ? weddingDay.getMonth() + 1 : "";
  const yearNum = weddingDay ? weddingDay.getFullYear() : "";

  return (
    <div className="max-w-md mx-auto overflow-hidden relative" style={{ borderRadius: `${br}px`, background: C.cream, boxShadow: C.shadow }}>

      {/* ── Toggle bar: switch between Closed / Open ── */}
      <div className="flex items-center justify-center gap-1 p-2" style={{ background: C.redDeep }}>
        <button
          onClick={() => setIsOpen(false)}
          className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
          style={{
            fontFamily: BODY,
            background: !isOpen ? C.gold : "transparent",
            color: !isOpen ? C.redDeep : C.goldLight,
            border: `1px solid ${!isOpen ? C.gold : C.goldMuted}`,
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
            fontFamily: BODY,
            background: isOpen ? C.gold : "transparent",
            color: isOpen ? C.redDeep : C.goldLight,
            border: `1px solid ${isOpen ? C.gold : C.goldMuted}`,
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
            <div className="relative p-8 text-center cursor-pointer" style={{ background: C.redDark, minHeight: 320 }} onClick={() => setIsOpen(true)}>
              <CornerOrnament position="tl"/>
              <CornerOrnament position="tr"/>
              <CornerOrnament position="bl"/>
              <CornerOrnament position="br"/>
              <DragonSVG className="-left-8 top-8" />
              <DragonSVG className="-right-8 top-8" flip />
              <CloudPattern className="top-4 left-1/2 -translate-x-1/2" />

              <div className="relative z-10 flex flex-col items-center justify-center" style={{ minHeight: 280 }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5" style={{ background: "rgba(212,168,67,0.15)", border: `1px solid ${C.goldMuted}` }}>
                  <DoubleHappiness size={28} color={C.goldLight} opacity={0.9}/>
                </div>

                <h2 style={{ fontFamily: DISPLAY, fontSize: "1.8rem", color: C.cream, lineHeight: 1.15, fontWeight: 700 }}>
                  {data.couple.brideName || "Cô Dâu"}
                </h2>
                <p style={{ fontFamily: SERIF, fontSize: "1.1rem", color: C.goldLight, margin: "4px 0" }}>&amp;</p>
                <h2 style={{ fontFamily: DISPLAY, fontSize: "1.8rem", color: C.cream, lineHeight: 1.15, fontWeight: 700 }}>
                  {data.couple.groomName || "Chú Rể"}
                </h2>

                <div className="h-px w-16 mx-auto my-5" style={{ background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)` }}/>

                <p style={{ fontFamily: SERIF, fontSize: "0.8rem", color: C.goldLight, letterSpacing: "0.05em" }}>{dateStr}</p>
                <p className="mt-3" style={{ fontFamily: BODY, fontSize: "0.7rem", color: "rgba(253,248,239,0.7)" }}>
                  Kính mời quý khách
                </p>

                <button
                  onClick={(e) => { e.stopPropagation(); setIsOpen(true); }}
                  className="mt-5 px-6 py-2 rounded-full transition-transform hover:scale-105 active:scale-95"
                  style={{ background: "rgba(212,168,67,0.2)", border: `1px solid ${C.goldMuted}`, fontFamily: BODY, fontSize: "0.65rem", color: C.goldLight, letterSpacing: "0.08em", cursor: "pointer" }}
                >
                  Mở thiệp
                </button>
              </div>
            </div>

            <div className="p-5 text-center" style={{ background: C.cream }}>
              <p style={{ fontFamily: SERIF, fontSize: "0.65rem", color: C.textMuted, letterSpacing: "0.1em", textTransform: "uppercase" }}>Lễ Thành Hôn</p>
              <p className="mt-2" style={{ fontFamily: DISPLAY, fontSize: "1.1rem", color: C.redDark, fontWeight: 600 }}>
                {data.couple.brideName} & {data.couple.groomName}
              </p>
              <p className="mt-1" style={{ fontFamily: BODY, fontSize: "0.55rem", color: C.textMuted }}>{data.event.time} · {data.event.venue}</p>
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
            {/* Hero */}
            <div className="relative text-center px-5 py-10 overflow-hidden" style={{ background: C.redDark }}>
              <DragonSVG className="-left-10 top-4 !opacity-[0.06]" />
              <DragonSVG className="-right-10 top-4 !opacity-[0.06]" flip />
              <div className="relative z-10">
                <DoubleHappiness size={32} color={C.cream} opacity={0.15}/>
                <div className="flex items-center justify-center gap-3 mt-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2" style={{ borderColor: C.goldMuted }}>
                    <img src={heroWedding} alt="Bride" className="w-full h-full object-cover"/>
                  </div>
                  <DoubleHappiness size={20} color={C.goldLight} opacity={0.6}/>
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2" style={{ borderColor: C.goldMuted }}>
                    <img src={heroWedding} alt="Groom" className="w-full h-full object-cover"/>
                  </div>
                </div>
                <h2 style={{ fontFamily: DISPLAY, fontSize: "1.4rem", color: C.cream, fontWeight: 700, lineHeight: 1.1 }}>{data.couple.brideName}</h2>
                <p style={{ fontFamily: SERIF, fontSize: "0.9rem", color: C.goldLight, margin: "2px 0" }}>&amp;</p>
                <h2 style={{ fontFamily: DISPLAY, fontSize: "1.4rem", color: C.cream, fontWeight: 700, lineHeight: 1.1 }}>{data.couple.groomName}</h2>
              </div>
            </div>

            {/* Family Info */}
            <div className="px-5 py-6 text-center" style={{ background: C.cream }}>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-8" style={{ background: `linear-gradient(90deg, transparent, ${C.gold})` }}/>
                <DoubleHappiness size={14} color={C.gold} opacity={0.5}/>
                <div className="h-px w-8" style={{ background: `linear-gradient(90deg, ${C.gold}, transparent)` }}/>
              </div>
              <p style={{ fontFamily: DISPLAY, fontSize: "0.9rem", color: C.redDark, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>Thông Tin Lễ Cưới</p>
              <div className="grid grid-cols-2 gap-4 mt-4 text-[0.6rem]">
                <div className="text-right pr-3 border-r" style={{ borderColor: C.goldMuted }}>
                  <p style={{ fontFamily: BODY, color: C.redDark, fontWeight: 600, fontSize: "0.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Nhà Gái</p>
                  <p className="mt-1" style={{ fontFamily: DISPLAY, color: C.redDark, fontWeight: 600, fontSize: "0.85rem" }}>{data.couple.brideName}</p>
                </div>
                <div className="text-left pl-3">
                  <p style={{ fontFamily: BODY, color: C.redDark, fontWeight: 600, fontSize: "0.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Nhà Trai</p>
                  <p className="mt-1" style={{ fontFamily: DISPLAY, color: C.redDark, fontWeight: 600, fontSize: "0.85rem" }}>{data.couple.groomName}</p>
                </div>
              </div>
            </div>

            {/* Event Schedule */}
            <div className="px-5 py-6 text-center" style={{ background: C.redDark }}>
              <p style={{ fontFamily: DISPLAY, fontSize: "0.85rem", color: C.cream, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>Tiệc Cưới</p>
              <p className="mt-3" style={{ fontFamily: DISPLAY, fontSize: "2rem", color: C.cream, fontWeight: 800 }}>{data.event.time || "17:30"}</p>
              <div className="flex items-center justify-center gap-2 my-3">
                <p style={{ fontFamily: BODY, fontSize: "0.65rem", color: C.goldLight, textTransform: "uppercase" }}>{dayOfWeek}</p>
                <div className="px-3 py-1 border-x" style={{ borderColor: C.goldMuted }}>
                  <p style={{ fontFamily: DISPLAY, fontSize: "1.5rem", color: C.cream, fontWeight: 800, lineHeight: 1 }}>{String(dayNum).padStart(2, "0")}</p>
                </div>
                <p style={{ fontFamily: BODY, fontSize: "0.65rem", color: C.goldLight }}>THÁNG {String(monthNum).padStart(2, "0")}</p>
              </div>
              <p style={{ fontFamily: DISPLAY, fontSize: "1.2rem", color: C.cream, fontWeight: 700 }}>{yearNum}</p>

              {/* Countdown mini */}
              <div className="grid grid-cols-4 gap-2 mt-5">
                {countdown.map(d => (
                  <div key={d.l} className="py-2 text-center rounded-lg" style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${C.goldMuted}` }}>
                    <p style={{ fontFamily: DISPLAY, fontSize: "1rem", color: C.cream, fontWeight: 700 }}>{d.n}</p>
                    <p style={{ fontFamily: BODY, fontSize: "0.4rem", color: C.goldLight, textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.6 }}>{d.l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery mini */}
            <div className="px-5 py-5" style={{ background: C.cream }}>
              <p className="text-center mb-3" style={{ fontFamily: DISPLAY, fontSize: "0.8rem", color: C.redDark, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Album Ảnh</p>
              <div className="grid grid-cols-3 gap-1.5">
                {[heroWedding, heroWedding, heroWedding].map((img, i) => (
                  <div key={i} className="aspect-[3/4] overflow-hidden" style={{ borderRadius: `${Math.max(4, br-4)}px` }}>
                    <img src={img} alt={`Gallery ${i+1}`} className="w-full h-full object-cover"/>
                  </div>
                ))}
              </div>
            </div>

            {/* Venue */}
            <div className="px-5 py-5 text-center" style={{ background: C.ivory }}>
              <p style={{ fontFamily: DISPLAY, fontSize: "0.8rem", color: C.redDark, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Địa Điểm</p>
              <p className="mt-2" style={{ fontFamily: DISPLAY, fontSize: "0.9rem", color: C.redDark, fontWeight: 600 }}>{data.event.venue}</p>
              <p className="mt-1 flex items-center justify-center gap-1" style={{ fontFamily: BODY, fontSize: "0.6rem", color: C.textMuted }}>
                <MapPin className="w-3 h-3" style={{ color: C.redDark }}/>{data.event.address}
              </p>
            </div>

            {/* Wishes placeholder */}
            {data.wishes.enabled && (
              <div className="px-5 py-5" style={{ background: C.redDark }}>
                <p className="text-center mb-3" style={{ fontFamily: DISPLAY, fontSize: "0.8rem", color: C.cream, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Sổ Lưu Bút</p>
                <div className="p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.08)", border: `1px solid ${C.goldMuted}` }}>
                  <div className="h-6 rounded mb-2" style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${C.goldMuted}` }}/>
                  <div className="h-12 rounded mb-2" style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${C.goldMuted}` }}/>
                  <div className="h-7 rounded" style={{ background: `linear-gradient(135deg, ${C.redPrimary}, ${C.redWine})` }}/>
                </div>
              </div>
            )}

            {/* Gift placeholder */}
            <div className="px-5 py-5" style={{ background: C.cream }}>
              <p className="text-center mb-3" style={{ fontFamily: DISPLAY, fontSize: "0.8rem", color: C.redDark, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Hộp Mừng Cưới</p>
              <div className="grid grid-cols-2 gap-3">
                {["Nhà Gái", "Nhà Trai"].map(label => (
                  <div key={label} className="p-3 text-center border rounded-lg" style={{ borderColor: C.goldMuted, background: C.paper }}>
                    <p style={{ fontFamily: DISPLAY, fontSize: "0.7rem", color: C.redDark, fontWeight: 600 }}>{label}</p>
                    <div className="w-12 h-12 mx-auto my-2 bg-gray-100 rounded border border-gray-200"/>
                    <p style={{ fontFamily: BODY, fontSize: "0.5rem", color: C.textMuted }}>QR Code</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="py-4 text-center" style={{ background: C.redDark }}>
              <DoubleHappiness size={16} color={C.goldLight} opacity={0.3}/>
              <p className="mt-1" style={{ fontFamily: SERIF, fontSize: "0.6rem", color: C.goldLight, opacity: 0.7, fontStyle: "italic" }}>
                Sự hiện diện của quý khách là niềm vinh hạnh!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   INVITATION HERO  (Full InvitationPage — full-page template)
   ═══════════════════════════════════════════════════════════════════ */
export function InvitationHero({ data }: { data: InvitationData }) {
  const [isOpen, setIsOpen] = useState(false);
  const br = data.theme.borderRadius || 12;
  const dateStr = formatViDate(data.event.date);
  const countdown = getCountdownItems(data.event.date);
  const weddingDay = data.event.date ? new Date(data.event.date) : null;
  const dayOfWeek = weddingDay ? weddingDay.toLocaleDateString("vi-VN", { weekday: "long" }) : "";
  const dayNum = weddingDay ? weddingDay.getDate() : "";
  const monthNum = weddingDay ? weddingDay.getMonth() + 1 : "";
  const yearNum = weddingDay ? weddingDay.getFullYear() : "";

  const [wishName, setWishName] = useState("");
  const [wishText, setWishText] = useState("");
  const [localWishes, setLocalWishes] = useState<{name: string; text: string; time: string}[]>([]);

  const defaultWishes = [
    { name: "Nguyễn Hữu Dương", text: "Chúc vợ chồng trăm năm hạnh phúc, sớm có tin vui!", time: "2 giờ trước" },
    { name: "Hoàng Văn Lợi", text: "Chúc hai anh chị hạnh phúc mãi mãi!", time: "5 giờ trước" },
    { name: "Thanh", text: "Happy wedding! Thật đẹp đôi!", time: "1 ngày trước" },
  ];

  const handleWish = () => {
    if (!wishName.trim() || !wishText.trim()) return;
    setLocalWishes(prev => [{ name: wishName, text: wishText, time: "Vừa xong" }, ...prev]);
    setWishName(""); setWishText("");
  };

  const allWishes = [...localWishes, ...defaultWishes];

  return (
    <div className="min-h-screen" style={{ background: C.cream, fontFamily: BODY, overflowX: "hidden" }}>

      {/* ═══ ENVELOPE COVER ═══ */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${C.redDeep}, ${C.redDark} 50%, ${C.redDeep})` }}
            exit={{ opacity: 0, filter: "blur(8px)", scale: 1.04 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Background texture */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4a843' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`
            }}/>

            {/* Animated dragon decorations */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.5, delay: 0.3 }}>
              <DragonSVG className="-left-12 top-1/4 !opacity-[0.04]" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.5, delay: 0.3 }}>
              <DragonSVG className="-right-12 top-1/4 !opacity-[0.04]" flip />
            </motion.div>
            <FloatingElement amplitude={4} duration={5} className="absolute top-12 left-1/4">
              <CloudPattern />
            </FloatingElement>
            <FloatingElement amplitude={4} duration={6} className="absolute bottom-12 right-1/4">
              <CloudPattern />
            </FloatingElement>

            {/* Envelope Card */}
            <motion.div
              className="relative w-[88%] max-w-[380px] flex flex-col items-center justify-center px-8 py-10"
              style={{
                borderRadius: `${br + 4}px`,
                background: `linear-gradient(180deg, ${C.creamDark} 0%, ${C.cream} 100%)`,
                boxShadow: "0 24px 80px rgba(0,0,0,0.35), 0 8px 32px rgba(92,10,14,0.2)",
                border: `3px solid ${C.redDark}`,
              }}
              initial={{ y: 40, opacity: 0, scale: 0.9, filter: "blur(10px)", rotateX: 8 }}
              animate={{ y: 0, opacity: 1, scale: 1, filter: "blur(0px)", rotateX: 0 }}
              exit={{ y: -80, opacity: 0, scale: 1.08, filter: "blur(12px)", rotateX: -5 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <CornerOrnament position="tl"/>
              <CornerOrnament position="tr"/>
              <CornerOrnament position="bl"/>
              <CornerOrnament position="br"/>

              {/* Song Hy emblem — floating + glow */}
              <FloatingElement amplitude={4} duration={3.5}>
                <GlowPulse glowColor="rgba(122,11,20,0.25)" duration={2.5} className="rounded-full">
                  <motion.div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: C.redDark, boxShadow: `0 4px 16px rgba(122,11,20,0.3)` }}
                    initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <DoubleHappiness size={32} color={C.cream} opacity={0.9}/>
                  </motion.div>
                </GlowPulse>
              </FloatingElement>

              <div className="mb-6"/>

              {/* Names — staggered reveal */}
              <motion.h1 style={{ fontFamily: DISPLAY, fontSize: "2rem", color: C.redDark, lineHeight: 1.1, fontWeight: 700 }}
                initial={{ opacity: 0, y: 15, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}>
                {data.couple.brideName || "Cô Dâu"}
              </motion.h1>
              <motion.p style={{ fontFamily: SERIF, fontSize: "1.3rem", color: C.gold, margin: "6px 0" }}
                initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}>&amp;</motion.p>
              <motion.h1 style={{ fontFamily: DISPLAY, fontSize: "2rem", color: C.redDark, lineHeight: 1.1, fontWeight: 700 }}
                initial={{ opacity: 0, y: 15, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}>
                {data.couple.groomName || "Chú Rể"}
              </motion.h1>

              {/* Animated divider */}
              <motion.div className="h-px w-20 mx-auto my-6"
                style={{ background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)` }}
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}/>

              <motion.p style={{ fontFamily: SERIF, fontSize: "0.9rem", color: C.redDark, letterSpacing: "0.06em", fontWeight: 500 }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.2 }}>
                {dateStr}
              </motion.p>

              <motion.p className="mt-4 mb-2" style={{ fontFamily: SERIF, fontSize: "0.85rem", color: C.textBody }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.3 }}>Kính mời</motion.p>
              <motion.div className="px-5 py-1.5 mb-4 rounded" style={{ background: C.redDark }}
                initial={{ opacity: 0, scaleX: 0.5 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 0.5, delay: 1.4 }}>
                <p style={{ fontFamily: BODY, fontSize: "0.85rem", color: C.cream, fontWeight: 500 }}>Quý Khách</p>
              </motion.div>
              <motion.p style={{ fontFamily: SERIF, fontSize: "0.8rem", color: C.textMuted, fontStyle: "italic" }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.5 }}>
                đến dự buổi tiệc chung vui cùng gia đình
              </motion.p>

              {/* CTA Button — shimmer + pulse glow */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.7 }}>
                <ShimmerButton
                  onClick={() => setIsOpen(true)}
                  className="mt-8 px-10 py-3.5 rounded-full text-white font-medium wedding-glow"
                  style={{
                    background: `linear-gradient(135deg, ${C.redDark}, ${C.redPrimary})`,
                    fontFamily: BODY, fontSize: "0.9rem", letterSpacing: "0.06em",
                    boxShadow: `0 6px 24px rgba(122,11,20,0.4)`,
                  }}
                >
                  Mở thiệp
                </ShimmerButton>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ INNER CONTENT ═══ */}
      <div className="relative z-10">

        {/* 1. HERO SECTION */}
        <section className="relative overflow-hidden" style={{ background: C.redDark }}>
          <motion.div className="absolute inset-0 pointer-events-none" initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.2 }}>
            <DragonSVG className="-left-16 top-20 !opacity-[0.08]" />
          </motion.div>
          <motion.div className="absolute inset-0 pointer-events-none" initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.2 }}>
            <DragonSVG className="-right-16 top-20 !opacity-[0.08]" flip />
          </motion.div>
          <FloatingElement amplitude={3} duration={5} className="absolute top-8 left-1/3 pointer-events-none"><CloudPattern /></FloatingElement>
          <FloatingElement amplitude={3} duration={6} className="absolute top-8 right-1/3 pointer-events-none"><CloudPattern /></FloatingElement>

          <div className="relative z-10 text-center px-6 py-16 md:py-24">
            <div className="flex justify-center">
              <FloatingElement amplitude={5} duration={4} className="inline-flex">
                <RotateSlow duration={25} className="inline-flex">
                  <DoubleHappiness size={56} color={C.cream} opacity={0.15}/>
                </RotateSlow>
              </FloatingElement>
            </div>

            {/* Couple Photos — staggered scale entrance */}
            <div className="flex items-center justify-center gap-4 md:gap-8 mt-8 mb-6">
              <ScaleInView delay={0.2}>
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-[3px] shadow-lg" style={{ borderColor: C.goldMuted }}>
                  <img src={heroWedding} alt="Bride" className="w-full h-full object-cover"/>
                </div>
              </ScaleInView>
              <motion.div initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 200 }}>
                <DoubleHappiness size={36} color={C.goldLight} opacity={0.7}/>
              </motion.div>
              <ScaleInView delay={0.3}>
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-[3px] shadow-lg" style={{ borderColor: C.goldMuted }}>
                  <img src={heroWedding} alt="Groom" className="w-full h-full object-cover"/>
                </div>
              </ScaleInView>
            </div>

            <RevealText as="p" delay={0.5} style={{ fontFamily: BODY, fontSize: "0.65rem", color: C.goldLight, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.7 }}>Trưởng Nam</RevealText>
            <RevealText as="h1" delay={0.6} style={{ fontFamily: DISPLAY, fontSize: "clamp(2rem, 7vw, 3rem)", color: C.cream, lineHeight: 1.1, fontWeight: 700 }}>
              {data.couple.brideName}
            </RevealText>
            <RevealText as="p" delay={0.7} className="my-1" style={{ fontFamily: BODY, fontSize: "0.65rem", color: C.goldLight, letterSpacing: "0.15em", textTransform: "uppercase", opacity: 0.7 }}>Ái Nữ</RevealText>
            <RevealText as="h1" delay={0.8} style={{ fontFamily: DISPLAY, fontSize: "clamp(2rem, 7vw, 3rem)", color: C.cream, lineHeight: 1.1, fontWeight: 700 }}>
              {data.couple.groomName}
            </RevealText>
          </div>
        </section>

        {/* 2. FAMILY INFO */}
        <section className="py-16 md:py-20 px-6" style={{ background: C.cream }}>
          <FadeInSection><SectionTitle sub="Trân trọng báo tin lễ thành hôn của con chúng tôi">Thông Tin Lễ Cưới</SectionTitle></FadeInSection>

          <StaggerContainer className="max-w-2xl mx-auto grid grid-cols-2 gap-6 md:gap-12 mb-12">
            <StaggerItem className="text-right pr-4 md:pr-8 border-r" style={{ borderColor: C.goldMuted }}>
              <p style={{ fontFamily: BODY, fontSize: "0.6rem", color: C.redDark, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em" }}>Nhà Gái</p>
              <p className="mt-3" style={{ fontFamily: DISPLAY, fontSize: "1.1rem", color: C.redDark, fontWeight: 600 }}>Ông Bố Cô Dâu</p>
              <p style={{ fontFamily: DISPLAY, fontSize: "1.1rem", color: C.redDark, fontWeight: 600 }}>Bà Mẹ Cô Dâu</p>
              <AnimatedDivider width="2.5rem" className="ml-auto my-3" color={C.goldMuted}/>
              <p style={{ fontFamily: SERIF, fontSize: "0.85rem", color: C.textMuted }}>Trưởng Nữ</p>
              <p style={{ fontFamily: DISPLAY, fontSize: "1.4rem", color: C.redDark, fontWeight: 700, marginTop: 4 }}>{data.couple.brideName}</p>
            </StaggerItem>
            <StaggerItem className="text-left pl-4 md:pl-8">
              <p style={{ fontFamily: BODY, fontSize: "0.6rem", color: C.redDark, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em" }}>Nhà Trai</p>
              <p className="mt-3" style={{ fontFamily: DISPLAY, fontSize: "1.1rem", color: C.redDark, fontWeight: 600 }}>Ông Bố Chú Rể</p>
              <p style={{ fontFamily: DISPLAY, fontSize: "1.1rem", color: C.redDark, fontWeight: 600 }}>Bà Mẹ Chú Rể</p>
              <AnimatedDivider width="2.5rem" className="my-3" color={C.goldMuted}/>
              <p style={{ fontFamily: SERIF, fontSize: "0.85rem", color: C.textMuted }}>Thứ Nam</p>
              <p style={{ fontFamily: DISPLAY, fontSize: "1.4rem", color: C.redDark, fontWeight: 700, marginTop: 4 }}>{data.couple.groomName}</p>
            </StaggerItem>
          </StaggerContainer>

          {/* Full names announcement */}
          <ScaleInView delay={0.15} className="max-w-lg mx-auto text-center py-8 px-6 border" style={{ borderColor: C.goldMuted, borderRadius: `${br}px`, background: C.paper }}>
            <p style={{ fontFamily: BODY, fontSize: "0.7rem", color: C.textMuted, letterSpacing: "0.1em", textTransform: "uppercase" }}>Trân trọng báo tin</p>
            <p style={{ fontFamily: BODY, fontSize: "0.7rem", color: C.textMuted, marginTop: 4 }}>Lễ thành hôn của con chúng tôi</p>
            <h2 className="mt-5" style={{ fontFamily: DISPLAY, fontSize: "clamp(1.6rem, 5vw, 2.2rem)", color: C.redDark, fontWeight: 700 }}>
              {data.couple.brideName}
            </h2>
            <p style={{ fontFamily: SERIF, fontSize: "1rem", color: C.gold, margin: "2px 0" }}>&amp;</p>
            <h2 style={{ fontFamily: DISPLAY, fontSize: "clamp(1.6rem, 5vw, 2.2rem)", color: C.redDark, fontWeight: 700 }}>
              {data.couple.groomName}
            </h2>
          </ScaleInView>
        </section>

        {/* 3. EVENT SCHEDULE */}
        <section className="py-16 md:py-20 px-6 relative" style={{ background: C.redDark }}>
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4a843' fill-opacity='1'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")` }}/>
          <div className="relative z-10 max-w-xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12" style={{ background: `linear-gradient(90deg, transparent, ${C.goldMuted})` }}/>
              <DoubleHappiness size={18} color={C.goldLight} opacity={0.5}/>
              <div className="h-px w-12" style={{ background: `linear-gradient(90deg, ${C.goldMuted}, transparent)` }}/>
            </div>
            <h2 style={{ fontFamily: DISPLAY, fontSize: "1.5rem", color: C.cream, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>Thông Tin Tiệc Cưới</h2>
            <div className="h-px w-16 mx-auto mt-4 mb-8" style={{ background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)` }}/>

            <p className="mb-2" style={{ fontFamily: BODY, fontSize: "0.7rem", color: C.goldLight, letterSpacing: "0.1em", textTransform: "uppercase" }}>Tiệc cưới sẽ diễn ra vào lúc</p>
            <p style={{ fontFamily: DISPLAY, fontSize: "3rem", color: C.cream, fontWeight: 800 }}>{data.event.time || "17:30"}</p>

            {/* Calendar-style date */}
            <div className="flex items-center justify-center gap-3 my-6">
              <div className="text-right">
                <p style={{ fontFamily: BODY, fontSize: "0.8rem", color: C.goldLight, textTransform: "uppercase" }}>{dayOfWeek}</p>
              </div>
              <div className="px-4 py-2 border-x" style={{ borderColor: C.goldMuted }}>
                <p style={{ fontFamily: DISPLAY, fontSize: "2.5rem", color: C.cream, fontWeight: 800, lineHeight: 1 }}>{String(dayNum).padStart(2, "0")}</p>
              </div>
              <div className="text-left">
                <p style={{ fontFamily: BODY, fontSize: "0.8rem", color: C.goldLight }}>THÁNG {String(monthNum).padStart(2, "0")}</p>
              </div>
            </div>
            <p style={{ fontFamily: DISPLAY, fontSize: "1.8rem", color: C.cream, fontWeight: 700 }}>{yearNum}</p>

            {/* Timeline */}
            <div className="flex justify-center gap-3 mt-8">
              <div className="px-4 py-2 rounded-full" style={{ background: C.redPrimary, border: `1px solid ${C.goldMuted}` }}>
                <p style={{ fontFamily: BODY, fontSize: "0.75rem", color: C.goldLight, fontWeight: 500 }}>
                  <Clock className="w-3 h-3 inline mr-1" />ĐÓN KHÁCH: {data.event.time || "17:00"}
                </p>
              </div>
              <div className="px-4 py-2 rounded-full" style={{ background: C.redPrimary, border: `1px solid ${C.goldMuted}` }}>
                <p style={{ fontFamily: BODY, fontSize: "0.75rem", color: C.goldLight, fontWeight: 500 }}>
                  <Clock className="w-3 h-3 inline mr-1" />KHAI TIỆC: {data.event.time || "18:00"}
                </p>
              </div>
            </div>

            {/* Countdown */}
            <div className="mt-10 grid grid-cols-4 gap-3">
              {countdown.map((d, i) => (
                <CountdownPop key={d.l} delay={0.1 + i * 0.1}>
                  <div className="py-4 text-center rounded-xl" style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${C.goldMuted}` }}>
                    <p style={{ fontFamily: DISPLAY, fontSize: "1.6rem", color: C.cream, fontWeight: 700 }}>{d.n}</p>
                    <p style={{ fontFamily: BODY, fontSize: "0.55rem", color: C.goldLight, textTransform: "uppercase", letterSpacing: "0.15em", marginTop: 2, opacity: 0.6 }}>{d.l}</p>
                  </div>
                </CountdownPop>
              ))}
            </div>
          </div>
        </section>

        {/* 4. GALLERY */}
        <section className="py-16 md:py-20 px-6" style={{ background: C.cream }}>
          <FadeInSection><SectionTitle>Album Ảnh Cưới</SectionTitle></FadeInSection>
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {(data.gallery?.length > 0 ? data.gallery.slice(0, 6) : [heroWedding, heroWedding, heroWedding, heroWedding, heroWedding, heroWedding]).map((img, i) => (
              <motion.div key={i} className="aspect-[3/4] overflow-hidden" style={{ borderRadius: `${br}px`, boxShadow: C.shadowCard }}
                initial={{ opacity: 0, y: 30, scale: 0.95, filter: "blur(4px)" }} whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}>
                <img src={img} alt={`Gallery ${i+1}`} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"/>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 5. VENUE + MAP */}
        <section className="py-16 md:py-20 px-6" style={{ background: C.ivory }}>
          <FadeInSection><SectionTitle>Tiệc Cưới Sẽ Tổ Chức Tại</SectionTitle></FadeInSection>
          <div className="max-w-2xl mx-auto text-center">
            <p style={{ fontFamily: DISPLAY, fontSize: "1.3rem", color: C.redDark, fontWeight: 600 }}>{data.event.venue}</p>
            <p className="mt-2 flex items-center justify-center gap-1" style={{ fontFamily: BODY, fontSize: "0.85rem", color: C.textMuted }}>
              <MapPin className="w-4 h-4" style={{ color: C.redDark }}/>{data.event.address}
            </p>
            {data.map.embedUrl ? (
              <div className="mt-8 overflow-hidden border-2 shadow-md" style={{ borderColor: C.goldMuted, borderRadius: `${br}px` }}>
                <iframe src={data.map.embedUrl} className="w-full h-64 md:h-80" loading="lazy" title="Map"/>
              </div>
            ) : (
              <div className="mt-8 h-64 flex items-center justify-center border-2 border-dashed" style={{ borderColor: C.goldMuted, borderRadius: `${br}px`, background: C.paper }}>
                <p style={{ fontFamily: BODY, fontSize: "0.85rem", color: C.textMuted }}><MapPin className="inline w-4 h-4 mr-1"/>Bản đồ Google Maps</p>
              </div>
            )}
          </div>
        </section>

        {/* 6. GUESTBOOK / WISHES */}
        <section className="py-16 md:py-20 px-6" style={{ background: C.redDark }}>
          <div className="max-w-2xl mx-auto">
            <FadeInSection className="text-center mb-10">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-px w-12" style={{ background: `linear-gradient(90deg, transparent, ${C.goldMuted})` }}/>
                <DoubleHappiness size={18} color={C.goldLight} opacity={0.5}/>
                <div className="h-px w-12" style={{ background: `linear-gradient(90deg, ${C.goldMuted}, transparent)` }}/>
              </div>
              <h2 style={{ fontFamily: DISPLAY, fontSize: "1.5rem", color: C.cream, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>Sổ Lưu Bút</h2>
            </FadeInSection>

            {/* Form */}
            <FadeInSection className="bg-white p-6 md:p-8 mb-8" style={{ borderRadius: `${br}px`, boxShadow: C.shadow }}>
              <input value={wishName} onChange={e => setWishName(e.target.value)} placeholder="Tên của bạn"
                className="w-full p-3 mb-3 border outline-none focus:border-[#9c1b26] transition-colors"
                style={{ fontFamily: BODY, fontSize: "0.9rem", borderColor: C.goldMuted, borderRadius: `${Math.max(4,br-4)}px`, background: C.paper }}/>
              <textarea value={wishText} onChange={e => setWishText(e.target.value)} placeholder="Nhập lời chúc của bạn..."
                className="w-full p-3 mb-4 border outline-none focus:border-[#9c1b26] transition-colors resize-none h-24"
                style={{ fontFamily: BODY, fontSize: "0.9rem", borderColor: C.goldMuted, borderRadius: `${Math.max(4,br-4)}px`, background: C.paper }}/>
              <button onClick={handleWish}
                className="w-full py-3 text-white font-medium flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
                style={{ background: `linear-gradient(135deg, ${C.redDark}, ${C.redPrimary})`, borderRadius: `${Math.max(4,br-4)}px`, fontFamily: BODY, fontSize: "0.85rem" }}>
                <Send className="w-4 h-4"/>GỬI LỜI CHÚC
              </button>
            </FadeInSection>

            {/* Wishes list */}
            <div className="space-y-3">
              {allWishes.map((w, i) => (
                <motion.div key={`${w.name}-${i}`} className="p-5 border-l-4" style={{ borderColor: C.gold, background: "rgba(255,255,255,0.06)", borderRadius: `0 ${br}px ${br}px 0` }}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                  <div className="flex items-center justify-between mb-2">
                    <p style={{ fontFamily: DISPLAY, fontSize: "0.95rem", color: C.goldLight, fontWeight: 600 }}>{w.name}</p>
                    <p style={{ fontFamily: BODY, fontSize: "0.6rem", color: "rgba(253,248,239,0.4)" }}>{w.time}</p>
                  </div>
                  <p style={{ fontFamily: BODY, fontSize: "0.8rem", color: "rgba(253,248,239,0.75)", lineHeight: 1.7 }}>{w.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. GIFT BOX */}
        <section className="py-16 md:py-20 px-6" style={{ background: C.cream }}>
          <FadeInSection><SectionTitle sub="Gửi trao yêu thương">Hộp Mừng Cưới</SectionTitle></FadeInSection>
          <StaggerContainer className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Mừng Nhà Gái", name: data.couple.brideName, bank: "Vietcombank" },
              { label: "Mừng Nhà Trai", name: data.couple.groomName, bank: "Techcombank" },
            ].map((g) => (
              <StaggerItem key={g.label} className="p-6 text-center border" style={{ borderColor: C.goldMuted, borderRadius: `${br}px`, background: C.paper, boxShadow: C.shadowCard }}>
                <h3 style={{ fontFamily: DISPLAY, fontSize: "1.1rem", color: C.redDark, fontWeight: 600, marginBottom: 12 }}>{g.label}</h3>
                <div className="w-28 h-28 mx-auto mb-4 rounded-lg overflow-hidden border p-1" style={{ borderColor: C.goldMuted, background: "white" }}>
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Gift-${g.name}`} alt="QR" className="w-full h-full object-contain"/>
                </div>
                <p style={{ fontFamily: BODY, fontSize: "0.75rem", color: C.textDark, fontWeight: 600 }}>{g.bank}</p>
                <p style={{ fontFamily: BODY, fontSize: "0.75rem", color: C.textMuted }}>123456789 - {g.name}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* 8. FOOTER */}
        <FadeInSection className="py-8 text-center" style={{ background: C.redDark }}>
          <FloatingElement amplitude={3} duration={4}>
            <RotateSlow duration={30}>
              <DoubleHappiness size={24} color={C.goldLight} opacity={0.3}/>
            </RotateSlow>
          </FloatingElement>
          <p className="mt-3" style={{ fontFamily: SERIF, fontSize: "0.85rem", color: C.goldLight, opacity: 0.8, fontStyle: "italic" }}>
            Sự hiện diện của quý khách là niềm vinh hạnh cho gia đình chúng tôi!
          </p>
          <p className="mt-2" style={{ fontFamily: BODY, fontSize: "0.65rem", color: "rgba(253,248,239,0.3)" }}>
            Thiệp cưới bởi DUCO
          </p>
        </FadeInSection>
      </div>
    </div>
  );
}

export const pageStyle: CSSProperties = { background: C.cream };
