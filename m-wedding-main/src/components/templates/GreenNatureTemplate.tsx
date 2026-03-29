import { useState, useEffect, type CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Heart, Send, Gift } from "lucide-react";
import heroWedding from "@/assets/hero-wedding.jpg";
import type { InvitationData } from "@/types/invitation";
import { formatViDate, getCountdownItems } from "@/types/invitation";
import {
  FadeInSection, StaggerContainer, StaggerItem,
  ScaleInView, FloatingElement, ShimmerButton,
  AnimatedDivider, CountdownPop,
} from "./motion-primitives";

/* ═══════════════════════════════════════════════════════════════════
   GREEN NATURE TEMPLATE — Botanical Wedding Invitation
   ─────────────────────────────────────────────────────────────────
   Palette : Deep green / Olive / Cream white / Grey-green text
   Motifs  : Botanical leaves, nature, elegant editorial
   Feature : Envelope open animation, full-page invitation
   ═══════════════════════════════════════════════════════════════════ */

/* ── Design Tokens ── */
const C = {
  greenDeep:    "#2d4a2e",
  greenDark:    "#3a5a3c",
  greenOlive:   "#6b8f5e",
  greenSage:    "#8faa7e",
  greenLight:   "#c5d8b8",
  greenMuted:   "rgba(107,143,94,0.35)",
  greenSheer:   "rgba(45,74,46,0.08)",
  cream:        "#fdfdf8",
  creamWarm:    "#f7f5ef",
  paper:        "#fefefe",
  white:        "#ffffff",
  textDark:     "#2d4a2e",
  textBody:     "#4a6a4c",
  textMuted:    "#7a9a7c",
  textLight:    "#a0b89e",
  giftRed:      "#c94040",
  giftGold:     "#d4a843",
  shadow:       "0 12px 48px rgba(45,74,46,0.12)",
  shadowCard:   "0 4px 24px rgba(45,74,46,0.06)",
  shadowSoft:   "0 2px 12px rgba(0,0,0,0.06)",
} as const;

const DISPLAY = "'Cormorant Garamond', serif";
const SCRIPT  = "'Great Vibes', cursive";
const BODY    = "'Be Vietnam Pro', sans-serif";

/* ── Google Fonts injection ── */
const fontLink = document.querySelector("link[data-green-nature]");
if (!fontLink) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.dataset.greenNature = "1";
  link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Great+Vibes&family=Be+Vietnam+Pro:wght@300;400;500;600&display=swap";
  document.head.appendChild(link);
}

/* ═══ SVG LEAF DECORATIONS ═══ */

function LeafBranch({ className = "", style = {}, flip = false }: { className?: string; style?: React.CSSProperties; flip?: boolean }) {
  return (
    <svg className={`absolute pointer-events-none select-none ${className}`} style={{ ...style, transform: flip ? "scaleX(-1)" : undefined }} width="180" height="400" viewBox="0 0 180 400" fill="none">
      <g opacity="0.25">
        <path d="M90,380 C90,380 85,320 70,260 C55,200 30,150 20,100 C10,50 25,20 40,10" stroke={C.greenOlive} strokeWidth="1.5" fill="none"/>
        <path d="M70,260 C50,250 30,270 25,290" stroke={C.greenOlive} strokeWidth="0.8" fill="none"/>
        <ellipse cx="55" cy="240" rx="25" ry="40" fill={C.greenSage} opacity="0.3" transform="rotate(-30 55 240)"/>
        <ellipse cx="40" cy="180" rx="22" ry="35" fill={C.greenOlive} opacity="0.25" transform="rotate(-40 40 180)"/>
        <ellipse cx="30" cy="130" rx="20" ry="30" fill={C.greenSage} opacity="0.2" transform="rotate(-50 30 130)"/>
        <ellipse cx="35" cy="80" rx="18" ry="28" fill={C.greenLight} opacity="0.2" transform="rotate(-60 35 80)"/>
        <ellipse cx="75" cy="300" rx="20" ry="35" fill={C.greenLight} opacity="0.2" transform="rotate(20 75 300)"/>
        <ellipse cx="85" cy="340" rx="15" ry="25" fill={C.greenSage} opacity="0.15" transform="rotate(15 85 340)"/>
      </g>
    </svg>
  );
}

function SmallLeaf({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={`pointer-events-none select-none ${className}`} style={style} width="60" height="90" viewBox="0 0 60 90" fill="none">
      <path d="M30,85 C30,85 28,60 22,40 C16,20 10,10 15,5" stroke={C.greenOlive} strokeWidth="0.8" fill="none" opacity="0.3"/>
      <ellipse cx="20" cy="35" rx="12" ry="20" fill={C.greenSage} opacity="0.15" transform="rotate(-30 20 35)"/>
      <ellipse cx="25" cy="55" rx="10" ry="15" fill={C.greenLight} opacity="0.12" transform="rotate(15 25 55)"/>
    </svg>
  );
}

function HeartIcon({ size = 40, color = C.greenDeep }: { size?: number; color?: string }) {
  return (
    <div className="rounded-full flex items-center justify-center" style={{ width: size + 16, height: size + 16, background: color }}>
      <Heart className="fill-white text-white" style={{ width: size * 0.5, height: size * 0.5 }} />
    </div>
  );
}

