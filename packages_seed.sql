-- Simple seed file for all service packages

-- Update table structure to add price and discounted_price columns if they don't exist
ALTER TABLE product_packages ADD COLUMN IF NOT EXISTS price DECIMAL(10,2);
ALTER TABLE product_packages ADD COLUMN IF NOT EXISTS discounted_price DECIMAL(10,2);

-- Clear existing data if needed
DELETE FROM product_package_items;
DELETE FROM product_packages;
ALTER SEQUENCE product_packages_id_seq RESTART WITH 1;

-- All service packages
INSERT INTO product_packages (name, description, discount_percentage, is_featured, price, discounted_price)
VALUES
  -- YouTube Packages
  ('YouTube Starter Pack', 'Perfect for new channels with 100 Real Subscribers', 0.00, false, 49.99, NULL),
  ('YouTube Growth Pack', 'Most popular choice with 500 Real Subscribers', 25.00, true, 199.99, 149.99),
  ('YouTube Premium Pack', 'For serious creators with 1000 Real Subscribers', 14.29, false, 349.99, 299.99),
  ('YouTube Basic Views', 'For new videos with 1000 Views', 0.00, false, 29.99, NULL),
  ('YouTube Popular Views', 'Most popular choice with 5000 Views', 20.00, true, 99.99, 79.99),
  ('YouTube Viral Views', 'Maximum exposure with 10000 Views', 16.67, false, 179.99, 149.99),
  ('YouTube Basic Likes', 'For new videos with 100 Real Likes', 0.00, false, 19.99, NULL),
  ('YouTube Popular Likes', 'Most popular choice with 500 Real Likes', 25.00, true, 79.99, 59.99),
  ('YouTube Viral Likes', 'Maximum engagement with 1000 Real Likes', 13.33, false, 149.99, 129.99),
  ('YouTube Basic Comments', 'For new videos with 10 Custom Comments', 0.00, false, 29.99, NULL),
  ('YouTube Popular Comments', 'Most popular choice with 25 Custom Comments', 28.57, true, 69.99, 49.99),
  ('YouTube Viral Comments', 'Maximum engagement with 50 Custom Comments', 23.08, false, 129.99, 99.99),
  ('YouTube Basic Hours', 'For new channels with 1000 Watch Hours', 0.00, false, 199.99, NULL),
  ('YouTube Popular Hours', 'Most popular choice with 2000 Watch Hours', 14.29, true, 349.99, 299.99),
  ('YouTube Monetization Pack', 'Complete monetization with 4000 Watch Hours', 16.67, true, 599.99, 499.99),
  
  -- Instagram Packages
  ('Instagram Starter Pack', 'For new accounts with 100 Real Followers', 0.00, false, 39.99, NULL),
  ('Instagram Growth Pack', 'Most popular choice with 500 Real Followers', 13.33, true, 149.99, 129.99),
  ('Instagram Premium Pack', 'For serious influencers with 1000 Real Followers', 20.00, false, 249.99, 199.99),
  -- Instagram Likes
  ('Instagram Basic Likes', 'For new posts with 100 Real Likes', 0.00, false, 19.99, NULL),
  ('Instagram Popular Likes', 'Most popular choice with 500 Real Likes', 25.00, true, 79.99, 59.99),
  ('Instagram Viral Likes', 'Maximum engagement with 1000 Real Likes', 13.33, false, 149.99, 129.99),
  -- Instagram Views
  ('Instagram Basic Views', 'For new reels with 1000 Views', 0.00, false, 29.99, NULL),
  ('Instagram Popular Views', 'Most popular choice with 5000 Views', 20.00, true, 99.99, 79.99),
  ('Instagram Viral Views', 'Maximum exposure with 10000 Views', 16.67, false, 179.99, 149.99),
  -- Instagram Comments
  ('Instagram Basic Comments', 'For new posts with 10 Custom Comments', 0.00, false, 29.99, NULL),
  ('Instagram Popular Comments', 'Most popular choice with 25 Custom Comments', 28.57, true, 69.99, 49.99),
  ('Instagram Viral Comments', 'Maximum engagement with 50 Custom Comments', 23.08, false, 129.99, 99.99),
  
  -- Facebook Packages
  ('Facebook Starter Pack', 'For new pages with 100 Real Followers', 0.00, false, 39.99, NULL),
  ('Facebook Growth Pack', 'Most popular choice with 500 Real Followers', 13.33, true, 149.99, 129.99),
  ('Facebook Premium Pack', 'Maximum exposure with 1000 Real Followers', 20.00, false, 249.99, 199.99),
  -- Facebook Post Likes
  ('Facebook Basic Likes', 'For new posts with 100 Real Likes', 0.00, false, 19.99, NULL),
  ('Facebook Popular Likes', 'Most popular choice with 500 Real Likes', 25.00, true, 79.99, 59.99),
  ('Facebook Viral Likes', 'Maximum engagement with 1000 Real Likes', 13.33, false, 149.99, 129.99),
  -- Facebook Page Likes
  ('Facebook Basic Page Likes', 'For new pages with 100 Page Likes', 0.00, false, 29.99, NULL),
  ('Facebook Popular Page Likes', 'Most popular choice with 500 Page Likes', 20.00, true, 99.99, 79.99),
  ('Facebook Premium Page Likes', 'Maximum credibility with 1000 Page Likes', 16.67, false, 179.99, 149.99),
  
  -- LinkedIn Packages
  ('LinkedIn Starter Followers', 'For new profiles with 100 Real Followers', 0.00, false, 49.99, NULL),
  ('LinkedIn Growth Followers', 'Most popular choice with 500 Real Followers', 20.00, true, 199.99, 159.99),
  ('LinkedIn Premium Followers', 'Professional networking boost with 1000 Followers', 16.67, false, 299.99, 249.99),
  -- LinkedIn Likes
  ('LinkedIn Basic Likes', 'For new posts with 50 Real Likes', 0.00, false, 29.99, NULL),
  ('LinkedIn Popular Likes', 'Most popular choice with 100 Real Likes', 16.67, true, 59.99, 49.99),
  ('LinkedIn Premium Likes', 'Maximum engagement with 500 Real Likes', 20.00, false, 149.99, 119.99),
  
  -- Google Review Packages
  ('Google Starter Pack', 'For new businesses with 5 Verified Reviews', 0.00, false, 199.99, NULL),
  ('Google Popular Pack', 'Most popular choice with 10 Verified Reviews', 14.29, true, 349.99, 299.99),
  ('Google Premium Pack', 'Maximum impact with 20 Verified Reviews', 16.67, false, 599.99, 499.99),
  ('Google Basic Management', 'For small businesses with Monthly Review Monitoring', 0.00, false, 299.99, NULL),
  ('Google Professional Management', 'Most popular choice with Weekly Review Monitoring', 10.00, true, 499.99, 449.99),
  ('Google Premium Management', 'Complete reputation solution with Daily Review Monitoring', 12.50, false, 799.99, 699.99),
  
  -- Trustpilot Packages
  ('Trustpilot Starter Pack', 'For new businesses with 5 Verified Reviews', 0.00, false, 249.99, NULL),
  ('Trustpilot Popular Pack', 'Most popular choice with 10 Verified Reviews', 11.11, true, 449.99, 399.99),
  ('Trustpilot Premium Pack', 'Maximum impact with 20 Verified Reviews', 12.50, false, 799.99, 699.99),
  ('Trustpilot Basic Solution', 'For small businesses with Monthly Review Management', 0.00, false, 399.99, NULL),
  ('Trustpilot Professional Solution', 'Most popular choice with Weekly Review Management', 14.29, true, 699.99, 599.99),
  ('Trustpilot Premium Solution', 'Complete Trustpilot solution with Daily Review Management', 10.00, false, 999.99, 899.99),
  
  -- Twitter Packages
  ('Twitter Starter Pack', 'For new accounts with 100 Real Followers', 0.00, false, 39.99, NULL),
  ('Twitter Growth Pack', 'Most popular choice with 500 Real Followers', 10.00, true, 149.99, 134.99),
  ('Twitter Premium Pack', 'For serious influencers with 1000 Real Followers', 15.00, false, 249.99, 212.49),
  -- Twitter Likes
  ('Twitter Basic Likes', 'For new tweets with 100 Real Likes', 0.00, false, 19.99, NULL),
  ('Twitter Popular Likes', 'Most popular choice with 500 Real Likes', 25.00, true, 79.99, 59.99),
  ('Twitter Viral Likes', 'Maximum engagement with 1000 Real Likes', 13.33, false, 149.99, 129.99),
  -- Twitter Retweets
  ('Twitter Basic Retweets', 'For new tweets with 100 Retweets', 0.00, false, 29.99, NULL),
  ('Twitter Popular Retweets', 'Most popular choice with 250 Retweets', 16.67, true, 59.99, 49.99),
  ('Twitter Viral Retweets', 'Maximum reach with 500 Retweets', 20.00, false, 99.99, 79.99);

-- Use the SELECT statement below to check the IDs of the packages
-- SELECT id, name, price, discounted_price FROM product_packages ORDER BY id; 