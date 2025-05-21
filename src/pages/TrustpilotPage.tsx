import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Static Trustpilot packages
const trustpilotPackages = [
  {
    id: 'tp-rev-1',
    name: 'Trustpilot 10 Reviews',
    description: 'Get 10 authentic positive Trustpilot reviews.',
    price: 59.99,
    discounted_price: 49.99,
    is_featured: true,
    detailPage: '/services/trustpilot/paid-reviews'
  },
  {
    id: 'tp-rev-2',
    name: 'Trustpilot 25 Reviews',
    description: 'Medium package with 25 quality Trustpilot reviews.',
    price: 129.99,
    discounted_price: null,
    is_featured: false,
    detailPage: '/services/trustpilot/paid-reviews'
  },
  {
    id: 'tp-rev-3',
    name: 'Trustpilot 50 Reviews',
    description: 'Premium package with 50 detailed positive reviews.',
    price: 229.99,
    discounted_price: 199.99,
    is_featured: true,
    detailPage: '/services/trustpilot/paid-reviews'
  },
  {
    id: 'tp-custom-1',
    name: 'Trustpilot Custom Solution - Basic',
    description: 'Customized reviews based on your specific requirements and business needs.',
    price: 99.99,
    discounted_price: null,
    is_featured: false,
    detailPage: '/services/trustpilot/custom'
  },
  {
    id: 'tp-custom-2',
    name: 'Trustpilot Custom Solution - Premium',
    description: 'Advanced customized review strategy with ongoing management and optimization.',
    price: 249.99,
    discounted_price: 229.99,
    is_featured: true,
    detailPage: '/services/trustpilot/custom'
  }
];

const TrustpilotPage: React.FC = () => {
  return (
    <Layout>
      <div className="container-custom section-padding">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Trustpilot Reviews Services</h1>
          <p className="text-gray-600 mb-10 text-lg">
            Enhance your business reputation with high-quality Trustpilot reviews. 
            Our services help you build customer trust and improve conversion rates.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {trustpilotPackages.map((pkg) => (
              <div key={pkg.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-xl mb-2">{pkg.name}</h3>
                <p className="text-gray-600 mb-4">{pkg.description}</p>
                <div className="flex items-center justify-between mb-4">
                  {pkg.discounted_price ? (
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-brand-blue">${pkg.discounted_price}</span>
                      <span className="text-gray-500 line-through">${pkg.price}</span>
                    </div>
                  ) : (
                    <span className="text-2xl font-bold text-brand-blue">${pkg.price}</span>
                  )}
                  {pkg.is_featured && (
                    <span className="text-sm bg-brand-pink text-white py-1 px-2 rounded-full">Featured</span>
                  )}
                </div>
                <Link to={pkg.detailPage}>
                  <Button className="w-full flex items-center justify-center">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Why Trustpilot Reviews Matter</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Global Recognition</h3>
                <p className="text-gray-600">Trustpilot is recognized worldwide as a trusted review platform.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Conversion Boost</h3>
                <p className="text-gray-600">Positive Trustpilot reviews can increase conversion rates by up to 35%.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">SEO Benefits</h3>
                <p className="text-gray-600">Trustpilot reviews can improve your search engine visibility and rankings.</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Are these reviews from real people?</h3>
                <p className="text-gray-600">Yes, all reviews are posted by real users with established Trustpilot accounts.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">How soon will the reviews appear?</h3>
                <p className="text-gray-600">Reviews are posted gradually over 1-2 weeks to maintain authenticity and avoid triggering Trustpilot's verification systems.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Can I customize the review content?</h3>
                <p className="text-gray-600">Yes, with our custom solutions you can provide specific guidelines for review content while maintaining authenticity.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TrustpilotPage; 