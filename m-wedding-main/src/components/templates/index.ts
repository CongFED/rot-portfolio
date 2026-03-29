/**
 * Template Registry
 * Map templateId → { PreviewCard, InvitationHero, meta }
 *
 * Khi thêm template mới:
 * 1. Tạo file component trong thư mục này
 * 2. Import vào đây
 * 3. Thêm entry vào TEMPLATE_REGISTRY
 * 4. Template tự động xuất hiện trong Builder + InvitationPage
 */

import type { InvitationData, TemplateStyle } from "@/types/invitation";
import type { CSSProperties, FC } from "react";

import * as ClassicElegant from "./ClassicElegantTemplate";
import * as LuxuryDark from "./LuxuryDarkTemplate";
import * as GardenFloral from "./GardenFloralTemplate";
import * as ModernMinimal from "./ModernMinimalTemplate";
import * as LuxuryGreen from "./LuxuryGreenTemplate";
import * as RoyalEmerald from "./RoyalEmeraldTemplate";
import * as RedTraditional from "./RedTraditionalTemplate";
import * as RedDragonEnvelope from "./RedDragonEnvelopeTemplate";
import * as GreenNature from "./GreenNatureTemplate";

/* ─── Types ───────────────────────────────────────── */
export interface TemplatePreviewProps {
  data: InvitationData;
}

export interface TemplateHeroProps {
  data: InvitationData;
  showMonogram: boolean;
  formattedDate: string;
  scheme: { bg: string; fg: string };
}

export interface TemplateEntry {
  id: TemplateStyle;
  label: string;
  desc: string;
  PreviewCard: FC<TemplatePreviewProps>;
  InvitationHero: FC<TemplateHeroProps>;
  pageStyle?: CSSProperties;
  isDark?: boolean;
  isFullPage?: boolean;
}

/* ─── Registry ────────────────────────────────────── */
export const TEMPLATE_REGISTRY: Record<string, TemplateEntry> = {
  "classic-elegant": {
    id: "classic-elegant",
    label: "Cổ điển trang nhã",
    desc: "Khung viền vàng, monogram, typography serif đối xứng",
    PreviewCard: ClassicElegant.PreviewCard,
    InvitationHero: ClassicElegant.InvitationHero,
    pageStyle: ClassicElegant.pageStyle,
  },
  "luxury-dark": {
    id: "luxury-dark",
    label: "Sang trọng tối",
    desc: "Nền đen sang trọng, vàng champagne, cảm giác premium",
    PreviewCard: LuxuryDark.PreviewCard,
    InvitationHero: LuxuryDark.InvitationHero,
    pageStyle: LuxuryDark.pageStyle,
    isDark: true,
  },
  "garden-floral": {
    id: "garden-floral",
    label: "Sân vườn hoa lá",
    desc: "Tông sage xanh lá nhẹ, ảnh tròn, trang trí lá hoa",
    PreviewCard: GardenFloral.PreviewCard,
    InvitationHero: GardenFloral.InvitationHero,
    pageStyle: GardenFloral.pageStyle,
  },
  "modern-minimal": {
    id: "modern-minimal",
    label: "Hiện đại tối giản",
    desc: "Chia đôi ảnh – chữ, typography lớn, khoảng trắng nhiều",
    PreviewCard: ModernMinimal.PreviewCard,
    InvitationHero: ModernMinimal.InvitationHero,
    pageStyle: ModernMinimal.pageStyle,
  },
  "luxury-green": {
    id: "luxury-green",
    label: "Luxury Green",
    desc: "Xanh emerald sang trọng, gold accent, script font, phong cách premium",
    PreviewCard: LuxuryGreen.PreviewCard,
    InvitationHero: LuxuryGreen.InvitationHero,
    pageStyle: LuxuryGreen.pageStyle,
  },
  "royal-emerald": {
    id: "royal-emerald",
    label: "Royal Emerald",
    desc: "Xanh rừng sâu, vàng antique cổ điển, editorial typography, ultra-premium",
    PreviewCard: RoyalEmerald.PreviewCard,
    InvitationHero: RoyalEmerald.InvitationHero,
    pageStyle: RoyalEmerald.pageStyle,
  },
  "red-traditional": {
    id: "red-traditional",
    label: "Truyền Thống Cổ Điển",
    desc: "Đỏ đậm, song hỷ, hoa văn chim phượng phong cách Việt Nam, hiệu ứng mở vỏ thiệp mượt mà",
    PreviewCard: RedTraditional.PreviewCard,
    InvitationHero: RedTraditional.InvitationHero,
    isFullPage: true,
  },
  "red-dragon-envelope": {
    id: "red-dragon-envelope",
    label: "Rồng Phượng Truyền Thống",
    desc: "Đỏ rượu, rồng mây, song hỷ, hiệu ứng mở vỏ thiệp, phong cách cưới Á Đông premium",
    PreviewCard: RedDragonEnvelope.PreviewCard,
    InvitationHero: RedDragonEnvelope.InvitationHero,
    pageStyle: RedDragonEnvelope.pageStyle,
    isFullPage: true,
  },
  "green-nature": {
    id: "green-nature",
    label: "Green Nature",
    desc: "Xanh lá thiên nhiên, botanical lá cây, hiệu ứng mở thiệp, editorial premium",
    PreviewCard: GreenNature.PreviewCard,
    InvitationHero: GreenNature.InvitationHero,
    pageStyle: GreenNature.pageStyle,
    isFullPage: true,
  },
};

/**
 * Helper: Lấy template entry từ registry, trả về null nếu không tìm thấy
 * (null = template cũ, render bằng logic inline cũ)
 */
export function getRegistryTemplate(templateId: string): TemplateEntry | null {
  return TEMPLATE_REGISTRY[templateId] ?? null;
}

/**
 * Danh sách templateOptions dành cho Builder (gộp chung)
 * Bao gồm cả 6 template cũ + 4 template mới
 */
export const NEW_TEMPLATE_OPTIONS: { id: TemplateStyle; label: string; desc: string }[] = [
  { id: "classic-elegant", label: "Cổ điển trang nhã", desc: "Khung viền vàng, monogram, typography serif đối xứng" },
  { id: "luxury-dark", label: "Sang trọng tối", desc: "Nền đen sang trọng, vàng champagne, cảm giác premium" },
  { id: "garden-floral", label: "Sân vườn hoa lá", desc: "Tông sage xanh lá nhẹ, ảnh tròn, trang trí lá hoa" },
  { id: "modern-minimal", label: "Hiện đại tối giản", desc: "Chia đôi ảnh – chữ, typography lớn, khoảng trắng nhiều" },
  { id: "luxury-green", label: "Luxury Green", desc: "Xanh emerald sang trọng, gold accent, script font, phong cách premium" },
  { id: "royal-emerald", label: "Royal Emerald", desc: "Xanh rừng sâu, vàng antique cổ điển, editorial typography, ultra-premium" },
  { id: "red-traditional", label: "Truyền Thống Cổ Điển", desc: "Đỏ đậm, hoa văn truyền thống, hiệu ứng vỏ thiệp" },
  { id: "red-dragon-envelope", label: "Rồng Phượng Truyền Thống", desc: "Đỏ rượu, rồng mây, song hỷ, hiệu ứng mở thiệp, cưới Á Đông premium" },
  { id: "green-nature", label: "Green Nature", desc: "Xanh lá thiên nhiên, botanical lá cây, mở thiệp, premium" },
];
