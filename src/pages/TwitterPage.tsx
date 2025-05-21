import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Static Twitter packages
const twitterPackages = [
  {
    id: 'tw-fol-1',
    name: 'Twitter 1,000 Followers',
    description: 'Real Twitter followers to boost your profile credibility.',
    price: 29.99,
    discounted_price: 24.99,
    is_featured: true,
    detailPage: '/services/twitter/followers'
  },
  {
    id: 'tw-fol-2',
    name: 'Twitter 2,500 Followers',
    description: 'Medium package with 2,500 Twitter followers.',
    price: 59.99,
    discounted_price: null,
    is_featured: false,
    detailPage: '/services/twitter/followers'
  },
  {
    id: 'tw-likes-1',
    name: 'Twitter 500 Likes',
    description: 'Increase engagement on your tweets with authentic likes.',
    price: 14.99,
    discounted_price: null,
    is_featured: false,
    detailPage: '/services/twitter/likes'
  },
  {
    id: 'tw-likes-2',
    name: 'Twitter 1,000 Likes',
    description: 'Premium package with 1,000 likes for maximum visibility.',
    price: 24.99,
    discounted_price: 19.99,
    is_featured: true,
    detailPage: '/services/twitter/likes'
  },
  {
    id: 'tw-retweets-1',
    name: 'Twitter 250 Retweets',
    description: 'Expand your reach with quality retweets.',
    price: 19.99,
    discounted_price: null,
    is_featured: false,
    detailPage: '/services/twitter/retweets'
  },
  {
    id: 'tw-retweets-2',
    name: 'Twitter 500 Retweets',
    description: 'Boost your content distribution with 500 retweets.',
    price: 34.99,
    discounted_price: 29.99,
    is_featured: true,
    detailPage: '/services/twitter/retweets'
  }
];

const TwitterPage: React.FC = () => {
  return (
    <Layout>
      <div className="container-custom section-padding">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Twitter Growth Services</h1>
          <p className="text-gray-600 mb-10 text-lg">
            Enhance your Twitter presence with our premium engagement services. 
            Grow your following, increase tweet engagement, and expand your reach.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {twitterPackages.map((pkg) => (
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

          {/* Twitter Benefits Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Why Choose Our Twitter Services</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Enhanced Credibility</h3>
                <p className="text-gray-600">More followers and engagement build trust in your Twitter profile.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Wider Reach</h3>
                <p className="text-gray-600">Retweets and likes help your content reach a broader audience.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Algorithmic Boost</h3>
                <p className="text-gray-600">Higher engagement signals to Twitter's algorithm that your content is valuable.</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Is it safe for my Twitter account?</h3>
                <p className="text-gray-600">Yes, our methods comply with Twitter's guidelines and are delivered gradually to ensure account safety.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">How soon will I see results?</h3>
                <p className="text-gray-600">Most services start showing results within 24-48 hours, with full delivery according to the package timeframe.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Do I need to share my password?</h3>
                <p className="text-gray-600">No, we never ask for your Twitter password. We only need your username or tweet URL to deliver our services.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TwitterPage; 