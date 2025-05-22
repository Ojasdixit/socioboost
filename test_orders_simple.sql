-- Simple test orders for SocialBoost application
-- This script creates test orders for existing users

-- First, get existing user IDs from the auth.users table
DO $$
DECLARE
    user_id1 UUID;
    user_id2 UUID;
    order_id1 UUID;
    order_id2 UUID;
    order_id3 UUID;
    order_id4 UUID;
    order_id5 UUID;
BEGIN
    -- Get first two user IDs from the system
    SELECT id INTO user_id1 FROM auth.users LIMIT 1;
    SELECT id INTO user_id2 FROM auth.users OFFSET 1 LIMIT 1;
    
    IF user_id1 IS NULL THEN
        RAISE EXCEPTION 'No users found in the system. Please create users first.';
    END IF;
    
    -- Create order IDs
    order_id1 := gen_random_uuid();
    order_id2 := gen_random_uuid();
    order_id3 := gen_random_uuid();
    order_id4 := gen_random_uuid();
    order_id5 := gen_random_uuid();
    
    -- Create test orders
    INSERT INTO orders (id, user_id, total_amount, status, payment_status, created_at, updated_at)
    VALUES
        -- Orders for first user
        (order_id1, user_id1, 149.99, 'pending', 'paid', NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days'),
        (order_id2, user_id1, 299.99, 'in_progress', 'paid', NOW() - INTERVAL '10 days', NOW() - INTERVAL '5 days'),
        (order_id3, user_id1, 79.99, 'completed', 'paid', NOW() - INTERVAL '30 days', NOW() - INTERVAL '25 days');
    
    -- Only create orders for second user if we found one
    IF user_id2 IS NOT NULL THEN
        INSERT INTO orders (id, user_id, total_amount, status, payment_status, created_at, updated_at)
        VALUES
            -- Orders for second user
            (order_id4, user_id2, 59.99, 'pending', 'pending', NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day'),
            (order_id5, user_id2, 199.99, 'cancelled', 'refunded', NOW() - INTERVAL '15 days', NOW() - INTERVAL '14 days');
    END IF;
    
    -- Create order items - using hardcoded package IDs
    -- You may need to adjust these IDs to match your actual product_packages table
    INSERT INTO order_items (id, order_id, package_id, quantity, price, service_type, service_id, service_url)
    VALUES
        -- Items for first order
        (gen_random_uuid(), order_id1, 17, 1, 149.99, 'instagram', 'followers-growth', 'https://instagram.com/testuser'),
        
        -- Items for second order
        (gen_random_uuid(), order_id2, 3, 1, 299.99, 'multiple', 'complete-bundle', NULL),
        
        -- Items for third order
        (gen_random_uuid(), order_id3, 23, 1, 79.99, 'facebook', 'post-likes', 'https://facebook.com/post123');
    
    -- Only create order items for second user if we found one
    IF user_id2 IS NOT NULL THEN
        INSERT INTO order_items (id, order_id, package_id, quantity, price, service_type, service_id, service_url)
        VALUES
            -- Items for fourth order
            (gen_random_uuid(), order_id4, 11, 1, 59.99, 'linkedin', 'post-likes', 'https://linkedin.com/post456'),
            
            -- Items for fifth order
            (gen_random_uuid(), order_id5, 28, 1, 199.99, 'twitter', 'followers-growth', 'https://twitter.com/testuser2');
    END IF;
    
    -- Create order status history entries
    INSERT INTO order_status_history (id, order_id, status, created_at)
    VALUES
        -- Initial status for each order
        (gen_random_uuid(), order_id1, 'pending', NOW() - INTERVAL '2 days'),
        (gen_random_uuid(), order_id2, 'pending', NOW() - INTERVAL '10 days'),
        (gen_random_uuid(), order_id2, 'in_progress', NOW() - INTERVAL '5 days'),
        (gen_random_uuid(), order_id3, 'pending', NOW() - INTERVAL '30 days'),
        (gen_random_uuid(), order_id3, 'in_progress', NOW() - INTERVAL '28 days'),
        (gen_random_uuid(), order_id3, 'completed', NOW() - INTERVAL '25 days');
    
    -- Only create history for second user if we found one
    IF user_id2 IS NOT NULL THEN
        INSERT INTO order_status_history (id, order_id, status, created_at)
        VALUES
            (gen_random_uuid(), order_id4, 'pending', NOW() - INTERVAL '1 day'),
            (gen_random_uuid(), order_id5, 'pending', NOW() - INTERVAL '15 days'),
            (gen_random_uuid(), order_id5, 'cancelled', NOW() - INTERVAL '14 days');
    END IF;
    
    -- Output success message
    RAISE NOTICE 'Successfully created test orders for users % and %', user_id1, user_id2;
END $$; 