
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from 'react-router-dom';
import { Clock, Search } from 'lucide-react';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  const blogPosts = [
    {
      id: 1,
      title: '10 Tips to Grow Your YouTube Channel Organically in 2025',
      excerpt: 'Discover proven strategies to increase your YouTube subscriber count, boost views, and improve engagement without breaking the bank.',
      category: 'YouTube',
      date: 'May 15, 2025',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1610882648335-ced11ff3d16f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500&q=80',
      author: 'Michael Torres',
      authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80'
    },
    {
      id: 2,
      title: 'Instagram Algorithm Changes: What You Need to Know',
      excerpt: 'The latest Instagram algorithm updates and how to adjust your strategy to maintain and grow your reach and engagement.',
      category: 'Instagram',
      date: 'May 10, 2025',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500&q=80',
      author: 'Jessica Chen',
      authorImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80'
    },
    {
      id: 3,
      title: 'How to Leverage Google Reviews to Boost Local Business Growth',
      excerpt: 'Learn how positive Google Reviews can significantly impact your local SEO and drive more foot traffic to your physical business location.',
      category: 'Google Reviews',
      date: 'May 5, 2025',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500&q=80',
      author: 'David Johnson',
      authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80'
    },
    {
      id: 4,
      title: 'Facebook Ads vs. Organic Growth: What\'s Best for Your Business?',
      excerpt: 'Compare the benefits and drawbacks of paid Facebook advertising against organic growth strategies to determine the best approach for your business goals.',
      category: 'Facebook',
      date: 'April 28, 2025',
      readTime: '9 min read',
      image: 'https://images.unsplash.com/photo-1563986768711-b3bde3dc821e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500&q=80',
      author: 'Sarah Williams',
      authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80'
    },
    {
      id: 5,
      title: 'Building a Professional Network on LinkedIn: Expert Strategies',
      excerpt: 'Discover how to effectively build, engage, and grow your professional network on LinkedIn to advance your career and business opportunities.',
      category: 'LinkedIn',
      date: 'April 20, 2025',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1611944212129-29977ae1398c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500&q=80',
      author: 'Robert Garcia',
      authorImage: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80'
    },
    {
      id: 6,
      title: 'The Power of Trustpilot Reviews for E-Commerce Businesses',
      excerpt: 'How Trustpilot reviews can significantly impact consumer trust, conversion rates, and overall business growth for online retailers.',
      category: 'Trustpilot',
      date: 'April 15, 2025',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=500&q=80',
      author: 'Emma Thompson',
      authorImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80'
    }
  ];

  const categories = ['All', 'YouTube', 'Instagram', 'Facebook', 'Twitter', 'LinkedIn', 'Google Reviews', 'Trustpilot'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category.toLowerCase() === 'all' || post.category.toLowerCase() === category.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="container-custom section-padding">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog & Resources</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expert insights, tips, and strategies to help you maximize your social media presence and grow your audience.
          </p>
        </div>

        {/* Search and filter */}
        <div className="mb-12 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              className="pl-9"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-64">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.toLowerCase()} value={cat.toLowerCase()}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Featured post */}
        {filteredPosts.length > 0 && (
          <div className="mb-12">
            <Link to={`/blog/${filteredPosts[0].id}`}>
              <Card className="overflow-hidden">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="h-64 md:h-auto">
                    <img 
                      src={filteredPosts[0].image} 
                      alt={filteredPosts[0].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-center">
                    <div className="mb-2">
                      <span className="inline-block px-3 py-1 text-sm font-medium bg-brand-blue/10 text-brand-blue rounded-full">
                        {filteredPosts[0].category}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 hover:text-brand-blue transition-colors">
                      {filteredPosts[0].title}
                    </h2>
                    <p className="text-gray-600 mb-6">{filteredPosts[0].excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img 
                          src={filteredPosts[0].authorImage} 
                          alt={filteredPosts[0].author} 
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                          <p className="font-medium">{filteredPosts[0].author}</p>
                          <p className="text-sm text-gray-500">{filteredPosts[0].date}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {filteredPosts[0].readTime}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        )}

        {/* Blog posts grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.length > 1 ? (
            filteredPosts.slice(1).map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`}>
                <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="mb-2">
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-brand-blue/10 text-brand-blue rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <CardTitle className="hover:text-brand-blue transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="border-t pt-4 mt-auto">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <img 
                          src={post.authorImage} 
                          alt={post.author} 
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <p className="text-sm font-medium">{post.author}</p>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-3 py-12 text-center">
              <p className="text-gray-500 text-lg">No articles found matching your search criteria.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredPosts.length > 0 && (
          <div className="mt-12 flex justify-center">
            <Button variant="outline" className="mx-1">
              Previous
            </Button>
            <Button variant="outline" className="mx-1 bg-brand-blue text-white">
              1
            </Button>
            <Button variant="outline" className="mx-1">
              2
            </Button>
            <Button variant="outline" className="mx-1">
              3
            </Button>
            <Button variant="outline" className="mx-1">
              Next
            </Button>
          </div>
        )}

        {/* Newsletter */}
        <div className="mt-20 bg-gray-50 p-8 rounded-xl">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h3>
            <p className="text-gray-600 mb-6">
              Get the latest social media marketing tips, tricks, and trends delivered directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input 
                placeholder="Your email address"
                className="flex-1"
              />
              <Button>
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
