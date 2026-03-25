import AnimatedSection from "@/components/AnimatedSection";

const steps = [
  {
    num: "01",
    title: "Chọn mẫu thiệp",
    desc: "Duyệt bộ sưu tập mẫu thiệp được thiết kế bởi chuyên gia, phù hợp mọi phong cách.",
  },
  {
    num: "02",
    title: "Tùy chỉnh nội dung",
    desc: "Nhập thông tin cặp đôi, ngày cưới, địa điểm, câu chuyện tình yêu và album ảnh.",
  },
  {
    num: "03",
    title: "Chia sẻ & nhận RSVP",
    desc: "Gửi link hoặc mã QR đến khách mời. Thu thập xác nhận và lời chúc tự động.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="section-spacing" id="how-it-works">
      <div className="container-wide">
        <AnimatedSection className="text-center mb-16 md:mb-20">
          <span className="section-eyebrow mb-4 block">Quy trình</span>
          <h2 className="font-display mb-4" style={{ color: 'var(--color-text-heading)' }}>
            Ba bước đơn giản
          </h2>
          <p className="font-body text-[0.9rem] font-light max-w-md mx-auto" style={{ color: 'var(--color-text-muted)' }}>
            Tạo thiệp cưới online sang trọng chỉ trong vài phút
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          {steps.map((step, i) => (
            <AnimatedSection key={step.num} delay={i * 0.12}>
              <div className="relative group">
                {/* Connecting line between steps (desktop) */}
                {i < steps.length - 1 && (
                  <div
                    className="hidden md:block absolute top-8 left-[60%] w-[calc(100%-20%)] h-px"
                    style={{ background: 'linear-gradient(90deg, var(--color-border), transparent)' }}
                  />
                )}

                {/* Step number */}
                <div className="flex items-center gap-4 mb-5">
                  <span
                    className="font-display text-4xl md:text-5xl transition-colors duration-500"
                    style={{ color: 'rgba(237, 131, 131, 0.25)' }}
                  >
                    {step.num}
                  </span>
                  <div className="h-px flex-1 md:hidden" style={{ backgroundColor: 'var(--color-border)' }} />
                </div>

                <h3 className="font-display text-xl mb-3" style={{ color: 'var(--color-text-heading)' }}>{step.title}</h3>
                <p className="font-body text-[0.85rem] font-light leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                  {step.desc}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
