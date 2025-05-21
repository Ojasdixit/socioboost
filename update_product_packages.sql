-- Run this query first to get actual product IDs from your database
-- SELECT id, name, price FROM products ORDER BY name;

-- Then replace the placeholder IDs below with the actual IDs from your products table
-- Here's an example of how to update the package items correctly:

-- First, clear any test data
DELETE FROM product_package_items;

-- Then, insert the package items with correct product IDs
-- Replace these IDs with actual IDs from your database
INSERT INTO product_package_items (package_id, product_id, quantity)
VALUES
  -- YouTube Starter Bundle items
  ('e1d8c5b7-a4f6-4932-8742-21f8e9f3b5a2', '82c918e7-5fe8-4e11-b8a2-2b76186ac34b', 1), -- Replace with your YouTube subscribers product ID
  ('e1d8c5b7-a4f6-4932-8742-21f8e9f3b5a2', 'f1d9a2b3-c4e5-6f7a-8b9c-0d1e2f3a4b5c', 1), -- Replace with your YouTube views product ID
  ('e1d8c5b7-a4f6-4932-8742-21f8e9f3b5a2', '3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f', 1), -- Replace with your YouTube likes product ID
  
  -- Instagram Growth Package items
  ('f2a9d6c8-b5e7-5043-9853-32f9f0a4c6b3', '5e6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b', 1), -- Replace with your Instagram followers product ID
  ('f2a9d6c8-b5e7-5043-9853-32f9f0a4c6b3', '7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d', 1), -- Replace with your Instagram likes product ID
  ('f2a9d6c8-b5e7-5043-9853-32f9f0a4c6b3', '9c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f', 1), -- Replace with your Instagram comments product ID
  
  -- Complete Social Media Bundle
  ('g3b0e7d9-c6f8-6154-0964-43g0a1b5d7c4', '82c918e7-5fe8-4e11-b8a2-2b76186ac34b', 1), -- Replace with your YouTube subscribers product ID
  ('g3b0e7d9-c6f8-6154-0964-43g0a1b5d7c4', '5e6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b', 1), -- Replace with your Instagram followers product ID
  ('g3b0e7d9-c6f8-6154-0964-43g0a1b5d7c4', 'b1c2d3e4-f5a6-b7c8-d9e0-f1a2b3c4d5e6', 1), -- Replace with your Facebook page likes product ID
  
  -- Business Visibility Package
  ('h4c1f8e0-d7g9-7265-1075-54h1b2c6e8d5', 'd3e4f5a6-b7c8-d9e0-f1a2-b3c4d5e6f7a8', 1), -- Replace with your Google Reviews product ID
  ('h4c1f8e0-d7g9-7265-1075-54h1b2c6e8d5', 'f5a6b7c8-d9e0-f1a2-b3c4-d5e6f7a8b9c0', 1), -- Replace with your Trustpilot reviews product ID
  ('h4c1f8e0-d7g9-7265-1075-54h1b2c6e8d5', 'b1c2d3e4-f5a6-b7c8-d9e0-f1a2b3c4d5e6', 1), -- Replace with your Facebook page likes product ID
  
  -- Influencer Starter Kit
  ('i5d2g9f1-e8h0-8376-2186-65i2c3d7f9e6', '82c918e7-5fe8-4e11-b8a2-2b76186ac34b', 1), -- Replace with your YouTube subscribers product ID
  ('i5d2g9f1-e8h0-8376-2186-65i2c3d7f9e6', '5e6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b', 1), -- Replace with your Instagram followers product ID
  ('i5d2g9f1-e8h0-8376-2186-65i2c3d7f9e6', '7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d', 1); -- Replace with your Instagram likes product ID 