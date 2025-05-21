import React, { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import Home from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import ServicePage from "@/pages/ServicePage";
import ServiceDetailPage from "@/pages/ServiceDetailPage";
import Contact from "@/pages/Contact";
import About from "@/pages/About";
import Blog from "@/pages/Blog";
import Faq from "@/pages/Faq";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import RefundPolicy from "@/pages/RefundPolicy";
import Careers from '@/pages/Careers';
import CookiesPolicy from '@/pages/CookiesPolicy';
import Sitemap from '@/pages/Sitemap';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import ThankYou from '@/pages/ThankYou';
import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';
import AdminLayout from '@/pages/admin/AdminLayout';
import AdminLogin from '@/pages/admin/AdminLogin';
import Products from '@/pages/admin/Products';
import Orders from '@/pages/admin/Orders';
import Blogs from '@/pages/admin/Blogs';
import Policies from '@/pages/admin/Policies';
import ContactInfo from '@/pages/admin/ContactInfo';
import Dashboard from "@/pages/admin/Dashboard";
import Categories from "@/pages/admin/Categories";
import Packages from "@/pages/admin/Packages";
import ProductPackages from "@/pages/admin/ProductPackages";
import DebugPage from './pages/DebugPage';
import { checkAndSeedPackages } from './utils/seedPackages';

// Import our new service pages
import YouTubePage from '@/pages/YouTubePage';
import InstagramPage from '@/pages/InstagramPage';
import FacebookPage from '@/pages/FacebookPage';
import TwitterPage from '@/pages/TwitterPage';
import GoogleReviewsPage from '@/pages/GoogleReviewsPage';
import TrustpilotPage from '@/pages/TrustpilotPage';

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Check if we need to seed the database with initial packages
    checkAndSeedPackages();
  }, []);

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                
                {/* Service category routes - using our new dedicated pages */}
                <Route path="/services/youtube" element={<YouTubePage />} />
                <Route path="/services/instagram" element={<InstagramPage />} />
                <Route path="/services/facebook" element={<FacebookPage />} />
                <Route path="/services/twitter" element={<TwitterPage />} />
                <Route path="/services/linkedin" element={<ServicePage />} /> {/* No dedicated page yet */}
                <Route path="/services/google-reviews" element={<GoogleReviewsPage />} />
                <Route path="/services/google" element={<GoogleReviewsPage />} />
                <Route path="/services/trustpilot" element={<TrustpilotPage />} />
                
                {/* Debug route */}
                <Route path="/debug" element={<DebugPage />} />
                
                {/* YouTube detail routes */}
                <Route path="/services/youtube/subscribers" element={<ServiceDetailPage />} />
                <Route path="/services/youtube/views" element={<ServiceDetailPage />} />
                <Route path="/services/youtube/likes" element={<ServiceDetailPage />} />
                <Route path="/services/youtube/comments" element={<ServiceDetailPage />} />
                <Route path="/services/youtube/watch-hours" element={<ServiceDetailPage />} />
                
                {/* Instagram detail routes */}
                <Route path="/services/instagram/followers" element={<ServiceDetailPage />} />
                <Route path="/services/instagram/likes" element={<ServiceDetailPage />} />
                <Route path="/services/instagram/views" element={<ServiceDetailPage />} />
                <Route path="/services/instagram/comments" element={<ServiceDetailPage />} />
                
                {/* Facebook detail routes */}
                <Route path="/services/facebook/page-likes" element={<ServiceDetailPage />} />
                <Route path="/services/facebook/post-likes" element={<ServiceDetailPage />} />
                <Route path="/services/facebook/followers" element={<ServiceDetailPage />} />
                
                {/* Twitter detail routes */}
                <Route path="/services/twitter/followers" element={<ServiceDetailPage />} />
                <Route path="/services/twitter/likes" element={<ServiceDetailPage />} />
                <Route path="/services/twitter/retweets" element={<ServiceDetailPage />} />
                
                {/* LinkedIn detail routes */}
                <Route path="/services/linkedin/followers" element={<ServiceDetailPage />} />
                <Route path="/services/linkedin/likes" element={<ServiceDetailPage />} />
                
                {/* Google Reviews detail routes */}
                <Route path="/services/google-reviews/positive" element={<ServiceDetailPage />} />
                <Route path="/services/google-reviews/reputation" element={<ServiceDetailPage />} />
                <Route path="/services/google/positive" element={<ServiceDetailPage />} />
                <Route path="/services/google/reputation" element={<ServiceDetailPage />} />
                
                {/* Trustpilot detail routes */}
                <Route path="/services/trustpilot/paid-reviews" element={<ServiceDetailPage />} />
                <Route path="/services/trustpilot/custom" element={<ServiceDetailPage />} />
                
                {/* Other routes */}
                <Route path="/blog" element={<Blog />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/refund-policy" element={<RefundPolicy />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/cookies-policy" element={<CookiesPolicy />} />
                <Route path="/sitemap" element={<Sitemap />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/thank-you" element={<ThankYou />} />
                
                {/* Admin routes */}
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="products" element={<Products />} />
                  <Route path="categories" element={<Categories />} />
                  <Route path="product-packages" element={<ProductPackages />} />
                  <Route path="packages" element={<Packages />} />
                  <Route path="blogs" element={<Blogs />} />
                  <Route path="policies" element={<Policies />} />
                  <Route path="contact" element={<ContactInfo />} />
                </Route>
                
                {/* 404 route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
