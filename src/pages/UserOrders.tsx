import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { setupOrdersTables } from '@/utils/databaseSetup';

interface OrderItem {
  id: string;
  package_id: string;
  quantity: number;
  price: number;
  service_type: string;
  service_id: string;
  service_url: string | null;
  package_name?: string;
}

interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  payment_status: string;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

const UserOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [checkingTables, setCheckingTables] = useState<boolean>(false);
  const [tablesChecked, setTablesChecked] = useState<boolean>(false);
  const navigate = useNavigate();
  const { formatCurrency } = useCurrency();
  const { user } = useAuth();

  useEffect(() => {
    document.title = "My Orders | SocialBoost";
    
    // Check if user is logged in
    if (!user) {
      navigate('/login');
      return;
    }
    
    checkAndFetchOrders();
  }, [user, navigate]);

  const checkAndFetchOrders = async () => {
    setError(null);
    setCheckingTables(true);
    
    // First try to setup the database tables if needed
    try {
      await setupOrdersTables();
      setTablesChecked(true);
      fetchOrders();
    } catch (err) {
      console.error('Error setting up tables:', err);
      // Continue to fetch orders even if setup fails
      fetchOrders();
    } finally {
      setCheckingTables(false);
    }
  };

  const fetchOrders = async () => {
    if (!user) return;
    setLoading(true);
    
    try {
      // Simple query to get orders - no need to check if tables exist first
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (ordersError) {
        console.error('Error fetching orders:', ordersError);
        throw new Error('Failed to load your orders');
      }

      if (!ordersData || ordersData.length === 0) {
        setOrders([]);
        setLoading(false);
        return;
      }

      // Now get the order items
      const ordersWithItems = await Promise.all(
        ordersData.map(async (order) => {
          try {
            const { data: itemsData, error: itemsError } = await supabase
              .from('order_items')
              .select(`
                id,
                order_id,
                package_id,
                quantity,
                price,
                service_type,
                service_id,
                service_url,
                created_at
              `)
              .eq('order_id', order.id);

            if (itemsError) {
              console.error('Error fetching order items:', itemsError);
              return { ...order, items: [] };
            }

            // Format items with package names (simplifying by using package ID rather than joining)
            const formattedItems = itemsData?.map(item => ({
              ...item,
              package_name: `Package #${item.package_id}`
            }));

            return { ...order, items: formattedItems || [] };
          } catch (err) {
            console.error('Error processing order items:', err);
            return { ...order, items: [] };
          }
        })
      );

      setOrders(ordersWithItems);
    } catch (err) {
      console.error('Error fetching orders:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load orders. Please try again later.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Layout>
      <div className="container-custom section-padding">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">My Orders</h1>
          
          {loading || checkingTables ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-brand-blue" />
              <span className="ml-2">{checkingTables ? 'Checking database tables...' : 'Loading your orders...'}</span>
            </div>
          ) : error ? (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-red-700">Error Loading Orders</h2>
                <p className="text-red-600">{error}</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow space-y-4">
                <h2 className="text-lg font-semibold">Database Connection Issue</h2>
                <p>
                  There was a problem connecting to the database or retrieving your orders.
                  Please try again later.
                </p>
                <div className="flex gap-3">
                  <Button 
                    variant="default" 
                    onClick={checkAndFetchOrders}
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">You don't have any orders yet</h2>
              <p className="text-gray-600 mb-8">Browse our services and place your first order</p>
              <Button onClick={() => navigate('/services')}>
                Browse Services
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                  <div 
                    className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleOrderDetails(order.id)}
                  >
                    <div>
                      <p className="text-sm text-gray-500">Order #{order.id.substring(0, 8)}</p>
                      <p className="font-medium">{formatDate(order.created_at)}</p>
                    </div>
                    <div className="mt-2 md:mt-0 flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                      <p className="font-semibold">{formatCurrency(order.total_amount)}</p>
                      <Button variant="ghost" size="sm">
                        {expandedOrder === order.id ? 'Hide Details' : 'View Details'}
                      </Button>
                    </div>
                  </div>
                  
                  {expandedOrder === order.id && order.items && order.items.length > 0 && (
                    <div className="p-4 border-t bg-gray-50">
                      <h3 className="font-semibold mb-2">Order Items</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {order.items.map((item) => (
                              <tr key={item.id}>
                                <td className="px-4 py-2 whitespace-nowrap">{item.package_name}</td>
                                <td className="px-4 py-2 whitespace-nowrap">
                                  {item.service_type.charAt(0).toUpperCase() + item.service_type.slice(1)} - 
                                  {item.service_id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap">{item.quantity}</td>
                                <td className="px-4 py-2 whitespace-nowrap">{formatCurrency(item.price)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between">
                          <span className="font-medium">Total:</span>
                          <span className="font-bold">{formatCurrency(order.total_amount)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {expandedOrder === order.id && (!order.items || order.items.length === 0) && (
                    <div className="p-4 border-t bg-gray-50">
                      <p className="text-gray-600">No detailed information available for this order.</p>
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between">
                          <span className="font-medium">Total:</span>
                          <span className="font-bold">{formatCurrency(order.total_amount)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UserOrders; 