import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/context/AuthContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { signIn, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [emailNotVerified, setEmailNotVerified] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    document.title = 'Login | SocialBoost';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Login to your SocialBoost account and manage your social media growth services.');
    } else {
      const metaTag = document.createElement('meta');
      metaTag.name = 'description';
      metaTag.content = 'Login to your SocialBoost account and manage your social media growth services.';
      document.head.appendChild(metaTag);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setEmailNotVerified(false);

    try {
      const { error, data } = await signIn(credentials.email, credentials.password);
      
      if (error) {
        // Check if the error is related to email verification
        if (error.message?.includes('Email not confirmed') || 
            error.message?.includes('email verification') || 
            error.message?.includes('not verified')) {
          setEmailNotVerified(true);
          throw new Error('Please verify your email address before logging in');
        }
        throw error;
      }
      
      if (data?.user) {
        toast.success('Login successful!');
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error instanceof Error ? error.message : 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container-custom py-16 md:py-24">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">Sign In</h1>
          
          {emailNotVerified && (
            <Alert className="mb-6 bg-amber-50 border-amber-200">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                Your email address has not been verified. Please check your inbox for a verification link.
              </AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                required
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="mt-1"
              />
            </div>
            
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
            
            <div className="text-center mt-4">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="text-blue-600 hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login; 