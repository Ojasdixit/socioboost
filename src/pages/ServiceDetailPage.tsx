import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { serviceDetailData } from '@/utils/serviceDetailData';

// Static package data for each service type
const staticPackages = {
  'youtube-subscribers': [
    {
      id: 'yt-sub-1',
      name: 'YouTube 500 Subscribers',
      description: 'Get 500 high-quality YouTube subscribers to boost your channel credibility.',
      price: 29.99,
      discounted_price: 24.99,
      is_featured: true
    },
    {
      id: 'yt-sub-2',
      name: 'YouTube 1000 Subscribers',
      description: 'Grow your channel with 1000 real YouTube subscribers.',
      price: 49.99,
      discounted_price: null,
      is_featured: false
    },
    {
      id: 'yt-sub-3',
      name: 'YouTube 2500 Subscribers',
      description: 'Premium package with 2500 subscribers for serious content creators.',
      price: 99.99,
      discounted_price: 89.99,
      is_featured: true
    }
  ],
  'youtube-views': [
    {
      id: 'yt-views-1',
      name: 'YouTube 1000 Views',
      description: 'Get 1000 high-retention views for your YouTube videos.',
      price: 9.99,
      discounted_price: null,
      is_featured: false
    },
    {
      id: 'yt-views-2',
      name: 'YouTube 5000 Views',
      description: 'Boost your video performance with 5000 high-quality views.',
      price: 29.99,
      discounted_price: 24.99,
      is_featured: true
    },
    {
      id: 'yt-views-3',
      name: 'YouTube 10000 Views',
      description: 'Get your content noticed with 10000 views across your videos.',
      price: 49.99,
      discounted_price: 39.99,
      is_featured: false
    }
  ],
  'instagram-followers': [
    {
      id: 'ig-fol-1',
      name: 'Instagram 1000 Followers',
      description: 'Grow your Instagram presence with 1000 followers.',
      price: 19.99,
      discounted_price: null,
      is_featured: false
    },
    {
      id: 'ig-fol-2',
      name: 'Instagram 2500 Followers',
      description: 'Medium package with 2500 Instagram followers.',
      price: 39.99,
      discounted_price: 34.99,
      is_featured: true
    },
    {
      id: 'ig-fol-3',
      name: 'Instagram 5000 Followers',
      description: 'Premium package with 5000 followers for serious influencers.',
      price: 69.99,
      discounted_price: 59.99,
      is_featured: false
    }
  ],
  'instagram-likes': [
    {
      id: 'ig-likes-1',
      name: 'Instagram 500 Likes',
      description: '500 likes spread across your recent posts.',
      price: 9.99,
      discounted_price: null,
      is_featured: false
    },
    {
      id: 'ig-likes-2',
      name: 'Instagram 1000 Likes',
      description: '1000 likes to boost your engagement rate.',
      price: 17.99,
      discounted_price: 14.99,
      is_featured: true
    }
  ],
  'facebook-followers': [
    {
      id: 'fb-fol-1',
      name: 'Facebook 1000 Followers',
      description: 'Grow your Facebook page with 1000 followers.',
      price: 19.99,
      discounted_price: null,
      is_featured: false
    },
    {
      id: 'fb-fol-2',
      name: 'Facebook 2500 Followers',
      description: 'Medium package with 2500 Facebook followers.',
      price: 39.99,
      discounted_price: 34.99,
      is_featured: true
    }
  ],
  'twitter-followers': [
    {
      id: 'tw-fol-1',
      name: 'Twitter 1000 Followers',
      description: 'Grow your Twitter profile with 1000 followers.',
      price: 19.99,
      discounted_price: null,
      is_featured: false
    },
    {
      id: 'tw-fol-2',
      name: 'Twitter 2500 Followers',
      description: 'Medium package with 2500 Twitter followers.',
      price: 39.99,
      discounted_price: 34.99,
      is_featured: true
    }
  ],
  'google-positive': [
    {
      id: 'gr-pos-1',
      name: 'Google 10 Positive Reviews',
      description: 'Boost your business with 10 positive Google reviews.',
      price: 49.99,
      discounted_price: 39.99,
      is_featured: true
    },
    {
      id: 'gr-pos-2',
      name: 'Google 25 Positive Reviews',
      description: 'Comprehensive package with 25 detailed positive reviews.',
      price: 99.99,
      discounted_price: null,
      is_featured: false
    }
  ],
  'trustpilot-paid-reviews': [
    {
      id: 'tp-rev-1',
      name: 'Trustpilot 10 Reviews',
      description: 'Enhance your business reputation with 10 positive Trustpilot reviews.',
      price: 59.99,
      discounted_price: 49.99,
      is_featured: true
    },
    {
      id: 'tp-rev-2',
      name: 'Trustpilot 25 Reviews',
      description: 'Premium package with 25 detailed Trustpilot reviews.',
      price: 119.99,
      discounted_price: null,
      is_featured: false
    }
  ]
};

