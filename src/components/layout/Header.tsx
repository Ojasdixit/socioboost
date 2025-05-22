import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import CurrencySelector from '@/components/CurrencySelector';
import { useCart } from '@/context/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { totalItems } = useCart();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle mouse enter for desktop dropdown
  const handleMouseEnter = (dropdown: string) => {
    setOpenDropdown(dropdown);
  };

  // Handle mouse leave for desktop dropdown
  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  // For mobile, we still want to use click behavior
  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const services = [
    { 
      name: 'YouTube',
      link: '/services/youtube',
      submenu: [
        { name: 'Subscribers', link: '/services/youtube/subscribers' },
        { name: 'Views', link: '/services/youtube/views' },
        { name: 'Likes', link: '/services/youtube/likes' },
        { name: 'Comments', link: '/services/youtube/comments' },
        { name: 'Watch Hours', link: '/services/youtube/watch-hours' },
      ]
    },
    { 
      name: 'Instagram',
      link: '/services/instagram',
      submenu: [
        { name: 'Followers', link: '/services/instagram/followers' },
        { name: 'Likes', link: '/services/instagram/likes' },
        { name: 'Views', link: '/services/instagram/views' },
        { name: 'Comments', link: '/services/instagram/comments' },
      ]
    },
    { 
      name: 'Facebook',
      link: '/services/facebook',
      submenu: [
        { name: 'Page Likes', link: '/services/facebook/page-likes' },
        { name: 'Post Likes', link: '/services/facebook/post-likes' },
        { name: 'Followers', link: '/services/facebook/followers' },
      ]
    },
    { 
      name: 'Twitter',
      link: '/services/twitter',
      submenu: [
        { name: 'Followers', link: '/services/twitter/followers' },
        { name: 'Likes', link: '/services/twitter/likes' },
        { name: 'Retweets', link: '/services/twitter/retweets' },
      ]
    },
    { 
      name: 'LinkedIn',
      link: '/services/linkedin',
      submenu: [
        { name: 'Followers', link: '/services/linkedin/followers' },
        { name: 'Likes', link: '/services/linkedin/likes' },
      ]
    },
    {
      name: 'Google Reviews',
      link: '/services/google-reviews',
      submenu: [
        { name: 'Positive Reviews', link: '/services/google-reviews/positive' },
        { name: 'Reputation Management', link: '/services/google-reviews/reputation' },
      ]
    },
    {
      name: 'Trustpilot',
      link: '/services/trustpilot',
      submenu: [
        { name: 'Paid Reviews', link: '/services/trustpilot/paid-reviews' },
        { name: 'Custom Reviews', link: '/services/trustpilot/custom' },
      ]
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      {/* Announcement bar */}
      <div className="bg-brand-blue text-white py-2 text-center text-sm font-medium">
        <p>🎓 Special 20% Student Discount Available! Use code: STUDENT20</p>
      </div>
      
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-brand-blue">Social<span className="text-brand-pink">Boost</span></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div 
              className="relative group" 
              onMouseEnter={() => handleMouseEnter('services')}
              onMouseLeave={handleMouseLeave}
              ref={dropdownRef}
            >
              <button 
                className="flex items-center space-x-1 text-gray-700 hover:text-brand-blue"
              >
                <span>Services</span>
                <ChevronDown size={16} />
              </button>
              
              {/* Updated multi-column services dropdown */}
              <div className={`absolute top-full left-0 mt-1 bg-white shadow-lg rounded-lg p-6 w-[600px] transition-all duration-300 ${openDropdown === 'services' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 invisible'}`}>
                <div className="grid grid-cols-3 gap-4">
                  {services.map((service) => (
                    <div key={service.name} className="mb-4">
                      <Link 
                        to={service.link} 
                        className="block font-medium text-gray-800 hover:text-brand-blue py-1"
                      >
                        {service.name}
                      </Link>
                      <div className="ml-2 border-l pl-2 space-y-1 mt-1">
                        {service.submenu.map((subitem) => (
                          <Link 
                            key={subitem.name}
                            to={subitem.link} 
                            className="block text-sm text-gray-600 hover:text-brand-blue py-1"
                          >
                            {subitem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <Link to="/blog" className="text-gray-700 hover:text-brand-blue">Blog</Link>
            <Link to="/about" className="text-gray-700 hover:text-brand-blue">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-brand-blue">Contact</Link>
            <Link to="/faq" className="text-gray-700 hover:text-brand-blue">FAQ</Link>
          </nav>

          {/* Right Side Items */}
          <div className="hidden md:flex items-center space-x-4">
            <CurrencySelector />
            
            <Link to="/cart" className="relative text-gray-700 hover:text-brand-blue">
              <ShoppingCart />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-pink text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            <Link to="/login">
              <Button variant="outline" className="mr-2">Log In</Button>
            </Link>
            
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <div>
                <button 
                  className="flex items-center justify-between w-full py-2 text-gray-700"
                  onClick={() => toggleDropdown('mobile-services')}
                >
                  <span>Services</span>
                  <ChevronDown size={16} className={`transition-transform duration-200 ${openDropdown === 'mobile-services' ? 'rotate-180' : ''}`} />
                </button>
                
                {openDropdown === 'mobile-services' && (
                  <div className="ml-4 mt-2 space-y-4 max-h-[60vh] overflow-y-auto">
                    {services.map((service) => (
                      <div key={service.name} className="mb-2">
                        <Link 
                          to={service.link} 
                          className="block font-medium text-gray-800 hover:text-brand-blue py-1"
                        >
                          {service.name}
                        </Link>
                        <div className="ml-4 space-y-1 mt-1">
                          {service.submenu.map((subitem) => (
                            <Link 
                              key={subitem.name}
                              to={subitem.link} 
                              className="block text-sm text-gray-600 hover:text-brand-blue py-1"
                            >
                              {subitem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <Link to="/blog" className="py-2 text-gray-700 hover:text-brand-blue">Blog</Link>
              <Link to="/about" className="py-2 text-gray-700 hover:text-brand-blue">About</Link>
              <Link to="/contact" className="py-2 text-gray-700 hover:text-brand-blue">Contact</Link>
              <Link to="/faq" className="py-2 text-gray-700 hover:text-brand-blue">FAQ</Link>
              
              <div className="pt-4 flex items-center justify-between border-t">
                <CurrencySelector />
                
                <Link to="/cart" className="relative text-gray-700 hover:text-brand-blue">
                  <ShoppingCart />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-brand-pink text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </div>
              
              <div className="pt-4 flex flex-col space-y-2 border-t">
                <Link to="/login">
                  <Button variant="outline" className="w-full">Log In</Button>
                </Link>
                
                <Link to="/signup">
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
