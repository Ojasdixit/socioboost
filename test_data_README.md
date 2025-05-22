# Test Data for SocialBoost

This directory contains scripts to create test users and orders for the SocialBoost application.

## Available Scripts

1. `create_test_users.js` - Creates test users through the Supabase API
2. `test_data.sql` - Comprehensive SQL script to create test users and orders (direct database access required)
3. `test_orders_simple.sql` - Simplified SQL script to create test orders for existing users

## Setup Instructions

### Option 1: Creating Test Users with JavaScript (Recommended)

This approach uses the Supabase API to create users properly through the authentication system.

1. Make sure you have Node.js installed
2. Create a `.env` file in the project root with the following variables:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```
3. Install dependencies:
   ```
   npm install @supabase/supabase-js dotenv
   ```
4. Run the script:
   ```
   node create_test_users.js
   ```

This will create three test users:
- testuser1@example.com (password: Password123!)
- testuser2@example.com (password: Password123!)
- admin@example.com (password: AdminPass123!)

The script will also create corresponding profile entries and save the user IDs to `test_user_ids.json`.

### Option 2: Creating Test Orders Only (For Existing Users)

If you already have users in your system and just want to create test orders:

1. Connect to your Supabase database using psql or the Supabase SQL Editor
2. Run the `test_orders_simple.sql` script:
   ```sql
   -- In psql
   \i test_orders_simple.sql
   
   -- Or copy-paste the script into the Supabase SQL Editor
   ```

This script will:
- Find existing users in your system
- Create test orders and order items for those users
- Create order status history entries

### Option 3: Complete Test Data Setup (Advanced)

If you have direct database access and want to set up everything at once:

1. Connect to your Supabase database using psql or the Supabase SQL Editor
2. Run the `test_data.sql` script:
   ```sql
   -- In psql
   \i test_data.sql
   
   -- Or copy-paste the script into the Supabase SQL Editor
   ```

**Note:** This approach bypasses the authentication system and may not work correctly with Supabase Auth. Use Option 1 if possible.

## Test Data Overview

The test data includes:

- 3 test users with different roles
- 5 orders with various statuses (pending, in_progress, completed, cancelled)
- Order items linked to product packages
- Order status history showing the progression of orders

## Customization

You can modify any of the scripts to adjust:
- User details (names, emails, passwords)
- Order details (amounts, statuses, dates)
- Product packages used in orders (adjust package IDs as needed)

## Troubleshooting

If you encounter errors:

1. For SQL errors related to package IDs:
   - Check the actual IDs in your `product_packages` table
   - Update the hardcoded IDs in the SQL scripts to match your data

2. For Supabase API errors:
   - Verify your environment variables are correct
   - Make sure you're using the service role key, not the anon key
   - Check if the users already exist (the script will fail for duplicate emails) 