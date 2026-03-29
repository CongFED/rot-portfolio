import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";

const plans = [
  {
    name: "Miễn phí",
    price: "0",
    desc: "Khởi đầu nhanh chóng với thiệp cưới online",
    features: [
      "Tạo 1 thiệp cưới",
      "Mẫu giao diện cơ bản",
      "RSVP đơn giản",
      "Chia sẻ qua link",
      "Hosting miễn phí"
    ],
    cta: "Bắt đầu ngay",
    popular: false,
  },
  {
    name: "Premium",
    price: "299.000",
    desc: "Đầy đủ tính năng cho một thiệp cưới hoàn hảo",
    features: [
      "Không giới hạn số lượng thiệp",
      "Toàn bộ template Premium",
      "RSVP nâng cao (quản lý khách mời)",
      "QR Code check-in đẹp",
      "Tùy chỉnh font & màu sắc",
      "Gallery ảnh + video",
      "Tường lời chúc (guestbook)",
      "Hiệu ứng animation mượt",
      "Hỗ trợ ưu tiên"
    ],
    cta: "Chọn Premium",
    popular: true,
  },
  {
    name: "Luxury (Custom)",
    price: "Liên hệ",
    desc: "Thiết kế riêng đẳng cấp – không đụng hàng",
    features: [
      "Thiết kế theme hoàn toàn mới theo yêu cầu",
      "UI/UX riêng biệt (không dùng template có sẵn)",
      "Animation & hiệu ứng cao cấp",
      "Cá nhân hóa theo câu chuyện cô dâu – chú rể",
      "Tích hợp nhạc, timeline, map, video nâng cao",
      "Tối ưu mobile & tốc độ cao",
      "Hỗ trợ chỉnh sửa theo yêu cầu",
      "Hỗ trợ 1-1 trong suốt quá trình",
      "Ưu tiên xử lý & bảo trì"
    ],
    cta: "Liên hệ thiết kế riêng",
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section className="section-spacing" id="pricing">
      <div className="container-wide">
        <AnimatedSection className="text-center mb-14 md:mb-18">
          <span className="section-eyebrow mb-4 block">Bảng giá</span>
          <h2 className="font-display mb-4" style={{ color: 'var(--color-text-heading)' }}>
            Đầu tư cho khoảnh khắc<br className="hidden sm:block" /> không thể quay lại
          </h2>
          <p className="font-body text-[0.9rem] font-light max-w-md mx-auto" style={{ color: 'var(--color-text-muted)' }}>
            Bắt đầu miễn phí hoặc nâng cấp Premium cho trải nghiệm trọn vẹn
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6  mx-auto">
          {plans.map((plan, i) => (
            <AnimatedSection key={plan.name} delay={i * 0.12}>
              <div
                className={`relative rounded-2xl p-8 md:p-10 h-full flex flex-col transition-all duration-500 ${plan.popular
                  ? "shadow-[var(--shadow-elevated)]"
                  : "border shadow-[var(--shadow-card)]"
                  }`}
                style={{
                  backgroundColor: plan.popular ? 'var(--color-primary)' : 'var(--color-surface)',
                  borderColor: plan.popular ? 'transparent' : 'var(--color-border)',
                }}
              >
                {plan.popular && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 font-body text-[0.6rem] font-semibold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full"
                    style={{
                      backgroundColor: 'var(--color-surface)',
                      color: 'var(--color-primary)',
                    }}
                  >
                    Phổ biến nhất
                  </span>
                )}

                <div className="mb-8">
                  <h3
                    className="font-display text-xl mb-2"
                    style={{ color: plan.popular ? 'white' : 'var(--color-text-heading)' }}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className="font-body text-[0.8rem] font-light mb-5"
                    style={{ color: plan.popular ? 'rgba(255,255,255,0.7)' : 'var(--color-text-muted)' }}
                  >
                    {plan.desc}
                  </p>
                  <div className="flex items-baseline gap-1.5">
                    <span
                      className="font-display text-4xl tracking-tight"
                      style={{ color: plan.popular ? 'white' : 'var(--color-text-heading)' }}
                    >
                      {plan.price}
                    </span>
                    <span
                      className="font-body text-[0.75rem] font-light"
                      style={{ color: plan.popular ? 'rgba(255,255,255,0.5)' : 'var(--color-text-muted)' }}
                    >
                      {plan.price !== "0" ? "₫" : ""}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-10 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <Check
                        className="h-3.5 w-3.5 shrink-0"
                        style={{ color: plan.popular ? 'rgba(255,255,255,0.8)' : 'var(--color-primary)' }}
                        strokeWidth={2}
                      />
                      <span
                        className="font-body text-[0.82rem] font-light"
                        style={{ color: plan.popular ? 'rgba(255,255,255,0.85)' : 'var(--color-text-muted)' }}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full rounded-full py-5 text-[0.82rem] font-semibold`}
                  style={{
                    backgroundColor: plan.popular ? 'white' : 'var(--color-primary)',
                    color: plan.popular ? 'var(--color-primary)' : 'white',
                  }}
                  asChild
                >
                  <Link to="/templates">{plan.cta}</Link>
                </Button>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
