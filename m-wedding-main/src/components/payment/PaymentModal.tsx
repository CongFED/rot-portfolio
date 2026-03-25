// ─── Payment Modal Component ──────────────────────────────────
// Premium payment modal for the wedding invitation builder
// Supports Bank QR and MoMo payment methods

import { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard, QrCode, Smartphone, ArrowLeft, Check, Copy,
  Clock, Loader2, AlertCircle, ExternalLink, Sparkles, Shield,
  ChevronRight, Heart, X,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { UsePaymentReturn } from '@/hooks/usePayment';
import {
  PACKAGES,
  formatCurrency,
  PAYMENT_EXPIRY_MINUTES,
  type PackageCode,
  type PaymentProvider,
} from '@/types/payment';

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  paymentHook: UsePaymentReturn;
  invitationId: string;
  builderData: Record<string, unknown>;
}

// ─── Sub-components ──────────────────────────────────────────

function PackageCard({
  pkg,
  selected,
  onSelect,
}: {
  pkg: (typeof PACKAGES)[0];
  selected: boolean;
  onSelect: () => void;
}) {
  const isPopular = pkg.code === 'premium';

  return (
    <button
      onClick={onSelect}
      className={`relative w-full text-left rounded-2xl p-5 border-2 transition-all duration-300 group ${
        selected
          ? 'border-champagne bg-champagne/10 shadow-[0_0_24px_hsl(24_38%_76%/0.15)]'
          : 'border-border/30 bg-secondary/10 hover:border-champagne/40 hover:bg-secondary/20'
      }`}
    >
      {isPopular && (
        <span className="absolute -top-2.5 right-4 bg-champagne text-white text-[10px] font-medium px-3 py-0.5 rounded-full uppercase tracking-wider">
          Phổ biến
        </span>
      )}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-display text-base">{pkg.name}</h3>
          <p className="font-display text-2xl mt-1">{formatCurrency(pkg.price)}</p>
        </div>
        <div
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
            selected ? 'border-champagne bg-champagne' : 'border-border/50'
          }`}
        >
          {selected && <Check className="h-3.5 w-3.5 text-white" />}
        </div>
      </div>
      <ul className="space-y-1.5">
        {pkg.features.map((f) => (
          <li key={f} className="font-body text-xs font-light text-muted-foreground flex items-center gap-2">
            <Check className="h-3 w-3 text-champagne shrink-0" />
            {f}
          </li>
        ))}
      </ul>
    </button>
  );
}

function MethodCard({
  provider,
  selected,
  onSelect,
  icon: Icon,
  title,
  desc,
}: {
  provider: PaymentProvider;
  selected: boolean;
  onSelect: () => void;
  icon: React.ElementType;
  title: string;
  desc: string;
}) {
  return (
    <button
      onClick={onSelect}
      className={`w-full flex items-center gap-4 rounded-2xl p-5 border-2 transition-all duration-300 ${
        selected
          ? 'border-champagne bg-champagne/10 shadow-[0_0_24px_hsl(24_38%_76%/0.15)]'
          : 'border-border/30 bg-secondary/10 hover:border-champagne/40'
      }`}
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
          selected ? 'bg-champagne/20' : 'bg-secondary/40'
        }`}
      >
        <Icon className={`h-5 w-5 ${selected ? 'text-champagne' : 'text-muted-foreground'}`} />
      </div>
      <div className="flex-1 text-left">
        <p className="font-body text-sm font-medium">{title}</p>
        <p className="font-body text-xs font-light text-muted-foreground">{desc}</p>
      </div>
      <div
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
          selected ? 'border-champagne bg-champagne' : 'border-border/50'
        }`}
      >
        {selected && <Check className="h-3 w-3 text-white" />}
      </div>
    </button>
  );
}

function CountdownTimer({ expiredAt }: { expiredAt: string }) {
  const [timeLeft, setTimeLeft] = useState('');

  // Update every second
  useState(() => {
    const update = () => {
      const diff = Math.max(0, Math.floor((new Date(expiredAt).getTime() - Date.now()) / 1000));
      const mins = Math.floor(diff / 60);
      const secs = diff % 60;
      setTimeLeft(`${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div className="flex items-center gap-1.5 text-muted-foreground">
      <Clock className="h-3.5 w-3.5" />
      <span className="font-body text-xs font-light">Hết hạn sau: <span className="font-medium text-foreground">{timeLeft}</span></span>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────

export default function PaymentModal({
  open,
  onClose,
  paymentHook,
  invitationId,
  builderData,
}: PaymentModalProps) {
  const {
    step,
    loading,
    error,
    order,
    payment,
    selectedPackage,
    selectedProvider,
    setSelectedPackage,
    setSelectedProvider,
    proceedToMethod,
    submitPayment,
    confirmPayment,
    goBack,
    resetPayment,
  } = paymentHook;

  const [copied, setCopied] = useState(false);

  const handleClose = useCallback(() => {
    if (step === 'success') {
      resetPayment();
    }
    onClose();
  }, [step, resetPayment, onClose]);

  const handleCopy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('Đã sao chép!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Không thể sao chép');
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    await submitPayment(invitationId, builderData as Record<string, unknown>);
  }, [submitPayment, invitationId, builderData]);

  const slideVariants = {
    enter: { opacity: 0, x: 24 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -24 },
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent className="sm:max-w-[520px] p-0 overflow-hidden border-border/30 rounded-2xl bg-background/95 backdrop-blur-xl">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-border/20">
          <DialogHeader>
            <div className="flex items-center gap-3">
              {step !== 'select_package' && step !== 'idle' && step !== 'success' && (
                <button
                  onClick={goBack}
                  className="p-1.5 rounded-lg hover:bg-secondary/60 transition-colors text-muted-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
              )}
              <div className="flex-1">
                <DialogTitle className="font-display text-lg flex items-center gap-2">
                  {step === 'success' ? (
                    <>
                      <Sparkles className="h-4 w-4 text-champagne" />
                      Thanh toán thành công!
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4 text-champagne" />
                      Xuất bản thiệp cưới
                    </>
                  )}
                </DialogTitle>
                <DialogDescription className="font-body text-xs font-light mt-1">
                  {step === 'select_package' && 'Chọn gói dịch vụ phù hợp'}
                  {step === 'select_method' && 'Chọn phương thức thanh toán'}
                  {step === 'processing' && 'Đang xử lý...'}
                  {step === 'awaiting' && 'Hoàn tất thanh toán để xuất bản'}
                  {step === 'verifying' && 'Đang xác nhận thanh toán...'}
                  {step === 'success' && 'Thiệp cưới đã sẵn sàng chia sẻ!'}
                  {step === 'failed' && 'Đã xảy ra lỗi'}
                  {step === 'expired' && 'Phiên thanh toán đã hết hạn'}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* Content */}
        <div className="px-6 py-5 max-h-[70vh] overflow-y-auto">
          <AnimatePresence mode="wait">
            {/* ─── Step: Select Package ─── */}
            {step === 'select_package' && (
              <motion.div
                key="select_package"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {PACKAGES.map((pkg) => (
                  <PackageCard
                    key={pkg.code}
                    pkg={pkg}
                    selected={selectedPackage === pkg.code}
                    onSelect={() => setSelectedPackage(pkg.code)}
                  />
                ))}

                <div className="flex items-center gap-2 pt-2">
                  <Shield className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="font-body text-[11px] font-light text-muted-foreground">
                    Thanh toán an toàn & bảo mật
                  </span>
                </div>
              </motion.div>
            )}

            {/* ─── Step: Select Method ─── */}
            {step === 'select_method' && (
              <motion.div
                key="select_method"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {/* Package summary */}
                <div className="bg-champagne/10 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="font-body text-xs text-muted-foreground">Gói đã chọn</p>
                    <p className="font-display text-sm">{PACKAGES.find(p => p.code === selectedPackage)?.name}</p>
                  </div>
                  <p className="font-display text-xl">{formatCurrency(PACKAGES.find(p => p.code === selectedPackage)?.price || 0)}</p>
                </div>

                <MethodCard
                  provider="bank_qr"
                  selected={selectedProvider === 'bank_qr'}
                  onSelect={() => setSelectedProvider('bank_qr')}
                  icon={QrCode}
                  title="Chuyển khoản ngân hàng"
                  desc="Quét mã QR để chuyển khoản nhanh"
                />
                <MethodCard
                  provider="momo"
                  selected={selectedProvider === 'momo'}
                  onSelect={() => setSelectedProvider('momo')}
                  icon={Smartphone}
                  title="Ví MoMo"
                  desc="Thanh toán qua ứng dụng MoMo"
                />
              </motion.div>
            )}

            {/* ─── Step: Processing ─── */}
            {step === 'processing' && (
              <motion.div
                key="processing"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2 }}
                className="py-12 text-center"
              >
                <Loader2 className="h-10 w-10 text-champagne mx-auto animate-spin" />
                <p className="font-body text-sm text-muted-foreground mt-4">Đang tạo đơn thanh toán...</p>
              </motion.div>
            )}

            {/* ─── Step: Awaiting Payment ─── */}
            {step === 'awaiting' && payment && (
              <motion.div
                key="awaiting"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                {/* Amount & Timer */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-body text-xs text-muted-foreground">Số tiền thanh toán</p>
                    <p className="font-display text-2xl">{formatCurrency(payment.amount)}</p>
                  </div>
                  {payment.expired_at && <CountdownTimer expiredAt={payment.expired_at} />}
                </div>

                {/* Bank QR */}
                {payment.provider === 'bank_qr' && (
                  <div className="space-y-4">
                    {/* QR Code */}
                    {payment.qr_code_url && (
                      <div className="bg-white rounded-xl p-6 flex items-center justify-center border border-border/20">
                        <img
                          src={payment.qr_code_url}
                          alt="QR Code chuyển khoản"
                          className="w-56 h-56 object-contain"
                        />
                      </div>
                    )}

                    {/* Bank Info */}
                    {payment.bank_info && (
                      <div className="space-y-2">
                        <InfoRow label="Ngân hàng" value={(payment.bank_info as { bank_name: string }).bank_name} />
                        <InfoRow
                          label="Số tài khoản"
                          value={(payment.bank_info as { account_number: string }).account_number}
                          copyable
                          onCopy={() => handleCopy((payment.bank_info as { account_number: string }).account_number)}
                        />
                        <InfoRow label="Chủ tài khoản" value={(payment.bank_info as { account_name: string }).account_name} />
                        <InfoRow
                          label="Số tiền"
                          value={formatCurrency(payment.amount)}
                          copyable
                          onCopy={() => handleCopy(String(payment.amount))}
                        />
                        {payment.transfer_content && (
                          <InfoRow
                            label="Nội dung CK"
                            value={payment.transfer_content}
                            copyable
                            onCopy={() => handleCopy(payment.transfer_content!)}
                            highlight
                          />
                        )}
                      </div>
                    )}

                    <div className="bg-champagne/10 rounded-xl p-3 flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-champagne shrink-0 mt-0.5" />
                      <p className="font-body text-xs font-light text-muted-foreground leading-relaxed">
                        Vui lòng nhập <strong>chính xác nội dung chuyển khoản</strong> để hệ thống tự động xác nhận.
                        Thanh toán sẽ được xác nhận trong vòng 1-5 phút.
                      </p>
                    </div>
                  </div>
                )}

                {/* MoMo */}
                {payment.provider === 'momo' && payment.payment_url && (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-xl p-6 text-center border border-pink-200/30">
                      <Smartphone className="h-12 w-12 text-pink-500 mx-auto mb-3" />
                      <p className="font-body text-sm font-medium mb-1">Thanh toán qua MoMo</p>
                      <p className="font-body text-xs text-muted-foreground mb-4">
                        Bấm nút bên dưới để chuyển đến trang thanh toán MoMo
                      </p>
                      <Button
                        variant="cta"
                        className="w-full rounded-xl gap-2 bg-pink-500 hover:bg-pink-600 shadow-lg"
                        onClick={() => window.open(payment.payment_url!, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                        Thanh toán với MoMo
                      </Button>
                    </div>

                    <div className="bg-champagne/10 rounded-xl p-3 flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-champagne shrink-0 mt-0.5" />
                      <p className="font-body text-xs font-light text-muted-foreground leading-relaxed">
                        Sau khi thanh toán trên MoMo, hệ thống sẽ tự động xác nhận. Vui lòng không đóng trang này.
                      </p>
                    </div>
                  </div>
                )}

                {/* Polling indicator */}
                <div className="flex items-center justify-center gap-2 pt-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-champagne opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-champagne" />
                  </span>
                  <span className="font-body text-xs text-muted-foreground">
                    Đang chờ thanh toán...
                  </span>
                </div>

                {/* Dev: Simulate button */}
                {import.meta.env.DEV && (
                  <div className="border-t border-dashed border-border/30 pt-4">
                    <Button
                      variant="cta-outline"
                      size="sm"
                      className="w-full rounded-xl gap-2 text-xs"
                      onClick={confirmPayment}
                      disabled={loading}
                    >
                      {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
                      [DEV] Giả lập thanh toán thành công
                    </Button>
                  </div>
                )}
              </motion.div>
            )}

            {/* ─── Step: Verifying ─── */}
            {step === 'verifying' && (
              <motion.div
                key="verifying"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2 }}
                className="py-12 text-center"
              >
                <Loader2 className="h-10 w-10 text-champagne mx-auto animate-spin" />
                <p className="font-body text-sm text-muted-foreground mt-4">Đang xác nhận thanh toán...</p>
              </motion.div>
            )}

            {/* ─── Step: Success ─── */}
            {step === 'success' && (
              <motion.div
                key="success"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="py-8 text-center space-y-5"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.1 }}
                  className="w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500/30 flex items-center justify-center mx-auto"
                >
                  <Check className="h-10 w-10 text-green-500" />
                </motion.div>
                <div>
                  <h3 className="font-display text-xl">Thanh toán thành công! 🎉</h3>
                  <p className="font-body text-sm text-muted-foreground mt-2">
                    Thiệp cưới của bạn đã được xuất bản và sẵn sàng chia sẻ với mọi người.
                  </p>
                </div>
                {order && (
                  <div className="bg-secondary/30 rounded-xl p-4 space-y-2 text-left">
                    <InfoRow label="Mã đơn hàng" value={order.order_code} />
                    <InfoRow label="Số tiền" value={formatCurrency(order.amount)} />
                    <InfoRow label="Trạng thái" value="Đã thanh toán ✅" />
                  </div>
                )}
              </motion.div>
            )}

            {/* ─── Step: Failed ─── */}
            {(step === 'failed' || step === 'expired') && (
              <motion.div
                key="failed"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2 }}
                className="py-8 text-center space-y-5"
              >
                <div className="w-16 h-16 rounded-full bg-destructive/10 border-2 border-destructive/30 flex items-center justify-center mx-auto">
                  {step === 'expired' ? (
                    <Clock className="h-8 w-8 text-destructive" />
                  ) : (
                    <X className="h-8 w-8 text-destructive" />
                  )}
                </div>
                <div>
                  <h3 className="font-display text-lg">
                    {step === 'expired' ? 'Phiên thanh toán đã hết hạn' : 'Thanh toán thất bại'}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mt-2">
                    {error || (step === 'expired'
                      ? 'Vui lòng tạo đơn thanh toán mới để tiếp tục.'
                      : 'Đã xảy ra lỗi trong quá trình thanh toán.')}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border/20 bg-secondary/5">
          {step === 'select_package' && (
            <Button
              variant="cta"
              className="w-full rounded-xl shadow-[var(--shadow-soft)] gap-2"
              onClick={proceedToMethod}
            >
              Tiếp tục
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
          {step === 'select_method' && (
            <Button
              variant="cta"
              className="w-full rounded-xl shadow-[var(--shadow-soft)] gap-2"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <CreditCard className="h-4 w-4" />
              )}
              Thanh toán {formatCurrency(PACKAGES.find(p => p.code === selectedPackage)?.price || 0)}
            </Button>
          )}
          {step === 'success' && (
            <div className="flex gap-3">
              <Button
                variant="cta-outline"
                className="flex-1 rounded-xl gap-2"
                onClick={() => window.open('/invitation', '_blank')}
              >
                <ExternalLink className="h-4 w-4" />
                Xem thiệp
              </Button>
              <Button
                variant="cta"
                className="flex-1 rounded-xl shadow-[var(--shadow-soft)] gap-2"
                onClick={handleClose}
              >
                <Heart className="h-4 w-4" />
                Hoàn tất
              </Button>
            </div>
          )}
          {(step === 'failed' || step === 'expired') && (
            <Button
              variant="cta"
              className="w-full rounded-xl shadow-[var(--shadow-soft)] gap-2"
              onClick={goBack}
            >
              Thử lại
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Info Row Component ──────────────────────────────────────

function InfoRow({
  label,
  value,
  copyable,
  onCopy,
  highlight,
}: {
  label: string;
  value: string;
  copyable?: boolean;
  onCopy?: () => void;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between rounded-lg p-3 ${
        highlight ? 'bg-champagne/10 border border-champagne/20' : 'bg-secondary/20'
      }`}
    >
      <span className="font-body text-xs text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        <span className={`font-body text-sm ${highlight ? 'font-medium text-champagne' : 'font-medium'}`}>
          {value}
        </span>
        {copyable && onCopy && (
          <button
            onClick={onCopy}
            className="p-1 rounded hover:bg-secondary/40 transition-colors text-muted-foreground hover:text-foreground"
          >
            <Copy className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
