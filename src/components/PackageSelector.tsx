import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { getAllPackageOptions } from '@/utils/packageOptions';
import { supabase } from '@/lib/supabase';

interface PackageOption {
  id: string;
  name: string;
  price: number;
  discounted_price?: number | null;
  type?: 'package' | 'product';
}

interface PackageSelectorProps {
  selectedPackageId: string | null;
  onSelect: (packageId: string) => void;
  label?: string;
  required?: boolean;
  includeProducts?: boolean;
}

const PackageSelector = ({
  selectedPackageId,
  onSelect,
  label = 'Select a Package',
  required = false,
  includeProducts = true
}: PackageSelectorProps) => {
  const [options, setOptions] = useState<PackageOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOptions = async () => {
      setLoading(true);
      
      try {
        // Get all packages
        const packages = await getAllPackageOptions();
        const packageOptions = packages.map(pkg => ({
          ...pkg,
          type: 'package' as const
        }));
        
        let productOptions: PackageOption[] = [];
        
        // Get products if needed
        if (includeProducts) {
          const { data: products, error } = await supabase
            .from('products')
            .select('id, name, price, discounted_price')
            .order('name');
            
          if (!error && products) {
            productOptions = products.map(product => ({
              ...product,
              type: 'product' as const
            }));
          }
        }
        
        // If a selectedPackageId exists but is not in our options, try to fetch it separately
        if (selectedPackageId && !packageOptions.some(p => p.id === selectedPackageId) && !productOptions.some(p => p.id === selectedPackageId)) {
          try {
            // Check if it's a product
            const { data: product } = await supabase
              .from('products')
              .select('id, name, price, discounted_price')
              .eq('id', selectedPackageId)
              .single();
            
            if (product) {
              productOptions.push({
                ...product,
                type: 'product' as const
              });
            } else {
              // Check if it's a package
              const { data: pkg } = await supabase
                .from('product_packages')
                .select('*')
                .eq('id', selectedPackageId)
                .single();
              
              if (pkg) {
                packageOptions.push({
                  ...pkg,
                  type: 'package' as const
                });
              }
            }
          } catch (err) {
            console.error('Error fetching selected option:', err);
          }
        }
        
        // Combine both types
        setOptions([...packageOptions, ...productOptions]);
      } catch (error) {
        console.error('Error loading package options:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOptions();
  }, [includeProducts, selectedPackageId]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Group options by type and service
  const groupedOptions: Record<string, PackageOption[]> = {};
  
  options.forEach(option => {
    const serviceName = option.name.split(' ')[0]; // e.g., "YouTube" from "YouTube Starter Pack"
    const groupKey = option.type === 'package' 
      ? `${serviceName} Packages` 
      : (option.type === 'product' ? 'Products' : 'Other');
      
    if (!groupedOptions[groupKey]) {
      groupedOptions[groupKey] = [];
    }
    
    groupedOptions[groupKey].push(option);
  });

  // Sort groups with packages first, then products
  const sortedGroups = Object.keys(groupedOptions).sort((a, b) => {
    if (a.includes('Packages') && !b.includes('Packages')) return -1;
    if (!a.includes('Packages') && b.includes('Packages')) return 1;
    return a.localeCompare(b);
  });

  // Find the currently selected option for display
  const selectedOption = options.find(option => option.id === selectedPackageId);

  return (
    <div>
      <Label htmlFor="package-selector">{label}</Label>
      <select
        id="package-selector"
        className="w-full mt-1 p-2 border rounded-md"
        value={selectedPackageId || ''}
        onChange={(e) => onSelect(e.target.value)}
        required={required}
        disabled={loading}
      >
        <option value="">Select an option...</option>
        
        {/* If we have a selected option that's not in our grouped options yet, show it first */}
        {selectedOption && (
          <option value={selectedOption.id}>
            {selectedOption.name} - {formatCurrency(selectedOption.price || 0)}
            {selectedOption.discounted_price && selectedOption.discounted_price < selectedOption.price 
              ? ` (${formatCurrency(selectedOption.discounted_price)})`
              : ''}
          </option>
        )}
        
        {sortedGroups.map(groupName => (
          <optgroup key={groupName} label={groupName}>
            {groupedOptions[groupName].map((option) => (
              option.id !== selectedPackageId && (
                <option key={option.id} value={option.id}>
                  {option.name} - {formatCurrency(option.price || 0)}
                  {option.discounted_price && option.discounted_price < option.price 
                    ? ` (${formatCurrency(option.discounted_price)})`
                    : ''}
                </option>
              )
            ))}
          </optgroup>
        ))}
      </select>
      
      {loading && <p className="text-xs text-gray-500 mt-1">Loading options...</p>}
    </div>
  );
};

export default PackageSelector; 