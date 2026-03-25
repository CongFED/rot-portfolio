// ─── Payment Provider Abstraction ─────────────────────────────
// Interface and factory for payment providers (Bank QR, MoMo, etc.)
// Designed for easy extension: VNPay, ZaloPay, Stripe, etc.

import type {
  PaymentProvider as PaymentProviderType,
  PaymentRow,
  BankInfo,
} from '@/types/payment';

// ─── Provider Interface ──────────────────────────────────────

export interface CreatePaymentParams {
  paymentCode: string;
  orderCode: string;
  amount: number;
  currency: string;
  description: string;
  returnUrl: string;
  notifyUrl: string;
}

export interface CreatePaymentResult {
  success: boolean;
  /** QR code URL for bank transfer */
  qrCodeUrl?: string;
  /** Payment redirect URL (MoMo, VNPay, etc.) */
  paymentUrl?: string;
  /** Transfer content for bank transfer */
  transferContent?: string;
  /** Bank info for bank transfer */
  bankInfo?: BankInfo;
  /** Provider-specific order ID */
  providerOrderId?: string;
  /** Raw request payload for logging */
  rawPayload?: Record<string, unknown>;
  /** Error message if failed */
  errorMessage?: string;
}

export interface VerifyCallbackParams {
  payload: Record<string, unknown>;
  signature?: string;
}

export interface VerifyCallbackResult {
  valid: boolean;
  paymentCode: string;
  providerTransactionId?: string;
  status: 'paid' | 'failed' | 'cancelled';
  rawPayload: Record<string, unknown>;
  errorMessage?: string;
}

/** Payment Provider interface - implement this for each provider */
export interface IPaymentProvider {
  /** Provider identifier */
  readonly providerName: PaymentProviderType;

  /** Create a payment request / session */
  createPayment(params: CreatePaymentParams): Promise<CreatePaymentResult>;

  /** Verify a callback/webhook from the provider */
  verifyCallback(params: VerifyCallbackParams): Promise<VerifyCallbackResult>;
}

// ─── Bank QR Provider ────────────────────────────────────────

import {
  DEFAULT_BANK_INFO,
  generateTransferContent,
  generateVietQrUrl,
} from '@/types/payment';

export class BankQrProvider implements IPaymentProvider {
  readonly providerName: PaymentProviderType = 'bank_qr';

  private bankInfo: BankInfo;

  constructor(bankInfo?: BankInfo) {
    this.bankInfo = bankInfo ?? DEFAULT_BANK_INFO;
  }

  async createPayment(params: CreatePaymentParams): Promise<CreatePaymentResult> {
    const transferContent = generateTransferContent(params.orderCode);

    const qrCodeUrl = generateVietQrUrl(
      this.bankInfo.bank_code,
      this.bankInfo.account_number,
      params.amount,
      transferContent,
      this.bankInfo.account_name,
    );

    return {
      success: true,
      qrCodeUrl,
      transferContent,
      bankInfo: this.bankInfo,
      providerOrderId: params.paymentCode,
      rawPayload: {
        provider: 'bank_qr',
        bankInfo: this.bankInfo,
        amount: params.amount,
        transferContent,
        qrCodeUrl,
        createdAt: new Date().toISOString(),
      },
    };
  }

  async verifyCallback(params: VerifyCallbackParams): Promise<VerifyCallbackResult> {
    // In production, this would verify against a bank reconciliation API
    // or a payment gateway like CassoAPI, PayOS, etc.
    // For MVP, we provide a mock implementation & manual confirm

    const { payload } = params;

    // Mock verify - in production, check signature from CassoAPI/PayOS
    const paymentCode = (payload.paymentCode as string) || '';
    const status = (payload.status as string) === 'paid' ? 'paid' : 'failed';

    return {
      valid: true,
      paymentCode,
      providerTransactionId: (payload.transactionId as string) || `bank_tx_${Date.now()}`,
      status: status as 'paid' | 'failed',
      rawPayload: payload,
    };
  }
}

// ─── MoMo Provider ───────────────────────────────────────────

export class MomoProvider implements IPaymentProvider {
  readonly providerName: PaymentProviderType = 'momo';

  private partnerCode: string;
  private accessKey: string;
  private secretKey: string;
  private endpoint: string;

  constructor(config?: {
    partnerCode?: string;
    accessKey?: string;
    secretKey?: string;
    endpoint?: string;
  }) {
    // In production, load from environment variables
    this.partnerCode = config?.partnerCode ?? 'MOMO_PARTNER_CODE';
    this.accessKey = config?.accessKey ?? 'MOMO_ACCESS_KEY';
    this.secretKey = config?.secretKey ?? 'MOMO_SECRET_KEY';
    this.endpoint = config?.endpoint ?? 'https://test-payment.momo.vn/v2/gateway/api/create';
  }

  async createPayment(params: CreatePaymentParams): Promise<CreatePaymentResult> {
    // In production:
    // 1. Build signature with HMAC SHA256
    // 2. POST to MoMo API
    // 3. Return payUrl from response

    // Mock implementation for MVP
    const requestPayload = {
      partnerCode: this.partnerCode,
      requestId: params.paymentCode,
      amount: params.amount,
      orderId: params.paymentCode,
      orderInfo: params.description,
      redirectUrl: params.returnUrl,
      ipnUrl: params.notifyUrl,
      requestType: 'payWithMethod',
      extraData: '',
      lang: 'vi',
    };

    // Simulate MoMo response
    // In production, this would be an actual API call:
    // const response = await fetch(this.endpoint, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ ...requestPayload, signature }),
    // });

    const mockPaymentUrl = `${window.location.origin}/payment/momo-mock?` +
      `orderId=${params.paymentCode}&amount=${params.amount}&returnUrl=${encodeURIComponent(params.returnUrl)}`;

    return {
      success: true,
      paymentUrl: mockPaymentUrl,
      providerOrderId: params.paymentCode,
      rawPayload: requestPayload,
    };
  }

  async verifyCallback(params: VerifyCallbackParams): Promise<VerifyCallbackResult> {
    const { payload, signature } = params;

    // In production:
    // 1. Rebuild signature from payload using secretKey
    // 2. Compare with received signature
    // 3. Validate resultCode

    // Mock implementation
    const paymentCode = (payload.orderId as string) || (payload.paymentCode as string) || '';
    const resultCode = payload.resultCode as number;

    // MoMo resultCode: 0 = success
    const status = resultCode === 0 ? 'paid' : 'failed';

    return {
      valid: true, // In production: verify HMAC signature
      paymentCode,
      providerTransactionId: (payload.transId as string) || `momo_tx_${Date.now()}`,
      status: status as 'paid' | 'failed',
      rawPayload: payload,
    };
  }
}

// ─── Provider Factory ────────────────────────────────────────

const providerRegistry: Map<PaymentProviderType, () => IPaymentProvider> = new Map([
  ['bank_qr', () => new BankQrProvider()],
  ['momo', () => new MomoProvider()],
]);

/** Get a payment provider instance by name */
export function getPaymentProvider(provider: PaymentProviderType): IPaymentProvider {
  const factory = providerRegistry.get(provider);
  if (!factory) {
    throw new Error(`Unknown payment provider: ${provider}`);
  }
  return factory();
}

/** Register a new payment provider (for extension) */
export function registerPaymentProvider(
  name: PaymentProviderType,
  factory: () => IPaymentProvider,
): void {
  providerRegistry.set(name, factory);
}

/** Get all available provider names */
export function getAvailableProviders(): PaymentProviderType[] {
  return Array.from(providerRegistry.keys());
}
