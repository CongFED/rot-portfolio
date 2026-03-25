import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: 'var(--color-bg-soft)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div className="container-wide py-14 md:py-18">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link to="/" className="inline-block mb-4">
              <span
                className="font-display text-2xl tracking-tight"
                style={{ color: 'var(--color-primary)' }}
              >
                DUCO
              </span>
            </Link>
            <p
              className="font-body text-[0.82rem] font-light leading-relaxed max-w-xs"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Thiệp cưới online sang trọng và tinh tế. Tạo khoảnh khắc đáng nhớ cho ngày trọng đại.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <h4
              className="font-display text-base mb-4"
              style={{ color: 'var(--color-primary)' }}
            >
              Sản phẩm
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Mẫu thiệp", to: "/templates" },
                { label: "Bảng giá", to: "/" },
                { label: "Tạo thiệp", to: "/builder" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="font-body text-[0.82rem] font-light transition-colors duration-300"
                    style={{ color: 'var(--color-text-muted)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4
              className="font-display text-base mb-4"
              style={{ color: 'var(--color-primary)' }}
            >
              Hỗ trợ
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Liên hệ", to: "/" },
                { label: "Hướng dẫn", to: "/" },
                { label: "Điều khoản", to: "/" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="font-body text-[0.82rem] font-light transition-colors duration-300"
                    style={{ color: 'var(--color-text-muted)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t" style={{ borderColor: 'var(--color-border)' }}>
        <div className="container-wide py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-body text-[0.72rem] font-light" style={{ color: 'var(--color-text-muted)' }}>
            © 2026 DUCO. Tất cả quyền được bảo lưu.
          </p>
          <p className="font-body text-[0.72rem] font-light" style={{ color: 'var(--color-text-muted)' }}>
            Made with ♥ in Vietnam
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
