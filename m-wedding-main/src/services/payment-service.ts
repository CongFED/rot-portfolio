// ─── Payment Service ──────────────────────────────────────────
// Core business logic for payment operations
// Handles order creation, payment status, and state transitions

import { supabase } from '@/integrations/supabase/client';
import {
  getPaymentProvider,
  type CreatePaymentResult,
} from '@/services/payment-providers';
import type {
  PaymentProvider,
  PackageCode,
  OrderRow,
  PaymentRow,
  PaymentStatus,
  InvitationRow,
  CreateOrderResponse,
  PaymentStatusResponse,
} from '@/types/payment';
import {
  PACKAGES,
  PAYMENT_EXPIRY_MINUTES,
  generateOrderCode,
  generatePaymentCode,
  isTerminalPaymentStatus,
  canTransitionPaymentStatus,
} from '@/types/payment';

// ─── Create Order & Payment ──────────────────────────────────

export interface CreateOrderParams {
  userId: string;
  invitationId: string;
  paymentProvider: PaymentProvider;
  packageCode: PackageCode;
  builderData?: Record<string, unknown>;
}

/**
 * Creates a new order and payment session.
 * Steps:
 * 1. Validate package
 * 2. Upsert invitation record
 * 3. Create order
 * 4. Create payment via provider
 * 5. Save payment record
 * 6. Update invitation status to pending_payment
 */
export async function createOrder(params: CreateOrderParams): Promise<CreateOrderResponse> {
  const { userId, invitationId, paymentProvider, packageCode, builderData } = params;

  // 1. Find package
  const packageInfo = PACKAGES.find(p => p.code === packageCode);
  if (!packageInfo) {
    throw new Error(`Unknown package: ${packageCode}`);
  }

  // 2. Ensure invitation exists
  let invitationDbId = invitationId;

  // Check if invitation exists in DB
  const { data: existingInv } = await supabase
    .from('invitations')
    .select('id')
    .eq('id', invitationId)
    .single();

  if (!existingInv) {
    // Create invitation record from builder data
    const brideName = (builderData?.couple as { brideName?: string })?.brideName || '';
    const groomName = (builderData?.couple as { groomName?: string })?.groomName || '';
    const weddingDate = (builderData?.event as { date?: string })?.date || null;
    const venue = (builderData?.event as { venue?: string })?.venue || '';
    const templateId = (builderData?.theme as { template?: string })?.template || 'classic';
    const slug = `${brideName.toLowerCase().replace(/\s/g, '')}-${groomName.toLowerCase().replace(/\s/g, '')}-${Date.now().toString(36)}`;

    const { data: newInv, error: invError } = await supabase
      .from('invitations')
      .insert({
        user_id: userId,
        template_id: templateId,
        bride_name: brideName,
        groom_name: groomName,
        wedding_date: weddingDate,
        venue,
        slug,
        builder_data: builderData || {},
        status: 'active',
        publish_status: 'pending_payment',
      })
      .select()
      .single();

    if (invError || !newInv) {
      throw new Error(`Failed to create invitation: ${invError?.message}`);
    }
    invitationDbId = newInv.id;
  } else {
    // Update existing invitation status
    await supabase
      .from('invitations')
      .update({
        publish_status: 'pending_payment',
        builder_data: builderData || undefined,
      })
      .eq('id', invitationDbId);
  }

  // 3. Generate codes
  const orderCode = generateOrderCode();
  const paymentCode = generatePaymentCode();

  // 4. Create order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      order_code: orderCode,
      user_id: userId,
      invitation_id: invitationDbId,
      package_code: packageCode,
      package_name: packageInfo.name,
      amount: packageInfo.price,
      currency: packageInfo.currency,
      status: 'pending',
    })
    .select()
    .single();

  if (orderError || !order) {
    throw new Error(`Failed to create order: ${orderError?.message}`);
  }

  // 5. Create payment via provider
  const provider = getPaymentProvider(paymentProvider);
  const expiredAt = new Date(Date.now() + PAYMENT_EXPIRY_MINUTES * 60 * 1000);

  let providerResult: CreatePaymentResult;
  try {
    providerResult = await provider.createPayment({
      paymentCode,
      orderCode,
      amount: packageInfo.price,
      currency: packageInfo.currency,
      description: `Thanh toán thiệp cưới - ${packageInfo.name}`,
      returnUrl: `${window.location.origin}/builder?payment_status=return&code=${paymentCode}`,
      notifyUrl: `${window.location.origin}/api/payments/webhooks/${paymentProvider}`,
    });
  } catch (err) {
    // Rollback order status
    await supabase.from('orders').update({ status: 'failed' }).eq('id', order.id);
    throw new Error(`Payment provider error: ${err instanceof Error ? err.message : 'Unknown error'}`);
  }

  if (!providerResult.success) {
    await supabase.from('orders').update({ status: 'failed' }).eq('id', order.id);
    throw new Error(`Payment creation failed: ${providerResult.errorMessage || 'Unknown error'}`);
  }

  // 6. Save payment record
  const method = paymentProvider === 'bank_qr' ? 'qr_transfer' : 'momo_wallet';

  const { data: payment, error: paymentError } = await supabase
    .from('payments')
    .insert({
      payment_code: paymentCode,
      order_id: order.id,
      user_id: userId,
      provider: paymentProvider,
      method,
      amount: packageInfo.price,
      currency: packageInfo.currency,
      status: 'pending',
      qr_code_url: providerResult.qrCodeUrl || null,
      payment_url: providerResult.paymentUrl || null,
      transfer_content: providerResult.transferContent || null,
      bank_info: providerResult.bankInfo ? (providerResult.bankInfo as unknown as Record<string, unknown>) : null,
      provider_order_id: providerResult.providerOrderId || null,
      raw_request_payload: providerResult.rawPayload || {},
      expired_at: expiredAt.toISOString(),
    })
    .select()
    .single();

  if (paymentError || !payment) {
    throw new Error(`Failed to save payment: ${paymentError?.message}`);
  }

  // 7. Update order status
  await supabase
    .from('orders')
    .update({ status: 'awaiting_payment' })
    .eq('id', order.id);

  // 8. Log event
  await logPaymentEvent(payment.id, 'payment_created', {
    provider: paymentProvider,
    amount: packageInfo.price,
    orderCode,
    paymentCode,
  });

  // Refetch order with updated status
  const { data: updatedOrder } = await supabase
    .from('orders')
    .select()
    .eq('id', order.id)
    .single();

  return {
    order: (updatedOrder || order) as unknown as OrderRow,
    payment: payment as unknown as PaymentRow,
  };
}

