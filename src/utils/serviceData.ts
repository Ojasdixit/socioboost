
interface ServiceOption {
  id: string;
  name: string;
  description: string;
  price: number;
  delivery: string;
  detailPage?: string;
}

interface ServicePageProps {
  title: string;
  description: string;
  options: ServiceOption[];
}

export const defaultServices: Record<string, ServicePageProps> = {
  'google-reviews': {
    title: 'Google Reviews Services',
    description: 'Boost your business credibility with positive Google Reviews. Our services help you improve your online reputation and increase customer trust.',
    options: [
      {
        id: 'google-basic',
        name: '10 Positive Google Reviews',
        description: 'Get 10 high-quality positive reviews from real users.',
        price: 9,
        delivery: '3-5 days',
        detailPage: '/services/google-reviews/positive'
      },
      {
        id: 'google-standard',
        name: '25 Positive Google Reviews',
        description: 'Build your reputation faster with 25 high-quality reviews.',
        price: 21,
        delivery: '5-7 days',
        detailPage: '/services/google-reviews/positive'
      },
      {
        id: 'google-premium',
        name: '50 Positive Google Reviews',
        description: 'Comprehensive reputation boost with 50 authentic positive reviews.',
        price: 39,
        delivery: '7-10 days',
        detailPage: '/services/google-reviews/positive'
      },
      {
        id: 'google-reputation',
        name: 'Reputation Management',
        description: 'Complete reputation management service including review monitoring and response management.',
        price: 99,
        delivery: 'Ongoing service',
        detailPage: '/services/google-reviews/reputation'
      }
    ]
  },
  'trustpilot': {
    title: 'Trustpilot Reviews Services',
    description: 'Enhance your business reputation with high-quality Trustpilot reviews. Our services help you build customer trust and improve conversion rates.',
    options: [
      {
        id: 'trustpilot-basic',
        name: '10 Trustpilot Reviews',
        description: 'Get 10 authentic positive Trustpilot reviews.',
        price: 9,
        delivery: '3-5 days',
        detailPage: '/services/trustpilot/paid-reviews'
      },
      {
        id: 'trustpilot-standard',
        name: '25 Trustpilot Reviews',
        description: 'Medium package with 25 quality Trustpilot reviews.',
        price: 21,
        delivery: '5-7 days',
        detailPage: '/services/trustpilot/paid-reviews'
      },
      {
        id: 'trustpilot-premium',
        name: '50 Trustpilot Reviews',
        description: 'Premium package with 50 detailed positive reviews.',
        price: 39,
        delivery: '7-10 days',
        detailPage: '/services/trustpilot/paid-reviews'
      },
      {
        id: 'trustpilot-custom',
        name: 'Custom Reviews',
        description: 'Customized reviews based on your specific requirements and business needs.',
        price: 15,
        delivery: '5-10 days',
        detailPage: '/services/trustpilot/custom'
      }
    ]
  },
  'youtube': {
    title: 'YouTube Services',
    description: 'Boost your YouTube presence with our comprehensive range of engagement services. Increase your followers, views, and overall channel performance.',
    options: [
      {
        id: 'youtube-subs',
        name: 'YouTube Subscribers',
        description: 'Real and active YouTube subscribers to boost your channel credibility.',
        price: 49,
        delivery: '10-15 days',
        detailPage: '/services/youtube/subscribers'
      },
      {
        id: 'youtube-views',
        name: 'YouTube Views',
        description: 'Increase your video visibility with high-retention views.',
        price: 29,
        delivery: '3-5 days',
        detailPage: '/services/youtube/views'
      },
      {
        id: 'youtube-likes',
        name: 'YouTube Likes',
        description: 'Boost video engagement with authentic likes.',
        price: 19,
        delivery: '2-3 days',
        detailPage: '/services/youtube/likes'
      },
      {
        id: 'youtube-comments',
        name: 'YouTube Comments',
        description: 'Custom comments from real users to increase engagement.',
        price: 39,
        delivery: '5-7 days',
        detailPage: '/services/youtube/comments'
      }
    ]
  },
  'instagram': {
    title: 'Instagram Services',
    description: 'Enhance your Instagram presence with our premium engagement services. Grow your following and increase post engagement.',
    options: [
      {
        id: 'instagram-followers',
        name: 'Instagram Followers',
        description: 'Real and active Instagram followers to boost your profile.',
        price: 29,
        delivery: '5-7 days',
        detailPage: '/services/instagram/followers'
      },
      {
        id: 'instagram-likes',
        name: 'Instagram Likes',
        description: 'Spread across multiple posts to boost engagement.',
        price: 19,
        delivery: '3-5 days',
        detailPage: '/services/instagram/likes'
      },
      {
        id: 'instagram-comments',
        name: 'Instagram Comments',
        description: 'Custom comments to increase post engagement.',
        price: 39,
        delivery: '5-7 days',
        detailPage: '/services/instagram/comments'
      },
      {
        id: 'instagram-views',
        name: 'Instagram Video Views',
        description: 'Increase video visibility with high-retention views.',
        price: 25,
        delivery: '2-4 days',
        detailPage: '/services/instagram/views'
      }
    ]
  },
  'facebook': {
    title: 'Facebook Services',
    description: 'Boost your Facebook presence with our comprehensive range of engagement services for pages and posts.',
    options: [
      {
        id: 'facebook-likes',
        name: '1,000 Page Likes',
        description: 'Real and active Facebook page likes to boost credibility.',
        price: 29,
        delivery: '7-10 days',
        detailPage: '/services/facebook/page-likes'
      },
      {
        id: 'facebook-followers',
        name: '1,000 Followers',
        description: 'Increase your page followers for better reach.',
        price: 25,
        delivery: '7-10 days',
        detailPage: '/services/facebook/followers'
      },
      {
        id: 'facebook-post-likes',
        name: '1,000 Post Likes',
        description: 'Boost engagement on your posts with real likes.',
        price: 19,
        delivery: '3-5 days',
        detailPage: '/services/facebook/post-likes'
      }
    ]
  },
  'twitter': {
    title: 'Twitter Services',
    description: 'Enhance your Twitter presence with our premium engagement services. Grow your following and increase tweet engagement.',
    options: [
      {
        id: 'twitter-followers',
        name: '1,000 Twitter Followers',
        description: 'Real Twitter followers to boost your profile credibility.',
        price: 29,
        delivery: '7-10 days',
        detailPage: '/services/twitter/followers'
      },
      {
        id: 'twitter-likes',
        name: '1,000 Likes',
        description: 'Increase engagement on your tweets with authentic likes.',
        price: 19,
        delivery: '3-5 days',
        detailPage: '/services/twitter/likes'
      },
      {
        id: 'twitter-retweets',
        name: '500 Retweets',
        description: 'Expand your reach with quality retweets.',
        price: 25,
        delivery: '3-5 days',
        detailPage: '/services/twitter/retweets'
      }
    ]
  },
  'linkedin': {
    title: 'LinkedIn Services',
    description: 'Boost your professional presence on LinkedIn with our premium services. Enhance your profile and increase post engagement.',
    options: [
      {
        id: 'linkedin-followers',
        name: '500 LinkedIn Followers',
        description: 'Real followers for your LinkedIn profile or company page.',
        price: 39,
        delivery: '10-15 days',
        detailPage: '/services/linkedin/followers'
      },
      {
        id: 'linkedin-likes',
        name: '500 Post Likes',
        description: 'Boost engagement on your professional content.',
        price: 29,
        delivery: '5-7 days',
        detailPage: '/services/linkedin/likes'
      }
    ]
  }
};

export type { ServiceOption, ServicePageProps };
