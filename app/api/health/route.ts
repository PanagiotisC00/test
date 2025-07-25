import { NextResponse } from 'next/server'
import { checkDatabaseConnection } from '@/lib/database'

export async function GET() {
  try {
    // Skip database check during build time
    if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
      return NextResponse.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        database: { status: 'skipped', reason: 'build-time' },
        environment: process.env.NODE_ENV,
      })
    }

    const dbStatus = await checkDatabaseConnection()
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: dbStatus,
      environment: process.env.NODE_ENV,
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
} 