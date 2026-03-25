import { Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import heroWedding from "@/assets/hero-wedding.jpg";
import type { InvitationData } from "@/types/invitation";
import { formatViDate, getCountdownItems } from "@/types/invitation";

/* ═══════════════════════════════════════════════════════
   MODERN MINIMAL TEMPLATE
   Phong cách: Tối giản, bold typography, editorial
   Palette : White / Near-white / Black text
   Layout  : Asymmetric, dramatic type scale, grid splits
   ═══════════════════════════════════════════════════════ */

const WHITE = "#FFFFFF";
const OFF_WHITE = "#FAFAF8";
const LIGHT_GRAY = "#F0EFED";
const TEXT_PRIMARY = "#1A1A1A";
const TEXT_MUTED = "#999892";
const ACCENT = "#C5B89C";

/* ─── Preview Card (Builder LivePreview) ──────────────── */
export function PreviewCard({ data }: { data: InvitationData }) {
  const br = data.theme.borderRadius;
  const countdownItems = getCountdownItems(data.event.date);

  // Format date as DD.MM.YYYY
  const shortDate = data.event.date
    ? new Date(data.event.date).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, ".")
    : "—";

  return (
    <div className="max-w-lg mx-auto shadow-lg overflow-hidden" style={{ borderRadius: `${br}px`, background: WHITE }}>
      {/* Split layout: Image left + Text right */}
      <div className="flex" style={{ minHeight: 200 }}>
        {/* Image - left 40% */}
        <div className="overflow-hidden" style={{ width: "40%" }}>
          <img src={heroWedding} alt="Preview" className="w-full h-full object-cover" />
        </div>

        {/* Text - right 60% */}
        <div className="flex-1 flex flex-col justify-center p-5" style={{ background: OFF_WHITE }}>
          <p style={{ fontSize: "0.5rem", letterSpacing: "0.3em", textTransform: "uppercase", color: TEXT_MUTED, marginBottom: 12 }}>
            The wedding of
          </p>

          {/* Names - stacked, bold, left-aligned */}
          <div style={{ lineHeight: 1 }}>
            <p style={{ fontFamily: data.fonts.heading, fontSize: "1.4rem", color: TEXT_PRIMARY, fontWeight: 400 }}>
              {(data.couple.brideName || "Cô dâu").split(" ").pop()}
            </p>
            <div className="my-1.5" style={{ width: 30, height: 2, background: ACCENT }} />
            <p style={{ fontFamily: data.fonts.heading, fontSize: "1.4rem", color: TEXT_PRIMARY, fontWeight: 400 }}>
              {(data.couple.groomName || "Chú rể").split(" ").pop()}
            </p>
          </div>

          <div className="mt-4" style={{ width: 50, height: 1, background: LIGHT_GRAY }} />

          <p className="mt-3" style={{ fontFamily: data.fonts.body, fontSize: "0.75rem", fontWeight: 500, color: TEXT_PRIMARY, letterSpacing: "0.05em" }}>
            {shortDate}
          </p>
          <p style={{ fontFamily: data.fonts.body, fontSize: "0.65rem", fontWeight: 300, color: TEXT_MUTED, marginTop: 4 }}>
            {data.event.venue}
          </p>
        </div>
      </div>

      {/* Thin accent line */}
      <div style={{ height: 2, background: ACCENT }} />

      {/* Content below */}
      <div className="p-5 space-y-5" style={{ fontFamily: data.fonts.body, background: WHITE }}>
        {/* Full names + time */}
        <div className="flex items-baseline justify-between">
          <p style={{ fontSize: "0.8rem", fontWeight: 400, color: TEXT_PRIMARY }}>
            {data.couple.brideName} & {data.couple.groomName}
          </p>
          {data.event.time && (
            <p className="flex items-center gap-1" style={{ fontSize: "0.65rem", color: TEXT_MUTED }}>
              <Clock className="h-2.5 w-2.5" />{data.event.time}
            </p>
          )}
        </div>

        {/* Countdown - clean grid with border */}
        {data.event.date && (
          <div className="grid grid-cols-4 gap-0 border" style={{ borderColor: LIGHT_GRAY, borderRadius: `${Math.max(2, br - 6)}px`, overflow: "hidden" }}>
            {countdownItems.map((d, i) => (
              <div
                key={d.l}
                className="py-3 text-center"
                style={{
                  borderRight: i < 3 ? `1px solid ${LIGHT_GRAY}` : "none",
                }}
              >
                <p style={{ fontFamily: data.fonts.heading, fontSize: "1.1rem", color: TEXT_PRIMARY }}>{d.n}</p>
                <p style={{ fontSize: "0.5rem", fontWeight: 300, color: TEXT_MUTED, textTransform: "uppercase", letterSpacing: "0.1em" }}>{d.l}</p>
              </div>
            ))}
          </div>
        )}

        {/* Message - left aligned */}
        {data.couple.message && (
          <p style={{ fontSize: "0.75rem", fontWeight: 300, color: TEXT_MUTED, lineHeight: 1.8, borderLeft: `2px solid ${ACCENT}`, paddingLeft: 12 }}>
            {data.couple.message}
          </p>
        )}

        {/* Love story - horizontal timeline */}
        {data.loveStory.items.length > 0 && (
          <div>
            <p className="mb-3" style={{ fontSize: "0.65rem", fontWeight: 500, color: TEXT_PRIMARY, textTransform: "uppercase", letterSpacing: "0.15em" }}>
              {data.loveStory.title}
            </p>
            <div className="space-y-2.5">
              {data.loveStory.items.map((item, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span style={{ fontFamily: data.fonts.heading, fontSize: "0.7rem", fontWeight: 500, color: ACCENT, minWidth: 30, paddingTop: 1 }}>
                    {item.year}
                  </span>
                  <div style={{ width: 1, minHeight: 12, background: LIGHT_GRAY, marginTop: 4 }} />
                  <p style={{ fontSize: "0.7rem", fontWeight: 300, color: TEXT_MUTED, lineHeight: 1.5 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gallery */}
        {data.gallery.filter(Boolean).length > 0 && (
          <div className="grid grid-cols-3 gap-1">
            {data.gallery.filter(Boolean).map((url, i) => (
              <img key={i} src={url} alt={`Gallery ${i + 1}`} className="w-full aspect-square object-cover" style={{ borderRadius: `${Math.max(1, br - 10)}px` }} />
            ))}
          </div>
        )}

        {/* RSVP - minimal */}
        {data.rsvp.enabled && (
          <div className="space-y-2 pt-2" style={{ borderTop: `1px solid ${LIGHT_GRAY}` }}>
            <p style={{ fontSize: "0.65rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.15em", color: TEXT_PRIMARY }}>
              RSVP
            </p>
            <div className="space-y-1.5">
              <div className="h-7 border" style={{ borderColor: LIGHT_GRAY, borderRadius: `${Math.max(2, br - 8)}px` }} />
              <div className="h-7 border" style={{ borderColor: LIGHT_GRAY, borderRadius: `${Math.max(2, br - 8)}px` }} />
            </div>
            <div className="h-8" style={{ background: TEXT_PRIMARY, borderRadius: `${Math.max(2, br - 8)}px` }} />
          </div>
        )}

        {/* Wishes */}
        {data.wishes.enabled && (
          <div className="space-y-2 pt-2" style={{ borderTop: `1px solid ${LIGHT_GRAY}` }}>
            <p style={{ fontSize: "0.65rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.15em", color: TEXT_PRIMARY }}>
              Lời chúc
            </p>
            <div className="h-14 border" style={{ borderColor: LIGHT_GRAY, borderRadius: `${Math.max(2, br - 8)}px` }} />
            <div className="h-8" style={{ background: TEXT_PRIMARY, borderRadius: `${Math.max(2, br - 8)}px` }} />
          </div>
        )}
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
  // Short date
  const shortDate = data.event.date
    ? new Date(data.event.date).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, ".")
    : "—";

  return (
    <section className="min-h-screen flex items-center justify-center px-4 md:px-0" style={{ background: WHITE }}>
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row min-h-screen">
        {/* Left: Image - full height on desktop */}
        <div className="md:w-[45%] h-[45vh] md:h-auto relative overflow-hidden">
          <img src={heroWedding} alt="Ảnh cưới" className="absolute inset-0 w-full h-full object-cover" />
        </div>

        {/* Right: Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: showMonogram ? 0 : 1, x: showMonogram ? 40 : 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16"
          style={{ background: OFF_WHITE }}
        >
          <p className="mb-10" style={{ fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: TEXT_MUTED }}>
            The wedding of
          </p>

          {/* Names - very large, stacked */}
          <div style={{ lineHeight: 0.95 }}>
            <h1 style={{ fontFamily: data.fonts.heading, fontSize: "clamp(2.5rem, 6vw, 5rem)", color: TEXT_PRIMARY }}>
              {data.couple.brideName}
            </h1>
            <div className="my-4" style={{ width: 50, height: 2, background: ACCENT }} />
            <h1 style={{ fontFamily: data.fonts.heading, fontSize: "clamp(2.5rem, 6vw, 5rem)", color: TEXT_PRIMARY }}>
              {data.couple.groomName}
            </h1>
          </div>

          <div className="mt-10" style={{ width: 80, height: 1, background: LIGHT_GRAY }} />

          {/* Date block */}
          <div className="mt-6">
            <p style={{ fontFamily: data.fonts.body, fontSize: "1.5rem", fontWeight: 300, color: TEXT_PRIMARY, letterSpacing: "0.05em" }}>
              {shortDate}
            </p>
            <div className="flex items-center gap-3 mt-2" style={{ color: TEXT_MUTED, fontSize: "0.85rem" }}>
              {data.event.time && <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{data.event.time}</span>}
              <span>·</span>
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{data.event.venue}</span>
            </div>
          </div>

          {data.couple.hashtag && (
            <p className="mt-8" style={{ fontFamily: data.fonts.body, fontSize: "0.7rem", letterSpacing: "0.25em", color: TEXT_MUTED }}>
              {data.couple.hashtag}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export const pageStyle: React.CSSProperties = {};
