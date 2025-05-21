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
import { v4 as uuidv4 } from 'uuid';

interface PackageFeature {
  id?: string;
  feature: string;
  isNew?: boolean;
  toDelete?: boolean;
}

interface Package {
  id: string;
  name: string;
  price: number;
  discounted_price?: number | null;
  delivery_time: string;
  is_popular: boolean;
  slug?: string;
  description?: string;
  long_description?: string;
  features?: PackageFeature[];
}

const Packages = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [features, setFeatures] = useState<PackageFeature[]>([]);
  const [newFeature, setNewFeature] = useState('');
  
  const [packageForm, setPackageForm] = useState<Omit<Package, 'id'>>({
    name: '',
    price: 0,
    discounted_price: null,
    delivery_time: '',
    is_popular: false,
    slug: '',
    description: '',
    long_description: '',
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      // Get packages with their descriptions
      const { data, error } = await supabase
        .from('packages')
        .select(`
          *,
          package_descriptions(description, long_description)
        `)
        .order('price');
      
      if (error) throw error;
      
      if (data) {
        const transformedPackages = await Promise.all(data.map(async (pkg) => {
          // Fetch features for each package
          const { data: featureData, error: featureError } = await supabase
            .from('package_features')
            .select('id, feature')
            .eq('package_id', pkg.id);
          
          if (featureError) {
            console.error('Error fetching features for package:', pkg.id, featureError);
          }

          return {
            ...pkg,
            description: pkg.package_descriptions?.[0]?.description || '',
            long_description: pkg.package_descriptions?.[0]?.long_description || '',
            features: featureData || []
          };
        }));
        
        setPackages(transformedPackages);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
      toast.error('Failed to load packages');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (pkg: Package) => {
    setEditingPackage(pkg);
    
    setPackageForm({
      name: pkg.name,
      price: pkg.price,
      discounted_price: pkg.discounted_price,
      delivery_time: pkg.delivery_time,
      is_popular: pkg.is_popular,
      slug: pkg.slug || '',
      description: pkg.description || '',
      long_description: pkg.long_description || '',
    });
    
    setFeatures(pkg.features || []);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDialogOpen(false);
    setLoading(true);

    try {
      let packageId = editingPackage?.id;
      
      // Create slug from name if not provided
      const slug = packageForm.slug || packageForm.name.toLowerCase().replace(/\s+/g, '-');
      
      if (editingPackage) {
        // Update existing package
        const { error } = await supabase
          .from('packages')
          .update({
            name: packageForm.name,
            price: packageForm.price,
            discounted_price: packageForm.discounted_price,
            delivery_time: packageForm.delivery_time,
            is_popular: packageForm.is_popular,
            slug,
            updated_at: new Date().toISOString(),
          })
          .eq('id', packageId);
        
        if (error) throw error;
        
        // Update or insert package description
        const { error: descError } = await supabase
          .from('package_descriptions')
          .upsert({
            package_id: packageId,
            description: packageForm.description || '',
            long_description: packageForm.long_description || '',
            updated_at: new Date().toISOString(),
          });
        
        if (descError) throw descError;
        
        toast.success('Package updated successfully!');
      } else {
        // Create a new package
        packageId = uuidv4();
        
        const { error } = await supabase
          .from('packages')
          .insert({
            id: packageId,
            name: packageForm.name,
            price: packageForm.price,
            discounted_price: packageForm.discounted_price,
            delivery_time: packageForm.delivery_time,
            is_popular: packageForm.is_popular,
            slug,
          });
        
        if (error) throw error;
        
        // Insert package description
        const { error: descError } = await supabase
          .from('package_descriptions')
          .insert({
            package_id: packageId,
            description: packageForm.description || '',
            long_description: packageForm.long_description || '',
          });
        
        if (descError) throw descError;
        
        toast.success('Package added successfully!');
      }
      
      // Handle package features
      if (packageId) {
        // Handle feature deletions, updates, and additions
        for (const feature of features) {
          if (feature.id && feature.toDelete) {
            // Delete existing feature
            await supabase
              .from('package_features')
              .delete()
              .eq('id', feature.id);
          } else if (feature.isNew) {
            // Add new feature
            await supabase
              .from('package_features')
              .insert({
                package_id: packageId,
                feature: feature.feature
              });
          }
        }
      }

      // Reset form
      setPackageForm({
        name: '',
        price: 0,
        discounted_price: null,
        delivery_time: '',
        is_popular: false,
        slug: '',
        description: '',
        long_description: '',
      });
      setFeatures([]);
      setEditingPackage(null);
      
      // Refresh packages
      fetchPackages();
    } catch (error) {
      console.error('Error saving package:', error);
      toast.error('Failed to save package');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (packageId: string) => {
    if (confirm('Are you sure you want to delete this package?')) {
      setLoading(true);
      try {
        // The CASCADE will handle deleting related records
        const { error } = await supabase
          .from('packages')
          .delete()
          .eq('id', packageId);
        
        if (error) throw error;
        
        toast.success('Package deleted successfully!');
        
        // Refresh packages
        fetchPackages();
      } catch (error) {
        console.error('Error deleting package:', error);
        toast.error('Failed to delete package');
      } finally {
        setLoading(false);
      }
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, { feature: newFeature.trim(), isNew: true }]);
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    const updatedFeatures = [...features];
    
    if (updatedFeatures[index].id) {
      // Mark existing feature for deletion
      updatedFeatures[index].toDelete = true;
    } else {
      // Remove new feature from array
      updatedFeatures.splice(index, 1);
    }
    
    setFeatures(updatedFeatures);
  };

  const formatCurrency = (amount: number | null | undefined) => {
    if (amount === null || amount === undefined) return '-';
    return `$${amount.toFixed(2)}`;
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Packages</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchPackages} disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Package
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingPackage ? 'Edit Package' : 'Add New Package'}
                </DialogTitle>
                <DialogDescription>
                  Fill in the details to {editingPackage ? 'update the' : 'create a new'} package.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Package Name</Label>
                    <Input
                      id="name"
                      value={packageForm.name}
                      onChange={(e) =>
                        setPackageForm({ ...packageForm, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug (URL)</Label>
                    <Input
                      id="slug"
                      value={packageForm.slug}
                      onChange={(e) =>
                        setPackageForm({ ...packageForm, slug: e.target.value })
                      }
                      placeholder="Leave blank to generate from name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      value={packageForm.price}
                      onChange={(e) =>
                        setPackageForm({
                          ...packageForm,
                          price: parseFloat(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discounted_price">Discounted Price</Label>
                    <Input
                      id="discounted_price"
                      type="number"
                      value={packageForm.discounted_price || ''}
                      onChange={(e) =>
                        setPackageForm({
                          ...packageForm,
                          discounted_price: e.target.value ? parseFloat(e.target.value) : null,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="delivery_time">Delivery Time</Label>
                    <Input
                      id="delivery_time"
                      value={packageForm.delivery_time}
                      onChange={(e) =>
                        setPackageForm({ ...packageForm, delivery_time: e.target.value })
                      }
                      required
                      placeholder="e.g., 2-3 days"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    id="is_popular"
                    type="checkbox"
                    checked={packageForm.is_popular}
                    onChange={(e) =>
                      setPackageForm({
                        ...packageForm,
                        is_popular: e.target.checked,
                      })
                    }
                    className="w-4 h-4"
                  />
                  <Label htmlFor="is_popular">Mark as Popular</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Short Description</Label>
                  <Textarea
                    id="description"
                    value={packageForm.description}
                    onChange={(e) =>
                      setPackageForm({ ...packageForm, description: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="long_description">Long Description</Label>
                  <Textarea
                    id="long_description"
                    value={packageForm.long_description}
                    onChange={(e) =>
                      setPackageForm({ ...packageForm, long_description: e.target.value })
                    }
                    rows={5}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Features</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="Add a feature"
                    />
                    <Button type="button" onClick={addFeature}>
                      Add
                    </Button>
                  </div>
                  <div className="space-y-2 mt-2">
                    {features.filter(f => !f.toDelete).map((feature, index) => (
                      <div
                        key={feature.id || `new-${index}`}
                        className="flex items-center justify-between bg-gray-50 p-2 rounded"
                      >
                        <span>{feature.feature}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFeature(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    {features.filter(f => !f.toDelete).length === 0 && (
                      <p className="text-gray-500 text-sm">No features added yet.</p>
                    )}
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  {editingPackage ? 'Update Package' : 'Add Package'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
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
            <p className="text-gray-500">No packages found. Add your first package.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Discounted</TableHead>
                <TableHead>Delivery</TableHead>
                <TableHead>Popular</TableHead>
                <TableHead>Features</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {packages.map((pkg) => (
                <TableRow key={pkg.id}>
                  <TableCell className="font-medium">{pkg.name}</TableCell>
                  <TableCell>{formatCurrency(pkg.price)}</TableCell>
                  <TableCell>{formatCurrency(pkg.discounted_price)}</TableCell>
                  <TableCell>{pkg.delivery_time}</TableCell>
                  <TableCell>{pkg.is_popular ? 'Yes' : 'No'}</TableCell>
                  <TableCell>{pkg.features?.length || 0}</TableCell>
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
    </div>
  );
};

export default Packages; 