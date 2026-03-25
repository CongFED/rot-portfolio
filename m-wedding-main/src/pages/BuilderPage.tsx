import { useState, useCallback, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { usePayment } from "@/hooks/usePayment";
import PaymentModal from "@/components/payment/PaymentModal";
import {
  ArrowLeft, Users, Calendar, Heart, Image, MapPin,
  MessageSquare, Palette, Type, Music, Globe, Save, Eye,
  Share2, QrCode, Plus, Trash2, Upload, Clock, Check, Copy,
  ExternalLink, Sparkles, ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { QRCodeSVG } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import heroWedding from "@/assets/hero-wedding.jpg";
import { getRegistryTemplate, NEW_TEMPLATE_OPTIONS } from "@/components/templates";

// ─── Types ───────────────────────────────────────────────────
type TemplateStyle = "classic" | "modern" | "minimal" | "romantic" | "rustic" | "luxury" | "classic-elegant" | "luxury-dark" | "garden-floral" | "modern-minimal" | "luxury-green";

interface InvitationData {
  couple: { brideName: string; groomName: string; hashtag: string; message: string };
  event: { date: string; time: string; venue: string; address: string; note: string };
  loveStory: { title: string; items: { year: string; text: string }[] };
  gallery: string[];
  map: { embedUrl: string; directions: string };
  rsvp: { enabled: boolean; deadline: string; maxGuests: number; askDiet: boolean };
  wishes: { enabled: boolean; moderateBeforeShow: boolean };
  theme: { colorScheme: string; borderRadius: number; template: TemplateStyle };
  fonts: { heading: string; body: string };
  music: { enabled: boolean; url: string; autoplay: boolean };
  seo: { title: string; description: string; ogImage: string };
}

const templateOptions: { id: TemplateStyle; label: string; desc: string }[] = [
  { id: "classic", label: "Cổ điển", desc: "Ảnh hero toàn trang, bố cục dọc truyền thống" },
  { id: "modern", label: "Hiện đại", desc: "Chia đôi ngang, typography lớn, tối giản" },
  { id: "minimal", label: "Tối giản", desc: "Nền trắng, chữ làm trung tâm, thanh lịch" },
  { id: "romantic", label: "Lãng mạn", desc: "Viền hoa mềm mại, tông pastel ấm áp" },
  { id: "rustic", label: "Mộc mạc", desc: "Phong cách rustic, chất liệu tự nhiên, ấm cúng" },
  { id: "luxury", label: "Sang trọng", desc: "Viền vàng gold, nền tối, đẳng cấp cao" },
  ...NEW_TEMPLATE_OPTIONS,
];

const defaultData: InvitationData = {
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
  music: { enabled: false, url: "", autoplay: false },
  seo: { title: "Thiệp cưới Minh Anh & Đức Huy", description: "Kính mời quý khách đến dự lễ cưới của chúng tôi", ogImage: "" },
};

const editGroups = [
  { icon: Users, label: "Cô dâu & Chú rể", id: "couple" },
  { icon: Calendar, label: "Sự kiện", id: "event" },
  { icon: Heart, label: "Chuyện tình", id: "love-story" },
  { icon: Image, label: "Album ảnh", id: "gallery" },
  { icon: MapPin, label: "Địa điểm", id: "map" },
  { icon: Users, label: "RSVP", id: "rsvp" },
  { icon: MessageSquare, label: "Lời chúc", id: "wishes" },
  { icon: Palette, label: "Giao diện", id: "theme" },
  { icon: Type, label: "Font chữ", id: "fonts" },
  { icon: Music, label: "Nhạc nền", id: "music" },
  { icon: Globe, label: "SEO", id: "seo" },
];

const colorSchemes = [
  { id: "champagne", label: "Champagne", bg: "hsl(24 38% 76%)", fg: "hsl(0 11% 31%)" },
  { id: "blush", label: "Blush Pink", bg: "hsl(340 40% 85%)", fg: "hsl(340 30% 25%)" },
  { id: "sage", label: "Sage Green", bg: "hsl(140 25% 80%)", fg: "hsl(140 30% 20%)" },
  { id: "navy", label: "Navy Gold", bg: "hsl(220 50% 25%)", fg: "hsl(40 80% 75%)" },
];

const fontOptions = {
  heading: ["Prata", "Playfair Display", "Great Vibes", "Cormorant Garamond"],
  body: ["Be Vietnam Pro", "Inter", "Lora", "Source Sans Pro"],
};

// ─── Form Panels ─────────────────────────────────────────────
function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="font-body text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</Label>
      {children}
    </div>
  );
}

function CoupleForm({ data, onChange }: { data: InvitationData["couple"]; onChange: (v: InvitationData["couple"]) => void }) {
  const set = (k: keyof typeof data, v: string) => onChange({ ...data, [k]: v });
  return (
    <div className="space-y-5">
      <FieldGroup label="Tên cô dâu"><Input value={data.brideName} onChange={e => set("brideName", e.target.value)} placeholder="Tên cô dâu" className="bg-secondary/30 border-border/40 focus:bg-background transition-colors" /></FieldGroup>
      <FieldGroup label="Tên chú rể"><Input value={data.groomName} onChange={e => set("groomName", e.target.value)} placeholder="Tên chú rể" className="bg-secondary/30 border-border/40 focus:bg-background transition-colors" /></FieldGroup>
      <FieldGroup label="Hashtag"><Input value={data.hashtag} onChange={e => set("hashtag", e.target.value)} placeholder="#TenCoDAu_TenChuRe" className="bg-secondary/30 border-border/40 focus:bg-background transition-colors" /></FieldGroup>
      <FieldGroup label="Lời mời"><Textarea value={data.message} onChange={e => set("message", e.target.value)} rows={3} className="bg-secondary/30 border-border/40 focus:bg-background transition-colors" /></FieldGroup>
    </div>
  );
}

