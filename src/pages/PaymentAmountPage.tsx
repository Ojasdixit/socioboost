import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function PaymentAmountPage() {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountValue = parseFloat(amount);
    
    if (isNaN(amountValue) || amountValue <= 0) {
      setError('Please enter a valid amount greater than 0');
      return;
    }
    
    // Navigate to payment details with the amount as a query parameter
    navigate(`/payments/details?amount=${amountValue}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Paying to</h1>
        <div className="flex items-center justify-center space-x-2 mt-2">
          <div className="h-10 w-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
            SB
          </div>
          <span className="text-xl font-semibold text-gray-800">SocioBoost</span>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Enter Payment Amount</CardTitle>
          <CardDescription>Please enter the amount you would like to pay.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="amount">Amount (USD)</Label>
                <Input
                  id="amount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="mt-1"
                />
                {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              type="submit"
              className="bg-[#635BFF] hover:bg-[#5548c8] text-white font-bold rounded-lg shadow-md px-6 py-2 transition-colors duration-150"
            >
              Continue to Payment
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
