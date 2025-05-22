import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { setupOrdersTables } from '@/utils/databaseSetup';

interface CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  additionalNotes: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalAmount, clearCart } = useCart();
  const { formatCurrency } = useCurrency();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    additionalNotes: '',
  });

  // Update email field when user changes
  useEffect(() => {
    if (user?.email) {
      setCustomerDetails(prev => ({
        ...prev,
        email: user.email || ''
      }));
    }
  }, [user]);

  // Check if the required database tables exist and create them if they don't
  useEffect(() => {
    const checkOrdersTables = async () => {
      try {
        await setupOrdersTables();
      } catch (err) {
        console.error('Error setting up orders tables:', err);
        setDbError('Error connecting to database. Please try again later.');
      }
    };
    
    checkOrdersTables();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is logged in
    if (!user) {
      toast.error('Please log in to place an order');
      navigate('/login');
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Create a new order in the database
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount: totalAmount,
          status: 'pending',
          payment_status: 'pending',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select('id')
        .single();

      if (orderError) {
        console.error('Error creating order:', orderError);
        if (orderError.code === '42P01') {
          // Table doesn't exist error
          setDbError('Database tables not set up correctly. Please visit the debug page to create required tables.');
          throw new Error('Database tables not set up correctly. Please contact support.');
        } else {
          throw new Error(`Failed to create order: ${orderError.message}`);
        }
      }

      if (!orderData) {
        throw new Error('No order ID returned. Please try again.');
      }

      // Add order items
      const orderItems = items.map(item => ({
        id: crypto.randomUUID(),
        order_id: orderData.id,
        package_id: parseInt(item.id),
        quantity: item.quantity,
        price: item.price,
        service_type: item.serviceType || 'unknown',
        service_id: item.serviceType || 'unknown',
        service_url: null,
        created_at: new Date().toISOString()
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        console.error('Error adding order items:', itemsError);
        if (itemsError.code === '42P01') {
          // Table doesn't exist error
          setDbError('Database tables not set up correctly. Please visit the debug page to create required tables.');
          throw new Error('Database tables not set up correctly. Please contact support.');
        } else {
          throw new Error(`Failed to add order items: ${itemsError.message}`);
        }
      }

      // Add initial status history
      const { error: historyError } = await supabase
        .from('order_status_history')
        .insert({
          id: crypto.randomUUID(),
          order_id: orderData.id,
          status: 'pending',
          created_at: new Date().toISOString()
        });

      if (historyError) {
        console.error('Error adding status history:', historyError);
        // Continue anyway, this is not critical
      }

      // Clear the cart and show success message
      clearCart();
      toast.success('Order placed successfully! We will contact you shortly.');
      navigate('/thank-you');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container-custom py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-8">Your Cart is Empty</h1>
            <Button onClick={() => navigate('/services')}>Browse Services</Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Checkout</h1>

          {dbError && (
            <Alert variant="destructive" className="mb-8">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="flex justify-between items-center">
                <span>{dbError}</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/debug')}
                >
                  Go to Debug Page
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {!user && (
            <Alert className="mb-8 bg-amber-50 border-amber-200">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                You need to be logged in to place an order. Please <Button variant="link" className="p-0 text-amber-800 underline" onClick={() => navigate('/login')}>log in</Button> or <Button variant="link" className="p-0 text-amber-800 underline" onClick={() => navigate('/signup')}>sign up</Button> to continue.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Customer Details Form */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-semibold mb-6">Customer Details</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={customerDetails.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={customerDetails.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={customerDetails.email}
                    onChange={handleInputChange}
                    required
                    disabled={!!user}
                  />
                  {user && (
                    <p className="text-xs text-gray-500">Using your account email</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={customerDetails.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    name="address"
                    value={customerDetails.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={customerDetails.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province *</Label>
                    <Input
                      id="state"
                      name="state"
                      value={customerDetails.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP/Postal Code *</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={customerDetails.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Input
                      id="country"
                      name="country"
                      value={customerDetails.country}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalNotes">Additional Notes</Label>
                  <Textarea
                    id="additionalNotes"
                    name="additionalNotes"
                    value={customerDetails.additionalNotes}
                    onChange={handleInputChange}
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting || !!dbError || !user}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : 'Place Order'}
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <span className="font-medium">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center font-semibold">
                      <span>Total</span>
                      <span>{formatCurrency(totalAmount)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-semibold mb-6">Payment Information</h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-brand-pink text-2xl">ℹ️</div>
                    <div>
                      <h3 className="font-semibold mb-2">No Payment Required Now</h3>
                      <p className="text-gray-600">
                        We will send you an invoice once we start working on your project. 
                        This allows us to ensure we have all the necessary information and 
                        can provide you with the best possible service.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-semibold mb-6">Security & Privacy</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="text-brand-pink text-2xl">🔒</div>
                    <div>
                      <h3 className="font-semibold mb-2">Secure Checkout</h3>
                      <p className="text-gray-600">
                        Your information is encrypted and secure. We never store your payment 
                        details and only use your contact information to process your order.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout; 