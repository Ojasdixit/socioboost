-- Service Package Items Data for Supabase
-- This file provides a template for linking products to packages
-- Replace the product_id values with actual IDs from your products table

-- Clear existing data (optional, uncomment if needed)
-- DELETE FROM product_package_items;

-- YouTube Service Package Items
-- YouTube Subscribers Package Items
INSERT INTO product_package_items (package_id, product_id, quantity)
VALUES
  -- Assuming package_id 1 = YouTube Starter Pack, etc.
  -- Replace {youtube_subs_product_id} with the actual product ID from your database
  (1, {youtube_subs_product_id}, 1),  -- 100 subscribers
  (2, {youtube_subs_product_id}, 5),  -- 500 subscribers
  (3, {youtube_subs_product_id}, 10); -- 1000 subscribers

-- YouTube Views Package Items
INSERT INTO product_package_items (package_id, product_id, quantity)
VALUES
  -- Assuming package_id 4 = YouTube Basic Views, etc.
  -- Replace {youtube_views_product_id} with the actual product ID from your database
  (4, {youtube_views_product_id}, 1),   -- 1000 views
  (5, {youtube_views_product_id}, 5),   -- 5000 views
  (6, {youtube_views_product_id}, 10);  -- 10000 views

-- YouTube Likes Package Items
INSERT INTO product_package_items (package_id, product_id, quantity)
VALUES
  -- Assuming package_id 7 = YouTube Basic Likes, etc.
  -- Replace {youtube_likes_product_id} with the actual product ID from your database
  (7, {youtube_likes_product_id}, 1),   -- 100 likes
  (8, {youtube_likes_product_id}, 5),   -- 500 likes
  (9, {youtube_likes_product_id}, 10);  -- 1000 likes

-- YouTube Comments Package Items
INSERT INTO product_package_items (package_id, product_id, quantity)
VALUES
  -- Assuming package_id 10 = YouTube Basic Comments, etc.
  -- Replace {youtube_comments_product_id} with the actual product ID from your database
  (10, {youtube_comments_product_id}, 1),  -- 10 comments
  (11, {youtube_comments_product_id}, 2.5), -- 25 comments
  (12, {youtube_comments_product_id}, 5);  -- 50 comments

-- YouTube Watch Hours Package Items
INSERT INTO product_package_items (package_id, product_id, quantity)
VALUES
  -- Assuming package_id 13 = YouTube Basic Hours, etc.
  -- Replace {youtube_hours_product_id} with the actual product ID from your database
  (13, {youtube_hours_product_id}, 1),  -- 1000 watch hours
  (14, {youtube_hours_product_id}, 2),  -- 2000 watch hours
  (15, {youtube_hours_product_id}, 4);  -- 4000 watch hours

-- Instagram Service Package Items
-- Instagram Followers Package Items
INSERT INTO product_package_items (package_id, product_id, quantity)
VALUES
  -- Assuming package_id 16 = Instagram Starter Pack, etc.
  -- Replace {instagram_followers_product_id} with the actual product ID from your database
  (16, {instagram_followers_product_id}, 1),   -- 100 followers
  (17, {instagram_followers_product_id}, 5),   -- 500 followers
  (18, {instagram_followers_product_id}, 10);  -- 1000 followers

-- Facebook Service Package Items
-- Facebook Followers Package Items
INSERT INTO product_package_items (package_id, product_id, quantity)
VALUES
  -- Assuming package_id 19 = Facebook Starter Pack, etc.
  -- Replace {facebook_followers_product_id} with the actual product ID from your database
  (19, {facebook_followers_product_id}, 1),   -- 100 followers
  (20, {facebook_followers_product_id}, 5),   -- 500 followers
  (21, {facebook_followers_product_id}, 10);  -- 1000 followers

-- Facebook Post Likes Package Items
INSERT INTO product_package_items (package_id, product_id, quantity)
VALUES
  -- Assuming package_id 22 = Facebook Basic Likes, etc.
  -- Replace {facebook_likes_product_id} with the actual product ID from your database
  (22, {facebook_likes_product_id}, 1),   -- 100 likes
  (23, {facebook_likes_product_id}, 5),   -- 500 likes
  (24, {facebook_likes_product_id}, 10);  -- 1000 likes

-- Google Reviews Package Items
-- Google Reviews Package Items
INSERT INTO product_package_items (package_id, product_id, quantity)
VALUES
  -- Assuming package_id 25 = Google Starter Pack, etc.
  -- Replace {google_reviews_product_id} with the actual product ID from your database
  (25, {google_reviews_product_id}, 5),   -- 5 reviews
  (26, {google_reviews_product_id}, 10),  -- 10 reviews
  (27, {google_reviews_product_id}, 20);  -- 20 reviews

-- Google Reputation Management Package Items (this may involve multiple products)
INSERT INTO product_package_items (package_id, product_id, quantity)
VALUES
  -- Assuming package_id 28 = Google Basic Management, etc.
  -- Replace {google_reputation_product_id} with the actual product ID from your database
  (28, {google_reputation_product_id}, 1),  -- Basic management
  (29, {google_reputation_product_id}, 1),  -- Professional management
  (30, {google_reputation_product_id}, 1);  -- Premium management

-- Trustpilot Reviews Package Items
-- Trustpilot Reviews Package Items
INSERT INTO product_package_items (package_id, product_id, quantity)
VALUES
  -- Assuming package_id 31 = Trustpilot Starter Pack, etc.
  -- Replace {trustpilot_reviews_product_id} with the actual product ID from your database
  (31, {trustpilot_reviews_product_id}, 5),   -- 5 reviews
  (32, {trustpilot_reviews_product_id}, 10),  -- 10 reviews
  (33, {trustpilot_reviews_product_id}, 20);  -- 20 reviews

-- Trustpilot Custom Solutions Package Items (this may involve multiple products)
INSERT INTO product_package_items (package_id, product_id, quantity)
VALUES
  -- Assuming package_id 34 = Trustpilot Basic Solution, etc.
  -- Replace {trustpilot_custom_product_id} with the actual product ID from your database
  (34, {trustpilot_custom_product_id}, 1),  -- Basic solution
  (35, {trustpilot_custom_product_id}, 1),  -- Professional solution
  (36, {trustpilot_custom_product_id}, 1);  -- Premium solution

-- Twitter Service Package Items
-- Twitter Followers Package Items
INSERT INTO product_package_items (package_id, product_id, quantity)
VALUES
  -- Assuming package_id 37 = Twitter Starter Pack, etc.
  -- Replace {twitter_followers_product_id} with the actual product ID from your database
  (37, {twitter_followers_product_id}, 1),   -- 100 followers
  (38, {twitter_followers_product_id}, 5),   -- 500 followers
  (39, {twitter_followers_product_id}, 10);  -- 1000 followers

-- Note: You'll need to update the package_id values to match the actual IDs
-- generated when you insert the packages into the product_packages table.
-- Similarly, you'll need to replace the product_id placeholders with the
-- actual IDs from your products table. 