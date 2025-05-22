import { supabase } from '@/lib/supabase';

interface SeedPackage {
  name: string;
  description: string;
  price: number;
  discounted_price: number | null;
  is_featured: boolean;
  service_type?: string;
  service_id?: string;
}

// Sample packages for seeding
const samplePackages: SeedPackage[] = [
  // YouTube Packages
  {
    name: 'YouTube Starter Pack',
    description: 'Perfect for new channels with 100 Real Subscribers',
    price: 49.99,
    discounted_price: null,
    is_featured: false,
    service_type: 'youtube',
    service_id: 'subscribers'
  },
  {
    name: 'YouTube Growth Pack',
    description: 'Most popular choice with 500 Real Subscribers',
    price: 199.99,
    discounted_price: 149.99,
    is_featured: true,
    service_type: 'youtube',
    service_id: 'subscribers'
  },
  {
    name: 'YouTube Premium Pack',
    description: 'For serious creators with 1000 Real Subscribers',
    price: 349.99,
    discounted_price: 299.99,
    is_featured: false,
    service_type: 'youtube',
    service_id: 'subscribers'
  },
  {
    name: 'YouTube Basic Views',
    description: 'For new videos with 1000 Views',
    price: 29.99,
    discounted_price: null,
    is_featured: false,
    service_type: 'youtube',
    service_id: 'views'
  },
  {
    name: 'YouTube Popular Views',
    description: 'Most popular choice with 5000 Views',
    price: 99.99,
    discounted_price: 79.99,
    is_featured: true,
    service_type: 'youtube',
    service_id: 'views'
  },
  
  // Instagram Packages
  {
    name: 'Instagram Starter Pack',
    description: 'For new accounts with 100 Real Followers',
    price: 39.99,
    discounted_price: null,
    is_featured: false,
    service_type: 'instagram',
    service_id: 'followers'
  },
  {
    name: 'Instagram Growth Pack',
    description: 'Most popular choice with 500 Real Followers',
    price: 149.99,
    discounted_price: 129.99,
    is_featured: true,
    service_type: 'instagram',
    service_id: 'followers'
  },
  {
    name: 'Instagram Premium Pack',
    description: 'For serious influencers with 1000 Real Followers',
    price: 249.99,
    discounted_price: 199.99,
    is_featured: false,
    service_type: 'instagram',
    service_id: 'followers'
  },
  {
    name: 'Instagram Basic Likes',
    description: 'For new posts with 100 Real Likes',
    price: 19.99,
    discounted_price: null,
    is_featured: false,
    service_type: 'instagram',
    service_id: 'likes'
  },
  
  // Facebook Packages
  {
    name: 'Facebook Starter Pack',
    description: 'For new pages with 100 Real Followers',
    price: 39.99,
    discounted_price: null,
    is_featured: false,
    service_type: 'facebook',
    service_id: 'followers'
  },
  {
    name: 'Facebook Growth Pack',
    description: 'Most popular choice with 500 Real Followers',
    price: 149.99,
    discounted_price: 129.99,
    is_featured: true,
    service_type: 'facebook',
    service_id: 'followers'
  },
  {
    name: 'Facebook Basic Likes',
    description: 'For new posts with 100 Real Likes',
    price: 19.99,
    discounted_price: null,
    is_featured: false,
    service_type: 'facebook',
    service_id: 'post-likes'
  },
  {
    name: 'Facebook Page Likes Pack',
    description: 'Boost your page with 500 Page Likes',
    price: 49.99,
    discounted_price: 39.99,
    is_featured: true,
    service_type: 'facebook',
    service_id: 'page-likes'
  },
  
  // Twitter Packages
  {
    name: 'Twitter Starter Pack',
    description: 'For new accounts with 100 Real Followers',
    price: 39.99,
    discounted_price: null,
    is_featured: false,
    service_type: 'twitter',
    service_id: 'followers'
  },
  {
    name: 'Twitter Growth Pack',
    description: 'Most popular choice with 500 Real Followers',
    price: 149.99,
    discounted_price: 129.99,
    is_featured: true,
    service_type: 'twitter',
    service_id: 'followers'
  },
  {
    name: 'Twitter Basic Likes',
    description: 'For new tweets with 100 Real Likes',
    price: 19.99,
    discounted_price: null,
    is_featured: false,
    service_type: 'twitter',
    service_id: 'likes'
  },
  {
    name: 'Twitter Retweets Pack',
    description: 'Boost your reach with 100 Retweets',
    price: 29.99,
    discounted_price: 24.99,
    is_featured: true,
    service_type: 'twitter',
    service_id: 'retweets'
  },
  
  // LinkedIn Packages
  {
    name: 'LinkedIn Starter Pack',
    description: 'For new profiles with 100 Real Connections',
    price: 49.99,
    discounted_price: null,
    is_featured: false,
    service_type: 'linkedin',
    service_id: 'followers'
  },
  {
    name: 'LinkedIn Growth Pack',
    description: 'Most popular choice with 500 Real Connections',
    price: 199.99,
    discounted_price: 169.99,
    is_featured: true,
    service_type: 'linkedin',
    service_id: 'followers'
  },
  {
    name: 'LinkedIn Post Likes',
    description: 'Boost your post engagement with 100 Likes',
    price: 39.99,
    discounted_price: 29.99,
    is_featured: false,
    service_type: 'linkedin',
    service_id: 'likes'
  },
  
  // Google Packages
  {
    name: 'Google Starter Pack',
    description: 'For new businesses with 5 Verified Reviews',
    price: 199.99,
    discounted_price: null,
    is_featured: false,
    service_type: 'google-reviews',
    service_id: 'positive'
  },
  {
    name: 'Google Popular Pack',
    description: 'Most popular choice with 10 Verified Reviews',
    price: 349.99,
    discounted_price: 299.99,
    is_featured: true,
    service_type: 'google-reviews',
    service_id: 'positive'
  },
  {
    name: 'Google Premium Pack',
    description: 'Maximum impact with 20 Verified Reviews',
    price: 599.99,
    discounted_price: 499.99,
    is_featured: false,
    service_type: 'google-reviews',
    service_id: 'reputation'
  },
  
  // Trustpilot Packages
  {
    name: 'Trustpilot Starter Pack',
    description: 'For new businesses with 5 Verified Reviews',
    price: 249.99,
    discounted_price: null,
    is_featured: false,
    service_type: 'trustpilot',
    service_id: 'paid-reviews'
  },
  {
    name: 'Trustpilot Popular Pack',
    description: 'Most popular choice with 10 Verified Reviews',
    price: 449.99,
    discounted_price: 399.99,
    is_featured: true,
    service_type: 'trustpilot',
    service_id: 'paid-reviews'
  },
  {
    name: 'Trustpilot Premium Pack',
    description: 'Maximum impact with 20 Verified Reviews',
    price: 799.99,
    discounted_price: 699.99,
    is_featured: false,
    service_type: 'trustpilot',
    service_id: 'custom'
  }
];

