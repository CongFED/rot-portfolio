import { MapPin, Clock, Heart, Calendar, Gift } from "lucide-react";
import { motion } from "framer-motion";
import heroWedding from "@/assets/hero-wedding.jpg";
import type { InvitationData } from "@/types/invitation";
import { formatViDate, getCountdownItems } from "@/types/invitation";
import type { CSSProperties } from "react";

/* ═══════════════════════════════════════════════════════════
   LUXURY GREEN WEDDING TEMPLATE
   Phong cách: Sang trọng · Cổ điển nhẹ · Premium · Romantic
   Palette : Emerald green / Gold / Ivory cream
   Layout  : 2-col hero, countdown, couple cards, event cards
   Fonts   : Great Vibes (script) + Cormorant Garamond (serif)
   ═══════════════════════════════════════════════════════════ */

/* ── Design Tokens ── */
const GREEN = "#1a4d3e";          // Deep emerald
const GREEN_LIGHT = "#2a6b56";    // Lighter emerald
const GREEN_SOFT = "#e8f0ec";     // Soft green bg
const GOLD = "#c9a84c";           // Warm gold accent
const GOLD_LIGHT = "#dfc87a";     // Light gold
const GOLD_MUTED = "rgba(201, 168, 76, 0.3)";
const IVORY = "#faf8f3";          // Warm ivory bg
const CREAM = "#f5f0e8";          // Cream for cards
const TEXT_DARK = "#1a3a2f";      // Dark green text
const TEXT_MUTED = "#6b8a7d";     // Muted green body

const SCRIPT_FONT = "'Great Vibes', cursive";
const SERIF_FONT = "'Cormorant Garamond', serif";
const BODY_FONT = "'Cormorant Garamond', serif";

/* ── Google Fonts import (injected once) ── */
const fontLink = document.querySelector('link[data-luxury-green]');
if (!fontLink) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.dataset.luxuryGreen = "1";
  link.href = "https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap";
  document.head.appendChild(link);
}