function EventForm({ data, onChange }: { data: InvitationData["event"]; onChange: (v: InvitationData["event"]) => void }) {
  const set = (k: keyof typeof data, v: string) => onChange({ ...data, [k]: v });
  return (
    <div className="space-y-5">
      <FieldGroup label="Ngày cưới"><Input type="date" value={data.date} onChange={e => set("date", e.target.value)} className="bg-secondary/30 border-border/40 focus:bg-background transition-colors" /></FieldGroup>
      <FieldGroup label="Giờ"><Input type="time" value={data.time} onChange={e => set("time", e.target.value)} className="bg-secondary/30 border-border/40 focus:bg-background transition-colors" /></FieldGroup>
      <FieldGroup label="Tên địa điểm"><Input value={data.venue} onChange={e => set("venue", e.target.value)} className="bg-secondary/30 border-border/40 focus:bg-background transition-colors" /></FieldGroup>
      <FieldGroup label="Địa chỉ"><Input value={data.address} onChange={e => set("address", e.target.value)} className="bg-secondary/30 border-border/40 focus:bg-background transition-colors" /></FieldGroup>
      <FieldGroup label="Ghi chú"><Textarea value={data.note} onChange={e => set("note", e.target.value)} rows={2} className="bg-secondary/30 border-border/40 focus:bg-background transition-colors" /></FieldGroup>
    </div>
  );
}

function LoveStoryForm({ data, onChange }: { data: InvitationData["loveStory"]; onChange: (v: InvitationData["loveStory"]) => void }) {
  const addItem = () => onChange({ ...data, items: [...data.items, { year: "", text: "" }] });
  const removeItem = (i: number) => onChange({ ...data, items: data.items.filter((_, idx) => idx !== i) });
  const updateItem = (i: number, k: "year" | "text", v: string) => {
    const items = [...data.items];
    items[i] = { ...items[i], [k]: v };
    onChange({ ...data, items });
  };
  return (
    <div className="space-y-5">
      <FieldGroup label="Tiêu đề phần"><Input value={data.title} onChange={e => onChange({ ...data, title: e.target.value })} className="bg-secondary/30 border-border/40 focus:bg-background transition-colors" /></FieldGroup>
      {data.items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-xl p-4 space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="font-body text-xs font-medium text-champagne">Mốc {i + 1}</span>
            <button onClick={() => removeItem(i)} className="text-destructive/60 hover:text-destructive transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
          </div>
          <Input placeholder="Năm" value={item.year} onChange={e => updateItem(i, "year", e.target.value)} className="bg-secondary/30 border-border/40 focus:bg-background transition-colors" />
          <Textarea placeholder="Câu chuyện..." value={item.text} onChange={e => updateItem(i, "text", e.target.value)} rows={2} className="bg-secondary/30 border-border/40 focus:bg-background transition-colors" />
        </motion.div>
      ))}
      <Button variant="cta-outline" size="sm" className="w-full gap-1.5" onClick={addItem}><Plus className="h-3.5 w-3.5" />Thêm mốc</Button>
    </div>
  );
}

function GalleryForm({ data, onChange }: { data: string[]; onChange: (v: string[]) => void }) {
  const addUrl = () => onChange([...data, ""]);
  const removeUrl = (i: number) => onChange(data.filter((_, idx) => idx !== i));
  const updateUrl = (i: number, v: string) => { const a = [...data]; a[i] = v; onChange(a); };
  return (
    <div className="space-y-5">
      <p className="font-body text-xs text-muted-foreground">Thêm URL hình ảnh cho album cưới</p>
      {data.map((url, i) => (
        <div key={i} className="flex gap-2">
          <Input placeholder="https://example.com/photo.jpg" value={url} onChange={e => updateUrl(i, e.target.value)} className="bg-secondary/30 border-border/40 focus:bg-background transition-colors" />
          <button onClick={() => removeUrl(i)} className="text-destructive/60 hover:text-destructive transition-colors shrink-0"><Trash2 className="h-3.5 w-3.5" /></button>
        </div>
      ))}
      <Button variant="cta-outline" size="sm" className="w-full gap-1.5" onClick={addUrl}><Upload className="h-3.5 w-3.5" />Thêm ảnh</Button>
    </div>
  );
}

function MapForm({ data, onChange }: { data: InvitationData["map"]; onChange: (v: InvitationData["map"]) => void }) {
  return (
    <div className="space-y-5">
      <FieldGroup label="Google Maps Embed URL"><Input value={data.embedUrl} onChange={e => onChange({ ...data, embedUrl: e.target.value })} placeholder="https://maps.google.com/..." className="bg-secondary/30 border-border/40 focus:bg-background transition-colors" /></FieldGroup>
      <FieldGroup label="Hướng dẫn đường đi"><Textarea value={data.directions} onChange={e => onChange({ ...data, directions: e.target.value })} rows={3} className="bg-secondary/30 border-border/40 focus:bg-background transition-colors" /></FieldGroup>
    </div>
  );
}

