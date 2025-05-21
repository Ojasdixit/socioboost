
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const Faq = () => {
  const faqCategories = [
    {
      title: 'General Questions',
      items: [
        {
          question: 'What is SocialBoost?',
          answer: 'SocialBoost is a comprehensive social media marketing service that helps businesses and individuals enhance their online presence across various platforms including YouTube, Instagram, Facebook, Twitter, LinkedIn, Google Reviews, and Trustpilot.'
        },
        {
          question: 'How does SocialBoost work?',
          answer: 'Our service works by connecting your social media profiles with our network of genuine users. Once you place an order, we begin delivering the requested engagement (followers, likes, views, etc.) to your account in a gradual, natural-looking manner that complies with each platform\'s guidelines.'
        },
        {
          question: 'Is SocialBoost safe to use?',
          answer: 'Yes, SocialBoost is designed with safety as a top priority. We never request passwords to your accounts and all our services comply with the terms of service for each social media platform. We use gradual delivery methods to ensure natural growth patterns that don\'t trigger platform security systems.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept major credit cards (Visa, Mastercard, American Express), PayPal, and cryptocurrencies including Bitcoin, Ethereum, and others. All payments are processed through secure payment gateways to ensure your financial information remains protected.'
        }
      ]
    },
    {
      title: 'Orders & Delivery',
      items: [
        {
          question: 'How long does delivery take?',
          answer: 'Delivery times vary depending on the service and package size. Most orders begin processing within 24-48 hours, with complete delivery ranging from 1-15 days. Each service page provides specific estimated delivery timeframes for their packages.'
        },
        {
          question: 'Can I split my order across multiple profiles or posts?',
          answer: 'Yes, many of our services offer the option to split your purchase across multiple profiles or posts. During checkout, you\'ll have the opportunity to specify how you want your order distributed. If you need a custom distribution, please contact our support team.'
        },
        {
          question: 'What information do I need to provide for my order?',
          answer: 'For most services, we only need your profile or post URL – no passwords are required. For certain services like custom comments, you may need to provide guidelines or specific instructions for the content you want.'
        },
        {
          question: 'What happens if my order isn\'t delivered as promised?',
          answer: 'We offer a satisfaction guarantee on all our services. If your order isn\'t delivered as promised within the specified timeframe, please contact our support team. Depending on the situation, we\'ll either complete the delivery or provide a refund.'
        }
      ]
    },
    {
      title: 'Technical Questions',
      items: [
        {
          question: 'Will using SocialBoost get my account banned?',
          answer: 'No, our services are designed to mimic natural growth patterns and comply with platform guidelines. We use gradual delivery methods and real users to ensure your account remains safe and secure.'
        },
        {
          question: 'Do I need to make my account public to use your services?',
          answer: 'For most services, your account needs to be public during the delivery period so our network can access and engage with your content. Once delivery is complete, you can switch back to private if desired.'
        },
        {
          question: 'Will the engagement drop over time?',
          answer: 'Some natural fluctuation is normal on any social media platform. However, we offer refill guarantees on most services to maintain your engagement levels. The specific guarantee period is listed on each service page.'
        },
        {
          question: 'Do you offer targeting by country or demographics?',
          answer: 'Yes, many of our premium services offer targeting options. You can select specific countries, languages, or interests depending on the service. These options may have different pricing and delivery timeframes.'
        }
      ]
    },
    {
      title: 'Account & Support',
      items: [
        {
          question: 'How do I contact customer support?',
          answer: 'You can reach our customer support team through our Contact page, by email at support@socialboost.com, or via live chat on our website. Our support team is available 24/7 to assist with any questions or concerns.'
        },
        {
          question: 'How do I track my order progress?',
          answer: 'Once you place an order, you\'ll receive a confirmation email with a link to track your order status. You can also log into your SocialBoost account to view all your orders and their current status.'
        },
        {
          question: 'Do you offer volume discounts for larger orders?',
          answer: 'Yes, we offer volume discounts for larger orders. For bulk orders or ongoing services, please contact our sales team to discuss custom pricing and packages tailored to your specific needs.'
        },
        {
          question: 'How do I create an account with SocialBoost?',
          answer: 'Creating an account is simple and free. Click the "Sign Up" button at the top of our website, enter your email address and password, and follow the verification steps. Having an account allows you to track orders, repurchase services easily, and access special offers.'
        }
      ]
    }
  ];

  return (
    <Layout>
      <div className="container-custom section-padding">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our services, delivery, and policies.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              className="pl-10 py-6 text-lg"
              placeholder="Search for answers..."
            />
          </div>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {faqCategories.map((category, index) => (
            <a 
              key={index} 
              href={`#${category.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="p-4 border rounded-lg text-center hover:bg-gray-50 transition-colors hover:border-brand-blue"
            >
              <h3 className="font-medium">{category.title}</h3>
            </a>
          ))}
        </div>

        {/* FAQ sections */}
        {faqCategories.map((category, index) => (
          <div 
            key={index}
            id={category.title.toLowerCase().replace(/\s+/g, '-')}
            className="mb-12 scroll-mt-24"
          >
            <h2 className="text-2xl font-bold mb-6">{category.title}</h2>
            <Accordion type="single" collapsible className="w-full">
              {category.items.map((item, i) => (
                <AccordionItem key={i} value={`item-${index}-${i}`}>
                  <AccordionTrigger className="text-lg font-medium">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}

        {/* Contact section */}
        <div className="mt-16 bg-gray-50 p-8 md:p-12 rounded-xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Still have questions?</h2>
              <p className="text-gray-600 mb-6">
                If you couldn't find the answer to your question, our support team is here to help. Contact us and we'll get back to you as soon as possible.
              </p>
              <Button asChild size="lg">
                <Link to="/contact">Contact Support</Link>
              </Button>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Popular Topics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link to="/faq#refunds" className="block text-brand-blue hover:underline">Refund Policy</Link>
                  <Link to="/faq#delivery" className="block text-brand-blue hover:underline">Delivery Timeframes</Link>
                  <Link to="/faq#safety" className="block text-brand-blue hover:underline">Account Safety</Link>
                  <Link to="/faq#payment" className="block text-brand-blue hover:underline">Payment Options</Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Faq;
