import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import { templates } from "@/lib/templates-data";

const TemplatesPreviewSection = () => {
  const featured = templates.slice(0, 4);

  return (
    <section className="section-spacing section-alt">
      <div className="container-wide">
        <AnimatedSection className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14 md:mb-16">
          <div>
            <span className="section-eyebrow mb-4 block">Bộ sưu tập</span>
            <h2 className="font-display mb-3" style={{ color: 'var(--color-text-heading)' }}>
              Mẫu thiệp nổi bật
            </h2>
            <p className="font-body text-[0.9rem] font-light max-w-lg" style={{ color: 'var(--color-text-muted)' }}>
              Mỗi mẫu được thiết kế tỉ mỉ, phù hợp với phong cách khác nhau – từ cổ điển đến hiện đại.
            </p>
          </div>
          <Button variant="ghost" className="text-[0.8rem] gap-2 self-start md:self-auto" style={{ color: 'var(--color-primary)' }} asChild>
            <Link to="/templates">
              Xem tất cả
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {featured.map((tpl, i) => (
            <AnimatedSection key={tpl.id} delay={i * 0.08}>
              <Link to={`/templates/${tpl.id}`} className="group block">
                <div className="image-elegant rounded-xl md:rounded-2xl aspect-[3/4] mb-4 relative overflow-hidden">
                  <img
                    src={tpl.image}
                    alt={tpl.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {tpl.isPremium && (
                    <span
                      className="absolute top-3 right-3 font-body text-[0.6rem] font-semibold tracking-wider uppercase px-3 py-1 rounded-full backdrop-blur-md border"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.85)',
                        color: 'var(--color-primary)',
                        borderColor: 'var(--color-border)',
                      }}
                    >
                      Premium
                    </span>
                  )}
                </div>
                <h3 className="font-display text-lg mb-1 transition-colors duration-300" style={{ color: 'var(--color-text-heading)' }}>
                  {tpl.title}
                </h3>
                <p className="font-body text-[0.78rem] font-light line-clamp-1" style={{ color: 'var(--color-text-muted)' }}>
                  {tpl.description}
                </p>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TemplatesPreviewSection;
