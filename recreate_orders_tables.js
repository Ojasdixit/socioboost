// Simple script to recreate the orders tables
// Run with: node recreate_orders_tables.js

const { createClient } = require('@supabase/supabase-js');

// Replace these with your actual Supabase URL and anon key
const supabaseUrl = 'https://tdyyeygvfojnebppxyug.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkeXlleWd2Zm9qbmVicHB4eXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4MTUzOTMsImV4cCI6MjA2MzM5MTM5M30.yxmHcp5mAyHj5lGbCBN7mBrnVPcfHDkSJvd4-G3EoD4';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// SQL to drop and recreate tables
const dropAndRecreateSQL = `
  -- First drop existing tables if they exist (in reverse order of dependencies)
  DROP TABLE IF EXISTS public.order_status_history CASCADE;
  DROP TABLE IF EXISTS public.order_items CASCADE;
  DROP TABLE IF EXISTS public.orders CASCADE;
  
  -- Create orders table
  CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id),
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    payment_status VARCHAR(50) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );
  
  -- Create order_items table
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
  
  -- Create order_status_history table
  CREATE TABLE IF NOT EXISTS public.order_status_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );
  
  -- Create indexes for better performance
  CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
  CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
  CREATE INDEX IF NOT EXISTS idx_order_status_history_order_id ON public.order_status_history(order_id);
`;

async function recreateOrdersTables() {
  console.log('Starting table recreation...');
  
  try {
    // Try direct SQL execution
    const { error: execError } = await supabase.rpc('exec_sql', { sql: dropAndRecreateSQL });
    
    if (execError) {
      console.error('Error using exec_sql:', execError);
      console.log('Attempting fallback method...');
      
      // Fall back to individual table operations
      // This is a simplified approach and may not handle all constraints
      console.log('Fallback method not implemented in this script.');
      console.log('Please run the SQL manually in the Supabase SQL editor.');
      
      return;
    }
    
    console.log('Orders tables recreated successfully!');
  } catch (err) {
    console.error('Error recreating orders tables:', err);
  }
}

// Run the function
recreateOrdersTables()
  .then(() => console.log('Script completed'))
  .catch(err => console.error('Script failed:', err)); 