-- Service Packages Data for Supabase
-- This file contains all the service packages currently in the frontend

-- Clear existing data first (optional, uncomment if needed)
-- DELETE FROM product_package_items;
-- DELETE FROM product_packages;
-- ALTER SEQUENCE product_packages_id_seq RESTART WITH 1;

-- YouTube Service Packages
INSERT INTO product_packages (name, description, discount_percentage, is_featured)
VALUES
  -- YouTube Subscribers Packages
  ('YouTube Starter Pack', 'Perfect for new channels with 100 Real Subscribers. No password required with lifetime guarantee.', 0.00, false),
  ('YouTube Growth Pack', 'Most popular choice with 500 Real Subscribers. No password required with lifetime guarantee.', 25.00, true),
  ('YouTube Premium Pack', 'For serious creators with 1000 Real Subscribers. No password required with custom profile picture.', 14.29, false),
  
  -- YouTube Views Packages
  ('YouTube Basic Views', 'For new videos with 1000 Views. Real traffic with lifetime guarantee.', 0.00, false),
  ('YouTube Popular Views', 'Most popular choice with 5000 Views. Real traffic with priority delivery.', 20.00, true),
  ('YouTube Viral Views', 'Maximum exposure with 10000 Views. Real traffic with custom thumbnail.', 16.67, false),
  
  -- YouTube Likes Packages
  ('YouTube Basic Likes', 'For new videos with 100 Real Likes. No password required with lifetime guarantee.', 0.00, false),
  ('YouTube Popular Likes', 'Most popular choice with 500 Real Likes. No password required with priority delivery.', 25.00, true),
  ('YouTube Viral Likes', 'Maximum engagement with 1000 Real Likes. No password required with custom thumbnail.', 13.33, false),
  
  -- YouTube Comments Packages
  ('YouTube Basic Comments', 'For new videos with 10 Custom Comments. Real accounts with lifetime guarantee.', 0.00, false),
  ('YouTube Popular Comments', 'Most popular choice with 25 Custom Comments. Real accounts with priority delivery.', 28.57, true),
  ('YouTube Viral Comments', 'Maximum engagement with 50 Custom Comments. Real accounts with custom thumbnail.', 23.08, false),
  
  -- YouTube Watch Hours Packages
  ('YouTube Basic Hours', 'For new channels with 1000 Watch Hours. Real views with lifetime guarantee.', 0.00, false),
  ('YouTube Popular Hours', 'Most popular choice with 2000 Watch Hours. Real views with priority delivery.', 14.29, true),
  ('YouTube Monetization Pack', 'Complete monetization with 4000 Watch Hours. Real views with channel analysis.', 16.67, true);

-- Instagram Service Packages
INSERT INTO product_packages (name, description, discount_percentage, is_featured)
VALUES
  -- Instagram Followers Packages
  ('Instagram Starter Pack', 'For new accounts with 100 Real Followers. No password required with lifetime guarantee.', 0.00, false),
  ('Instagram Growth Pack', 'Most popular choice with 500 Real Followers. No password required with priority delivery.', 13.33, true),
  ('Instagram Premium Pack', 'For serious influencers with 1000 Real Followers. No password required with custom bio.', 20.00, false);

-- Facebook Service Packages
INSERT INTO product_packages (name, description, discount_percentage, is_featured)
VALUES
  -- Facebook Followers Packages
  ('Facebook Starter Pack', 'For new pages with 100 Real Followers. No password required with lifetime guarantee.', 0.00, false),
  ('Facebook Growth Pack', 'Most popular choice with 500 Real Followers. No password required with priority delivery.', 13.33, true),
  ('Facebook Premium Pack', 'Maximum exposure with 1000 Real Followers. No password required with custom cover photo.', 20.00, false),
  
  -- Facebook Post Likes Packages
  ('Facebook Basic Likes', 'For new posts with 100 Real Likes. No password required with lifetime guarantee.', 0.00, false),
  ('Facebook Popular Likes', 'Most popular choice with 500 Real Likes. No password required with priority delivery.', 25.00, true),
  ('Facebook Viral Likes', 'Maximum engagement with 1000 Real Likes. No password required with custom hashtags.', 13.33, false);

