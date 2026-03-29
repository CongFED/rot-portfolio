import templateFloral from "@/assets/template-floral.jpg";
import templateMinimal from "@/assets/template-minimal.jpg";
import templateElegant from "@/assets/template-elegant.jpg";
import templateModern from "@/assets/template-modern.jpg";
import type { TemplateStyle } from "@/types/invitation";

export interface Template {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  style: "elegant" | "minimal" | "floral" | "modern";
  isPremium: boolean;
  features: string[];
  /** Maps this display template to the builder's TemplateStyle for rendering */
  builderTemplate: TemplateStyle;
}

export const templates: Template[] = [
  {
    id: "hoa-hong",
    title: "Hoa Hồng Cổ Điển",
    description: "Mẫu thiệp cưới với hoa hồng cổ điển, phong cách lãng mạn và sang trọng. Phù hợp cho các cặp đôi yêu thích vẻ đẹp truyền thống.",
    image: templateFloral,
    tags: ["Hoa", "Cổ điển", "Lãng mạn"],
    style: "floral",
    isPremium: false,
    features: ["Trang chủ", "Đếm ngược", "RSVP", "Bản đồ", "Lời chúc", "Album ảnh"],
    builderTemplate: "garden-floral",
  },
  {
    id: "tinh-gian",
    title: "Tinh Giản Hiện Đại",
    description: "Thiết kế tối giản với đường nét sạch sẽ và typography đẹp mắt. Dành cho các cặp đôi yêu thích sự đơn giản nhưng tinh tế.",
    image: templateMinimal,
    tags: ["Tối giản", "Hiện đại", "Thanh lịch"],
    style: "minimal",
    isPremium: false,
    features: ["Trang chủ", "Đếm ngược", "RSVP", "Bản đồ", "Lời chúc"],
    builderTemplate: "modern-minimal",
  },
  {
    id: "hoang-gia",
    title: "Hoàng Gia",
    description: "Mẫu thiệp cưới phong cách hoàng gia với viền vàng và họa tiết cầu kỳ. Tạo ấn tượng sang trọng và đẳng cấp.",
    image: templateElegant,
    tags: ["Sang trọng", "Hoàng gia", "Vàng gold"],
    style: "elegant",
    isPremium: true,
    features: ["Trang chủ", "Đếm ngược", "RSVP", "Bản đồ", "Lời chúc", "Album ảnh", "Chuyện tình yêu", "Nhạc nền", "SEO"],
    builderTemplate: "luxury-dark",
  },
  {
    id: "watercolor",
    title: "Watercolor Mộng Mơ",
    description: "Thiết kế watercolor nhẹ nhàng với tông màu hồng pastel. Tạo cảm giác lãng mạn và mộng mơ cho ngày cưới.",
    image: templateModern,
    tags: ["Watercolor", "Pastel", "Mộng mơ"],
    style: "modern",
    isPremium: true,
    features: ["Trang chủ", "Đếm ngược", "RSVP", "Bản đồ", "Lời chúc", "Album ảnh", "Chuyện tình yêu", "Nhạc nền"],
    builderTemplate: "classic-elegant",
  },
  {
    id: "hoa-sen",
    title: "Sen Hồng Việt Nam",
    description: "Mẫu thiệp lấy cảm hứng từ hoa sen – quốc hoa Việt Nam. Kết hợp giữa truyền thống và hiện đại.",
    image: templateFloral,
    tags: ["Hoa sen", "Việt Nam", "Truyền thống"],
    style: "floral",
    isPremium: true,
    features: ["Trang chủ", "Đếm ngược", "RSVP", "Bản đồ", "Lời chúc", "Album ảnh", "Chuyện tình yêu"],
    builderTemplate: "luxury-green",
  },
  {
    id: "don-gian",
    title: "Đơn Giản Thanh Lịch",
    description: "Thiết kế đơn giản nhưng không kém phần thanh lịch. Phù hợp cho mọi phong cách đám cưới.",
    image: templateMinimal,
    tags: ["Đơn giản", "Thanh lịch", "Miễn phí"],
    style: "minimal",
    isPremium: false,
    features: ["Trang chủ", "Đếm ngược", "RSVP", "Lời chúc"],
    builderTemplate: "minimal",
  },
  {
    id: "royal-emerald",
    title: "Royal Emerald",
    description: "Phong cách ultra-premium với tông xanh rừng sâu kết hợp vàng antique. Editorial typography, botanical decoration, chất liệu luxury.",
    image: templateElegant,
    tags: ["Premium", "Sang trọng", "Xanh gold"],
    style: "elegant",
    isPremium: true,
    features: ["Trang chủ", "Đếm ngược", "RSVP", "Bản đồ", "Lời chúc", "Album ảnh", "Chuyện tình yêu", "Nhạc nền", "SEO"],
    builderTemplate: "royal-emerald",
  },
  {
    id: "red-dragon-envelope",
    title: "Rồng Phượng Truyền Thống",
    description: "Thiệp cưới phong cách Á Đông truyền thống với họa tiết rồng mây, song hỷ, tông đỏ rượu – vàng gold. Hiệu ứng mở vỏ thiệp sang trọng, premium.",
    image: templateElegant,
    tags: ["Truyền thống", "Á Đông", "Đỏ Gold"],
    style: "elegant",
    isPremium: true,
    features: ["Trang chủ", "Đếm ngược", "RSVP", "Bản đồ", "Lời chúc", "Album ảnh", "Mở thiệp", "Nhạc nền", "SEO"],
    builderTemplate: "red-dragon-envelope",
  },
  {
    id: "green-nature",
    title: "Green Nature Botanical",
    description: "Thiệp cưới phong cách thiên nhiên botanical với tông xanh lá đậm, lá cây trang trí, editorial typography. Hiệu ứng mở thiệp mượt mà, cảm giác premium và tinh tế.",
    image: templateElegant,
    tags: ["Thiên nhiên", "Botanical", "Xanh lá"],
    style: "elegant",
    isPremium: true,
    features: ["Trang chủ", "Đếm ngược", "RSVP", "Bản đồ", "Lời chúc", "Album ảnh", "Mở thiệp", "Nhạc nền", "SEO"],
    builderTemplate: "green-nature",
  },
];