// ─── Check Payment Status ────────────────────────────────────

export async function checkPaymentStatus(paymentCode: string, userId: string): Promise<PaymentStatusResponse | null> {
  const { data: payment } = await supabase
    .from('payments')
    .select('*')
    .eq('payment_code', paymentCode)
    .eq('user_id', userId)
    .single();

  if (!payment) return null;

  const { data: order } = await supabase
    .from('orders')
    .select('*')
    .eq('id', payment.order_id)
    .single();

  if (!order) return null;

  // Check expiry
  if (
    payment.status === 'pending' &&
    payment.expired_at &&
    new Date(payment.expired_at) < new Date()
  ) {
    // Auto-expire
    await updatePaymentStatus(payment.id, 'expired', userId);
    await supabase.from('orders').update({ status: 'expired' }).eq('id', order.id);

    return {
      payment: { ...payment, status: 'expired' } as unknown as PaymentRow,
      order: { ...order, status: 'expired' } as unknown as OrderRow,
    };
  }

  return {
    payment: payment as unknown as PaymentRow,
    order: order as unknown as OrderRow,
  };
}

// ─── Simulate Payment Success (Mock / Dev) ───────────────────

/**
 * Simulates a successful payment callback.
 * In production, this would be triggered by webhook from payment provider.
 * For MVP/testing, we allow client-side simulation.
 */
