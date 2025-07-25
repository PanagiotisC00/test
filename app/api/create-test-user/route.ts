import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/database'

export async function POST() {
  try {
    // Create a test user
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: 'admin@example.com',
      password: 'admin123456',
      email_confirm: true,
    })

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message
      }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email
      },
      message: 'Test user created successfully'
    })
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 })
  }
} 