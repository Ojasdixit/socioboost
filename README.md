# Connect Influence Pro

## Overview

Connect Influence Pro is a platform designed to help grow social media presence and influence through various services.

## Project 

A comprehensive social media growth platform offering customized packages for different social media platforms.

## How can I edit this code?

There are several ways of editing this application.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase

## Database Setup

This project uses Supabase as the backend database. Follow these steps to set up the necessary database tables:

### Setting up Orders Management Tables

1. Log in to your Supabase dashboard
2. Navigate to the SQL Editor
3. Execute the SQL script in `create_orders_tables.sql` to create the required tables:
   - `orders` - Stores main order information
   - `order_items` - Stores individual items in each order
   - `order_status_history` - Tracks status changes for orders

### Adding Test Data

To populate the database with test data for development:

1. First, ensure you have created the necessary tables using the script above
2. Execute the SQL script in `test_orders_data.sql` to add sample orders data
3. Visit the `/debug` route in the application to verify the database setup

### Troubleshooting Database Issues

If you encounter issues with the orders functionality:

1. Check the database connection settings in `src/lib/supabase.ts`
2. Verify that all required tables exist in your Supabase project
3. Use the Debug page (`/debug` route) to inspect database structure and table contents

## How can I deploy this project?

You can deploy this project on any platform that supports static sites:

1. Build the project using `npm run build`
2. Deploy the resulting `dist` folder to your preferred hosting provider
3. Configure environment variables as needed

## Can I connect a custom domain to my project?

Yes, you can connect your custom domain through your hosting provider's settings.

# SocialBoost - Social Media Growth Platform

## Database Setup

This application requires several database tables to function properly. If you encounter errors related to database connectivity or missing tables, follow these steps:

1. Make sure your Supabase credentials are correctly set up in `src/lib/supabase.ts`
2. Navigate to the Debug Page at `/debug` in the application
3. Click on "Create Orders Tables" to set up the required database tables
4. Optionally, click on "Add Sample Orders Data" to populate the database with test data

### Required Database Functions

The application requires the `exec_sql` function to be available in your Supabase project. If you're setting up a new Supabase project, you'll need to create this function via the SQL editor:

```sql
-- Create the exec_sql function to execute arbitrary SQL
-- This function requires admin privileges to run
CREATE OR REPLACE FUNCTION exec_sql(sql text)
RETURNS void AS $$
BEGIN
  EXECUTE sql;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Database Tables

The following tables are required for order management:

1. `orders` - Stores main order information
2. `order_items` - Stores individual items in each order
3. `order_status_history` - Tracks status changes for orders

### Forcing Recreation of Database Tables

If you need to completely recreate the database tables (deleting existing data), there are several options:

#### Using the Debug Page

1. Navigate to the Debug Page at `/debug`
2. Click the "Force Recreate Orders Tables" button (red button)
3. This will drop all existing order tables and recreate them with the correct structure

#### Using the Standalone Script

For direct database access from the command line:

1. Use the provided `recreate_orders_tables.js` script:
```sh
# Install dependencies if needed
npm install @supabase/supabase-js

# Run the script
node recreate_orders_tables.js
```

2. The script will drop all existing order-related tables and recreate them with the correct structure

#### Using the Supabase SQL Editor

If you prefer to execute the SQL directly:

1. Log in to your Supabase dashboard
2. Navigate to the SQL Editor
3. Copy and execute the contents of `src/sql/drop_and_recreate_orders_tables.sql`

## Troubleshooting

### "Error connecting to database" on Checkout Page

If you see this error when trying to place an order:

1. Navigate to the Debug Page at `/debug`
2. Check if the required tables exist
3. If tables are missing, click "Create Orders Tables"
4. Return to the checkout page and try again

### Orders Not Being Saved

If orders are not being saved to the database:

1. Check browser console for specific error messages
2. Verify that you're logged in (authentication is required to place orders)
3. Ensure database tables are properly set up via the Debug Page
4. Check Supabase permissions to ensure the authenticated user has insert privileges for the orders tables

#   s o c i o b o o s t 
 
 
