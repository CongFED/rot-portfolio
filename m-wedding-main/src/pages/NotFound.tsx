import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-display" style={{ color: 'var(--color-primary)' }}>404</h1>
        <p className="mb-6 text-lg font-body font-light" style={{ color: 'var(--color-text-muted)' }}>
          Trang bạn tìm không tồn tại
        </p>
        <a
          href="/"
          className="font-body text-sm font-semibold underline underline-offset-4 transition-opacity hover:opacity-80"
          style={{ color: 'var(--color-primary)' }}
        >
          ← Quay lại trang chủ
        </a>
      </div>
    </div>
  );
};

export default NotFound;
