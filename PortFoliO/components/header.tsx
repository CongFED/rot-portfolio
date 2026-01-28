"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl animate-fade-in"
          >
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-accent-foreground font-bold">
              R
            </div>
            <span className="hidden sm:inline">ROT</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#work"
              className="text-sm font-medium hover:text-accent transition-colors duration-200"
            >
              Tác phẩm
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium hover:text-accent transition-colors duration-200"
            >
              Đánh giá
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium hover:text-accent transition-colors duration-200"
            >
              Về tôi
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium hover:text-accent transition-colors duration-200"
            >
              Liên hệ
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-4 pb-4 border-t border-border pt-4">
            <Link
              href="#work"
              className="text-sm font-medium hover:text-accent transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Tác phẩm
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium hover:text-accent transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Đánh giá
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium hover:text-accent transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Về tôi
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium hover:text-accent transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Liên hệ
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
