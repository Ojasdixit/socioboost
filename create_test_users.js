// Script to create test users in Supabase for SocialBoost
// Run this script with Node.js: node create_test_users.js

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

// Load environment variables
dotenv.config();

// Initialize Supabase client with admin key
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Missing Supabase credentials.');
  console.error('Make sure you have VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Test users to create
const testUsers = [
  {
    email: 'testuser1@example.com',
    password: 'Password123!',
    userData: {
      first_name: 'John',
      last_name: 'Doe',
      phone: '+1234567890'
    }
  },
  {
    email: 'testuser2@example.com',
    password: 'Password123!',
    userData: {
      first_name: 'Jane',
      last_name: 'Smith',
      phone: '+0987654321'
    }
  },
  {
    email: 'admin@example.com',
    password: 'AdminPass123!',
    userData: {
      first_name: 'Admin',
      last_name: 'User',
      phone: '+1122334455',
      is_admin: true
    }
  }
];

// Function to create a user and their profile
async function createUser(user) {
  try {
    // Create the user in Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email: user.email,
      password: user.password,
      email_confirm: true // Auto-confirm email
    });

    if (error) {
      console.error(`Error creating user ${user.email}:`, error.message);
      return null;
    }

    console.log(`User created: ${user.email} (ID: ${data.user.id})`);

    // Create or update user profile
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: data.user.id,
        user_id: data.user.id,
        email: user.email,
        first_name: user.userData.first_name,
        last_name: user.userData.last_name,
        phone: user.userData.phone,
        is_admin: user.userData.is_admin || false,
        created_at: new Date(),
        updated_at: new Date()
      });

    if (profileError) {
      console.error(`Error creating profile for ${user.email}:`, profileError.message);
    } else {
      console.log(`Profile created for ${user.email}`);
    }

    return data.user;
  } catch (err) {
    console.error(`Unexpected error creating user ${user.email}:`, err.message);
    return null;
  }
}

// Main function to create all test users
async function createTestUsers() {
  console.log('Creating test users...');
  
  const createdUsers = [];
  
  for (const user of testUsers) {
    const createdUser = await createUser(user);
    if (createdUser) {
      createdUsers.push(createdUser);
    }
  }
  
  console.log(`\nCreated ${createdUsers.length} of ${testUsers.length} users successfully.`);
  
  // Save user IDs to a file for reference
  const userIds = createdUsers.map(user => ({ email: user.email, id: user.id }));
  fs.writeFileSync('test_user_ids.json', JSON.stringify(userIds, null, 2));
  console.log('User IDs saved to test_user_ids.json');
}

// Run the script
createTestUsers().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
}); 