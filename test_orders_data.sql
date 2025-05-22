-- Sample data for orders management testing
-- This script inserts test orders and related data into the database

-- Function to get a random user ID from existing users
CREATE OR REPLACE FUNCTION get_random_user_id() 
RETURNS UUID AS $$
DECLARE
  user_id UUID;
BEGIN
  SELECT id INTO user_id FROM auth.users ORDER BY RANDOM() LIMIT 1;
  RETURN user_id;
EXCEPTION
  WHEN NO_DATA_FOUND THEN
    -- If no users exist, return NULL
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Function to get a random package ID from existing packages
CREATE OR REPLACE FUNCTION get_random_package_id() 
RETURNS INTEGER AS $$
DECLARE
  package_id INTEGER;
BEGIN
  SELECT id INTO package_id FROM product_packages ORDER BY RANDOM() LIMIT 1;
  RETURN package_id;
EXCEPTION
  WHEN NO_DATA_FOUND THEN
    -- If no packages exist, return a default value
    RETURN 1;
END;
$$ LANGUAGE plpgsql;

-- Insert sample orders
DO $$
DECLARE
  user_id UUID;
  order_id UUID;
  package_id INTEGER;
  service_types TEXT[] := ARRAY['youtube', 'instagram', 'facebook', 'twitter', 'trustpilot', 'google-reviews'];
  service_ids TEXT[] := ARRAY['subscribers', 'views', 'likes', 'followers', 'comments', 'page-likes', 'positive', 'custom'];
  statuses TEXT[] := ARRAY['pending', 'in_progress', 'completed', 'cancelled'];
  i INTEGER;
  j INTEGER;
  num_items INTEGER;
  item_price DECIMAL;
  total_amount DECIMAL;
  random_service_type TEXT;
  random_service_id TEXT;
  random_status TEXT;
BEGIN
  -- Create 10 sample orders
  FOR i IN 1..10 LOOP
    -- Get a random user ID
    user_id := get_random_user_id();
    
    -- Skip if no users exist
    CONTINUE WHEN user_id IS NULL;
    
    -- Generate a random number of items (1-3)
    num_items := floor(random() * 3) + 1;
    
    -- Initialize total amount
    total_amount := 0;
    
    -- Generate a random status
    random_status := statuses[floor(random() * array_length(statuses, 1)) + 1];
    
    -- Insert the order
    INSERT INTO orders (id, user_id, total_amount, status, payment_status, created_at, updated_at)
    VALUES (
      uuid_generate_v4(),
      user_id,
      0, -- Will update this after calculating items
      random_status,
      CASE WHEN random_status = 'completed' THEN 'paid' ELSE 'pending' END,
      now() - (floor(random() * 30) || ' days')::INTERVAL, -- Random date within last 30 days
      now()
    )
    RETURNING id INTO order_id;
    
    -- Insert order items
    FOR j IN 1..num_items LOOP
      -- Get a random package ID
      package_id := get_random_package_id();
      
      -- Generate random price between 20 and 200
      item_price := (floor(random() * 180) + 20)::DECIMAL;
      
      -- Add to total amount
      total_amount := total_amount + item_price;
      
      -- Get random service type and ID
      random_service_type := service_types[floor(random() * array_length(service_types, 1)) + 1];
      random_service_id := service_ids[floor(random() * array_length(service_ids, 1)) + 1];
      
      -- Insert the order item
      INSERT INTO order_items (id, order_id, package_id, quantity, price, service_type, service_id, service_url)
      VALUES (
        uuid_generate_v4(),
        order_id,
        package_id,
        1, -- Default quantity
        item_price,
        random_service_type,
        random_service_id,
        CASE 
          WHEN random_service_type = 'youtube' THEN 'https://www.youtube.com/watch?v=example' 
          WHEN random_service_type = 'instagram' THEN 'https://www.instagram.com/p/example/'
          WHEN random_service_type = 'facebook' THEN 'https://www.facebook.com/example'
          WHEN random_service_type = 'twitter' THEN 'https://twitter.com/example'
          ELSE NULL
        END
      );
    END LOOP;
    
    -- Update the order with the calculated total amount
    UPDATE orders SET total_amount = total_amount WHERE id = order_id;
    
    -- Insert order status history
    INSERT INTO order_status_history (id, order_id, status, created_at)
    VALUES (
      uuid_generate_v4(),
      order_id,
      'pending',
      now() - (floor(random() * 30) || ' days')::INTERVAL
    );
    
    -- If status is not pending, add additional status history entries
    IF random_status != 'pending' THEN
      INSERT INTO order_status_history (id, order_id, status, created_at)
      VALUES (
        uuid_generate_v4(),
        order_id,
        'in_progress',
        now() - (floor(random() * 15) || ' days')::INTERVAL
      );
      
      IF random_status = 'completed' OR random_status = 'cancelled' THEN
        INSERT INTO order_status_history (id, order_id, status, created_at)
        VALUES (
          uuid_generate_v4(),
          order_id,
          random_status,
          now() - (floor(random() * 5) || ' days')::INTERVAL
        );
      END IF;
    END IF;
    
  END LOOP;
END $$;

-- Clean up temporary functions
DROP FUNCTION IF EXISTS get_random_user_id();
DROP FUNCTION IF EXISTS get_random_package_id();

-- Output confirmation
SELECT 'Sample orders data has been inserted successfully.' as message; 