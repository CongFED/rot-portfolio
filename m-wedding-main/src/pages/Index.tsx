import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import HeroSection from "@/components/home/HeroSection";
import VideoInvitationSection from "@/components/home/VideoInvitationSection";
import CategoryGallerySection from "@/components/home/CategoryGallerySection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import PricingSection from "@/components/home/PricingSection";
import FAQSection from "@/components/home/FAQSection";

const Index = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar />
      <HeroSection />
      <VideoInvitationSection />
      <CategoryGallerySection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />

      {/* Final CTA Section */}
      <section className="section-spacing">
        <div className="container-narrow text-center">
          <AnimatedSection>
            <div className="decorative-divider">
              <span className="font-display text-lg" style={{ color: 'var(--color-primary)' }}>♥</span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,4vw,3rem)] mb-5" style={{ color: 'var(--color-text-heading)' }}>
              Sẵn sàng tạo thiệp cưới<br className="hidden sm:block" /> của riêng bạn?
            </h2>
            <p className="font-body text-[0.9rem] font-light max-w-md mx-auto mb-10" style={{ color: 'var(--color-text-muted)' }}>
              Bắt đầu miễn phí ngay hôm nay. Không cần thẻ tín dụng, không cần kỹ năng thiết kế.
            </p>
            <Button
              variant="cta"
              size="lg"
              className="text-[0.85rem] px-10 py-6 gap-2.5 rounded-full shadow-[var(--shadow-soft)]"
              asChild
            >
              <Link to="/templates">
                Bắt đầu thiết kế ngay
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
