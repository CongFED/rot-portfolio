// Shared types for invitation data across Builder, InvitationPage, and templates

export type TemplateStyle =
  | "classic" | "modern" | "minimal" | "romantic" | "rustic" | "luxury"
  | "classic-elegant" | "luxury-dark" | "garden-floral" | "modern-minimal" | "luxury-green";

export interface InvitationData {
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

export interface ColorScheme {
  id: string;
  label: string;
  bg: string;
  fg: string;
}

export const COLOR_SCHEMES: ColorScheme[] = [
  { id: "champagne", label: "Champagne", bg: "hsl(24 38% 76%)", fg: "hsl(0 11% 31%)" },
  { id: "blush", label: "Blush Pink", bg: "hsl(340 40% 85%)", fg: "hsl(340 30% 25%)" },
  { id: "sage", label: "Sage Green", bg: "hsl(140 25% 80%)", fg: "hsl(140 30% 20%)" },
  { id: "navy", label: "Navy Gold", bg: "hsl(220 50% 25%)", fg: "hsl(40 80% 75%)" },
];

export function getScheme(colorSchemeId: string): ColorScheme {
  return COLOR_SCHEMES.find(c => c.id === colorSchemeId) || COLOR_SCHEMES[0];
}

export function formatViDate(dateStr: string): string {
  if (!dateStr) return "Chưa chọn ngày";
  return new Date(dateStr).toLocaleDateString("vi-VN", { day: "numeric", month: "long", year: "numeric" });
}

export function getCountdownItems(dateStr: string) {
  const diff = dateStr ? Math.max(0, Math.floor((new Date(dateStr).getTime() - Date.now()) / 1000)) : 0;
  return [
    { n: String(Math.floor(diff / 86400)).padStart(2, "0"), l: "Ngày" },
    { n: String(Math.floor((diff % 86400) / 3600)).padStart(2, "0"), l: "Giờ" },
    { n: String(Math.floor((diff % 3600) / 60)).padStart(2, "0"), l: "Phút" },
    { n: String(diff % 60).padStart(2, "0"), l: "Giây" },
  ];
}
