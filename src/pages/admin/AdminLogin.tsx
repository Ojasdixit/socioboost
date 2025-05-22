import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  // Check if already logged in
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // For demonstration purposes, accept any email ending with @admin.com
      // In production, you'd validate against your database
      if (!credentials.email.endsWith('@admin.com') && credentials.email !== 'admin@socialboost.com') {
        throw new Error('Invalid admin credentials');
      }

      // Wait for 1 second to simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Store admin info in localStorage
      localStorage.setItem('adminToken', 'admin-session-token');
      localStorage.setItem('adminUser', JSON.stringify({
        email: credentials.email,
        role: 'admin',
        name: 'Admin User'
      }));
      
      // Show success message
      toast.success('Login successful!');
      
      // Navigate to dashboard
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error instanceof Error ? error.message : 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="text-3xl font-bold text-center text-brand-pink">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-gray-600">
            Enter your credentials to access the admin panel
          </p>
          <p className="mt-1 text-center text-sm text-gray-500">
            (Use admin@socialboost.com or any email ending with @admin.com)
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin; 