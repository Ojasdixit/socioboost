import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { supabase } from '@/lib/supabase';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';
import { useNavigate } from 'react-router-dom';
import { setupOrdersTables } from '@/utils/databaseSetup';

interface OrderItem {
  id: string;
  package_id: string;
  quantity: number;
  price: number;
  service_type: string;
  service_id: string;
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
  user_email?: string;
  items?: OrderItem[];
}

const OrdersAdmin: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [checkingTables, setCheckingTables] = useState<boolean>(false);
  const navigate = useNavigate();
  const { formatCurrency } = useCurrency();

  useEffect(() => {
    document.title = "Admin Orders | SocialBoost";
    checkAndFetchOrders();
  }, []);

  const checkAndFetchOrders = async () => {
    setError(null);
    setCheckingTables(true);
    
    // First try to setup the database tables if needed
    try {
      await setupOrdersTables();
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
    setLoading(true);
    
    try {
      // Simple query to get orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (ordersError) {
        console.error('Error fetching orders:', ordersError);
        throw new Error('Failed to load orders');
      }

      if (!ordersData || ordersData.length === 0) {
        setOrders([]);
        setLoading(false);
        return;
      }

      // Fetch user emails separately (without joining)
      const userIds = [...new Set(ordersData.map(order => order.user_id))];
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id, email')
        .in('id', userIds);
      
      const userMap = new Map();
      if (!userError && userData) {
        userData.forEach(user => userMap.set(user.id, user.email));
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
                service_id
              `)
              .eq('order_id', order.id);

            if (itemsError) {
              console.error('Error fetching order items:', itemsError);
              return { 
                ...order, 
                user_email: userMap.get(order.user_id) || 'Unknown User',
                items: [] 
              };
            }

            // Format items with package names (without joining)
            const formattedItems = itemsData?.map(item => ({
              ...item,
              package_name: `Package #${item.package_id}`
            }));

            return { 
              ...order, 
              user_email: userMap.get(order.user_id) || 'Unknown User',
              items: formattedItems || [] 
            };
          } catch (err) {
            console.error('Error processing order items:', err);
            return { 
              ...order, 
              user_email: userMap.get(order.user_id) || 'Unknown User',
              items: [] 
            };
          }
        })
      );

      setOrders(ordersWithItems);
    } catch (err) {
      console.error('Error fetching orders:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load orders. Please try again later.';
      setError(errorMessage);
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

  const content = (
    <div className="container p-4 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Order Management</h1>
        <Button 
          onClick={checkAndFetchOrders}
          variant="outline"
          size="sm"
        >
          Refresh Orders
        </Button>
      </div>

      {loading || checkingTables ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">{checkingTables ? 'Checking database tables...' : 'Loading orders...'}</span>
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
              There was a problem connecting to the database or retrieving orders.
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
          <h2 className="text-xl font-semibold mb-4">No orders found</h2>
          <p className="text-gray-600 mb-8">There are no orders in the system yet.</p>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <React.Fragment key={order.id}>
                  <TableRow 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleOrderDetails(order.id)}
                  >
                    <TableCell className="font-medium">
                      #{order.id.substring(0, 8)}
                    </TableCell>
                    <TableCell>{order.user_email || 'Unknown'}</TableCell>
                    <TableCell>{formatDate(order.created_at)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatCurrency(order.total_amount)}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleOrderDetails(order.id);
                        }}
                      >
                        {expandedOrder === order.id ? 'Hide Details' : 'View Details'}
                      </Button>
                    </TableCell>
                  </TableRow>
                  
                  {expandedOrder === order.id && (
                    <TableRow>
                      <TableCell colSpan={6} className="bg-gray-50 p-4">
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-semibold mb-2">Order Details</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div>
                                <p className="text-sm text-gray-500">Order ID</p>
                                <p>{order.id}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Customer ID</p>
                                <p>{order.user_id}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Payment Status</p>
                                <p className="capitalize">{order.payment_status}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Last Updated</p>
                                <p>{formatDate(order.updated_at)}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="font-semibold mb-2">Order Items</h3>
                            {order.items && order.items.length > 0 ? (
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Package</TableHead>
                                    <TableHead>Service</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Price</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {order.items.map((item) => (
                                    <TableRow key={item.id}>
                                      <TableCell>{item.package_name}</TableCell>
                                      <TableCell>
                                        {item.service_type.charAt(0).toUpperCase() + item.service_type.slice(1)} - 
                                        {item.service_id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                      </TableCell>
                                      <TableCell>{item.quantity}</TableCell>
                                      <TableCell>{formatCurrency(item.price)}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            ) : (
                              <p className="text-gray-500">No items found for this order.</p>
                            )}
                          </div>
                          
                          <div className="flex justify-between pt-4 border-t">
                            <span className="font-medium">Total Amount:</span>
                            <span className="font-bold">{formatCurrency(order.total_amount)}</span>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );

  return (
    <AdminLayout>
      {content}
    </AdminLayout>
  );
};

export default OrdersAdmin; 