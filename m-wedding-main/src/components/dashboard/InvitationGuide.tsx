import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Palette,
  PenLine,
  Eye,
  CreditCard,
  Share2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─── Steps Data ─── */
const steps = [
  {
    num: 1,
    icon: Palette,
    title: "Chọn mẫu thiệp",
    desc: "Duyệt bộ sưu tập mẫu thiệp và chọn phong cách yêu thích.",
  },
  {
    num: 2,
    icon: PenLine,
    title: "Chỉnh sửa nội dung",
    desc: "Điền tên, ngày cưới, địa điểm, lời mời và thêm hình ảnh.",
  },
  {
    num: 3,
    icon: Eye,
    title: "Xem trước thiệp",
    desc: "Kiểm tra giao diện và nội dung trước khi xuất bản.",
  },
  {
    num: 4,
    icon: CreditCard,
    title: "Xuất bản thiệp",
    desc: "Hoàn tất thanh toán và xuất bản thiệp cưới online.",
  },
  {
    num: 5,
    icon: Share2,
    title: "Chia sẻ cho khách",
    desc: "Gửi link thiệp xinh xắn đến bạn bè và người thân.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

export default function InvitationGuide() {
  return (
    <section>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
        <div>
          <h2
            className="font-display text-lg"
            style={{ color: "var(--color-text-heading)" }}
          >
            Hướng dẫn tạo thiệp
          </h2>
          <p
            className="font-body text-xs font-light mt-1"
            style={{ color: "var(--color-text-muted)" }}
          >
            5 bước đơn giản để tạo thiệp cưới online hoàn hảo
          </p>
        </div>
        <Button variant="cta" size="sm" className="rounded-xl self-start sm:self-auto" asChild>
          <Link to="/templates" className="flex items-center gap-1.5">
            Bắt đầu tạo thiệp
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>

      {/* Steps */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        {steps.map((step, i) => (
          <motion.div key={step.num} variants={cardVariants} className="relative">
            {/* Connector line (desktop only, between cards) */}
            {i < steps.length - 1 && (
              <div
                className="hidden lg:block absolute top-10 -right-2 w-4 h-px"
                style={{ background: "linear-gradient(90deg, var(--color-border), transparent)" }}
              />
            )}

            <div
              className="glass-card rounded-2xl p-5 h-full hover-lift transition-all duration-300 group cursor-default"
              style={{ position: "relative", overflow: "hidden" }}
            >
              {/* Subtle gradient bg on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, rgba(237,131,131,0.06), rgba(245,176,176,0.03))",
                }}
              />

              <div className="relative">
                {/* Step number badge + Icon */}
                <div className="flex items-center gap-3 mb-3.5">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300"
                    style={{
                      backgroundColor: "var(--color-accent-light)",
                    }}
                  >
                    <step.icon className="h-4 w-4" style={{ color: "var(--color-primary)" }} />
                  </div>
                  <span
                    className="font-body text-[10px] font-semibold tracking-widest uppercase"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    Bước {step.num}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="font-body text-sm font-semibold mb-1.5"
                  style={{ color: "var(--color-text-heading)" }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  className="font-body text-xs font-light leading-relaxed"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {step.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
