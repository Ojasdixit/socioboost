import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ServiceCard from '@/components/ServiceCard';
import TestimonialCard from '@/components/TestimonialCard';
import ClientLogo from '@/components/ClientLogo';
import { Button } from '@/components/ui/button';
import { 
  Youtube, 
  Instagram, 
  Facebook, 
  Twitter, 
  Linkedin,
  Shield,
  Clock,
  BarChart,
  CheckCircle,
  CreditCard,
  Star,
  ThumbsUp
} from 'lucide-react';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "SocialBoost - Premium Social Media Marketing Services";
  }, []);

  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "100% Safe & Secure",
      description: "All our services follow platform guidelines and use secure methods to ensure your account safety."
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Fast Delivery",
      description: "Our services start working within minutes of placing your order, with gradual delivery to ensure authenticity."
    },
    {
      icon: <BarChart className="h-8 w-8" />,
      title: "Real Results",
      description: "We provide real engagement from genuine accounts that actually improve your social media presence."
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "High Retention",
      description: "Our services provide high retention rates, ensuring long-lasting results for your social media accounts."
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Secure Payment",
      description: "Multiple secure payment options including credit cards, PayPal, and cryptocurrencies."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Thompson",
      role: "Influencer",
      quote: "SocialBoost helped me grow my YouTube channel from 1,000 to over 50,000 subscribers in just three months. Their services are simply amazing!",
      image: "",
      rating: 5
    },
    {
      name: "Mark Wilson",
      role: "Digital Marketer",
      quote: "As a marketing professional, I've tried many SMM services. SocialBoost stands out with their quality, delivery speed, and excellent support.",
      image: "",
      rating: 5
    },
    {
      name: "Jessica Chen",
      role: "Small Business Owner",
      quote: "The Instagram growth services have transformed my business. My engagement rates tripled, and sales have never been better!",
      image: "",
      rating: 4
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section - Completely Redesigned */}
      <main className="flex-grow pt-0 md:pt-8">
        <section className="bg-gradient-to-r from-brand-blue to-purple-800 text-white section-padding mt-0">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8">
                <div className="relative">
                  <div className="absolute -top-10 -left-10 w-20 h-20 bg-brand-pink/20 rounded-full blur-xl"></div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in relative z-10">
                    Transform Your Social Media Impact
                  </h1>
                </div>
                <p className="text-lg md:text-xl opacity-90 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  Premium marketing solutions designed to elevate your presence across YouTube, Instagram, Facebook, Twitter, and LinkedIn.
                </p>
                <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  <Link to="/explore">
                    <Button size="lg" className="bg-white text-brand-blue hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all">
                      <span className="relative z-10">Discover Our Services</span>
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 animate-slide-up" style={{ animationDelay: '0.6s' }}>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-white/20 relative overflow-hidden">
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-pink/10 rounded-full blur-xl"></div>
                  <div className="grid grid-cols-2 gap-4 relative z-10">
                    <div className="bg-white/10 rounded-lg p-4 text-center text-white backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all">
                      <div className="font-bold text-3xl">50M+</div>
                      <div>Followers Delivered</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 text-center text-white backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all">
                      <div className="font-bold text-3xl">100K+</div>
                      <div>Happy Customers</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 text-center text-white backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all">
                      <div className="font-bold text-3xl">5K+</div>
                      <div>Daily Orders</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 text-center text-white backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all">
                      <div className="font-bold text-3xl">24/7</div>
                      <div>Premium Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive social media marketing solutions to elevate your online presence and engagement.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ServiceCard
                title="YouTube Services"
                description="Get more subscribers, views, likes, and comments to boost your YouTube channel's performance."
                icon={<Youtube size={32} />}
                link="/services/youtube"
                bgColor="bg-red-50"
              />
              <ServiceCard
                title="Instagram Services"
                description="Grow your Instagram with authentic followers, likes, views, and comments that engage your audience."
                icon={<Instagram size={32} />}
                link="/services/instagram"
                bgColor="bg-purple-50"
              />
              <ServiceCard
                title="Facebook Services"
                description="Increase your Facebook page likes, followers, and post engagements for better brand awareness."
                icon={<Facebook size={32} />}
                link="/services/facebook"
                bgColor="bg-blue-50"
              />
              <ServiceCard
                title="Twitter Services"
                description="Expand your Twitter presence with more followers, retweets, and likes to amplify your message."
                icon={<Twitter size={32} />}
                link="/services/twitter"
                bgColor="bg-sky-50"
              />
              <ServiceCard
                title="LinkedIn Services"
                description="Enhance your professional network with LinkedIn connections, followers, and engagement."
                icon={<Linkedin size={32} />}
                link="/services/linkedin"
                bgColor="bg-indigo-50"
              />
              <ServiceCard
                title="Google Reviews"
                description="Boost your business credibility with positive Google Reviews starting from $9 for 10 reviews."
                icon={<Star size={32} />}
                link="/services/google-reviews"
                bgColor="bg-yellow-50"
              />
              <ServiceCard
                title="Trustpilot Reviews"
                description="Enhance your online reputation with quality Trustpilot reviews from real users at affordable prices."
                icon={<ThumbsUp size={32} />}
                link="/services/trustpilot"
                bgColor="bg-green-50"
              />
              <div className="lg:col-span-2 transform transition-all duration-300 hover:scale-[1.02]">
                <div className="service-card h-full overflow-hidden rounded-xl">
                  <Link to="/explore" className="block w-full">
                    <div className="relative p-8 h-full bg-gradient-to-r from-brand-blue to-blue-700 text-white flex flex-col items-center justify-center text-center">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-x-20 -translate-y-20 blur-2xl"></div>
                      <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full translate-x-10 translate-y-10 blur-2xl"></div>
                      <div className="relative z-10">
                        <h3 className="font-bold text-2xl mb-3">Complete Service Catalog</h3>
                        <p className="mb-4 text-white/90">Explore our full range of growth solutions for all major social platforms</p>
                        <div className="mt-4 inline-flex items-center text-white hover:text-blue-200 transition-colors">
                          <span className="font-medium">Browse All Services</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We deliver premium social media marketing services that drive real results for your online presence.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <div className="text-brand-blue mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-xl mb-2 text-black">{feature.title}</h3>
                  <p className="text-black">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Completely Redesigned */}
        <section className="section-padding relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-purple-900 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('/patterns/circuit-board.svg')] opacity-10"></div>
          <div className="container-custom relative z-10">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 border border-white/10 shadow-2xl">
              <div className="text-center max-w-3xl mx-auto text-white">
                <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-4">Elevate Your Online Presence</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready For Rapid Growth?</h2>
                <p className="text-xl opacity-90 mb-8">
                  Join over 100,000 satisfied customers who have transformed their social media presence with our premium growth services.
                </p>
                <div className="mt-8">
                  <Link to="/signup">
                    <Button size="lg" className="bg-white hover:bg-gray-100 text-brand-blue shadow-xl hover:shadow-2xl transition-all text-lg px-10 py-6 h-auto">
                      Start Growing Today
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Don't just take our word for it. Here's what our customers have to say about our services.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
              ))}
            </div>
          </div>
        </section>

        {/* Clients Section */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted By</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Leading brands and creators trust us for their social media growth.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <ClientLogo name="Nike" />
              <ClientLogo name="Spotify" />
              <ClientLogo name="Apple" />
              <ClientLogo name="Google" />
              <ClientLogo name="Amazon" />
              <ClientLogo name="Microsoft" />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Got questions? We've got answers. Check out our most commonly asked questions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="font-bold text-lg mb-2 text-black">Is it safe to use your services?</h3>
                <p className="text-black">
                  Yes, all our services are 100% safe. We follow platform guidelines and use secure methods to ensure your account safety.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="font-bold text-lg mb-2 text-black">How fast do you deliver?</h3>
                <p className="text-black">
                  Delivery times vary by service, but most orders start within minutes and complete in 1-3 days for optimal, natural growth.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="font-bold text-lg mb-2 text-black">Do you need my password?</h3>
                <p className="text-black">
                  No, we never ask for your password. We only need your public username or link to deliver our services.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="font-bold text-lg mb-2 text-black">What payment methods do you accept?</h3>
                <p className="text-black">
                  We accept all major credit cards, PayPal, and various cryptocurrencies for your convenience and security.
                </p>
              </div>
            </div>

            <div className="text-center mt-8">
              <Link to="/faq">
                <Button variant="outline">
                  View All FAQs
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
