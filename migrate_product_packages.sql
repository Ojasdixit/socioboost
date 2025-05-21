-- Step 1: Drop the incorrectly created tables
DROP TABLE IF EXISTS package_features CASCADE;
DROP TABLE IF EXISTS package_descriptions CASCADE;
DROP TABLE IF EXISTS packages CASCADE;

-- Step 2: Create product_packages table that links to products
CREATE TABLE IF NOT EXISTS product_packages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  discount_percentage DECIMAL(5, 2),
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Step 3: Create junction table to link products to packages
CREATE TABLE IF NOT EXISTS product_package_items (
  id SERIAL PRIMARY KEY,
  package_id INTEGER NOT NULL REFERENCES product_packages(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(package_id, product_id)
);

-- Step 4: Populate product_packages with sample data
INSERT INTO product_packages (name, description, discount_percentage, is_featured)
VALUES
  ('YouTube Starter Bundle', 'Get started with YouTube growth: subscribers, views and engagement in one package', 15.00, true),
  ('Instagram Growth Package', 'Boost your Instagram presence with followers, likes and comments', 10.00, true),
  ('Complete Social Media Bundle', 'Full-service package covering all major platforms', 20.00, false),
  ('Business Visibility Package', 'Perfect for businesses looking to increase online visibility', 12.50, true),
  ('Influencer Starter Kit', 'Essential services for budding influencers', 17.50, false);

-- Step 5: Add product items to packages (assuming products exist with these IDs)
-- You'll need to replace these IDs with actual product IDs from your database
INSERT INTO product_package_items (package_id, product_id, quantity)
VALUES
  -- YouTube Starter Bundle items (replace with actual product IDs)
  (1, 3, 1), -- YouTube subscribers
  (1, 4, 1), -- YouTube views
  (1, 5, 1), -- YouTube likes
  
  -- Instagram Growth Package items
  (2, 6, 1), -- Instagram followers
  (2, 7, 1), -- Instagram likes
  (2, 8, 1), -- Instagram comments
  
  -- Complete Social Media Bundle
  (3, 3, 1), -- YouTube subscribers
  (3, 6, 1), -- Instagram followers
  (3, 9, 1), -- Facebook page likes
  (3, 0, 1), -- Twitter followers
  
  -- Business Visibility Package
  (4, 1, 1), -- Google Reviews
  (4, 2, 1), -- Trustpilot reviews
  (4, 9, 1), -- Facebook page likes
  
  -- Influencer Starter Kit
  (5, 3, 1), -- YouTube subscribers
  (5, 6, 1), -- Instagram followers
  (5, 7, 1); -- Instagram likes

-- Step 6: Create a helper function to calculate package prices
CREATE OR REPLACE FUNCTION calculate_package_price(package_id INTEGER)
RETURNS DECIMAL AS $$
DECLARE
  total_price DECIMAL(10,2) := 0;
  discount_pct DECIMAL(5,2) := 0;
BEGIN
  -- Sum the prices of all products in the package
  SELECT SUM(p.price * ppi.quantity)
  INTO total_price
  FROM product_package_items ppi
  JOIN products p ON ppi.product_id = p.id
  WHERE ppi.package_id = package_id;
  
  -- Get the discount percentage
  SELECT discount_percentage 
  INTO discount_pct
  FROM product_packages
  WHERE id = package_id;
  
  -- Apply the discount
  IF discount_pct > 0 THEN
    total_price := total_price * (1 - (discount_pct / 100));
  END IF;
  
  RETURN total_price;
END;
$$ LANGUAGE plpgsql; 