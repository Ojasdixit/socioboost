
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { defaultServices, ServicePageProps } from '@/utils/serviceData';

const ServicePage: React.FC = () => {
  const { serviceType } = useParams<{ serviceType: string }>();
  
  const serviceData = serviceType && defaultServices[serviceType] 
    ? defaultServices[serviceType] 
    : {
        title: 'Service Details',
        description: 'This service is coming soon. Please check back later.',
        options: []
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
                    <span className="text-sm bg-gray-100 py-1 px-2 rounded-full">{option.delivery}</span>
                  </div>
                  {option.detailPage ? (
                    <Link to={option.detailPage}>
                      <Button className="w-full flex items-center justify-center">
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Button className="w-full">Add to Cart</Button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-lg text-gray-500 mb-6">Detailed service options coming soon!</p>
              <Button>Contact Us for Details</Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ServicePage;
