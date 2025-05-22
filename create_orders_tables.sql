-- Create tables for order management in Supabase

-- Orders table to store main order information
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  payment_status VARCHAR(50) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Order items table to store individual items in each order
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  package_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  price DECIMAL(10, 2) NOT NULL,
  service_type VARCHAR(100) NOT NULL,
  service_id VARCHAR(100) NOT NULL,
  service_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Order status history table to track status changes
CREATE TABLE IF NOT EXISTS public.order_status_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_status_history_order_id ON public.order_status_history(order_id);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = now();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

-- Create a debug function to get database information
CREATE OR REPLACE FUNCTION debug_db_info()
RETURNS JSONB AS $$
DECLARE
  result JSONB;
BEGIN
  WITH tables AS (
    SELECT 
      table_name,
      (SELECT count(*) FROM information_schema.columns WHERE table_name = t.table_name) AS column_count
    FROM 
      information_schema.tables t
    WHERE 
      table_schema = 'public'
  )
  SELECT 
    jsonb_object_agg(
      table_name, 
      jsonb_build_object(
        'column_count', column_count,
        'exists', true
      )
    ) INTO result
  FROM 
    tables;
    
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant permissions to authenticated users
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_status_history ENABLE ROW LEVEL SECURITY;

-- Create policies for orders table
CREATE POLICY "Users can view their own orders" 
ON public.orders FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own orders" 
ON public.orders FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create policies for order_items table
CREATE POLICY "Users can view their own order items" 
ON public.order_items FOR SELECT 
USING (order_id IN (SELECT id FROM public.orders WHERE user_id = auth.uid()));

CREATE POLICY "Users can insert their own order items" 
ON public.order_items FOR INSERT 
WITH CHECK (order_id IN (SELECT id FROM public.orders WHERE user_id = auth.uid()));

-- Create policies for order_status_history table
CREATE POLICY "Users can view their own order status history" 
ON public.order_status_history FOR SELECT 
USING (order_id IN (SELECT id FROM public.orders WHERE user_id = auth.uid()));

-- Grant access to anon and authenticated users
GRANT SELECT ON public.orders TO anon, authenticated;
GRANT INSERT ON public.orders TO anon, authenticated;
GRANT UPDATE ON public.orders TO anon, authenticated;

GRANT SELECT ON public.order_items TO anon, authenticated;
GRANT INSERT ON public.order_items TO anon, authenticated;

GRANT SELECT ON public.order_status_history TO anon, authenticated;
GRANT INSERT ON public.order_status_history TO anon, authenticated;

-- Comment on tables
COMMENT ON TABLE public.orders IS 'Stores main order information';
COMMENT ON TABLE public.order_items IS 'Stores individual items in each order';
COMMENT ON TABLE public.order_status_history IS 'Tracks status changes for orders'; 