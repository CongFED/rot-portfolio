import { useState } from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import { templates } from "@/lib/templates-data";

/* ─── Category tabs ─── */
const categories = [
  { key: "wedding", label: "Wedding" },
  { key: "birthday", label: "Birthday" },
  { key: "greeting", label: "Greeting" },
  { key: "flyer", label: "Flyer" },
];

/* ─── Sidebar filters ─── */
const styleFilters = [
  "Wedding Invitation",
  "Classic",
  "Elegant",
  "Modern",
  "Floral",
  "Minimal",
  "Luxury",
  "Royal",
  "Garden",
  "Catholic",
];

const sortFilters = [
  "Most popular",
  "Recently",
  "Price low",
  "Price high",
];

/* ─── Gallery cards ─── */
const galleryCards = [
  ...templates,
  ...templates.map((t, i) => ({ ...t, id: `${t.id}-dup-${i}`, title: t.title })),
].slice(0, 6);

const CategoryGallerySection = () => {
  const [activeCategory, setActiveCategory] = useState("wedding");
  const [activeFilter, setActiveFilter] = useState("Wedding Invitation");
  const [likedCards, setLikedCards] = useState<Set<string>>(new Set());

  const toggleLike = (id: string) => {
    setLikedCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section className="section-spacing">
      <div className="container-wide">
        {/* Category tabs */}
        <AnimatedSection className="flex justify-center mb-12 md:mb-16">
          <div className="flex items-center gap-8 md:gap-12">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`font-body text-[0.85rem] pb-2 border-b-2 transition-all duration-300 ${
                  activeCategory === cat.key
                    ? "font-semibold border-[var(--color-primary)]"
                    : "border-transparent hover:border-[var(--color-border)]"
                }`}
                style={{
                  color: activeCategory === cat.key ? 'var(--color-primary)' : 'var(--color-text-muted)',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Main layout: sidebar + grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-12">
          {/* Sidebar filters */}
          <AnimatedSection>
            <aside className="hidden lg:block">
              {/* Style filters */}
              <h4
                className="font-display text-base mb-4"
                style={{ color: 'var(--color-primary)' }}
              >
                Wedding Invitation
              </h4>
              <ul className="space-y-2 mb-8">
                {styleFilters.map((f) => (
                  <li key={f}>
                    <button
                      onClick={() => setActiveFilter(f)}
                      className={`font-body text-[0.82rem] transition-colors duration-200 ${
                        activeFilter === f ? "font-semibold" : "font-light"
                      }`}
                      style={{
                        color: activeFilter === f ? 'var(--color-primary)' : 'var(--color-text-muted)',
                      }}
                    >
                      {f}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Sort filters */}
              <h4
                className="font-display text-base mb-4"
                style={{ color: 'var(--color-primary)' }}
              >
                Filter
              </h4>
              <ul className="space-y-2">
                {sortFilters.map((f) => (
                  <li key={f}>
                    <button
                      className="font-body text-[0.82rem] font-light transition-colors duration-200"
                      style={{ color: 'var(--color-text-muted)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                    >
                      {f}
                    </button>
                  </li>
                ))}
              </ul>
            </aside>

            {/* Mobile filter: horizontal scroll */}
            <div className="lg:hidden overflow-x-auto pb-2 mb-4 -mx-2">
              <div className="flex items-center gap-2 px-2">
                {styleFilters.slice(0, 6).map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`whitespace-nowrap font-body text-[0.78rem] px-4 py-2 rounded-full border transition-all`}
                    style={{
                      borderColor: activeFilter === f ? 'var(--color-primary)' : 'var(--color-border)',
                      backgroundColor: activeFilter === f ? 'var(--color-accent-light)' : 'transparent',
                      color: activeFilter === f ? 'var(--color-primary)' : 'var(--color-text-muted)',
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Card grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-7">
            {galleryCards.map((card, i) => (
              <AnimatedSection key={card.id} delay={i * 0.06}>
                <div className="group">
                  <Link to={`/templates/${card.id.replace(/-dup-\d+/, '')}`} className="block">
                    {/* Image */}
                    <div
                      className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4 shadow-[var(--shadow-card)] transition-shadow duration-500 group-hover:shadow-[var(--shadow-elevated)]"
                      style={{ backgroundColor: 'var(--color-accent-light)' }}
                    >
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                      {/* Heart icon */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleLike(card.id);
                        }}
                        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110"
                      >
                        <Heart
                          className={`h-3.5 w-3.5 transition-colors duration-300 ${
                            likedCards.has(card.id)
                              ? "fill-[var(--color-primary)]"
                              : ""
                          }`}
                          style={{ color: likedCards.has(card.id) ? 'var(--color-primary)' : 'var(--color-text-muted)' }}
                          strokeWidth={1.5}
                        />
                      </button>
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="flex items-start gap-2">
                    <Heart className="h-3 w-3 mt-1.5 shrink-0" style={{ color: 'rgba(237, 131, 131, 0.3)' }} strokeWidth={1.5} />
                    <div>
                      <h3 className="font-display text-[1.05rem] mb-1 group-hover:opacity-80 transition-opacity duration-300" style={{ color: 'var(--color-text-heading)' }}>
                        {card.title}
                      </h3>
                      <p className="font-body text-[0.78rem] font-light leading-relaxed line-clamp-2" style={{ color: 'var(--color-text-muted)' }}>
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryGallerySection;
