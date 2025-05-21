-- Step 1: Create packages table if it doesn't exist
CREATE TABLE IF NOT EXISTS packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  discounted_price DECIMAL(10, 2),
  delivery_time VARCHAR(100),
  is_popular BOOLEAN DEFAULT false,
  slug VARCHAR(255) UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Step 2: Create package_descriptions table if it doesn't exist
CREATE TABLE IF NOT EXISTS package_descriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id UUID NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  long_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Step 3: Create package_features table if it doesn't exist
CREATE TABLE IF NOT EXISTS package_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id UUID NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  feature TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Step 4: Populate packages table with sample data
INSERT INTO packages (id, name, price, discounted_price, delivery_time, is_popular, slug)
VALUES
  ('6e3c944d-f30d-4f2d-b86c-4a048d3d6127', 'Starter Package', 99.00, 79.00, '2-3 days', true, 'starter-package'),
  ('f7c7fc75-3b8b-4f33-a1c6-9b2f2c735497', 'Advanced Package', 199.00, 159.00, '3-5 days', true, 'advanced-package'),
  ('c5b4e9a8-4d90-45b1-8e7a-70b812f4e9b7', 'Professional Package', 299.00, 249.00, '5-7 days', false, 'professional-package'),
  ('a8c6b7d5-f2e1-48c9-b4d3-e7f8a9c1b2d3', 'Enterprise Package', 499.00, 399.00, '7-10 days', false, 'enterprise-package'),
  ('d2e3f4a5-b6c7-48d9-a1b2-c3d4e5f6a7b8', 'Custom Solution', 999.00, NULL, 'Custom timeline', false, 'custom-solution');

-- Step 5: Populate package_descriptions table with sample data
INSERT INTO package_descriptions (package_id, description, long_description)
VALUES
  ('6e3c944d-f30d-4f2d-b86c-4a048d3d6127', 
   'Perfect for individuals and small businesses just getting started with social media presence.', 
   'Our Starter Package is designed for individuals and small businesses looking to establish a basic social media presence. This affordable option provides essential features to get you started on your digital journey. With quick delivery and fundamental tools, you can begin building your online community right away.'),
  
  ('f7c7fc75-3b8b-4f33-a1c6-9b2f2c735497', 
   'Ideal for growing businesses that need more robust social media management tools.', 
   'The Advanced Package caters to growing businesses with established social media accounts looking to expand their reach. This package includes everything in the Starter Package plus additional features to enhance engagement and grow your audience. With more comprehensive analytics and engagement tools, you can take your social media strategy to the next level.'),
  
  ('c5b4e9a8-4d90-45b1-8e7a-70b812f4e9b7', 
   'Comprehensive solution for established businesses seeking professional-grade tools and analytics.', 
   'Our Professional Package is built for established businesses that require sophisticated social media management capabilities. This solution includes all features from the Advanced Package with added premium tools for enhanced audience targeting, content scheduling, and performance analytics. Perfect for businesses serious about maximizing their social media impact and ROI.'),
  
  ('a8c6b7d5-f2e1-48c9-b4d3-e7f8a9c1b2d3', 
   'Full-suite enterprise solution with advanced features, priority support, and customization options.', 
   'The Enterprise Package is our premium offering for large organizations and businesses with complex social media requirements. This comprehensive solution includes all available features plus dedicated account management, priority support, and customizable reporting options. Designed for businesses that demand the highest level of service and capability for managing multiple social media accounts across various platforms.'),
  
  ('d2e3f4a5-b6c7-48d9-a1b2-c3d4e5f6a7b8', 
   'Tailored solutions designed to meet your specific business requirements and objectives.', 
   'Our Custom Solution is exclusively crafted for businesses with specialized needs that go beyond our standard packages. We work closely with you to understand your unique requirements and develop a tailored approach that aligns with your business objectives. This option includes personalized feature sets, custom integrations, and a dedicated team to ensure your social media strategy is perfectly aligned with your goals.');

-- Step 6: Populate package_features table with sample data
INSERT INTO package_features (package_id, feature)
VALUES
  -- Starter Package Features
  ('6e3c944d-f30d-4f2d-b86c-4a048d3d6127', 'Basic social media account setup'),
  ('6e3c944d-f30d-4f2d-b86c-4a048d3d6127', '10 social media posts per month'),
  ('6e3c944d-f30d-4f2d-b86c-4a048d3d6127', 'Monthly performance report'),
  ('6e3c944d-f30d-4f2d-b86c-4a048d3d6127', 'Community management (comments & messages)'),
  
  -- Advanced Package Features
  ('f7c7fc75-3b8b-4f33-a1c6-9b2f2c735497', 'Everything in Starter Package'),
  ('f7c7fc75-3b8b-4f33-a1c6-9b2f2c735497', '20 social media posts per month'),
  ('f7c7fc75-3b8b-4f33-a1c6-9b2f2c735497', 'Content calendar planning'),
  ('f7c7fc75-3b8b-4f33-a1c6-9b2f2c735497', 'Bi-weekly performance reports'),
  ('f7c7fc75-3b8b-4f33-a1c6-9b2f2c735497', 'Competitor analysis'),
  
  -- Professional Package Features
  ('c5b4e9a8-4d90-45b1-8e7a-70b812f4e9b7', 'Everything in Advanced Package'),
  ('c5b4e9a8-4d90-45b1-8e7a-70b812f4e9b7', '30 social media posts per month'),
  ('c5b4e9a8-4d90-45b1-8e7a-70b812f4e9b7', 'Social media advertising setup & management'),
  ('c5b4e9a8-4d90-45b1-8e7a-70b812f4e9b7', 'Advanced analytics dashboard'),
  ('c5b4e9a8-4d90-45b1-8e7a-70b812f4e9b7', 'Weekly performance reports'),
  ('c5b4e9a8-4d90-45b1-8e7a-70b812f4e9b7', 'Influencer outreach strategy'),
  
  -- Enterprise Package Features
  ('a8c6b7d5-f2e1-48c9-b4d3-e7f8a9c1b2d3', 'Everything in Professional Package'),
  ('a8c6b7d5-f2e1-48c9-b4d3-e7f8a9c1b2d3', 'Unlimited social media posts'),
  ('a8c6b7d5-f2e1-48c9-b4d3-e7f8a9c1b2d3', 'Dedicated account manager'),
  ('a8c6b7d5-f2e1-48c9-b4d3-e7f8a9c1b2d3', 'Priority support'),
  ('a8c6b7d5-f2e1-48c9-b4d3-e7f8a9c1b2d3', 'Custom reporting'),
  ('a8c6b7d5-f2e1-48c9-b4d3-e7f8a9c1b2d3', 'Crisis management protocol'),
  ('a8c6b7d5-f2e1-48c9-b4d3-e7f8a9c1b2d3', 'Social media strategy consultation'),
  
  -- Custom Solution Features
  ('d2e3f4a5-b6c7-48d9-a1b2-c3d4e5f6a7b8', 'Fully customized feature set'),
  ('d2e3f4a5-b6c7-48d9-a1b2-c3d4e5f6a7b8', 'Tailored social media strategy'),
  ('d2e3f4a5-b6c7-48d9-a1b2-c3d4e5f6a7b8', 'Integration with existing marketing systems'),
  ('d2e3f4a5-b6c7-48d9-a1b2-c3d4e5f6a7b8', 'Custom API development if needed'),
  ('d2e3f4a5-b6c7-48d9-a1b2-c3d4e5f6a7b8', 'Enterprise-grade security measures'),
  ('d2e3f4a5-b6c7-48d9-a1b2-c3d4e5f6a7b8', 'Dedicated development and support team'); 