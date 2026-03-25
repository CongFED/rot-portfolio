import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";

const plans = [
  {
    name: "Miễn phí",
    price: "0",
    desc: "Trải nghiệm cơ bản",
    features: ["1 thiệp cưới", "Mẫu cơ bản", "RSVP cơ bản", "Chia sẻ qua link"],
    cta: "Bắt đầu ngay",
    popular: false,
  },
  {
    name: "Premium",
    price: "299.000",
    desc: "Trọn vẹn cho ngày đặc biệt",
    features: [
      "Không giới hạn thiệp",
      "Tất cả mẫu Premium",
      "RSVP nâng cao",
      "QR Code đẹp mắt",
      "Tùy chỉnh font & màu",
      "Gallery ảnh",
      "Lời chúc & tường chúc",
      "Hỗ trợ ưu tiên",
    ],
    cta: "Chọn Premium",
    popular: true,
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {plans.map((plan, i) => (
            <AnimatedSection key={plan.name} delay={i * 0.12}>
              <div
                className={`relative rounded-2xl p-8 md:p-10 h-full flex flex-col transition-all duration-500 ${
                  plan.popular
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
