import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

const faqs = [
  {
    q: "Thiệp cưới online là gì?",
    a: "Thiệp cưới online là dạng thiệp mời kỹ thuật số, hiển thị trên web. Bạn có thể chia sẻ qua link hoặc mã QR, khách mời mở trên điện thoại để xem thông tin đám cưới, RSVP và gửi lời chúc.",
  },
  {
    q: "Tôi có thể tùy chỉnh những gì?",
    a: "Bạn có thể thay đổi tên, ngày cưới, địa điểm, câu chuyện tình yêu, album ảnh, nhạc nền, font chữ, bảng màu, bố cục, RSVP và nhiều hơn nữa. Mỗi mẫu thiệp đều có thể tùy biến toàn diện.",
  },
  {
    q: "Khách mời cần cài ứng dụng không?",
    a: "Không cần. Khách mời chỉ cần mở link hoặc quét QR trên trình duyệt điện thoại. Thiệp tương thích với tất cả thiết bị.",
  },
  {
    q: "Dữ liệu RSVP lưu ở đâu?",
    a: "Tất cả dữ liệu được lưu trữ an toàn trên hệ thống cloud của chúng tôi. Bạn có thể xem và xuất danh sách khách mời bất cứ lúc nào.",
  },
  {
    q: "Có hỗ trợ sau khi mua không?",
    a: "Có. Chúng tôi hỗ trợ qua email và chat cho tất cả người dùng. Gói Premium được ưu tiên hỗ trợ nhanh.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section-spacing" style={{ backgroundColor: 'var(--color-bg-soft)' }}>
      <div className="container-narrow">
        <AnimatedSection className="text-center mb-14 md:mb-16">
          <span className="section-eyebrow mb-4 block">Câu hỏi thường gặp</span>
          <h2 className="font-display mb-4" style={{ color: 'var(--color-text-heading)' }}>
            Có thắc mắc?
          </h2>
        </AnimatedSection>

        <AnimatedSection>
          <div className="space-y-2">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className={`rounded-xl transition-all duration-300 ${
                    isOpen ? "shadow-[var(--shadow-card)]" : ""
                  }`}
                  style={{
                    backgroundColor: isOpen ? 'var(--color-surface)' : 'transparent',
                    borderWidth: isOpen ? '1px' : '0',
                    borderColor: 'var(--color-border)',
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left rounded-xl transition-colors duration-200"
                    style={{ color: 'var(--color-text-heading)' }}
                  >
                    <span className="font-body text-[0.88rem] font-medium pr-4">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      style={{ color: 'var(--color-primary)' }}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 font-body text-[0.84rem] font-light leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FAQSection;
