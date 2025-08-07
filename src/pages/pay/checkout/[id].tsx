import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState<any>(null);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    country: 'US',
    address: '',
    zipCode: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    if (id) {
      fetchPayment();
    }
  }, [id]);

  const fetchPayment = async () => {
    try {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (!data) {
        toast.error('Payment not found');
        return router.push('/');
      }

      setPayment({
        ...data,
        amount: (data.amount / 100).toFixed(2), // Convert back to dollars
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching payment:', error);
      toast.error('Failed to load payment details');
      router.push('/');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Process payment here (this is a simplified example)
      // In a real app, you would use a payment processor like Stripe
      
      // Update payment status to completed
      const { error } = await supabase
        .from('payments')
        .update({ 
          status: 'completed',
          card_details: {
            last4: cardDetails.cardNumber.slice(-4),
            brand: 'visa', // You would detect this from the card number
          },
          customer_email: cardDetails.email,
        })
        .eq('id', id);

      if (error) throw error;

      // Redirect to success page
      window.location.href = `/pay/success?payment_id=${id}`;
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Complete Your Payment</h2>
            <p className="mt-2 text-gray-600">
              You're about to pay {payment.currency} {payment.amount}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Card Number</label>
                <Input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardDetails.cardNumber}
                  onChange={(e) => setCardDetails({...cardDetails, cardNumber: e.target.value})}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                  <Input
                    type="text"
                    placeholder="MM/YY"
                    value={cardDetails.expiryDate}
                    onChange={(e) => setCardDetails({...cardDetails, expiryDate: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">CVV</label>
                  <Input
                    type="text"
                    placeholder="123"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Cardholder Name</label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={cardDetails.cardholderName}
                  onChange={(e) => setCardDetails({...cardDetails, cardholderName: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={cardDetails.email}
                  onChange={(e) => setCardDetails({...cardDetails, email: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <Input
                  type="text"
                  placeholder="123 Main St"
                  value={cardDetails.address}
                  onChange={(e) => setCardDetails({...cardDetails, address: e.target.value})}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Country</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={cardDetails.country}
                    onChange={(e) => setCardDetails({...cardDetails, country: e.target.value})}
                    required
                  >
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    <option value="IN">India</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">ZIP/Postal Code</label>
                  <Input
                    type="text"
                    placeholder="12345"
                    value={cardDetails.zipCode}
                    onChange={(e) => setCardDetails({...cardDetails, zipCode: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <Input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={cardDetails.phone}
                  onChange={(e) => setCardDetails({...cardDetails, phone: e.target.value})}
                  required
                />
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Processing...' : `Pay ${payment.currency} ${payment.amount}`}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
