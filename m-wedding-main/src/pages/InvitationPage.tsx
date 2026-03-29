import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroWedding from "@/assets/hero-wedding.jpg";
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Heart, Calendar, MessageSquare, Clock, Camera } from "lucide-react";
import { toast } from "sonner";
import { getRegistryTemplate } from "@/components/templates";
import MusicPlayerFloating from "@/components/MusicPlayerFloating";

interface InvitationData {
  couple: { brideName: string; groomName: string; hashtag: string; message: string };
  event: { date: string; time: string; venue: string; address: string; note: string };
  loveStory: { title: string; items: { year: string; text: string }[] };
  gallery: string[];
  map: { embedUrl: string; directions: string };
  rsvp: { enabled: boolean; deadline: string; maxGuests: number; askDiet: boolean };
  wishes: { enabled: boolean; moderateBeforeShow: boolean };
  theme: { colorScheme: string; borderRadius: number; template?: string };
  fonts: { heading: string; body: string };
  music: { enabled: boolean; url: string; autoplay: boolean };
  seo: { title: string; description: string; ogImage: string };
}

const defaultInv: InvitationData = {
  couple: { brideName: "Minh Anh", groomName: "Đức Huy", hashtag: "#MinhAnhDucHuy2026", message: "Sự hiện diện của quý khách là niềm vinh hạnh cho gia đình chúng tôi." },
  event: { date: "2026-12-15", time: "17:30", venue: "Nhà hàng Maison", address: "123 Đường Nguyễn Huệ, Q.1, TP. Hồ Chí Minh", note: "Vui lòng đến trước 30 phút" },
  loveStory: { title: "Chuyện tình yêu", items: [
    { year: "2020", text: "Lần đầu gặp nhau tại quán cà phê trên phố Bùi Viện" },
    { year: "2022", text: "Chuyến du lịch Đà Lạt và lời tỏ tình dưới mưa" },
    { year: "2026", text: "Ngày về chung một nhà" },
  ]},
  gallery: [],
  map: { embedUrl: "", directions: "Từ trung tâm Q.1 đi theo đường Nguyễn Huệ khoảng 5 phút" },
  rsvp: { enabled: true, deadline: "2026-12-01", maxGuests: 5, askDiet: true },
  wishes: { enabled: true, moderateBeforeShow: false },
  theme: { colorScheme: "champagne", borderRadius: 12, template: "classic" },
  fonts: { heading: "Prata", body: "Be Vietnam Pro" },
  music: { enabled: true, url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", autoplay: true },
  seo: { title: "Thiệp cưới Minh Anh & Đức Huy", description: "Kính mời quý khách đến dự lễ cưới của chúng tôi", ogImage: "" },
};

const colorSchemes: Record<string, { bg: string; fg: string }> = {
  champagne: { bg: "hsl(24 38% 76%)", fg: "hsl(0 11% 31%)" },
  blush: { bg: "hsl(340 40% 85%)", fg: "hsl(340 30% 25%)" },
  sage: { bg: "hsl(140 25% 80%)", fg: "hsl(140 30% 20%)" },
  navy: { bg: "hsl(220 50% 25%)", fg: "hsl(40 80% 75%)" },
};

const InvitationPage = () => {
  const [showMonogram, setShowMonogram] = useState(true);
  const [rsvpStatus, setRsvpStatus] = useState<string | null>(null);
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpPhone, setRsvpPhone] = useState("");
  const [rsvpGuests, setRsvpGuests] = useState(1);
  const [rsvpDiet, setRsvpDiet] = useState("");
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [wishName, setWishName] = useState("");
  const [wishText, setWishText] = useState("");
  const [localWishes, setLocalWishes] = useState<{ name: string; text: string }[]>([]);
  const [inv, setInv] = useState<InvitationData>(defaultInv);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    try {
      const raw = localStorage.getItem("giayvagio_invitation");
      if (raw) setInv(JSON.parse(raw));
    } catch { /* use default */ }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowMonogram(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Live countdown
  useEffect(() => {
    if (!inv.event.date) return;
    const update = () => {
      const diff = Math.max(0, Math.floor((new Date(inv.event.date).getTime() - Date.now()) / 1000));
      setCountdown({
        days: Math.floor(diff / 86400),
        hours: Math.floor((diff % 86400) / 3600),
        mins: Math.floor((diff % 3600) / 60),
        secs: diff % 60,
      });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [inv.event.date]);

  // Update page title
  useEffect(() => {
    if (inv.seo.title) document.title = inv.seo.title;
  }, [inv.seo.title]);

  const scheme = colorSchemes[inv.theme.colorScheme] || colorSchemes.champagne;
  const br = inv.theme.borderRadius;
  const formattedDate = inv.event.date
    ? new Date(inv.event.date).toLocaleDateString("vi-VN", { day: "numeric", month: "long", year: "numeric" })
    : "Chưa chọn ngày";

  const monogramInitials = `${inv.couple.brideName.charAt(0)}${inv.couple.groomName.charAt(0)}`;
  const tpl = inv.theme.template || "classic";

  const handleRsvpSubmit = () => {
    if (!rsvpName.trim()) { toast.error("Vui lòng nhập họ tên"); return; }
    if (!rsvpStatus) { toast.error("Vui lòng chọn trạng thái tham dự"); return; }
    setRsvpSubmitted(true);
    toast.success("Cảm ơn bạn đã xác nhận!", { description: rsvpStatus === "Sẽ tham dự" ? "Chúng tôi rất vui được đón tiếp bạn." : "Cảm ơn bạn đã phản hồi." });
  };

  const handleWishSubmit = () => {
    if (!wishName.trim() || !wishText.trim()) { toast.error("Vui lòng nhập đầy đủ thông tin"); return; }
    setLocalWishes(prev => [{ name: wishName, text: wishText }, ...prev]);
    setWishName("");
    setWishText("");
    toast.success("Đã gửi lời chúc! 💐");
  };

  const defaultWishes = [
    { name: "Cô Nguyễn Thị Hoa", text: "Chúc hai con trăm năm hạnh phúc, sớm có tin vui nhé!" },
    { name: "Anh Trần Văn Minh", text: "Chúc mừng hạnh phúc! Hai bạn thật xứng đôi vừa lứa." },
    { name: "Chị Lê Thu Hà", text: "Happy wedding! Chúc anh chị hạnh phúc viên mãn!" },
  ];
  const allWishes = [...localWishes, ...defaultWishes];

  return (
    <div className="min-h-screen bg-background relative">
      {/* Monogram unfolding */}
      <AnimatePresence>
        {showMonogram && (
          <motion.div
            className="fixed inset-0 z-50 bg-background flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-display text-5xl md:text-7xl text-foreground tracking-wider">
                {monogramInitials.charAt(0)}<span className="text-champagne">&</span>{monogramInitials.charAt(1)}
              </h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero - varies by template */}
      {tpl === "classic" && (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <img src={heroWedding} alt="Ảnh cưới" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: `${scheme.bg}44` }} />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: showMonogram ? 0 : 1, y: showMonogram ? 40 : 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative text-center z-10 px-4"
          >
            <p className="font-body text-sm font-light tracking-widest uppercase text-primary-foreground/70 mb-4">Trân trọng kính mời</p>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-primary-foreground mb-2" style={{ fontFamily: inv.fonts.heading }}>{inv.couple.brideName}</h1>
            <p className="font-display text-2xl text-primary-foreground/70 my-2">&</p>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-primary-foreground" style={{ fontFamily: inv.fonts.heading }}>{inv.couple.groomName}</h1>
            <p className="font-body text-base font-light text-primary-foreground/80 mt-6" style={{ fontFamily: inv.fonts.body }}>{formattedDate}</p>
            {inv.couple.hashtag && <p className="font-body text-xs tracking-widest text-primary-foreground/50 mt-3">{inv.couple.hashtag}</p>}
          </motion.div>
        </section>
      )}

      {tpl === "modern" && (
        <section className="relative min-h-screen flex flex-col md:flex-row overflow-hidden">
          <div className="md:w-1/2 h-[50vh] md:h-screen relative">
            <img src={heroWedding} alt="Ảnh cưới" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: showMonogram ? 0 : 1, x: showMonogram ? 40 : 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="md:w-1/2 flex items-center justify-center p-8 md:p-16"
            style={{ background: scheme.bg }}
          >
            <div className="text-center">
              <p className="text-xs tracking-[0.3em] uppercase mb-8 opacity-60" style={{ fontFamily: inv.fonts.body, color: scheme.fg }}>Save the date</p>
              <h1 className="text-4xl md:text-6xl leading-tight" style={{ fontFamily: inv.fonts.heading, color: scheme.fg }}>{inv.couple.brideName}</h1>
              <div className="w-16 h-px mx-auto my-4 opacity-40" style={{ background: scheme.fg }} />
              <h1 className="text-4xl md:text-6xl leading-tight" style={{ fontFamily: inv.fonts.heading, color: scheme.fg }}>{inv.couple.groomName}</h1>
              <p className="text-base mt-8 opacity-70" style={{ fontFamily: inv.fonts.body, color: scheme.fg }}>{formattedDate}</p>
              {inv.couple.hashtag && <p className="text-xs tracking-widest mt-4 opacity-50" style={{ fontFamily: inv.fonts.body, color: scheme.fg }}>{inv.couple.hashtag}</p>}
            </div>
          </motion.div>
        </section>
      )}

      {tpl === "minimal" && (
        <section className="min-h-screen flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: showMonogram ? 0 : 1, y: showMonogram ? 30 : 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center max-w-2xl"
          >
            <p className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground mb-8">Trân trọng kính mời</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl leading-tight" style={{ fontFamily: inv.fonts.heading, color: scheme.fg }}>{inv.couple.brideName}</h1>
            <p className="text-2xl my-3 opacity-40" style={{ fontFamily: inv.fonts.heading, color: scheme.fg }}>&</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl leading-tight" style={{ fontFamily: inv.fonts.heading, color: scheme.fg }}>{inv.couple.groomName}</h1>
            <div className="w-24 h-px mx-auto my-8" style={{ background: scheme.bg }} />
            <p className="text-lg" style={{ fontFamily: inv.fonts.body }}>{formattedDate}</p>
            <p className="text-sm text-muted-foreground mt-2">{inv.event.time} · {inv.event.venue}</p>
            {inv.couple.hashtag && <p className="font-body text-xs tracking-widest text-muted-foreground mt-6">{inv.couple.hashtag}</p>}
          </motion.div>
        </section>
      )}

      {tpl === "romantic" && (
        <section className="min-h-screen flex items-center justify-center px-4" style={{ background: `linear-gradient(135deg, ${scheme.bg}22, ${scheme.bg}08)` }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: showMonogram ? 0 : 1, scale: showMonogram ? 0.95 : 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center max-w-2xl relative p-12 md:p-20"
          >
            <div className="absolute inset-6 border-2 border-dashed opacity-20" style={{ borderColor: scheme.fg, borderRadius: `${br}px` }} />
            <p className="font-body text-xs tracking-[0.2em] uppercase mb-8 opacity-50" style={{ color: scheme.fg }}>♥ Save the Date ♥</p>
            <h1 className="text-5xl md:text-7xl leading-tight" style={{ fontFamily: inv.fonts.heading, color: scheme.fg }}>{inv.couple.brideName}</h1>
            <Heart className="h-6 w-6 mx-auto my-4 opacity-40" style={{ color: scheme.fg }} />
            <h1 className="text-5xl md:text-7xl leading-tight" style={{ fontFamily: inv.fonts.heading, color: scheme.fg }}>{inv.couple.groomName}</h1>
            <div className="h-px w-20 mx-auto my-8" style={{ background: `linear-gradient(90deg, transparent, ${scheme.bg}, transparent)` }} />
            <p className="text-lg" style={{ fontFamily: inv.fonts.body, color: scheme.fg }}>{formattedDate}</p>
            <p className="text-sm text-muted-foreground mt-2">{inv.event.time} · {inv.event.venue}</p>
            {inv.couple.hashtag && <p className="font-body text-xs tracking-widest text-muted-foreground mt-6">{inv.couple.hashtag}</p>}
          </motion.div>
        </section>
      )}

      {tpl === "rustic" && (
        <section className="relative min-h-screen overflow-hidden">
          <img src={heroWedding} alt="Ảnh cưới" className="absolute inset-0 w-full h-full object-cover grayscale-[30%] brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background" />
          <div className="relative z-10 min-h-screen flex items-end justify-center pb-16 px-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: showMonogram ? 0 : 1, y: showMonogram ? 40 : 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-background/95 backdrop-blur-sm border shadow-2xl p-8 md:p-12 text-center max-w-lg w-full"
              style={{ borderRadius: `${br}px`, borderColor: `${scheme.bg}66` }}
            >
              <p className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-4">🌿 Kính mời 🌿</p>
              <h1 className="text-4xl md:text-5xl leading-tight" style={{ fontFamily: inv.fonts.heading, color: scheme.fg }}>{inv.couple.brideName}</h1>
              <p className="text-lg my-2 opacity-40" style={{ fontFamily: inv.fonts.heading, color: scheme.fg }}>&</p>
              <h1 className="text-4xl md:text-5xl leading-tight" style={{ fontFamily: inv.fonts.heading, color: scheme.fg }}>{inv.couple.groomName}</h1>
              <div className="w-16 h-px mx-auto my-6" style={{ background: scheme.bg }} />
              <p className="text-base" style={{ fontFamily: inv.fonts.body }}>{formattedDate}</p>
              <p className="text-sm text-muted-foreground mt-1">{inv.event.time} · {inv.event.venue}</p>
              {inv.couple.hashtag && <p className="font-body text-xs tracking-widest text-muted-foreground mt-4">{inv.couple.hashtag}</p>}
            </motion.div>
          </div>
        </section>
      )}

      {tpl === "luxury" && (
        <section className="min-h-screen flex items-center justify-center px-4" style={{ background: "hsl(220 20% 10%)" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: showMonogram ? 0 : 1, y: showMonogram ? 30 : 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center max-w-2xl p-12 md:p-20 border border-amber-500/30"
            style={{ borderRadius: `${br}px` }}
          >
            <div className="w-16 h-px mx-auto mb-8 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            <p className="text-xs tracking-[0.3em] uppercase text-amber-400/60 mb-8" style={{ fontFamily: inv.fonts.body }}>Wedding Invitation</p>
            <h1 className="text-5xl md:text-7xl leading-tight text-amber-100" style={{ fontFamily: inv.fonts.heading }}>{inv.couple.brideName}</h1>
            <p className="text-2xl text-amber-400/50 my-3" style={{ fontFamily: inv.fonts.heading }}>&</p>
            <h1 className="text-5xl md:text-7xl leading-tight text-amber-100" style={{ fontFamily: inv.fonts.heading }}>{inv.couple.groomName}</h1>
            <div className="w-16 h-px mx-auto my-8 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            <p className="text-lg text-amber-200/60" style={{ fontFamily: inv.fonts.body }}>{formattedDate}</p>
            <p className="text-sm text-amber-200/40 mt-2">{inv.event.time} · {inv.event.venue}</p>
            {inv.couple.hashtag && <p className="text-xs tracking-widest text-amber-400/40 mt-6" style={{ fontFamily: inv.fonts.body }}>{inv.couple.hashtag}</p>}
          </motion.div>
        </section>
      )}

      {/* Registry-based template heroes (new scalable system) */}
      {(() => {
        const entry = getRegistryTemplate(tpl);
        if (!entry) return null;
        return (
          <entry.InvitationHero
            data={inv}
            showMonogram={showMonogram}
            formattedDate={formattedDate}
            scheme={scheme}
          />
        );
      })()}

      {!getRegistryTemplate(tpl)?.isFullPage && (
        <>
          {/* Countdown */}
      <section className="section-spacing bg-secondary/30">
        <div className="container-wide text-center">
          <AnimatedSection>
            <p className="font-body text-sm font-light tracking-widest uppercase text-muted-foreground mb-4">
              Đếm ngược đến ngày cưới
            </p>
            <div className="flex justify-center gap-4 md:gap-8">
              {[
                { n: countdown.days, l: "Ngày" },
                { n: countdown.hours, l: "Giờ" },
                { n: countdown.mins, l: "Phút" },
                { n: countdown.secs, l: "Giây" },
              ].map((d) => (
                <div key={d.l} className="bg-background border border-border/30 p-4 md:p-6 min-w-[70px] md:min-w-[90px]" style={{ borderRadius: `${br}px` }}>
                  <p className="font-display text-2xl md:text-4xl" style={{ fontFamily: inv.fonts.heading }}>{d.n}</p>
                  <p className="font-body text-xs font-light text-muted-foreground mt-1">{d.l}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Invitation message */}
      <section className="section-spacing">
        <div className="container-wide max-w-2xl text-center">
          <AnimatedSection>
            <Heart className="h-6 w-6 mx-auto text-champagne mb-6" />
            <p className="font-body text-base font-light text-muted-foreground leading-loose" style={{ fontFamily: inv.fonts.body }}>
              {inv.couple.message || "Được sự đồng ý của hai bên gia đình, chúng tôi trân trọng kính mời quý khách đến dự buổi lễ thành hôn của chúng tôi."}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Love story timeline */}
      {inv.loveStory.items.length > 0 && (
        <section className="section-spacing bg-secondary/30">
          <div className="container-wide max-w-2xl">
            <AnimatedSection className="text-center mb-12">
              <p className="font-body text-sm font-light tracking-widest uppercase text-muted-foreground mb-4">
                {inv.loveStory.title}
              </p>
              <h2 className="font-display text-3xl" style={{ fontFamily: inv.fonts.heading }}>Câu chuyện của chúng mình</h2>
            </AnimatedSection>

            <div className="space-y-8">
              {inv.loveStory.items.map((item, i) => (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <div className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-champagne shrink-0 mt-1.5" />
                      {i < inv.loveStory.items.length - 1 && <div className="w-px flex-1 bg-border mt-2" />}
                    </div>
                    <div className="pb-8">
                      <p className="font-body text-xs font-light tracking-widest uppercase text-muted-foreground mb-1">
                        {item.year}
                      </p>
                      <p className="font-body text-sm font-light text-muted-foreground leading-relaxed" style={{ fontFamily: inv.fonts.body }}>
                        {item.text}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Photo gallery */}
      <section className="section-spacing">
        <div className="container-wide">
          <AnimatedSection className="text-center mb-12">
            <Camera className="h-5 w-5 mx-auto text-muted-foreground mb-3" />
            <h2 className="font-display text-3xl" style={{ fontFamily: inv.fonts.heading }}>Album ảnh</h2>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {(inv.gallery.filter(Boolean).length > 0 ? inv.gallery.filter(Boolean) : [heroWedding, heroWedding, heroWedding, heroWedding, heroWedding, heroWedding]).map((src, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div className="aspect-square overflow-hidden bg-secondary/50" style={{ borderRadius: `${br}px` }}>
                  <img
                    src={src}
                    alt={`Ảnh cưới ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Event schedule */}
      <section className="section-spacing bg-secondary/30">
        <div className="container-wide max-w-2xl">
          <AnimatedSection className="text-center mb-12">
            <Calendar className="h-5 w-5 mx-auto text-muted-foreground mb-3" />
            <h2 className="font-display text-3xl" style={{ fontFamily: inv.fonts.heading }}>Lịch trình sự kiện</h2>
          </AnimatedSection>

          <AnimatedSection>
            <div className="bg-background border border-border/30 p-6 flex gap-6 items-start" style={{ borderRadius: `${br}px` }}>
              <div className="bg-champagne/20 px-4 py-2 shrink-0" style={{ borderRadius: `${Math.max(4, br - 4)}px` }}>
                <p className="font-display text-lg" style={{ fontFamily: inv.fonts.heading }}>{inv.event.time || "17:30"}</p>
              </div>
              <div>
                <h3 className="font-display text-base mb-1" style={{ fontFamily: inv.fonts.heading }}>{inv.event.venue}</h3>
                <p className="font-body text-sm font-light text-muted-foreground flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {inv.event.address}
                </p>
                {inv.event.note && (
                  <p className="font-body text-xs font-light text-muted-foreground italic mt-2">
                    <Clock className="h-3 w-3 inline mr-1" />{inv.event.note}
                  </p>
                )}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Map */}
      <section className="section-spacing">
        <div className="container-wide max-w-2xl text-center">
          <AnimatedSection>
            <MapPin className="h-5 w-5 mx-auto text-muted-foreground mb-3" />
            <h2 className="font-display text-3xl mb-4" style={{ fontFamily: inv.fonts.heading }}>Chỉ đường</h2>
            <p className="font-body text-sm font-light text-muted-foreground mb-6" style={{ fontFamily: inv.fonts.body }}>
              {inv.event.venue}, {inv.event.address}
            </p>
            {inv.map.embedUrl ? (
              <div className="overflow-hidden border border-border/30" style={{ borderRadius: `${br}px` }}>
                <iframe src={inv.map.embedUrl} className="w-full h-64" loading="lazy" title="Bản đồ" />
              </div>
            ) : (
              <div className="bg-secondary/50 h-64 flex items-center justify-center border border-border/30" style={{ borderRadius: `${br}px` }}>
                <p className="font-body text-sm text-muted-foreground">Bản đồ Google Maps</p>
              </div>
            )}
            {inv.map.directions && (
              <p className="font-body text-sm font-light text-muted-foreground mt-4 flex items-center justify-center gap-2">
                <MapPin className="h-4 w-4" />{inv.map.directions}
              </p>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* RSVP */}
      {inv.rsvp.enabled && (
        <section className="section-spacing bg-secondary/30">
          <div className="container-wide max-w-lg">
            <AnimatedSection className="text-center mb-8">
              <h2 className="font-display text-3xl mb-2" style={{ fontFamily: inv.fonts.heading }}>Xác nhận tham dự</h2>
              <p className="font-body text-sm font-light text-muted-foreground">
                Vui lòng xác nhận để chúng tôi chuẩn bị chu đáo nhất.
              </p>
              {inv.rsvp.deadline && (
                <p className="font-body text-xs text-muted-foreground mt-1">
                  Hạn xác nhận: {new Date(inv.rsvp.deadline).toLocaleDateString("vi-VN")}
                </p>
              )}
            </AnimatedSection>

            <AnimatedSection>
              {rsvpSubmitted ? (
                <div className="bg-background border border-border/30 p-8 text-center" style={{ borderRadius: `${br}px` }}>
                  <Heart className="h-8 w-8 mx-auto text-champagne mb-4" />
                  <h3 className="font-display text-xl mb-2">Cảm ơn bạn!</h3>
                  <p className="font-body text-sm text-muted-foreground">
                    {rsvpStatus === "Sẽ tham dự" ? "Chúng tôi rất vui được đón tiếp bạn." : "Cảm ơn bạn đã phản hồi."}
                  </p>
                </div>
              ) : (
                <div className="bg-background border border-border/30 p-6 md:p-8 space-y-4" style={{ borderRadius: `${br}px` }}>
                  <div>
                    <Label className="font-body text-sm font-light">Họ và tên *</Label>
                    <Input className="mt-1 bg-secondary/30" placeholder="Nhập họ và tên" value={rsvpName} onChange={e => setRsvpName(e.target.value)} />
                  </div>
                  <div>
                    <Label className="font-body text-sm font-light">Số điện thoại</Label>
                    <Input className="mt-1 bg-secondary/30" placeholder="0901 234 567" value={rsvpPhone} onChange={e => setRsvpPhone(e.target.value)} />
                  </div>
                  <div>
                    <Label className="font-body text-sm font-light">Số khách tham dự (tối đa {inv.rsvp.maxGuests})</Label>
                    <Input className="mt-1 bg-secondary/30" type="number" value={rsvpGuests} min={1} max={inv.rsvp.maxGuests} onChange={e => setRsvpGuests(Number(e.target.value))} />
                  </div>
                  {inv.rsvp.askDiet && (
                    <div>
                      <Label className="font-body text-sm font-light">Chế độ ăn đặc biệt</Label>
                      <Input className="mt-1 bg-secondary/30" placeholder="Ví dụ: Chay, không gluten..." value={rsvpDiet} onChange={e => setRsvpDiet(e.target.value)} />
                    </div>
                  )}
                  <div>
                    <Label className="font-body text-sm font-light">Bạn có thể tham dự? *</Label>
                    <div className="flex gap-3 mt-2">
                      {["Sẽ tham dự", "Không thể tham dự"].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setRsvpStatus(opt)}
                          className={`flex-1 px-4 py-2.5 font-body text-sm font-light transition-colors ${
                            rsvpStatus === opt
                              ? "bg-foreground text-primary-foreground"
                              : "bg-secondary text-muted-foreground"
                          }`}
                          style={{ borderRadius: `${Math.max(4, br - 4)}px` }}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Button variant="cta" className="w-full mt-2" onClick={handleRsvpSubmit} style={{ borderRadius: `${Math.max(4, br - 4)}px` }}>
                    Gửi xác nhận
                  </Button>
                </div>
              )}
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Wish wall */}
      {inv.wishes.enabled && (
        <section className="section-spacing">
          <div className="container-wide max-w-2xl">
            <AnimatedSection className="text-center mb-8">
              <MessageSquare className="h-5 w-5 mx-auto text-muted-foreground mb-3" />
              <h2 className="font-display text-3xl mb-2" style={{ fontFamily: inv.fonts.heading }}>Gửi lời chúc</h2>
            </AnimatedSection>

            <AnimatedSection>
              <div className="bg-secondary/30 p-6 mb-6 space-y-3" style={{ borderRadius: `${br}px` }}>
                <Input className="bg-background" placeholder="Họ và tên" value={wishName} onChange={e => setWishName(e.target.value)} />
                <Textarea className="bg-background" placeholder="Viết lời chúc cho cô dâu chú rể..." rows={3} value={wishText} onChange={e => setWishText(e.target.value)} />
                <Button variant="cta" size="sm" onClick={handleWishSubmit}>Gửi lời chúc</Button>
              </div>
            </AnimatedSection>

            <div className="space-y-3">
              {allWishes.map((w, i) => (
                <AnimatedSection key={`${w.name}-${i}`} delay={i * 0.05}>
                  <div className="bg-secondary/20 p-5 border border-border/20" style={{ borderRadius: `${br}px` }}>
                    <p className="font-body text-sm font-light text-muted-foreground italic mb-2">"{w.text}"</p>
                    <p className="font-body text-xs font-medium text-foreground">{w.name}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Thank you */}
      <section className="section-spacing bg-secondary/30">
        <div className="container-wide text-center max-w-lg">
          <AnimatedSection>
            <Heart className="h-6 w-6 mx-auto text-champagne mb-4" />
            <h2 className="font-display text-3xl mb-4" style={{ fontFamily: inv.fonts.heading }}>Cảm ơn</h2>
            <p className="font-body text-base font-light text-muted-foreground leading-relaxed" style={{ fontFamily: inv.fonts.body }}>
              Cảm ơn quý khách đã dành thời gian xem thiệp cưới của chúng tôi.
              Sự hiện diện của quý khách sẽ là niềm vui lớn nhất trong ngày trọng đại.
            </p>
            <p className="font-display text-xl mt-6 text-foreground" style={{ fontFamily: inv.fonts.heading }}>
              {inv.couple.brideName} & {inv.couple.groomName}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <div className="py-6 text-center border-t border-border/30">
        <p className="font-body text-xs text-muted-foreground">
          Thiệp cưới được tạo bởi{" "}
          <a href="/" className="text-foreground hover:underline">DUCO</a>
        </p>
      </div>

        </>
      )}

      {/* Global Background Music Player */}
      {inv.music.enabled && inv.music.url && (
        <MusicPlayerFloating musicUrl={inv.music.url} autoplay={inv.music.autoplay} />
      )}
    </div>
  );
};

export default InvitationPage;