/* ── Decorative Components ── */
function GoldDivider({ width = 60, className = "" }: { width?: number; className?: string }) {
  return (
    <div className={`mx-auto ${className}`} style={{ width, height: 1, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />
  );
}

function GoldHeartDivider() {
  return (
    <div className="flex items-center justify-center gap-4 my-10 md:my-14">
      <div className="h-px flex-1 max-w-[80px]" style={{ background: `linear-gradient(90deg, transparent, ${GOLD_MUTED})` }} />
      <Heart className="h-3.5 w-3.5" style={{ color: GOLD }} fill={GOLD} />
      <div className="h-px flex-1 max-w-[80px]" style={{ background: `linear-gradient(90deg, ${GOLD_MUTED}, transparent)` }} />
    </div>
  );
}

/* Subtle leaf decoration (SVG) */
function LeafDecoration({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      className={`absolute pointer-events-none opacity-[0.06] ${className}`}
      width="120"
      height="200"
      viewBox="0 0 120 200"
      fill="none"
      style={{ transform: flip ? "scaleX(-1)" : "none" }}
    >
      <path
        d="M60 10C60 10 20 50 15 100C10 150 35 190 60 190C85 190 110 150 105 100C100 50 60 10 60 10Z"
        fill={GREEN}
      />
      <path
        d="M60 30C60 30 45 70 42 110C39 150 50 175 60 175C70 175 81 150 78 110C75 70 60 30 60 30Z"
        fill={GREEN}
        opacity="0.5"
      />
      <line x1="60" y1="20" x2="60" y2="180" stroke={GREEN} strokeWidth="0.5" opacity="0.3" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* PREVIEW CARD (Builder LivePreview panel)                   */
/* ─────────────────────────────────────────────────────────── */
export function PreviewCard({ data }: { data: InvitationData }) {
  const br = data.theme.borderRadius;
  const formattedDate = formatViDate(data.event.date);
  const countdownItems = getCountdownItems(data.event.date);

  return (
    <div className="max-w-lg mx-auto overflow-hidden" style={{ borderRadius: `${br}px`, background: IVORY }}>
      {/* ── Hero 2-col ── */}
      <div className="grid grid-cols-2 gap-0">
        {/* Left – Text */}
        <div className="flex flex-col justify-center px-5 py-8">
          <p style={{ fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: GREEN_LIGHT, marginBottom: 8, fontFamily: BODY_FONT }}>
            Chúng mình sắp cưới
          </p>
          <p style={{ fontFamily: SCRIPT_FONT, fontSize: "1.6rem", color: GREEN, lineHeight: 1.1, marginBottom: 2 }}>
            {data.couple.brideName || "Cô dâu"}
          </p>
          <p style={{ fontFamily: SCRIPT_FONT, fontSize: "0.9rem", color: GOLD, margin: "2px 0" }}>&amp;</p>
          <p style={{ fontFamily: SCRIPT_FONT, fontSize: "1.6rem", color: GREEN, lineHeight: 1.1 }}>
            {data.couple.groomName || "Chú rể"}
          </p>
          <GoldDivider width={40} className="!mx-0 mt-4 mb-3" />
          <p style={{ fontFamily: BODY_FONT, fontSize: "0.6rem", color: TEXT_MUTED }}>
            {formattedDate}
          </p>
        </div>
        {/* Right – Image */}
        <div className="relative overflow-hidden" style={{ borderRadius: `0 ${br}px ${br}px 0` }}>
          <img src={heroWedding} alt="Couple" className="w-full h-full object-cover" style={{ minHeight: 220 }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(26,77,62,0.08), transparent)" }} />
        </div>
      </div>

      {/* ── Countdown ── */}
      <div className="py-5 px-4" style={{ background: GREEN }}>
        <p className="text-center mb-3" style={{ fontFamily: SCRIPT_FONT, fontSize: "1rem", color: GOLD_LIGHT }}>
          Counting Down To Forever
        </p>
        <GoldDivider width={40} className="mb-3" />
        <div className="grid grid-cols-4 gap-2">
          {countdownItems.map((d) => (
            <div key={d.l} className="text-center py-2 border" style={{ borderColor: "rgba(201,168,76,0.2)", borderRadius: `${Math.max(4, br - 4)}px` }}>
              <p style={{ fontFamily: SERIF_FONT, fontSize: "1rem", color: GOLD_LIGHT, fontWeight: 500 }}>{d.n}</p>
              <p style={{ fontSize: "0.5rem", color: "rgba(201,168,76,0.6)", textTransform: "uppercase", letterSpacing: "0.15em" }}>{d.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Couple Section ── */}
      <div className="px-4 py-6" style={{ background: IVORY }}>
        <GoldHeartDivider />
        <p className="text-center mb-4" style={{ fontFamily: SCRIPT_FONT, fontSize: "1.1rem", color: GREEN }}>
          Cô Dâu &amp; Chú Rể
        </p>
        <GoldDivider width={40} className="mb-5" />

        <div className="grid grid-cols-2 gap-3">
          {/* Bride card */}
          <div className="bg-white rounded-xl p-4 text-center" style={{ boxShadow: "0 2px 12px rgba(26,77,62,0.06)" }}>
            <div className="w-14 h-14 rounded-full mx-auto mb-3 overflow-hidden border-2" style={{ borderColor: GOLD_MUTED }}>
              <img src={heroWedding} alt="Bride" className="w-full h-full object-cover" />
            </div>
            <p style={{ fontFamily: SCRIPT_FONT, fontSize: "0.9rem", color: GREEN }}>{data.couple.brideName || "Cô dâu"}</p>
            <p style={{ fontFamily: BODY_FONT, fontSize: "0.5rem", color: TEXT_MUTED, marginTop: 2 }}>Daughter · Gia đình nhà gái</p>
          </div>

          {/* Groom card */}
          <div className="bg-white rounded-xl p-4 text-center" style={{ boxShadow: "0 2px 12px rgba(26,77,62,0.06)" }}>
            <div className="w-14 h-14 rounded-full mx-auto mb-3 overflow-hidden border-2" style={{ borderColor: GOLD_MUTED }}>
              <img src={heroWedding} alt="Groom" className="w-full h-full object-cover" />
            </div>
            <p style={{ fontFamily: SCRIPT_FONT, fontSize: "0.9rem", color: GREEN }}>{data.couple.groomName || "Chú rể"}</p>
            <p style={{ fontFamily: BODY_FONT, fontSize: "0.5rem", color: TEXT_MUTED, marginTop: 2 }}>Son · Gia đình nhà trai</p>
          </div>
        </div>
      </div>

      {/* ── Event Section ── */}
      <div className="px-4 py-6" style={{ background: CREAM }}>
        <GoldHeartDivider />
        <p className="text-center mb-2" style={{ fontFamily: SCRIPT_FONT, fontSize: "1.1rem", color: GREEN }}>
          Chi Tiết Tiệc Cưới
        </p>
        <p className="text-center mb-5" style={{ fontFamily: BODY_FONT, fontSize: "0.55rem", color: TEXT_MUTED }}>
          {formattedDate}
        </p>

        <div className="grid grid-cols-2 gap-3">
          {/* Wedding ceremony */}
          <div className="bg-white rounded-xl p-4 text-center" style={{ boxShadow: "0 2px 12px rgba(26,77,62,0.06)" }}>
            <div className="w-7 h-7 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ background: GREEN_SOFT }}>
              <Calendar className="h-3 w-3" style={{ color: GREEN }} />
            </div>
            <p style={{ fontFamily: SERIF_FONT, fontSize: "0.7rem", fontWeight: 600, color: GREEN }}>Lễ Cưới</p>
            <div className="my-2">
              <p className="flex items-center justify-center gap-1" style={{ fontSize: "0.5rem", color: TEXT_MUTED }}>
                <Clock className="h-2.5 w-2.5" />{data.event.time || "11:00"}
              </p>
              <p className="flex items-center justify-center gap-1 mt-1" style={{ fontSize: "0.5rem", color: TEXT_MUTED }}>
                <MapPin className="h-2.5 w-2.5" />{data.event.venue}
              </p>
            </div>
            <p style={{ fontSize: "0.45rem", color: TEXT_MUTED, lineHeight: 1.5 }}>{data.event.address}</p>
          </div>

          {/* Reception */}
          <div className="bg-white rounded-xl p-4 text-center" style={{ boxShadow: "0 2px 12px rgba(26,77,62,0.06)" }}>
            <div className="w-7 h-7 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ background: GREEN_SOFT }}>
              <Gift className="h-3 w-3" style={{ color: GREEN }} />
            </div>
            <p style={{ fontFamily: SERIF_FONT, fontSize: "0.7rem", fontWeight: 600, color: GREEN }}>Tiệc Cưới</p>
            <div className="my-2">
              <p className="flex items-center justify-center gap-1" style={{ fontSize: "0.5rem", color: TEXT_MUTED }}>
                <Clock className="h-2.5 w-2.5" />{data.event.time ? `${parseInt(data.event.time) + 1}:00` : "18:00"}
              </p>
              <p className="flex items-center justify-center gap-1 mt-1" style={{ fontSize: "0.5rem", color: TEXT_MUTED }}>
                <MapPin className="h-2.5 w-2.5" />{data.event.venue}
              </p>
            </div>
            <p style={{ fontSize: "0.45rem", color: TEXT_MUTED, lineHeight: 1.5 }}>{data.event.address}</p>
          </div>
        </div>
      </div>

      {/* ── Message ── */}
      {data.couple.message && (
        <div className="px-6 py-5 text-center" style={{ background: IVORY }}>
          <p style={{ fontFamily: BODY_FONT, fontSize: "0.7rem", fontWeight: 300, color: TEXT_MUTED, lineHeight: 1.9, fontStyle: "italic" }}>
            "{data.couple.message}"
          </p>
        </div>
      )}

      {/* ── RSVP placeholder ── */}
      {data.rsvp.enabled && (
        <div className="px-4 py-5" style={{ background: IVORY }}>
          <div className="text-center p-4 rounded-xl border" style={{ borderColor: GOLD_MUTED, background: "white" }}>
            <p style={{ fontFamily: SERIF_FONT, fontSize: "0.7rem", fontWeight: 600, color: GREEN, marginBottom: 8 }}>Xác nhận tham dự</p>
            <div className="space-y-2">
              <div className="h-7 rounded-lg" style={{ background: GREEN_SOFT, border: `1px solid ${GOLD_MUTED}` }} />
              <div className="h-7 rounded-lg" style={{ background: GREEN_SOFT, border: `1px solid ${GOLD_MUTED}` }} />
            </div>
            <div className="h-8 rounded-lg mt-2" style={{ background: GREEN, opacity: 0.7 }} />
          </div>
        </div>
      )}

      {/* ── Wishes placeholder ── */}
      {data.wishes.enabled && (
        <div className="px-4 pb-5" style={{ background: IVORY }}>
          <div className="text-center p-4 rounded-xl border" style={{ borderColor: GOLD_MUTED, background: "white" }}>
            <p style={{ fontFamily: SERIF_FONT, fontSize: "0.7rem", fontWeight: 600, color: GREEN, marginBottom: 8 }}>Gửi lời chúc</p>
            <div className="h-16 rounded-lg" style={{ background: GREEN_SOFT, border: `1px solid ${GOLD_MUTED}` }} />
            <div className="h-8 rounded-lg mt-2" style={{ background: GREEN, opacity: 0.7 }} />
          </div>
        </div>
      )}
    </div>
  );
}


/* ─────────────────────────────────────────────────────────── */
/* HERO SECTION (Full InvitationPage)                        */
/* ─────────────────────────────────────────────────────────── */
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
  return (
    <>
      {/* ═══ HERO SECTION ═══ */}
      <section className="relative min-h-screen overflow-hidden" style={{ background: IVORY }}>
        {/* Subtle leaf decorations */}
        <LeafDecoration className="top-12 -left-8" />
        <LeafDecoration className="bottom-24 -right-8" flip />

        <div className="relative z-10 min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left – Text content */}
          <motion.div
            className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-20 lg:py-0 order-2 lg:order-1"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: showMonogram ? 0 : 1, x: showMonogram ? -40 : 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p
              style={{
                fontFamily: BODY_FONT,
                fontSize: "0.75rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: GREEN_LIGHT,
                marginBottom: 24,
                fontWeight: 400,
              }}
            >
              Chúng mình sắp cưới
            </p>

            <h1 style={{ fontFamily: SCRIPT_FONT, fontSize: "clamp(3rem, 8vw, 5.5rem)", color: GREEN, lineHeight: 0.95, marginBottom: 4 }}>
              {data.couple.brideName || "Cô dâu"}
            </h1>
            <p style={{ fontFamily: SCRIPT_FONT, fontSize: "clamp(1.2rem, 3vw, 2rem)", color: GOLD, margin: "8px 0 4px 20px" }}>&amp;</p>
            <h1 style={{ fontFamily: SCRIPT_FONT, fontSize: "clamp(3rem, 8vw, 5.5rem)", color: GREEN, lineHeight: 0.95 }}>
              {data.couple.groomName || "Chú rể"}
            </h1>

            <div className="mt-8" style={{ width: 60, height: 1, background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />

            <p className="mt-5" style={{ fontFamily: BODY_FONT, fontSize: "0.9rem", color: GREEN_LIGHT, letterSpacing: "0.05em" }}>
              Ngày {formattedDate}
            </p>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 inline-flex items-center justify-center self-start px-8 py-3.5 rounded-full text-white font-medium tracking-wider"
              style={{
                fontFamily: BODY_FONT,
                fontSize: "0.8rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                background: `linear-gradient(135deg, ${GOLD}, ${GOLD_LIGHT})`,
                boxShadow: `0 4px 20px rgba(201,168,76,0.3)`,
              }}
            >
              Mở thiệp mời
            </motion.button>

            {data.couple.hashtag && (
              <p className="mt-6" style={{ fontFamily: BODY_FONT, fontSize: "0.7rem", letterSpacing: "0.2em", color: GOLD }}>
                {data.couple.hashtag}
              </p>
            )}
          </motion.div>

          {/* Right – Photo */}
          <motion.div
            className="relative flex items-center justify-center p-6 lg:p-12 order-1 lg:order-2"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: showMonogram ? 0 : 1, x: showMonogram ? 40 : 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="relative w-full max-w-lg aspect-[3/4] overflow-hidden rounded-3xl" style={{ boxShadow: "0 20px 60px rgba(26,77,62,0.15)" }}>
              <img src={heroWedding} alt="Couple" className="w-full h-full object-cover" />
              {/* Soft warm overlay */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 60%, rgba(26,77,62,0.08) 100%)" }} />
            </div>
            {/* Decorative leaf behind image */}
            <LeafDecoration className="-bottom-10 -right-10 !opacity-[0.04]" />
          </motion.div>
        </div>
      </section>

      {/* ═══ COUNTDOWN SECTION ═══ */}
      <section className="py-16 md:py-24" style={{ background: GREEN }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p style={{ fontFamily: SCRIPT_FONT, fontSize: "clamp(1.5rem, 4vw, 2.5rem)", color: GOLD_LIGHT, marginBottom: 16 }}>
              Counting Down To Forever
            </p>
            <GoldDivider width={60} className="mb-10" />

            <div className="flex justify-center gap-4 md:gap-6">
              {getCountdownItems(data.event.date).map((d) => (
                <div
                  key={d.l}
                  className="min-w-[70px] md:min-w-[90px] py-4 md:py-5 border text-center"
                  style={{ borderColor: "rgba(201,168,76,0.25)", borderRadius: 12 }}
                >
                  <p style={{ fontFamily: SERIF_FONT, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: GOLD_LIGHT, fontWeight: 500 }}>
                    {d.n}
                  </p>
                  <p style={{
                    fontFamily: BODY_FONT,
                    fontSize: "0.6rem",
                    color: "rgba(201,168,76,0.5)",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    marginTop: 4,
                  }}>
                    {d.l === "Ngày" ? "DAYS" : d.l === "Giờ" ? "HOURS" : d.l === "Phút" ? "MINUTES" : "SECONDS"}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ COUPLE SECTION ═══ */}
      <section className="py-16 md:py-28" style={{ background: IVORY }}>
        <div className="max-w-3xl mx-auto px-6">
          <GoldHeartDivider />

          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p style={{ fontFamily: SCRIPT_FONT, fontSize: "clamp(1.5rem, 4vw, 2.5rem)", color: GREEN }}>
              Cô Dâu &amp; Chú Rể
            </p>
            <GoldDivider width={60} className="mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-4 items-start">
            {/* Bride */}
            <motion.div
              className="bg-white rounded-2xl p-8 text-center"
              style={{ boxShadow: "0 4px 24px rgba(26,77,62,0.06)" }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div
                className="w-24 h-24 md:w-28 md:h-28 rounded-full mx-auto mb-5 overflow-hidden border-2"
                style={{ borderColor: GOLD_MUTED }}
              >
                <img src={heroWedding} alt="Bride" className="w-full h-full object-cover" />
              </div>
              <p style={{ fontFamily: SCRIPT_FONT, fontSize: "1.5rem", color: GREEN, marginBottom: 4 }}>
                {data.couple.brideName || "Cô dâu"}
              </p>
              <p style={{ fontFamily: BODY_FONT, fontSize: "0.7rem", color: TEXT_MUTED, letterSpacing: "0.1em" }}>
                Daughter · Gia đình nhà gái
              </p>
              {data.couple.message && (
                <p className="mt-4" style={{ fontFamily: BODY_FONT, fontSize: "0.75rem", color: TEXT_MUTED, lineHeight: 1.8, fontStyle: "italic" }}>
                  "Hạnh phúc là khi tìm thấy người cùng nhìn về một hướng."
                </p>
              )}
            </motion.div>

            {/* Heart divider (desktop only) */}
            <div className="hidden md:flex flex-col items-center justify-center pt-16">
              <Heart className="h-5 w-5" style={{ color: GOLD }} fill={GOLD} />
            </div>

            {/* Groom */}
            <motion.div
              className="bg-white rounded-2xl p-8 text-center"
              style={{ boxShadow: "0 4px 24px rgba(26,77,62,0.06)" }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div
                className="w-24 h-24 md:w-28 md:h-28 rounded-full mx-auto mb-5 overflow-hidden border-2"
                style={{ borderColor: GOLD_MUTED }}
              >
                <img src={heroWedding} alt="Groom" className="w-full h-full object-cover" />
              </div>
              <p style={{ fontFamily: SCRIPT_FONT, fontSize: "1.5rem", color: GREEN, marginBottom: 4 }}>
                {data.couple.groomName || "Chú rể"}
              </p>
              <p style={{ fontFamily: BODY_FONT, fontSize: "0.7rem", color: TEXT_MUTED, letterSpacing: "0.1em" }}>
                Son · Gia đình nhà trai
              </p>
              {data.couple.message && (
                <p className="mt-4" style={{ fontFamily: BODY_FONT, fontSize: "0.75rem", color: TEXT_MUTED, lineHeight: 1.8, fontStyle: "italic" }}>
                  "Mỗi ngày bên em đều là ngày đẹp nhất."
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ EVENT SECTION ═══ */}
      <section className="py-16 md:py-28" style={{ background: CREAM }}>
        <div className="max-w-3xl mx-auto px-6">
          <GoldHeartDivider />

          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p style={{ fontFamily: SCRIPT_FONT, fontSize: "clamp(1.5rem, 4vw, 2.5rem)", color: GREEN }}>
              Chi Tiết Tiệc Cưới
            </p>
            <p className="mt-3" style={{ fontFamily: BODY_FONT, fontSize: "0.8rem", color: TEXT_MUTED }}>
              {formattedDate}
            </p>
            <GoldDivider width={60} className="mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ceremony card */}
            <motion.div
              className="bg-white rounded-2xl p-8 text-center"
              style={{ boxShadow: "0 4px 24px rgba(26,77,62,0.06)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div
                className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ background: GREEN_SOFT }}
              >
                <Calendar className="h-5 w-5" style={{ color: GREEN }} />
              </div>
              <h3 style={{ fontFamily: SERIF_FONT, fontSize: "1.1rem", fontWeight: 600, color: GREEN, marginBottom: 12 }}>
                Lễ Cưới
              </h3>
              <div className="space-y-2">
                <p className="flex items-center justify-center gap-2" style={{ fontFamily: BODY_FONT, fontSize: "0.8rem", color: TEXT_MUTED }}>
                  <Clock className="h-3.5 w-3.5" style={{ color: GOLD }} />{data.event.time || "11:00"}
                </p>
                <p className="flex items-center justify-center gap-2" style={{ fontFamily: BODY_FONT, fontSize: "0.8rem", color: TEXT_MUTED }}>
                  <MapPin className="h-3.5 w-3.5" style={{ color: GOLD }} />{data.event.venue}
                </p>
              </div>
              <p className="mt-3" style={{ fontFamily: BODY_FONT, fontSize: "0.7rem", color: TEXT_MUTED, lineHeight: 1.7 }}>
                {data.event.address}
              </p>
            </motion.div>

            {/* Reception card */}
            <motion.div
              className="bg-white rounded-2xl p-8 text-center"
              style={{ boxShadow: "0 4px 24px rgba(26,77,62,0.06)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div
                className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ background: GREEN_SOFT }}
              >
                <Gift className="h-5 w-5" style={{ color: GREEN }} />
              </div>
              <h3 style={{ fontFamily: SERIF_FONT, fontSize: "1.1rem", fontWeight: 600, color: GREEN, marginBottom: 12 }}>
                Tiệc Cưới
              </h3>
              <div className="space-y-2">
                <p className="flex items-center justify-center gap-2" style={{ fontFamily: BODY_FONT, fontSize: "0.8rem", color: TEXT_MUTED }}>
                  <Clock className="h-3.5 w-3.5" style={{ color: GOLD }} />{data.event.time ? `${parseInt(data.event.time) + 1}:00` : "18:00"}
                </p>
                <p className="flex items-center justify-center gap-2" style={{ fontFamily: BODY_FONT, fontSize: "0.8rem", color: TEXT_MUTED }}>
                  <MapPin className="h-3.5 w-3.5" style={{ color: GOLD }} />{data.event.venue}
                </p>
              </div>
              <p className="mt-3" style={{ fontFamily: BODY_FONT, fontSize: "0.7rem", color: TEXT_MUTED, lineHeight: 1.7 }}>
                {data.event.address}
              </p>
            </motion.div>
          </div>

          {/* Map link button */}
          {data.map.directions && (
            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <button
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border text-sm tracking-wider"
                style={{
                  fontFamily: BODY_FONT,
                  color: GREEN,
                  borderColor: GREEN,
                  fontSize: "0.75rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                <MapPin className="h-3.5 w-3.5" />
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
  background: IVORY,
  // @ts-ignore – CSS custom properties
  "--accent": "140 40% 25%",
};
