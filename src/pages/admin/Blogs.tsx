import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, RefreshCw } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author_id: string; 
  author_name?: string;
  published_at: string;
  status: 'draft' | 'published';
  image_url?: string;
  created_at?: string;
  updated_at?: string;
  category?: string;
}

const createTestBlogPost = async () => {
  try {
    const now = new Date().toISOString();
    // Direct insert approach - bare minimum fields
    const { error } = await supabase
      .from('blog_posts')
      .insert({
        title: 'Test Blog Post ' + Date.now(),
        slug: 'test-blog-post-' + Date.now(),
        content: 'This is a test blog post content.',
        excerpt: 'This is a test excerpt.',
        status: 'draft',
        category: 'Test Category',
        author_id: 'admin',
        created_at: now,
        updated_at: now
      });
      
    if (error) {
      console.error('Error creating test blog post:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Exception creating test blog post:', error);
    return false;
  }
};

// Function to create a blog post through direct API call
const createBlogPostDirect = async (blogData: {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  status: string;
  category?: string;
  image_url?: string | null;
  author_id?: string;
  published_at?: string | null;
  created_at: string;
  updated_at: string;
}) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_SUPABASE_URL || 'https://tdyyeygvfojnebppxyug.supabase.co'}/rest/v1/blog_posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkeXlleWd2Zm9qbmVicHB4eXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4MTUzOTMsImV4cCI6MjA2MzM5MTM5M30.yxmHcp5mAyHj5lGbCBN7mBrnVPcfHDkSJvd4-G3EoD4',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(blogData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create blog post: ${response.status} ${errorText}`);
    }

    return true;
  } catch (error) {
    console.error('Error in direct API call:', error);
    throw error;
  }
};

