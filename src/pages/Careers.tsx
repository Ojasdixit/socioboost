import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';

const Careers = () => {
  useEffect(() => {
    document.title = 'Careers | SocialBoost';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Join our team at SocialBoost! Explore career opportunities and help us grow.');
    } else {
      const metaTag = document.createElement('meta');
      metaTag.name = 'description';
      metaTag.content = 'Join our team at SocialBoost! Explore career opportunities and help us grow.';
      document.head.appendChild(metaTag);
    }
  }, []);

  return (
    <Layout>
      <div className="container-custom py-16 md:py-24 text-center">
        <h1 className="text-4xl font-bold mb-4">Careers</h1>
        <p className="mb-8 text-lg text-gray-700">Join our team! We're always looking for talented people to help us grow.</p>
        <div className="text-gray-500">No open positions at the moment. Please check back later.</div>
      </div>
    </Layout>
  );
};

export default Careers; 