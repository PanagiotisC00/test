"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { createPost } from "@/app/actions/posts"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useAuth } from "@/lib/auth"
import { EnvCheck } from "@/components/auth/env-check"

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { user, signOut } = useAuth()

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)

    try {
      const result = await createPost(formData)

      if (result.success) {
        toast({
          title: "Success!",
          description: "Blog post created successfully.",
        })
        // Reset form
        const form = document.getElementById("blog-form") as HTMLFormElement
        form?.reset()
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to create blog post.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
            <p className="text-gray-600">Create and manage blog posts</p>
            <div className="mt-4 flex items-center justify-center gap-4">
              <p className="text-sm text-gray-500">Signed in as: {user?.email}</p>
              <Button variant="outline" size="sm" onClick={signOut}>
                Sign Out
              </Button>
            </div>
          </div>

        <EnvCheck />
        
        <Card>
          <CardHeader>
            <CardTitle>Create New Blog Post</CardTitle>
            <CardDescription>Fill out the form below to publish a new blog post</CardDescription>
          </CardHeader>
          <CardContent>
            <form id="blog-form" action={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" placeholder="Enter blog post title" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  placeholder="Write your blog post content here..."
                  rows={8}
                  required
                />
              </div>



              <div className="flex items-center space-x-2">
                <Switch id="published" name="published" />
                <Label htmlFor="published">Publish immediately</Label>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Blog Post"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </div>
    </ProtectedRoute>
  )
}
