import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectTo = '/login',
  requireAdmin = false
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  useEffect(() => {
    // For admin routes, check localStorage
    if (requireAdmin) {
      const adminToken = localStorage.getItem('adminToken');
      const adminUser = localStorage.getItem('adminUser');
      setIsAuthenticated(!!adminToken && !!adminUser);
    } else {
      // For regular user routes, use the Auth context
      setIsAuthenticated(!!user);
    }
  }, [user, requireAdmin]);

  // Show loading spinner while checking authentication
  if (loading || isAuthenticated === null) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-brand-blue" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  // Render the protected content if authenticated
  return <>{children}</>;
};

export default ProtectedRoute; 