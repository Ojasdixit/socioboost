import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Static Google Reviews packages
const googleReviewsPackages = [
  {
    id: 'gr-pos-1',
    name: 'Google 10 Positive Reviews',
    description: 'Get 10 high-quality positive reviews from real users.',
    price: 49.99,
    discounted_price: 39.99,
    is_featured: true,
    detailPage: '/services/google/positive'
  },
  {
    id: 'gr-pos-2',
    name: 'Google 25 Positive Reviews',
    description: 'Build your reputation faster with 25 high-quality reviews.',
    price: 99.99,
    discounted_price: null,
    is_featured: false,
    detailPage: '/services/google/positive'
  },
  {
    id: 'gr-pos-3',
    name: 'Google 50 Positive Reviews',
    description: 'Comprehensive reputation boost with 50 authentic positive reviews.',
    price: 179.99,
    discounted_price: 159.99,
    is_featured: true,
    detailPage: '/services/google/positive'
  },
  {
    id: 'gr-rep-1',
    name: 'Google Reviews Management - Basic',
    description: 'Monthly management of your Google reviews including monitoring and response drafting.',
    price: 99.99,
    discounted_price: null,
    is_featured: false,
    detailPage: '/services/google/reputation'
  },
  {
    id: 'gr-rep-2',
    name: 'Google Reviews Management - Premium',
    description: 'Complete reputation management service including review monitoring, response management, and negative review mitigation.',
    price: 199.99,
    discounted_price: 179.99,
    is_featured: true,
    detailPage: '/services/google/reputation'
  }
];

const GoogleReviewsPage: React.FC = () => {
  return (
    <Layout>
      <div className="container-custom section-padding">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Google Reviews Services</h1>
          <p className="text-gray-600 mb-10 text-lg">
            Boost your business credibility with positive Google Reviews. 
            Our services help you improve your online reputation and increase customer trust.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {googleReviewsPackages.map((pkg) => (
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
            <h2 className="text-2xl font-bold mb-6">Why Google Reviews Matter</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Customer Trust</h3>
                <p className="text-gray-600">90% of consumers read online reviews before visiting a business.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Local SEO</h3>
                <p className="text-gray-600">Google reviews are a key factor in local search rankings.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Competitive Edge</h3>
                <p className="text-gray-600">Businesses with higher ratings typically outperform competitors.</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Are these reviews from real people?</h3>
                <p className="text-gray-600">Yes, all reviews are posted by real users with established Google accounts.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">How soon will the reviews appear?</h3>
                <p className="text-gray-600">Reviews are posted gradually over 1-2 weeks to maintain authenticity and avoid triggering Google's spam filters.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Can I specify what the reviews say?</h3>
                <p className="text-gray-600">Yes, you can provide general guidelines for review content, though we maintain some variation to ensure authenticity.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GoogleReviewsPage; 