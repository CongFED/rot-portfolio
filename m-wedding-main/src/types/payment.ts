// ─── Payment System Types ─────────────────────────────────────
// Core types for orders, payments, and payment flow

// ─── Enum Types ──────────────────────────────────────────────

/** Trạng thái xuất bản của thiệp */
export type InvitationPublishStatus =
  | 'draft'            // Bản nháp, chưa thanh toán
  | 'pending_payment'  // Đang chờ thanh toán
  | 'paid'             // Đã thanh toán, sẵn sàng publish
  | 'published'        // Đã xuất bản
  | 'publish_failed';  // Xuất bản thất bại

/** Trạng thái đơn hàng */
export type OrderStatus =
  | 'pending'           // Vừa tạo
  | 'awaiting_payment'  // Chờ thanh toán
  | 'paid'              // Đã thanh toán
  | 'cancelled'         // Đã hủy
  | 'expired'           // Hết hạn
  | 'failed';           // Thất bại

/** Trạng thái thanh toán */
export type PaymentStatus =
  | 'created'     // Vừa khởi tạo
  | 'pending'     // Chờ user thanh toán
  | 'processing'  // Provider đang xử lý
  | 'paid'        // Thành công
  | 'failed'      // Thất bại
  | 'expired'     // Hết hạn
  | 'cancelled';  // Đã hủy

/** Nhà cung cấp thanh toán */
export type PaymentProvider = 'bank_qr' | 'momo';

/** Phương thức thanh toán */
export type PaymentMethod = 'qr_transfer' | 'momo_wallet';

/** Mã gói dịch vụ */
export type PackageCode = 'basic' | 'premium' | 'vip';

// ─── Database Row Types ──────────────────────────────────────

export interface InvitationRow {
  id: string;
  user_id: string;
  template_id: string;
  bride_name: string;
  groom_name: string;
  wedding_date: string | null;
  venue: string;
  slug: string | null;
  builder_data: Record<string, unknown>;
  status: 'active' | 'archived';
  publish_status: InvitationPublishStatus;
  created_at: string;
  updated_at: string;
}

export interface OrderRow {
  id: string;
  order_code: string;
  user_id: string;
  invitation_id: string;
  package_code: PackageCode;
  package_name: string;
  amount: number;
  currency: string;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
}

export interface PaymentRow {
  id: string;
  payment_code: string;
  order_id: string;
  user_id: string;
  provider: PaymentProvider;
  method: PaymentMethod;
  amount: number;
  currency: string;
  status: PaymentStatus;
  provider_transaction_id: string | null;
  provider_order_id: string | null;
  qr_code_url: string | null;
  payment_url: string | null;
  transfer_content: string | null;
  bank_info: BankInfo | null;
  raw_request_payload: Record<string, unknown>;
  raw_callback_payload: Record<string, unknown>;
  paid_at: string | null;
  expired_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface PaymentLogRow {
  id: string;
  payment_id: string;
  event_type: string;
  payload: Record<string, unknown>;
  created_at: string;
}

// ─── Domain Types ────────────────────────────────────────────

export interface BankInfo {
  bank_name: string;
  bank_code: string;
  account_number: string;
  account_name: string;
}

export interface PackageInfo {
  code: PackageCode;
  name: string;
  price: number;
  currency: string;
  features: string[];
}

// ─── API Request/Response Types ──────────────────────────────

export interface CreateOrderRequest {
  invitation_id: string;
  payment_provider: PaymentProvider;
  package_code: PackageCode;
}

export interface CreateOrderResponse {
  order: OrderRow;
  payment: PaymentRow;
}

export interface PaymentStatusResponse {
  payment: PaymentRow;
  order: OrderRow;
}

export interface PublishInvitationRequest {
  invitation_id: string;
}

export interface PublishInvitationResponse {
  invitation: InvitationRow;
  success: boolean;
}

// ─── Constants ───────────────────────────────────────────────

export const PACKAGES: PackageInfo[] = [
  {
    code: 'basic',
    name: 'Gói Cơ Bản',
    price: 99000,
    currency: 'VND',
    features: [
      'Thiệp cưới online',
      'Link chia sẻ riêng',
      'Mã QR',
      'RSVP & Lời chúc',
      'Hỗ trợ 6 tháng',
    ],
  },
  {
    code: 'premium',
    name: 'Gói Cao Cấp',
    price: 199000,
    currency: 'VND',
    features: [
      'Tất cả tính năng Gói Cơ Bản',
      'Album ảnh không giới hạn',
      'Nhạc nền tùy chọn',
      'Tên miền riêng',
      'Hỗ trợ 12 tháng',
    ],
  },
  {
    code: 'vip',
    name: 'Gói VIP',
    price: 399000,
    currency: 'VND',
    features: [
      'Tất cả tính năng Gói Cao Cấp',
      'Thiết kế tùy chỉnh',
      'Video save-the-date',
      'Quản lý khách mời nâng cao',
      'Hỗ trợ vĩnh viễn',
    ],
  },
];

/** Bank info mặc định cho QR transfer */
export const DEFAULT_BANK_INFO: BankInfo = {
  bank_name: 'Vietcombank',
  bank_code: 'VCB',
  account_number: '0123456789',
  account_name: 'CONG TY TNHH GIAY VA GIO',
};

/** Payment expiry time in minutes */
export const PAYMENT_EXPIRY_MINUTES = 15;

/** Polling interval in milliseconds */
export const PAYMENT_POLLING_INTERVAL_MS = 3000;

/** Format giá tiền VNĐ */
export function formatCurrency(amount: number, currency: string = 'VND'): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Generate order code: INV-YYYYMMDD-XXX */
export function generateOrderCode(): string {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, '');
  const rand = String(Math.floor(Math.random() * 999) + 1).padStart(3, '0');
  return `INV-${date}-${rand}`;
}

/** Generate payment code: PAY-YYYYMMDD-XXX */
export function generatePaymentCode(): string {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, '');
  const rand = String(Math.floor(Math.random() * 999) + 1).padStart(3, '0');
  return `PAY-${date}-${rand}`;
}

/** Generate transfer content from order code (bỏ dấu gạch) */
export function generateTransferContent(orderCode: string): string {
  return orderCode.replace(/-/g, '');
}

/** Generate VietQR URL */
export function generateVietQrUrl(
  bankCode: string,
  accountNumber: string,
  amount: number,
  transferContent: string,
  accountName?: string,
): string {
  const params = new URLSearchParams({
    amount: String(amount),
    addInfo: transferContent,
  });
  if (accountName) {
    params.set('accountName', accountName);
  }
  return `https://img.vietqr.io/image/${bankCode}-${accountNumber}-compact2.png?${params.toString()}`;
}

/** Check if a payment status is terminal (no further updates) */
export function isTerminalPaymentStatus(status: PaymentStatus): boolean {
  return ['paid', 'failed', 'expired', 'cancelled'].includes(status);
}

/** Check if a payment status can transition to target */
export function canTransitionPaymentStatus(current: PaymentStatus, target: PaymentStatus): boolean {
  const transitions: Record<PaymentStatus, PaymentStatus[]> = {
    created: ['pending', 'cancelled'],
    pending: ['processing', 'paid', 'failed', 'expired', 'cancelled'],
    processing: ['paid', 'failed'],
    paid: [],
    failed: [],
    expired: [],
    cancelled: [],
  };
  return transitions[current]?.includes(target) ?? false;
}
