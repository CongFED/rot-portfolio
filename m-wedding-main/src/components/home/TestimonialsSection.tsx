import { Star } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const testimonials = [
  {
    name: "Thanh Hằng & Minh Khoa",
    quote: "Thiệp đẹp quá, khách mời ai cũng khen. Chúng tôi rất hài lòng với chất lượng thiết kế.",
    rating: 5,
  },
  {
    name: "Phương Anh & Đức Trung",
    quote: "Tạo thiệp rất dễ dàng và nhanh chóng. Quan trọng nhất là nhận được RSVP tự động, tiết kiệm bao nhiêu thời gian.",
    rating: 5,
  },
  {
    name: "Thu Trang & Hoàng Bảo",
    quote: "Lần đầu thấy thiệp cưới online sang trọng như vậy. Bạn bè cứ tưởng thuê designer riêng.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="section-spacing" style={{ backgroundColor: 'var(--color-bg-soft)' }}>
      <div className="container-wide">
        <AnimatedSection className="text-center mb-14 md:mb-18">
          <span className="section-eyebrow mb-4 block">Phản hồi</span>
          <h2 className="font-display mb-4" style={{ color: 'var(--color-text-heading)' }}>
            Cặp đôi nói gì<br className="hidden sm:block" /> về DUCO?
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 0.1}>
              <div
                className="rounded-2xl p-7 md:p-8 h-full flex flex-col border transition-all duration-500 hover:shadow-[var(--shadow-elevated)]"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border)',
                  boxShadow: 'var(--shadow-soft)',
                }}
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5" style={{ color: 'var(--color-gold)' }} fill="currentColor" />
                  ))}
                </div>

                {/* Quote */}
                <p className="font-body text-[0.88rem] font-light leading-relaxed flex-1 mb-6" style={{ color: 'var(--color-text-body)' }}>
                  "{t.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-5 border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-accent-light)' }}
                  >
                    <span className="font-display text-sm" style={{ color: 'var(--color-primary)' }}>
                      {t.name.charAt(0)}
                    </span>
                  </div>
                  <p className="font-body text-[0.78rem] font-semibold" style={{ color: 'var(--color-text-heading)' }}>
                    {t.name}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
