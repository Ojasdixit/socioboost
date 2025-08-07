import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

export default function SuccessPage() {
  const router = useRouter();
  const { payment_id } = router.query;
  const [payment, setPayment] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (payment_id) {
      fetchPayment();
    }
  }, [payment_id]);

  const fetchPayment = async () => {
    try {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('id', payment_id)
        .single();

      if (error) throw error;
      if (!data) {
        return router.push('/');
      }

      setPayment({
        ...data,
        amount: (data.amount / 100).toFixed(2),
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching payment:', error);
      router.push('/');
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
        <div className="p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Payment Successful!</h2>
          <p className="mt-2 text-gray-600">
            Thank you for your payment of {payment.currency} {payment.amount}
          </p>
          
          <div className="mt-8 bg-gray-50 p-4 rounded-lg text-left">
            <h3 className="text-lg font-medium text-gray-900">Payment Details</h3>
            <dl className="mt-2 space-y-2">
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Payment ID:</dt>
                <dd className="text-sm text-gray-900">{payment.id}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Date:</dt>
                <dd className="text-sm text-gray-900">
                  {new Date(payment.created_at).toLocaleDateString()}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm font-medium text-gray-500">Status:</dt>
                <dd className="text-sm text-green-600 font-medium">
                  {payment.status === 'completed' ? 'Completed' : payment.status}
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-8">
            <p className="text-sm text-gray-500">
              A receipt has been sent to {payment.customer_email || 'your email address'}
            </p>
          </div>

          <div className="mt-8">
            <Button onClick={() => window.close() || router.push('/')}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
