import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section
      className="relative min-h-[90svh] flex items-center overflow-hidden pt-24 pb-0 md:pt-32"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {/* Soft decorative circles */}
      <div
        className="absolute top-20 -right-20 w-[400px] h-[400px] rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: 'var(--color-primary-soft)' }}
      />
      <div
        className="absolute bottom-10 -left-16 w-[300px] h-[300px] rounded-full opacity-15 blur-3xl"
        style={{ backgroundColor: 'var(--color-accent-light)' }}
      />

      <div className="container-wide relative z-10 h-full w-full max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-8 items-center h-full">
          {/* Left – Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-xl py-12 lg:py-24 pl-4 lg:pl-12"
          >
            <span
              className="font-body text-[0.72rem] font-semibold tracking-[0.2em] uppercase mb-4 block"
              style={{ color: 'var(--color-primary)' }}
            >
              Thiệp cưới online
            </span>

            <h1
              className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-[1.1] tracking-[-0.02em] mb-6"
              style={{ color: 'var(--color-text-heading)' }}
            >
              Tạo thiệp cưới
              <br />
              <span style={{ color: 'var(--color-primary)' }}>sang trọng & tinh tế</span>
            </h1>

            <p
              className="font-body text-[0.95rem] md:text-[1.05rem] leading-[1.7] max-w-sm mb-10"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Thiết kế thiệp cưới online đẹp mắt, chia sẻ dễ dàng qua link hoặc QR code. Thu thập RSVP và lời chúc tự động.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-h-[40px]">
              <Button
                className="rounded-full px-8 py-6 h-auto text-[0.9rem] font-semibold flex items-center gap-3 transition-transform hover:-translate-y-1 group"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-button-text)',
                  boxShadow: '0 8px 24px rgba(237, 131, 131, 0.25)',
                }}
                asChild
              >
                <Link to="/templates">
                  Bắt đầu thiết kế
                  <ArrowRight className="h-2 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                variant="cta-outline"
                className="rounded-full px-8 py-6 h-auto text-[0.9rem]"
                asChild
              >
                <Link to="/templates">
                  Xem mẫu thiệp
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Right – Large Hero Image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="relative h-[60vh] lg:h-[85vh] w-full flex items-end justify-center lg:justify-end mt-8 lg:mt-0"
          >
            <div className="relative w-full h-full max-w-[800px] right-0 lg:-right-12">
              <img
                src="https://thiepcuoi.cloud/assets/images/banner.jpg"
                alt="Elegant wedding couple"
                className="w-full h-full object-cover object-[center_20%] rounded-t-3xl"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
