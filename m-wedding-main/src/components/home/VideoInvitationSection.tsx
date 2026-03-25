import { motion } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import heroImg from "@/assets/hero-wedding.jpg";

const VideoInvitationSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] md:min-h-[560px]">
        {/* Left – Image / Video with play button */}
        <AnimatedSection className="relative">
          <div className="relative h-full min-h-[360px] lg:min-h-full overflow-hidden">
            <img
              src={heroImg}
              alt="Wedding celebration video"
              className="w-full h-full object-cover"
            />
            {/* Soft overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/15 via-black/5 to-transparent" />

            {/* Play button */}
            <button className="absolute inset-0 flex items-center justify-center group">
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-lg transition-colors duration-300"
                style={{
                  backgroundColor: 'var(--color-primary)',
                }}
              >
                <Play className="h-6 w-6 md:h-7 md:w-7 text-white ml-1" fill="currentColor" />
              </motion.div>
            </button>
          </div>
        </AnimatedSection>

        {/* Right – Text content */}
        <div className="relative flex items-center" style={{ backgroundColor: 'var(--color-bg-soft)' }}>
          {/* Decorative circles */}
          <svg
            viewBox="0 0 300 300"
            className="absolute -right-16 -bottom-16 w-[280px] h-[280px] opacity-[0.15]"
            fill="none"
          >
            <circle cx="150" cy="150" r="140" stroke="var(--color-primary-soft)" strokeWidth="1" />
            <circle cx="150" cy="150" r="100" stroke="var(--color-primary-soft)" strokeWidth="0.5" />
          </svg>

          <AnimatedSection className="relative z-10 px-8 py-14 md:px-14 lg:px-16 xl:px-20 max-w-lg">
            <h2
              className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.15] mb-6"
              style={{ color: 'var(--color-text-heading)' }}
            >
              Video
              <br />
              <span style={{ color: 'var(--color-primary)' }}>Invitation</span>
            </h2>

            <p className="font-body text-[0.88rem] font-light leading-[1.85] mb-8" style={{ color: 'var(--color-text-muted)' }}>
              Tạo thiệp mời video sống động cho ngày cưới. Kết hợp
              hình ảnh, nhạc nền và hiệu ứng chuyên nghiệp để mang
              đến trải nghiệm đặc biệt cho khách mời của bạn.
            </p>

            <Button
              variant="cta"
              className="rounded-full px-7 py-5 text-[0.82rem] gap-2 shadow-[var(--shadow-soft)]"
              asChild
            >
              <Link to="/templates">
                Khám phá ngay
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default VideoInvitationSection;
