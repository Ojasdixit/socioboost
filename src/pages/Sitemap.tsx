import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';

const links = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
  { name: 'Contact', to: '/contact' },
  { name: 'Blog', to: '/blog' },
  { name: 'FAQ', to: '/faq' },
  { name: 'Careers', to: '/careers' },
  { name: 'Privacy Policy', to: '/privacy-policy' },
  { name: 'Terms of Service', to: '/terms-of-service' },
  { name: 'Refund Policy', to: '/refund-policy' },
  { name: 'Cookies Policy', to: '/cookies-policy' },
];

const Sitemap = () => {
  useEffect(() => {
    document.title = 'Sitemap | SocialBoost';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Sitemap for SocialBoost. Quickly find all important pages and resources.');
    } else {
      const metaTag = document.createElement('meta');
      metaTag.name = 'description';
      metaTag.content = 'Sitemap for SocialBoost. Quickly find all important pages and resources.';
      document.head.appendChild(metaTag);
    }
  }, []);

  return (
    <Layout>
      <div className="container-custom py-16 md:py-24 text-center">
        <h1 className="text-4xl font-bold mb-4">Sitemap</h1>
        <ul className="space-y-2">
          {links.map(link => (
            <li key={link.to}>
              <Link className="text-blue-600 hover:underline" to={link.to}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Sitemap; 