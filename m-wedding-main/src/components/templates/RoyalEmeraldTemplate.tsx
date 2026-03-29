import { MapPin, Clock, Heart, Calendar, Gift, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import heroWedding from "@/assets/hero-wedding.jpg";
import type { InvitationData } from "@/types/invitation";
import { formatViDate, getCountdownItems } from "@/types/invitation";
import type { CSSProperties } from "react";

/* ═══════════════════════════════════════════════════════════════════
   ROYAL EMERALD WEDDING TEMPLATE
   Premium · Editorial · Luxury Green Wedding
   ─────────────────────────────────────────────
   Palette : Deep forest green / Antique gold / Warm ivory
   Fonts   : Pinyon Script (display) + EB Garamond (body)
   Design  : Full-bleed hero, frosted glass, editorial spacing
   ═══════════════════════════════════════════════════════════════════ */

/* ── Design Tokens ── */
const C = {
  forest:     "#163b2e",
  emerald:    "#1e5c47",
  sage:       "#3d7a65",
  gold:       "#c8a951",
  goldLight:  "#ddc06f",
  goldMuted:  "rgba(200,169,81,0.25)",
  goldSheer:  "rgba(200,169,81,0.08)",
  ivory:      "#faf7f0",
  cream:      "#f3ede1",
  paper:      "#fffdf8",
  textDark:   "#1b3329",
  textBody:   "#5e7a6e",
  textLight:  "#8da69a",
  shadow:     "0 8px 40px rgba(22,59,46,0.08)",
  shadowCard: "0 2px 20px rgba(22,59,46,0.06)",
} as const;

const DISPLAY = "'Pinyon Script', cursive";
const SERIF   = "'EB Garamond', serif";
const BODY    = "'EB Garamond', serif";

/* ── Google Fonts (injected once) ── */
const fontLink = document.querySelector("link[data-royal-emerald]");
if (!fontLink) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.dataset.royalEmerald = "1";
  link.href =
    "https://fonts.googleapis.com/css2?family=Pinyon+Script&family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap";
  document.head.appendChild(link);
}

/* ═══════════════════════════════════════════════════════════════════
   SHARED DECORATIVE COMPONENTS
   ═══════════════════════════════════════════════════════════════════ */

function GoldLine({ w = 72, className = "" }: { w?: number; className?: string }) {
  return (
    <div
      className={`mx-auto ${className}`}
      style={{ width: w, height: 1, background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)` }}
    />
  );
}

function OrnamentalDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-5 ${className}`}>
      <div className="h-px w-16 md:w-24" style={{ background: `linear-gradient(90deg, transparent, ${C.goldMuted})` }} />
      <Heart className="h-3 w-3 shrink-0" style={{ color: C.gold }} fill={C.gold} />
      <div className="h-px w-16 md:w-24" style={{ background: `linear-gradient(90deg, ${C.goldMuted}, transparent)` }} />
    </div>
  );
}

/* Botanical SVG leaf decoration */
function BotanicalLeaf({ className = "", size = 140, flip = false }: { className?: string; size?: number; flip?: boolean }) {
  return (
    <svg
      className={`absolute pointer-events-none select-none ${className}`}
      width={size}
      height={size * 1.6}
      viewBox="0 0 140 224"
      fill="none"
      style={{ opacity: 0.04, transform: flip ? "scaleX(-1)" : undefined }}
    >
      <path d="M70 8C70 8 25 55 18 110C11 165 40 210 70 212C100 210 129 165 122 110C115 55 70 8 70 8Z" fill={C.forest} />
      <path d="M70 30C70 30 50 75 47 120C44 165 58 195 70 195C82 195 96 165 93 120C90 75 70 30 70 30Z" fill={C.forest} opacity={0.5} />
      <line x1="70" y1="15" x2="70" y2="205" stroke={C.forest} strokeWidth="0.6" opacity={0.25} />
    </svg>
  );
}

