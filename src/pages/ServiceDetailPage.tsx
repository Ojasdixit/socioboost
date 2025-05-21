import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { serviceDetailData } from '@/utils/serviceDetailData';

const ServiceDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  // Get service type and ID from URL path
  const pathParts = location.pathname.split('/').filter(Boolean);
  const serviceType = pathParts[1]; // e.g., 'youtube', 'instagram'
  const serviceId = pathParts[2]; // e.g., 'subscribers', 'followers'

  // Get service data
  const serviceKey = `${serviceType}-${serviceId}`;
  const serviceData = serviceDetailData[serviceKey];

  useEffect(() => {
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

  const handleAddToCart = (product: typeof serviceData.products[0]) => {
    const item = {
      id: product.id,
      name: product.name,
      price: product.discountedPrice || product.price,
      quantity,
      serviceType: serviceType || '',
    };
    
    addToCart(item);
    toast.success('Item added to cart!');
  };

  if (!serviceData) {
    return (
      <Layout>
        <div className="container-custom py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-8">Service Not Found</h1>
            <Button onClick={() => navigate(-1)}>Back to Services</Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">{serviceData.title}</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
            <p className="text-gray-600 mb-6 text-lg">{serviceData.longDescription}</p>
          </div>

          {/* Packages Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {serviceData.products.map((product) => (
              <div key={product.id} className={`bg-white rounded-lg shadow-sm p-6 ${product.popular ? 'border-2 border-brand-pink' : ''}`}>
                {product.popular && (
                  <div className="bg-brand-pink text-white text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="mb-4">
                  {product.discountedPrice ? (
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-brand-pink">${product.discountedPrice}</span>
                      <span className="text-gray-500 line-through">${product.price}</span>
                    </div>
                  ) : (
                    <span className="text-2xl font-bold text-brand-pink">${product.price}</span>
                  )}
                </div>
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-brand-pink">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="font-semibold">Quantity:</span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">{quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
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
    </Layout>
  );
};

export default ServiceDetailPage;
