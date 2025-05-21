import { supabase } from '@/lib/supabase';

interface PackageOption {
  id: string;
  name: string;
  price: number;
  discounted_price?: number | null;
  description?: string;
  discount_percentage?: number;
  is_featured?: boolean;
}

interface ProductItem {
  quantity: number;
  products: {
    price: number;
  };
}

export const getAllPackageOptions = async (): Promise<PackageOption[]> => {
  try {
    // Get all package data including price
    const { data, error } = await supabase
      .from('product_packages')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching package options:', error);
      return [];
    }
    
    // If we have packages but some are missing price info, fetch the items to calculate prices
    const packagesWithItems = await Promise.all((data || []).map(async (pkg) => {
      // If price is already set, return as is
      if (pkg.price) {
        return pkg;
      }
      
      // Otherwise, calculate price from items
      const { data: itemsData } = await supabase
        .from('product_package_items')
        .select(`
          quantity,
          products(price)
        `)
        .eq('package_id', pkg.id);
      
      if (!itemsData || itemsData.length === 0) {
        return pkg;
      }
      
      // Calculate total price from items (with proper typing)
      const totalPrice = (itemsData as unknown as ProductItem[]).reduce((sum, item) => {
        const productPrice = item.products ? item.products.price : 0;
        return sum + (productPrice * item.quantity);
      }, 0);
      
      // Calculate discounted price if there's a discount percentage
      const discountedPrice = pkg.discount_percentage && pkg.discount_percentage > 0
        ? totalPrice * (1 - (pkg.discount_percentage / 100))
        : totalPrice;
      
      return {
        ...pkg,
        price: totalPrice,
        discounted_price: discountedPrice
      };
    }));
    
    return packagesWithItems;
  } catch (error) {
    console.error('Error in getAllPackageOptions:', error);
    return [];
  }
};

// Get all service types for dropdowns based on the packages in the database
export const getServiceTypes = async (): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from('product_packages')
      .select('name');
    
    if (error) {
      console.error('Error fetching service types:', error);
      return [];
    }
    
    // Extract service types from package names (e.g., "YouTube Starter Pack" -> "YouTube")
    const serviceTypes = new Set<string>();
    data?.forEach(pkg => {
      const parts = pkg.name.split(' ');
      if (parts.length > 0) {
        serviceTypes.add(parts[0]);
      }
    });
    
    return Array.from(serviceTypes);
  } catch (error) {
    console.error('Error in getServiceTypes:', error);
    return [];
  }
}; 