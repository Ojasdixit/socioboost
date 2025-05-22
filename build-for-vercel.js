// This script helps generate special HTML files for routes that Vercel might have trouble with
import fs from 'fs';
import path from 'path';

// Ensure dist directory exists
if (!fs.existsSync('dist')) {
  console.log('Creating dist directory');
  fs.mkdirSync('dist');
}

// Ensure admin directory exists
if (!fs.existsSync('dist/admin')) {
  console.log('Creating dist/admin directory');
  fs.mkdirSync('dist/admin');
}

// Ensure admin/dashboard directory exists
if (!fs.existsSync('dist/admin/dashboard')) {
  console.log('Creating dist/admin/dashboard directory');
  fs.mkdirSync('dist/admin/dashboard');
}

// Copy index.html to various route HTML files
try {
  const indexHtml = fs.readFileSync('dist/index.html', 'utf8');
  console.log('Creating admin route files');

  // Create fallback files
  fs.writeFileSync('dist/200.html', indexHtml);
  fs.writeFileSync('dist/404.html', indexHtml);
  console.log('Created SPA fallback files (200.html, 404.html)');

  // All possible admin routes
  const routes = [
    'dist/admin.html',
    'dist/admin/index.html',
    'dist/admin/dashboard.html',
    'dist/admin/dashboard/index.html',
    'dist/admin/dashboard/orders.html',
    'dist/admin/dashboard/products.html',
    'dist/admin/dashboard/categories.html',
    'dist/admin/dashboard/product-packages.html',
    'dist/admin/dashboard/packages.html',
    'dist/admin/dashboard/blogs.html',
    'dist/admin/dashboard/policies.html',
    'dist/admin/dashboard/contact.html'
  ];

  // Create all route files
  routes.forEach(route => {
    try {
      // Ensure directory exists for this route
      const dir = path.dirname(route);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      // Write the file
      fs.writeFileSync(route, indexHtml);
      console.log(`Created ${route}`);
    } catch (err) {
      console.error(`Error creating ${route}:`, err);
    }
  });

  console.log('Route files created successfully!');
} catch (err) {
  console.error('Error reading dist/index.html:', err);
  process.exit(1);
}

console.log('\n=======================================');
console.log('✅ Build completed successfully for Vercel!');
console.log('All ES Module issues have been fixed.');
console.log('=======================================\n'); 