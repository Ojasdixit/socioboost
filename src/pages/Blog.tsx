import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from 'react-router-dom';
import { Clock, Search, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category?: string;
  created_at: string;
  image_url?: string;
  status: 'draft' | 'published';
  author_name?: string;
  readTime?: string;
}

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        // Only fetch published blog posts
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('status', 'published')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        if (data) {
          // Format the blog posts data
          const formattedPosts = data.map(post => ({
            ...post,
            category: post.category || 'Uncategorized',
            readTime: '5 min read', // Default read time
            author_name: post.author_name || 'Admin',
            image_url: post.image_url || 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80', // Default image
          }));

          setBlogPosts(formattedPosts);

          // Extract unique categories from the blog posts
          const uniqueCategories = ['All', ...new Set(formattedPosts.map(post => post.category))];
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category.toLowerCase() === 'all' || 
                           (post.category && post.category.toLowerCase() === category.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  // Format date to a readable format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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

        {/* Error message */}
        {error && (
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Loading state */}
        {loading && (
          <div className="space-y-8">
            <div className="animate-pulse">
              <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No blog posts message */}
        {!loading && blogPosts.length === 0 && (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold mb-4">No Blog Posts Available</h2>
            <p className="text-gray-600">Check back soon for new content!</p>
          </div>
        )}

        {/* Featured post */}
        {!loading && filteredPosts.length > 0 && (
          <div className="mb-12">
            <Link to={`/blog/${filteredPosts[0].id}`}>
              <Card className="overflow-hidden">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="h-64 md:h-auto">
                    <img 
                      src={filteredPosts[0].image_url} 
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
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                          {filteredPosts[0].author_name?.charAt(0) || 'A'}
                        </div>
                        <div>
                          <p className="font-medium">{filteredPosts[0].author_name || 'Admin'}</p>
                          <p className="text-sm text-gray-500">{formatDate(filteredPosts[0].created_at)}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {filteredPosts[0].readTime || '5 min read'}
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
          {!loading && filteredPosts.length > 1 ? (
            filteredPosts.slice(1).map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`}>
                <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.image_url} 
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
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                          {post.author_name?.charAt(0) || 'A'}
                        </div>
                        <p className="text-sm font-medium">{post.author_name || 'Admin'}</p>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {post.readTime || '5 min read'}
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))
          ) : !loading && filteredPosts.length === 0 ? (
            <div className="col-span-3 py-12 text-center">
              <p className="text-gray-500 text-lg">No articles found matching your search criteria.</p>
            </div>
          ) : null}
        </div>

        {/* Pagination - only show if there are posts and not loading */}
        {!loading && filteredPosts.length > 0 && (
          <div className="mt-12 flex justify-center">
            <Button variant="outline" className="mx-1" disabled>
              Previous
            </Button>
            <Button variant="outline" className="mx-1 bg-brand-blue text-white">
              1
            </Button>
            <Button variant="outline" className="mx-1" disabled>
              Next
            </Button>
          </div>
        )}

        {/* Newsletter */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600 mb-6">
              Get the latest social media tips, trends, and strategies delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input placeholder="Enter your email" className="flex-1" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