/* Subtle ornamental corner */
function OrnamentalCorner({ className = "" }: { className?: string }) {
  return (
    <svg className={`absolute pointer-events-none select-none ${className}`} width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ opacity: 0.12 }}>
      <path d="M2 78C2 78 2 40 20 22C38 4 78 2 78 2" stroke={C.gold} strokeWidth="0.8" fill="none" />
      <path d="M10 78C10 78 10 45 25 30C40 15 78 10 78 10" stroke={C.gold} strokeWidth="0.5" fill="none" />
      <circle cx="78" cy="2" r="2" fill={C.gold} opacity="0.5" />
      <circle cx="2" cy="78" r="2" fill={C.gold} opacity="0.5" />
    </svg>
  );
}


/* ═══════════════════════════════════════════════════════════════════
   PREVIEW CARD  (Builder LivePreview panel — compact version)
   ═══════════════════════════════════════════════════════════════════ */
export function PreviewCard({ data }: { data: InvitationData }) {
  const br = data.theme.borderRadius;
  const formattedDate = formatViDate(data.event.date);
  const countdownItems = getCountdownItems(data.event.date);

  return (
    <div className="max-w-lg mx-auto overflow-hidden" style={{ borderRadius: `${br}px`, background: C.ivory, boxShadow: C.shadow }}>

      {/* ── Hero (2-col compact) ── */}
      <div className="relative" style={{ background: C.ivory }}>
        <OrnamentalCorner className="top-2 left-2 rotate-0" />
        <OrnamentalCorner className="top-2 right-2 -scale-x-100" />

        <div className="grid grid-cols-2 gap-0">
          {/* Left text */}
          <div className="flex flex-col justify-center px-5 py-10 relative z-10">
            <p style={{ fontFamily: BODY, fontSize: "0.5rem", letterSpacing: "0.25em", textTransform: "uppercase", color: C.sage, marginBottom: 10, fontWeight: 500 }}>
              Chúng mình sắp cưới
            </p>
            <p style={{ fontFamily: DISPLAY, fontSize: "1.8rem", color: C.forest, lineHeight: 1.05 }}>
              {data.couple.brideName || "Cô dâu"}
            </p>
            <p style={{ fontFamily: DISPLAY, fontSize: "1rem", color: C.gold, margin: "4px 0 2px 12px" }}>&amp;</p>
            <p style={{ fontFamily: DISPLAY, fontSize: "1.8rem", color: C.forest, lineHeight: 1.05 }}>
              {data.couple.groomName || "Chú rể"}
            </p>
            <div className="mt-4" style={{ width: 40, height: 1, background: `linear-gradient(90deg, ${C.gold}, transparent)` }} />
            <p className="mt-3" style={{ fontFamily: BODY, fontSize: "0.55rem", color: C.textBody, letterSpacing: "0.04em" }}>
              Ngày {formattedDate}
            </p>
            {/* Mini CTA */}
            <div
              className="mt-4 inline-flex items-center justify-center self-start px-4 py-1.5 rounded-full text-white"
              style={{ fontFamily: BODY, fontSize: "0.5rem", letterSpacing: "0.12em", textTransform: "uppercase", background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})` }}
            >
              Mở thiệp mời
            </div>
          </div>

          {/* Right image */}
          <div className="relative overflow-hidden" style={{ borderRadius: `0 ${br}px 0 0` }}>
            <img src={heroWedding} alt="Couple" className="w-full h-full object-cover" style={{ minHeight: 260 }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 70%, rgba(22,59,46,0.06))" }} />
            {/* Inner rounded frame overlay */}
            <div className="absolute inset-3 rounded-2xl border" style={{ borderColor: "rgba(255,253,248,0.3)" }} />
          </div>
        </div>
      </div>

      {/* ── Countdown ── */}
      <div className="py-6 px-5" style={{ background: C.forest }}>
        <p className="text-center mb-1" style={{ fontFamily: DISPLAY, fontSize: "1.15rem", color: C.goldLight }}>
          Đếm Ngược Ngày Hạnh Phúc
        </p>
        <GoldLine w={40} className="mb-4" />
        <div className="grid grid-cols-4 gap-2">
          {countdownItems.map((d) => (
            <div
              key={d.l}
              className="text-center py-2.5 border backdrop-blur-sm"
              style={{ borderColor: "rgba(200,169,81,0.18)", borderRadius: Math.max(6, br - 4), background: "rgba(255,253,248,0.03)" }}
            >
              <p style={{ fontFamily: SERIF, fontSize: "1.1rem", color: C.goldLight, fontWeight: 600 }}>{d.n}</p>
              <p style={{ fontFamily: BODY, fontSize: "0.42rem", color: "rgba(200,169,81,0.5)", textTransform: "uppercase", letterSpacing: "0.18em", marginTop: 2 }}>{d.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Couple ── */}
      <div className="px-5 py-8" style={{ background: C.ivory }}>
        <OrnamentalDivider className="mb-6" />
        <p className="text-center mb-1" style={{ fontFamily: DISPLAY, fontSize: "1.2rem", color: C.forest }}>
          Cô Dâu &amp; Chú Rể
        </p>
        <GoldLine w={40} className="mb-6" />
        <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center">
          {/* Bride */}
          <div className="bg-white rounded-2xl p-4 text-center" style={{ boxShadow: C.shadowCard }}>
            <div className="w-16 h-16 rounded-full mx-auto mb-3 overflow-hidden border-2" style={{ borderColor: C.goldMuted }}>
              <img src={heroWedding} alt="Bride" className="w-full h-full object-cover" />
            </div>
            <p style={{ fontFamily: DISPLAY, fontSize: "0.95rem", color: C.forest }}>{data.couple.brideName || "Cô dâu"}</p>
            <p style={{ fontFamily: BODY, fontSize: "0.45rem", color: C.textLight, marginTop: 2 }}>Daughter · Nhà gái</p>
          </div>
          {/* Heart */}
          <Heart className="h-3.5 w-3.5 shrink-0" style={{ color: C.gold }} fill={C.gold} />
          {/* Groom */}
          <div className="bg-white rounded-2xl p-4 text-center" style={{ boxShadow: C.shadowCard }}>
            <div className="w-16 h-16 rounded-full mx-auto mb-3 overflow-hidden border-2" style={{ borderColor: C.goldMuted }}>
              <img src={heroWedding} alt="Groom" className="w-full h-full object-cover" />
            </div>
            <p style={{ fontFamily: DISPLAY, fontSize: "0.95rem", color: C.forest }}>{data.couple.groomName || "Chú rể"}</p>
            <p style={{ fontFamily: BODY, fontSize: "0.45rem", color: C.textLight, marginTop: 2 }}>Son · Nhà trai</p>
          </div>
        </div>
      </div>

      {/* ── Event ── */}
      <div className="px-5 py-7" style={{ background: C.cream }}>
        <OrnamentalDivider className="mb-5" />
        <p className="text-center mb-1" style={{ fontFamily: DISPLAY, fontSize: "1.15rem", color: C.forest }}>
          Chi Tiết Hôn Lễ
        </p>
        <p className="text-center mb-5" style={{ fontFamily: BODY, fontSize: "0.5rem", color: C.textLight }}>{formattedDate}</p>

        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Calendar, title: "Lễ Cưới", time: data.event.time || "11:00" },
            { icon: Gift, title: "Tiệc Cưới", time: data.event.time ? `${parseInt(data.event.time) + 1}:00` : "18:00" },
          ].map((ev) => (
            <div key={ev.title} className="bg-white rounded-2xl p-4 text-center" style={{ boxShadow: C.shadowCard }}>
              <div className="w-8 h-8 rounded-full mx-auto mb-2.5 flex items-center justify-center" style={{ background: C.goldSheer }}>
                <ev.icon className="h-3.5 w-3.5" style={{ color: C.gold }} />
              </div>
              <p style={{ fontFamily: SERIF, fontSize: "0.7rem", fontWeight: 600, color: C.forest }}>{ev.title}</p>
              <p className="flex items-center justify-center gap-1 mt-1.5" style={{ fontSize: "0.48rem", color: C.textBody }}>
                <Clock className="h-2.5 w-2.5" />{ev.time}
              </p>
              <p className="flex items-center justify-center gap-1 mt-0.5" style={{ fontSize: "0.48rem", color: C.textBody }}>
                <MapPin className="h-2.5 w-2.5" />{data.event.venue}
              </p>
              <p className="mt-1" style={{ fontSize: "0.4rem", color: C.textLight, lineHeight: 1.5 }}>{data.event.address}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Message ── */}
      {data.couple.message && (
        <div className="px-6 py-6 text-center" style={{ background: C.ivory }}>
          <Sparkles className="h-3.5 w-3.5 mx-auto mb-3" style={{ color: C.gold }} />
          <p style={{ fontFamily: BODY, fontSize: "0.65rem", fontWeight: 400, color: C.textBody, lineHeight: 2, fontStyle: "italic" }}>
            "{data.couple.message}"
          </p>
        </div>
      )}

      {/* ── RSVP placeholder ── */}
      {data.rsvp.enabled && (
        <div className="px-5 py-5" style={{ background: C.ivory }}>
          <div className="text-center p-4 rounded-2xl border" style={{ borderColor: C.goldMuted, background: C.paper }}>
            <p style={{ fontFamily: SERIF, fontSize: "0.7rem", fontWeight: 600, color: C.forest, marginBottom: 8 }}>Xác nhận tham dự</p>
            <div className="space-y-2">
              <div className="h-7 rounded-xl" style={{ background: C.goldSheer, border: `1px solid ${C.goldMuted}` }} />
              <div className="h-7 rounded-xl" style={{ background: C.goldSheer, border: `1px solid ${C.goldMuted}` }} />
            </div>
            <div className="h-8 rounded-xl mt-2.5" style={{ background: `linear-gradient(135deg, ${C.forest}, ${C.emerald})` }} />
          </div>
        </div>
      )}

      {/* ── Wishes placeholder ── */}
      {data.wishes.enabled && (
        <div className="px-5 pb-6" style={{ background: C.ivory }}>
          <div className="text-center p-4 rounded-2xl border" style={{ borderColor: C.goldMuted, background: C.paper }}>
            <p style={{ fontFamily: SERIF, fontSize: "0.7rem", fontWeight: 600, color: C.forest, marginBottom: 8 }}>Gửi lời chúc</p>
            <div className="h-16 rounded-xl" style={{ background: C.goldSheer, border: `1px solid ${C.goldMuted}` }} />
            <div className="h-8 rounded-xl mt-2.5" style={{ background: `linear-gradient(135deg, ${C.forest}, ${C.emerald})` }} />
          </div>
        </div>
      )}
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════════
   INVITATION HERO  (Full InvitationPage — expanded version)
   ═══════════════════════════════════════════════════════════════════ */
export function InvitationHero({
  data,
  showMonogram,
  formattedDate,
}: {
  data: InvitationData;
  showMonogram: boolean;
  formattedDate: string;
  scheme: { bg: string; fg: string };
}) {
  const countdown = getCountdownItems(data.event.date);

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen overflow-hidden" style={{ background: C.ivory }}>
        {/* Botanical decorations */}
        <BotanicalLeaf className="top-16 -left-12" size={160} />
        <BotanicalLeaf className="bottom-32 -right-10" size={130} flip />
        <OrnamentalCorner className="top-6 left-6" />
        <OrnamentalCorner className="top-6 right-6 -scale-x-100" />
        <OrnamentalCorner className="bottom-6 left-6 rotate-90" />
        <OrnamentalCorner className="bottom-6 right-6 -scale-x-100 rotate-90" />

        <div className="relative z-10 min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left — Text */}
          <motion.div
            className="flex flex-col justify-center px-10 md:px-16 lg:px-24 py-20 lg:py-0 order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: showMonogram ? 0 : 1, x: showMonogram ? -50 : 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <p style={{
              fontFamily: BODY, fontSize: "0.7rem", letterSpacing: "0.3em",
              textTransform: "uppercase", color: C.sage, marginBottom: 28, fontWeight: 500,
            }}>
              Chúng mình sắp cưới
            </p>

            <h1 style={{ fontFamily: DISPLAY, fontSize: "clamp(3.5rem, 9vw, 6rem)", color: C.forest, lineHeight: 0.9, marginBottom: 0 }}>
              {data.couple.brideName || "Cô dâu"}
            </h1>
            <p style={{ fontFamily: DISPLAY, fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)", color: C.gold, margin: "10px 0 6px 24px" }}>&amp;</p>
            <h1 style={{ fontFamily: DISPLAY, fontSize: "clamp(3.5rem, 9vw, 6rem)", color: C.forest, lineHeight: 0.9 }}>
              {data.couple.groomName || "Chú rể"}
            </h1>

            {/* Gold line */}
            <div className="mt-10" style={{ width: 72, height: 1, background: `linear-gradient(90deg, ${C.gold}, transparent)` }} />

            <p className="mt-6" style={{ fontFamily: BODY, fontSize: "0.95rem", color: C.sage, letterSpacing: "0.06em", fontWeight: 500 }}>
              Ngày {formattedDate}
            </p>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="mt-10 inline-flex items-center justify-center self-start px-10 py-4 rounded-full text-white tracking-wider"
              style={{
                fontFamily: BODY, fontSize: "0.8rem", letterSpacing: "0.14em",
                textTransform: "uppercase", fontWeight: 600,
                background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
                boxShadow: `0 6px 28px rgba(200,169,81,0.35)`,
              }}
            >
              Mở thiệp mời
            </motion.button>

            {data.couple.hashtag && (
              <p className="mt-8" style={{ fontFamily: BODY, fontSize: "0.7rem", letterSpacing: "0.22em", color: C.gold, fontWeight: 500 }}>
                {data.couple.hashtag}
              </p>
            )}
          </motion.div>

          {/* Right — Photo */}
          <motion.div
            className="relative flex items-center justify-center p-8 lg:p-16 order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: showMonogram ? 0 : 1, x: showMonogram ? 50 : 0 }}
            transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-full max-w-xl">
              {/* Outer decorative frame */}
              <div
                className="absolute -inset-3 rounded-[2rem] border"
                style={{ borderColor: C.goldMuted }}
              />
              {/* Main image */}
              <div
                className="relative w-full aspect-[3/4] overflow-hidden rounded-3xl"
                style={{ boxShadow: `0 24px 80px rgba(22,59,46,0.18)` }}
              >
                <img src={heroWedding} alt="Couple" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 60%, rgba(22,59,46,0.06))" }} />
              </div>
            </div>
            <BotanicalLeaf className="-bottom-14 -right-14 !opacity-[0.03]" size={120} />
          </motion.div>
        </div>
      </section>

      {/* ═══ COUNTDOWN ═══ */}
      <section className="py-20 md:py-28" style={{ background: C.forest }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p style={{ fontFamily: DISPLAY, fontSize: "clamp(1.8rem, 5vw, 2.8rem)", color: C.goldLight, marginBottom: 12 }}>
              Đếm Ngược Ngày Hạnh Phúc
            </p>
            <GoldLine w={72} className="mb-12" />

            <div className="flex justify-center gap-4 md:gap-7">
              {countdown.map((d) => (
                <div
                  key={d.l}
                  className="min-w-[72px] md:min-w-[100px] py-5 md:py-6 border text-center backdrop-blur-sm"
                  style={{
                    borderColor: "rgba(200,169,81,0.2)",
                    borderRadius: 14,
                    background: "rgba(255,253,248,0.04)",
                  }}
                >
                  <p style={{ fontFamily: SERIF, fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", color: C.goldLight, fontWeight: 600 }}>{d.n}</p>
                  <p style={{ fontFamily: BODY, fontSize: "0.6rem", color: "rgba(200,169,81,0.45)", textTransform: "uppercase", letterSpacing: "0.2em", marginTop: 4, fontWeight: 500 }}>
                    {d.l === "Ngày" ? "DAYS" : d.l === "Giờ" ? "HOURS" : d.l === "Phút" ? "MINUTES" : "SECONDS"}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ COUPLE ═══ */}
      <section className="py-20 md:py-32" style={{ background: C.ivory }}>
        <div className="max-w-4xl mx-auto px-6">
          <OrnamentalDivider className="mb-10" />

          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p style={{ fontFamily: DISPLAY, fontSize: "clamp(1.8rem, 5vw, 2.8rem)", color: C.forest }}>
              Cô Dâu &amp; Chú Rể
            </p>
            <GoldLine w={72} className="mt-5" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-6 items-start">
            {/* Bride */}
            <motion.div
              className="rounded-3xl p-10 text-center"
              style={{ background: C.paper, boxShadow: C.shadowCard }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full mx-auto mb-6 overflow-hidden border-[3px] outline outline-2 outline-offset-4" style={{ borderColor: C.goldMuted, outlineColor: C.goldMuted }}>
                <img src={heroWedding} alt="Bride" className="w-full h-full object-cover" />
              </div>
              <p style={{ fontFamily: DISPLAY, fontSize: "1.7rem", color: C.forest, marginBottom: 6 }}>
                {data.couple.brideName || "Cô dâu"}
              </p>
              <p style={{ fontFamily: BODY, fontSize: "0.75rem", color: C.textLight, letterSpacing: "0.12em", fontWeight: 500 }}>
                Daughter · Gia đình nhà gái
              </p>
              {data.couple.message && (
                <p className="mt-5" style={{ fontFamily: BODY, fontSize: "0.8rem", color: C.textBody, lineHeight: 1.9, fontStyle: "italic" }}>
                  "Hạnh phúc là khi tìm thấy người cùng nhìn về một hướng."
                </p>
              )}
            </motion.div>

            {/* Center heart */}
            <div className="hidden md:flex flex-col items-center justify-center pt-20 gap-3">
              <div className="w-px h-12" style={{ background: `linear-gradient(180deg, transparent, ${C.goldMuted})` }} />
              <Heart className="h-5 w-5" style={{ color: C.gold }} fill={C.gold} />
              <div className="w-px h-12" style={{ background: `linear-gradient(180deg, ${C.goldMuted}, transparent)` }} />
            </div>

            {/* Groom */}
            <motion.div
              className="rounded-3xl p-10 text-center"
              style={{ background: C.paper, boxShadow: C.shadowCard }}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full mx-auto mb-6 overflow-hidden border-[3px] outline outline-2 outline-offset-4" style={{ borderColor: C.goldMuted, outlineColor: C.goldMuted }}>
                <img src={heroWedding} alt="Groom" className="w-full h-full object-cover" />
              </div>
              <p style={{ fontFamily: DISPLAY, fontSize: "1.7rem", color: C.forest, marginBottom: 6 }}>
                {data.couple.groomName || "Chú rể"}
              </p>
              <p style={{ fontFamily: BODY, fontSize: "0.75rem", color: C.textLight, letterSpacing: "0.12em", fontWeight: 500 }}>
                Son · Gia đình nhà trai
              </p>
              {data.couple.message && (
                <p className="mt-5" style={{ fontFamily: BODY, fontSize: "0.8rem", color: C.textBody, lineHeight: 1.9, fontStyle: "italic" }}>
                  "Mỗi ngày bên em đều là ngày đẹp nhất."
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ LOVE STORY ═══ */}
      {data.loveStory.items.length > 0 && (
        <section className="py-20 md:py-28" style={{ background: C.paper }}>
          <div className="max-w-2xl mx-auto px-6">
            <OrnamentalDivider className="mb-10" />
            <motion.div
              className="text-center mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p style={{ fontFamily: DISPLAY, fontSize: "clamp(1.8rem, 5vw, 2.5rem)", color: C.forest }}>
                {data.loveStory.title || "Chuyện Tình Yêu"}
              </p>
              <GoldLine w={60} className="mt-4" />
            </motion.div>

            <div className="relative">
              {/* Center vertical line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2" style={{ background: `linear-gradient(180deg, transparent, ${C.goldMuted}, transparent)` }} />

              <div className="space-y-10">
                {data.loveStory.items.map((item, i) => (
                  <motion.div
                    key={i}
                    className={`flex items-start gap-6 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                  >
                    <div className={`flex-1 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                      <p style={{ fontFamily: SERIF, fontSize: "0.85rem", fontWeight: 600, color: C.gold, marginBottom: 4 }}>{item.year}</p>
                      <p style={{ fontFamily: BODY, fontSize: "0.8rem", color: C.textBody, lineHeight: 1.8 }}>{item.text}</p>
                    </div>
                    <div className="relative shrink-0 flex items-center justify-center" style={{ width: 12, height: 12 }}>
                      <div className="w-3 h-3 rounded-full border-2" style={{ borderColor: C.gold, background: C.ivory }} />
                    </div>
                    <div className="flex-1" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══ EVENT ═══ */}
      <section className="py-20 md:py-32" style={{ background: C.cream }}>
        <div className="max-w-4xl mx-auto px-6">
          <OrnamentalDivider className="mb-10" />

          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p style={{ fontFamily: DISPLAY, fontSize: "clamp(1.8rem, 5vw, 2.8rem)", color: C.forest }}>
              Chi Tiết Hôn Lễ
            </p>
            <p className="mt-3" style={{ fontFamily: BODY, fontSize: "0.85rem", color: C.textBody, fontWeight: 500 }}>
              {formattedDate}
            </p>
            <GoldLine w={72} className="mt-5" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: Calendar, title: "Lễ Cưới", time: data.event.time || "11:00" },
              { icon: Gift, title: "Tiệc Cưới", time: data.event.time ? `${parseInt(data.event.time) + 1}:00` : "18:00" },
            ].map((ev, i) => (
              <motion.div
                key={ev.title}
                className="rounded-3xl p-10 text-center"
                style={{ background: C.paper, boxShadow: C.shadowCard }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
              >
                <div
                  className="w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center"
                  style={{ background: C.goldSheer }}
                >
                  <ev.icon className="h-6 w-6" style={{ color: C.gold }} />
                </div>
                <h3 style={{ fontFamily: SERIF, fontSize: "1.2rem", fontWeight: 600, color: C.forest, marginBottom: 16 }}>
                  {ev.title}
                </h3>
                <div className="space-y-2.5">
                  <p className="flex items-center justify-center gap-2.5" style={{ fontFamily: BODY, fontSize: "0.85rem", color: C.textBody }}>
                    <Clock className="h-4 w-4" style={{ color: C.gold }} />{ev.time}
                  </p>
                  <p className="flex items-center justify-center gap-2.5" style={{ fontFamily: BODY, fontSize: "0.85rem", color: C.textBody }}>
                    <MapPin className="h-4 w-4" style={{ color: C.gold }} />{data.event.venue}
                  </p>
                </div>
                <p className="mt-4" style={{ fontFamily: BODY, fontSize: "0.75rem", color: C.textLight, lineHeight: 1.8 }}>
                  {data.event.address}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Map link */}
          {data.map.directions && (
            <motion.div
              className="text-center mt-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <button
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border text-sm tracking-wider transition-colors"
                style={{
                  fontFamily: BODY, color: C.forest, borderColor: C.forest,
                  fontSize: "0.78rem", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600,
                }}
              >
                <MapPin className="h-4 w-4" />
                Xem bản đồ
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}

/* ── Page style overrides ── */
export const pageStyle: CSSProperties = {
  background: C.ivory,
  // @ts-ignore – custom CSS properties
  "--accent": "155 40% 22%",
};
