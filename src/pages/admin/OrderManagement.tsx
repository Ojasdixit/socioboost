import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Loader2, Search, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { useCurrency } from '@/context/CurrencyContext';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
  user_email?: string;
}

// Interface for the Supabase join query result
interface OrderWithUser {
  id: string;
  user_id: string;
  total_amount: number;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  payment_status: string;
  created_at: string;
  updated_at: string;
  users: {
    email: string;
  };
}

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [dbIssue, setDbIssue] = useState<boolean>(false);
  const ordersPerPage = 10;
  const { formatCurrency } = useCurrency();

  useEffect(() => {
    document.title = "Order Management | SocialBoost Admin";
    checkDatabase();
  }, []);

  useEffect(() => {
    if (!dbIssue) {
      fetchOrders();
    }
  }, [currentPage, statusFilter, dbIssue]);

  const checkDatabase = async () => {
    try {
      setLoading(true);
      
      // Check if orders table exists
      const { data: ordersTableData, error: ordersTableError } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public')
        .eq('table_name', 'orders');
      
      if (ordersTableError) {
        console.error('Error checking orders table:', ordersTableError);
        throw new Error('Error connecting to database');
      }
      
      // Check if order_items table exists
      const { data: itemsTableData, error: itemsTableError } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public')
        .eq('table_name', 'order_items');
      
      if (itemsTableError) {
        console.error('Error checking order_items table:', itemsTableError);
        throw new Error('Error connecting to database');
      }
      
      // Check if order_status_history table exists
      const { data: historyTableData, error: historyTableError } = await supabase
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public')
        .eq('table_name', 'order_status_history');
      
      if (historyTableError) {
        console.error('Error checking order_status_history table:', historyTableError);
        throw new Error('Error connecting to database');
      }
      
      // If any required table doesn't exist
      if (!ordersTableData?.length || !itemsTableData?.length || !historyTableData?.length) {
        setDbIssue(true);
        setError('Database tables not found. Please run the setup script to create the necessary tables.');
        setLoading(false);
        return;
      }
      
      setDbIssue(false);
      
    } catch (err) {
      console.error('Database check error:', err);
      setError('Failed to check database structure. Please try again later.');
      setDbIssue(true);
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    if (dbIssue) return;
    
    try {
      setLoading(true);
      
      // Start building the query
      let query = supabase
        .from('orders')
        .select(`
          id,
          user_id,
          total_amount,
          status,
          payment_status,
          created_at,
          updated_at
        `, { count: 'exact' });
      
      // Apply status filter if not 'all'
      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }
      
      // Apply search term if provided
      if (searchTerm) {
        // Search in order ID 
        query = query.ilike('id', `%${searchTerm}%`);
      }
      
      // Apply pagination
      const from = (currentPage - 1) * ordersPerPage;
      const to = from + ordersPerPage - 1;
      
      // Execute the query
      const { data, error: ordersError, count } = await query
        .order('created_at', { ascending: false })
        .range(from, to);

      if (ordersError) {
        console.error('Error fetching orders:', ordersError);
        throw new Error('Failed to load orders');
      }

      if (!data || data.length === 0) {
        setOrders([]);
        setTotalOrders(0);
        setLoading(false);
        return;
      }

      // Set total count for pagination
      if (count !== null) {
        setTotalOrders(count);
      }

      // Fetch user emails separately for each order
      const ordersWithUserEmails = await Promise.all(
        data.map(async (order) => {
          try {
            // Try to get user email
            const { data: userData, error: userError } = await supabase
              .from('users')
              .select('email')
              .eq('id', order.user_id)
              .single();

            return {
              ...order,
              user_email: userData?.email || 'Unknown'
            };
          } catch (err) {
            console.error('Error fetching user:', err);
            return {
              ...order,
              user_email: 'Unknown'
            };
          }
        })
      );

      // Fetch order items for each order
      const ordersWithItems = await Promise.all(
        ordersWithUserEmails.map(async (order) => {
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

            // Format items with package names
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
      setError(null);
    } catch (err) {
      console.error('Error fetching orders:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load orders. Please try again later.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      // Update the order status
      const { error: updateError } = await supabase
        .from('orders')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', orderId);

      if (updateError) {
        throw updateError;
      }

      // Add entry to order_status_history
      const { error: historyError } = await supabase
        .from('order_status_history')
        .insert({
          id: crypto.randomUUID(),
          order_id: orderId,
          status: newStatus,
          created_at: new Date().toISOString()
        });

      if (historyError) {
        console.error('Error updating order history:', historyError);
        // Continue anyway since the main update succeeded
      }

      // Update local state
      setOrders(orders.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus as 'pending' | 'in_progress' | 'completed' | 'cancelled' } 
          : order
      ));

      toast.success(`Order status updated to ${newStatus}`);
    } catch (err) {
      console.error('Error updating order status:', err);
      toast.error('Failed to update order status');
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

  const handleSearch = () => {
    setCurrentPage(1);
    fetchOrders();
  };

  const totalPages = Math.ceil(totalOrders / ordersPerPage);

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Order Management</h1>
        
        {!dbIssue && (
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="flex gap-2">
              <Input
                placeholder="Search by order ID or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64"
              />
              <Button onClick={handleSearch} size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-brand-blue" />
          <span className="ml-2">Loading orders...</span>
        </div>
      ) : error ? (
        <div className="space-y-4">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
          
          {dbIssue && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Database Setup Required</h2>
              <p className="mb-4">
                It appears that the necessary database tables for order management haven't been created yet. 
                You need to run the setup script to create the tables before you can manage orders.
              </p>
              <p className="mb-4">
                To create the tables, run the SQL script provided in the project files:
              </p>
              <pre className="bg-gray-100 p-4 rounded mb-4">
                {`-- Run this in your Supabase SQL editor:
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  payment_status VARCHAR(50) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  package_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  price DECIMAL(10, 2) NOT NULL,
  service_type VARCHAR(100) NOT NULL,
  service_id VARCHAR(100) NOT NULL,
  service_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS order_status_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);`}
              </pre>
              <Button onClick={checkDatabase}>
                Check Again
              </Button>
              
              <Button 
                variant="outline"
                className="ml-4"
                onClick={() => window.location.href = '/debug'}
              >
                Go to Debug Page
              </Button>
            </div>
          )}
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-xl font-semibold mb-2">No Orders Found</h2>
          <p className="text-gray-600">
            {searchTerm || statusFilter !== 'all' 
              ? 'No orders match your search criteria. Try adjusting your filters.'
              : 'There are no orders in the system yet.'}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <React.Fragment key={order.id}>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.id.substring(0, 8)}...
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.user_email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(order.created_at)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(order.total_amount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => toggleOrderDetails(order.id)}
                            >
                              {expandedOrder === order.id ? 'Hide' : 'View'}
                            </Button>
                            
                            <Select
                              value={order.status}
                              onValueChange={(value) => updateOrderStatus(order.id, value)}
                            >
                              <SelectTrigger className="h-8 w-32">
                                <SelectValue placeholder="Update" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="in_progress">In Progress</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </td>
                      </tr>
                      
                      {expandedOrder === order.id && (
                        <tr>
                          <td colSpan={6} className="px-6 py-4 bg-gray-50">
                            <div className="space-y-4">
                              <h3 className="font-medium">Order Details</h3>
                              
                              {order.items && order.items.length > 0 ? (
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
                                          <td className="px-4 py-2 whitespace-nowrap text-sm">{item.package_name}</td>
                                          <td className="px-4 py-2 whitespace-nowrap text-sm">
                                            {item.service_type.charAt(0).toUpperCase() + item.service_type.slice(1)} - 
                                            {item.service_id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                          </td>
                                          <td className="px-4 py-2 whitespace-nowrap text-sm">{item.quantity}</td>
                                          <td className="px-4 py-2 whitespace-nowrap text-sm">{formatCurrency(item.price)}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              ) : (
                                <p className="text-sm text-gray-500">No item details available</p>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber;
                  
                  if (totalPages <= 5) {
                    // Show all pages if 5 or fewer
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    // Show first 5 pages
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    // Show last 5 pages
                    pageNumber = totalPages - 4 + i;
                  } else {
                    // Show current page and 2 on each side
                    pageNumber = currentPage - 2 + i;
                  }
                  
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        onClick={() => setCurrentPage(pageNumber)}
                        isActive={currentPage === pageNumber}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                
                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => setCurrentPage(totalPages)}
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderManagement; 