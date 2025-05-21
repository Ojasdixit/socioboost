import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Static Facebook packages
const facebookPackages = [
  {
    id: 'fb-likes-1',
    name: 'Facebook 1,000 Page Likes',
    description: 'Real and active Facebook page likes to boost credibility.',
    price: 29.99,
    discounted_price: 24.99,
    is_featured: true,
    detailPage: '/services/facebook/page-likes'
  },
  {
    id: 'fb-likes-2',
    name: 'Facebook 2,500 Page Likes',
    description: 'Medium package with 2,500 Facebook page likes.',
    price: 59.99,
    discounted_price: null,
    is_featured: false,
    detailPage: '/services/facebook/page-likes'
  },
  {
    id: 'fb-followers-1',
    name: 'Facebook 1,000 Followers',
    description: 'Increase your page followers for better reach.',
    price: 25.99,
    discounted_price: null,
    is_featured: false,
    detailPage: '/services/facebook/followers'
  },
  {
    id: 'fb-followers-2',
    name: 'Facebook 2,500 Followers',
    description: 'Grow your Facebook audience with 2,500 followers.',
    price: 49.99,
    discounted_price: 44.99,
    is_featured: true,
    detailPage: '/services/facebook/followers'
  },
  {
    id: 'fb-post-likes-1',
    name: 'Facebook 500 Post Likes',
    description: 'Boost engagement on your posts with real likes.',
    price: 19.99,
    discounted_price: null,
    is_featured: false,
    detailPage: '/services/facebook/post-likes'
  },
  {
    id: 'fb-post-likes-2',
    name: 'Facebook 1,000 Post Likes',
    description: 'Premium package with 1,000 post likes for maximum visibility.',
    price: 34.99,
    discounted_price: 29.99,
    is_featured: true,
    detailPage: '/services/facebook/post-likes'
  }
];

const FacebookPage: React.FC = () => {
  return (
    <Layout>
      <div className="container-custom section-padding">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Facebook Growth Services</h1>
          <p className="text-gray-600 mb-10 text-lg">
            Boost your Facebook presence with our comprehensive range of engagement services.
            Grow your page likes, followers, and post engagement to increase your reach and credibility.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {facebookPackages.map((pkg) => (
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

          {/* Facebook Benefits Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Why Choose Our Facebook Services</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Business Credibility</h3>
                <p className="text-gray-600">More likes and followers build trust in your business page.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Increased Reach</h3>
                <p className="text-gray-600">Higher engagement helps your content reach more people through Facebook's algorithm.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Organic Growth</h3>
                <p className="text-gray-600">Initial boost in engagement attracts more organic followers and interactions.</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Is it safe for my Facebook page?</h3>
                <p className="text-gray-600">Yes, our methods comply with Facebook's terms of service and are delivered gradually to ensure account safety.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">How soon will I see results?</h3>
                <p className="text-gray-600">Most services start showing results within 24-48 hours, with full delivery according to the package timeframe.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Do I need to provide admin access?</h3>
                <p className="text-gray-600">No, we don't require admin access to your page. We only need your page URL to deliver our services.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FacebookPage; 