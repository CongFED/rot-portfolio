import { Palette, QrCode, Users, Sparkles, Globe, Shield } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const features = [
  {
    icon: Palette,
    title: "Thiết kế tùy biến",
    desc: "Chọn font, màu sắc, bố cục theo phong cách riêng của bạn.",
  },
  {
    icon: QrCode,
    title: "Chia sẻ bằng QR",
    desc: "Tạo mã QR đẹp mắt, in trên thiệp giấy hoặc gửi qua tin nhắn.",
  },
  {
    icon: Users,
    title: "Quản lý RSVP",
    desc: "Thu thập xác nhận tham dự và lời chúc từ khách mời dễ dàng.",
  },
  {
    icon: Sparkles,
    title: "Hiệu ứng tinh tế",
    desc: "Animation mượt mà, tạo trải nghiệm xem thiệp như một câu chuyện.",
  },
  {
    icon: Globe,
    title: "Đa ngôn ngữ",
    desc: "Hỗ trợ tiếng Việt và tiếng Anh, phù hợp cả đám cưới quốc tế.",
  },
  {
    icon: Shield,
    title: "Bảo mật & riêng tư",
    desc: "Chỉ người có link mới xem được. Bảo vệ thông tin cá nhân.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="section-spacing">
      <div className="container-wide">
        <AnimatedSection className="text-center mb-16 md:mb-20">
          <span className="section-eyebrow mb-4 block">Tính năng</span>
          <h2 className="font-display mb-4" style={{ color: 'var(--color-text-heading)' }}>
            Mọi thứ bạn cần<br className="hidden sm:block" /> cho ngày trọng đại
          </h2>
          <p className="font-body text-[0.9rem] font-light max-w-md mx-auto" style={{ color: 'var(--color-text-muted)' }}>
            Công cụ thiết kế mạnh mẽ kết hợp trải nghiệm khách mời tuyệt vời
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {features.map((f, i) => (
            <AnimatedSection key={f.title} delay={i * 0.06}>
              <div className="group premium-card rounded-2xl p-7 md:p-8">
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-colors duration-500"
                  style={{ backgroundColor: 'var(--color-accent-light)' }}
                >
                  <f.icon className="h-[18px] w-[18px]" style={{ color: 'var(--color-primary)' }} strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-lg mb-2.5" style={{ color: 'var(--color-text-heading)' }}>{f.title}</h3>
                <p className="font-body text-[0.82rem] font-light leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                  {f.desc}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
