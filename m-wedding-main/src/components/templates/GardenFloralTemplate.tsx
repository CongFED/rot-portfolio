import { MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import heroWedding from "@/assets/hero-wedding.jpg";
import type { InvitationData } from "@/types/invitation";
import { formatViDate, getCountdownItems } from "@/types/invitation";

/* ═══════════════════════════════════════════════════════
   GARDEN FLORAL TEMPLATE
   Phong cách: Nhẹ nhàng, lãng mạn, thiên nhiên
   Palette : Sage green / Cream / Warm white
   Layout  : Circular image, botanical accents, organic
   ═══════════════════════════════════════════════════════ */

const SAGE = "hsl(145 28% 48%)";
const SAGE_DIM = "hsl(145 20% 65%)";
const SAGE_BG = "hsl(140 22% 96%)";
const SAGE_CARD = "hsl(140 18% 93%)";
const LEAF_DARK = "hsl(145 30% 28%)";
const WARM = "hsl(35 30% 30%)";

function LeafDivider() {
  return (
    <div className="flex items-center justify-center gap-2 my-4" style={{ color: SAGE_DIM }}>
      <div className="h-px flex-1 max-w-[40px]" style={{ background: `${SAGE_DIM}60` }} />
      <span style={{ fontSize: "0.7rem" }}>🌿</span>
      <div className="h-px flex-1 max-w-[40px]" style={{ background: `${SAGE_DIM}60` }} />
    </div>
  );
}

/* ─── Preview Card (Builder LivePreview) ──────────────── */
export function PreviewCard({ data }: { data: InvitationData }) {
  const br = data.theme.borderRadius;
  const formattedDate = formatViDate(data.event.date);
  const countdownItems = getCountdownItems(data.event.date);

  return (
    <div
      className="max-w-lg mx-auto shadow-lg overflow-hidden"
      style={{
        borderRadius: `${br}px`,
        background: SAGE_BG,
        border: `1px solid ${SAGE_DIM}30`,
      }}
    >
      {/* Top botanical decoration */}
      <div className="text-center pt-6 pb-1">
        <p style={{ color: SAGE_DIM, fontSize: "0.65rem", letterSpacing: "0.3em" }}>🌿 ─── ✿ ─── 🌿</p>
      </div>

      {/* Circular photo frame */}
      <div className="flex justify-center py-4">
        <div
          className="overflow-hidden"
          style={{
            width: 130,
            height: 130,
            borderRadius: "50%",
            border: `3px solid ${SAGE_DIM}40`,
            boxShadow: `0 4px 24px ${SAGE}15`,
          }}
        >
          <img src={heroWedding} alt="Preview" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Save the date */}
      <div className="text-center px-6">
        <p style={{ color: SAGE, fontSize: "0.55rem", letterSpacing: "0.25em", textTransform: "uppercase" }}>
          🍃 Save the Date 🍃
        </p>

        <LeafDivider />

        {/* Names */}
        <p style={{ fontFamily: data.fonts.heading, fontSize: "1.5rem", color: LEAF_DARK, lineHeight: 1.2 }}>
          {data.couple.brideName || "Cô dâu"}
        </p>
        <p style={{ fontFamily: data.fonts.heading, fontSize: "0.85rem", color: SAGE, margin: "4px 0" }}>&</p>
        <p style={{ fontFamily: data.fonts.heading, fontSize: "1.5rem", color: LEAF_DARK, lineHeight: 1.2 }}>
          {data.couple.groomName || "Chú rể"}
        </p>

        {data.couple.hashtag && (
          <p className="mt-2" style={{ fontSize: "0.55rem", letterSpacing: "0.2em", color: SAGE_DIM }}>
            {data.couple.hashtag}
          </p>
        )}

        <LeafDivider />

        {/* Date & venue */}
        <p style={{ fontFamily: data.fonts.heading, fontSize: "0.95rem", color: LEAF_DARK }}>{formattedDate}</p>
        {data.event.time && (
          <p className="flex items-center justify-center gap-1 mt-1" style={{ fontSize: "0.7rem", color: WARM, opacity: 0.6 }}>
            <Clock className="h-3 w-3" />{data.event.time}
          </p>
        )}
        <p className="flex items-center justify-center gap-1 mt-1" style={{ fontSize: "0.7rem", fontWeight: 300, color: WARM, opacity: 0.55 }}>
          <MapPin className="h-3 w-3" />{data.event.venue}
        </p>
      </div>

      {/* Countdown */}
      {data.event.date && (
        <div className="grid grid-cols-4 gap-2 mx-5 mt-5">
          {countdownItems.map((d) => (
            <div
              key={d.l}
              className="py-2.5 text-center"
              style={{
                background: `${SAGE}10`,
                borderRadius: `${Math.max(8, br)}px`,
                border: `1px solid ${SAGE_DIM}25`,
              }}
            >
              <p style={{ fontFamily: data.fonts.heading, fontSize: "1rem", color: LEAF_DARK }}>{d.n}</p>
              <p style={{ fontSize: "0.55rem", fontWeight: 300, color: SAGE_DIM }}>{d.l}</p>
            </div>
          ))}
        </div>
      )}

      {/* Content sections with green accents */}
      <div className="px-5 pt-4 pb-6 space-y-4" style={{ fontFamily: data.fonts.body }}>
        {data.couple.message && (
          <p className="text-center" style={{ fontSize: "0.75rem", fontWeight: 300, color: WARM, opacity: 0.7, lineHeight: 1.8 }}>
            {data.couple.message}
          </p>
        )}

        {data.loveStory.items.length > 0 && (
          <div className="text-left">
            <p className="text-center mb-3" style={{ fontFamily: data.fonts.heading, fontSize: "0.8rem", color: LEAF_DARK }}>
              {data.loveStory.title}
            </p>
            <div className="relative space-y-3" style={{ paddingLeft: 18, borderLeft: `1.5px solid ${SAGE}30` }}>
              {data.loveStory.items.map((item, i) => (
                <div key={i} className="relative">
                  <div className="absolute rounded-full" style={{ left: -22.5, top: 3, width: 8, height: 8, background: SAGE, border: `2px solid ${SAGE_BG}` }} />
                  <p style={{ fontSize: "0.65rem", fontWeight: 500, color: SAGE }}>{item.year}</p>
                  <p style={{ fontSize: "0.7rem", fontWeight: 300, color: WARM, opacity: 0.6 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.gallery.filter(Boolean).length > 0 && (
          <div className="grid grid-cols-3 gap-1.5">
            {data.gallery.filter(Boolean).map((url, i) => (
              <img key={i} src={url} alt={`Gallery ${i + 1}`} className="w-full aspect-square object-cover" style={{ borderRadius: `${Math.max(6, br)}px`, border: `1px solid ${SAGE_DIM}30` }} />
            ))}
          </div>
        )}

        {data.rsvp.enabled && (
          <div className="p-4" style={{ background: SAGE_CARD, borderRadius: `${Math.max(8, br)}px`, border: `1px solid ${SAGE_DIM}20` }}>
            <p style={{ fontFamily: data.fonts.heading, fontSize: "0.8rem", color: LEAF_DARK }}>Xác nhận tham dự</p>
            <div className="space-y-2 mt-3">
              <div className="h-7 bg-white/70 rounded border" style={{ borderColor: `${SAGE_DIM}30` }} />
              <div className="h-7 bg-white/70 rounded border" style={{ borderColor: `${SAGE_DIM}30` }} />
            </div>
            <div className="h-8 rounded mt-2" style={{ background: `${SAGE}25`, borderRadius: `${Math.max(6, br - 4)}px` }} />
          </div>
        )}

        {data.wishes.enabled && (
          <div className="p-4" style={{ background: SAGE_CARD, borderRadius: `${Math.max(8, br)}px`, border: `1px solid ${SAGE_DIM}20` }}>
            <p style={{ fontFamily: data.fonts.heading, fontSize: "0.8rem", color: LEAF_DARK }}>Gửi lời chúc</p>
            <div className="h-16 bg-white/70 rounded mt-2 border" style={{ borderColor: `${SAGE_DIM}30` }} />
            <div className="h-8 rounded mt-2" style={{ background: `${SAGE}25`, borderRadius: `${Math.max(6, br - 4)}px` }} />
          </div>
        )}

        {/* Bottom botanical */}
        <div className="text-center pt-2">
          <p style={{ color: SAGE_DIM, fontSize: "0.6rem", letterSpacing: "0.3em" }}>🌸 ─── 🍃 ─── 🌸</p>
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
  const br = data.theme.borderRadius;

  return (
    <section
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: `linear-gradient(170deg, ${SAGE_BG} 0%, hsl(35 40% 97%) 50%, ${SAGE_BG} 100%)` }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: showMonogram ? 0 : 1, y: showMonogram ? 30 : 0, scale: showMonogram ? 0.97 : 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-center max-w-xl w-full py-12 px-6"
      >
        {/* Top botanical */}
        <p className="mb-6" style={{ color: SAGE_DIM, fontSize: "0.8rem", letterSpacing: "0.4em" }}>🌿 ─── ✿ ─── 🌿</p>

        {/* Circular photo */}
        <div className="mx-auto mb-8" style={{ width: 180, height: 180, borderRadius: "50%", overflow: "hidden", border: `4px solid ${SAGE}30`, boxShadow: `0 8px 40px ${SAGE}15` }}>
          <img src={heroWedding} alt="Ảnh cưới" className="w-full h-full object-cover" />
        </div>

        <p className="mb-6" style={{ fontFamily: data.fonts.body, fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: SAGE }}>
          🍃 Save the Date 🍃
        </p>

        <h1 style={{ fontFamily: data.fonts.heading, fontSize: "clamp(2.2rem, 6vw, 3.5rem)", color: LEAF_DARK, lineHeight: 1.1 }}>
          {data.couple.brideName}
        </h1>

        <div className="flex items-center justify-center gap-3 my-3" style={{ color: SAGE_DIM }}>
          <div className="h-px flex-1 max-w-[50px]" style={{ background: `${SAGE}40` }} />
          <span style={{ fontFamily: data.fonts.heading, fontSize: "1.2rem", color: SAGE }}>&</span>
          <div className="h-px flex-1 max-w-[50px]" style={{ background: `${SAGE}40` }} />
        </div>

        <h1 style={{ fontFamily: data.fonts.heading, fontSize: "clamp(2.2rem, 6vw, 3.5rem)", color: LEAF_DARK, lineHeight: 1.1 }}>
          {data.couple.groomName}
        </h1>

        <LeafDivider />

        <p style={{ fontFamily: data.fonts.body, fontSize: "1rem", color: LEAF_DARK }}>{formattedDate}</p>
        <p className="mt-2" style={{ fontFamily: data.fonts.body, fontSize: "0.85rem", color: WARM, opacity: 0.6 }}>
          {data.event.time} · {data.event.venue}
        </p>

        {data.couple.hashtag && (
          <p className="mt-6" style={{ fontFamily: data.fonts.body, fontSize: "0.7rem", letterSpacing: "0.25em", color: SAGE_DIM }}>
            {data.couple.hashtag}
          </p>
        )}

        <p className="mt-10" style={{ color: SAGE_DIM, fontSize: "0.75rem", letterSpacing: "0.3em" }}>🌸 ─── 🍃 ─── 🌸</p>
      </motion.div>
    </section>
  );
}

export const pageStyle: React.CSSProperties = {
  // @ts-ignore
  "--champagne": "145 28% 48%",
  "--accent": "145 28% 48%",
};
