
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Users, Clock, Award, Target, TrendingUp } from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
      bio: 'With over 15 years in digital marketing, Sarah founded SocialBoost to help businesses thrive in the social media landscape.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
      bio: 'Michael ensures our systems deliver services efficiently and securely while staying ahead of platform algorithm changes.'
    },
    {
      name: 'Jessica Williams',
      role: 'Head of Customer Success',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
      bio: 'Jessica leads our support team, ensuring clients receive exceptional service and achieve their growth objectives.'
    },
    {
      name: 'David Rodriguez',
      role: 'Marketing Director',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
      bio: 'David brings his extensive experience from major agencies to help build the SocialBoost brand and strategy.'
    }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We operate with honesty and transparency in all our services and communications.'
    },
    {
      icon: Users,
      title: 'Customer Focus',
      description: 'Our clients\' success is our priority, guiding all our decisions and innovations.'
    },
    {
      icon: Clock,
      title: 'Reliability',
      description: 'We deliver consistent, dependable service that our customers can count on.'
    },
    {
      icon: Award,
      title: 'Quality',
      description: 'We maintain the highest standards in all our services and operations.'
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'We continuously develop and improve our services to stay ahead of industry changes.'
    },
    {
      icon: TrendingUp,
      title: 'Growth',
      description: 'We\'re committed to helping our clients achieve meaningful, sustainable growth.'
    }
  ];

  return (
    <Layout>
      <div className="container-custom">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About SocialBoost</h1>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2018, SocialBoost has grown from a small startup to an industry leader in social media marketing services. We&apos;re passionate about helping businesses and individuals grow their online presence.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our mission is simple: provide reliable, effective, and ethical social media growth services that deliver real results for our clients. Whether you&apos;re a small business, influencer, or large brand, we have solutions tailored to your needs.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link to="/services/youtube">Our Services</Link>
                </Button>
                <Button variant="outline" asChild size="lg">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="SocialBoost team meeting" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-gray-50 rounded-2xl mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do, from product development to customer service.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <div className="p-3 bg-brand-blue/10 rounded-full inline-block">
                      <value.icon className="h-6 w-6 text-brand-blue" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Leadership Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experienced professionals dedicated to providing the best social media growth services.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 relative mx-auto w-48 h-48 rounded-full overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-brand-blue font-medium mb-2">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-brand-blue text-white rounded-2xl mb-16">
          <div className="text-center max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">Ready to Boost Your Social Media Presence?</h2>
            <p className="text-lg mb-8">
              Join thousands of satisfied clients who have transformed their online presence with SocialBoost.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/services/youtube">Explore Our Services</Link>
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