// Default packages for any service type not explicitly defined
const defaultPackages = [
  {
    id: 'default-1',
    name: 'Basic Package',
    description: 'Entry-level package to boost your social media presence.',
    price: 19.99,
    discounted_price: null,
    is_featured: false
  },
  {
    id: 'default-2',
    name: 'Standard Package',
    description: 'Our most popular package with great value for money.',
    price: 39.99,
    discounted_price: 34.99,
    is_featured: true
  },
  {
    id: 'default-3',
    name: 'Premium Package',
    description: 'Advanced package for professional social media growth.',
    price: 79.99,
    discounted_price: 69.99,
    is_featured: false
  }
];

const ServiceDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  // Get service type and ID from URL path
  const pathParts = location.pathname.split('/').filter(Boolean);
  const serviceType = pathParts[1]; // e.g., 'youtube', 'instagram'
  const serviceId = pathParts[2]; // e.g., 'subscribers', 'followers'

  // Standardize service key for metadata lookup (for google alias)
  const standardizedServiceType = serviceType === 'google' ? 'google-reviews' : serviceType;
  const serviceKey = `${standardizedServiceType}-${serviceId}`;
  const serviceData = serviceDetailData[serviceKey];

  // Get packages for this service type and ID
  const servicePackageKey = `${serviceType}-${serviceId}`;
  const packages = staticPackages[servicePackageKey] || defaultPackages;

  useEffect(() => {
    // Set page metadata
    if (serviceData) {
      document.title = `${serviceData.title} | SocialBoost`;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute('content', serviceData.description);
      } else {
        const metaTag = document.createElement('meta');
        metaTag.name = 'description';
        metaTag.content = serviceData.description;
        document.head.appendChild(metaTag);
      }
    }
  }, [serviceData]);

  const handleAddToCart = (pkg) => {
    addToCart({
      id: pkg.id,
      name: pkg.name,
      price: pkg.discounted_price || pkg.price,
      quantity,
      serviceType: serviceType || '',
    });
    toast.success('Added to cart!');
  };

  if (!serviceData) {
    return (
      <Layout>
        <div className="container-custom section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Service Not Found</h1>
            <p className="text-gray-600 mb-10 text-lg">The service you're looking for doesn't exist or is coming soon.</p>
            <Button onClick={() => navigate('/services')}>Browse Services</Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom section-padding">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">{serviceData.title}</h1>
          <p className="text-gray-600 mb-10 text-lg">{serviceData.description}</p>

          <div className="grid gap-10 mb-16">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-semibold mb-6">About This Service</h2>
              <p className="text-gray-600">{serviceData.longDescription}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {packages.map((pkg) => (
                <div key={pkg.id} className={`border rounded-lg p-6 hover:shadow-md transition-shadow ${pkg.is_featured ? 'border-brand-blue' : ''}`}>
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
                  <Button 
                    className="w-full" 
                    onClick={() => handleAddToCart(pkg)}
                  >
                    Add to Cart
                  </Button>
                </div>
              ))}
            </div>

            {/* Service Benefits */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-semibold mb-6">Why Choose Our Service</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold text-lg mb-2">✓ Premium Quality</h3>
                  <p className="text-gray-600 mb-4">All our services are delivered with the highest quality standards to ensure maximum impact.</p>
                  
                  <h3 className="font-semibold text-lg mb-2">✓ Fast Delivery</h3>
                  <p className="text-gray-600 mb-4">Quick turnaround times to help you boost your social presence without delays.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">✓ 24/7 Support</h3>
                  <p className="text-gray-600 mb-4">Our customer support team is always available to assist you with any questions.</p>
                  
                  <h3 className="font-semibold text-lg mb-2">✓ Money-Back Guarantee</h3>
                  <p className="text-gray-600">If you're not satisfied with our services, we offer a 7-day money-back guarantee.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {serviceData.faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                    <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ServiceDetailPage;
