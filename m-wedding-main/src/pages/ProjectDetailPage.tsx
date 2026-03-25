import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Eye,
  Users,
  Heart,
  MessageSquare,
  TrendingUp,
  Check,
  X,
  Clock,
  ExternalLink,
  Copy,
  Share2,
  Calendar,
  MapPin,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// Mock data
const projectData = {
  "1": {
    name: "Thiệp cưới Minh Anh & Đức Huy",
    template: "Hoa Hồng Cổ Điển",
    status: "Đã xuất bản",
    createdAt: "15/01/2026",
    eventDate: "14/02/2026",
    venue: "Trung tâm tiệc cưới White Palace, TP.HCM",
    url: "giayvagio.vn/minhanh-duchuy",
    stats: {
      views: 456,
      confirmed: 78,
      declined: 12,
      pending: 34,
      wishes: 45,
    },
    guests: [
      { name: "Nguyễn Văn An", status: "confirmed", guests: 2, note: "Sẽ đến sớm 30 phút", time: "2 giờ trước" },
      { name: "Trần Thị Bình", status: "confirmed", guests: 3, note: "", time: "5 giờ trước" },
      { name: "Lê Hoàng Cường", status: "declined", guests: 0, note: "Xin lỗi, bận công tác", time: "1 ngày trước" },
      { name: "Phạm Minh Đức", status: "pending", guests: 0, note: "", time: "1 ngày trước" },
      { name: "Hoàng Thị Em", status: "confirmed", guests: 1, note: "Rất mong chờ!", time: "2 ngày trước" },
      { name: "Vũ Quang Phúc", status: "confirmed", guests: 2, note: "", time: "3 ngày trước" },
      { name: "Đặng Ngọc Giang", status: "declined", guests: 0, note: "Đang ở nước ngoài", time: "3 ngày trước" },
      { name: "Bùi Thanh Hà", status: "confirmed", guests: 4, note: "Cả gia đình sẽ đến", time: "4 ngày trước" },
    ],
    wishes: [
      { name: "Nguyễn Văn An", message: "Chúc hai bạn trăm năm hạnh phúc, sớm có em bé nhé! 🎉", time: "2 giờ trước" },
      { name: "Trần Thị Bình", message: "Hạnh phúc mãi mãi nha hai đứa! Yêu thương nhiều ❤️", time: "5 giờ trước" },
      { name: "Hoàng Thị Em", message: "Chúc mừng hạnh phúc! Đám cưới đẹp quá 💐", time: "2 ngày trước" },
      { name: "Bùi Thanh Hà", message: "Trăm năm hạnh phúc, vạn sự như ý! Chúc mừng anh chị 🥂", time: "4 ngày trước" },
      { name: "Vũ Quang Phúc", message: "Happy wedding! Chúc hai bạn luôn hạnh phúc bên nhau 🌸", time: "3 ngày trước" },
    ],
  },
};