-- Google Review Packages
INSERT INTO product_packages (name, description, discount_percentage, is_featured)
VALUES
  -- Google Reviews Packages
  ('Google Starter Pack', 'For new businesses with 5 Verified Reviews. Real Google accounts with custom review content.', 0.00, false),
  ('Google Popular Pack', 'Most popular choice with 10 Verified Reviews. Real Google accounts with priority delivery.', 14.29, true),
  ('Google Premium Pack', 'Maximum impact with 20 Verified Reviews. Real Google accounts with review management.', 16.67, false),
  
  -- Google Reputation Management
  ('Google Basic Management', 'For small businesses with Monthly Review Monitoring. Includes rating improvement plan and basic analytics.', 0.00, false),
  ('Google Professional Management', 'Most popular choice with Weekly Review Monitoring. Includes detailed analytics and review generation strategy.', 10.00, true),
  ('Google Premium Management', 'Complete reputation solution with Daily Review Monitoring. Includes advanced analytics and crisis management.', 12.50, false);

-- Trustpilot Review Packages
INSERT INTO product_packages (name, description, discount_percentage, is_featured)
VALUES
  -- Trustpilot Reviews Packages
  ('Trustpilot Starter Pack', 'For new businesses with 5 Verified Reviews. Real Trustpilot accounts with custom review content.', 0.00, false),
  ('Trustpilot Popular Pack', 'Most popular choice with 10 Verified Reviews. Real Trustpilot accounts with priority delivery.', 11.11, true),
  ('Trustpilot Premium Pack', 'Maximum impact with 20 Verified Reviews. Real Trustpilot accounts with review management.', 12.50, false),
  
  -- Trustpilot Custom Solutions
  ('Trustpilot Basic Solution', 'For small businesses with Monthly Review Management. Includes TrustScore improvement plan and basic analytics.', 0.00, false),
  ('Trustpilot Professional Solution', 'Most popular choice with Weekly Review Management. Includes detailed analytics and review generation strategy.', 14.29, true),
  ('Trustpilot Premium Solution', 'Complete Trustpilot solution with Daily Review Management. Includes advanced analytics and crisis management.', 10.00, false);

-- Twitter Service Packages
INSERT INTO product_packages (name, description, discount_percentage, is_featured)
VALUES
  -- Twitter Followers Packages
  ('Twitter Starter Pack', 'For new accounts with 100 Real Followers. No password required with lifetime guarantee.', 0.00, false),
  ('Twitter Growth Pack', 'Most popular choice with 500 Real Followers. No password required with priority delivery.', 10.00, true),
  ('Twitter Premium Pack', 'For serious influencers with 1000 Real Followers. No password required with custom profile info.', 15.00, false);

-- Additional information for reference (Actual Product Pricing from Frontend):
-- 
-- YouTube Subscribers: Starter($49.99), Growth($199.99→$149.99), Premium($349.99→$299.99)
-- YouTube Views: Basic($29.99), Popular($99.99→$79.99), Viral($179.99→$149.99)
-- YouTube Likes: Basic($19.99), Popular($79.99→$59.99), Viral($149.99→$129.99)
-- YouTube Comments: Basic($29.99), Popular($69.99→$49.99), Viral($129.99→$99.99)
-- YouTube Watch Hours: Basic($199.99), Popular($349.99→$299.99), Monetization($599.99→$499.99)
-- 
-- Instagram Followers: Starter($39.99), Growth($149.99→$129.99), Premium($249.99→$199.99)
-- 
-- Facebook Followers: Starter($39.99), Growth($149.99→$129.99), Premium($249.99→$199.99)
-- Facebook Post Likes: Basic($19.99), Popular($79.99→$59.99), Viral($149.99→$129.99)
-- 
-- Google Reviews: Starter($199.99), Popular($349.99→$299.99), Premium($599.99→$499.99)
-- Google Reputation: Basic($299.99), Professional($499.99→$449.99), Premium($799.99→$699.99)
-- 
-- Trustpilot Reviews: Starter($249.99), Popular($449.99→$399.99), Premium($799.99→$699.99)
-- Trustpilot Solutions: Basic($399.99), Professional($699.99→$599.99), Premium($999.99→$899.99)

-- Note: Once products are properly set up in your database, 
-- you'll need to link them to these packages using the product_package_items table.
-- Example:
-- INSERT INTO product_package_items (package_id, product_id, quantity)
-- VALUES
--   (1, {youtube_subscribers_product_id}, 1),  -- 100 subscribers
--   (2, {youtube_subscribers_product_id}, 5),  -- 500 subscribers 
--   (3, {youtube_subscribers_product_id}, 10); -- 1000 subscribers 