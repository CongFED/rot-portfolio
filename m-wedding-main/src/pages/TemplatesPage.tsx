import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { templates } from "@/lib/templates-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const styles = ["all", "elegant", "minimal", "floral", "modern"] as const;
const styleLabels: Record<string, string> = {
  all: "Tất cả",
  elegant: "Sang trọng",
  minimal: "Tối giản",
  floral: "Hoa",
  modern: "Hiện đại",
};

const TemplatesPage = () => {
  const [activeStyle, setActiveStyle] = useState<string>("all");
  const [showPremium, setShowPremium] = useState<string>("all");

  const filtered = templates.filter((t) => {
    if (activeStyle !== "all" && t.style !== activeStyle) return false;
    if (showPremium === "free" && t.isPremium) return false;
    if (showPremium === "premium" && !t.isPremium) return false;
    return true;
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <Navbar />
      <div className="pt-28 md:pt-36 pb-16">
        <div className="container-wide">
          <AnimatedSection className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-5xl mb-4" style={{ color: 'var(--color-text-heading)' }}>Mẫu thiệp cưới</h1>
            <p className="font-body text-base font-light max-w-lg mx-auto" style={{ color: 'var(--color-text-muted)' }}>
              Chọn mẫu thiệp phù hợp với phong cách đám cưới của bạn. Tất cả đều có thể tùy chỉnh.
            </p>
          </AnimatedSection>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {styles.map((s) => (
              <button
                key={s}
                onClick={() => setActiveStyle(s)}
                className="font-body text-sm font-medium px-4 py-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: activeStyle === s ? 'var(--color-primary)' : 'var(--color-accent-light)',
                  color: activeStyle === s ? 'white' : 'var(--color-primary)',
                }}
              >
                {styleLabels[s]}
              </button>
            ))}
          </div>
          <div className="flex justify-center gap-3 mb-12">
            {[
              { key: "all", label: "Tất cả" },
              { key: "free", label: "Miễn phí" },
              { key: "premium", label: "Premium" },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setShowPremium(f.key)}
                className="font-body text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: showPremium === f.key ? 'var(--color-primary)' : 'var(--color-accent-light)',
                  color: showPremium === f.key ? 'white' : 'var(--color-primary)',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((tpl, i) => (
              <AnimatedSection key={tpl.id} delay={i * 0.05}>
                <div className="group">
                  <div className="relative overflow-hidden rounded-2xl aspect-[3/4] mb-4 shadow-[var(--shadow-card)] transition-shadow duration-500 group-hover:shadow-[var(--shadow-elevated)]">
                    <img
                      src={tpl.image}
                      alt={tpl.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {tpl.isPremium && (
                      <Badge
                        className="absolute top-3 right-3 border-0 font-body text-xs font-semibold"
                        style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}
                      >
                        Premium
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-display text-lg mb-1" style={{ color: 'var(--color-text-heading)' }}>{tpl.title}</h3>
                  <p className="font-body text-sm font-light mb-3 line-clamp-2" style={{ color: 'var(--color-text-muted)' }}>
                    {tpl.description}
                  </p>
                  <div className="flex gap-2 flex-wrap mb-4">
                    {tpl.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-body text-xs font-light px-2 py-1 rounded-lg"
                        style={{ backgroundColor: 'var(--color-accent-light)', color: 'var(--color-primary)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button variant="cta" size="sm" className="rounded-xl" asChild>
                      <Link to={`/templates/${tpl.id}`}>Xem chi tiết</Link>
                    </Button>
                    <Button variant="cta-outline" size="sm" className="rounded-xl" asChild>
                      <Link to={`/builder?template=${tpl.builderTemplate}`}>Chỉnh sửa mẫu này</Link>
                    </Button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center font-body text-sm py-16" style={{ color: 'var(--color-text-muted)' }}>
              Không tìm thấy mẫu thiệp phù hợp.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TemplatesPage;
