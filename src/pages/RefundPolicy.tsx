
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const RefundPolicy = () => {
  // Get current date for last updated display
  const lastUpdated = "May 1, 2025";

  const eligibleScenarios = [
    "Services not delivered within the specified timeframe",
    "Significant partial delivery (less than 80% of the ordered service)",
    "Order was accidentally duplicated",
    "Wrong service was ordered by mistake (must be reported within 24 hours)",
    "Technical issues on our end prevented delivery"
  ];

  const ineligibleScenarios = [
    "Order was fully delivered as described",
    "You changed your mind after delivery started",
    "Your social media account was private during delivery period",
    "Your social media account was suspended during delivery period",
    "Refund request is made more than 30 days after order date",
    "Order was custom-designed for your specific requirements"
  ];

  const refundProcess = [
    "Submit a refund request through your account dashboard or contact customer support",
    "Include your order number and reason for requesting a refund",
    "Our team will review your request within 48 hours",
    "If approved, refunds are typically processed within 5-10 business days",
    "Refunds are issued using the original payment method"
  ];

  return (
    <Layout>
      <div className="container-custom py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Refund Policy</h1>
            <p className="text-gray-500">Last Updated: {lastUpdated}</p>
          </div>

          <div className="prose max-w-none">
            <p className="lead text-lg">
              At SocialBoost, we're committed to your satisfaction. This Refund Policy outlines the conditions under which we issue refunds for our services. We strive to deliver high-quality services as described, but we understand that sometimes issues may arise.
            </p>

            <h2 className="mt-8">Overview</h2>
            <p>
              We offer refunds in specific circumstances where we have failed to deliver the services as promised or where technical issues have prevented proper delivery. All refund requests are evaluated on a case-by-case basis according to the criteria outlined below.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-10">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600 flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Eligible for Refund
                  </CardTitle>
                  <CardDescription>Scenarios where refunds may be approved</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {eligibleScenarios.map((scenario, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>{scenario}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600 flex items-center">
                    <span className="mr-2">✕</span>
                    Not Eligible for Refund
                  </CardTitle>
                  <CardDescription>Scenarios where refunds are typically not approved</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {ineligibleScenarios.map((scenario, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-600 mr-2">•</span>
                        <span>{scenario}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <h2>Refund Process</h2>
            <p>If you believe you're eligible for a refund, please follow these steps:</p>
            <ol className="my-6">
              {refundProcess.map((step, index) => (
                <li key={index} className="mb-3">
                  <strong>{index + 1}.</strong> {step}
                </li>
              ))}
            </ol>

            <h2>Refund Timeframe</h2>
            <p>
              Refund requests must be submitted within 30 days of the original order date. Requests submitted after this period may not be considered. Once approved, refunds typically take 5-10 business days to process, depending on your payment method and financial institution.
            </p>

            <h2>Partial Deliveries</h2>
            <p>
              For services that are partially delivered (between 50% and 80% of the ordered amount), we may offer:
            </p>
            <ul>
              <li>A partial refund proportional to the undelivered services</li>
              <li>A credit for future orders</li>
              <li>Completion of the remaining delivery (when possible)</li>
            </ul>

            <h2>Cancellation Policy</h2>
            <p>
              Orders can be cancelled and fully refunded if the delivery has not yet started. Once delivery has begun, cancellations may result in:
            </p>
            <ul>
              <li>No refund if more than 50% of the service has been delivered</li>
              <li>Partial refund if less than 50% of the service has been delivered</li>
              <li>A 15% processing fee may apply to all cancellations after order confirmation</li>
            </ul>

            <h2>Service Guarantees</h2>
            <p>
              Many of our services include delivery guarantees and refill periods. During these periods, if you experience a drop in the delivered service (e.g., followers, likes), we will replenish them at no additional cost. These guarantees vary by service and are specified on each service page.
            </p>

            <h2>Payment Method Restrictions</h2>
            <p>
              Refunds are processed using the original payment method used for the purchase. If the original payment method is no longer available or valid, we may issue the refund as store credit or through an alternative method at our discretion.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Refund Policy or would like to request a refund, please contact our customer support team at:
            </p>
            <p className="mb-8">
              Email: support@socialboost.com<br />
              Phone: +1 (123) 456-7890<br />
              Contact Form: <Link to="/contact" className="text-brand-blue">Contact Us</Link>
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this Refund Policy from time to time. When we make changes, we will update the "Last Updated" date at the top of this policy. Any changes to this policy will apply to orders placed after the revised policy is posted.
            </p>

            <div className="my-8 text-center">
              <Button asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RefundPolicy;
