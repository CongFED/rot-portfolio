import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { label: "Trang chủ", href: "/" },
  { label: "Mẫu thiệp", href: "/templates" },
  { label: "Bảng giá", href: "/#pricing" },
  { label: "Hướng dẫn", href: "/#how-it-works" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-[var(--color-bg)]/95 backdrop-blur-md shadow-[var(--shadow-soft)]"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="container-wide flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display text-[1.3rem] tracking-tight" style={{ color: 'var(--color-primary)' }}>
              DUCO
            </span>
          </Link>

          {/* Center: Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="font-body text-[0.85rem] font-medium transition-colors duration-300 hover:opacity-80"
                style={{ color: 'var(--color-primary)' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: CTA */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <Button
                className="rounded-full px-5 py-2.5 h-auto text-[0.85rem] font-semibold transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-button-text)',
                }}
                asChild
              >
                <Link to="/dashboard">
                  Bảng điều khiển
                </Link>
              </Button>
            ) : (
              <Button
                className="rounded-full px-6 py-2.5 h-auto text-[0.85rem] font-semibold flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-button-text)',
                }}
                asChild
              >
                <Link to="/templates">
                  Tạo thiệp ngay
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg transition-colors"
              style={{ color: 'var(--color-primary)' }}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[60px] inset-x-0 z-40 backdrop-blur-xl p-6 md:hidden shadow-lg border-b"
            style={{
              backgroundColor: 'rgba(255, 243, 243, 0.97)',
              borderColor: 'var(--color-border)',
            }}
          >
            <nav className="flex flex-col gap-1 mb-6">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-body text-base px-4 py-3 rounded-xl transition-colors duration-200"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <Button
              className="w-full rounded-full py-5 text-base font-semibold flex justify-center items-center gap-2"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-button-text)',
              }}
              asChild
            >
              <Link to="/templates" onClick={() => setMobileOpen(false)}>
                Tạo thiệp ngay
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
