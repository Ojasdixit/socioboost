import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Static Instagram packages
const instagramPackages = [
  {
    id: 'ig-fol-1',
    name: 'Instagram 1000 Followers',
    description: 'Grow your Instagram presence with 1000 followers.',
    price: 19.99,
    discounted_price: null,
    is_featured: false,
    detailPage: '/services/instagram/followers'
  },
  {
    id: 'ig-fol-2',
    name: 'Instagram 2500 Followers',
    description: 'Medium package with 2500 Instagram followers.',
    price: 39.99,
    discounted_price: 34.99,
    is_featured: true,
    detailPage: '/services/instagram/followers'
  },
  {
    id: 'ig-likes-1',
    name: 'Instagram 500 Likes',
    description: '500 likes spread across your recent posts.',
    price: 9.99,
    discounted_price: null,
    is_featured: false,
    detailPage: '/services/instagram/likes'
  },
  {
    id: 'ig-likes-2',
    name: 'Instagram 1000 Likes',
    description: '1000 likes to boost your engagement rate.',
    price: 17.99,
    discounted_price: 14.99,
    is_featured: true,
    detailPage: '/services/instagram/likes'
  },
  {
    id: 'ig-comments-1',
    name: 'Instagram 50 Comments',
    description: 'Custom comments to increase post engagement.',
    price: 29.99,
    discounted_price: null,
    is_featured: false,
    detailPage: '/services/instagram/comments'
  },
  {
    id: 'ig-views-1',
    name: 'Instagram 5000 Video Views',
    description: 'Boost your Reels and video content with high-quality views.',
    price: 19.99,
    discounted_price: 16.99,
    is_featured: true,
    detailPage: '/services/instagram/views'
  }
];

const InstagramPage: React.FC = () => {
  return (
    <Layout>
      <div className="container-custom section-padding">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Instagram Growth Services</h1>
          <p className="text-gray-600 mb-10 text-lg">
            Enhance your Instagram presence with our premium engagement services. 
            Grow your following, increase post engagement, and boost your social proof.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {instagramPackages.map((pkg) => (
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

          {/* Instagram Benefits Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Why Choose Our Instagram Services</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">High-Quality Engagement</h3>
                <p className="text-gray-600">All our Instagram services provide real engagement from active users.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Improved Reach</h3>
                <p className="text-gray-600">Higher engagement helps your content reach more people through Instagram's algorithm.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Brand Credibility</h3>
                <p className="text-gray-600">Increased followers and engagement build social proof for your brand or personal account.</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Is it safe for my Instagram account?</h3>
                <p className="text-gray-600">Yes, our methods comply with Instagram's guidelines and are delivered gradually to ensure account safety.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">How soon will I see results?</h3>
                <p className="text-gray-600">Most services start showing results within 24-48 hours, with full delivery according to the package timeframe.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Do I need to share my password?</h3>
                <p className="text-gray-600">No, we never ask for your Instagram password. We only need your username or post URL to deliver our services.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InstagramPage; 