'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TestLoginPage() {
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('admin123456')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  
  const { user, signIn, signOut } = useAuth()

  const handleLogin = async () => {
    setLoading(true)
    setResult(null)
    
    try {
      const { error } = await signIn(email, password)
      setResult({ success: !error, error: error?.message })
    } catch (err) {
      setResult({ success: false, error: err instanceof Error ? err.message : 'Unknown error' })
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await signOut()
    setResult({ success: true, message: 'Logged out' })
  }

  const testServerAuth = async () => {
    try {
      const response = await fetch('/api/debug-auth')
      const data = await response.json()
      setResult({ success: true, serverAuth: data })
    } catch (err) {
      setResult({ success: false, error: err instanceof Error ? err.message : 'Unknown error' })
    }
  }

  const createTestUser = async () => {
    try {
      const response = await fetch('/api/create-test-user', { method: 'POST' })
      const data = await response.json()
      setResult({ success: true, createUser: data })
    } catch (err) {
      setResult({ success: false, error: err instanceof Error ? err.message : 'Unknown error' })
    }
  }

  const testSupabaseConfig = async () => {
    try {
      const response = await fetch('/api/test-supabase')
      const data = await response.json()
      setResult({ success: true, supabaseConfig: data })
    } catch (err) {
      setResult({ success: false, error: err instanceof Error ? err.message : 'Unknown error' })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>Authentication Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin123456"
              />
            </div>

            <div className="space-y-2">
              <Button 
                onClick={handleLogin} 
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
              
              {user && (
                <Button 
                  onClick={handleLogout} 
                  variant="outline"
                  className="w-full"
                >
                  Sign Out
                </Button>
              )}
            </div>

            <div className="space-y-2">
              <Button 
                onClick={testServerAuth} 
                variant="secondary"
                className="w-full"
              >
                Test Server Auth
              </Button>
              
              <Button 
                onClick={createTestUser} 
                variant="outline"
                className="w-full"
              >
                Create Test User
              </Button>
              
              <Button 
                onClick={testSupabaseConfig} 
                variant="outline"
                className="w-full"
              >
                Test Supabase Config
              </Button>
            </div>

            {user && (
              <div className="p-4 bg-green-50 border border-green-200 rounded">
                <h3 className="font-semibold text-green-800">Client Auth Status</h3>
                <p className="text-sm text-green-700">Logged in as: {user.email}</p>
                <p className="text-sm text-green-700">User ID: {user.id}</p>
              </div>
            )}

            {result && (
              <div className={`p-4 border rounded ${
                result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
              }`}>
                <h3 className="font-semibold">Result</h3>
                <pre className="text-sm mt-2 overflow-auto">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 