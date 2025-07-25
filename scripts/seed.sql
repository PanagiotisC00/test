-- Create some initial users
INSERT INTO "User" (email, name, "createdAt", "updatedAt") VALUES
('john@example.com', 'John Doe', NOW(), NOW()),
('jane@example.com', 'Jane Smith', NOW(), NOW())
ON CONFLICT (email) DO NOTHING;

-- Create some sample blog posts
INSERT INTO "Post" (title, content, published, "authorId", "createdAt", "updatedAt")
SELECT 
  'Welcome to Our Blog Platform',
  'This is our first blog post! We''re excited to share our thoughts and insights with you. This platform is built with Next.js 15, Supabase, and Prisma ORM for a modern, scalable blogging experience.',
  true,
  u.id,
  NOW(),
  NOW()
FROM "User" u WHERE u.email = 'john@example.com'
ON CONFLICT DO NOTHING;

INSERT INTO "Post" (title, content, published, "authorId", "createdAt", "updatedAt")
SELECT 
  'Getting Started with Next.js 15',
  'Next.js 15 brings exciting new features including improved App Router, better performance, and enhanced developer experience. In this post, we explore the key features and how to get started.',
  true,
  u.id,
  NOW(),
  NOW()
FROM "User" u WHERE u.email = 'jane@example.com'
ON CONFLICT DO NOTHING;

INSERT INTO "Post" (title, content, published, "authorId", "createdAt", "updatedAt")
SELECT 
  'Why We Choose Supabase',
  'Supabase provides an excellent backend-as-a-service solution with PostgreSQL, real-time subscriptions, and built-in authentication. Here''s why we love using it for our projects.',
  false,
  u.id,
  NOW(),
  NOW()
FROM "User" u WHERE u.email = 'john@example.com'
ON CONFLICT DO NOTHING;
