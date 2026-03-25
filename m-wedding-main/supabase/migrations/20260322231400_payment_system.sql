-- ============================================
-- PAYMENT SYSTEM MIGRATION
-- DUCO Wedding Invitation Platform
-- ============================================

-- 1. Create invitations table
CREATE TABLE IF NOT EXISTS public.invitations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  template_id TEXT NOT NULL DEFAULT 'classic',
  bride_name TEXT NOT NULL DEFAULT '',
  groom_name TEXT NOT NULL DEFAULT '',
  wedding_date DATE,
  venue TEXT DEFAULT '',
  slug TEXT UNIQUE,
  builder_data JSONB DEFAULT '{}'::jsonb,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived')),
  publish_status TEXT NOT NULL DEFAULT 'draft' CHECK (publish_status IN ('draft', 'pending_payment', 'paid', 'published', 'publish_failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_invitations_user_id ON public.invitations(user_id);
CREATE INDEX idx_invitations_slug ON public.invitations(slug);
CREATE INDEX idx_invitations_publish_status ON public.invitations(publish_status);

-- RLS for invitations
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own invitations"
  ON public.invitations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own invitations"
  ON public.invitations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own invitations"
  ON public.invitations FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Public can view published invitations by slug
CREATE POLICY "Anyone can view published invitations"
  ON public.invitations FOR SELECT
  TO anon
  USING (publish_status = 'published');

-- 2. Create orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_code TEXT NOT NULL UNIQUE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  invitation_id UUID NOT NULL REFERENCES public.invitations(id) ON DELETE CASCADE,
  package_code TEXT NOT NULL DEFAULT 'basic',
  package_name TEXT NOT NULL DEFAULT 'Gói Cơ Bản',
  amount INTEGER NOT NULL CHECK (amount > 0),
  currency TEXT NOT NULL DEFAULT 'VND',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'awaiting_payment', 'paid', 'cancelled', 'expired', 'failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_orders_user_id ON public.orders(user_id);
CREATE INDEX idx_orders_invitation_id ON public.orders(invitation_id);
CREATE INDEX idx_orders_order_code ON public.orders(order_code);
CREATE INDEX idx_orders_status ON public.orders(status);

-- RLS for orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own orders"
  ON public.orders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own orders"
  ON public.orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own orders"
  ON public.orders FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- 3. Create payments table
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  payment_code TEXT NOT NULL UNIQUE,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  provider TEXT NOT NULL CHECK (provider IN ('bank_qr', 'momo')),
  method TEXT NOT NULL DEFAULT 'qr_transfer',
  amount INTEGER NOT NULL CHECK (amount > 0),
  currency TEXT NOT NULL DEFAULT 'VND',
  status TEXT NOT NULL DEFAULT 'created' CHECK (status IN ('created', 'pending', 'processing', 'paid', 'failed', 'expired', 'cancelled')),
  provider_transaction_id TEXT,
  provider_order_id TEXT,
  qr_code_url TEXT,
  payment_url TEXT,
  transfer_content TEXT,
  bank_info JSONB DEFAULT '{}'::jsonb,
  raw_request_payload JSONB DEFAULT '{}'::jsonb,
  raw_callback_payload JSONB DEFAULT '{}'::jsonb,
  paid_at TIMESTAMPTZ,
  expired_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_payments_order_id ON public.payments(order_id);
CREATE INDEX idx_payments_user_id ON public.payments(user_id);
CREATE INDEX idx_payments_payment_code ON public.payments(payment_code);
CREATE INDEX idx_payments_status ON public.payments(status);
CREATE INDEX idx_payments_provider ON public.payments(provider);

-- RLS for payments
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own payments"
  ON public.payments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own payments"
  ON public.payments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own payments"
  ON public.payments FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- 4. Create payment_logs table
CREATE TABLE IF NOT EXISTS public.payment_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  payment_id UUID NOT NULL REFERENCES public.payments(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  payload JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_payment_logs_payment_id ON public.payment_logs(payment_id);
CREATE INDEX idx_payment_logs_event_type ON public.payment_logs(event_type);

-- RLS for payment_logs
ALTER TABLE public.payment_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own payment logs"
  ON public.payment_logs FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.payments p
      WHERE p.id = payment_id AND p.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own payment logs"
  ON public.payment_logs FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.payments p
      WHERE p.id = payment_id AND p.user_id = auth.uid()
    )
  );

-- 5. Auto-update updated_at triggers
CREATE TRIGGER update_invitations_updated_at
  BEFORE UPDATE ON public.invitations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
