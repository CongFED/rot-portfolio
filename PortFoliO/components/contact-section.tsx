'use client'

import { Mail, Instagram, Linkedin, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ContactSection() {
  return (
    <section id="contact" className="py-12 sm:py-20 lg:py-32">
      <div className="mx-auto max-w-4xl px-3 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">Hãy cùng nhau làm việc</h2>
          <p className="text-sm sm:text-base lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            Có dự án nào trong đầu không? Tôi rất muốn nghe về nó. Hãy cùng tạo ra điều gì đó tuyệt vời.
          </p>
        </div>

        {/* Contact methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-12">
          {/* Email */}
          <a
            href="mailto:hello@example.com"
            className="group p-4 sm:p-6 rounded-lg border border-border hover:border-accent hover:bg-accent/5 transition-all duration-300"
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 rounded-lg bg-accent/10 group-hover:bg-accent group-hover:text-accent-foreground transition-colors flex-shrink-0">
                <Mail size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg mb-1">Email</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">hello@example.com</p>
                <p className="text-xs sm:text-sm text-accent mt-2 group-hover:underline">Gửi email cho tôi →</p>
              </div>
            </div>
          </a>

          {/* Message */}
          <a
            href="#"
            className="group p-4 sm:p-6 rounded-lg border border-border hover:border-accent hover:bg-accent/5 transition-all duration-300"
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 rounded-lg bg-accent/10 group-hover:bg-accent group-hover:text-accent-foreground transition-colors flex-shrink-0">
                <MessageSquare size={20} className="sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg mb-1">Tin nhắn</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">Biểu mẫu liên hệ bên dưới</p>
                <p className="text-xs sm:text-sm text-accent mt-2 group-hover:underline">Gửi tin nhắn →</p>
              </div>
            </div>
          </a>
        </div>

        {/* Contact form */}
        <div className="bg-card border border-border rounded-lg p-5 sm:p-8 mb-10 sm:mb-12">
          <form className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
              <input
                type="text"
                placeholder="Tên của bạn"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-border bg-background focus:outline-none focus:border-accent transition-colors text-sm sm:text-base"
              />
              <input
                type="email"
                placeholder="Email của bạn"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-border bg-background focus:outline-none focus:border-accent transition-colors text-sm sm:text-base"
              />
            </div>
            <input
              type="text"
              placeholder="Tiêu đề"
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-border bg-background focus:outline-none focus:border-accent transition-colors text-sm sm:text-base"
            />
            <textarea
              placeholder="Kể cho tôi về dự án của bạn..."
              rows={4}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-border bg-background focus:outline-none focus:border-accent transition-colors resize-none text-sm sm:text-base"
            />
            <Button type="submit" size="lg" className="w-full">
              Gửi tin nhắn
            </Button>
          </form>
        </div>

        {/* Social links */}
        <div className="text-center">
          <p className="text-muted-foreground mb-6">Kết nối với tôi trên mạng xã hội</p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="#"
              className="p-3 rounded-lg border border-border hover:border-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300"
            >
              <Instagram size={24} />
            </a>
            <a
              href="#"
              className="p-3 rounded-lg border border-border hover:border-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="#"
              className="p-3 rounded-lg border border-border hover:border-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300"
            >
              <MessageSquare size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
