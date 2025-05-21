import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

// Static YouTube packages
const youtubePackages = [
  {
    id: 'yt-sub-1',
    name: 'YouTube 500 Subscribers',
    description: 'Get 500 high-quality YouTube subscribers to boost your channel credibility.',
    price: 29.99,
    discounted_price: 24.99,
    is_featured: true,
    detailPage: '/services/youtube/subscribers'
  },
  {
    id: 'yt-sub-2',
    name: 'YouTube 1000 Subscribers',
    description: 'Grow your channel with 1000 real YouTube subscribers.',
    price: 49.99,
    discounted_price: null,
    is_featured: false,
    detailPage: '/services/youtube/subscribers'
  },
  {
    id: 'yt-views-1',
    name: 'YouTube 5000 Views',
    description: 'Boost your video performance with 5000 high-quality views.',
    price: 29.99,
    discounted_price: 24.99,
    is_featured: true,
    detailPage: '/services/youtube/views'
  },
  {
    id: 'yt-likes-1',
    name: 'YouTube 1000 Likes',
    description: 'Increase engagement on your videos with authentic likes.',
    price: 19.99,
    discounted_price: null,
    is_featured: false,
    detailPage: '/services/youtube/likes'
  },
  {
    id: 'yt-comments-1',
    name: 'YouTube 100 Comments',
    description: 'Get relevant comments on your videos to boost engagement.',
    price: 39.99,
    discounted_price: 34.99,
    is_featured: true,
    detailPage: '/services/youtube/comments'
  },
  {
    id: 'yt-hours-1',
    name: 'YouTube 4000 Watch Hours',
    description: 'Reach the YouTube Partner Program requirement with our watch hours package.',
    price: 149.99,
    discounted_price: 129.99,
    is_featured: true,
    detailPage: '/services/youtube/watch-hours'
  }
];

const YouTubePage: React.FC = () => {
  return (
    <Layout>
      <div className="container-custom section-padding">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">YouTube Growth Services</h1>
          <p className="text-gray-600 mb-10 text-lg">
            Boost your YouTube presence with our comprehensive range of engagement services. 
            Increase your subscribers, views, likes, and overall channel performance.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {youtubePackages.map((pkg) => (
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

          {/* YouTube Benefits Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Why Choose Our YouTube Services</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Real Engagement</h3>
                <p className="text-gray-600">All our YouTube services provide real engagement from active users, not bots.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Algorithm Boost</h3>
                <p className="text-gray-600">Increased engagement helps your videos get recommended by YouTube's algorithm.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Monetization Support</h3>
                <p className="text-gray-600">Our services help you reach the requirements for the YouTube Partner Program.</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Is it safe for my YouTube channel?</h3>
                <p className="text-gray-600">Yes, our methods comply with YouTube's terms of service and are delivered gradually to ensure account safety.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">How soon will I see results?</h3>
                <p className="text-gray-600">Most services start showing results within 24-48 hours, with full delivery according to the package timeframe.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Will these subscribers interact with my content?</h3>
                <p className="text-gray-600">While we provide real subscribers, engagement levels may vary. For maximum interaction, continue creating quality content.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default YouTubePage; 