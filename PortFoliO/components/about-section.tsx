'use client'

import { CheckCircle2 } from 'lucide-react'

export function AboutSection() {
  const skills = [
    { title: 'Thiết kế Đồ họa', description: 'UI/UX, Branding, Typography' },
    { title: 'Biên tập Video', description: 'Điều chỉnh màu, Chuyển động, VFX' },
    { title: 'Trưng bày Người mẫu', description: 'Danh mục, Thương mại, Biên tập' },
    { title: 'Hướng dẫn Sáng tạo', description: 'Hướng dẫn Nghệ thuật, Styling' },
  ]

  return (
    <section id="about" className="py-12 sm:py-20 lg:py-32 bg-card">
      <div className="mx-auto max-w-6xl px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left side */}
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Về tôi</h2>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
              Tôi là một chuyên gia sáng tạo linh hoạt với chuyên môn về thiết kế, biên tập video và người mẫu. Với nhiều năm kinh nghiệm trong lĩnh vực sáng tạo, tôi đã giúp các thương hiệu và nhà sáng tạo biến tầm nhìn của họ thành hiện thực.
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
              Niềm đam mê của tôi nằm ở việc tạo ra nội dung chuyên nghiệp, hình ảnh tuyệt đẹp được cảm nhận rõ rệt bởi khán giả. Dù là thiết kế nhận dạng thương hiệu hấp dẫn, biên tập video cuối cùng hoặc quản lý danh mục người mẫu, tôi cam kết cung cấp sự xuất sắc.
            </p>

            {/* CTA */}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all text-sm sm:text-base"
            >
              Hãy hợp tác cùng tôi →
            </a>
          </div>

          {/* Right side - Skills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
            {skills.map((skill) => (
              <div
                key={skill.title}
                className="p-4 sm:p-6 rounded-lg border border-border hover:border-accent hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-3 mb-2 sm:mb-3">
                  <CheckCircle2 size={20} className="text-accent flex-shrink-0 mt-0.5 sm:w-6 sm:h-6 sm:mt-1" />
                  <h3 className="text-base sm:text-lg font-bold">{skill.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
