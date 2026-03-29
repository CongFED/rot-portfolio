import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { templates } from "@/lib/templates-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowLeft } from "lucide-react";

const TemplateDetailPage = () => {
  const { id } = useParams();
  const tpl = templates.find((t) => t.id === id);

  if (!tpl) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg)' }}>
        <p className="font-body" style={{ color: 'var(--color-text-muted)' }}>Không tìm thấy mẫu thiệp.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar />
      <div className="pt-28 md:pt-36 pb-16">
        <div className="container-wide">
          <Link
            to="/templates"
            className="inline-flex items-center gap-2 font-body text-sm mb-8 transition-colors"
            style={{ color: 'var(--color-text-muted)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại mẫu thiệp
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <AnimatedSection className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-2xl shadow-[var(--shadow-card)]">
                <img src={tpl.image} alt={tpl.title} className="w-full object-cover" />
                {tpl.isPremium && (
                  <Badge
                    className="absolute top-4 right-4 border-0 font-body font-semibold"
                    style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
                  >
                    Premium
                  </Badge>
                )}
              </div>
            </AnimatedSection>

            <AnimatedSection className="lg:col-span-5" delay={0.15}>
              <div className="lg:sticky lg:top-28">
                <div className="flex gap-2 flex-wrap mb-4">
                  {tpl.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-body text-xs font-light px-3 py-1 rounded-full"
                      style={{ backgroundColor: 'var(--color-accent-light)', color: 'var(--color-primary)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="font-display text-3xl md:text-4xl mb-4" style={{ color: 'var(--color-text-heading)' }}>{tpl.title}</h1>
                <p className="font-body text-base font-light leading-relaxed mb-8" style={{ color: 'var(--color-text-muted)' }}>
                  {tpl.description}
                </p>

                <h3 className="font-body text-sm font-semibold mb-4" style={{ color: 'var(--color-text-heading)' }}>Bao gồm các phần</h3>
                <ul className="space-y-3 mb-8">
                  {tpl.features.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <Check className="h-4 w-4 shrink-0" style={{ color: 'var(--color-primary)' }} />
                      <span className="font-body text-sm font-light" style={{ color: 'var(--color-text-muted)' }}>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col gap-3">
                  <Button variant="cta" size="lg" className="w-full rounded-xl" asChild>
                    <Link to={`/builder?template=${tpl.builderTemplate}`}>Sử dụng mẫu này</Link>
                  </Button>
                  <Button variant="cta-outline" size="lg" className="w-full rounded-xl" asChild>
                    <Link to="/invitation">Xem bản demo</Link>
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TemplateDetailPage;
