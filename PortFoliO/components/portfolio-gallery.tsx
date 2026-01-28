'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, Eye } from 'lucide-react'
import Image from 'next/image'
import { LightboxModal } from './lightbox-modal'

type Category = 'all' | 'design' | 'editing' | 'modeling'

interface Portfolio {
  id: string
  title: string
  category: Exclude<Category, 'all'>
  description: string
  image: string
  tags: string[]
}

const portfolioItems: Portfolio[] = [
  {
    id: '1',
    title: 'Thiết kế thương hiệu tối giản',
    category: 'design',
    description: 'Hệ thống nhận dạng thương hiệu hiện đại với kiểu chữ sạch sẽ và bảng màu',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
    tags: ['Branding', 'UI/UX', 'Design System'],
  },
  {
    id: '2',
    title: 'Trưng bày chụp ảnh sản phẩm',
    category: 'design',
    description: 'Bố cục nhiếp ảnh chuyên nghiệp và hướng dẫn hội họa',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
    tags: ['Photography', 'Layout', 'Direction'],
  },
  {
    id: '3',
    title: 'Biên tập video quảng cáo',
    category: 'editing',
    description: 'Quảng cáo 60 giây với các lần cắt năng động và điều chỉnh màu sắc',
    image: 'https://images.unsplash.com/photo-1533391473-a2014b0f4264?w=600&h=400&fit=crop',
    tags: ['Video Editing', 'Color Grading', 'Motion'],
  },
  {
    id: '4',
    title: 'Biên tập chiến dịch thời trang',
    category: 'editing',
    description: 'Biên tập video thời trang cao cấp với VFX và chuyển tiếp cao cấp',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
    tags: ['Fashion', 'Premium Edit', 'VFX'],
  },
  {
    id: '5',
    title: 'Danh mục người mẫu chuyên nghiệp',
    category: 'modeling',
    description: 'Danh mục đa dạng thể hiện các kiểu dáng và phong cách khác nhau',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=400&fit=crop',
    tags: ['Fashion', 'Portfolio', 'Professional'],
  },
  {
    id: '6',
    title: 'Công việc người mẫu thương mại',
    category: 'modeling',
    description: 'Các chiến dịch quảng cáo và quan hệ đối tác với thương hiệu',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
    tags: ['Commercial', 'Brand', 'Campaign'],
  },
  {
    id: '7',
    title: 'Hệ thống thiết kế web',
    category: 'design',
    description: 'Hệ thống thiết kế toàn diện cho nền tảng thương mại điện tử',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
    tags: ['Web Design', 'Components', 'System'],
  },
  {
    id: '8',
    title: 'Biên tập loạt phương tiện xã hội',
    category: 'editing',
    description: 'Loạt Instagram reels với hiệu ứng xu hướng và âm nhạc',
    image: 'https://images.unsplash.com/photo-1516035069371-29a08bab86d6?w=600&h=400&fit=crop',
    tags: ['Social Media', 'Trending', 'Reels'],
  },
  {
    id: '9',
    title: 'Biên tập thời trang cao cấp',
    category: 'modeling',
    description: 'Bố cục tạp chí biên tập và tạo kiểu',
    image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&h=400&fit=crop',
    tags: ['Editorial', 'Fashion', 'High-End'],
  },
]

const categories: { value: Category; label: string }[] = [
  { value: 'all', label: 'Tất cả' },
  { value: 'design', label: 'Thiết kế' },
  { value: 'editing', label: 'Biên tập' },
  { value: 'modeling', label: 'Người mẫu' },
]

