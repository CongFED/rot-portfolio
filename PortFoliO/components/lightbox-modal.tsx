'use client'

import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useEffect } from 'react'

interface LightboxModalProps {
  isOpen: boolean
  image: string
  title: string
  description: string
  tags: string[]
  onClose: () => void
  onNext?: () => void
  onPrev?: () => void
}

export function LightboxModal({
  isOpen,
  image,
  title,
  description,
  tags,
  onClose,
  onNext,
  onPrev,
}: LightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' && onNext) onNext()
      if (e.key === 'ArrowLeft' && onPrev) onPrev()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, onNext, onPrev])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-3 sm:px-4 py-4 sm:py-8 animate-zoom-in max-h-[90vh] overflow-y-auto">
        <div className="relative rounded-2xl overflow-hidden bg-card border border-border shadow-2xl">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 p-1.5 sm:p-2 rounded-lg bg-background/80 hover:bg-accent hover:text-accent-foreground transition-all duration-300 backdrop-blur-sm"
            aria-label="Close modal"
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>

          {/* Image Container */}
          <div className="relative w-full h-56 sm:h-96 sm:h-[500px] lg:h-[600px] bg-muted overflow-hidden">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Content */}
          <div className="p-4 sm:p-8 lg:p-12 space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3">{title}</h2>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">{description}</p>
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-accent/10 text-accent rounded-full font-medium text-xs sm:text-sm hover:bg-accent hover:text-accent-foreground transition-colors duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          {(onPrev || onNext) && (
            <div className="flex justify-between items-center px-4 sm:px-8 lg:px-12 py-4 sm:py-6 border-t border-border gap-3 sm:gap-4">
              <button
                onClick={onPrev}
                disabled={!onPrev}
                className="p-2 sm:p-3 rounded-lg bg-accent/10 hover:bg-accent text-accent hover:text-accent-foreground transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                aria-label="Previous project"
              >
                <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
              </button>

              <p className="text-xs sm:text-sm text-muted-foreground text-center hidden sm:block">Use arrow keys to navigate</p>

              <button
                onClick={onNext}
                disabled={!onNext}
                className="p-2 sm:p-3 rounded-lg bg-accent/10 hover:bg-accent text-accent hover:text-accent-foreground transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                aria-label="Next project"
              >
                <ChevronRight size={20} className="sm:w-6 sm:h-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
