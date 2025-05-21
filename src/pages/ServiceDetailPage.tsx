import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { toast } from 'sonner';
import { serviceDetailData } from '@/utils/serviceDetailData';
import { supabase } from '@/lib/supabase';

// Interface for package data
interface PackageData {
  id: string;
  name: string;
  description: string;
  price: number;
  discounted_price: number | null;
  is_featured: boolean;
}

const ServiceDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { formatCurrency } = useCurrency();
  const [quantity, setQuantity] = useState(1);
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [loading, setLoading] = useState(true);

  // Get service type and ID from URL path
  const pathParts = location.pathname.split('/').filter(Boolean);
  const serviceType = pathParts[1]; // e.g., 'youtube', 'instagram'
  const serviceId = pathParts[2]; // e.g., 'subscribers', 'followers'

  // Standardize service key for metadata lookup (for google alias)
  const standardizedServiceType = serviceType === 'google' ? 'google-reviews' : serviceType;
  const serviceKey = `${standardizedServiceType}-${serviceId}`;
  const serviceData = serviceDetailData[serviceKey];

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
    
    // Fetch packages from the database
    fetchPackages();
  }, [serviceData, serviceType, serviceId]);

  // Fetch packages from the database
  const fetchPackages = async () => {
    setLoading(true);
    try {
      // Try to get packages specific to this service type
      const { data: servicePackages, error: serviceError } = await supabase
        .from('product_packages')
        .select('*')
        .eq('service_type', serviceType)
        .eq('service_id', serviceId)
        .order('price');
      
      if (serviceError) {
        console.error('Error fetching service packages:', serviceError);
      }
      
      // If we found service-specific packages, use those
      if (servicePackages && servicePackages.length > 0) {
        // Get calculated prices for these packages
        const packagesWithPrices = await getPackagePrices(servicePackages);
        setPackages(packagesWithPrices);
      } else {
        // Otherwise, get featured packages
        const { data: featuredPackages, error: featuredError } = await supabase
          .from('product_packages')
          .select('*')
          .eq('is_featured', true)
          .order('price')
          .limit(3);
        
        if (featuredError) {
          console.error('Error fetching featured packages:', featuredError);
        }
        
        if (featuredPackages && featuredPackages.length > 0) {
          // Get calculated prices for these packages
          const packagesWithPrices = await getPackagePrices(featuredPackages);
          setPackages(packagesWithPrices);
        } else {
          // Last resort: get any packages
          const { data: anyPackages, error: anyError } = await supabase
            .from('product_packages')
            .select('*')
            .order('price')
            .limit(3);
          
          if (anyError) {
            console.error('Error fetching any packages:', anyError);
          }
          
          if (anyPackages && anyPackages.length > 0) {
            // Get calculated prices for these packages
            const packagesWithPrices = await getPackagePrices(anyPackages);
            setPackages(packagesWithPrices);
          } else {
            // If all else fails, use default packages
            setPackages(defaultPackages);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
      // Fallback to default packages
      setPackages(defaultPackages);
    } finally {
      setLoading(false);
    }
  };

  // Get calculated prices for packages
  const getPackagePrices = async (packagesList) => {
    try {
      // Use the database function to calculate prices if possible
      const { data: pricesData, error: pricesError } = await supabase
        .rpc('get_packages_with_prices');
      
      if (pricesError || !pricesData) {
        console.error('Error getting package prices:', pricesError);
        // Fallback: Calculate prices manually
        return packagesList.map(pkg => {
          return {
            ...pkg,
            price: pkg.price || 0,
            discounted_price: pkg.discounted_price || (pkg.price * (1 - (pkg.discount_percentage || 0) / 100))
          };
        });
      }
      
      // Match prices with packages
      return packagesList.map(pkg => {
        const priceData = pricesData.find(p => p.id === pkg.id);
        return {
          ...pkg,
          price: priceData?.calculated_price || pkg.price || 0,
          discounted_price: priceData?.calculated_discounted_price || pkg.discounted_price || null
        };
      });
    } catch (error) {
      console.error('Error processing package prices:', error);
      return packagesList;
    }
  };

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

  // Default packages for fallback
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

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin h-8 w-8 border-4 border-brand-blue border-t-transparent rounded-full mx-auto mb-4"></div>
                <p>Loading packages...</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-3">
                {packages.map((pkg) => (
                  <div key={pkg.id} className={`border rounded-lg p-6 hover:shadow-md transition-shadow ${pkg.is_featured ? 'border-brand-blue' : ''}`}>
                    <h3 className="font-bold text-xl mb-2">{pkg.name}</h3>
                    <p className="text-gray-600 mb-4">{pkg.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      {pkg.discounted_price ? (
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-brand-blue">{formatCurrency(pkg.discounted_price)}</span>
                          <span className="text-gray-500 line-through">{formatCurrency(pkg.price)}</span>
                        </div>
                      ) : (
                        <span className="text-2xl font-bold text-brand-blue">{formatCurrency(pkg.price)}</span>
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
            )}

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
