-- Check if blog_posts table exists
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'blog_posts') THEN
    -- Create the blog_posts table if it doesn't exist
    CREATE TABLE public.blog_posts (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      content TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      author_id UUID REFERENCES auth.users(id) NULL,
      status TEXT NOT NULL DEFAULT 'draft',
      image_url TEXT NULL,
      published_at TIMESTAMPTZ NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  ELSE
    -- Check and add missing columns if the table exists
    DO $$ 
    BEGIN
      -- Check if columns exist and add them if they don't
      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'blog_posts' AND column_name = 'author_id') THEN
        ALTER TABLE public.blog_posts ADD COLUMN author_id UUID REFERENCES auth.users(id) NULL;
      END IF;

      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'blog_posts' AND column_name = 'excerpt') THEN
        ALTER TABLE public.blog_posts ADD COLUMN excerpt TEXT NOT NULL DEFAULT '';
      END IF;

      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'blog_posts' AND column_name = 'image_url') THEN
        ALTER TABLE public.blog_posts ADD COLUMN image_url TEXT NULL;
      END IF;

      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'blog_posts' AND column_name = 'published_at') THEN
        ALTER TABLE public.blog_posts ADD COLUMN published_at TIMESTAMPTZ NULL;
      END IF;

      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'blog_posts' AND column_name = 'created_at') THEN
        ALTER TABLE public.blog_posts ADD COLUMN created_at TIMESTAMPTZ NOT NULL DEFAULT now();
      END IF;

      IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'blog_posts' AND column_name = 'updated_at') THEN
        ALTER TABLE public.blog_posts ADD COLUMN updated_at TIMESTAMPTZ NOT NULL DEFAULT now();
      END IF;
      
      -- Check and rename columns if needed (e.g., publishedAt to published_at)
      IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'blog_posts' AND column_name = 'publishedat') THEN
        ALTER TABLE public.blog_posts RENAME COLUMN publishedat TO published_at;
      END IF;
      
      IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'blog_posts' AND column_name = 'createdat') THEN
        ALTER TABLE public.blog_posts RENAME COLUMN createdat TO created_at;
      END IF;
      
      IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'blog_posts' AND column_name = 'updatedat') THEN
        ALTER TABLE public.blog_posts RENAME COLUMN updatedat TO updated_at;
      END IF;
      
      IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'blog_posts' AND column_name = 'imageurl') THEN
        ALTER TABLE public.blog_posts RENAME COLUMN imageurl TO image_url;
      END IF;
      
      IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'blog_posts' AND column_name = 'authorid') THEN
        ALTER TABLE public.blog_posts RENAME COLUMN authorid TO author_id;
      END IF;
    END $$;
  END IF;
END $$; 