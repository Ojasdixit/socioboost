import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container-custom py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="text-brand-pink text-6xl mb-4">🎉</div>
            <h1 className="text-4xl font-bold mb-4">Thank You for Your Order!</h1>
            <p className="text-gray-600 mb-8">
              We have received your order and will begin processing it shortly. 
              You will receive an invoice via email once we start working on your project.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">What's Next?</h2>
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-4">
                <div className="text-brand-pink text-2xl">1️⃣</div>
                <div>
                  <h3 className="font-semibold mb-1">Order Confirmation</h3>
                  <p className="text-gray-600">
                    You will receive an order confirmation email with all the details of your purchase.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-brand-pink text-2xl">2️⃣</div>
                <div>
                  <h3 className="font-semibold mb-1">Project Review</h3>
                  <p className="text-gray-600">
                    Our team will review your order and gather all necessary information.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-brand-pink text-2xl">3️⃣</div>
                <div>
                  <h3 className="font-semibold mb-1">Invoice & Payment</h3>
                  <p className="text-gray-600">
                    Once we start working on your project, you'll receive an invoice via email.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-x-4">
            <Button onClick={() => navigate('/services')}>
              Browse More Services
            </Button>
            <Button variant="outline" onClick={() => navigate('/')}>
              Return Home
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ThankYou; 