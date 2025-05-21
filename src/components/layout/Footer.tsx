import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();
  
  const services = [
    { name: 'YouTube Services', link: '/services/youtube' },
    { name: 'Instagram Services', link: '/services/instagram' },
    { name: 'Facebook Services', link: '/services/facebook' },
    { name: 'Twitter Services', link: '/services/twitter' },
    { name: 'LinkedIn Services', link: '/services/linkedin' },
    { name: 'Google Reviews', link: '/services/google-reviews' },
    { name: 'Trustpilot Reviews', link: '/services/trustpilot' },
  ];

  const company = [
    { name: 'About Us', link: '/about' },
    { name: 'Contact', link: '/contact' },
    { name: 'Blog', link: '/blog' },
    { name: 'FAQ', link: '/faq' },
    { name: 'Careers', link: '/careers' },
  ];

  const legal = [
    { name: 'Privacy Policy', link: '/privacy-policy' },
    { name: 'Terms of Service', link: '/terms-of-service' },
    { name: 'Refund Policy', link: '/refund-policy' },
    { name: 'Cookies Policy', link: '/cookies-policy' },
    { name: 'Sitemap', link: '/sitemap' },
  ];

  return (
    <footer className="bg-gray-50 border-t">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <span className="text-2xl font-bold text-brand-blue">Social<span className="text-brand-pink">Boost</span></span>
            </Link>
            <p className="text-gray-600 mb-4">
              Your one-stop solution for all social media marketing needs. Boost your online presence with our premium services.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" aria-label="Facebook" className="text-gray-500 hover:text-brand-blue transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="text-gray-500 hover:text-brand-blue transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" aria-label="Instagram" className="text-gray-500 hover:text-brand-blue transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" aria-label="LinkedIn" className="text-gray-500 hover:text-brand-blue transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://youtube.com" aria-label="YouTube" className="text-gray-500 hover:text-brand-blue transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((item) => (
                <li key={item.name}>
                  <Link to={item.link} className="text-gray-600 hover:text-brand-blue transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.name}>
                  <Link to={item.link} className="text-gray-600 hover:text-brand-blue transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Subscribe */}
          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2 mb-6">
              {legal.map((item) => (
                <li key={item.name}>
                  <Link to={item.link} className="text-gray-600 hover:text-brand-blue transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
              />
              <button className="bg-brand-blue text-white px-4 py-2 rounded-r-lg hover:bg-opacity-90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {year} SocialBoost. All rights reserved.</p>
          <p className="mt-2">
            <span className="font-medium">Payment Methods:</span> Visa, Mastercard, PayPal, Bitcoin
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