const Blogs = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  const [postForm, setPostForm] = useState<Omit<BlogPost, 'id' | 'published_at' | 'created_at' | 'updated_at'>>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    author_id: localStorage.getItem('adminUser') || '',
    status: 'draft',
    image_url: '',
    category: 'Uncategorized',
  });

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    setLoading(true);
    try {
      // Simplify the query first to debug the issue
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Blog posts data:', data); // Add logging to check the response
      
      if (data) {
        // Transform the data safely
        const transformedPosts = data.map(post => ({
          ...post,
          author_name: 'Admin' // Default author name for now
        }));
        
        setPosts(transformedPosts);
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      toast.error('Failed to load blog posts: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDialogOpen(false);
    setLoading(true);

    try {
      // MINIMAL APPROACH: Use the simplest possible method to create/update a blog post
      console.log('Saving blog post with minimal approach...');
      
      const now = new Date().toISOString();
      
      if (editingPost) {
        // Update existing post with minimal fields
        const { error } = await supabase
          .from('blog_posts')
          .update({
            title: postForm.title,
            slug: postForm.slug,
            content: postForm.content,
            excerpt: postForm.excerpt,
            updated_at: now
          })
          .eq('id', editingPost.id);
        
        if (error) {
          console.error('Error updating blog post:', error);
          throw error;
        }
        
        toast.success('Blog post updated successfully!');
      } else {
        // Create new post with minimal required fields
        const { error } = await supabase
          .from('blog_posts')
          .insert({
            title: postForm.title,
            slug: postForm.slug,
            content: postForm.content,
            excerpt: postForm.excerpt,
            status: 'draft',
            created_at: now,
            updated_at: now
          });
        
        if (error) {
          console.error('Error creating blog post:', error);
          throw error;
        }
        
        toast.success('Blog post created successfully!');
      }

      // Reset form
      setPostForm({
        title: '',
        slug: '',
        content: '',
        excerpt: '',
        author_id: localStorage.getItem('adminUser') || '',
        status: 'draft',
        image_url: '',
        category: 'Uncategorized',
      });
      setEditingPost(null);
      
      // Refresh blog posts
      fetchBlogPosts();
    } catch (error) {
      console.error('Error saving blog post:', error);
      toast.error('Failed to save blog post: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setPostForm({
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt,
      author_id: post.author_id,
      status: post.status,
      image_url: post.image_url || '',
      category: post.category || 'Uncategorized',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (postId: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      setLoading(true);
      try {
        const { error } = await supabase
          .from('blog_posts')
          .delete()
          .eq('id', postId);
        
        if (error) throw error;
        
        toast.success('Blog post deleted successfully!');
        
        // Refresh blog posts
        fetchBlogPosts();
      } catch (error) {
        console.error('Error deleting blog post:', error);
        toast.error('Failed to delete blog post');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setPostForm({ ...postForm, title, slug });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const renderDebugControls = () => {
    return (
      <div className="mt-6 border-t pt-4">
        <h3 className="text-lg font-medium mb-2">Debug Controls</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={async () => {
              const success = await createTestBlogPost();
              if (success) {
                toast.success('Test blog post created!');
                fetchBlogPosts();
              } else {
                toast.error('Failed to create test blog post');
              }
            }}
          >
            Create Test Post
          </Button>
          
          <Button
            variant="outline"
            onClick={async () => {
              try {
                // Check if table exists
                const { data, error } = await supabase
                  .from('blog_posts')
                  .select('id')
                  .limit(1);
                
                console.log('Blog posts table check:', { data, error });
                
                if (error) {
                  toast.error('Table check failed: ' + error.message);
                } else {
                  toast.success('Table check successful');
                }
              } catch (error) {
                console.error('Error checking table:', error);
                toast.error('Error checking table');
              }
            }}
          >
            Check Table
          </Button>
          
          <Button
            variant="outline"
            className="bg-red-100 hover:bg-red-200"
            onClick={async () => {
              try {
                const now = new Date().toISOString();
                // Try raw SQL insert
                const { data, error } = await supabase.rpc('create_blog_post', {
                  title_param: 'Direct SQL Test Post ' + Date.now(),
                  slug_param: 'direct-sql-test-' + Date.now(),
                  content_param: 'This is a direct SQL test.',
                  excerpt_param: 'Direct SQL excerpt',
                  status_param: 'draft',
                  category_param: 'SQL Test',
                  author_id_param: 'admin',
                  created_at_param: now
                });
                
                if (error) {
                  console.error('Direct SQL insert error:', error);
                  toast.error('Direct SQL insert failed: ' + error.message);
                } else {
                  console.log('Direct SQL insert result:', data);
                  toast.success('Direct SQL insert successful!');
                  fetchBlogPosts();
                }
              } catch (error) {
                console.error('Exception in direct SQL insert:', error);
                toast.error('Exception in direct SQL insert');
              }
            }}
          >
            Direct SQL Insert
          </Button>
          
          <Button
            variant="outline"
            className="bg-purple-100 hover:bg-purple-200"
            onClick={async () => {
              try {
                // Simplest possible approach - raw SQL query
                const { data, error } = await supabase.from('blog_posts').insert({
                  title: 'Super Simple Test ' + Date.now(),
                  slug: 'super-simple-test-' + Date.now(),
                  content: 'This is a super simple test.',
                  excerpt: 'Super simple excerpt',
                  status: 'draft',
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString()
                });
                
                if (error) {
                  console.error('Super simple insert error:', error);
                  toast.error('Super simple insert failed: ' + error.message);
                } else {
                  console.log('Super simple insert result:', data);
                  toast.success('Super simple insert successful!');
                  fetchBlogPosts();
                }
              } catch (error) {
                console.error('Exception in super simple insert:', error);
                toast.error('Exception in super simple insert');
              }
            }}
          >
            Super Simple Insert
          </Button>
          
          <Button
            variant="outline"
            className="bg-orange-100 hover:bg-orange-200"
            onClick={() => {
              console.log('Current posts state:', posts);
              toast.info('Current posts logged to console');
            }}
          >
            Log Posts State
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchBlogPosts} disabled={loading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingPost ? 'Edit Blog Post' : 'Add New Blog Post'}
                </DialogTitle>
                <DialogDescription>
                  Fill in the details to {editingPost ? 'update the' : 'create a new'} blog post.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={postForm.title}
                    onChange={handleTitleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={postForm.slug}
                    onChange={(e) =>
                      setPostForm({ ...postForm, slug: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={postForm.excerpt}
                    onChange={(e) =>
                      setPostForm({ ...postForm, excerpt: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={postForm.content}
                    onChange={(e) =>
                      setPostForm({ ...postForm, content: e.target.value })
                    }
                    className="min-h-[300px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={postForm.status}
                    onChange={(e) =>
                      setPostForm({
                        ...postForm,
                        status: e.target.value as 'draft' | 'published',
                      })
                    }
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={postForm.category}
                    onChange={(e) =>
                      setPostForm({ ...postForm, category: e.target.value })
                    }
                    placeholder="e.g. Social Media, Marketing, Tips"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image_url">Featured Image URL</Label>
                  <Input
                    id="image_url"
                    value={postForm.image_url}
                    onChange={(e) =>
                      setPostForm({ ...postForm, image_url: e.target.value })
                    }
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <Button type="submit" className="w-full">
                  {editingPost ? 'Update Post' : 'Add Post'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-400" />
            <p>Loading blog posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">No blog posts found. Create your first post.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div>{post.title}</div>
                      <div className="text-sm text-gray-500">/blog/{post.slug}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        post.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {post.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {post.category || 'Uncategorized'}
                  </TableCell>
                  <TableCell>
                    {post.published_at ? formatDate(post.published_at) : 'Not published'}
                  </TableCell>
                  <TableCell>{post.author_name}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(post)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(post.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {renderDebugControls()}
    </div>
  );
};

export default Blogs; 