import { NextResponse } from 'next/server'
import { checkDatabaseConnection } from '@/lib/database'

export async function GET() {
  try {
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