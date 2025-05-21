
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent successfully!', {
        description: 'We will get back to you within 24 hours.',
      });
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="container-custom section-padding">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions or need assistance? Our team is here to help you with all your social media marketing needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="mb-4 flex justify-center">
                <div className="p-3 bg-brand-blue/10 rounded-full">
                  <Mail className="h-6 w-6 text-brand-blue" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-gray-600 mb-3">For general inquiries and support</p>
              <a href="mailto:support@socialboost.com" className="text-brand-blue hover:underline">
                support@socialboost.com
              </a>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="mb-4 flex justify-center">
                <div className="p-3 bg-brand-blue/10 rounded-full">
                  <Phone className="h-6 w-6 text-brand-blue" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-gray-600 mb-3">Mon-Fri from 9am to 5pm EST</p>
              <a href="tel:+11234567890" className="text-brand-blue hover:underline">
                +1 (123) 456-7890
              </a>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="mb-4 flex justify-center">
                <div className="p-3 bg-brand-blue/10 rounded-full">
                  <MapPin className="h-6 w-6 text-brand-blue" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Office Location</h3>
              <p className="text-gray-600 mb-3">123 Social Media Ave</p>
              <p className="text-brand-blue">New York, NY 10001</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <Card>
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="How can we help?"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Please provide details about your inquiry..."
                    rows={5}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <div>
            <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-2">What is SocialBoost?</h4>
                <p className="text-gray-600">
                  SocialBoost is a comprehensive social media marketing service that helps businesses and individuals enhance their online presence across various platforms.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-2">How long does delivery take?</h4>
                <p className="text-gray-600">
                  Delivery times vary by service, but most orders begin processing within 24-48 hours. Check individual service pages for specific delivery timeframes.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-2">Is my personal information secure?</h4>
                <p className="text-gray-600">
                  Yes, we take data security seriously. We never require passwords to your accounts and use encrypted connections for all transactions.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-2">Do you offer refunds?</h4>
                <p className="text-gray-600">
                  Yes, we offer refunds if we fail to deliver the promised service. Please see our refund policy for full details.
                </p>
              </div>
              
              <div className="pt-6">
                <Button variant="outline" className="w-full" asChild>
                  <a href="/faq">View All FAQs</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