function RsvpForm({ data, onChange }: { data: InvitationData["rsvp"]; onChange: (v: InvitationData["rsvp"]) => void }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/30"><Label className="font-body text-sm">Bật RSVP</Label><Switch checked={data.enabled} onCheckedChange={v => onChange({ ...data, enabled: v })} /></div>
      <AnimatePresence>
        {data.enabled && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="space-y-5 overflow-hidden">
            <FieldGroup label="Hạn xác nhận"><Input type="date" value={data.deadline} onChange={e => onChange({ ...data, deadline: e.target.value })} className="bg-secondary/30 border-border/40 focus:bg-background transition-colors" /></FieldGroup>
            <FieldGroup label="Số khách tối đa / thiệp">
              <div className="flex items-center gap-3">
                <Slider value={[data.maxGuests]} onValueChange={v => onChange({ ...data, maxGuests: v[0] })} min={1} max={10} step={1} className="flex-1" />
                <span className="font-body text-sm font-medium w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center">{data.maxGuests}</span>
              </div>
            </FieldGroup>
            <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/30"><Label className="font-body text-sm">Hỏi chế độ ăn</Label><Switch checked={data.askDiet} onCheckedChange={v => onChange({ ...data, askDiet: v })} /></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function WishesForm({ data, onChange }: { data: InvitationData["wishes"]; onChange: (v: InvitationData["wishes"]) => void }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/30"><Label className="font-body text-sm">Bật lời chúc</Label><Switch checked={data.enabled} onCheckedChange={v => onChange({ ...data, enabled: v })} /></div>
      <AnimatePresence>
        {data.enabled && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/30"><Label className="font-body text-sm">Duyệt trước khi hiển thị</Label><Switch checked={data.moderateBeforeShow} onCheckedChange={v => onChange({ ...data, moderateBeforeShow: v })} /></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ThemeForm({ data, onChange }: { data: InvitationData["theme"]; onChange: (v: InvitationData["theme"]) => void }) {
  return (
    <div className="space-y-6">
      <FieldGroup label="Mẫu thiệp">
        <div className="space-y-2">
          {templateOptions.map(t => (
            <button key={t.id} onClick={() => onChange({ ...data, template: t.id })}
              className={`w-full text-left rounded-xl p-4 border-2 transition-all duration-200 ${data.template === t.id ? "border-champagne bg-champagne/10 shadow-[var(--shadow-soft)]" : "border-border/30 hover:border-champagne/40 bg-secondary/20"}`}>
              <span className="font-body text-sm font-medium block">{t.label}</span>
              <span className="font-body text-xs text-muted-foreground">{t.desc}</span>
            </button>
          ))}
        </div>
      </FieldGroup>
      <FieldGroup label="Bảng màu">
        <div className="grid grid-cols-2 gap-3">
          {colorSchemes.map(cs => (
            <button key={cs.id} onClick={() => onChange({ ...data, colorScheme: cs.id })}
              className={`rounded-xl p-4 border-2 transition-all duration-200 ${data.colorScheme === cs.id ? "border-champagne shadow-[var(--shadow-soft)]" : "border-border/30 hover:border-champagne/40"}`}>
              <div className="flex gap-2 mb-2">
                <div className="w-6 h-6 rounded-full shadow-sm" style={{ background: cs.bg }} />
                <div className="w-6 h-6 rounded-full shadow-sm" style={{ background: cs.fg }} />
              </div>
              <span className="font-body text-xs font-medium">{cs.label}</span>
            </button>
          ))}
        </div>
      </FieldGroup>
      <FieldGroup label={`Bo góc: ${data.borderRadius}px`}>
        <Slider value={[data.borderRadius]} onValueChange={v => onChange({ ...data, borderRadius: v[0] })} min={0} max={24} step={2} />
      </FieldGroup>
    </div>
  );
}

function FontsForm({ data, onChange }: { data: InvitationData["fonts"]; onChange: (v: InvitationData["fonts"]) => void }) {
  return (
    <div className="space-y-6">
      <FieldGroup label="Font tiêu đề">
        <RadioGroup value={data.heading} onValueChange={v => onChange({ ...data, heading: v })} className="space-y-2">
          {fontOptions.heading.map(f => (
            <div key={f} className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${data.heading === f ? "border-champagne bg-champagne/10" : "border-border/30 bg-secondary/20 hover:border-champagne/40"}`}>
              <RadioGroupItem value={f} id={`h-${f}`} />
              <Label htmlFor={`h-${f}`} className="font-body text-sm cursor-pointer flex-1" style={{ fontFamily: f }}>{f}</Label>
            </div>
          ))}
        </RadioGroup>
      </FieldGroup>
      <FieldGroup label="Font nội dung">
        <RadioGroup value={data.body} onValueChange={v => onChange({ ...data, body: v })} className="space-y-2">
          {fontOptions.body.map(f => (
            <div key={f} className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${data.body === f ? "border-champagne bg-champagne/10" : "border-border/30 bg-secondary/20 hover:border-champagne/40"}`}>
              <RadioGroupItem value={f} id={`b-${f}`} />
              <Label htmlFor={`b-${f}`} className="font-body text-sm cursor-pointer flex-1" style={{ fontFamily: f }}>{f}</Label>
            </div>
          ))}
        </RadioGroup>
      </FieldGroup>
    </div>
  );
}

function MusicForm({ data, onChange }: { data: InvitationData["music"]; onChange: (v: InvitationData["music"]) => void }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/30"><Label className="font-body text-sm">Bật nhạc nền</Label><Switch checked={data.enabled} onCheckedChange={v => onChange({ ...data, enabled: v })} /></div>
      <AnimatePresence>
        {data.enabled && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="space-y-5 overflow-hidden">
            <FieldGroup label="URL nhạc (MP3)"><Input value={data.url} onChange={e => onChange({ ...data, url: e.target.value })} placeholder="https://example.com/music.mp3" className="bg-secondary/30 border-border/40 focus:bg-background transition-colors" /></FieldGroup>
            <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/30"><Label className="font-body text-sm">Tự động phát</Label><Switch checked={data.autoplay} onCheckedChange={v => onChange({ ...data, autoplay: v })} /></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SeoForm({ data, onChange }: { data: InvitationData["seo"]; onChange: (v: InvitationData["seo"]) => void }) {
  return (
    <div className="space-y-5">
      <FieldGroup label="Tiêu đề trang"><Input value={data.title} onChange={e => onChange({ ...data, title: e.target.value })} className="bg-secondary/30 border-border/40 focus:bg-background transition-colors" /></FieldGroup>
      <FieldGroup label="Mô tả"><Textarea value={data.description} onChange={e => onChange({ ...data, description: e.target.value })} rows={3} className="bg-secondary/30 border-border/40 focus:bg-background transition-colors" /></FieldGroup>
      <FieldGroup label="OG Image URL"><Input value={data.ogImage} onChange={e => onChange({ ...data, ogImage: e.target.value })} placeholder="https://..." className="bg-secondary/30 border-border/40 focus:bg-background transition-colors" /></FieldGroup>
    </div>
  );
}

// ─── Live Preview ────────────────────────────────────────────
function LivePreview({ data }: { data: InvitationData }) {
  const scheme = colorSchemes.find(c => c.id === data.theme.colorScheme) || colorSchemes[0];
  const formattedDate = data.event.date
    ? new Date(data.event.date).toLocaleDateString("vi-VN", { day: "numeric", month: "long", year: "numeric" })
    : "Chưa chọn ngày";
  const diff = data.event.date ? Math.max(0, Math.floor((new Date(data.event.date).getTime() - Date.now()) / 1000)) : 0;
  const days = Math.floor(diff / 86400);
  const hours = Math.floor((diff % 86400) / 3600);
  const mins = Math.floor((diff % 3600) / 60);
  const secs = diff % 60;
  const br = data.theme.borderRadius;
  const countdownItems = [
    { n: String(days).padStart(2, "0"), l: "Ngày" },
    { n: String(hours).padStart(2, "0"), l: "Giờ" },
    { n: String(mins).padStart(2, "0"), l: "Phút" },
    { n: String(secs).padStart(2, "0"), l: "Giây" },
  ];

  const CountdownBlock = () => data.event.date ? (
    <div className="grid grid-cols-4 gap-3 py-2">
      {countdownItems.map(d => (
        <div key={d.l} className="bg-secondary/50 py-3 text-center" style={{ borderRadius: `${Math.max(4, br - 4)}px` }}>
          <p className="text-lg" style={{ fontFamily: data.fonts.heading }}>{d.n}</p>
          <p className="text-xs font-light text-muted-foreground">{d.l}</p>
        </div>
      ))}
    </div>
  ) : null;

  const SharedContent = () => (
    <div className="space-y-5" style={{ fontFamily: data.fonts.body }}>
      {data.couple.message && <p className="text-sm font-light text-muted-foreground leading-relaxed text-center">{data.couple.message}</p>}
      {data.loveStory.items.length > 0 && (
        <div className="text-left space-y-3 pt-2">
          <p className="text-center text-sm font-medium" style={{ fontFamily: data.fonts.heading }}>{data.loveStory.title}</p>
          <div className="relative pl-6 border-l-2 border-border/50 space-y-4">
            {data.loveStory.items.map((item, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[1.6rem] top-0.5 w-3 h-3 rounded-full bg-accent border-2 border-background" />
                <p className="text-xs font-medium" style={{ color: scheme.fg }}>{item.year}</p>
                <p className="text-xs font-light text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {data.gallery.filter(Boolean).length > 0 && (
        <div className="grid grid-cols-3 gap-1.5 pt-2">
          {data.gallery.filter(Boolean).map((url, i) => (
            <img key={i} src={url} alt={`Gallery ${i + 1}`} className="w-full aspect-square object-cover" style={{ borderRadius: `${Math.max(2, br - 8)}px` }} />
          ))}
        </div>
      )}
      {data.map.directions && (
        <div className="text-left bg-secondary/30 p-4" style={{ borderRadius: `${br}px` }}>
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
            <p className="text-xs font-light text-muted-foreground">{data.map.directions}</p>
          </div>
        </div>
      )}
      {data.rsvp.enabled && (
        <div className="bg-secondary/30 p-4 space-y-3" style={{ borderRadius: `${br}px` }}>
          <p className="text-sm font-medium" style={{ fontFamily: data.fonts.heading }}>Xác nhận tham dự</p>
          <div className="space-y-2">
            <div className="h-8 bg-background/60 rounded border border-border/30" />
            <div className="h-8 bg-background/60 rounded border border-border/30" />
            {data.rsvp.askDiet && <div className="h-8 bg-background/60 rounded border border-border/30" />}
          </div>
          <div className="h-8 rounded bg-foreground/10" style={{ borderRadius: `${Math.max(4, br - 4)}px` }} />
          {data.rsvp.deadline && <p className="text-xs text-muted-foreground">Hạn: {new Date(data.rsvp.deadline).toLocaleDateString("vi-VN")}</p>}
        </div>
      )}
      {data.wishes.enabled && (
        <div className="bg-secondary/30 p-4 space-y-2" style={{ borderRadius: `${br}px` }}>
          <p className="text-sm font-medium" style={{ fontFamily: data.fonts.heading }}>Gửi lời chúc</p>
          <div className="h-20 bg-background/60 rounded border border-border/30" />
          <div className="h-8 rounded bg-foreground/10" style={{ borderRadius: `${Math.max(4, br - 4)}px` }} />
        </div>
      )}
      {data.event.note && <p className="text-xs font-light text-muted-foreground italic pt-2 text-center">{data.event.note}</p>}
    </div>
  );

  // ── Registry-based templates (new scalable system) ──
  const registryEntry = getRegistryTemplate(data.theme.template);
  if (registryEntry) {
    return <registryEntry.PreviewCard data={data} />;
  }

  // ── Template: Classic ──
  if (data.theme.template === "classic") {
    return (
      <div className="max-w-lg mx-auto bg-background shadow-lg overflow-hidden border border-border/30" style={{ borderRadius: `${br}px` }}>
        <div className="relative h-64 overflow-hidden">
          <img src={heroWedding} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: `${scheme.bg}66` }}>
            <div className="text-center">
              <p className="text-3xl" style={{ fontFamily: data.fonts.heading, color: scheme.fg }}>{data.couple.brideName || "Cô dâu"}</p>
              <p className="text-xl my-1" style={{ fontFamily: data.fonts.heading, color: scheme.fg, opacity: 0.7 }}>&amp;</p>
              <p className="text-3xl" style={{ fontFamily: data.fonts.heading, color: scheme.fg }}>{data.couple.groomName || "Chú rể"}</p>
              {data.couple.hashtag && <p className="mt-2 text-xs tracking-widest opacity-60" style={{ fontFamily: data.fonts.body, color: scheme.fg }}>{data.couple.hashtag}</p>}
            </div>
          </div>
        </div>
        <div className="p-6 text-center space-y-5" style={{ fontFamily: data.fonts.body }}>
          <p className="text-xs font-light tracking-widest uppercase text-muted-foreground">Trân trọng kính mời</p>
          <div>
            <p className="text-lg" style={{ fontFamily: data.fonts.heading }}>{formattedDate}</p>
            {data.event.time && <p className="text-sm text-muted-foreground flex items-center justify-center gap-1 mt-1"><Clock className="h-3 w-3" />{data.event.time}</p>}
          </div>
          <p className="text-sm font-light text-muted-foreground">{data.event.venue}{data.event.address ? `, ${data.event.address}` : ""}</p>
          <CountdownBlock />
          <SharedContent />
        </div>
      </div>
    );
  }

  // ── Template: Modern ──
  if (data.theme.template === "modern") {
    return (
      <div className="max-w-lg mx-auto bg-background shadow-lg overflow-hidden border border-border/30" style={{ borderRadius: `${br}px` }}>
        <div className="flex h-56">
          <div className="w-1/2 overflow-hidden"><img src={heroWedding} alt="Preview" className="w-full h-full object-cover" /></div>
          <div className="w-1/2 flex items-center justify-center p-4" style={{ background: scheme.bg }}>
            <div className="text-center">
              <p className="text-xs tracking-[0.25em] uppercase mb-3 opacity-60" style={{ fontFamily: data.fonts.body, color: scheme.fg }}>Save the date</p>
              <p className="text-2xl leading-tight" style={{ fontFamily: data.fonts.heading, color: scheme.fg }}>{data.couple.brideName || "Cô dâu"}</p>
              <div className="w-8 h-px mx-auto my-2 opacity-40" style={{ background: scheme.fg }} />
              <p className="text-2xl leading-tight" style={{ fontFamily: data.fonts.heading, color: scheme.fg }}>{data.couple.groomName || "Chú rể"}</p>
              <p className="text-xs mt-3 opacity-70" style={{ fontFamily: data.fonts.body, color: scheme.fg }}>{formattedDate}</p>
            </div>
          </div>
        </div>
        <div className="h-1" style={{ background: scheme.fg }} />
        <div className="p-6 text-center space-y-5" style={{ fontFamily: data.fonts.body }}>
          {data.event.time && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-border/30" style={{ borderRadius: `${br}px` }}>
              <Clock className="h-3 w-3 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{data.event.time} · {data.event.venue}</span>
            </div>
          )}
          <CountdownBlock />
          <SharedContent />
        </div>
      </div>
    );
  }

  // ── Template: Romantic ──
  if (data.theme.template === "romantic") {
    return (
      <div className="max-w-lg mx-auto bg-background shadow-lg overflow-hidden border border-border/30" style={{ borderRadius: `${br}px` }}>
        <div className="relative p-8 text-center" style={{ background: `linear-gradient(135deg, ${scheme.bg}33, ${scheme.bg}11)` }}>
          <div className="absolute inset-4 border-2 border-dashed opacity-30" style={{ borderColor: scheme.fg, borderRadius: `${br}px` }} />
          <div className="relative z-10">
            <p className="text-xs tracking-[0.2em] uppercase opacity-50 mb-4" style={{ fontFamily: data.fonts.body, color: scheme.fg }}>♥ Save the Date ♥</p>
            <p className="text-3xl leading-tight" style={{ fontFamily: data.fonts.heading, color: scheme.fg }}>{data.couple.brideName || "Cô dâu"}</p>
            <Heart className="h-4 w-4 mx-auto my-2 opacity-40" style={{ color: scheme.fg }} />
            <p className="text-3xl leading-tight" style={{ fontFamily: data.fonts.heading, color: scheme.fg }}>{data.couple.groomName || "Chú rể"}</p>
            <p className="text-sm mt-4 opacity-70" style={{ fontFamily: data.fonts.body, color: scheme.fg }}>{formattedDate}</p>
            {data.couple.hashtag && <p className="text-xs tracking-widest mt-2 opacity-40" style={{ fontFamily: data.fonts.body, color: scheme.fg }}>{data.couple.hashtag}</p>}
          </div>
        </div>
        <div className="h-px" style={{ background: `linear-gradient(90deg, transparent, ${scheme.bg}, transparent)` }} />
        <div className="p-6 text-center space-y-5" style={{ fontFamily: data.fonts.body }}>
          <CountdownBlock />
          <SharedContent />
        </div>
      </div>
    );
  }

  // ── Template: Rustic ──
  if (data.theme.template === "rustic") {
    return (
      <div className="max-w-lg mx-auto shadow-lg overflow-hidden border-2" style={{ borderRadius: `${br}px`, borderColor: `${scheme.bg}88`, background: `${scheme.bg}0a` }}>
        <div className="relative h-48 overflow-hidden">
          <img src={heroWedding} alt="Preview" className="w-full h-full object-cover grayscale-[30%] brightness-90" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        </div>
        <div className="-mt-12 relative z-10 mx-4 p-6 bg-background border shadow-md text-center" style={{ borderRadius: `${br}px`, borderColor: `${scheme.bg}66` }}>
          <p className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-3" style={{ fontFamily: data.fonts.body }}>🌿 Kính mời 🌿</p>
          <p className="text-2xl" style={{ fontFamily: data.fonts.heading, color: scheme.fg }}>{data.couple.brideName || "Cô dâu"}</p>
          <p className="text-sm my-1 opacity-40" style={{ fontFamily: data.fonts.heading, color: scheme.fg }}>&amp;</p>
          <p className="text-2xl" style={{ fontFamily: data.fonts.heading, color: scheme.fg }}>{data.couple.groomName || "Chú rể"}</p>
          <div className="w-12 h-px mx-auto my-3" style={{ background: scheme.bg }} />
          <p className="text-sm text-muted-foreground" style={{ fontFamily: data.fonts.body }}>{formattedDate}</p>
          {data.event.time && <p className="text-xs text-muted-foreground mt-1">{data.event.time} · {data.event.venue}</p>}
        </div>
        <div className="p-6 pt-4 text-center space-y-5" style={{ fontFamily: data.fonts.body }}>
          <CountdownBlock />
          <SharedContent />
        </div>
      </div>
    );
  }

  // ── Template: Luxury ──
  if (data.theme.template === "luxury") {
    return (
      <div className="max-w-lg mx-auto shadow-2xl overflow-hidden" style={{ borderRadius: `${br}px`, background: "hsl(220 20% 10%)" }}>
        <div className="p-1">
          <div className="border border-amber-500/30 p-8 text-center" style={{ borderRadius: `${Math.max(2, br - 4)}px` }}>
            <div className="w-12 h-px mx-auto mb-6 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            <p className="text-xs tracking-[0.3em] uppercase text-amber-400/60 mb-4" style={{ fontFamily: data.fonts.body }}>Wedding Invitation</p>
            <p className="text-3xl text-amber-100" style={{ fontFamily: data.fonts.heading }}>{data.couple.brideName || "Cô dâu"}</p>
            <p className="text-lg text-amber-400/50 my-2" style={{ fontFamily: data.fonts.heading }}>&amp;</p>
            <p className="text-3xl text-amber-100" style={{ fontFamily: data.fonts.heading }}>{data.couple.groomName || "Chú rể"}</p>
            <div className="w-12 h-px mx-auto mt-6 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            <p className="text-sm text-amber-200/60 mt-4" style={{ fontFamily: data.fonts.body }}>{formattedDate}</p>
            {data.couple.hashtag && <p className="text-xs tracking-widest text-amber-400/40 mt-2" style={{ fontFamily: data.fonts.body }}>{data.couple.hashtag}</p>}
          </div>
        </div>
        <div className="mx-1 overflow-hidden" style={{ borderRadius: `${Math.max(2, br - 4)}px` }}>
          <img src={heroWedding} alt="Preview" className="w-full h-40 object-cover brightness-75" />
        </div>
        <div className="p-6 text-center space-y-5" style={{ fontFamily: data.fonts.body }}>
          {data.event.date && (
            <div className="grid grid-cols-4 gap-3 py-2">
              {countdownItems.map(d => (
                <div key={d.l} className="bg-white/5 border border-amber-500/20 py-3 text-center" style={{ borderRadius: `${Math.max(4, br - 4)}px` }}>
                  <p className="text-lg text-amber-100" style={{ fontFamily: data.fonts.heading }}>{d.n}</p>
                  <p className="text-xs text-amber-200/50">{d.l}</p>
                </div>
              ))}
            </div>
          )}
          {data.couple.message && <p className="text-sm font-light text-amber-200/60 leading-relaxed text-center">{data.couple.message}</p>}
          {data.loveStory.items.length > 0 && (
            <div className="text-left space-y-3 pt-2">
              <p className="text-center text-sm font-medium text-amber-100" style={{ fontFamily: data.fonts.heading }}>{data.loveStory.title}</p>
              <div className="relative pl-6 border-l border-amber-500/20 space-y-4">
                {data.loveStory.items.map((item, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[0.85rem] top-0.5 w-2.5 h-2.5 rounded-full bg-amber-500/50 border border-amber-400" />
                    <p className="text-xs font-medium text-amber-400">{item.year}</p>
                    <p className="text-xs font-light text-amber-200/50">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {data.rsvp.enabled && (
            <div className="bg-white/5 border border-amber-500/20 p-4 space-y-3" style={{ borderRadius: `${br}px` }}>
              <p className="text-sm font-medium text-amber-100" style={{ fontFamily: data.fonts.heading }}>Xác nhận tham dự</p>
              <div className="space-y-2">
                <div className="h-8 bg-white/5 rounded border border-amber-500/10" />
                <div className="h-8 bg-white/5 rounded border border-amber-500/10" />
              </div>
              <div className="h-8 rounded bg-amber-500/20" style={{ borderRadius: `${Math.max(4, br - 4)}px` }} />
            </div>
          )}
          {data.wishes.enabled && (
            <div className="bg-white/5 border border-amber-500/20 p-4 space-y-2" style={{ borderRadius: `${br}px` }}>
              <p className="text-sm font-medium text-amber-100" style={{ fontFamily: data.fonts.heading }}>Gửi lời chúc</p>
              <div className="h-20 bg-white/5 rounded border border-amber-500/10" />
              <div className="h-8 rounded bg-amber-500/20" style={{ borderRadius: `${Math.max(4, br - 4)}px` }} />
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Template: Minimal ──
  return (
    <div className="max-w-lg mx-auto bg-background shadow-lg overflow-hidden border border-border/30" style={{ borderRadius: `${br}px` }}>
      <div className="py-16 px-6 text-center" style={{ borderBottom: `2px solid ${scheme.bg}` }}>
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6" style={{ fontFamily: data.fonts.body }}>Trân trọng kính mời</p>
        <p className="text-4xl leading-tight" style={{ fontFamily: data.fonts.heading, color: scheme.fg }}>{data.couple.brideName || "Cô dâu"}</p>
        <p className="text-lg my-2 opacity-40" style={{ fontFamily: data.fonts.heading, color: scheme.fg }}>&amp;</p>
        <p className="text-4xl leading-tight" style={{ fontFamily: data.fonts.heading, color: scheme.fg }}>{data.couple.groomName || "Chú rể"}</p>
        {data.couple.hashtag && <p className="mt-4 text-xs tracking-widest text-muted-foreground" style={{ fontFamily: data.fonts.body }}>{data.couple.hashtag}</p>}
      </div>
      <div className="py-6 text-center" style={{ background: `${scheme.bg}22` }}>
        <p className="text-lg" style={{ fontFamily: data.fonts.heading }}>{formattedDate}</p>
        <div className="flex items-center justify-center gap-3 mt-1 text-sm text-muted-foreground">
          {data.event.time && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{data.event.time}</span>}
          <span>·</span>
          <span>{data.event.venue}</span>
        </div>
      </div>
      <div className="p-6 text-center space-y-5" style={{ fontFamily: data.fonts.body }}>
        <CountdownBlock />
        <SharedContent />
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────
const STORAGE_KEY = "giayvagio_invitation";
const PUBLISHED_KEY = "giayvagio_published";

export function getSavedInvitation(): InvitationData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function isInvitationPublished(): boolean {
  return localStorage.getItem(PUBLISHED_KEY) === "true";
}

const BuilderPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const paymentHook = usePayment();
  const [activeGroup, setActiveGroup] = useState("couple");
  const [published, setPublished] = useState(false);
  const [data, setData] = useState<InvitationData>(defaultData);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hasUnsaved, setHasUnsaved] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [invitationId] = useState(() => crypto.randomUUID());

  useEffect(() => {
    const saved = getSavedInvitation();
    if (saved) setData(saved);
    setPublished(isInvitationPublished());
  }, []);

  // Watch payment success
  useEffect(() => {
    if (paymentHook.step === 'success') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      localStorage.setItem(PUBLISHED_KEY, "true");
      setPublished(true);
      setHasUnsaved(false);
    }
  }, [paymentHook.step, data]);

  const updateField = useCallback(<K extends keyof InvitationData>(key: K, value: InvitationData[K]) => {
    setData(prev => ({ ...prev, [key]: value }));
    setHasUnsaved(true);
  }, []);

  const invitationSlug = `${data.couple.brideName.toLowerCase().replace(/\s/g, "")}-${data.couple.groomName.toLowerCase().replace(/\s/g, "")}`;
  const invitationUrl = `${window.location.origin}/invitation`;

  const handleSave = useCallback(() => {
    setSaving(true);
    setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setSaving(false);
      setHasUnsaved(false);
      toast.success("Đã lưu bản nháp", { description: "Thiệp cưới đã được lưu thành công." });
    }, 500);
  }, [data]);

  const handlePublish = useCallback(() => {
    if (!user) {
      toast.info("Vui lòng đăng nhập để xuất bản thiệp", {
        description: "Bạn cần đăng nhập hoặc tạo tài khoản trước khi xuất bản.",
        action: { label: "Đăng nhập", onClick: () => navigate("/auth?redirect=/builder") },
      });
      return;
    }

    // If already published, allow direct update
    if (published) {
      setSaving(true);
      setTimeout(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        setSaving(false);
        setHasUnsaved(false);
        toast.success("Đã cập nhật thiệp cưới!", { description: "Các thay đổi đã được lưu." });
      }, 500);
      return;
    }

    // Save draft before starting payment
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    // Open payment modal
    paymentHook.startPayment();
    setShowPaymentModal(true);
  }, [data, user, navigate, published, paymentHook]);

  const handleUnpublish = useCallback(() => {
    localStorage.setItem(PUBLISHED_KEY, "false");
    setPublished(false);
    toast.info("Đã gỡ xuất bản", { description: "Thiệp cưới đã chuyển về trạng thái bản nháp." });
  }, []);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(invitationUrl);
      setCopied(true);
      toast.success("Đã sao chép link!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Không thể sao chép link");
    }
  }, [invitationUrl]);

  const handlePreview = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.open("/invitation", "_blank");
  }, [data]);

  const renderForm = () => {
    switch (activeGroup) {
      case "couple": return <CoupleForm data={data.couple} onChange={v => updateField("couple", v)} />;
      case "event": return <EventForm data={data.event} onChange={v => updateField("event", v)} />;
      case "love-story": return <LoveStoryForm data={data.loveStory} onChange={v => updateField("loveStory", v)} />;
      case "gallery": return <GalleryForm data={data.gallery} onChange={v => updateField("gallery", v)} />;
      case "map": return <MapForm data={data.map} onChange={v => updateField("map", v)} />;
      case "rsvp": return <RsvpForm data={data.rsvp} onChange={v => updateField("rsvp", v)} />;
      case "wishes": return <WishesForm data={data.wishes} onChange={v => updateField("wishes", v)} />;
      case "theme": return <ThemeForm data={data.theme} onChange={v => updateField("theme", v)} />;
      case "fonts": return <FontsForm data={data.fonts} onChange={v => updateField("fonts", v)} />;
      case "music": return <MusicForm data={data.music} onChange={v => updateField("music", v)} />;
      case "seo": return <SeoForm data={data.seo} onChange={v => updateField("seo", v)} />;
      default: return null;
    }
  };

  const activeLabel = editGroups.find(g => g.id === activeGroup)?.label || "";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-border/40 flex items-center justify-between px-4 md:px-6 shrink-0 z-10 bg-background/80 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="p-2 rounded-xl hover:bg-secondary transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="hidden sm:flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-champagne" />
            <span className="font-display text-sm">{data.seo.title || "Thiệp cưới mới"}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {hasUnsaved && (
            <span className="font-body text-xs text-champagne bg-champagne/10 px-2.5 py-1 rounded-full hidden sm:inline">
              Chưa lưu
            </span>
          )}
          <Button variant="ghost" size="sm" className="gap-1.5 rounded-xl" onClick={handlePreview}>
            <Eye className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Xem trước</span>
          </Button>
          <Button variant="cta-outline" size="sm" className="gap-1.5 rounded-xl" onClick={handleSave} disabled={saving}>
            <Save className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{saving ? "Đang lưu..." : "Lưu"}</span>
          </Button>
          <Button variant="cta" size="sm" className="gap-1.5 rounded-xl shadow-[var(--shadow-soft)]" onClick={handlePublish} disabled={saving}>
            {published ? <Check className="h-3.5 w-3.5" /> : <Globe className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{published ? "Cập nhật" : "Xuất bản"}</span>
          </Button>
        </div>
      </header>

      {/* 3-column layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left sidebar - Edit groups */}
        <aside className="w-56 border-r border-border/30 overflow-y-auto shrink-0 hidden md:flex flex-col bg-secondary/10">
          <div className="p-3 space-y-1">
            {editGroups.map(group => {
              const isActive = activeGroup === group.id;
              return (
                <button key={group.id} onClick={() => setActiveGroup(group.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm transition-all duration-200 text-left group ${
                    isActive
                      ? "bg-champagne/15 text-foreground shadow-[var(--shadow-soft)]"
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                  }`}>
                  <group.icon className={`h-4 w-4 shrink-0 transition-colors ${isActive ? "text-champagne" : ""}`} />
                  <span className="flex-1 font-light">{group.label}</span>
                  <ChevronRight className={`h-3 w-3 transition-all ${isActive ? "opacity-100 text-champagne" : "opacity-0 group-hover:opacity-50"}`} />
                </button>
              );
            })}
          </div>
        </aside>

        {/* Mobile group selector */}
        <div className="md:hidden border-b border-border/30 overflow-x-auto flex shrink-0 bg-secondary/10">
          {editGroups.map(group => (
            <button key={group.id} onClick={() => setActiveGroup(group.id)}
              className={`flex items-center gap-1.5 px-3 py-2.5 font-body text-xs whitespace-nowrap transition-colors ${
                activeGroup === group.id ? "text-foreground border-b-2 border-champagne" : "text-muted-foreground"}`}>
              <group.icon className="h-3.5 w-3.5" />
              <span>{group.label}</span>
            </button>
          ))}
        </div>

        {/* Center - split: form + live preview */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Form area */}
          <div className="lg:w-[340px] border-b lg:border-b-0 lg:border-r border-border/30 overflow-y-auto shrink-0">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-5 rounded-full bg-champagne" />
                <h2 className="font-display text-base">{activeLabel}</h2>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeGroup}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderForm()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Live preview */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8" style={{ background: "var(--gradient-subtle)" }}>
            <div className="flex items-center justify-center gap-2 mb-6">
              <Eye className="h-3.5 w-3.5 text-muted-foreground" />
              <p className="font-body text-xs text-muted-foreground tracking-wide uppercase">Xem trước trực tiếp</p>
            </div>
            <motion.div
              key={data.theme.template + data.theme.colorScheme}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <LivePreview data={data} />
            </motion.div>
          </div>
        </div>

        {/* Right sidebar - Publish & Share */}
        <aside className="w-72 border-l border-border/30 overflow-y-auto shrink-0 hidden xl:block bg-secondary/10">
          <div className="p-5 space-y-6">
            {/* Status */}
            <div className="glass-card rounded-xl p-4">
              <h3 className="font-body text-xs font-medium tracking-wide uppercase text-muted-foreground mb-4">Trạng thái</h3>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className={`w-2.5 h-2.5 rounded-full transition-colors ${published ? "bg-green-500 shadow-[0_0_8px_hsl(142_70%_45%/0.4)]" : "bg-muted-foreground/40"}`} />
                  <span className="font-body text-sm font-light">{published ? "Đã xuất bản" : "Bản nháp"}</span>
                </div>
                <Switch checked={published} onCheckedChange={v => v ? handlePublish() : handleUnpublish()} />
              </div>
              <Button variant="cta" size="sm" className="w-full rounded-xl shadow-[var(--shadow-soft)]" onClick={handlePublish} disabled={saving}>
                {published ? "Cập nhật" : "Xuất bản"}
              </Button>
            </div>

            {/* Share */}
            <div className="glass-card rounded-xl p-4">
              <h3 className="font-body text-xs font-medium tracking-wide uppercase text-muted-foreground mb-4">Chia sẻ</h3>
              <div className="space-y-4">
                <div>
                  <Label className="font-body text-xs font-light text-muted-foreground">Link thiệp cưới</Label>
                  <div className="flex gap-2 mt-1.5">
                    <Input readOnly value={invitationUrl} className="font-body text-xs bg-secondary/30 border-border/30 rounded-lg" />
                    <Button variant="ghost" size="icon" className="shrink-0 rounded-lg" onClick={handleCopyLink}>
                      {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                    </Button>
                  </div>
                </div>
                <div>
                  <Label className="font-body text-xs font-light text-muted-foreground">Mã QR</Label>
                  <div className="mt-2 bg-background rounded-xl p-4 flex items-center justify-center border border-border/20" id="qr-container">
                    <QRCodeSVG value={invitationUrl} size={140} bgColor="transparent" fgColor="currentColor" level="M" />
                  </div>
                  <Button variant="cta-outline" size="sm" className="w-full mt-2 rounded-xl" onClick={() => {
                    const svg = document.querySelector('#qr-container svg');
                    if (!svg) return;
                    const svgData = new XMLSerializer().serializeToString(svg);
                    const canvas = document.createElement('canvas');
                    canvas.width = 512; canvas.height = 512;
                    const ctx = canvas.getContext('2d');
                    const img = new window.Image();
                    img.onload = () => {
                      ctx!.fillStyle = '#ffffff';
                      ctx!.fillRect(0, 0, 512, 512);
                      ctx!.drawImage(img, 0, 0, 512, 512);
                      const a = document.createElement('a');
                      a.download = `qr-${invitationSlug}.png`;
                      a.href = canvas.toDataURL('image/png');
                      a.click();
                      toast.success("Đã tải mã QR!");
                    };
                    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
                  }}>Tải mã QR</Button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="glass-card rounded-xl p-4">
              <h3 className="font-body text-xs font-medium tracking-wide uppercase text-muted-foreground mb-4">Hành động</h3>
              <div className="space-y-2">
                <Button variant="cta-outline" size="sm" className="w-full justify-start gap-2 rounded-xl" onClick={handlePreview}>
                  <ExternalLink className="h-3.5 w-3.5" />Xem bản đầy đủ
                </Button>
                <Button variant="cta-outline" size="sm" className="w-full justify-start gap-2 rounded-xl" onClick={handleSave} disabled={saving}>
                  <Save className="h-3.5 w-3.5" />{saving ? "Đang lưu..." : "Lưu bản nháp"}
                </Button>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        open={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        paymentHook={paymentHook}
        invitationId={invitationId}
        builderData={data as unknown as Record<string, unknown>}
      />
    </div>
  );
};

export default BuilderPage;
