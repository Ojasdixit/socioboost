
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const PrivacyPolicy = () => {
  // Get current date for last updated display
  const lastUpdated = "May 1, 2025";

  return (
    <Layout>
      <div className="container-custom py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-gray-500">Last Updated: {lastUpdated}</p>
          </div>

          <div className="prose max-w-none">
            <p className="lead">
              This Privacy Policy explains how SocialBoost ("we," "us," or "our") collects, uses, shares, and protects your personal information when you visit our website, use our services, or interact with us. We are committed to protecting your privacy and ensuring that your personal information is handled responsibly.
            </p>

            <h2>Information We Collect</h2>
            <h3>Personal Information</h3>
            <p>We may collect the following types of personal information:</p>
            <ul>
              <li>Contact information (name, email address, phone number)</li>
              <li>Billing information (credit card details, billing address)</li>
              <li>Account information (username, password)</li>
              <li>Social media profile URLs and usernames</li>
              <li>Communication preferences and marketing choices</li>
              <li>Customer service interactions and correspondence</li>
            </ul>

            <h3>Usage Information</h3>
            <p>We automatically collect certain information about how you interact with our website and services:</p>
            <ul>
              <li>IP address and device information</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent on our website</li>
              <li>Referring website or source</li>
              <li>Links clicked and actions taken</li>
              <li>Date and time of visits</li>
            </ul>

            <h2>How We Collect Information</h2>
            <p>We collect information through:</p>
            <ul>
              <li>Direct interactions: when you create an account, place an order, fill out forms, or communicate with us</li>
              <li>Automated technologies: cookies, web beacons, and similar technologies</li>
              <li>Third parties: payment processors, analytics providers, and marketing partners</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use your information for the following purposes:</p>
            <ul>
              <li>Providing and managing our services</li>
              <li>Processing payments and orders</li>
              <li>Communicating with you about your account or orders</li>
              <li>Sending you marketing communications (with your consent)</li>
              <li>Improving our website and services</li>
              <li>Analyzing usage patterns and trends</li>
              <li>Detecting and preventing fraud or abuse</li>
              <li>Complying with legal obligations</li>
            </ul>

            <h2>Information Sharing and Disclosure</h2>
            <p>We may share your information with:</p>
            <ul>
              <li>Service providers: companies that help us operate our business and provide services</li>
              <li>Payment processors: to handle transactions</li>
              <li>Marketing partners: to help us reach potential customers</li>
              <li>Legal authorities: when required by law, court order, or government regulation</li>
              <li>Professional advisors: such as lawyers, accountants, and insurers</li>
              <li>Business transferees: in connection with a merger, acquisition, or sale of assets</li>
            </ul>
            <p>We do not sell your personal information to third parties.</p>

            <h2>Cookies and Tracking Technologies</h2>
            <p>We use cookies and similar technologies to improve your browsing experience, analyze site traffic, and personalize content. You can control cookies through your browser settings. Our website may still function if you disable cookies, but some features may not work properly.</p>

            <h2>Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, disclosure, alteration, and destruction. However, no data transmission or storage system can be guaranteed to be 100% secure.</p>

            <h2>Your Rights and Choices</h2>
            <p>Depending on your location, you may have certain rights regarding your personal information:</p>
            <ul>
              <li>Access and obtain a copy of your data</li>
              <li>Rectify inaccurate or incomplete information</li>
              <li>Request deletion of your personal information</li>
              <li>Restrict or object to certain processing activities</li>
              <li>Data portability (receiving your data in a structured format)</li>
              <li>Withdraw consent for processing based on consent</li>
            </ul>
            <p>To exercise these rights, please contact us using the details provided at the end of this policy.</p>

            <h2>International Data Transfers</h2>
            <p>Your information may be transferred to, and processed in, countries other than your country of residence. These countries may have different data protection laws. We will take steps to ensure that your information receives an adequate level of protection in the countries where we process it.</p>

            <h2>Children's Privacy</h2>
            <p>Our services are not directed to individuals under 16. We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected personal information from a child, we will take steps to delete it as soon as possible.</p>

            <h2>Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. When we make changes, we will update the "Last Updated" date at the top of this policy and take other appropriate steps to notify you.</p>

            <h2>Contact Us</h2>
            <p>If you have questions, concerns, or requests related to your privacy or this policy, please contact us at:</p>
            <p className="mb-8">
              Email: privacy@socialboost.com<br />
              Phone: +1 (123) 456-7890<br />
              Address: 123 Social Media Ave, New York, NY 10001
            </p>

            <div className="my-8 text-center">
              <Button asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
