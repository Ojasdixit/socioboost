import React, { useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  ShoppingCart,
  FileText,
  Settings,
  LogOut,
  Package,
  Users,
  Mail,
  Phone,
  MapPin,
  Layers,
  Tag,
  PackageOpen,
  ShoppingBag
} from 'lucide-react';
import { toast } from 'sonner';
import ScrollToTop from '@/components/ui/scroll-to-top';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Check if user is authenticated
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    const adminUser = localStorage.getItem('adminUser');
    
    if (!adminToken || !adminUser) {
      toast.error('You must be logged in to access the admin panel');
      navigate('/admin');
    }
  }, []);

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: <ShoppingCart size={20} />, label: 'Orders', path: '/admin/dashboard/orders' },
    { icon: <Package size={20} />, label: 'Products', path: '/admin/dashboard/products' },
    { icon: <Tag size={20} />, label: 'Categories', path: '/admin/dashboard/categories' },
    { icon: <ShoppingBag size={20} />, label: 'Product Bundles', path: '/admin/dashboard/product-packages' },
    { icon: <PackageOpen size={20} />, label: 'Service Packages', path: '/admin/dashboard/packages' },
    { icon: <FileText size={20} />, label: 'Blogs', path: '/admin/dashboard/blogs' },
    { icon: <FileText size={20} />, label: 'Policies', path: '/admin/dashboard/policies' },
    { icon: <Mail size={20} />, label: 'Contact Info', path: '/admin/dashboard/contact' },
  ];

  const handleLogout = () => {
    // Clear admin data from localStorage
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    
    // Show success message
    toast.success('Logged out successfully');
    
    // Redirect to login page
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b">
            <h1 className="text-2xl font-bold text-brand-pink">Admin Panel</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                className="w-full justify-start gap-2"
                onClick={() => navigate(item.path)}
              >
                {item.icon}
                {item.label}
              </Button>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-red-500 hover:text-red-700"
              onClick={handleLogout}
            >
              <LogOut size={20} />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {children}
      </div>
      <ScrollToTop />
    </div>
  );
};

export default AdminLayout; 