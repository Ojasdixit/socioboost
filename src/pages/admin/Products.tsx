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

interface Product {
  id: string;
  name: string;
  description: string;
  long_description?: string;
  price: number;
  discounted_price?: number;
  delivery_time: string;
  category_id: number;
  is_popular?: boolean;
  slug?: string;
  category_name?: string; // For display only
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState('');
  
  const [productForm, setProductForm] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    price: 0,
    delivery_time: '',
    category_id: 1,
    is_popular: false,
  });

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*');
      
      if (error) throw error;
      
      if (data) {
        setCategories(data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories(name)
        `);
      
      if (error) throw error;
      
      if (data) {
        // Transform the data to match our interface
        const transformedProducts = data.map(product => ({
          ...product,
          category_name: product.categories?.name
        }));
        
        setProducts(transformedProducts);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const fetchProductFeatures = async (productId: string) => {
    try {
      const { data, error } = await supabase
        .from('product_features')
        .select('feature')
        .eq('product_id', productId);
      
      if (error) throw error;
      
      if (data) {
        return data.map(item => item.feature);
      }
      return [];
    } catch (error) {
      console.error('Error fetching product features:', error);
      toast.error('Failed to load product features');
      return [];
    }
  };

  const handleEdit = async (product: Product) => {
    setEditingProduct(product);
    
    // Fetch the product features
    const productFeatures = await fetchProductFeatures(product.id);
    
    setProductForm({
      name: product.name,
      description: product.description,
      long_description: product.long_description || '',
      price: product.price,
      discounted_price: product.discounted_price || 0,
      delivery_time: product.delivery_time,
      category_id: product.category_id,
      is_popular: product.is_popular || false,
      slug: product.slug || '',
    });
    
    setFeatures(productFeatures);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDialogOpen(false);
    setLoading(true);

    try {
      let productId = editingProduct?.id;
      
      // Create slug from name if not provided
      const slug = productForm.slug || productForm.name.toLowerCase().replace(/\s+/g, '-');
      
      if (editingProduct) {
        // Update existing product
        const { error } = await supabase
          .from('products')
          .update({
            name: productForm.name,
            description: productForm.description,
            long_description: productForm.long_description,
            price: productForm.price,
            discounted_price: productForm.discounted_price,
            delivery_time: productForm.delivery_time,
            category_id: productForm.category_id,
            is_popular: productForm.is_popular,
            slug,
          })
          .eq('id', productId);
        
        if (error) throw error;
        
        toast.success('Product updated successfully!');
      } else {
        // Create a new product
        productId = uuidv4();
        
        const { error } = await supabase
          .from('products')
          .insert({
            id: productId,
            name: productForm.name,
            description: productForm.description,
            long_description: productForm.long_description,
            price: productForm.price,
            discounted_price: productForm.discounted_price,
            delivery_time: productForm.delivery_time,
            category_id: productForm.category_id,
            is_popular: productForm.is_popular,
            slug,
          });
        
        if (error) throw error;
        
        toast.success('Product added successfully!');
      }
      
      // Handle product features
      if (productId) {
        // Delete existing features first
        if (editingProduct) {
          await supabase
            .from('product_features')
            .delete()
            .eq('product_id', productId);
        }
        
        // Insert new features
        if (features.length > 0) {
          const featureObjects = features.map(feature => ({
            product_id: productId,
            feature
          }));
          
          const { error } = await supabase
            .from('product_features')
            .insert(featureObjects);
          
          if (error) throw error;
        }
      }

      // Reset form
      setProductForm({
        name: '',
        description: '',
        price: 0,
        delivery_time: '',
        category_id: 1,
        is_popular: false,
      });
      setFeatures([]);
      setEditingProduct(null);
      
      // Refresh products
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setLoading(true);
      try {
        // Delete product features first
        await supabase
          .from('product_features')
          .delete()
          .eq('product_id', productId);
        
        // Delete the product
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', productId);
        
        if (error) throw error;
        
        toast.success('Product deleted successfully!');
        
        // Refresh products
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error('Failed to delete product');
      } finally {
        setLoading(false);
      }
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchProducts} disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </DialogTitle>
                <DialogDescription>
                  Fill in the details to {editingProduct ? 'update the' : 'create a new'} product.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      value={productForm.name}
                      onChange={(e) =>
                        setProductForm({ ...productForm, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      className="w-full px-3 py-2 border rounded-md"
                      value={productForm.category_id}
                      onChange={(e) =>
                        setProductForm({ ...productForm, category_id: parseInt(e.target.value) })
                      }
                      required
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={productForm.description}
                    onChange={(e) =>
                      setProductForm({ ...productForm, description: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="long_description">Long Description</Label>
                  <Textarea
                    id="long_description"
                    value={productForm.long_description}
                    onChange={(e) =>
                      setProductForm({ ...productForm, long_description: e.target.value })
                    }
                    rows={5}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      value={productForm.price}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
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
                      value={productForm.discounted_price || ''}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          discounted_price: e.target.value ? parseFloat(e.target.value) : undefined,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="delivery_time">Delivery Time</Label>
                    <Input
                      id="delivery_time"
                      value={productForm.delivery_time}
                      onChange={(e) =>
                        setProductForm({ ...productForm, delivery_time: e.target.value })
                      }
                      required
                      placeholder="e.g., 24-48 hours"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug (URL)</Label>
                  <Input
                    id="slug"
                    value={productForm.slug || ''}
                    onChange={(e) =>
                      setProductForm({ ...productForm, slug: e.target.value })
                    }
                    placeholder="Leave blank to generate from name"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    id="is_popular"
                    type="checkbox"
                    checked={productForm.is_popular}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        is_popular: e.target.checked,
                      })
                    }
                    className="w-4 h-4"
                  />
                  <Label htmlFor="is_popular">Mark as Popular</Label>
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
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 p-2 rounded"
                      >
                        <span>{feature}</span>
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
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  {editingProduct ? 'Update Product' : 'Add Product'}
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
            <p>Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">No products found. Add your first product.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Discounted</TableHead>
                <TableHead>Delivery</TableHead>
                <TableHead>Popular</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category_name}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    {product.discounted_price ? `$${product.discounted_price.toFixed(2)}` : '-'}
                  </TableCell>
                  <TableCell>{product.delivery_time}</TableCell>
                  <TableCell>{product.is_popular ? 'Yes' : 'No'}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(product)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(product.id)}
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

export default Products; 