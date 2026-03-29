import { useEffect, useMemo, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const testimonials = [
  {
    name: "Thanh Hằng & Minh Khoa",
    quote:
      "Thiệp đẹp quá, khách mời ai cũng khen. Chúng tôi rất hài lòng với chất lượng thiết kế.",
    rating: 5,
  },
  {
    name: "Phương Anh & Đức Trung",
    quote:
      "Tạo thiệp rất dễ dàng và nhanh chóng. Quan trọng nhất là nhận được RSVP tự động.",
    rating: 5,
  },
  {
    name: "Thu Trang & Hoàng Bảo",
    quote:
      "Lần đầu thấy thiệp cưới online sang trọng như vậy. Bạn bè cứ tưởng thuê designer riêng.",
    rating: 5,
  },
  {
    name: "Ngọc Mai & Quốc Anh",
    quote:
      "Mẫu thiệp rất tinh tế, hiện đại và dễ tùy chỉnh. Chúng tôi gần như không cần chỉnh sửa quá nhiều.",
    rating: 5,
  },
  {
    name: "Bảo Trâm & Gia Huy",
    quote:
      "Tốc độ tạo thiệp nhanh, giao diện đẹp và trải nghiệm rất mượt trên điện thoại lẫn máy tính.",
    rating: 5,
  },
  {
    name: "Khánh Linh & Tuấn Kiệt",
    quote:
      "Điểm chúng tôi thích nhất là cảm giác cao cấp. Khách mời đều bất ngờ vì thiệp online mà vẫn sang trọng.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const itemsPerView = useMemo(() => {
    if (typeof window === "undefined") return 3.5;
    if (window.innerWidth < 640) return 1.15;
    if (window.innerWidth < 1024) return 2.2;
    return 3.5;
  }, []);

  const [visibleItems, setVisibleItems] = useState(itemsPerView);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1.15);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2.2);
      } else {
        setVisibleItems(3.5);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - Math.ceil(visibleItems));

  const nextSlide = () => {
    setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(timer);
  }, [maxIndex]);

  useEffect(() => {
    if (current > maxIndex) {
      setCurrent(maxIndex);
    }
  }, [current, maxIndex]);

  return (
    <section
      className="section-spacing overflow-hidden"
      style={{ backgroundColor: "var(--color-bg-soft)" }}
    >
      <div className="container-wide">
        <AnimatedSection className="text-center mb-14 md:mb-18">
          <span className="section-eyebrow mb-4 block">Phản hồi</span>
          <h2
            className="font-display mb-4"
            style={{ color: "var(--color-text-heading)" }}
          >
            Cặp đôi nói gì
            <br className="hidden sm:block" /> về DUCO?
          </h2>
        </AnimatedSection>

        <div className="relative">
          <button
            onClick={prevSlide}
            aria-label="Previous testimonials"
            className="hidden md:flex absolute left-0 top-1/2 z-20 -translate-y-1/2 items-center justify-center w-11 h-11 rounded-full border backdrop-blur-sm transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <ChevronLeft className="w-5 h-5" style={{ color: "var(--color-text-heading)" }} />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next testimonials"
            className="hidden md:flex absolute right-0 top-1/2 z-20 -translate-y-1/2 items-center justify-center w-11 h-11 rounded-full border backdrop-blur-sm transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <ChevronRight className="w-5 h-5" style={{ color: "var(--color-text-heading)" }} />
          </button>

          <div className="absolute left-0 top-0 bottom-0 w-10 md:w-20 z-10 pointer-events-none bg-gradient-to-r from-[var(--color-bg-soft)] to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-10 md:w-20 z-10 pointer-events-none bg-gradient-to-l from-[var(--color-bg-soft)] to-transparent" />

          <div className="overflow-hidden px-0 md:px-14">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{
                transform: `translateX(-${current * (100 / visibleItems)}%)`,
              }}
            >
              {testimonials.map((t, i) => (
                <div
                  key={`${t.name}-${i}`}
                  className="flex-shrink-0 px-2 md:px-3"
                  style={{
                    width: `calc(100% / ${visibleItems})`,
                  }}
                >
                  <AnimatedSection delay={i * 0.05}>
                    <div
                      className="rounded-2xl p-6 md:p-7 lg:p-8 h-full min-h-[250px] flex flex-col border transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
                      style={{
                        backgroundColor: "var(--color-surface)",
                        borderColor: "var(--color-border)",
                        boxShadow: "var(--shadow-soft)",
                      }}
                    >
                      <div className="flex gap-1 mb-5">
                        {Array.from({ length: t.rating }).map((_, j) => (
                          <Star
                            key={j}
                            className="h-3.5 w-3.5"
                            style={{ color: "var(--color-gold)" }}
                            fill="currentColor"
                          />
                        ))}
                      </div>

                      <p
                        className="font-body text-[0.88rem] md:text-[0.92rem] font-light leading-relaxed flex-1 mb-6"
                        style={{ color: "var(--color-text-body)" }}
                      >
                        "{t.quote}"
                      </p>

                      <div
                        className="flex items-center gap-3 pt-5 border-t"
                        style={{ borderColor: "var(--color-border)" }}
                      >
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                          style={{ backgroundColor: "var(--color-accent-light)" }}
                        >
                          <span
                            className="font-display text-sm"
                            style={{ color: "var(--color-primary)" }}
                          >
                            {t.name.charAt(0)}
                          </span>
                        </div>

                        <p
                          className="font-body text-[0.8rem] md:text-[0.84rem] font-semibold leading-snug"
                          style={{ color: "var(--color-text-heading)" }}
                        >
                          {t.name}
                        </p>
                      </div>
                    </div>
                  </AnimatedSection>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-7 md:mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                aria-label={`Go to slide ${index + 1}`}
                className="h-2.5 rounded-full transition-all duration-300"
                style={{
                  width: current === index ? "24px" : "10px",
                  backgroundColor:
                    current === index
                      ? "var(--color-primary)"
                      : "var(--color-border)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;