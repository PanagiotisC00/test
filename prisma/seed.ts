import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create initial users
  const john = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      email: 'john@example.com',
      name: 'John Doe',
    },
  })

  const jane = await prisma.user.upsert({
    where: { email: 'jane@example.com' },
    update: {},
    create: {
      email: 'jane@example.com',
      name: 'Jane Smith',
    },
  })

  console.log('✅ Users created:', { john: john.name, jane: jane.name })

  // Create sample blog posts
  const posts = await Promise.all([
    prisma.post.upsert({
      where: { 
        title_authorId: { 
          title: 'Welcome to Our Blog Platform',
          authorId: john.id 
        }
      },
      update: {},
      create: {
        title: 'Welcome to Our Blog Platform',
        content: 'This is our first blog post! We\'re excited to share our thoughts and insights with you. This platform is built with Next.js 15, Supabase, and Prisma ORM for a modern, scalable blogging experience.',
        published: true,
        authorId: john.id,
      },
    }),
    prisma.post.upsert({
      where: { 
        title_authorId: { 
          title: 'Getting Started with Next.js 15',
          authorId: jane.id 
        }
      },
      update: {},
      create: {
        title: 'Getting Started with Next.js 15',
        content: 'Next.js 15 brings exciting new features including improved App Router, better performance, and enhanced developer experience. In this post, we explore the key features and how to get started.',
        published: true,
        authorId: jane.id,
      },
    }),
    prisma.post.upsert({
      where: { 
        title_authorId: { 
          title: 'Why We Choose Supabase',
          authorId: john.id 
        }
      },
      update: {},
      create: {
        title: 'Why We Choose Supabase',
        content: 'Supabase provides an excellent backend-as-a-service solution with PostgreSQL, real-time subscriptions, and built-in authentication. Here\'s why we love using it for our projects.',
        published: false,
        authorId: john.id,
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