export async function simulatePaymentSuccess(
  paymentCode: string,
  userId: string,
): Promise<{ success: boolean; error?: string }> {
  // 1. Get payment
  const { data: payment } = await supabase
    .from('payments')
    .select('*')
    .eq('payment_code', paymentCode)
    .eq('user_id', userId)
    .single();

  if (!payment) return { success: false, error: 'Payment not found' };

  // 2. Idempotency check
  if (payment.status === 'paid') {
    return { success: true }; // Already paid
  }

  if (isTerminalPaymentStatus(payment.status as PaymentStatus)) {
    return { success: false, error: `Payment is in terminal status: ${payment.status}` };
  }

  // 3. Update payment
  const { error: paymentUpdateError } = await supabase
    .from('payments')
    .update({
      status: 'paid',
      paid_at: new Date().toISOString(),
      provider_transaction_id: `sim_tx_${Date.now()}`,
      raw_callback_payload: {
        simulated: true,
        timestamp: new Date().toISOString(),
      },
    })
    .eq('id', payment.id)
    .eq('status', payment.status); // Optimistic lock

  if (paymentUpdateError) {
    return { success: false, error: `Failed to update payment: ${paymentUpdateError.message}` };
  }

  // 4. Update order
  await supabase
    .from('orders')
    .update({ status: 'paid' })
    .eq('id', payment.order_id);

  // 5. Get order to find invitation
  const { data: order } = await supabase
    .from('orders')
    .select('invitation_id')
    .eq('id', payment.order_id)
    .single();

  // 6. Update invitation publish status
  if (order) {
    await supabase
      .from('invitations')
      .update({ publish_status: 'paid' })
      .eq('id', order.invitation_id);
  }

  // 7. Log event
  await logPaymentEvent(payment.id, 'payment_paid', {
    simulated: true,
    paymentCode,
  });

  return { success: true };
}

// ─── Publish Invitation ──────────────────────────────────────

/**
 * Publishes an invitation after successful payment.
 * Only allows publish if payment status is 'paid'.
 */
export async function publishInvitation(
  invitationId: string,
  userId: string,
): Promise<{ success: boolean; invitation?: InvitationRow; error?: string }> {
  // 1. Get invitation
  const { data: invitation } = await supabase
    .from('invitations')
    .select('*')
    .eq('id', invitationId)
    .eq('user_id', userId)
    .single();

  if (!invitation) {
    return { success: false, error: 'Invitation not found' };
  }

  // 2. Check if paid
  if (invitation.publish_status !== 'paid') {
    return {
      success: false,
      error: `Cannot publish: current status is ${invitation.publish_status}. Must be 'paid'.`,
    };
  }

  // 3. Update to published
  const { data: updated, error } = await supabase
    .from('invitations')
    .update({ publish_status: 'published' })
    .eq('id', invitationId)
    .eq('publish_status', 'paid') // Optimistic lock
    .select()
    .single();

  if (error || !updated) {
    return { success: false, error: `Failed to publish: ${error?.message}` };
  }

  return {
    success: true,
    invitation: updated as unknown as InvitationRow,
  };
}

// ─── Auto-publish after payment ──────────────────────────────

/**
 * Complete flow: payment success → auto publish
 */
export async function handlePaymentSuccessAndPublish(
  paymentCode: string,
  userId: string,
): Promise<{ success: boolean; error?: string }> {
  // 1. Simulate/confirm payment
  const payResult = await simulatePaymentSuccess(paymentCode, userId);
  if (!payResult.success) {
    return payResult;
  }

  // 2. Get order to find invitation
  const { data: payment } = await supabase
    .from('payments')
    .select('order_id')
    .eq('payment_code', paymentCode)
    .single();

  if (!payment) return { success: false, error: 'Payment not found after update' };

  const { data: order } = await supabase
    .from('orders')
    .select('invitation_id')
    .eq('id', payment.order_id)
    .single();

  if (!order) return { success: false, error: 'Order not found' };

  // 3. Auto-publish
  const pubResult = await publishInvitation(order.invitation_id, userId);
  return pubResult;
}

// ─── Get User Orders ─────────────────────────────────────────

export async function getUserOrders(userId: string): Promise<OrderRow[]> {
  const { data } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  return (data || []) as unknown as OrderRow[];
}

// ─── Helper: Update Payment Status ──────────────────────────

async function updatePaymentStatus(
  paymentId: string,
  newStatus: PaymentStatus,
  userId: string,
): Promise<void> {
  await supabase
    .from('payments')
    .update({ status: newStatus })
    .eq('id', paymentId)
    .eq('user_id', userId);
}

// ─── Helper: Log Payment Event ───────────────────────────────

async function logPaymentEvent(
  paymentId: string,
  eventType: string,
  payload: Record<string, unknown>,
): Promise<void> {
  await supabase.from('payment_logs').insert({
    payment_id: paymentId,
    event_type: eventType,
    payload,
  });
}