// Check if packages exist and seed if needed
export const checkAndSeedPackages = async (): Promise<void> => {
  try {
    // Check if we have any packages
    const { count, error } = await supabase
      .from('product_packages')
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      console.error('Error checking packages:', error);
      return;
    }
    
    // If we have no packages, seed the database
    if (count === 0) {
      console.log('No packages found in database. Seeding with sample data...');
      
      const { data, error: seedError } = await supabase
        .from('product_packages')
        .insert(samplePackages)
        .select();
      
      if (seedError) {
        console.error('Error seeding packages:', seedError);
      } else {
        console.log(`Successfully seeded ${data?.length} packages`);
      }
    } else {
      console.log(`Found ${count} packages in database. No seeding needed.`);
    }
  } catch (err) {
    console.error('Unexpected error in checkAndSeedPackages:', err);
  }
};

// Manually seed packages (for use in debug page)
export const forceReseedPackages = async (): Promise<string> => {
  try {
    // Delete existing packages
    const { error: deleteError } = await supabase
      .from('product_packages')
      .delete()
      .neq('id', 0); // Delete all records
    
    if (deleteError) {
      console.error('Error deleting packages:', deleteError);
      return `Error deleting packages: ${deleteError.message}`;
    }
    
    // Insert new packages
    const { data, error: seedError } = await supabase
      .from('product_packages')
      .insert(samplePackages)
      .select();
    
    if (seedError) {
      console.error('Error seeding packages:', seedError);
      return `Error seeding packages: ${seedError.message}`;
    }
    
    return `Successfully reseeded ${data?.length} packages`;
  } catch (err) {
    console.error('Unexpected error in forceReseedPackages:', err);
    return `Unexpected error: ${err instanceof Error ? err.message : String(err)}`;
  }
}; 