import { PrismaClient } from '@prisma/client'
import { createClient } from '@supabase/supabase-js'

// Prisma client instance
const globalForPrisma = global as unknown as {
  prisma: PrismaClient
}

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Supabase client instances
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client-side Supabase client (for browser use)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side Supabase client (for server actions)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Database utility functions
export async function getPostsWithAuthors() {
  return await prisma.post.findMany({
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export async function getPublishedPosts() {
  return await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export async function getUserById(id: number) {
  return await prisma.user.findUnique({
    where: { id },
    include: {
      posts: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })
}

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
    include: {
      posts: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })
}

// Health check function
export async function checkDatabaseConnection() {
  try {
    await prisma.$queryRaw`SELECT 1`
    return { status: 'connected', timestamp: new Date().toISOString() }
  } catch (error) {
    return { status: 'error', error: error instanceof Error ? error.message : 'Unknown error' }
  }
} 