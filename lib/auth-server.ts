import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function getServerUser() {
  const cookieStore = await cookies()
  
  console.log('🔍 Server Auth - Available cookies:', cookieStore.getAll().map(c => c.name))
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )

  // Try to get the user directly first
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  if (userError) {
    console.log('🔍 Server Auth - User error:', userError.message)
  }
  
  if (user) {
    console.log('🔍 Server Auth - User found directly:', { 
      hasUser: !!user, 
      userEmail: user?.email 
    })
    return { user, error: null }
  }

  // If no user, try to get session
  const { data: { session }, error: sessionError } = await supabase.auth.getSession()
  
  if (sessionError) {
    console.log('🔍 Server Auth - Session error:', sessionError.message)
  }
  
  if (!session) {
    console.log('🔍 Server Auth - No session found')
    return { user: null, error: new Error('No session found') }
  }

  console.log('🔍 Server Auth - Session found, user:', { 
    hasUser: !!session.user, 
    userEmail: session.user?.email 
  })
  
  return { user: session.user, error: null }
} 