import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { defaultServices } from '@/utils/serviceData';

const ServicePage: React.FC = () => {
  const { serviceType } = useParams<{ serviceType: string }>();
  const location = useLocation();
  
  // Get the service metadata from the default services
  const serviceData = serviceType && defaultServices[serviceType] 
    ? defaultServices[serviceType] 
    : {
        title: 'Service Details',
        description: 'This service is coming soon. Please check back later.',
        options: []
      };

  // Helper function to get detail page URL
  const getDetailPageUrl = (detailPage: string | undefined): string => {
    if (!detailPage) return location.pathname;
    return detailPage;
  };

  return (
    <Layout>
      <div className="container-custom section-padding">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">{serviceData.title}</h1>
          <p className="text-gray-600 mb-10 text-lg">{serviceData.description}</p>

          {serviceData.options && serviceData.options.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {serviceData.options.map((option) => (
                <div key={option.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-xl mb-2">{option.name}</h3>
                  <p className="text-gray-600 mb-4">{option.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-brand-blue">${option.price}</span>
                    <span className="text-sm bg-gray-100 text-gray-700 py-1 px-2 rounded-full">
                      {option.delivery}
                    </span>
                  </div>
                  <Link to={getDetailPageUrl(option.detailPage)}>
                    <Button className="w-full flex items-center justify-center">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-lg text-gray-500 mb-6">No packages found for this service type.</p>
              <div className="flex justify-center gap-4 mt-4">
                <Link to="/services">
                  <Button variant="outline">Browse All Services</Button>
                </Link>
              </div>
            </div>
          )}

          {/* Service Benefits Section */}
          {serviceData.options && serviceData.options.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Why Choose Our {serviceData.title}</h2>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">Premium Quality</h3>
                  <p className="text-gray-600">All our services are delivered with the highest quality standards to ensure maximum impact.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
                  <p className="text-gray-600">Quick turnaround times to help you boost your social presence without delays.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">24/7 Support</h3>
                  <p className="text-gray-600">Our customer support team is always available to assist you with any questions.</p>
                </div>
              </div>
            </div>
          )}

          {/* FAQ Section */}
          {serviceData.options && serviceData.options.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">How soon will I see results?</h3>
                  <p className="text-gray-600">Most services start showing results within 24-48 hours after purchase, with full delivery according to the package timeframe.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">Are these services safe for my accounts?</h3>
                  <p className="text-gray-600">Yes, we use safe methods that comply with platform guidelines to ensure your accounts remain in good standing.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">Can I get a refund if I'm not satisfied?</h3>
                  <p className="text-gray-600">We offer a satisfaction guarantee. If you're not happy with our services, contact our support team within 7 days of delivery.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ServicePage;
