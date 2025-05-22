// This script helps generate special HTML files for routes that Vercel might have trouble with
const fs = require('fs');
const path = require('path');

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
const indexHtml = fs.readFileSync('dist/index.html', 'utf8');

console.log('Creating admin route files');

// Create admin.html
fs.writeFileSync('dist/admin.html', indexHtml);

// Create admin/index.html
fs.writeFileSync('dist/admin/index.html', indexHtml);

// Create admin/dashboard.html
fs.writeFileSync('dist/admin/dashboard.html', indexHtml);

// Create admin/dashboard/index.html
fs.writeFileSync('dist/admin/dashboard/index.html', indexHtml);

// Create admin/dashboard/orders.html for example
fs.writeFileSync('dist/admin/dashboard/orders.html', indexHtml);

console.log('Route files created successfully!'); 