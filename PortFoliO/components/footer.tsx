'use client'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-3 py-8 sm:py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Portfolio</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Dịch vụ sáng tạo chuyên nghiệp cho thiết kế, biên tập và người mẫu.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Liên kết Nhanh</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li>
                <a href="#work" className="hover:text-accent transition-colors">
                  Tác phẩm
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-accent transition-colors">
                  Về tôi
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-accent transition-colors">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Dịch vụ</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li>Thiết kế Đồ họa</li>
              <li>Biên tập Video</li>
              <li>Danh mục Người mẫu</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
          <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            © {currentYear} Portfolio. Bảo lưu tất cả quyền.
          </p>
          <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
            <a href="#" className="hover:text-accent transition-colors">
              Chính sách Bảo mật
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              Điều khoản Dịch vụ
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
