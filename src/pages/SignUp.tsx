import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { CheckCircle, Mail } from 'lucide-react';

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    document.title = 'Sign Up | SocialBoost';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Create a SocialBoost account to access premium social media growth services.');
    } else {
      const metaTag = document.createElement('meta');
      metaTag.name = 'description';
      metaTag.content = 'Create a SocialBoost account to access premium social media growth services.';
      document.head.appendChild(metaTag);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Register the user with Supabase Auth
      const { error, data } = await signUp(formData.email, formData.password);
      
      if (error) {
        throw error;
      }
      
      if (data?.user) {
        // Create a profile for the user
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            user_id: data.user.id,
            email: formData.email,
            first_name: formData.firstName,
            last_name: formData.lastName,
            created_at: new Date(),
            updated_at: new Date()
          });
        
        if (profileError) {
          console.error('Error creating profile:', profileError);
        }
        
        toast.success('Account created successfully!');
        setUserEmail(formData.email);
        setSignupSuccess(true);
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const renderVerificationMessage = () => {
    return (
      <div className="text-center py-8">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <Mail size={48} className="text-green-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          A verification link has been sent to <span className="font-medium">{userEmail}</span>. 
          Please check your inbox and click the link to verify your account.
        </p>
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Don't see the email? Check your spam folder or try again in a few minutes.
          </p>
          <Button 
            variant="outline" 
            onClick={() => navigate('/login')}
            className="mx-auto"
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="container-custom py-16 md:py-24">
        <div className="max-w-md mx-auto">
          {signupSuccess ? (
            renderVerificationMessage()
          ) : (
            <>
              <h1 className="text-4xl font-bold mb-6 text-center">Create Account</h1>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="mt-1"
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? 'Creating account...' : 'Sign up'}
                </Button>
                
                <div className="text-center mt-4">
                  <p className="text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-600 hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SignUp; 