import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, RefreshCw } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// Simple interfaces for our data
interface PackageItem {
  id: string;
  product_id: string;
  product_name: string;
  product_price: number;
  quantity: number;
}

interface ProductPackage {
  id: string;
  name: string;
  description: string;
  discount_percentage: number;
  is_featured: boolean;
  price: number | null;
  discounted_price: number | null;
  items: PackageItem[];
}

const ProductPackages = () => {
  // Basic state for our component
  const [packages, setPackages] = useState<ProductPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<ProductPackage | null>(null);
  
  // Form state
  const [packageForm, setPackageForm] = useState({
    name: '',
    description: '',
    discount_percentage: 0,
    is_featured: false,
    price: 0,
    discounted_price: 0
  });
  
  // Items state for the current package being edited
  const [packageItems, setPackageItems] = useState<PackageItem[]>([]);
  
  useEffect(() => {
    fetchPackages();
  }, []);

  // Fetch all packages with their items
  const fetchPackages = async () => {
    setLoading(true);
    
    try {
      // Get all packages
      const { data, error } = await supabase
        .from('product_packages')
        .select('*')
        .order('name');
      
      if (error) throw error;
      
      if (data) {
        // For each package, get its items
        const packagesWithItems = await Promise.all(data.map(async (pkg) => {
          // Get items for this package
          const { data: itemsData, error: itemsError } = await supabase
            .from('product_package_items')
            .select(`
              id,
              product_id,
              quantity,
              products(id, name, price)
            `)
            .eq('package_id', pkg.id);
          
          if (itemsError) {
            console.error('Error fetching items for package', pkg.id, itemsError);
            return { ...pkg, items: [] };
          }
          
          // Transform items data
          const items = itemsData ? itemsData.map((item: any) => ({
            id: item.id,
            product_id: item.product_id,
            product_name: item.products?.name || 'Unknown Product',
            product_price: item.products?.price || 0,
            quantity: item.quantity
          })) : [];
          
          // Calculate total price based on items
          const totalPrice = items.reduce((sum, item) => 
            sum + (item.product_price * item.quantity), 0);
          
          return {
            ...pkg,
            items,
            price: pkg.price || totalPrice,
            discounted_price: pkg.discounted_price || (totalPrice * (1 - pkg.discount_percentage / 100))
          };
        }));
        
        setPackages(packagesWithItems);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
      toast.error('Failed to load packages');
    } finally {
      setLoading(false);
    }
  };

  // Handle editing a package
  const handleEdit = (pkg: ProductPackage) => {
    setEditingPackage(pkg);
    
    // Set form values
    setPackageForm({
      name: pkg.name,
      description: pkg.description || '',
      discount_percentage: pkg.discount_percentage || 0,
      is_featured: pkg.is_featured || false,
      price: pkg.price || 0,
      discounted_price: pkg.discounted_price || 0
    });
    
    // Set the package items
    setPackageItems(pkg.items || []);
    
    // Open dialog
    setIsDialogOpen(true);
  };

  // Create new package
  const handleCreate = () => {
    setEditingPackage(null);
    
    // Reset form
    setPackageForm({
      name: '',
      description: '',
      discount_percentage: 0,
      is_featured: false,
      price: 0,
      discounted_price: 0
    });
    
    // Clear items
    setPackageItems([]);
    
    // Open dialog
    setIsDialogOpen(true);
  };

  // Save package
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const isEditing = !!editingPackage;
      
      // Prepare package data
      const packageData = {
        name: packageForm.name,
        description: packageForm.description,
        discount_percentage: packageForm.discount_percentage,
        is_featured: packageForm.is_featured,
        price: packageForm.price,
        discounted_price: packageForm.discounted_price
      };
      
      if (isEditing) {
        // Update existing package
        const { error } = await supabase
          .from('product_packages')
          .update(packageData)
          .eq('id', editingPackage.id);
        
        if (error) throw error;
        
        toast.success('Package updated successfully');
      } else {
        // Create new package
        const { data, error } = await supabase
          .from('product_packages')
          .insert(packageData)
          .select();
        
        if (error) throw error;
        
        toast.success('Package created successfully');
      }
      
      // Close dialog and reset
      setIsDialogOpen(false);
      fetchPackages();
    } catch (error) {
      console.error('Error saving package:', error);
      toast.error('Failed to save package');
    } finally {
      setLoading(false);
    }
  };

  // Delete package
  const handleDelete = async (packageId: string) => {
    if (!confirm('Are you sure you want to delete this package?')) {
      return;
    }
    
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('product_packages')
        .delete()
        .eq('id', packageId);
      
      if (error) throw error;
      
      toast.success('Package deleted successfully');
      fetchPackages();
    } catch (error) {
      console.error('Error deleting package:', error);
      toast.error('Failed to delete package');
    } finally {
      setLoading(false);
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Packages</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchPackages} disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Add Package
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-400" />
            <p>Loading packages...</p>
          </div>
        ) : packages.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">No packages found. Create your first product package.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Discount %</TableHead>
                <TableHead>Discounted Price</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {packages.map((pkg) => (
                <TableRow key={pkg.id}>
                  <TableCell className="font-medium">{pkg.name}</TableCell>
                  <TableCell className="max-w-xs truncate">{pkg.description}</TableCell>
                  <TableCell>{pkg.items?.length || 0}</TableCell>
                  <TableCell>{formatCurrency(pkg.price || 0)}</TableCell>
                  <TableCell>{pkg.discount_percentage}%</TableCell>
                  <TableCell className="font-medium text-green-600">
                    {formatCurrency(pkg.discounted_price || 0)}
                  </TableCell>
                  <TableCell>{pkg.is_featured ? 'Yes' : 'No'}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(pkg)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(pkg.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <Dialog 
        open={isDialogOpen} 
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setEditingPackage(null);
            setPackageItems([]);
          }
        }}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPackage ? 'Edit Package' : 'Add New Package'}
            </DialogTitle>
            <DialogDescription>
              {editingPackage 
                ? 'Edit the details of this product package.' 
                : 'Create a new bundle of products with a special discount.'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Package Info Section */}
            <div className="space-y-4">
              {editingPackage && (
                <div className="bg-blue-50 p-3 rounded border border-blue-200 mb-4">
                  <h3 className="text-sm font-medium text-blue-800 mb-1">Editing Package</h3>
                  <p className="text-xs text-blue-600">ID: {editingPackage.id}</p>
                  <p className="text-xs text-blue-600">
                    Contains {editingPackage.items?.length || 0} products
                  </p>
                </div>
              )}
            
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Package Name</Label>
                  <Input
                    id="name"
                    value={packageForm.name}
                    onChange={(e) => setPackageForm({ ...packageForm, name: e.target.value })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="is_featured">Featured</Label>
                  <select
                    id="is_featured"
                    className="w-full p-2 border rounded-md"
                    value={packageForm.is_featured ? 'true' : 'false'}
                    onChange={(e) => setPackageForm({
                      ...packageForm,
                      is_featured: e.target.value === 'true'
                    })}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={packageForm.description}
                  onChange={(e) => setPackageForm({ ...packageForm, description: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="discount_percentage">Discount Percentage</Label>
                  <Input
                    id="discount_percentage"
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={packageForm.discount_percentage}
                    onChange={(e) => setPackageForm({
                      ...packageForm,
                      discount_percentage: parseFloat(e.target.value) || 0
                    })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price">Regular Price</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={packageForm.price}
                    onChange={(e) => setPackageForm({
                      ...packageForm,
                      price: parseFloat(e.target.value) || 0
                    })}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="discounted_price">Discounted Price</Label>
                  <Input
                    id="discounted_price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={packageForm.discounted_price}
                    onChange={(e) => setPackageForm({
                      ...packageForm,
                      discounted_price: parseFloat(e.target.value) || 0
                    })}
                    required
                  />
                </div>
              </div>
            </div>
            
            {/* Products Section - Read Only in this simplified version */}
            {editingPackage && packageItems.length > 0 && (
              <div className="border rounded-md p-4 bg-gray-50">
                <h3 className="font-medium mb-2">Products in this Package</h3>
                <div className="border rounded-md overflow-hidden bg-white">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {packageItems.map((item) => (
                        <tr key={item.id}>
                          <td className="px-4 py-2 whitespace-nowrap">{item.product_name}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{formatCurrency(item.product_price)}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{item.quantity}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{formatCurrency(item.product_price * item.quantity)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Note: Product management is handled separately
                </p>
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={loading}
            >
              {editingPackage ? 'Update Package' : 'Add Package'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductPackages; 