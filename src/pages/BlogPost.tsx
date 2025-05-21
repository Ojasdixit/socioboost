import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Clock, ChevronLeft, Share2, Facebook, Twitter, Linkedin, AlertCircle } from 'lucide-react';
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

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch the blog post from the database
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('id', id)
          .eq('status', 'published')
          .single();
        
        if (error) {
          console.error('Error fetching blog post:', error);
          setError('Blog post not found or unavailable.');
          setLoading(false);
          return;
        }
        
        if (data) {
          // Format the database post to match the structure we need
          const formattedPost: BlogPost = {
            ...data,
            category: data.category || 'Uncategorized',
            readTime: '5 min read', // Default read time
            author_name: data.author_name || 'Admin',
            image_url: data.image_url || 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80' // Default image if none provided
          };
          
          setPost(formattedPost);
          
          // Fetch related posts (posts with the same category, excluding current post)
          let relatedQuery = supabase
            .from('blog_posts')
            .select('*')
            .eq('status', 'published')
            .neq('id', id);
            
          // Add category filter if available
          if (data.category) {
            relatedQuery = relatedQuery.eq('category', data.category);
          }
          
          const { data: relatedData, error: relatedError } = await relatedQuery.limit(3);
          
          if (relatedError) {
            console.error('Error fetching related posts:', relatedError);
          } else if (relatedData) {
            // If we don't have enough related posts in the same category, fetch more posts
            if (relatedData.length < 3) {
              const { data: moreRelatedData } = await supabase
                .from('blog_posts')
                .select('*')
                .eq('status', 'published')
                .neq('id', id)
                .neq('category', data.category || '')
                .limit(3 - relatedData.length);
                
              if (moreRelatedData) {
                relatedData.push(...moreRelatedData);
              }
            }
            
            const formattedRelated = relatedData.map(post => ({
              ...post,
              category: post.category || 'Uncategorized',
              readTime: '5 min read',
              author_name: post.author_name || 'Admin',
              image_url: post.image_url || 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80'
            }));
            
            setRelatedPosts(formattedRelated);
          }
        } else {
          setError('Blog post not found.');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('An error occurred while fetching the blog post.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [id, navigate]);

  // Format date to a readable format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="container-custom py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
              <div className="h-96 bg-gray-200 rounded mb-8"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout>
        <div className="container-custom py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Blog Post Not Found</h1>
            <p className="text-gray-600 mb-10 text-lg">
              {error || "The blog post you're looking for doesn't exist or has been removed."}
            </p>
            <Button onClick={() => navigate('/blog')}>Back to Blog</Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-custom py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <div className="mb-8">
            <Button variant="ghost" onClick={() => navigate('/blog')} className="flex items-center gap-2 text-gray-600 hover:text-brand-blue">
              <ChevronLeft size={16} />
              <span>Back to Blog</span>
            </Button>
          </div>
          
          {/* Blog post header */}
          <div className="mb-8">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-brand-blue/10 text-brand-blue rounded-full">
                {post.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>
            
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                  {post.author_name?.charAt(0) || 'A'}
                </div>
                <div>
                  <p className="font-medium">{post.author_name || 'Admin'}</p>
                  <p className="text-sm text-gray-500">{formatDate(post.created_at)}</p>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                {post.readTime || '5 min read'}
              </div>
            </div>
          </div>
          
          {/* Featured image */}
          <div className="mb-8">
            <img 
              src={post.image_url} 
              alt={post.title}
              className="w-full h-auto rounded-lg"
            />
          </div>
          
          {/* Blog content */}
          <div className="prose prose-lg max-w-none mb-12">
            {post.content ? (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
              <p>{post.excerpt}</p>
            )}
          </div>
          
          {/* Share buttons */}
          <div className="border-t border-b py-6 mb-12">
            <div className="flex items-center gap-4">
              <span className="font-medium">Share this article:</span>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Facebook size={18} />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Twitter size={18} />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Linkedin size={18} />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Share2 size={18} />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`} className="group">
                    <div className="h-40 mb-4 overflow-hidden rounded-lg">
                      <img 
                        src={relatedPost.image_url} 
                        alt={relatedPost.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                      />
                    </div>
                    <h3 className="font-bold mb-2 group-hover:text-brand-blue transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-gray-500">{formatDate(relatedPost.created_at)}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BlogPost; 