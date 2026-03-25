import { Clock } from "lucide-react";
import { motion } from "framer-motion";
import heroWedding from "@/assets/hero-wedding.jpg";
import type { InvitationData } from "@/types/invitation";
import { formatViDate, getCountdownItems } from "@/types/invitation";

/* ═══════════════════════════════════════════════════════
   LUXURY DARK TEMPLATE
   Phong cách: Sang trọng, nền tối, premium
   Palette : Black / Charcoal / Gold champagne
   Layout  : Hero image + dark card, dramatic spacing
   ═══════════════════════════════════════════════════════ */

const BG = "#0A0A0F";
const CARD_BG = "#111118";
const GOLD = "#C5A468";
const GOLD_DIM = "rgba(197,164,104,0.4)";
const GOLD_FAINT = "rgba(197,164,104,0.08)";
const TEXT_LIGHT = "#EDE4D3";
const TEXT_DIM = "rgba(197,164,104,0.55)";

function GoldLine({ className = "" }: { className?: string }) {
  return <div className={`h-px mx-auto ${className}`} style={{ width: 80, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }} />;
}

/* ─── Preview Card (Builder LivePreview) ──────────────── */
export function PreviewCard({ data }: { data: InvitationData }) {
  const br = data.theme.borderRadius;
  const formattedDate = formatViDate(data.event.date);
  const countdownItems = getCountdownItems(data.event.date);

  return (
    <div className="max-w-lg mx-auto shadow-2xl overflow-hidden" style={{ borderRadius: `${br}px`, background: BG }}>
      {/* Hero image with dark overlay */}
      <div className="relative h-52 overflow-hidden">
        <img src={heroWedding} alt="Preview" className="w-full h-full object-cover" style={{ filter: "brightness(0.3) saturate(0.7)" }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 40%, ${BG})` }} />
        <div className="absolute bottom-4 inset-x-0 text-center">
          <p style={{ color: GOLD_DIM, fontSize: "0.55rem", letterSpacing: "0.35em", textTransform: "uppercase" }}>Wedding Invitation</p>
        </div>
      </div>

      <GoldLine className="mt-0" />

      {/* Names section */}
      <div className="px-6 pt-6 pb-2 text-center">
        <p style={{ fontFamily: data.fonts.heading, fontSize: "1.75rem", color: TEXT_LIGHT, lineHeight: 1.15 }}>
          {data.couple.brideName || "Cô dâu"}
        </p>
        <p style={{ fontFamily: data.fonts.heading, fontSize: "0.9rem", color: GOLD_DIM, margin: "6px 0" }}>&</p>
        <p style={{ fontFamily: data.fonts.heading, fontSize: "1.75rem", color: TEXT_LIGHT, lineHeight: 1.15 }}>
          {data.couple.groomName || "Chú rể"}
        </p>
        {data.couple.hashtag && (
          <p className="mt-2" style={{ fontSize: "0.55rem", letterSpacing: "0.2em", color: GOLD_DIM }}>{data.couple.hashtag}</p>
        )}
      </div>

      <GoldLine className="my-4" />

      {/* Date & venue */}
      <div className="text-center pb-4">
        <p style={{ fontFamily: data.fonts.heading, fontSize: "0.95rem", color: TEXT_LIGHT }}>{formattedDate}</p>
        {data.event.time && (
          <p className="flex items-center justify-center gap-1 mt-1" style={{ fontSize: "0.7rem", color: TEXT_DIM }}>
            <Clock className="h-3 w-3" />{data.event.time} · {data.event.venue}
          </p>
        )}
      </div>

      {/* Countdown */}
      {data.event.date && (
        <div className="grid grid-cols-4 gap-2.5 mx-5 mb-5">
          {countdownItems.map((d) => (
            <div
              key={d.l}
              className="py-2.5 text-center"
              style={{ background: GOLD_FAINT, border: `1px solid ${GOLD_DIM}30`, borderRadius: `${Math.max(4, br - 4)}px` }}
            >
              <p style={{ fontFamily: data.fonts.heading, fontSize: "1rem", color: TEXT_LIGHT }}>{d.n}</p>
              <p style={{ fontSize: "0.55rem", color: TEXT_DIM }}>{d.l}</p>
            </div>
          ))}
        </div>
      )}

      {/* Content sections – dark themed */}
      <div className="px-5 pb-6 space-y-4" style={{ fontFamily: data.fonts.body }}>
        {data.couple.message && (
          <p className="text-center" style={{ fontSize: "0.75rem", fontWeight: 300, color: TEXT_DIM, lineHeight: 1.8 }}>
            {data.couple.message}
          </p>
        )}

        {data.loveStory.items.length > 0 && (
          <div className="text-left">
            <p className="text-center mb-3" style={{ fontFamily: data.fonts.heading, fontSize: "0.8rem", color: TEXT_LIGHT }}>
              {data.loveStory.title}
            </p>
            <div className="relative space-y-3" style={{ paddingLeft: 18, borderLeft: `1px solid ${GOLD_DIM}30` }}>
              {data.loveStory.items.map((item, i) => (
                <div key={i} className="relative">
                  <div className="absolute rounded-full" style={{ left: -22, top: 3, width: 7, height: 7, background: GOLD, border: `2px solid ${BG}` }} />
                  <p style={{ fontSize: "0.65rem", fontWeight: 500, color: GOLD }}>{item.year}</p>
                  <p style={{ fontSize: "0.7rem", fontWeight: 300, color: TEXT_DIM }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.gallery.filter(Boolean).length > 0 && (
          <div className="grid grid-cols-3 gap-1.5">
            {data.gallery.filter(Boolean).map((url, i) => (
              <img key={i} src={url} alt={`Gallery ${i + 1}`} className="w-full aspect-square object-cover brightness-90" style={{ borderRadius: `${Math.max(2, br - 8)}px` }} />
            ))}
          </div>
        )}

        {data.rsvp.enabled && (
          <div className="p-4 space-y-3" style={{ background: GOLD_FAINT, borderRadius: `${br}px`, border: `1px solid ${GOLD_DIM}20` }}>
            <p style={{ fontFamily: data.fonts.heading, fontSize: "0.8rem", color: TEXT_LIGHT }}>Xác nhận tham dự</p>
            <div className="space-y-2">
              <div className="h-7 rounded" style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${GOLD_DIM}15` }} />
              <div className="h-7 rounded" style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${GOLD_DIM}15` }} />
            </div>
            <div className="h-8 rounded" style={{ background: `${GOLD}20`, borderRadius: `${Math.max(4, br - 4)}px` }} />
          </div>
        )}

        {data.wishes.enabled && (
          <div className="p-4 space-y-2" style={{ background: GOLD_FAINT, borderRadius: `${br}px`, border: `1px solid ${GOLD_DIM}20` }}>
            <p style={{ fontFamily: data.fonts.heading, fontSize: "0.8rem", color: TEXT_LIGHT }}>Gửi lời chúc</p>
            <div className="h-16 rounded" style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${GOLD_DIM}15` }} />
            <div className="h-8 rounded" style={{ background: `${GOLD}20`, borderRadius: `${Math.max(4, br - 4)}px` }} />
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
  const br = data.theme.borderRadius;

  return (
    <section className="relative min-h-screen flex flex-col" style={{ background: BG }}>
      {/* Large hero image – top half */}
      <div className="relative h-[55vh] overflow-hidden">
        <img src={heroWedding} alt="Ảnh cưới" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.3) saturate(0.6)" }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 50%, ${BG})` }} />
      </div>

      {/* Content overlapping image */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: showMonogram ? 0 : 1, y: showMonogram ? 50 : 0 }}
        transition={{ duration: 0.9, delay: 0.3 }}
        className="relative z-10 -mt-40 text-center px-4 pb-16"
      >
        <GoldLine className="mb-10" />
        <p className="mb-8" style={{ color: GOLD_DIM, fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase" }}>
          ✦ Wedding Invitation ✦
        </p>
        <h1 style={{ fontFamily: data.fonts.heading, fontSize: "clamp(2.5rem, 7vw, 4.5rem)", color: TEXT_LIGHT, lineHeight: 1.05 }}>
          {data.couple.brideName}
        </h1>
        <p className="my-3" style={{ fontFamily: data.fonts.heading, fontSize: "1.5rem", color: GOLD_DIM }}>&</p>
        <h1 style={{ fontFamily: data.fonts.heading, fontSize: "clamp(2.5rem, 7vw, 4.5rem)", color: TEXT_LIGHT, lineHeight: 1.05 }}>
          {data.couple.groomName}
        </h1>
        <GoldLine className="my-8" />
        <p style={{ fontFamily: data.fonts.body, fontSize: "1.1rem", color: TEXT_LIGHT }}>{formattedDate}</p>
        <p className="mt-2" style={{ fontFamily: data.fonts.body, fontSize: "0.85rem", color: TEXT_DIM }}>
          {data.event.time} · {data.event.venue}
        </p>
        {data.couple.hashtag && (
          <p className="mt-6" style={{ fontFamily: data.fonts.body, fontSize: "0.7rem", letterSpacing: "0.25em", color: GOLD_DIM }}>
            {data.couple.hashtag}
          </p>
        )}
      </motion.div>
    </section>
  );
}

/* ─── Page style overrides ─────────────────────────── */
export const isDarkTemplate = true;

export const pageStyle: React.CSSProperties = {
  background: BG,
  color: TEXT_LIGHT,
};

export const sectionStyle: React.CSSProperties = {
  // @ts-ignore – CSS custom properties for dark sections
  "--background": "230 20% 6%",
  "--foreground": "38 30% 88%",
  "--secondary": "230 15% 12%",
  "--muted-foreground": "38 20% 60%",
  "--border": "38 30% 30%",
  "--champagne": "38 55% 60%",
};
