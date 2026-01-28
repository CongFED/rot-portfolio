"use client";

import { ArrowDown, Code2, Edit3, Camera } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  const scrollToWork = () => {
    const element = document.getElementById("work");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const profile = {
    name: "ROT",
    title: "Chuyên Gia Sáng Tạo",
    tagline: "Thiết kế | Quay dựng | Người mẫu",
    bio: "Biến những tầm nhìn sáng tạo thành những hình ảnh tuyệt đẹp thông qua thiết kế chuyên nghiệp, biên tập video chuyên sâu và quản lý danh mục người mẫu ấn tượng.",
    avatar:
      "https://image.shotpik.com/1j6WbFc4GipGiK2yzCOUUW-FKLmLBKMNe?w=1600",
    stats: [
      { label: "Dự án", value: "50+" },
      { label: "Kinh nghiệm", value: "5+" },
      { label: "Khách hàng", value: "100+" },
    ],
  };

  const specialties = [
    {
      icon: Code2,
      label: "Thiết kế Sáng tạo",
      desc: "Hiện đại & Chuyên nghiệp",
    },
    { icon: Edit3, label: "Biên tập Video", desc: "Chất lượng Điện ảnh" },
    { icon: Camera, label: "Quản lý Người mẫu", desc: "Xây dựng Danh mục" },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Top left glow */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-accent/15 to-transparent rounded-full blur-3xl animate-float" />

        {/* Bottom right glow */}
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-tl from-accent/15 to-transparent rounded-full blur-3xl animate-float delay-500" />

        {/* Center accent */}
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-accent/5 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="mx-auto max-w-5xl px-3 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-20 w-full">
        {/* Top Badge */}
        <div className="flex justify-center mb-8 sm:mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm text-xs sm:text-sm">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent rounded-full animate-pulse" />
            <span className="font-medium">{profile.title}</span>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left side - Content */}
          <div className="text-center lg:text-left space-y-6">
            {/* Name and Title */}
            <div className="space-y-2 sm:space-y-3 animate-fade-in-up">
              <h1 className="text-3xl sm:text-5xl lg:text-4xl font-bold tracking-tight">
                {profile.name}
              </h1>
              <p className="text-lg sm:text-2xl lg:text-xl font-semibold bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
                {profile.tagline}
              </p>
            </div>

            {/* Bio */}
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed max-w-xl animate-fade-in-up delay-100">
              {profile.bio}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 my-6 sm:my-8 animate-fade-in-up delay-200">
              {profile.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-3 sm:p-4 rounded-lg border border-border bg-card/30 backdrop-blur-sm hover:border-accent transition-colors duration-300"
                >
                  <div className="text-xl sm:text-2xl font-bold text-accent">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center lg:items-start animate-fade-in-up delay-300 pt-2 sm:pt-4">
              <button
                onClick={scrollToWork}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base"
              >
                Xem Tác phẩm
              </button>
              <Link
                href="#contact"
                className="px-6 sm:px-8 py-3 sm:py-4 border border-accent text-accent font-semibold rounded-lg hover:bg-accent/10 transition-all duration-300 text-center text-sm sm:text-base"
              >
                Liên hệ với tôi
              </Link>
            </div>
          </div>

          {/* Right side - Avatar */}
          <div className="relative flex items-center justify-center animate-slide-in-right mt-8 lg:mt-0">
            {/* Decorative circles - hidden on mobile */}
            <div
              className="hidden sm:block absolute w-56 sm:w-80 h-56 sm:h-80 border border-accent/20 rounded-full animate-spin-slow"
              style={{ animationDuration: "20s" }}
            />
            <div
              className="hidden sm:block absolute w-64 sm:w-96 h-64 sm:h-96 border border-accent/10 rounded-full animate-spin-slow"
              style={{
                animationDuration: "30s",
                animationDirection: "reverse",
              }}
            />

            {/* Avatar image */}
            <div className="relative w-48 sm:w-64 lg:w-72 h-48 sm:h-64 lg:h-72 rounded-full overflow-hidden border-4 border-accent shadow-2xl animate-zoom-in">
              <Image
                src={profile.avatar || "/placeholder.svg"}
                alt={profile.name}
                fill
                className="object-cover"
                priority
              />
              {/* Overlay glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Floating accent dots - hidden on mobile */}
            <div className="hidden sm:block absolute top-20 right-10 w-4 h-4 bg-accent rounded-full animate-float" />
            <div className="hidden sm:block absolute bottom-32 left-0 w-3 h-3 bg-accent/50 rounded-full animate-float delay-300" />
            <div className="hidden sm:block absolute top-1/2 right-0 w-2 h-2 bg-accent/30 rounded-full animate-float delay-200" />
          </div>
        </div>

        {/* Specialties */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 mt-12 sm:mt-20 animate-fade-in-up delay-400">
          {specialties.map((spec, idx) => {
            const Icon = spec.icon;
            return (
              <div
                key={spec.label}
                className="group p-4 sm:p-6 rounded-lg border border-border bg-card/30 backdrop-blur-sm hover:border-accent hover:bg-card/50 transition-all duration-300 text-center hover:-translate-y-1"
                style={{
                  animationDelay: `${idx * 100 + 500}ms`,
                }}
              >
                <div className="flex justify-center mb-3 sm:mb-4">
                  <div className="p-2 sm:p-3 rounded-lg bg-accent/10 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                    <Icon size={24} className="sm:w-7 sm:h-7" />
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-1 sm:mb-2 text-sm sm:text-base">
                  {spec.label}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {spec.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-16 animate-bounce">
          <button
            onClick={scrollToWork}
            className="p-3 rounded-full border border-border hover:border-accent hover:bg-accent/5 transition-all duration-300"
            aria-label="Scroll to work"
          >
            <ArrowDown size={24} className="text-accent" />
          </button>
        </div>
      </div>
    </section>
  );
}
