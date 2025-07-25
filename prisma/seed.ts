import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create sample blog posts with mock Supabase Auth user IDs
  const posts = await Promise.all([
    prisma.post.create({
      data: {
        title: 'Welcome to Our Blog Platform',
        content: 'This is our first blog post! We\'re excited to share our thoughts and insights with you. This platform is built with Next.js 15, Supabase, and Prisma ORM for a modern, scalable blogging experience.',
        published: true,
        authorId: 'mock-user-1',
        authorEmail: 'admin@example.com',
      },
    }),
    prisma.post.create({
      data: {
        title: 'Getting Started with Next.js 15',
        content: 'Next.js 15 brings exciting new features including improved App Router, better performance, and enhanced developer experience. In this post, we explore the key features and how to get started.',
        published: true,
        authorId: 'mock-user-2',
        authorEmail: 'admin@example.com',
      },
    }),
    prisma.post.create({
      data: {
        title: 'Why We Choose Supabase',
        content: 'Supabase provides an excellent backend-as-a-service solution with PostgreSQL, real-time subscriptions, and built-in authentication. Here\'s why we love using it for our projects.',
        published: false,
        authorId: 'mock-user-1',
        authorEmail: 'admin@example.com',
      },
    }),
  ])

  console.log('✅ Posts created:', posts.map(p => p.title))
  console.log('🎉 Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 