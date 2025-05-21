-- Function to create a blog post directly
CREATE OR REPLACE FUNCTION create_blog_post(
  title_param TEXT,
  slug_param TEXT,
  content_param TEXT,
  excerpt_param TEXT,
  status_param TEXT DEFAULT 'draft',
  category_param TEXT DEFAULT 'Uncategorized',
  author_id_param TEXT DEFAULT 'admin',
  created_at_param TIMESTAMPTZ DEFAULT now()
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_post_id UUID;
  result JSONB;
BEGIN
  -- Insert the blog post
  INSERT INTO blog_posts (
    title,
    slug,
    content,
    excerpt,
    status,
    category,
    author_id,
    created_at,
    updated_at,
    published_at
  ) VALUES (
    title_param,
    slug_param,
    content_param,
    excerpt_param,
    status_param,
    category_param,
    author_id_param,
    created_at_param,
    created_at_param,
    CASE WHEN status_param = 'published' THEN created_at_param ELSE NULL END
  )
  RETURNING id INTO new_post_id;
  
  -- Return the result
  SELECT jsonb_build_object(
    'success', TRUE,
    'post_id', new_post_id
  ) INTO result;
  
  RETURN result;
EXCEPTION WHEN OTHERS THEN
  RETURN jsonb_build_object(
    'success', FALSE,
    'error', SQLERRM
  );
END;
$$; 