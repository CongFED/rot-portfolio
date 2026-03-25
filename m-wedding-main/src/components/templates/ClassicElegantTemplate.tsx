import { MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import heroWedding from "@/assets/hero-wedding.jpg";
import type { InvitationData } from "@/types/invitation";
import { getScheme, formatViDate, getCountdownItems } from "@/types/invitation";

/* ═══════════════════════════════════════════════════════
   CLASSIC ELEGANT TEMPLATE
   Phong cách: Cổ điển, trang nhã, đối xứng
   Palette : Cream / Ivory / Gold
   Layout  : Double-border frame, centered monogram, serif
   ═══════════════════════════════════════════════════════ */

const GOLD = "hsl(38 55% 62%)";
const GOLD_LIGHT = "hsl(38 55% 82%)";
const CREAM = "#FAF6EE";
const DARK = "hsl(30 15% 22%)";

function GoldDivider({ width = 60 }: { width?: number }) {
  return (
    <div
      className="mx-auto"
      style={{ width, height: 1, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }}
    />
  );
}

/* ─── Preview Card (Builder LivePreview) ──────────────── */
export function PreviewCard({ data }: { data: InvitationData }) {
  const br = data.theme.borderRadius;
  const formattedDate = formatViDate(data.event.date);
  const countdownItems = getCountdownItems(data.event.date);
  const initials = `${(data.couple.brideName || "C")[0]}${(data.couple.groomName || "R")[0]}`;

  return (
    <div className="max-w-lg mx-auto overflow-hidden" style={{ borderRadius: `${br}px` }}>
      {/* Outer gold border */}
      <div style={{ background: CREAM, border: `2px solid ${GOLD}`, borderRadius: `${br}px`, padding: 5 }}>
        {/* Inner subtle border */}
        <div
          className="text-center"
          style={{
            border: `1px solid ${GOLD_LIGHT}`,
            borderRadius: `${Math.max(2, br - 3)}px`,
            padding: "2rem 1.5rem",
          }}
        >
          {/* Decorative top */}
          <p style={{ color: GOLD, fontSize: "0.6rem", letterSpacing: "0.4em", marginBottom: 6 }}>✦ ✦ ✦</p>
          <p
            style={{
              fontFamily: data.fonts.body,
              fontSize: "0.6rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: DARK,
              opacity: 0.5,
              marginBottom: 16,
            }}
          >
            Trân trọng kính mời
          </p>

          {/* Monogram circle */}
          <div
            className="mx-auto flex items-center justify-center mb-4"
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              border: `1.5px solid ${GOLD}`,
            }}
          >
            <span style={{ fontFamily: data.fonts.heading, fontSize: "1rem", color: DARK }}>{initials}</span>
          </div>

          {/* Names */}
          <p style={{ fontFamily: data.fonts.heading, fontSize: "1.6rem", color: DARK, lineHeight: 1.2 }}>
            {data.couple.brideName || "Cô dâu"}
          </p>
          <p style={{ fontFamily: data.fonts.heading, fontSize: "0.9rem", color: GOLD, margin: "4px 0" }}>&</p>
          <p style={{ fontFamily: data.fonts.heading, fontSize: "1.6rem", color: DARK, lineHeight: 1.2 }}>
            {data.couple.groomName || "Chú rể"}
          </p>

          {data.couple.hashtag && (
            <p style={{ fontFamily: data.fonts.body, fontSize: "0.6rem", letterSpacing: "0.2em", color: GOLD, marginTop: 8 }}>
              {data.couple.hashtag}
            </p>
          )}

          <GoldDivider />

          {/* Date & venue */}
          <div className="mt-4 mb-2">
            <p style={{ fontFamily: data.fonts.heading, fontSize: "1rem", color: DARK }}>{formattedDate}</p>
            {data.event.time && (
              <p className="flex items-center justify-center gap-1 mt-1" style={{ fontSize: "0.75rem", color: DARK, opacity: 0.6 }}>
                <Clock className="h-3 w-3" />
                {data.event.time}
              </p>
            )}
          </div>
          <p style={{ fontFamily: data.fonts.body, fontSize: "0.75rem", fontWeight: 300, color: DARK, opacity: 0.6 }}>
            {data.event.venue}
            {data.event.address ? `, ${data.event.address}` : ""}
          </p>

          {/* Countdown */}
          {data.event.date && (
            <div className="grid grid-cols-4 gap-2 mt-5">
              {countdownItems.map((d) => (
                <div
                  key={d.l}
                  className="py-2.5 text-center"
                  style={{ background: `${GOLD}15`, borderRadius: `${Math.max(4, br - 4)}px` }}
                >
                  <p style={{ fontFamily: data.fonts.heading, fontSize: "1rem", color: DARK }}>{d.n}</p>
                  <p style={{ fontSize: "0.6rem", fontWeight: 300, color: DARK, opacity: 0.5 }}>{d.l}</p>
                </div>
              ))}
            </div>
          )}

          {/* Message */}
          {data.couple.message && (
            <p className="mt-5" style={{ fontFamily: data.fonts.body, fontSize: "0.75rem", fontWeight: 300, color: DARK, opacity: 0.65, lineHeight: 1.8 }}>
              {data.couple.message}
            </p>
          )}

          {/* Love story */}
          {data.loveStory.items.length > 0 && (
            <div className="mt-5 text-left">
              <p className="text-center mb-3" style={{ fontFamily: data.fonts.heading, fontSize: "0.8rem", color: DARK }}>
                {data.loveStory.title}
              </p>
              <div className="relative space-y-3" style={{ paddingLeft: 20, borderLeft: `1.5px solid ${GOLD_LIGHT}` }}>
                {data.loveStory.items.map((item, i) => (
                  <div key={i} className="relative">
                    <div
                      className="absolute rounded-full"
                      style={{ left: -24.5, top: 3, width: 8, height: 8, background: GOLD, border: `2px solid ${CREAM}` }}
                    />
                    <p style={{ fontSize: "0.65rem", fontWeight: 500, color: GOLD }}>{item.year}</p>
                    <p style={{ fontSize: "0.7rem", fontWeight: 300, color: DARK, opacity: 0.6 }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery */}
          {data.gallery.filter(Boolean).length > 0 && (
            <div className="grid grid-cols-3 gap-1.5 mt-5">
              {data.gallery.filter(Boolean).map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`Gallery ${i + 1}`}
                  className="w-full aspect-square object-cover"
                  style={{ borderRadius: `${Math.max(2, br - 8)}px`, border: `1px solid ${GOLD_LIGHT}` }}
                />
              ))}
            </div>
          )}

          {/* RSVP placeholder */}
          {data.rsvp.enabled && (
            <div className="mt-5 p-4 text-center" style={{ background: `${GOLD}08`, borderRadius: `${br}px`, border: `1px solid ${GOLD}20` }}>
              <p style={{ fontFamily: data.fonts.heading, fontSize: "0.8rem", color: DARK }}>Xác nhận tham dự</p>
              <div className="space-y-2 mt-3">
                <div className="h-7 rounded" style={{ background: `${CREAM}`, border: `1px solid ${GOLD_LIGHT}` }} />
                <div className="h-7 rounded" style={{ background: `${CREAM}`, border: `1px solid ${GOLD_LIGHT}` }} />
              </div>
              <div className="h-8 rounded mt-2" style={{ background: `${GOLD}25`, borderRadius: `${Math.max(4, br - 4)}px` }} />
            </div>
          )}

          {/* Wishes placeholder */}
          {data.wishes.enabled && (
            <div className="mt-4 p-4 text-center" style={{ background: `${GOLD}08`, borderRadius: `${br}px`, border: `1px solid ${GOLD}20` }}>
              <p style={{ fontFamily: data.fonts.heading, fontSize: "0.8rem", color: DARK }}>Gửi lời chúc</p>
              <div className="h-16 rounded mt-2" style={{ background: `${CREAM}`, border: `1px solid ${GOLD_LIGHT}` }} />
              <div className="h-8 rounded mt-2" style={{ background: `${GOLD}25`, borderRadius: `${Math.max(4, br - 4)}px` }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Hero Section (Full InvitationPage) ────────────── */
export function InvitationHero({
  data,
  showMonogram,
  formattedDate,
}: {
  data: InvitationData;
  showMonogram: boolean;
  formattedDate: string;
}) {
  const initials = `${(data.couple.brideName || "C")[0]}${(data.couple.groomName || "R")[0]}`;

  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative" style={{ background: CREAM }}>
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 40%, ${GOLD}12 0%, transparent 60%)`,
        }}
      />

      {/* Double border frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: showMonogram ? 0 : 1, scale: showMonogram ? 0.96 : 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10 w-full max-w-xl mx-auto"
      >
        <div style={{ border: `2px solid ${GOLD}`, borderRadius: `${data.theme.borderRadius}px`, padding: 6 }}>
          <div
            className="text-center py-16 md:py-24 px-8"
            style={{ border: `1px solid ${GOLD_LIGHT}`, borderRadius: `${Math.max(2, data.theme.borderRadius - 3)}px` }}
          >
            <p
              style={{
                color: GOLD,
                fontSize: "0.7rem",
                letterSpacing: "0.5em",
                marginBottom: 20,
              }}
            >
              ✦ ✦ ✦
            </p>
            <p
              className="mb-8"
              style={{
                fontFamily: data.fonts.body,
                fontSize: "0.7rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: DARK,
                opacity: 0.5,
              }}
            >
              Trân trọng kính mời
            </p>

            {/* Monogram */}
            <div
              className="mx-auto flex items-center justify-center mb-8"
              style={{ width: 80, height: 80, borderRadius: "50%", border: `2px solid ${GOLD}` }}
            >
              <span style={{ fontFamily: data.fonts.heading, fontSize: "1.5rem", color: DARK }}>{initials}</span>
            </div>

            <h1 style={{ fontFamily: data.fonts.heading, fontSize: "clamp(2rem, 6vw, 3.5rem)", color: DARK, lineHeight: 1.1 }}>
              {data.couple.brideName}
            </h1>
            <p style={{ fontFamily: data.fonts.heading, fontSize: "1.5rem", color: GOLD, margin: "8px 0" }}>&</p>
            <h1 style={{ fontFamily: data.fonts.heading, fontSize: "clamp(2rem, 6vw, 3.5rem)", color: DARK, lineHeight: 1.1 }}>
              {data.couple.groomName}
            </h1>

            <div className="mx-auto my-8" style={{ width: 80, height: 1, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />

            <p style={{ fontFamily: data.fonts.body, fontSize: "1rem", color: DARK }}>{formattedDate}</p>
            <p className="mt-2" style={{ fontFamily: data.fonts.body, fontSize: "0.85rem", color: DARK, opacity: 0.6 }}>
              {data.event.time} · {data.event.venue}
            </p>

            {data.couple.hashtag && (
              <p className="mt-6" style={{ fontFamily: data.fonts.body, fontSize: "0.7rem", letterSpacing: "0.25em", color: GOLD }}>
                {data.couple.hashtag}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Page style overrides for InvitationPage sections ─ */
export const pageStyle: React.CSSProperties = {
  // @ts-ignore – CSS custom properties
  "--accent": "38 55% 62%",
};
