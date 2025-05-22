import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ExplorePage = () => {
  const navigate = useNavigate();
  
  const handleGoBack = () => {
    navigate('/');
  };
  const services = [
    { 
      name: 'YouTube',
      icon: '▶️',
      link: '/services/youtube',
      submenu: [
        { name: 'Subscribers', link: '/services/youtube/subscribers' },
        { name: 'Views', link: '/services/youtube/views' },
        { name: 'Likes', link: '/services/youtube/likes' },
        { name: 'Comments', link: '/services/youtube/comments' },
      ]
    },
    { 
      name: 'Instagram',
      icon: '📸',
      link: '/services/instagram',
      submenu: [
        { name: 'Followers', link: '/services/instagram/followers' },
        { name: 'Likes', link: '/services/instagram/likes' },
        { name: 'Views', link: '/services/instagram/views' },
      ]
    },
    { 
      name: 'Facebook',
      icon: '👍',
      link: '/services/facebook',
      submenu: [
        { name: 'Page Likes', link: '/services/facebook/page-likes' },
        { name: 'Post Likes', link: '/services/facebook/post-likes' },
        { name: 'Followers', link: '/services/facebook/followers' },
      ]
    },
    { 
      name: 'Twitter',
      icon: '🐦',
      link: '/services/twitter',
      submenu: [
        { name: 'Followers', link: '/services/twitter/followers' },
        { name: 'Likes', link: '/services/twitter/likes' },
        { name: 'Retweets', link: '/services/twitter/retweets' },
      ]
    },
    { 
      name: 'LinkedIn',
      icon: '💼',
      link: '/services/linkedin',
      submenu: [
        { name: 'Followers', link: '/services/linkedin/followers' },
        { name: 'Likes', link: '/services/linkedin/likes' },
      ]
    },
    {
      name: 'Google Reviews',
      icon: '⭐',
      link: '/services/google-reviews',
      submenu: [
        { name: 'Positive Reviews', link: '/services/google-reviews/positive' },
        { name: 'Reputation Management', link: '/services/google-reviews/reputation' },
      ]
    },
    {
      name: 'Trustpilot',
      icon: '🔍',
      link: '/services/trustpilot',
      submenu: [
        { name: 'Paid Reviews', link: '/services/trustpilot/paid-reviews' },
        { name: 'Custom Reviews', link: '/services/trustpilot/custom' },
      ]
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6 pb-24">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleGoBack}
          className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-3 py-1 rounded-md transition-colors"
        >
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </Button>
      </div>
      <h1 className="text-2xl font-bold mb-6">Explore Our Services</h1>
      
      <div className="grid grid-cols-1 gap-4">
        {services.map((service) => (
          <div key={service.name} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <Link 
              to={service.link}
              className="flex items-center p-4 hover:bg-gray-50"
            >
              <span className="text-2xl mr-3">{service.icon}</span>
              <div>
                <h3 className="font-medium">{service.name}</h3>
                <p className="text-sm text-gray-500">
                  {service.submenu.length} services available
                </p>
              </div>
              <span className="ml-auto text-gray-400">›</span>
            </Link>
            
            <div className="border-t border-gray-100">
              {service.submenu.map((item) => (
                <Link
                  key={item.name}
                  to={item.link}
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 pl-16"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
