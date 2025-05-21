interface ServiceProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  delivery: string;
  features: string[];
  popular?: boolean;
}

interface FAQ {
  question: string;
  answer: string;
}

interface ServiceData {
  title: string;
  description: string;
  longDescription: string;
  products: ServiceProduct[];
  faqs: FAQ[];
}

export const serviceDetailData: Record<string, ServiceData> = {
  'youtube-subscribers': {
    title: 'YouTube Subscribers',
    description: 'Get real, active YouTube subscribers to grow your channel.',
    longDescription: 'Our YouTube subscriber service helps you build a strong subscriber base with real, active users who will engage with your content. We ensure organic growth that complies with YouTube\'s guidelines.',
    products: [
      {
        id: 'yt-sub-100',
        name: 'Starter Pack',
        description: 'Perfect for new channels',
        price: 49.99,
        delivery: '2-3 days',
        features: [
          '100 Real Subscribers',
          'No Password Required',
          'Lifetime Guarantee',
          '24/7 Support'
        ]
      },
      {
        id: 'yt-sub-500',
        name: 'Growth Pack',
        description: 'Most popular choice',
        price: 199.99,
        discountedPrice: 149.99,
        delivery: '3-4 days',
        features: [
          '500 Real Subscribers',
          'No Password Required',
          'Lifetime Guarantee',
          '24/7 Support',
          'Priority Delivery'
        ],
        popular: true
      },
      {
        id: 'yt-sub-1000',
        name: 'Premium Pack',
        description: 'For serious creators',
        price: 349.99,
        discountedPrice: 299.99,
        delivery: '4-5 days',
        features: [
          '1000 Real Subscribers',
          'No Password Required',
          'Lifetime Guarantee',
          '24/7 Support',
          'Priority Delivery',
          'Custom Profile Picture'
        ]
      }
    ],
    faqs: [
      {
        question: 'Are these real YouTube subscribers?',
        answer: 'Yes, we provide real, active subscribers who will engage with your content. We never use bots or fake accounts.'
      },
      {
        question: 'How long does it take to receive the subscribers?',
        answer: 'Delivery time varies by package, typically 2-5 days. We ensure gradual delivery to maintain account safety.'
      },
      {
        question: 'Do I need to provide my password?',
        answer: 'No, we never ask for your password. We only need your channel URL to deliver the subscribers.'
      }
    ]
  },
  'youtube-views': {
    title: 'YouTube Views',
    description: 'Increase your video views with our premium service.',
    longDescription: 'Boost your video visibility with our high-quality view service. We provide real views that help improve your video\'s ranking and reach.',
    products: [
      {
        id: 'yt-views-1000',
        name: 'Basic Views',
        description: 'For new videos',
        price: 29.99,
        delivery: '1-2 days',
        features: [
          '1000 Views',
          'Real Traffic',
          'No Password Required',
          'Lifetime Guarantee'
        ]
      },
      {
        id: 'yt-views-5000',
        name: 'Popular Views',
        description: 'Most popular choice',
        price: 99.99,
        discountedPrice: 79.99,
        delivery: '2-3 days',
        features: [
          '5000 Views',
          'Real Traffic',
          'No Password Required',
          'Lifetime Guarantee',
          'Priority Delivery'
        ],
        popular: true
      },
      {
        id: 'yt-views-10000',
        name: 'Viral Views',
        description: 'Maximum exposure',
        price: 179.99,
        discountedPrice: 149.99,
        delivery: '3-4 days',
        features: [
          '10000 Views',
          'Real Traffic',
          'No Password Required',
          'Lifetime Guarantee',
          'Priority Delivery',
          'Custom Thumbnail'
        ]
      }
    ],
    faqs: [
      {
        question: 'Are these real views?',
        answer: 'Yes, we provide real views from actual users. We never use bots or fake traffic.'
      },
      {
        question: 'Will these views help my video rank better?',
        answer: 'Yes, our views help improve your video\'s ranking in YouTube\'s algorithm and increase organic reach.'
      },
      {
        question: 'How quickly will I receive the views?',
        answer: 'Views are delivered gradually over 1-4 days depending on the package to ensure natural growth.'
      }
    ]
  },
  'youtube-likes': {
    title: 'YouTube Likes',
    description: 'Boost your video engagement with real YouTube likes.',
    longDescription: 'Our YouTube Likes service helps increase your video\'s engagement metrics, making it more appealing to both viewers and the YouTube algorithm. Higher like counts signal that your content is valuable and worth watching.',
    products: [
      {
        id: 'yt-likes-100',
        name: 'Basic Likes',
        description: 'For new videos',
        price: 19.99,
        delivery: '1-2 days',
        features: [
          '100 Real Likes',
          'No Password Required',
          'Lifetime Guarantee',
          '24/7 Support'
        ]
      },
      {
        id: 'yt-likes-500',
        name: 'Popular Likes',
        description: 'Most popular choice',
        price: 79.99,
        discountedPrice: 59.99,
        delivery: '2-3 days',
        features: [
          '500 Real Likes',
          'No Password Required',
          'Lifetime Guarantee',
          '24/7 Support',
          'Priority Delivery'
        ],
        popular: true
      },
      {
        id: 'yt-likes-1000',
        name: 'Viral Likes',
        description: 'Maximum engagement',
        price: 149.99,
        discountedPrice: 129.99,
        delivery: '3-4 days',
        features: [
          '1000 Real Likes',
          'No Password Required',
          'Lifetime Guarantee',
          '24/7 Support',
          'Priority Delivery',
          'Custom Thumbnail'
        ]
      }
    ],
    faqs: [
      {
        question: 'Are these real YouTube likes?',
        answer: 'Yes, we provide real likes from actual users. We never use bots or fake engagement.'
      },
      {
        question: 'Will these likes help my video perform better?',
        answer: 'Yes, likes are a key engagement metric that helps improve your video\'s visibility and ranking.'
      },
      {
        question: 'How quickly will I receive the likes?',
        answer: 'Likes are delivered gradually over 1-4 days depending on the package to ensure natural growth.'
      }
    ]
  },
  'youtube-comments': {
    title: 'YouTube Comments',
    description: 'Increase engagement with custom YouTube comments.',
    longDescription: 'Our YouTube Comments service provides authentic, relevant comments that boost your video\'s engagement metrics and create an active community appearance. Custom comments encourage organic viewer interactions.',
    products: [
      {
        id: 'yt-comments-10',
        name: 'Basic Comments',
        description: 'For new videos',
        price: 29.99,
        delivery: '1-2 days',
        features: [
          '10 Custom Comments',
          'Real Accounts',
          'No Password Required',
          'Lifetime Guarantee'
        ]
      },
      {
        id: 'yt-comments-25',
        name: 'Popular Comments',
        description: 'Most popular choice',
        price: 69.99,
        discountedPrice: 49.99,
        delivery: '2-3 days',
        features: [
          '25 Custom Comments',
          'Real Accounts',
          'No Password Required',
          'Lifetime Guarantee',
          'Priority Delivery'
        ],
        popular: true
      },
      {
        id: 'yt-comments-50',
        name: 'Viral Comments',
        description: 'Maximum engagement',
        price: 129.99,
        discountedPrice: 99.99,
        delivery: '3-4 days',
        features: [
          '50 Custom Comments',
          'Real Accounts',
          'No Password Required',
          'Lifetime Guarantee',
          'Priority Delivery',
          'Custom Thumbnail'
        ]
      }
    ],
    faqs: [
      {
        question: 'Can I customize the comments?',
        answer: 'Yes, you can provide guidelines or specific points you want mentioned in the comments.'
      },
      {
        question: 'Are these comments from real accounts?',
        answer: 'Yes, all comments come from real YouTube accounts with authentic histories.'
      },
      {
        question: 'How quickly will the comments appear?',
        answer: 'Comments are posted gradually over 1-4 days to maintain authenticity and avoid detection.'
      }
    ]
  },
  'instagram-followers': {
    title: 'Instagram Followers',
    description: 'Get real Instagram followers to grow your presence.',
    longDescription: 'Build your Instagram following with our premium service. We provide real, active followers who will engage with your content.',
    products: [
      {
        id: 'ig-followers-100',
        name: 'Starter Pack',
        description: 'For new accounts',
        price: 39.99,
        delivery: '1-2 days',
        features: [
          '100 Real Followers',
          'No Password Required',
          'Lifetime Guarantee',
          '24/7 Support'
        ]
      },
      {
        id: 'ig-followers-500',
        name: 'Growth Pack',
        description: 'Most popular choice',
        price: 149.99,
        discountedPrice: 129.99,
        delivery: '2-3 days',
        features: [
          '500 Real Followers',
          'No Password Required',
          'Lifetime Guarantee',
          '24/7 Support',
          'Priority Delivery'
        ],
        popular: true
      },
      {
        id: 'ig-followers-1000',
        name: 'Premium Pack',
        description: 'For serious influencers',
        price: 249.99,
        discountedPrice: 199.99,
        delivery: '3-4 days',
        features: [
          '1000 Real Followers',
          'No Password Required',
          'Lifetime Guarantee',
          '24/7 Support',
          'Priority Delivery',
          'Custom Bio'
        ]
      }
    ],
    faqs: [
      {
        question: 'Are these real Instagram followers?',
        answer: 'Yes, we provide real, active followers who will engage with your content. We never use bots or fake accounts.'
      },
      {
        question: 'How long does it take to receive the followers?',
        answer: 'Delivery time varies by package, typically 1-4 days. We ensure gradual delivery to maintain account safety.'
      },
      {
        question: 'Do I need to provide my password?',
        answer: 'No, we never ask for your password. We only need your Instagram username to deliver the followers.'
      }
    ]
  },
  'instagram-likes': {
    title: 'Instagram Likes',
    description: 'Boost your posts with real Instagram likes.',
    longDescription: 'Our Instagram Likes service helps increase your post engagement metrics, signaling to both users and the Instagram algorithm that your content is valuable. Higher like counts lead to better visibility in feeds and explore pages.',
    products: [
      {
        id: 'ig-likes-100',
        name: 'Basic Likes',
        description: 'For new posts',
        price: 19.99,
        delivery: '1-2 days',
        features: [
          '100 Real Likes',
          'No Password Required',
          'Lifetime Guarantee',
          '24/7 Support'
        ]
      },
      {
        id: 'ig-likes-500',
        name: 'Popular Likes',
        description: 'Most popular choice',
        price: 79.99,
        discountedPrice: 59.99,
        delivery: '2-3 days',
        features: [
          '500 Real Likes',
          'No Password Required',
          'Lifetime Guarantee',
          '24/7 Support',
          'Priority Delivery'
        ],
        popular: true
      },
      {
        id: 'ig-likes-1000',
        name: 'Viral Likes',
        description: 'Maximum engagement',
        price: 149.99,
        discountedPrice: 129.99,
        delivery: '3-4 days',
        features: [
          '1000 Real Likes',
          'No Password Required',
          'Lifetime Guarantee',
          '24/7 Support',
          'Priority Delivery',
          'Custom Hashtags'
        ]
      }
    ],
    faqs: [
      {
        question: 'Are these real Instagram likes?',
        answer: 'Yes, we provide real likes from actual users. We never use bots or fake engagement.'
      },
      {
        question: 'Will these likes help my post reach more people?',
        answer: 'Yes, posts with higher engagement are favored by Instagram\'s algorithm, potentially increasing your reach.'
      },
      {
        question: 'How quickly will I receive the likes?',
        answer: 'Likes are delivered gradually over 1-4 days depending on the package to ensure natural growth.'
      }
    ]
  },
  'instagram-comments': {
    title: 'Instagram Comments',
    description: 'Enhance engagement with custom Instagram comments.',
    longDescription: 'Our Instagram Comments service provides authentic, relevant comments that spark conversation and increase your post\'s engagement metrics. Custom comments help create an active community appearance and encourage organic interactions.',
    products: [
      {
        id: 'ig-comments-10',
        name: 'Basic Comments',
        description: 'For new posts',
        price: 29.99,
        delivery: '1-2 days',
        features: [
          '10 Custom Comments',
          'Real Accounts',
          'No Password Required',
          'Lifetime Guarantee'
        ]
      },
      {
        id: 'ig-comments-25',
        name: 'Popular Comments',
        description: 'Most popular choice',
        price: 69.99,
        discountedPrice: 49.99,
        delivery: '2-3 days',
        features: [
          '25 Custom Comments',
          'Real Accounts',
          'No Password Required',
          'Lifetime Guarantee',
          'Priority Delivery'
        ],
        popular: true
      },
      {
        id: 'ig-comments-50',
        name: 'Viral Comments',
        description: 'Maximum engagement',
        price: 129.99,
        discountedPrice: 99.99,
        delivery: '3-4 days',
        features: [
          '50 Custom Comments',
          'Real Accounts',
          'No Password Required',
          'Lifetime Guarantee',
          'Priority Delivery',
          'Custom Hashtags'
        ]
      }
    ],
    faqs: [
      {
        question: 'Can I customize the comments?',
        answer: 'Yes, you can provide guidelines or specific points you want mentioned in the comments.'
      },
      {
        question: 'Are these comments from real accounts?',
        answer: 'Yes, all comments come from real Instagram accounts with authentic histories.'
      },
      {
        question: 'How quickly will the comments appear?',
        answer: 'Comments are posted gradually over 1-4 days to maintain authenticity and avoid detection.'
      }
    ]
  },
  'facebook-page-likes': {
    title: 'Facebook Page Likes',
    description: 'Boost your Facebook page credibility with authentic likes.',
    longDescription: 'Our Facebook Page Likes service helps business and brand pages achieve a more professional and established online presence. With more page likes, you\'ll gain increased credibility, better reach, and improved social proof.',
    products: [
      {
        id: 'fb-likes-100',
        name: 'Basic Likes',
        description: 'For new pages',
        price: 29.99,
        delivery: '1-2 days',
        features: [
          '100 Real Likes',
          'No Password Required',
          'Lifetime Guarantee',
          '24/7 Support'
        ]
      },
      {
        id: 'fb-likes-500',
        name: 'Popular Likes',
        description: 'Most popular choice',
        price: 99.99,
        discountedPrice: 79.99,
        delivery: '2-3 days',
        features: [
          '500 Real Likes',
          'No Password Required',
          'Lifetime Guarantee',
          '24/7 Support',
          'Priority Delivery'
        ],
        popular: true
      },
      {
        id: 'fb-likes-1000',
        name: 'Viral Likes',
        description: 'Maximum exposure',
        price: 179.99,
        discountedPrice: 149.99,
        delivery: '3-4 days',
        features: [
          '1000 Real Likes',
          'No Password Required',
          'Lifetime Guarantee',
          '24/7 Support',
          'Priority Delivery',
          'Custom Cover Photo'
        ]
      }
    ],
    faqs: [
      {
        question: 'Are these real Facebook page likes?',
        answer: 'Yes, we provide real likes from actual users. We never use bots or fake engagement.'
      },
      {
        question: 'Will these likes help my page reach more people?',
        answer: 'Yes, pages with more likes are favored by Facebook\'s algorithm, potentially increasing your reach.'
      },
      {
        question: 'How quickly will I receive the likes?',
        answer: 'Likes are delivered gradually over 1-4 days depending on the package to ensure natural growth.'
      }
    ]
  },
  'facebook-post-likes': {
    title: 'Facebook Post Likes',
    description: 'Increase engagement on your posts with authentic likes.',
    longDescription: 'Our Facebook Post Likes service helps boost your content\'s visibility and engagement metrics. With more likes, your posts will reach a wider audience through Facebook\'s algorithm, creating stronger social proof.',
    products: [
      {
        id: 'fb-post-likes-100',
        name: 'Basic Likes',
        description: 'For new posts',
        price: 19.99,
        delivery: '1-2 days',
        features: [
          '100 Real Likes',
          'No Password Required',
          'Lifetime Guarantee',
          '24/7 Support'
        ]
      },
      {
        id: 'fb-post-likes-500',
        name: 'Popular Likes',
        description: 'Most popular choice',
        price: 79.99,
        discountedPrice: 59.99,
        delivery: '2-3 days',
        features: [
          '500 Real Likes',
          'No Password Required',
          'Lifetime Guarantee',
          '24/7 Support',
          'Priority Delivery'
        ],
        popular: true
      },
      {
        id: 'fb-post-likes-1000',
        name: 'Viral Likes',
        description: 'Maximum engagement',
        price: 149.99,
        discountedPrice: 129.99,
        delivery: '3-4 days',
        features: [
          '1000 Real Likes',
          'No Password Required',
          'Lifetime Guarantee',
          '24/7 Support',
          'Priority Delivery',
          'Custom Hashtags'
        ]
      }
    ],
    faqs: [
      {
        question: 'Are these real Facebook post likes?',
        answer: 'Yes, we provide real likes from actual users. We never use bots or fake engagement.'
      },
      {
        question: 'Will these likes help my post reach more people?',
        answer: 'Yes, posts with higher engagement are favored by Facebook\'s algorithm, potentially increasing your reach.'
      },
      {
        question: 'How quickly will I receive the likes?',
        answer: 'Likes are delivered gradually over 1-4 days depending on the package to ensure natural growth.'
      }
    ]
  },
  'twitter-followers': {
    title: 'Twitter Followers',
    description: 'Grow your Twitter presence with real followers.',
    longDescription: 'Our Twitter Followers service helps you build a stronger social presence by increasing your follower count with quality accounts. More followers means better credibility, wider reach, and improved influence in your niche.',
    products: [
      {
        id: 'tw-followers-100',
        name: 'Basic Followers',
        description: 'For new accounts',
        price: 29.99,
        delivery: '1-2 days',
        features: [
          '100 Real Followers',
          'No Password Required',
          'Lifetime Guarantee',
          '24/7 Support'
        ]
      },
      {
        id: 'tw-followers-500',
        name: 'Popular Followers',
        description: 'Most popular choice',
        price: 99.99,
        discountedPrice: 79.99,
        delivery: '2-3 days',
        features: [
          '500 Real Followers',
          'No Password Required',
          'Lifetime Guarantee',
          '24/7 Support',
          'Priority Delivery'
        ],
        popular: true
      },
      {
        id: 'tw-followers-1000',
        name: 'Viral Followers',
        description: 'Maximum exposure',
        price: 179.99,
        discountedPrice: 149.99,
        delivery: '3-4 days',
        features: [
          '1000 Real Followers',
          'No Password Required',
          'Lifetime Guarantee',
          '24/7 Support',
          'Priority Delivery',
          'Custom Bio'
        ]
      }
    ],
    faqs: [
      {
        question: 'Are these real Twitter followers?',
        answer: 'Yes, we provide real followers from actual users. We never use bots or fake accounts.'
      },
      {
        question: 'Will these followers engage with my tweets?',
        answer: 'While we guarantee follower count increases, engagement levels can vary. For guaranteed engagement, consider our Twitter Likes service.'
      },
      {
        question: 'How quickly will I receive the followers?',
        answer: 'Followers are delivered gradually over 1-4 days depending on the package to ensure natural growth.'
      }
    ]
  },
  'twitter-likes': {
    title: 'Twitter Likes',
    description: 'Boost tweet engagement with Twitter likes.',
    longDescription: 'Our Twitter Likes service helps increase your tweet\'s visibility and perceived popularity. More likes lead to better engagement, credibility, and improved chances of reaching a wider audience.',
    products: [
      {
        id: 'tw-likes-100',
        name: 'Basic Likes',
        description: 'For new tweets',
        price: 19.99,
        delivery: '1-2 days',
        features: [
          '100 Real Likes',
          'No Password Required',
          'Lifetime Guarantee',
          '24/7 Support'
        ]
      },
      {
        id: 'tw-likes-500',
        name: 'Popular Likes',
        description: 'Most popular choice',
        price: 79.99,
        discountedPrice: 59.99,
        delivery: '2-3 days',
        features: [
          '500 Real Likes',
          'No Password Required',
          'Lifetime Guarantee',
          '24/7 Support',
          'Priority Delivery'
        ],
        popular: true
      },
      {
        id: 'tw-likes-1000',
        name: 'Viral Likes',
        description: 'Maximum engagement',
        price: 149.99,
        discountedPrice: 129.99,
        delivery: '3-4 days',
        features: [
          '1000 Real Likes',
          'No Password Required',
          'Lifetime Guarantee',
          '24/7 Support',
          'Priority Delivery',
          'Custom Hashtags'
        ]
      }
    ],
    faqs: [
      {
        question: 'Are these real Twitter likes?',
        answer: 'Yes, we provide real likes from actual users. We never use bots or fake engagement.'
      },
      {
        question: 'Will these likes help my tweet reach more people?',
        answer: 'Yes, tweets with higher engagement are favored by Twitter\'s algorithm, potentially increasing your reach.'
      },
      {
        question: 'How quickly will I receive the likes?',
        answer: 'Likes are delivered gradually over 1-4 days depending on the package to ensure natural growth.'
      }
    ]
  },
  'linkedin-followers': {
    title: 'LinkedIn Followers',
    description: 'Build your professional network with LinkedIn followers.',
    longDescription: 'Our LinkedIn Followers service helps you establish credibility and expand your professional network. Whether for personal profiles or company pages, more followers lead to better visibility, enhanced industry reputation, and improved career or business opportunities.',
    products: [
      {
        id: 'li-followers-100',
        name: 'Basic Followers',
        description: 'For new profiles',
        price: 39.99,
        delivery: '1-2 days',
        features: [
          '100 Real Followers',
          'No Password Required',
          'Lifetime Guarantee',
          '24/7 Support'
        ]
      },
      {
        id: 'li-followers-500',
        name: 'Popular Followers',
        description: 'Most popular choice',
        price: 149.99,
        discountedPrice: 129.99,
        delivery: '2-3 days',
        features: [
          '500 Real Followers',
          'No Password Required',
          'Lifetime Guarantee',
          '24/7 Support',
          'Priority Delivery'
        ],
        popular: true
      },
      {
        id: 'li-followers-1000',
        name: 'Viral Followers',
        description: 'Maximum exposure',
        price: 249.99,
        discountedPrice: 199.99,
        delivery: '3-4 days',
        features: [
          '1000 Real Followers',
          'No Password Required',
          'Lifetime Guarantee',
          '24/7 Support',
          'Priority Delivery',
          'Custom Profile'
        ]
      }
    ],
    faqs: [
      {
        question: 'Are these real LinkedIn followers?',
        answer: 'Yes, we provide real followers from actual professionals. We never use bots or fake accounts.'
      },
      {
        question: 'Will these followers engage with my content?',
        answer: 'While we guarantee follower count increases, engagement levels can vary. For guaranteed engagement, consider our LinkedIn Likes service.'
      },
      {
        question: 'How quickly will I receive the followers?',
        answer: 'Followers are delivered gradually over 1-4 days depending on the package to ensure natural growth.'
      }
    ]
  },
  'linkedin-likes': {
    title: 'LinkedIn Likes',
    description: 'Boost your professional content with LinkedIn likes.',
    longDescription: 'Our LinkedIn Likes service helps increase your post engagement and visibility within professional networks. Higher like counts lead to better algorithm performance, expanded reach, and enhanced professional credibility.',
    products: [
      {
        id: 'li-likes-100',
        name: 'Basic Likes',
        description: 'For new posts',
        price: 29.99,
        delivery: '1-2 days',
        features: [
          '100 Real Likes',
          'No Password Required',
          'Lifetime Guarantee',
          '24/7 Support'
        ]
      },
      {
        id: 'li-likes-500',
        name: 'Popular Likes',
        description: 'Most popular choice',
        price: 99.99,
        discountedPrice: 79.99,
        delivery: '2-3 days',
        features: [
          '500 Real Likes',
          'No Password Required',
          'Lifetime Guarantee',
          '24/7 Support',
          'Priority Delivery'
        ],
        popular: true
      },
      {
        id: 'li-likes-1000',
        name: 'Viral Likes',
        description: 'Maximum engagement',
        price: 179.99,
        discountedPrice: 149.99,
        delivery: '3-4 days',
        features: [
          '1000 Real Likes',
          'No Password Required',
          'Lifetime Guarantee',
          '24/7 Support',
          'Priority Delivery',
          'Custom Hashtags'
        ]
      }
    ],
    faqs: [
      {
        question: 'Are these real LinkedIn likes?',
        answer: 'Yes, we provide real likes from actual professionals. We never use bots or fake engagement.'
      },
      {
        question: 'Will these likes help my post reach more professionals?',
        answer: 'Yes, posts with higher engagement are favored by LinkedIn\'s algorithm, potentially increasing your reach.'
      },
      {
        question: 'How quickly will I receive the likes?',
        answer: 'Likes are delivered gradually over 1-4 days depending on the package to ensure natural growth.'
      }
    ]
  },
  'google-reviews-positive': {
    title: 'Positive Google Reviews',
    description: 'Boost your business reputation with authentic Google reviews.',
    longDescription: 'Our Google Reviews service helps businesses build trust and credibility through authentic, positive reviews from verified users. Improve your local SEO ranking and attract more customers with a strong online presence.',
    products: [
      {
        id: 'google-reviews-5',
        name: 'Starter Pack',
        description: 'For new businesses',
        price: 199.99,
        delivery: '3-4 days',
        features: [
          '5 Verified Reviews',
          'Real Google Accounts',
          'Custom Review Content',
          'Lifetime Guarantee',
          '24/7 Support'
        ]
      },
      {
        id: 'google-reviews-10',
        name: 'Popular Pack',
        description: 'Most popular choice',
        price: 349.99,
        discountedPrice: 299.99,
        delivery: '4-5 days',
        features: [
          '10 Verified Reviews',
          'Real Google Accounts',
          'Custom Review Content',
          'Lifetime Guarantee',
          '24/7 Support',
          'Priority Delivery'
        ],
        popular: true
      },
      {
        id: 'google-reviews-20',
        name: 'Premium Pack',
        description: 'Maximum impact',
        price: 599.99,
        discountedPrice: 499.99,
        delivery: '5-7 days',
        features: [
          '20 Verified Reviews',
          'Real Google Accounts',
          'Custom Review Content',
          'Lifetime Guarantee',
          '24/7 Support',
          'Priority Delivery',
          'Review Management'
        ]
      }
    ],
    faqs: [
      {
        question: 'Are these real Google reviews?',
        answer: 'Yes, all reviews come from verified Google accounts with authentic histories. We never use fake accounts or bots.'
      },
      {
        question: 'Can I customize the review content?',
        answer: 'Yes, you can provide guidelines or specific points you want mentioned in the reviews. We ensure they sound natural and authentic.'
      },
      {
        question: 'How long do the reviews stay on my profile?',
        answer: 'All reviews are permanent and will stay on your Google Business Profile as long as they comply with Google\'s guidelines.'
      }
    ]
  },
  'google-reviews-reputation': {
    title: 'Google Reputation Management',
    description: 'Comprehensive reputation management for your Google Business Profile.',
    longDescription: 'Our Google Reputation Management service helps businesses maintain a positive online presence by managing and responding to reviews, improving ratings, and enhancing overall visibility.',
    products: [
      {
        id: 'google-rep-basic',
        name: 'Basic Management',
        description: 'For small businesses',
        price: 299.99,
        delivery: 'Ongoing',
        features: [
          'Monthly Review Monitoring',
          'Response to All Reviews',
          'Rating Improvement Plan',
          'Basic Analytics Report',
          'Email Support'
        ]
      },
      {
        id: 'google-rep-pro',
        name: 'Professional Management',
        description: 'Most popular choice',
        price: 499.99,
        discountedPrice: 449.99,
        delivery: 'Ongoing',
        features: [
          'Weekly Review Monitoring',
          'Response to All Reviews',
          'Rating Improvement Plan',
          'Detailed Analytics Report',
          'Priority Support',
          'Review Generation Strategy'
        ],
        popular: true
      },
      {
        id: 'google-rep-premium',
        name: 'Premium Management',
        description: 'Complete reputation solution',
        price: 799.99,
        discountedPrice: 699.99,
        delivery: 'Ongoing',
        features: [
          'Daily Review Monitoring',
          'Response to All Reviews',
          'Rating Improvement Plan',
          'Advanced Analytics Report',
          '24/7 Priority Support',
          'Review Generation Strategy',
          'Crisis Management'
        ]
      }
    ],
    faqs: [
      {
        question: 'How do you improve my Google rating?',
        answer: 'We implement a comprehensive strategy including encouraging satisfied customers to leave reviews, responding to all reviews professionally, and addressing any negative feedback promptly.'
      },
      {
        question: 'What happens if I receive a negative review?',
        answer: 'Our team will immediately notify you and help craft a professional response. We also work to generate more positive reviews to balance your overall rating.'
      },
      {
        question: 'How often will I receive reports?',
        answer: 'Report frequency depends on your package. Basic plans receive monthly reports, while premium plans include weekly or daily updates on your reputation metrics.'
      }
    ]
  },
  'trustpilot-paid-reviews': {
    title: 'Trustpilot Paid Reviews',
    description: 'Get authentic Trustpilot reviews to build trust.',
    longDescription: 'Our Trustpilot Reviews service helps businesses establish credibility through verified, authentic reviews from real users. Improve your TrustScore and attract more customers with a strong Trustpilot presence.',
    products: [
      {
        id: 'trustpilot-5',
        name: 'Starter Pack',
        description: 'For new businesses',
        price: 249.99,
        delivery: '3-4 days',
        features: [
          '5 Verified Reviews',
          'Real Trustpilot Accounts',
          'Custom Review Content',
          'Lifetime Guarantee',
          '24/7 Support'
        ]
      },
      {
        id: 'trustpilot-10',
        name: 'Popular Pack',
        description: 'Most popular choice',
        price: 449.99,
        discountedPrice: 399.99,
        delivery: '4-5 days',
        features: [
          '10 Verified Reviews',
          'Real Trustpilot Accounts',
          'Custom Review Content',
          'Lifetime Guarantee',
          '24/7 Support',
          'Priority Delivery'
        ],
        popular: true
      },
      {
        id: 'trustpilot-20',
        name: 'Premium Pack',
        description: 'Maximum impact',
        price: 799.99,
        discountedPrice: 699.99,
        delivery: '5-7 days',
        features: [
          '20 Verified Reviews',
          'Real Trustpilot Accounts',
          'Custom Review Content',
          'Lifetime Guarantee',
          '24/7 Support',
          'Priority Delivery',
          'Review Management'
        ]
      }
    ],
    faqs: [
      {
        question: 'Are these real Trustpilot reviews?',
        answer: 'Yes, all reviews come from verified Trustpilot accounts with authentic histories. We never use fake accounts or bots.'
      },
      {
        question: 'Can I customize the review content?',
        answer: 'Yes, you can provide guidelines or specific points you want mentioned in the reviews. We ensure they sound natural and authentic.'
      },
      {
        question: 'How long do the reviews stay on my profile?',
        answer: 'All reviews are permanent and will stay on your Trustpilot profile as long as they comply with Trustpilot\'s guidelines.'
      }
    ]
  },
  'trustpilot-custom': {
    title: 'Custom Trustpilot Solutions',
    description: 'Tailored Trustpilot solutions for your business needs.',
    longDescription: 'Our Custom Trustpilot Solutions provide businesses with personalized strategies to improve their TrustScore, manage reviews, and enhance their overall Trustpilot presence.',
    products: [
      {
        id: 'trustpilot-custom-basic',
        name: 'Basic Solution',
        description: 'For small businesses',
        price: 399.99,
        delivery: 'Ongoing',
        features: [
          'Monthly Review Management',
          'Response to All Reviews',
          'TrustScore Improvement Plan',
          'Basic Analytics Report',
          'Email Support'
        ]
      },
      {
        id: 'trustpilot-custom-pro',
        name: 'Professional Solution',
        description: 'Most popular choice',
        price: 699.99,
        discountedPrice: 599.99,
        delivery: 'Ongoing',
        features: [
          'Weekly Review Management',
          'Response to All Reviews',
          'TrustScore Improvement Plan',
          'Detailed Analytics Report',
          'Priority Support',
          'Review Generation Strategy'
        ],
        popular: true
      },
      {
        id: 'trustpilot-custom-premium',
        name: 'Premium Solution',
        description: 'Complete Trustpilot solution',
        price: 999.99,
        discountedPrice: 899.99,
        delivery: 'Ongoing',
        features: [
          'Daily Review Management',
          'Response to All Reviews',
          'TrustScore Improvement Plan',
          'Advanced Analytics Report',
          '24/7 Priority Support',
          'Review Generation Strategy',
          'Crisis Management'
        ]
      }
    ],
    faqs: [
      {
        question: 'How do you improve my TrustScore?',
        answer: 'We implement a comprehensive strategy including encouraging satisfied customers to leave reviews, responding to all reviews professionally, and addressing any negative feedback promptly.'
      },
      {
        question: 'What happens if I receive a negative review?',
        answer: 'Our team will immediately notify you and help craft a professional response. We also work to generate more positive reviews to balance your overall TrustScore.'
      },
      {
        question: 'How often will I receive reports?',
        answer: 'Report frequency depends on your package. Basic plans receive monthly reports, while premium plans include weekly or daily updates on your Trustpilot metrics.'
      }
    ]
  },
  'instagram-views': {
    title: 'Instagram Views',
    description: 'Boost your Instagram Reels and videos with real views.',
    longDescription: 'Our Instagram Views service helps increase your content\'s visibility and engagement. Real views from authentic users help improve your reach and attract more organic engagement.',
    products: [
      {
        id: 'ig-views-1000',
        name: 'Basic Views',
        description: 'For new content',
        price: 29.99,
        delivery: '1-2 days',
        features: [
          '1000 Real Views',
          'No Password Required',
          'Lifetime Guarantee',
          '24/7 Support'
        ]
      },
      {
        id: 'ig-views-5000',
        name: 'Popular Views',
        description: 'Most popular choice',
        price: 99.99,
        discountedPrice: 79.99,
        delivery: '2-3 days',
        features: [
          '5000 Real Views',
          'No Password Required',
          'Lifetime Guarantee',
          '24/7 Support',
          'Priority Delivery'
        ],
        popular: true
      },
      {
        id: 'ig-views-10000',
        name: 'Viral Views',
        description: 'Maximum exposure',
        price: 179.99,
        discountedPrice: 149.99,
        delivery: '3-4 days',
        features: [
          '10000 Real Views',
          'No Password Required',
          'Lifetime Guarantee',
          '24/7 Support',
          'Priority Delivery',
          'Custom Hashtags'
        ]
      }
    ],
    faqs: [
      {
        question: 'Are these real Instagram views?',
        answer: 'Yes, we provide real views from actual users. We never use bots or fake traffic.'
      },
      {
        question: 'Will these views help my content reach more people?',
        answer: 'Yes, higher view counts help improve your content\'s visibility in the Instagram algorithm, potentially increasing your organic reach.'
      },
      {
        question: 'How quickly will I receive the views?',
        answer: 'Views are delivered gradually over 1-4 days depending on the package to ensure natural growth.'
      }
    ]
  },
  'facebook-followers': {
    title: 'Facebook Followers',
    description: 'Grow your Facebook page with real followers.',
    longDescription: 'Our Facebook Followers service helps you build a strong social presence with real, active followers. Increase your page\'s credibility and reach more potential customers.',
    products: [
      {
        id: 'fb-followers-100',
        name: 'Starter Pack',
        description: 'For new pages',
        price: 39.99,
        delivery: '2-3 days',
        features: [
          '100 Real Followers',
          'No Password Required',
          'Lifetime Guarantee',
          '24/7 Support'
        ]
      },
      {
        id: 'fb-followers-500',
        name: 'Growth Pack',
        description: 'Most popular choice',
        price: 149.99,
        discountedPrice: 129.99,
        delivery: '3-4 days',
        features: [
          '500 Real Followers',
          'No Password Required',
          'Lifetime Guarantee',
          '24/7 Support',
          'Priority Delivery'
        ],
        popular: true
      },
      {
        id: 'fb-followers-1000',
        name: 'Premium Pack',
        description: 'Maximum exposure',
        price: 249.99,
        discountedPrice: 199.99,
        delivery: '4-5 days',
        features: [
          '1000 Real Followers',
          'No Password Required',
          'Lifetime Guarantee',
          '24/7 Support',
          'Priority Delivery',
          'Custom Cover Photo'
        ]
      }
    ],
    faqs: [
      {
        question: 'Are these real Facebook followers?',
        answer: 'Yes, we provide real followers from actual users. We never use bots or fake accounts.'
      },
      {
        question: 'Will these followers engage with my content?',
        answer: 'While we guarantee follower count increases, engagement levels can vary. For guaranteed engagement, consider our Facebook Post Likes service.'
      },
      {
        question: 'How quickly will I receive the followers?',
        answer: 'Followers are delivered gradually over 2-5 days depending on the package to ensure natural growth.'
      }
    ]
  },
  'youtube-watch-hours': {
    title: 'YouTube Watch Hours',
    description: 'Get real watch hours to monetize your YouTube channel.',
    longDescription: 'Our YouTube Watch Hours service helps you reach the 4,000 watch hours requirement for YouTube monetization. We provide real views from authentic users to help you achieve your monetization goals.',
    products: [
      {
        id: 'yt-hours-1000',
        name: 'Basic Hours',
        description: 'For new channels',
        price: 199.99,
        delivery: '7-10 days',
        features: [
          '1000 Watch Hours',
          'Real Views',
          'No Password Required',
          'Lifetime Guarantee',
          '24/7 Support'
        ]
      },
      {
        id: 'yt-hours-2000',
        name: 'Popular Hours',
        description: 'Most popular choice',
        price: 349.99,
        discountedPrice: 299.99,
        delivery: '10-14 days',
        features: [
          '2000 Watch Hours',
          'Real Views',
          'No Password Required',
          'Lifetime Guarantee',
          '24/7 Support',
          'Priority Delivery'
        ],
        popular: true
      },
      {
        id: 'yt-hours-4000',
        name: 'Monetization Pack',
        description: 'Complete monetization',
        price: 599.99,
        discountedPrice: 499.99,
        delivery: '14-21 days',
        features: [
          '4000 Watch Hours',
          'Real Views',
          'No Password Required',
          'Lifetime Guarantee',
          '24/7 Support',
          'Priority Delivery',
          'Channel Analysis'
        ]
      }
    ],
    faqs: [
      {
        question: 'Are these real watch hours?',
        answer: 'Yes, we provide real watch hours from actual users. We never use bots or fake views.'
      },
      {
        question: 'Will these watch hours count towards monetization?',
        answer: 'Yes, our watch hours are from real users and will count towards YouTube\'s monetization requirements.'
      },
      {
        question: 'How quickly will I receive the watch hours?',
        answer: 'Watch hours are delivered gradually over 7-21 days depending on the package to ensure natural growth and compliance with YouTube\'s guidelines.'
      }
    ]
  }
};
