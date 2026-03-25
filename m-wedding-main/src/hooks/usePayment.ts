// ─── usePayment Hook ──────────────────────────────────────────
// React hook for managing the entire payment flow in the Builder

import { useState, useCallback, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import type {
  PaymentProvider,
  PackageCode,
  OrderRow,
  PaymentRow,
  PaymentStatus,
} from '@/types/payment';
import {
  PAYMENT_POLLING_INTERVAL_MS,
  isTerminalPaymentStatus,
} from '@/types/payment';
import {
  createOrder,
  checkPaymentStatus,
  simulatePaymentSuccess,
  handlePaymentSuccessAndPublish,
} from '@/services/payment-service';

export type PaymentFlowStep =
  | 'idle'            // Chưa bắt đầu
  | 'select_package'  // Chọn gói
  | 'select_method'   // Chọn phương thức
  | 'processing'      // Đang tạo order
  | 'awaiting'        // Chờ thanh toán
  | 'verifying'       // Đang verify
  | 'success'         // Thành công
  | 'failed'          // Thất bại
  | 'expired';        // Hết hạn

export interface UsePaymentReturn {
  /** Current step in payment flow */
  step: PaymentFlowStep;
  /** Loading state */
  loading: boolean;
  /** Error message */
  error: string | null;
  /** Current order */
  order: OrderRow | null;
  /** Current payment */
  payment: PaymentRow | null;
  /** Selected package code */
  selectedPackage: PackageCode;
  /** Selected payment provider */
  selectedProvider: PaymentProvider;

  // Actions
  /** Set selected package */
  setSelectedPackage: (code: PackageCode) => void;
  /** Set selected provider */
  setSelectedProvider: (provider: PaymentProvider) => void;
  /** Start payment flow (open modal) */
  startPayment: () => void;
  /** Proceed from package selection to method selection */
  proceedToMethod: () => void;
  /** Create order and payment */
  submitPayment: (invitationId: string, builderData: Record<string, unknown>) => Promise<void>;
  /** Simulate payment success (dev/testing) */
  confirmPayment: () => Promise<void>;
  /** Reset flow */
  resetPayment: () => void;
  /** Cancel payment */
  cancelPayment: () => void;
  /** Go back one step */
  goBack: () => void;
  /** Check if payment is active (polling should be on) */
  isPolling: boolean;
}

export function usePayment(): UsePaymentReturn {
  const { user } = useAuth();
  const [step, setStep] = useState<PaymentFlowStep>('idle');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<OrderRow | null>(null);
  const [payment, setPayment] = useState<PaymentRow | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<PackageCode>('basic');
  const [selectedProvider, setSelectedProvider] = useState<PaymentProvider>('bank_qr');
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPolling = step === 'awaiting';

  // ─── Polling for payment status ─────────────────────────────

  useEffect(() => {
    if (step !== 'awaiting' || !payment || !user) {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
      return;
    }

    const poll = async () => {
      try {
        const result = await checkPaymentStatus(payment.payment_code, user.id);
        if (!result) return;

        setPayment(result.payment);
        setOrder(result.order);

        if (result.payment.status === 'paid') {
          setStep('success');
          if (pollingRef.current) {
            clearInterval(pollingRef.current);
            pollingRef.current = null;
          }
        } else if (result.payment.status === 'expired') {
          setStep('expired');
          if (pollingRef.current) {
            clearInterval(pollingRef.current);
            pollingRef.current = null;
          }
        } else if (result.payment.status === 'failed') {
          setStep('failed');
          setError('Thanh toán thất bại');
          if (pollingRef.current) {
            clearInterval(pollingRef.current);
            pollingRef.current = null;
          }
        }
      } catch (err) {
        console.error('Polling error:', err);
      }
    };

    pollingRef.current = setInterval(poll, PAYMENT_POLLING_INTERVAL_MS);

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
    };
  }, [step, payment, user]);

  // ─── Actions ────────────────────────────────────────────────

  const startPayment = useCallback(() => {
    setError(null);
    setStep('select_package');
  }, []);

  const proceedToMethod = useCallback(() => {
    setError(null);
    setStep('select_method');
  }, []);

  const submitPayment = useCallback(
    async (invitationId: string, builderData: Record<string, unknown>) => {
      if (!user) {
        setError('Vui lòng đăng nhập để thanh toán');
        return;
      }

      setStep('processing');
      setLoading(true);
      setError(null);

      try {
        const result = await createOrder({
          userId: user.id,
          invitationId,
          paymentProvider: selectedProvider,
          packageCode: selectedPackage,
          builderData,
        });

        setOrder(result.order);
        setPayment(result.payment);
        setStep('awaiting');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Không thể tạo đơn thanh toán');
        setStep('failed');
      } finally {
        setLoading(false);
      }
    },
    [user, selectedProvider, selectedPackage],
  );

  const confirmPayment = useCallback(async () => {
    if (!payment || !user) return;

    setLoading(true);
    setStep('verifying');

    try {
      const result = await handlePaymentSuccessAndPublish(payment.payment_code, user.id);
      if (result.success) {
        // Refetch payment status
        const updated = await checkPaymentStatus(payment.payment_code, user.id);
        if (updated) {
          setPayment(updated.payment);
          setOrder(updated.order);
        }
        setStep('success');
      } else {
        setError(result.error || 'Xác nhận thanh toán thất bại');
        setStep('failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi xác nhận thanh toán');
      setStep('failed');
    } finally {
      setLoading(false);
    }
  }, [payment, user]);

  const resetPayment = useCallback(() => {
    setStep('idle');
    setOrder(null);
    setPayment(null);
    setError(null);
    setLoading(false);
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  }, []);

  const cancelPayment = useCallback(() => {
    resetPayment();
  }, [resetPayment]);

  const goBack = useCallback(() => {
    setError(null);
    if (step === 'select_method') {
      setStep('select_package');
    } else if (step === 'failed' || step === 'expired') {
      setStep('select_method');
    } else {
      resetPayment();
    }
  }, [step, resetPayment]);

  return {
    step,
    loading,
    error,
    order,
    payment,
    selectedPackage,
    selectedProvider,
    setSelectedPackage,
    setSelectedProvider,
    startPayment,
    proceedToMethod,
    submitPayment,
    confirmPayment,
    resetPayment,
    cancelPayment,
    goBack,
    isPolling,
  };
}
