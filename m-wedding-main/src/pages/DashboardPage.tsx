import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Settings,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Plus,
  Eye,
  Users,
  Heart,
  MessageSquare,
  TrendingUp,
  ExternalLink,
  MoreHorizontal,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import InvitationGuide from "@/components/dashboard/InvitationGuide";

const sidebarLinks = [
  { label: "Tổng quan", icon: LayoutDashboard, href: "/dashboard", active: true },
  { label: "Dự án", icon: FileText, href: "/dashboard" },
  { label: "Thanh toán", icon: CreditCard, href: "/dashboard" },
  { label: "Cài đặt", icon: Settings, href: "/dashboard" },
];

const DashboardPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const stats = [
    { label: "Lượt xem thiệp", value: "1,234", icon: Eye, change: "+12%", gradient: "linear-gradient(135deg, rgba(237,131,131,0.15), rgba(237,131,131,0.05))" },
    { label: "Xác nhận tham dự", value: "156", icon: Users, change: "+8", gradient: "linear-gradient(135deg, rgba(245,176,176,0.2), rgba(245,176,176,0.05))" },
    { label: "Từ chối", value: "23", icon: Heart, change: "+3", gradient: "linear-gradient(135deg, rgba(252,228,228,0.4), rgba(252,228,228,0.1))" },
    { label: "Lời chúc", value: "89", icon: MessageSquare, change: "+15", gradient: "linear-gradient(135deg, rgba(218,166,123,0.15), rgba(218,166,123,0.05))" },
  ];

  const projects = [
    { id: "1", name: "Thiệp cưới Minh Anh & Đức Huy", template: "Hoa Hồng Cổ Điển", views: 456, rsvp: 78, status: "Đã xuất bản" },
    { id: "2", name: "Thiệp cưới Thu Trang & Hoàng Long", template: "Tinh Giản Hiện Đại", views: 123, rsvp: 34, status: "Bản nháp" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full backdrop-blur-xl border-r transition-all duration-300 z-40 flex flex-col ${
          collapsed ? "w-[68px]" : "w-64"
        }`}
        style={{
          backgroundColor: 'rgba(255, 243, 243, 0.85)',
          borderColor: 'var(--color-border)',
        }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
          {!collapsed && (
            <Link to="/" className="font-display text-lg tracking-wide" style={{ color: 'var(--color-primary)' }}>
              DUCO
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg transition-colors"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm transition-all duration-200 group"
              style={{
                backgroundColor: link.active ? 'var(--color-accent-light)' : 'transparent',
                color: link.active ? 'var(--color-primary)' : 'var(--color-text-muted)',
              }}
            >
              <link.icon className="h-[18px] w-[18px] shrink-0" />
              {!collapsed && <span className="font-medium">{link.label}</span>}
            </Link>
          ))}
        </nav>

        {/* User section */}
        <div className="p-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
          {!collapsed && user && (
            <div className="flex items-center gap-3 px-3 py-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-display text-xs"
                style={{ backgroundColor: 'var(--color-accent-light)', color: 'var(--color-primary)' }}
              >
                {(user.user_metadata?.full_name || user.email || "U")[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm truncate" style={{ color: 'var(--color-text-heading)' }}>{user.user_metadata?.full_name || user.email?.split("@")[0]}</p>
                <p className="font-body text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>{user.email}</p>
              </div>
              <button onClick={signOut} className="p-1.5 rounded-lg transition-colors" style={{ color: 'var(--color-text-muted)' }}>
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
          {collapsed && (
            <button onClick={signOut} className="w-full flex justify-center p-2 rounded-lg transition-colors" style={{ color: 'var(--color-text-muted)' }}>
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </aside>

      {/* Main */}
      <main className={`flex-1 transition-all duration-300 ${collapsed ? "ml-[68px]" : "ml-64"}`}>
        {/* Header */}
        <header
          className="sticky top-0 z-30 h-16 backdrop-blur-xl border-b flex items-center justify-between px-6 lg:px-8"
          style={{
            backgroundColor: 'rgba(255, 243, 243, 0.85)',
            borderColor: 'var(--color-border)',
          }}
        >
          <div>
            <h1 className="font-display text-xl" style={{ color: 'var(--color-text-heading)' }}>Tổng quan</h1>
            <p className="font-body text-xs font-light" style={{ color: 'var(--color-text-muted)' }}>Chào mừng bạn trở lại</p>
          </div>
          <Button variant="cta" size="sm" className="rounded-xl" asChild>
            <Link to="/templates" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Tạo thiệp mới
            </Link>
          </Button>
        </header>

        <motion.div
          className="p-6 lg:p-8 space-y-8 max-w-7xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={itemVariants}>
                <div className="glass-card rounded-2xl p-5 hover-lift relative overflow-hidden">
                  <div className="absolute inset-0 opacity-50 pointer-events-none" style={{ background: stat.gradient }} />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: 'var(--color-accent-light)' }}
                      >
                        <stat.icon className="h-4 w-4" style={{ color: 'var(--color-primary)' }} />
                      </div>
                      <span
                        className="font-body text-xs font-light flex items-center gap-1 px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: 'var(--color-accent-light)', color: 'var(--color-primary)' }}
                      >
                        <TrendingUp className="h-3 w-3" />
                        {stat.change}
                      </span>
                    </div>
                    <p className="font-display text-3xl tracking-tight" style={{ color: 'var(--color-text-heading)' }}>{stat.value}</p>
                    <p className="font-body text-xs font-light mt-1.5" style={{ color: 'var(--color-text-muted)' }}>{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick actions */}
          <motion.div variants={itemVariants}>
            <h2 className="font-display text-lg mb-4" style={{ color: 'var(--color-text-heading)' }}>Hành động nhanh</h2>
            <div className="flex flex-wrap gap-3">
              <Button variant="cta" size="sm" className="rounded-xl" asChild>
                <Link to="/templates">
                  <Plus className="h-4 w-4 mr-1.5" />
                  Tạo thiệp mới
                </Link>
              </Button>
              <Button variant="cta-outline" size="sm" className="rounded-xl" asChild>
                <Link to="/templates">Duyệt mẫu thiệp</Link>
              </Button>
              <Button variant="cta-outline" size="sm" className="rounded-xl">Xuất danh sách khách</Button>
            </div>
          </motion.div>

          {/* Invitation Guide */}
          <motion.div variants={itemVariants}>
            <InvitationGuide />
          </motion.div>

          {/* Recent projects */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-lg" style={{ color: 'var(--color-text-heading)' }}>Dự án gần đây</h2>
              <Button variant="ghost" size="sm" className="text-xs font-body font-light">
                Xem tất cả
              </Button>
            </div>
            <div className="space-y-3">
              {projects.map((p) => (
                <Link to={`/dashboard/project/${p.id}`} key={p.id}>
                <motion.div
                  variants={itemVariants}
                  className="glass-card rounded-2xl p-5 hover-lift cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-body text-sm font-semibold truncate" style={{ color: 'var(--color-text-heading)' }}>{p.name}</h3>
                      <p className="font-body text-xs font-light mt-0.5" style={{ color: 'var(--color-text-muted)' }}>Mẫu: {p.template}</p>
                    </div>
                    <div className="flex items-center gap-5">
                      <div className="text-center min-w-[50px]">
                        <p className="font-display text-sm" style={{ color: 'var(--color-text-heading)' }}>{p.views}</p>
                        <p className="font-body text-[10px] font-light" style={{ color: 'var(--color-text-muted)' }}>Lượt xem</p>
                      </div>
                      <div className="text-center min-w-[50px]">
                        <p className="font-display text-sm" style={{ color: 'var(--color-text-heading)' }}>{p.rsvp}</p>
                        <p className="font-body text-[10px] font-light" style={{ color: 'var(--color-text-muted)' }}>RSVP</p>
                      </div>
                      <span
                        className="font-body text-xs px-3 py-1 rounded-full whitespace-nowrap border"
                        style={{
                          backgroundColor: p.status === "Đã xuất bản" ? 'var(--color-accent-light)' : 'var(--color-bg-soft)',
                          color: p.status === "Đã xuất bản" ? 'var(--color-primary)' : 'var(--color-text-muted)',
                          borderColor: p.status === "Đã xuất bản" ? 'rgba(237,131,131,0.2)' : 'var(--color-border)',
                        }}
                      >
                        {p.status}
                      </span>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" asChild>
                          <Link to="/builder"><ExternalLink className="h-3.5 w-3.5" /></Link>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                          <MoreHorizontal className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default DashboardPage;
