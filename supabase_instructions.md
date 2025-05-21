# Supabase Product Packages Instructions

This document explains how to use the SQL files to add service packages to your Supabase database.

## Files Included

1. `service_packages_data.sql` - Contains all the service packages from the frontend
2. `service_package_items.sql` - Template for linking products to packages (requires customization)

## Step 1: Add the Product Packages

1. Open your Supabase dashboard
2. Navigate to SQL Editor
3. Create a new query
4. Copy and paste the contents of `service_packages_data.sql`
5. Execute the query

This will add all the service packages that match your frontend data.

## Step 2: Link Products to Packages

Before executing the second SQL file, you need to:

1. Identify the product IDs in your products table for each service type
2. In the `service_package_items.sql` file, replace the placeholders like `{youtube_subs_product_id}` with the actual product IDs
3. Verify that the package_id values match the IDs generated when you inserted the packages

### Finding Product IDs

Run this query to find the IDs of your products:

```sql
SELECT id, name, category_id FROM products ORDER BY category_id, name;
```

You'll need to match these products to the appropriate package items.

### Package IDs

If you want to verify the package IDs after inserting them, run:

```sql
SELECT id, name FROM product_packages ORDER BY id;
```

## Step 3: Execute the Package Items SQL

Once you've customized the `service_package_items.sql` file with the correct IDs:

1. Navigate to SQL Editor in Supabase
2. Create a new query
3. Copy and paste the customized contents
4. Execute the query

## Notes

- The discount percentages in the packages are calculated based on the original and discounted prices in the frontend.
- If you need to modify the packages later, you can update them directly in Supabase or create a new SQL file.
- Make sure you have the correct product IDs before linking products to packages.

## Troubleshooting

- If you encounter foreign key constraint errors, it means the product IDs don't exist in your products table.
- If you need to start fresh, you can uncomment the DELETE statements at the top of the SQL files. 