
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const TermsOfService = () => {
  // Get current date for last updated display
  const lastUpdated = "May 1, 2025";

  return (
    <Layout>
      <div className="container-custom py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Terms of Service</h1>
            <p className="text-gray-500">Last Updated: {lastUpdated}</p>
          </div>

          <div className="prose max-w-none">
            <p className="lead">
              These Terms of Service ("Terms") govern your use of the SocialBoost website and services. By accessing or using our website or services, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you may not use our services.
            </p>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using SocialBoost services, you confirm that you accept these Terms and agree to comply with them. If you are using our services on behalf of a business or other legal entity, you represent that you have the authority to bind that entity to these Terms.
            </p>

            <h2>2. Service Description</h2>
            <p>
              SocialBoost provides social media marketing services, including but not limited to, increasing followers, likes, views, comments, and other forms of engagement across various social media platforms. The specific services available are described on our website.
            </p>

            <h2>3. Account Registration</h2>
            <p>
              To use certain features of our services, you may need to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
            </p>

            <h2>4. User Conduct</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use our services for any illegal purpose or in violation of any local, state, national, or international law</li>
              <li>Violate the terms of service of any third-party platform associated with our services</li>
              <li>Attempt to access, tamper with, or use non-public areas of our website or our computer systems</li>
              <li>Circumvent any technological measures implemented to protect our services</li>
              <li>Use our services to harm, threaten, or harass any person, organization, or business</li>
              <li>Interfere with other users' enjoyment of our services</li>
              <li>Attempt to probe, scan, or test the vulnerability of our systems or breach any security or authentication measures</li>
              <li>Submit content that infringes any intellectual property rights or other proprietary rights</li>
              <li>Submit content that is illegal, defamatory, obscene, or otherwise objectionable</li>
            </ul>

            <h2>5. Payment and Billing</h2>
            <p>
              You agree to pay all fees associated with your use of our services. All fees are non-refundable unless otherwise specified in our refund policy. We reserve the right to change our prices at any time. By providing a payment method, you authorize us to charge that payment method for services ordered and to store your payment information for future transactions.
            </p>

            <h2>6. Service Delivery</h2>
            <p>
              We strive to deliver services as described and within the timeframes specified on our website. However, delivery times are estimates and not guarantees. We reserve the right to modify or discontinue any service or feature at any time without notice. We are not liable for any delay or failure to deliver services due to circumstances beyond our reasonable control.
            </p>

            <h2>7. Refunds and Cancellations</h2>
            <p>
              Our refund policy is detailed separately on our website. Generally, we offer refunds if we fail to deliver the promised services within a reasonable timeframe. We do not offer refunds for services that have already been delivered. We reserve the right to cancel orders and issue refunds at our discretion.
            </p>

            <h2>8. Intellectual Property</h2>
            <p>
              All content, features, and functionality of our website, including but not limited to text, graphics, logos, icons, images, and software, are the exclusive property of SocialBoost or its licensors and are protected by copyright, trademark, and other intellectual property laws.
            </p>

            <h2>9. Disclaimer of Warranties</h2>
            <p>
              OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT OUR SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT OUR WEBSITE OR THE SERVER THAT MAKES IT AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
            </p>

            <h2>10. Limitation of Liability</h2>
            <p>
              IN NO EVENT SHALL SOCIALBOOST, ITS OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS, BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE OUR SERVICES. OUR TOTAL LIABILITY FOR ALL CLAIMS RELATED TO THE SERVICES SHALL NOT EXCEED THE AMOUNT PAID BY YOU FOR THE SERVICES AT ISSUE.
            </p>

            <h2>11. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless SocialBoost and its officers, directors, employees, and agents from and against any and all claims, liabilities, damages, losses, or expenses, including reasonable attorneys' fees and costs, arising out of or in any way connected with your access to or use of our services or your violation of these Terms.
            </p>

            <h2>12. Third-Party Platforms</h2>
            <p>
              Our services may involve interaction with third-party platforms (e.g., YouTube, Instagram, Facebook). You acknowledge that we are not affiliated with these platforms and that you are solely responsible for complying with their terms of service. We do not guarantee that our services will not violate any third-party platform's terms of service, and we are not responsible for any consequences that may result from such violations.
            </p>

            <h2>13. Termination</h2>
            <p>
              We reserve the right to terminate or suspend your access to our services immediately, without prior notice or liability, for any reason, including, without limitation, if you breach these Terms. All provisions of these Terms that by their nature should survive termination shall survive.
            </p>

            <h2>14. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. When we make changes, we will update the "Last Updated" date at the top of these Terms. Your continued use of our services after such changes constitutes your acceptance of the new Terms.
            </p>

            <h2>15. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law provisions. Any dispute arising from or relating to these Terms shall be subject to the exclusive jurisdiction of the courts of New York County, New York.
            </p>

            <h2>16. Contact Information</h2>
            <p>If you have any questions about these Terms, please contact us at:</p>
            <p className="mb-8">
              Email: legal@socialboost.com<br />
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

export default TermsOfService;
