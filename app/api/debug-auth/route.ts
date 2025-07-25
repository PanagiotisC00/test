import { NextResponse } from 'next/server'
import { getServerUser } from '@/lib/auth-server'

export async function GET() {
  try {
    const { user, error } = await getServerUser()
    
    return NextResponse.json({
      success: true,
      user: user ? {
        id: user.id,
        email: user.email,
        created_at: user.created_at
      } : null,
      error: error?.message || null,
      hasUser: !!user,
      timestamp: new Date().toISOString()
    })
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
} 