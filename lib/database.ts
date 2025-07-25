import { PrismaClient } from '@prisma/client'
import { createClient } from '@supabase/supabase-js'

// Prisma client instance
const globalForPrisma = global as unknown as {
  prisma: PrismaClient
}

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Supabase client instances
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Client-side Supabase client (for browser use)
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      persistSession: true,
      storage: {
        getItem: (key) => {
          if (typeof window === 'undefined') return null
          return window.localStorage.getItem(key)
        },
        setItem: (key, value) => {
          if (typeof window === 'undefined') return
          window.localStorage.setItem(key, value)
        },
        removeItem: (key) => {
          if (typeof window === 'undefined') return
          window.localStorage.removeItem(key)
        },
      },
    }
  }
)

// Server-side Supabase client (for server actions)
export const supabaseAdmin = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseServiceKey || 'placeholder-service-key',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

// Database utility functions
export async function getPostsWithAuthors() {
  return await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      published: true,
      authorId: true,
      authorEmail: true,
      createdAt: true,
      updatedAt: true,
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
    select: {
      id: true,
      title: true,
      content: true,
      authorId: true,
      authorEmail: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export async function getPostsByUser(authorId: string) {
  return await prisma.post.findMany({
    where: {
      authorId: authorId,
    },
    select: {
      id: true,
      title: true,
      content: true,
      published: true,
      authorId: true,
      authorEmail: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

// Health check function
export async function checkDatabaseConnection() {
  try {
    // Check if Prisma client is available
    if (!prisma) {
      return { status: 'error', error: 'Prisma client not available' }
    }
    
    await prisma.$queryRaw`SELECT 1`
    return { status: 'connected', timestamp: new Date().toISOString() }
  } catch (error) {
    return { status: 'error', error: error instanceof Error ? error.message : 'Unknown error' }
  }
} 