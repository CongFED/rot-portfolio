'use client'

import { Star } from 'lucide-react'
import Image from 'next/image'

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Giám đốc Marketing',
    company: 'Creative Studios Inc',
    content:
      'Công việc tuyệt vời cho dự án branding của chúng tôi. Các thiết kế hiện đại, chuyên nghiệp và hoàn hảo thể hiện tầm nhìn của thương hiệu chúng tôi. Đặc biệt khuyến nghị!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Nhà sản xuất nội dung',
    company: 'Digital Media Co',
    content:
      'Công việc biên tập video thực sự nổi bật. Thời gian quay vòng nhanh chóng, chất lượng cao cấp và giao tiếp xuất sắc trong suốt dự án.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Quản lý Tài năng',
    company: 'Modeling Agency Pro',
    content:
      'Quản lý danh mục chuyên nghiệp dẫn đến nhiều lần đặt chỗ cho khách hàng của chúng tôi. Sự chú ý đến chi tiết của họ ấn tượng và kết quả nói lên điều đó.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
  },
  {
    id: '4',
    name: 'James Wilson',
    role: 'Chủ sở hữu thương hiệu',
    company: 'Fashion & Design',
    content:
      'Làm việc với anh/chị là game-changer cho thương hiệu chúng tôi. Họ mang đến những ý tưởng mới, thực hiện chuyên nghiệp và vượt quá kỳ vọng.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    role: 'Giám đốc Sáng tạo',
    company: 'Brand Strategy Group',
    content:
      'Chuyên gia tài năng đáng kinh ngạc. Các thiết kế sáng tạo, video được biên tập như điện ảnh và sự chuyên nghiệp tổng thể nổi bật.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
  },
  {
    id: '6',
    name: 'David Park',
    role: 'Điều phối viên sự kiện',
    company: 'Premier Events',
    content:
      'Cung cấp nội dung hình ảnh tuyệt đẹp cho các sự kiện của chúng tôi. Cách tiếp cận quản lý danh mục của họ là chiến lược và hướng đến kết quả. Thực sự chuyên nghiệp!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-12 sm:py-20 lg:py-32">
      <div className="mx-auto max-w-6xl px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">Khách hàng nói gì</h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Phản hồi từ các khách hàng hài lòng và đối tác đã làm việc với tôi trong các dự án của họ.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={testimonial.id}
              className="group p-5 sm:p-8 rounded-xl border border-border bg-card/40 backdrop-blur-sm hover:border-accent hover:bg-card/60 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in-up"
              style={{
                animationDelay: `${idx * 100}ms`,
              }}
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4 sm:mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-accent text-accent transition-colors duration-300 sm:w-[18px] sm:h-[18px]"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-xs sm:text-sm lg:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed min-h-16 sm:min-h-20 line-clamp-4">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-border">
                <div className="relative h-10 sm:h-12 w-10 sm:w-12 flex-shrink-0 rounded-full overflow-hidden border border-accent/30">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors duration-300 truncate text-sm sm:text-base">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 lg:gap-8 mt-12 sm:mt-20 pt-8 sm:pt-12 lg:pt-20 border-t border-border animate-fade-in-up delay-500">
          {[
            { label: 'Khách hàng hài lòng', value: '150+' },
            { label: 'Dự án hoàn thành', value: '300+' },
            { label: 'Đánh giá trung bình', value: '4.9/5' },
          ].map((stat, idx) => (
            <div
              key={stat.label}
              className="text-center p-4 sm:p-6 rounded-lg border border-border/50 bg-card/20 hover:border-accent hover:bg-card/40 transition-all duration-300"
              style={{
                animationDelay: `${(idx + 1) * 150}ms`,
              }}
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-accent mb-1 sm:mb-2">
                {stat.value}
              </div>
              <p className="text-xs sm:text-sm lg:text-base text-muted-foreground font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
