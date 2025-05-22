-- Test data for SocialBoost application
-- This script creates test users and orders for testing purposes

-- First, let's create test users
-- Note: Supabase auth users need to be created through the auth.users table or API
-- This is a simplified example assuming direct database access

-- 1. Create test users in the auth.users table (if you have direct access)
-- If you're using Supabase auth, you'd typically create users through the API or dashboard
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'testuser1@example.com', '$2a$10$abcdefghijklmnopqrstuvwxyz123456', NOW(), NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000002', 'testuser2@example.com', '$2a$10$abcdefghijklmnopqrstuvwxyz123456', NOW(), NOW(), NOW()),
  ('00000000-0000-0000-0000-000000000003', 'admin@example.com', '$2a$10$abcdefghijklmnopqrstuvwxyz123456', NOW(), NOW(), NOW());

-- 2. Create user profiles (if you have a separate profiles table)
INSERT INTO profiles (id, user_id, first_name, last_name, email, phone, created_at, updated_at)
VALUES
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000001', 'John', 'Doe', 'testuser1@example.com', '+1234567890', NOW(), NOW()),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000002', 'Jane', 'Smith', 'testuser2@example.com', '+0987654321', NOW(), NOW()),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000003', 'Admin', 'User', 'admin@example.com', '+1122334455', NOW(), NOW());

-- 3. Create test orders
INSERT INTO orders (id, user_id, total_amount, status, payment_status, created_at, updated_at)
VALUES
  -- Orders for User 1 (John Doe)
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000001', 149.99, 'pending', 'paid', NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000001', 299.99, 'in_progress', 'paid', NOW() - INTERVAL '10 days', NOW() - INTERVAL '5 days'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000001', 79.99, 'completed', 'paid', NOW() - INTERVAL '30 days', NOW() - INTERVAL '25 days'),
  
  -- Orders for User 2 (Jane Smith)
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000002', 59.99, 'pending', 'pending', NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),
  (gen_random_uuid(), '00000000-0000-0000-0000-000000000002', 199.99, 'cancelled', 'refunded', NOW() - INTERVAL '15 days', NOW() - INTERVAL '14 days');

-- Get the order IDs we just created to use for order items
WITH order_ids AS (
  SELECT id, user_id, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at) as row_num
  FROM orders
  WHERE user_id IN ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002')
)

