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
import { v4 as uuidv4 } from 'uuid';

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
}

const createTestBlogPost = async () => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert({
        title: 'Test Blog Post',
        slug: 'test-blog-post-' + Date.now(),
        content: 'This is a test blog post content.',
        excerpt: 'This is a test excerpt.',
        status: 'draft',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select();
      
    if (error) {
      console.error('Error creating test blog post:', error);
      return false;
    }
    
    console.log('Test blog post created:', data);
    return true;
  } catch (error) {
    console.error('Exception creating test blog post:', error);
    return false;
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
      const now = new Date().toISOString();
      const postData = {
        title: postForm.title,
        slug: postForm.slug,
        content: postForm.content,
        excerpt: postForm.excerpt,
        status: postForm.status,
        image_url: postForm.image_url || null,
        updated_at: now
      };
      
      if (editingPost) {
        // Update existing post
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', editingPost.id);
        
        if (error) {
          console.error('Error updating blog post:', error);
          throw error;
        }
        
        toast.success('Blog post updated successfully!');
      } else {
        // Add new post
        const newPostId = uuidv4();
        
        const { error } = await supabase
          .from('blog_posts')
          .insert({
            ...postData,
            id: newPostId,
            published_at: postForm.status === 'published' ? now : null,
            created_at: now,
          });
        
        if (error) {
          console.error('Error creating blog post:', error);
          throw error;
        }
        
        toast.success('Blog post added successfully!');
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