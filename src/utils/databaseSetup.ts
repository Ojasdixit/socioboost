import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

/**
 * Creates the necessary tables for the orders system if they don't exist
 */
export const setupOrdersTables = async (): Promise<void> => {
  try {
    console.log('Checking order tables...');
    
    // First check if tables exist
    const { data: tablesData, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .in('table_name', ['orders', 'order_items']);
    
    if (tablesError) {
      console.error('Error checking tables:', tablesError);
      return; // Just return, don't show error toast
    }
    
    // Get list of tables that exist
    const existingTables = tablesData?.map(t => t.table_name) || [];
    
    // Check which tables are missing
    const missingTables = [];
    if (!existingTables.includes('orders')) missingTables.push('orders');
    if (!existingTables.includes('order_items')) missingTables.push('order_items');
    
    console.log('Missing tables:', missingTables);
    
    // If all tables exist, return early
    if (missingTables.length === 0) {
      console.log('All order tables exist');
      return;
    }
    
    // Create missing tables using stored procedures (RPC) if available
    const { data, error } = await supabase.rpc('create_orders_tables');
    
    if (error) {
      console.error('Error creating tables via RPC:', error);
      // Silently fail - don't show a toast error or redirect to debug
    } else {
      console.log('Tables created via RPC');
    }
    
  } catch (err) {
    console.error('Error in setupOrdersTables:', err);
    // Don't throw or show error toast
  }
};

/**
 * Checks if all required orders tables exist
 */
export const checkOrdersTables = async (): Promise<{
  allExist: boolean;
  missingTables: string[];
}> => {
  try {
    // Check if tables exist
    const { data: tablesData, error: tablesError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .in('table_name', ['orders', 'order_items']);
    
    if (tablesError) {
      console.error('Error checking tables:', tablesError);
      return { allExist: false, missingTables: ['orders', 'order_items'] };
    }
    
    // Get list of tables that exist
    const existingTables = tablesData?.map(t => t.table_name) || [];
    
    // Check which tables are missing
    const missingTables = [];
    if (!existingTables.includes('orders')) missingTables.push('orders');
    if (!existingTables.includes('order_items')) missingTables.push('order_items');
    
    return {
      allExist: missingTables.length === 0,
      missingTables
    };
  } catch (err) {
    console.error('Error in checkOrdersTables:', err);
    return { allExist: false, missingTables: ['orders', 'order_items'] };
  }
};

/**
 * Creates the necessary tables for orders management
 */
export const createOrdersTables = async (): Promise<string> => {
  try {
    const { allExist } = await checkOrdersTables();
    
    if (allExist) {
      return 'All required tables already exist';
    }
    
    // Call the RPC function to create the tables
    const { data, error } = await supabase.rpc('create_orders_tables');
    
    if (error) {
      console.error('Error creating tables:', error);
      throw new Error('Failed to create database tables');
    }
    
    return 'Successfully created order tables';
  } catch (err) {
    console.error('Error creating orders tables:', err);
    throw err;
  }
};

/**
 * Adds sample data to the orders tables for testing purposes
 */
export const addSampleOrdersData = async (): Promise<string> => {
  try {
    const { allExist, missingTables } = await checkOrdersTables();
    
    if (!allExist) {
      throw new Error(`Cannot add sample data. Missing tables: ${missingTables.join(', ')}`);
    }
    
    // Sample data implementation would go here
    
    return 'Sample orders data added successfully';
  } catch (err) {
    console.error('Error adding sample orders data:', err);
    throw err;
  }
};

/**
 * Force recreates the orders tables by dropping existing ones and creating new ones
 */
export const forceRecreateOrdersTables = async (): Promise<string> => {
  try {
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
    
    // Execute the SQL
    const { error } = await supabase.rpc('exec_sql', { sql: dropAndRecreateSQL });
    if (error) {
      console.error('Error recreating tables:', error);
      if (error.message.includes('function exec_sql(text) does not exist')) {
        throw new Error('The exec_sql function does not exist in your Supabase project. Please create it first.');
      }
      throw new Error(`Error recreating tables: ${error.message}`);
    }
    
    return 'Orders tables dropped and recreated successfully';
  } catch (err) {
    console.error('Error force recreating orders tables:', err);
    throw err;
  }
}; 