function SectionTitle({ children, sub, light = false }: { children: React.ReactNode; sub?: string; light?: boolean }) {
  return (
    <div className="text-center mb-8 md:mb-12">
      <div className="flex items-center justify-center gap-3 mb-3">
        <div className="h-px w-10 md:w-16" style={{ background: `linear-gradient(90deg, transparent, ${light ? C.greenLight : C.greenOlive})` }}/>
        <SmallLeaf style={{ width: 16, height: 24, opacity: 0.5 }}/>
        <div className="h-px w-10 md:w-16" style={{ background: `linear-gradient(90deg, ${light ? C.greenLight : C.greenOlive}, transparent)` }}/>
      </div>
      <h2 style={{ fontFamily: BODY, fontSize: "clamp(0.7rem, 2.5vw, 0.85rem)", color: light ? C.greenLight : C.greenOlive, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>
        {children}
      </h2>
      {sub && <p className="mt-1" style={{ fontFamily: BODY, fontSize: "0.7rem", color: light ? "rgba(255,255,255,0.5)" : C.textMuted, fontStyle: "italic", letterSpacing: "0.05em" }}>{sub}</p>}
    </div>
  );
}

/* ═══ FLOATING LEAVES ANIMATION ═══ */
function FloatingLeaves() {
  const leaves = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    left: `${15 + Math.random() * 70}%`,
    delay: i * 3.5,
    duration: 12 + Math.random() * 8,
    size: 10 + Math.random() * 12,
    rotation: Math.random() * 360,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {leaves.map(leaf => (
        <motion.div
          key={leaf.id}
          className="absolute"
          style={{ left: leaf.left, top: -30 }}
          animate={{ y: ["0vh", "105vh"], x: [0, Math.sin(leaf.id) * 40], rotate: [leaf.rotation, leaf.rotation + 180] }}
          transition={{ duration: leaf.duration, delay: leaf.delay, repeat: Infinity, ease: "linear" }}
        >
          <svg width={leaf.size} height={leaf.size * 1.5} viewBox="0 0 20 30" fill={C.greenSage} opacity={0.12}>
            <ellipse cx="10" cy="15" rx="8" ry="13"/>
            <line x1="10" y1="2" x2="10" y2="28" stroke={C.greenOlive} strokeWidth="0.5" opacity="0.3"/>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PREVIEW CARD  (Builder LivePreview panel)
   ═══════════════════════════════════════════════════════════════════ */
export function PreviewCard({ data }: { data: InvitationData }) {
  const [isOpen, setIsOpen] = useState(false);
  const br = data.theme.borderRadius;
  const dateStr = formatViDate(data.event.date);
  const countdown = getCountdownItems(data.event.date);
  const weddingDay = data.event.date ? new Date(data.event.date) : null;
  const dayNum = weddingDay ? weddingDay.getDate() : "";
  const monthNum = weddingDay ? weddingDay.getMonth() + 1 : "";
  const yearNum = weddingDay ? weddingDay.getFullYear() : "";
  const dayOfWeek = weddingDay ? weddingDay.toLocaleDateString("vi-VN", { weekday: "long" }) : "";
  const enDateStr = weddingDay ? `${monthNum}/${dayNum}/${yearNum}` : "";

  return (
    <div className="max-w-md mx-auto overflow-hidden relative" style={{ borderRadius: `${br}px`, background: C.greenDeep, boxShadow: C.shadow }}>
      {/* Toggle bar */}
      <div className="flex items-center justify-center gap-1 p-2" style={{ background: C.greenDeep }}>
        <button onClick={() => setIsOpen(false)} className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
          style={{ fontFamily: BODY, background: !isOpen ? C.cream : "transparent", color: !isOpen ? C.greenDeep : C.greenLight, border: `1px solid ${!isOpen ? C.cream : C.greenMuted}`, fontSize: "0.6rem", letterSpacing: "0.05em" }}>
          Vỏ thiệp
        </button>
        <button onClick={() => setIsOpen(true)} className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
          style={{ fontFamily: BODY, background: isOpen ? C.cream : "transparent", color: isOpen ? C.greenDeep : C.greenLight, border: `1px solid ${isOpen ? C.cream : C.greenMuted}`, fontSize: "0.6rem", letterSpacing: "0.05em" }}>
          Thiệp mở
        </button>
      </div>

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div key="closed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.35 }}>
            {/* Envelope Cover */}
            <div className="relative px-6 py-8 flex items-center justify-center" style={{ background: C.greenDeep, minHeight: 300 }}>
              <LeafBranch className="-left-4 bottom-0" style={{ height: 260, width: 120, opacity: 0.7 }}/>
              <LeafBranch className="-right-4 top-0" style={{ height: 200, width: 100, opacity: 0.5 }} flip/>

              {/* White card */}
              <div className="relative z-10 w-full bg-white py-8 px-6 text-center" style={{ borderRadius: `${br}px`, boxShadow: C.shadowSoft }}>
                <SmallLeaf className="absolute top-2 right-2" style={{ width: 40, height: 60, opacity: 0.2 }}/>
                <SmallLeaf className="absolute bottom-2 left-2" style={{ width: 35, height: 50, opacity: 0.15, transform: "scaleX(-1)" }}/>

                <HeartIcon size={32} color={C.greenDeep}/>
                <div className="mx-auto mt-4"/>

                <h2 style={{ fontFamily: SCRIPT, fontSize: "1.6rem", color: C.textDark, lineHeight: 1.2 }}>
                  {data.couple.groomName || "Chú Rể"}
                </h2>
                <p style={{ fontFamily: DISPLAY, fontSize: "1rem", color: C.greenOlive, margin: "2px 0", fontStyle: "italic" }}>&amp;</p>
                <h2 style={{ fontFamily: SCRIPT, fontSize: "1.6rem", color: C.textDark, lineHeight: 1.2 }}>
                  {data.couple.brideName || "Cô Dâu"}
                </h2>

                <div className="flex items-center justify-center gap-2 my-4">
                  <div className="h-px w-8" style={{ background: C.greenMuted }}/>
                  <SmallLeaf style={{ width: 10, height: 15, opacity: 0.4 }}/>
                  <div className="h-px w-8" style={{ background: C.greenMuted }}/>
                </div>

                <p style={{ fontFamily: BODY, fontSize: "0.7rem", color: C.textBody }}>{dateStr}</p>
                <p style={{ fontFamily: BODY, fontSize: "0.6rem", color: C.textMuted }}>{enDateStr}</p>

                <p className="mt-3" style={{ fontFamily: BODY, fontSize: "0.65rem", color: C.textBody, fontWeight: 500 }}>
                  Thân Mời / Cordially Invites
                </p>
                <div className="mx-auto mt-2 px-4 py-1 border inline-block" style={{ borderColor: C.greenMuted, borderRadius: `${Math.max(4, br - 4)}px` }}>
                  <p style={{ fontFamily: BODY, fontSize: "0.7rem", color: C.textDark, fontWeight: 500 }}>Anh Chị Minh - Thanh</p>
                </div>
                <p className="mt-2" style={{ fontFamily: BODY, fontSize: "0.6rem", color: C.textMuted, fontStyle: "italic" }}>
                  đến dự buổi tiệc chung vui cùng gia đình
                </p>
                <p style={{ fontFamily: BODY, fontSize: "0.55rem", color: C.textLight, fontStyle: "italic" }}>
                  to celebrate with our family
                </p>

                <button onClick={(e) => { e.stopPropagation(); setIsOpen(true); }}
                  className="mt-5 px-6 py-2 rounded-full text-white font-medium transition-transform hover:scale-105 active:scale-95"
                  style={{ background: C.greenDeep, fontFamily: BODY, fontSize: "0.65rem", letterSpacing: "0.06em", cursor: "pointer" }}>
                  Mở thiệp / Open
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="open" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
            {/* Story Section */}
            <div className="px-5 py-6" style={{ background: C.cream }}>
              <p className="text-center mb-4" style={{ fontFamily: BODY, fontSize: "0.6rem", color: C.greenOlive, letterSpacing: "0.12em", textTransform: "uppercase" }}>The Story <span style={{ fontFamily: DISPLAY, fontStyle: "italic" }}>of</span> Love</p>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-20 h-24 overflow-hidden flex-shrink-0" style={{ borderRadius: `${br}px`, transform: "rotate(-3deg)", boxShadow: C.shadowSoft }}>
                  <img src={heroWedding} alt="Groom" className="w-full h-full object-cover"/>
                </div>
                <div className="pt-2">
                  <p style={{ fontFamily: BODY, fontSize: "0.5rem", color: C.textMuted }}>Phượng Nam / Groom</p>
                  <p style={{ fontFamily: SCRIPT, fontSize: "1rem", color: C.textDark }}>{data.couple.groomName}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 justify-end">
                <div className="pt-2 text-right">
                  <p style={{ fontFamily: BODY, fontSize: "0.5rem", color: C.textMuted }}>Cô Dâu / Bride</p>
                  <p style={{ fontFamily: SCRIPT, fontSize: "1rem", color: C.textDark }}>{data.couple.brideName}</p>
                </div>
                <div className="w-20 h-24 overflow-hidden flex-shrink-0" style={{ borderRadius: `${br}px`, transform: "rotate(3deg)", boxShadow: C.shadowSoft }}>
                  <img src={heroWedding} alt="Bride" className="w-full h-full object-cover"/>
                </div>
              </div>
            </div>

            {/* Album mini */}
            <div className="px-5 py-4" style={{ background: C.creamWarm }}>
              <p className="text-center mb-3" style={{ fontFamily: BODY, fontSize: "0.6rem", color: C.greenOlive, letterSpacing: "0.1em", textTransform: "uppercase" }}>Album ảnh cưới</p>
              <div className="grid grid-cols-2 gap-1.5">
                {[heroWedding, heroWedding, heroWedding, heroWedding].map((img, i) => (
                  <div key={i} className="aspect-square overflow-hidden" style={{ borderRadius: `${Math.max(4, br - 4)}px` }}>
                    <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover"/>
                  </div>
                ))}
              </div>
            </div>

            {/* Ceremony mini */}
            <div className="px-5 py-6 text-center" style={{ background: C.greenDeep }}>
              <p style={{ fontFamily: BODY, fontSize: "0.6rem", color: C.greenLight, letterSpacing: "0.1em", textTransform: "uppercase" }}>Thông tin lễ cưới</p>
              <p className="mt-3" style={{ fontFamily: DISPLAY, fontSize: "1.8rem", color: C.cream, fontWeight: 700 }}>{data.event.time || "09:00"}</p>
              <p className="mt-1" style={{ fontFamily: BODY, fontSize: "0.6rem", color: C.greenLight }}>{dateStr}</p>
              <div className="grid grid-cols-4 gap-1.5 mt-4">
                {countdown.map(d => (
                  <div key={d.l} className="py-1.5 text-center rounded" style={{ background: "rgba(255,255,255,0.08)", border: `1px solid ${C.greenMuted}` }}>
                    <p style={{ fontFamily: DISPLAY, fontSize: "0.85rem", color: C.cream, fontWeight: 700 }}>{d.n}</p>
                    <p style={{ fontFamily: BODY, fontSize: "0.35rem", color: C.greenLight, textTransform: "uppercase", letterSpacing: "0.1em" }}>{d.l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Wishes mini */}
            <div className="px-5 py-4" style={{ background: C.cream }}>
              <p className="text-center mb-2" style={{ fontFamily: BODY, fontSize: "0.6rem", color: C.greenOlive, letterSpacing: "0.1em", textTransform: "uppercase" }}>Sổ lưu bút</p>
              <div className="h-6 rounded mb-1.5 border" style={{ borderColor: C.greenMuted, background: C.paper }}/>
              <div className="h-10 rounded mb-1.5 border" style={{ borderColor: C.greenMuted, background: C.paper }}/>
              <div className="h-6 rounded" style={{ background: C.greenDeep }}/>
            </div>

            {/* Gift mini */}
            <div className="px-5 py-5 text-center" style={{ background: C.creamWarm }}>
              <p style={{ fontFamily: BODY, fontSize: "0.6rem", color: C.greenOlive, letterSpacing: "0.1em", textTransform: "uppercase" }}>Hộp mừng cưới</p>
              <div className="w-16 h-20 mx-auto mt-3 rounded-lg flex items-center justify-center" style={{ background: C.giftRed, boxShadow: "0 4px 12px rgba(201,64,64,0.3)" }}>
                <Gift className="text-yellow-300" style={{ width: 20, height: 20 }}/>
              </div>
            </div>

            {/* Footer */}
            <div className="py-3 text-center" style={{ background: C.greenDeep }}>
              <p style={{ fontFamily: BODY, fontSize: "0.55rem", color: C.greenLight, opacity: 0.7 }}>Thiệp cưới bởi DUCO</p>
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
  const enDateStr = weddingDay ? `${monthNum}/${dayNum}/${yearNum}` : "";

  const [wishName, setWishName] = useState("");
  const [wishText, setWishText] = useState("");
  const [localWishes, setLocalWishes] = useState<{name: string; text: string; time: string}[]>([]);

  const defaultWishes = [
    { name: "Lương Anh Quốc", text: "Chúc vợ chồng bạn trăm năm hạnh phúc, sớm có tin vui!", time: "2 giờ trước" },
    { name: "Quỳnh Như", text: "Hy vọng cả 2 sẽ mãi mãi hạnh phúc bên nhau nhé!", time: "5 giờ trước" },
    { name: "Bảo Trang - Gia Hội", text: "Mừng cưới anh chị! Hạnh phúc viên mãn nha!", time: "1 ngày trước" },
    { name: "Quý Thanh", text: "Trăng rỡ vong cao, đẹp đôi nên có hai bạn đẹp lắm!", time: "2 ngày trước" },
    { name: "Quỳ Thảo", text: "Chúc cả 2 hạnh phúc mãi mãi, sớm có tin vui nhé.", time: "3 ngày trước" },
  ];

  const handleWish = () => {
    if (!wishName.trim() || !wishText.trim()) return;
    setLocalWishes(prev => [{ name: wishName, text: wishText, time: "Vừa xong" }, ...prev]);
    setWishName(""); setWishText("");
  };

  const allWishes = [...localWishes, ...defaultWishes];
  const galleryImages = data.gallery?.length > 0 ? data.gallery.slice(0, 4) : [heroWedding, heroWedding, heroWedding, heroWedding];

  return (
    <div className="min-h-screen" style={{ background: C.cream, fontFamily: BODY, overflowX: "hidden" }}>

      {/* ═══ FLOATING LEAVES ═══ */}
      {isOpen && <FloatingLeaves />}

      {/* ═══ ENVELOPE COVER ═══ */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: C.greenDeep }}
            exit={{ opacity: 0, filter: "blur(8px)", scale: 1.04 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Background leaf decorations */}
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.5, delay: 0.3 }}>
              <LeafBranch className="-left-4 bottom-0" style={{ height: 400, width: 180 }}/>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.5, delay: 0.3 }}>
              <LeafBranch className="-right-4 top-0" style={{ height: 300, width: 140 }} flip/>
            </motion.div>

            {/* Floating small leaves */}
            <FloatingElement amplitude={5} duration={5} className="absolute top-20 right-1/4 pointer-events-none">
              <SmallLeaf style={{ opacity: 0.15, width: 30, height: 45 }}/>
            </FloatingElement>
            <FloatingElement amplitude={4} duration={6} className="absolute bottom-32 left-1/3 pointer-events-none">
              <SmallLeaf style={{ opacity: 0.1, width: 25, height: 38, transform: "scaleX(-1)" }}/>
            </FloatingElement>

            {/* White Envelope Card */}
            <motion.div
              className="relative w-[88%] max-w-[400px] flex flex-col items-center justify-center px-8 py-10"
              style={{ borderRadius: `${br + 4}px`, background: C.white, boxShadow: "0 24px 80px rgba(0,0,0,0.2)" }}
              initial={{ y: 40, opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ y: -80, opacity: 0, scale: 1.08, filter: "blur(12px)" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Leaf decorations on card */}
              <SmallLeaf className="absolute top-3 right-3" style={{ width: 50, height: 75, opacity: 0.15 }}/>
              <SmallLeaf className="absolute bottom-3 left-3" style={{ width: 45, height: 65, opacity: 0.12, transform: "scaleX(-1) rotate(20deg)" }}/>

              {/* Heart Icon */}
              <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}>
                <HeartIcon size={40} color={C.greenDeep}/>
              </motion.div>

              <div className="mb-4"/>

              {/* Names */}
              <motion.h1 style={{ fontFamily: SCRIPT, fontSize: "2.2rem", color: C.textDark, lineHeight: 1.2 }}
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}>
                {data.couple.groomName || "Chú Rể"}
              </motion.h1>
              <motion.p style={{ fontFamily: DISPLAY, fontSize: "1.2rem", color: C.greenOlive, fontStyle: "italic" }}
                initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.8 }}>
                &amp;
              </motion.p>
              <motion.h1 style={{ fontFamily: SCRIPT, fontSize: "2.2rem", color: C.textDark, lineHeight: 1.2 }}
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.9 }}>
                {data.couple.brideName || "Cô Dâu"}
              </motion.h1>

              {/* Divider */}
              <motion.div className="flex items-center gap-2 my-5"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                <div className="h-px w-10" style={{ background: C.greenMuted }}/>
                <SmallLeaf style={{ width: 12, height: 18, opacity: 0.4 }}/>
                <div className="h-px w-10" style={{ background: C.greenMuted }}/>
              </motion.div>

              {/* Date */}
              <motion.p style={{ fontFamily: BODY, fontSize: "0.85rem", color: C.textBody }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
                {dateStr}
              </motion.p>
              <motion.p style={{ fontFamily: BODY, fontSize: "0.75rem", color: C.textMuted }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.15 }}>
                {enDateStr}
              </motion.p>

              {/* Cordially Invites */}
              <motion.p className="mt-4" style={{ fontFamily: BODY, fontSize: "0.8rem", color: C.textBody, fontWeight: 500 }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
                Thân Mời / Cordially Invites
              </motion.p>
              <motion.div className="mt-2 px-5 py-1.5 border" style={{ borderColor: C.greenMuted, borderRadius: `${Math.max(4, br - 4)}px` }}
                initial={{ opacity: 0, scaleX: 0.5 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: 1.3 }}>
                <p style={{ fontFamily: BODY, fontSize: "0.85rem", color: C.textDark, fontWeight: 500 }}>Anh Chị Minh - Thanh</p>
              </motion.div>
              <motion.p className="mt-2" style={{ fontFamily: BODY, fontSize: "0.75rem", color: C.textMuted, fontStyle: "italic" }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
                đến dự buổi tiệc chung vui cùng gia đình
              </motion.p>
              <motion.p style={{ fontFamily: BODY, fontSize: "0.7rem", color: C.textLight, fontStyle: "italic" }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.45 }}>
                to celebrate with our family
              </motion.p>

              {/* CTA Button */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6 }}>
                <ShimmerButton
                  onClick={() => setIsOpen(true)}
                  className="mt-6 px-10 py-3 rounded-full text-white font-medium"
                  style={{ background: C.greenDeep, fontFamily: BODY, fontSize: "0.85rem", letterSpacing: "0.05em", boxShadow: `0 6px 24px rgba(45,74,46,0.4)` }}
                >
                  Mở thiệp / Open
                </ShimmerButton>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ INNER CONTENT ═══ */}
      <div className="relative z-10">

        {/* 1. COUPLE / STORY SECTION */}
        <section className="relative py-16 md:py-24 px-6 overflow-hidden" style={{ background: C.cream }}>
          <LeafBranch className="-left-8 bottom-0" style={{ height: 350, width: 150, opacity: 0.5 }}/>
          <LeafBranch className="-right-8 top-10" style={{ height: 280, width: 120, opacity: 0.35 }} flip/>

          <div className="relative z-10 max-w-xl mx-auto">
            <FadeInSection className="text-center mb-10">
              <p style={{ fontFamily: BODY, fontSize: "0.7rem", color: C.greenOlive, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                The Story <span style={{ fontFamily: DISPLAY, fontStyle: "italic", fontSize: "0.85rem" }}>of</span> Love
              </p>
            </FadeInSection>

            {/* Groom */}
            <ScaleInView delay={0.1} className="flex items-start gap-6 mb-10">
              <motion.div className="w-40 h-52 md:w-48 md:h-60 overflow-hidden flex-shrink-0"
                style={{ borderRadius: `${br}px`, transform: "rotate(-4deg)", boxShadow: C.shadow }}>
                <img src={data.gallery?.[0] || heroWedding} alt="Groom" className="w-full h-full object-cover"/>
              </motion.div>
              <div className="pt-6">
                <p style={{ fontFamily: BODY, fontSize: "0.65rem", color: C.textMuted, letterSpacing: "0.08em" }}>Phượng Nam / Groom</p>
                <h3 style={{ fontFamily: SCRIPT, fontSize: "1.8rem", color: C.textDark, marginTop: 4 }}>{data.couple.groomName}</h3>
              </div>
            </ScaleInView>

            {/* Bride */}
            <ScaleInView delay={0.2} className="flex items-start gap-6 justify-end">
              <div className="pt-6 text-right">
                <p style={{ fontFamily: BODY, fontSize: "0.65rem", color: C.textMuted, letterSpacing: "0.08em" }}>Cô Dâu / Bride</p>
                <h3 style={{ fontFamily: SCRIPT, fontSize: "1.8rem", color: C.textDark, marginTop: 4 }}>{data.couple.brideName}</h3>
              </div>
              <motion.div className="w-40 h-52 md:w-48 md:h-60 overflow-hidden flex-shrink-0"
                style={{ borderRadius: `${br}px`, transform: "rotate(4deg)", boxShadow: C.shadow }}>
                <img src={data.gallery?.[1] || heroWedding} alt="Bride" className="w-full h-full object-cover"/>
              </motion.div>
            </ScaleInView>
          </div>
        </section>

        {/* 2. ALBUM SECTION */}
        <section className="py-16 md:py-20 px-6" style={{ background: C.creamWarm }}>
          <FadeInSection><SectionTitle sub="Khoảnh khắc đẹp nhất">Album Ảnh Cưới</SectionTitle></FadeInSection>
          <div className="max-w-2xl mx-auto grid grid-cols-2 gap-3 md:gap-4">
            {galleryImages.map((img, i) => (
              <motion.div key={i} className="aspect-square overflow-hidden group"
                style={{ borderRadius: `${br}px`, boxShadow: C.shadowCard }}
                initial={{ opacity: 0, y: 30, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}>
                <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"/>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 3. CEREMONY INFO SECTION (DARK GREEN) */}
        <section className="py-16 md:py-24 px-6 relative" style={{ background: C.greenDeep }}>
          <LeafBranch className="-left-6 top-0" style={{ height: 300, width: 120, opacity: 0.3 }}/>
          <LeafBranch className="-right-6 bottom-0" style={{ height: 250, width: 100, opacity: 0.25 }} flip/>
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")` }}/>

          <div className="relative z-10 max-w-xl mx-auto text-center">
            <FadeInSection>
              <SectionTitle light sub="Ceremony Info">Thông Tin Lễ Cưới</SectionTitle>
            </FadeInSection>

            {/* Family info */}
            <StaggerContainer className="grid grid-cols-2 gap-6 md:gap-12 mb-12">
              <StaggerItem className="text-right pr-4 md:pr-6 border-r" style={{ borderColor: C.greenMuted }}>
                <p style={{ fontFamily: BODY, fontSize: "0.6rem", color: C.greenLight, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>Ông Bà Nhà Gái</p>
                <p className="mt-2" style={{ fontFamily: DISPLAY, fontSize: "1rem", color: C.cream, fontWeight: 500 }}>Nguyễn Trường Phước</p>
                <p style={{ fontFamily: DISPLAY, fontSize: "1rem", color: C.cream, fontWeight: 500 }}>Trần Văn Mạnh</p>
              </StaggerItem>
              <StaggerItem className="text-left pl-4 md:pl-6">
                <p style={{ fontFamily: BODY, fontSize: "0.6rem", color: C.greenLight, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>Ông Bà Nhà Trai</p>
                <p className="mt-2" style={{ fontFamily: DISPLAY, fontSize: "1rem", color: C.cream, fontWeight: 500 }}>Trần Văn Mạnh</p>
                <p style={{ fontFamily: DISPLAY, fontSize: "1rem", color: C.cream, fontWeight: 500 }}>Phạm Thị Kim Chánh</p>
              </StaggerItem>
            </StaggerContainer>

            {/* Announcement */}
            <FadeInSection>
              <p style={{ fontFamily: BODY, fontSize: "0.7rem", color: C.greenLight, letterSpacing: "0.1em", textTransform: "uppercase" }}>Trân trọng báo tin</p>
              <p style={{ fontFamily: BODY, fontSize: "0.7rem", color: C.greenLight, marginTop: 4 }}>Lễ thành hôn của con chúng tôi</p>
              <p style={{ fontFamily: BODY, fontSize: "0.6rem", color: "rgba(255,255,255,0.4)", fontStyle: "italic", marginTop: 2 }}>The joyfully announce the wedding of our children</p>

              <h2 className="mt-6" style={{ fontFamily: SCRIPT, fontSize: "clamp(2rem, 7vw, 3rem)", color: C.cream }}>
                {data.couple.groomName}
              </h2>
              <p style={{ fontFamily: DISPLAY, fontSize: "1.2rem", color: C.greenLight, fontStyle: "italic", margin: "4px 0" }}>&amp;</p>
              <h2 style={{ fontFamily: SCRIPT, fontSize: "clamp(2rem, 7vw, 3rem)", color: C.cream }}>
                {data.couple.brideName}
              </h2>
            </FadeInSection>

            <AnimatedDivider width="4rem" className="my-8" color={C.greenMuted}/>

            {/* Ceremony time */}
            <FadeInSection>
              <p style={{ fontFamily: BODY, fontSize: "0.7rem", color: C.greenLight, letterSpacing: "0.1em", textTransform: "uppercase" }}>Lễ thành hôn sẽ cử hành tại</p>
              <p style={{ fontFamily: BODY, fontSize: "0.6rem", color: "rgba(255,255,255,0.4)", fontStyle: "italic" }}>Wedding ceremony at</p>
              <p style={{ fontFamily: BODY, fontSize: "0.6rem", color: "rgba(255,255,255,0.4)", fontStyle: "italic" }}>Danh thiep at</p>
              <p className="mt-2" style={{ fontFamily: BODY, fontSize: "0.6rem", color: C.greenLight, textTransform: "uppercase", letterSpacing: "0.08em" }}>Vào Lúc / At</p>
              <p style={{ fontFamily: DISPLAY, fontSize: "3rem", color: C.cream, fontWeight: 700 }}>{data.event.time || "09:00"}</p>

              <div className="flex items-center justify-center gap-3 my-4">
                <div className="text-right">
                  <p style={{ fontFamily: BODY, fontSize: "0.75rem", color: C.greenLight, textTransform: "uppercase" }}>{dayOfWeek}</p>
                </div>
                <div className="px-3 py-1 border-x" style={{ borderColor: C.greenMuted }}>
                  <p style={{ fontFamily: DISPLAY, fontSize: "2.2rem", color: C.cream, fontWeight: 700, lineHeight: 1 }}>{String(dayNum).padStart(2, "0")}</p>
                </div>
                <div className="text-left">
                  <p style={{ fontFamily: BODY, fontSize: "0.75rem", color: C.greenLight }}>THÁNG {String(monthNum).padStart(2, "0")}</p>
                </div>
              </div>
              <p style={{ fontFamily: DISPLAY, fontSize: "1.6rem", color: C.cream, fontWeight: 700 }}>{yearNum}</p>
              <p className="mt-2" style={{ fontFamily: BODY, fontSize: "0.65rem", color: "rgba(255,255,255,0.4)", fontStyle: "italic" }}>
                (tức ngày 14/10 âm lịch năm Ất tỵ)
              </p>
            </FadeInSection>

            <AnimatedDivider width="3rem" className="my-8" color={C.greenMuted}/>

            {/* Reception */}
            <FadeInSection>
              <p style={{ fontFamily: BODY, fontSize: "0.7rem", color: C.greenLight, letterSpacing: "0.1em", textTransform: "uppercase" }}>Thông tin tiệc cưới / Reception Info</p>
              <p className="mt-4" style={{ fontFamily: DISPLAY, fontSize: "1.2rem", color: C.cream, fontWeight: 600, textTransform: "uppercase" }}>Tiệc cưới sẽ diễn ra vào lúc</p>
              <p style={{ fontFamily: BODY, fontSize: "0.6rem", color: "rgba(255,255,255,0.4)", fontStyle: "italic" }}>The reception will take place at</p>

              <p className="mt-4" style={{ fontFamily: DISPLAY, fontSize: "2.5rem", color: C.cream, fontWeight: 700 }}>18:00</p>
              <div className="flex items-center justify-center gap-3 my-3">
                <p style={{ fontFamily: BODY, fontSize: "0.7rem", color: C.greenLight, textTransform: "uppercase" }}>{dayOfWeek}</p>
                <div className="px-3 py-1 border-x" style={{ borderColor: C.greenMuted }}>
                  <p style={{ fontFamily: DISPLAY, fontSize: "1.8rem", color: C.cream, fontWeight: 700, lineHeight: 1 }}>{String(dayNum).padStart(2, "0")}</p>
                </div>
                <p style={{ fontFamily: BODY, fontSize: "0.7rem", color: C.greenLight }}>THÁNG {String(monthNum).padStart(2, "0")}</p>
              </div>
              <p style={{ fontFamily: DISPLAY, fontSize: "1.4rem", color: C.cream, fontWeight: 700 }}>{yearNum}</p>
            </FadeInSection>

            {/* Countdown */}
            <div className="mt-10 grid grid-cols-4 gap-3">
              {countdown.map((d, i) => (
                <CountdownPop key={d.l} delay={0.1 + i * 0.1}>
                  <div className="py-3 text-center rounded-lg" style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${C.greenMuted}` }}>
                    <p style={{ fontFamily: DISPLAY, fontSize: "1.4rem", color: C.cream, fontWeight: 700 }}>{d.n}</p>
                    <p style={{ fontFamily: BODY, fontSize: "0.5rem", color: C.greenLight, textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 2 }}>{d.l}</p>
                  </div>
                </CountdownPop>
              ))}
            </div>

            {/* Confirm button */}
            <FadeInSection className="mt-10">
              <button className="px-8 py-3 rounded-full text-white font-medium border transition-all hover:bg-white/10"
                style={{ borderColor: C.greenLight, fontFamily: BODY, fontSize: "0.8rem", letterSpacing: "0.06em" }}>
                Xác nhận / Confirm
              </button>
            </FadeInSection>
          </div>
        </section>

        {/* 4. MAP SECTION */}
        <section className="py-16 md:py-20 px-6" style={{ background: C.greenDeep }}>
          <FadeInSection><SectionTitle light sub="Wedding Reception Venue">Tiệc Cưới Sẽ Tổ Chức Tại</SectionTitle></FadeInSection>
          <div className="max-w-2xl mx-auto text-center">
            <p style={{ fontFamily: DISPLAY, fontSize: "1.1rem", color: C.cream, fontWeight: 500 }}>{data.event.venue}</p>
            <p className="mt-1 flex items-center justify-center gap-1" style={{ fontFamily: BODY, fontSize: "0.8rem", color: C.greenLight }}>
              <MapPin className="w-3.5 h-3.5"/>{data.event.address}
            </p>
            {data.map.embedUrl ? (
              <div className="mt-6 overflow-hidden bg-white p-2" style={{ borderRadius: `${br}px`, boxShadow: C.shadow }}>
                <iframe src={data.map.embedUrl} className="w-full h-64 md:h-80 rounded-lg" loading="lazy" title="Map"/>
              </div>
            ) : (
              <div className="mt-6 h-64 flex items-center justify-center bg-white border border-dashed" style={{ borderColor: C.greenMuted, borderRadius: `${br}px` }}>
                <p style={{ fontFamily: BODY, fontSize: "0.85rem", color: C.textMuted }}><MapPin className="inline w-4 h-4 mr-1"/>Bản đồ Google Maps</p>
              </div>
            )}
          </div>
        </section>

        {/* 5. GUESTBOOK SECTION */}
        <section className="py-16 md:py-20 px-6" style={{ background: C.cream }}>
          <LeafBranch className="-right-6 top-0" style={{ height: 250, width: 100, opacity: 0.2 }} flip/>
          <div className="relative z-10 max-w-2xl mx-auto">
            <FadeInSection><SectionTitle sub="Guestbook">Sổ Lưu Bút</SectionTitle></FadeInSection>

            {/* Form */}
            <FadeInSection className="bg-white p-6 md:p-8 mb-8" style={{ borderRadius: `${br}px`, boxShadow: C.shadow, border: `1px solid ${C.greenSheer}` }}>
              <input value={wishName} onChange={e => setWishName(e.target.value)} placeholder="Anh Chị Minh - Thanh"
                className="w-full p-3 mb-3 border outline-none focus:border-green-600 transition-colors"
                style={{ fontFamily: BODY, fontSize: "0.85rem", borderColor: C.greenMuted, borderRadius: `${Math.max(4, br - 4)}px`, background: C.paper }}/>
              <textarea value={wishText} onChange={e => setWishText(e.target.value)} placeholder="Nhập lời chúc của bạn / Enter your wishes for the couple"
                className="w-full p-3 mb-4 border outline-none focus:border-green-600 transition-colors resize-none h-24"
                style={{ fontFamily: BODY, fontSize: "0.85rem", borderColor: C.greenMuted, borderRadius: `${Math.max(4, br - 4)}px`, background: C.paper }}/>
              <button onClick={handleWish}
                className="w-full py-3 text-white font-medium flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
                style={{ background: C.greenDeep, borderRadius: `${Math.max(4, br - 4)}px`, fontFamily: BODY, fontSize: "0.8rem", letterSpacing: "0.05em" }}>
                <Send className="w-4 h-4"/>GỬI LỜI CHÚC / SEND WISHES
              </button>
            </FadeInSection>

            {/* Wishes list */}
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {allWishes.map((w, i) => (
                <motion.div key={`${w.name}-${i}`} className="p-4 bg-white border-l-4"
                  style={{ borderColor: C.greenOlive, borderRadius: `0 ${br}px ${br}px 0`, boxShadow: C.shadowCard }}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}>
                  <p style={{ fontFamily: BODY, fontSize: "0.8rem", color: C.greenDeep, fontWeight: 600 }}>{w.name}</p>
                  <p className="mt-1" style={{ fontFamily: BODY, fontSize: "0.8rem", color: C.textBody, lineHeight: 1.6 }}>{w.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. GIFT SECTION */}
        <section className="py-16 md:py-20 px-6" style={{ background: C.creamWarm }}>
          <LeafBranch className="-left-6 bottom-0" style={{ height: 200, width: 90, opacity: 0.2 }}/>
          <LeafBranch className="-right-6 bottom-0" style={{ height: 180, width: 80, opacity: 0.15 }} flip/>
          <div className="relative z-10 max-w-md mx-auto text-center">
            <FadeInSection>
              <h2 style={{ fontFamily: DISPLAY, fontSize: "1.8rem", color: C.textDark, fontWeight: 600 }}>Hộp Mừng Cưới</h2>
              <p className="mt-1" style={{ fontFamily: BODY, fontSize: "0.8rem", color: C.textMuted, fontStyle: "italic" }}>Wedding Gift</p>
            </FadeInSection>

            <ScaleInView delay={0.2} className="mt-8">
              <div className="w-28 h-36 mx-auto rounded-xl flex flex-col items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${C.giftRed}, #b83030)`, boxShadow: "0 8px 32px rgba(201,64,64,0.3)" }}>
                <Gift className="text-yellow-300 mb-1" style={{ width: 32, height: 32 }}/>
                <div className="w-8 h-0.5 bg-yellow-300/50 rounded mt-1"/>
              </div>
              <p className="mt-4" style={{ fontFamily: BODY, fontSize: "0.75rem", color: C.textMuted }}>
                Sự hiện diện của quý khách là món quà quý nhất cùng gia đình cho chúng tôi.
              </p>
            </ScaleInView>
          </div>
        </section>

        {/* 8. FOOTER */}
        <FadeInSection className="py-8 text-center" style={{ background: C.greenDeep }}>
          <SmallLeaf className="mx-auto" style={{ width: 24, height: 36, opacity: 0.3 }}/>
          <p className="mt-3" style={{ fontFamily: DISPLAY, fontSize: "0.9rem", color: C.greenLight, fontStyle: "italic" }}>
            Sự hiện diện của quý khách là niềm vinh hạnh cho gia đình chúng tôi!
          </p>
          <p className="mt-2" style={{ fontFamily: BODY, fontSize: "0.65rem", color: "rgba(255,255,255,0.3)" }}>
            Thiệp cưới bởi DUCO
          </p>
        </FadeInSection>
      </div>
    </div>
  );
}

export const pageStyle: CSSProperties = { background: C.cream };
