import { Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingCart, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';

const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  // Check if mobile view
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen, isMobile]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Don't render on desktop
  if (!isMobile) {
    return null;
  }

  return (
    <>
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around items-center py-2">
          <Link
            to="/"
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              location.pathname === '/' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Home size={20} />
            <span className="text-xs mt-1">Home</span>
          </Link>

          <Link
            to="/explore"
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              location.pathname === '/explore' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Search size={20} />
            <span className="text-xs mt-1">Explore</span>
          </Link>

          <Link
            to="/cart"
            className="relative flex flex-col items-center p-2 rounded-lg text-gray-600 hover:text-gray-900"
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
            <span className="text-xs mt-1">Cart</span>
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              isMenuOpen ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Menu size={20} />
            <span className="text-xs mt-1">Menu</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 flex flex-col justify-end"
          onClick={() => setIsMenuOpen(false)}
        >
          <div 
            className="bg-white rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Menu</h2>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100"
                aria-label="Close menu"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-2">
              <Link
                to="/explore"
                className="block py-3 px-4 rounded-lg hover:bg-gray-50 text-gray-800 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Explore All Services
              </Link>
              <Link
                to="/about"
                className="block py-3 px-4 rounded-lg hover:bg-gray-50 text-gray-800 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                to="/blog"
                className="block py-3 px-4 rounded-lg hover:bg-gray-50 text-gray-800 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/contact"
                className="block py-3 px-4 rounded-lg hover:bg-gray-50 text-gray-800 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/faq"
                className="block py-3 px-4 rounded-lg hover:bg-gray-50 text-gray-800 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
            </div>
          </div>
        </div>
      )}
      
      {/* Add padding to the bottom of the page to account for the fixed nav */}
      <div className="pb-16"></div>
    </>
  );
};

export default MobileMenu;
