import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';

const CookiesPolicy = () => {
  useEffect(() => {
    document.title = 'Cookies Policy | SocialBoost';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Read our cookies policy to learn how we use cookies to enhance your experience.');
    } else {
      const metaTag = document.createElement('meta');
      metaTag.name = 'description';
      metaTag.content = 'Read our cookies policy to learn how we use cookies to enhance your experience.';
      document.head.appendChild(metaTag);
    }
  }, []);

  return (
    <Layout>
      <div className="container-custom py-16 md:py-24 text-center">
        <h1 className="text-4xl font-bold mb-4">Cookies Policy</h1>
        <p className="mb-8 text-lg text-gray-700">This website uses cookies to ensure you get the best experience on our website.</p>
        <div className="text-gray-500">For more information, please contact us.</div>
      </div>
    </Layout>
  );
};

export default CookiesPolicy; 