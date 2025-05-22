#!/bin/bash

# Build the application
echo "Building application with Vite..."
npm run build

# Create admin directories if they don't exist
echo "Creating admin directories..."
mkdir -p dist/admin
mkdir -p dist/admin/dashboard

# Copy index.html to admin routes
echo "Creating admin route files..."
cp dist/index.html dist/admin.html
cp dist/index.html dist/admin/index.html
cp dist/index.html dist/admin/dashboard.html
cp dist/index.html dist/admin/dashboard/index.html
cp dist/index.html dist/admin/dashboard/orders.html
cp dist/index.html dist/admin/dashboard/products.html
cp dist/index.html dist/admin/dashboard/categories.html
cp dist/index.html dist/admin/dashboard/product-packages.html
cp dist/index.html dist/admin/dashboard/packages.html
cp dist/index.html dist/admin/dashboard/blogs.html
cp dist/index.html dist/admin/dashboard/policies.html
cp dist/index.html dist/admin/dashboard/contact.html

echo "Build completed successfully!" 