export function PortfolioGallery() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const [displayCount, setDisplayCount] = useState(6)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredItems =
    activeCategory === 'all'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory)

  const displayedItems = filteredItems.slice(0, displayCount)

  const handleViewMore = () => {
    setDisplayCount(displayCount + 3)
  }

  const openModal = (index: number) => {
    setSelectedIndex(index)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedIndex(null), 300)
  }

  const goToPrevious = () => {
    if (selectedIndex === null) return
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1)
    }
  }

  const goToNext = () => {
    if (selectedIndex === null) return
    if (selectedIndex < displayedItems.length - 1) {
      setSelectedIndex(selectedIndex + 1)
    }
  }

  const selectedItem = selectedIndex !== null ? displayedItems[selectedIndex] : null

  return (
    <section id="work" className="py-12 sm:py-20 lg:py-32 bg-gradient-to-b from-transparent via-background to-background">
      <div className="mx-auto max-w-6xl px-3 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-10 sm:mb-16 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-balance">Tác Phẩm Nổi Bật</h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl">
            Lựa chọn các dự án tốt nhất của tôi về thiết kế, biên tập video và quản lý người mẫu. Mỗi tác phẩm đều thể hiện sự tập trung vào chất lượng và sáng tạo.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-10 sm:mb-16 animate-fade-in-up delay-100 overflow-x-auto pb-2">
          {categories.map((cat, idx) => (
            <button
              key={cat.value}
              onClick={() => {
                setActiveCategory(cat.value)
                setDisplayCount(6)
              }}
              className={`relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-medium transition-all duration-300 overflow-hidden group whitespace-nowrap text-xs sm:text-sm ${
                activeCategory === cat.value
                  ? 'bg-accent text-accent-foreground shadow-lg'
                  : 'border border-border text-foreground hover:border-accent hover:shadow-md'
              }`}
              style={{
                animationDelay: `${idx * 50}ms`,
              }}
            >
              <span className="relative z-10">{cat.label}</span>
              {activeCategory !== cat.value && (
                <div className="absolute inset-0 bg-accent/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              )}
            </button>
          ))}
        </div>

        {/* Portfolio grid - Masonry layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-16 auto-rows-max">
          {displayedItems.map((item, idx) => (
            <div
              key={item.id}
              className="group animate-fade-in-up"
              style={{
                animationDelay: `${idx * 80}ms`,
              }}
            >
              <div
                onClick={() => openModal(idx)}
                className="relative h-56 sm:h-72 lg:h-80 rounded-xl overflow-hidden bg-card border border-border hover:border-accent transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer active:scale-95 sm:active:scale-100"
              >
                {/* Image */}
                <div className="relative w-full h-full">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Content overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 translate-y-0 sm:translate-y-4 sm:group-hover:translate-y-0">
                    <div className="space-y-2 sm:space-y-3">
                      <div>
                        <h3 className="text-base sm:text-xl font-bold text-accent-foreground mb-1 sm:mb-2">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-accent-foreground/80 line-clamp-2">
                          {item.description}
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {item.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 bg-accent/20 text-accent-foreground rounded-full font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                        {item.tags.length > 2 && (
                          <span className="text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 bg-accent/20 text-accent-foreground rounded-full font-medium">
                            +{item.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* View icon */}
                    <div className="hidden sm:flex absolute top-4 right-4 p-3 rounded-lg bg-accent text-accent-foreground">
                      <Eye size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View more button */}
        {displayedItems.length < filteredItems.length && (
          <div className="flex justify-center animate-fade-in-up delay-400">
            <Button
              onClick={handleViewMore}
              size="lg"
              className="px-8 py-6 rounded-lg font-semibold hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              Xem thêm tác phẩm
              <ArrowUpRight size={20} className="ml-2" />
            </Button>
          </div>
        )}

        {/* Empty state */}
        {displayedItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">Không tìm thấy tác phẩm trong danh mục này.</p>
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedItem && (
          <LightboxModal
            isOpen={isModalOpen}
            image={selectedItem.image}
            title={selectedItem.title}
            description={selectedItem.description}
            tags={selectedItem.tags}
            onClose={closeModal}
            onNext={selectedIndex !== null && selectedIndex < displayedItems.length - 1 ? goToNext : undefined}
            onPrev={selectedIndex !== null && selectedIndex > 0 ? goToPrevious : undefined}
          />
        )}
      </div>
    </section>
  )
}