const statusConfig = {
  confirmed: { label: "Xác nhận", icon: Check, className: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  declined: { label: "Từ chối", icon: X, className: "text-red-500 bg-red-50 border-red-200" },
  pending: { label: "Chờ phản hồi", icon: Clock, className: "text-amber-600 bg-amber-50 border-amber-200" },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [guestFilter, setGuestFilter] = useState<"all" | "confirmed" | "declined" | "pending">("all");

  const project = projectData["1"]; // use mock data regardless of id

  const filteredGuests = guestFilter === "all"
    ? project.guests
    : project.guests.filter((g) => g.status === guestFilter);

  const totalGuests = project.guests
    .filter((g) => g.status === "confirmed")
    .reduce((sum, g) => sum + g.guests, 0);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://${project.url}`);
    toast.success("Đã sao chép liên kết!");
  };

  const handleExportCSV = () => {
    const statusMap: Record<string, string> = { confirmed: "Xác nhận", declined: "Từ chối", pending: "Chờ phản hồi" };
    const headers = ["Tên khách", "Trạng thái", "Số khách đi cùng", "Ghi chú", "Thời gian"];
    const rows = project.guests.map((g) => [
      g.name,
      statusMap[g.status] || g.status,
      g.guests.toString(),
      g.note,
      g.time,
    ]);
    const csvContent = [headers, ...rows].map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\n");
    const BOM = "\uFEFF";
    const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `danh-sach-khach-${project.name.replace(/\s+/g, "-")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Đã tải xuống danh sách khách mời!");
  };

  const stats = [
    { label: "Lượt xem", value: project.stats.views, icon: Eye, color: "from-champagne/40 to-champagne/10" },
    { label: "Xác nhận", value: project.stats.confirmed, icon: Users, color: "from-emerald-100/60 to-emerald-50/20" },
    { label: "Từ chối", value: project.stats.declined, icon: Heart, color: "from-rose/30 to-rose/10" },
    { label: "Lời chúc", value: project.stats.wishes, icon: MessageSquare, color: "from-blush/40 to-blush/10" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border/30">
        <div className="container-wide flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-xl" asChild>
              <Link to="/dashboard"><ArrowLeft className="h-4 w-4" /></Link>
            </Button>
            <div>
              <h1 className="font-display text-lg">{project.name}</h1>
              <div className="flex items-center gap-3 mt-0.5">
                <span className="font-body text-xs text-muted-foreground font-light">Mẫu: {project.template}</span>
                <span className="font-body text-xs px-2.5 py-0.5 rounded-full bg-champagne/25 text-foreground border border-champagne/30">
                  {project.status}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="cta-outline" size="sm" className="rounded-xl gap-1.5" onClick={handleCopyLink}>
              <Copy className="h-3.5 w-3.5" />
              Sao chép link
            </Button>
            <Button variant="cta" size="sm" className="rounded-xl gap-1.5" asChild>
              <Link to="/builder">
                <ExternalLink className="h-3.5 w-3.5" />
                Chỉnh sửa
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <motion.div
        className="container-wide py-8 space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Event info bar */}
        <motion.div variants={itemVariants} className="glass-card rounded-2xl p-5 flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span className="font-body text-sm font-light">{project.eventDate}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="font-body text-sm font-light">{project.venue}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground ml-auto">
            <Share2 className="h-4 w-4" />
            <span className="font-body text-sm font-light">{project.url}</span>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={itemVariants}>
              <div className="glass-card rounded-2xl p-5 hover-lift relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-50 pointer-events-none`} />
                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-background/60 flex items-center justify-center">
                      <stat.icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <p className="font-display text-3xl tracking-tight">{stat.value}</p>
                  <p className="font-body text-xs font-light text-muted-foreground mt-1.5">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary bar */}
        <motion.div variants={itemVariants} className="glass-card rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display text-sm">Tổng quan phản hồi</h3>
            <span className="font-body text-xs text-muted-foreground font-light">
              Tổng khách xác nhận: <span className="font-display text-foreground">{totalGuests}</span> người
            </span>
          </div>
          <div className="w-full h-3 rounded-full bg-secondary/50 overflow-hidden flex">
            <div
              className="h-full bg-emerald-400/70 transition-all"
              style={{ width: `${(project.stats.confirmed / (project.stats.confirmed + project.stats.declined + project.stats.pending)) * 100}%` }}
            />
            <div
              className="h-full bg-red-400/60 transition-all"
              style={{ width: `${(project.stats.declined / (project.stats.confirmed + project.stats.declined + project.stats.pending)) * 100}%` }}
            />
            <div
              className="h-full bg-amber-300/60 transition-all"
              style={{ width: `${(project.stats.pending / (project.stats.confirmed + project.stats.declined + project.stats.pending)) * 100}%` }}
            />
          </div>
          <div className="flex items-center gap-5 mt-3">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
              <span className="font-body text-xs text-muted-foreground font-light">Xác nhận ({project.stats.confirmed})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
              <span className="font-body text-xs text-muted-foreground font-light">Từ chối ({project.stats.declined})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-300/60" />
              <span className="font-body text-xs text-muted-foreground font-light">Chờ ({project.stats.pending})</span>
            </div>
          </div>
        </motion.div>

        {/* Tabs: Guests & Wishes */}
        <motion.div variants={itemVariants}>
          <Tabs defaultValue="guests" className="w-full">
            <TabsList className="bg-secondary/40 border border-border/30 rounded-xl p-1 h-auto">
              <TabsTrigger value="guests" className="rounded-lg font-body text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm px-5 py-2">
                <Users className="h-4 w-4 mr-2" />
                Danh sách khách ({project.guests.length})
              </TabsTrigger>
              <TabsTrigger value="wishes" className="rounded-lg font-body text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm px-5 py-2">
                <MessageSquare className="h-4 w-4 mr-2" />
                Lời chúc ({project.wishes.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="guests" className="mt-5 space-y-4">
              {/* Filter buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="cta-outline" size="sm" className="rounded-xl gap-1.5 mr-2" onClick={handleExportCSV}>
                  <Download className="h-3.5 w-3.5" />
                  Xuất CSV
                </Button>
                {([
                  { key: "all", label: "Tất cả" },
                  { key: "confirmed", label: "Xác nhận" },
                  { key: "declined", label: "Từ chối" },
                  { key: "pending", label: "Chờ phản hồi" },
                ] as const).map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setGuestFilter(f.key)}
                    className={`font-body text-xs px-4 py-2 rounded-xl border transition-all ${
                      guestFilter === f.key
                        ? "bg-champagne/25 border-champagne/40 text-foreground"
                        : "bg-transparent border-border/30 text-muted-foreground hover:bg-secondary/40"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Guest list */}
              <div className="space-y-2">
                {filteredGuests.map((guest, i) => {
                  const sc = statusConfig[guest.status as keyof typeof statusConfig];
                  const StatusIcon = sc.icon;
                  return (
                    <motion.div
                      key={guest.name}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="glass-card rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-champagne/20 flex items-center justify-center font-display text-xs text-foreground shrink-0">
                          {guest.name[0]}
                        </div>
                        <div>
                          <p className="font-body text-sm text-foreground">{guest.name}</p>
                          {guest.note && (
                            <p className="font-body text-xs text-muted-foreground font-light mt-0.5">"{guest.note}"</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {guest.status === "confirmed" && (
                          <span className="font-body text-xs text-muted-foreground font-light">
                            {guest.guests} khách
                          </span>
                        )}
                        <span className="font-body text-xs text-muted-foreground font-light">{guest.time}</span>
                        <span className={`inline-flex items-center gap-1 font-body text-xs px-2.5 py-1 rounded-full border ${sc.className}`}>
                          <StatusIcon className="h-3 w-3" />
                          {sc.label}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="wishes" className="mt-5 space-y-3">
              {project.wishes.map((wish, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="glass-card rounded-xl p-5"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-blush/40 flex items-center justify-center font-display text-xs text-foreground shrink-0">
                      {wish.name[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-body text-sm font-medium text-foreground">{wish.name}</p>
                        <span className="font-body text-xs text-muted-foreground font-light">{wish.time}</span>
                      </div>
                      <p className="font-body text-sm font-light text-muted-foreground mt-1.5 leading-relaxed">
                        {wish.message}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProjectDetailPage;
