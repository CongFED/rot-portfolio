import { Header } from '@/components/header'
import { HeroSection } from '@/components/hero-section'
import { PortfolioGallery } from '@/components/portfolio-gallery'
import { TestimonialsSection } from '@/components/testimonials-section'
import { AboutSection } from '@/components/about-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <PortfolioGallery />
      <TestimonialsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
