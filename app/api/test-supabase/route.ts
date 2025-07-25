import { NextResponse } from 'next/server'

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  return NextResponse.json({
    hasSupabaseUrl: !!supabaseUrl,
    hasSupabaseAnonKey: !!supabaseAnonKey,
    hasSupabaseServiceKey: !!supabaseServiceKey,
    supabaseUrl: supabaseUrl ? `${supabaseUrl.substring(0, 20)}...` : null,
    timestamp: new Date().toISOString()
  })
} 