-- 4. Create order items for each order
-- We'll insert items with references to product packages
INSERT INTO order_items (id, order_id, package_id, quantity, price, service_type, service_id, service_url)
SELECT 
  gen_random_uuid(),
  o.id,
  CASE 
    WHEN o.user_id = '00000000-0000-0000-0000-000000000001' AND o.row_num = 1 THEN 
      (SELECT id FROM product_packages WHERE name = 'Instagram Growth Package' LIMIT 1)
    WHEN o.user_id = '00000000-0000-0000-0000-000000000001' AND o.row_num = 2 THEN 
      (SELECT id FROM product_packages WHERE name = 'Complete Social Media Bundle' LIMIT 1)
    WHEN o.user_id = '00000000-0000-0000-0000-000000000001' AND o.row_num = 3 THEN 
      (SELECT id FROM product_packages WHERE name = 'Facebook Popular Likes' LIMIT 1)
    WHEN o.user_id = '00000000-0000-0000-0000-000000000002' AND o.row_num = 1 THEN 
      (SELECT id FROM product_packages WHERE name = 'LinkedIn Popular Likes' LIMIT 1)
    WHEN o.user_id = '00000000-0000-0000-0000-000000000002' AND o.row_num = 2 THEN 
      (SELECT id FROM product_packages WHERE name = 'Twitter Growth Pack' LIMIT 1)
  END,
  1,
  CASE 
    WHEN o.user_id = '00000000-0000-0000-0000-000000000001' AND o.row_num = 1 THEN 149.99
    WHEN o.user_id = '00000000-0000-0000-0000-000000000001' AND o.row_num = 2 THEN 299.99
    WHEN o.user_id = '00000000-0000-0000-0000-000000000001' AND o.row_num = 3 THEN 79.99
    WHEN o.user_id = '00000000-0000-0000-0000-000000000002' AND o.row_num = 1 THEN 59.99
    WHEN o.user_id = '00000000-0000-0000-0000-000000000002' AND o.row_num = 2 THEN 199.99
  END,
  CASE 
    WHEN o.user_id = '00000000-0000-0000-0000-000000000001' AND o.row_num = 1 THEN 'instagram'
    WHEN o.user_id = '00000000-0000-0000-0000-000000000001' AND o.row_num = 2 THEN 'multiple'
    WHEN o.user_id = '00000000-0000-0000-0000-000000000001' AND o.row_num = 3 THEN 'facebook'
    WHEN o.user_id = '00000000-0000-0000-0000-000000000002' AND o.row_num = 1 THEN 'linkedin'
    WHEN o.user_id = '00000000-0000-0000-0000-000000000002' AND o.row_num = 2 THEN 'twitter'
  END,
  CASE 
    WHEN o.user_id = '00000000-0000-0000-0000-000000000001' AND o.row_num = 1 THEN 'followers-growth'
    WHEN o.user_id = '00000000-0000-0000-0000-000000000001' AND o.row_num = 2 THEN 'complete-bundle'
    WHEN o.user_id = '00000000-0000-0000-0000-000000000001' AND o.row_num = 3 THEN 'post-likes'
    WHEN o.user_id = '00000000-0000-0000-0000-000000000002' AND o.row_num = 1 THEN 'post-likes'
    WHEN o.user_id = '00000000-0000-0000-0000-000000000002' AND o.row_num = 2 THEN 'followers-growth'
  END,
  CASE 
    WHEN o.user_id = '00000000-0000-0000-0000-000000000001' AND o.row_num = 1 THEN 'https://instagram.com/user1'
    WHEN o.user_id = '00000000-0000-0000-0000-000000000001' AND o.row_num = 2 THEN NULL
    WHEN o.user_id = '00000000-0000-0000-0000-000000000001' AND o.row_num = 3 THEN 'https://facebook.com/post123'
    WHEN o.user_id = '00000000-0000-0000-0000-000000000002' AND o.row_num = 1 THEN 'https://linkedin.com/post456'
    WHEN o.user_id = '00000000-0000-0000-0000-000000000002' AND o.row_num = 2 THEN 'https://twitter.com/user2'
  END
FROM order_ids o;

-- 5. Create order status history entries
INSERT INTO order_status_history (id, order_id, status, created_at)
SELECT 
  gen_random_uuid(),
  id,
  status,
  created_at
FROM orders;

-- Add additional status history for orders that have changed status
INSERT INTO order_status_history (id, order_id, status, created_at)
SELECT 
  gen_random_uuid(),
  id,
  'pending',
  created_at
FROM orders 
WHERE status IN ('in_progress', 'completed', 'cancelled');

INSERT INTO order_status_history (id, order_id, status, created_at)
SELECT 
  gen_random_uuid(),
  id,
  'in_progress',
  created_at + INTERVAL '2 days'
FROM orders 
WHERE status IN ('completed');

-- Verify data was inserted correctly
SELECT 'Users created: ' || COUNT(*) FROM auth.users WHERE email LIKE 'test%' OR email = 'admin@example.com';
SELECT 'Orders created: ' || COUNT(*) FROM orders WHERE user_id IN ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002');
SELECT 'Order items created: ' || COUNT(*) FROM order_items WHERE order_id IN (SELECT id FROM orders WHERE user_id IN ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002'));
SELECT 'Order status history entries created: ' || COUNT(*) FROM order_status_history WHERE order_id IN (SELECT id FROM orders WHERE user_id IN ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002')); 