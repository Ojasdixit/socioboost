import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { merchantId, amount, currency, metadata } = req.body;

    // Validate required fields
    if (!merchantId || !amount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create a new payment record
    const { data: payment, error } = await supabase
      .from('payments')
      .insert([
        {
          merchant_id: merchantId,
          amount: Number(amount) * 100, // Convert to cents
          currency: currency || 'USD',
          status: 'pending',
          metadata: metadata || {},
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating payment:', error);
      return res.status(500).json({ error: 'Failed to create payment' });
    }

    // Return the payment ID
    res.status(200).json({
      paymentId: payment.id,
    });
  } catch (error) {
    console.error('Payment initialization error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
