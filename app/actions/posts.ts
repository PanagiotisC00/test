"use server"

import { prisma, getPostsWithAuthors, getPublishedPosts } from "@/lib/database"
import { getServerUser } from "@/lib/auth-server"
import { revalidatePath } from "next/cache"

export async function createPost(formData: FormData) {
  try {
    // Get current authenticated user
    const { user, error: authError } = await getServerUser()
    
    console.log('🔍 Debug - Auth check:', { 
      hasUser: !!user, 
      userEmail: user?.email, 
      error: authError?.message 
    })
    
    if (authError || !user) {
      console.log('❌ Auth failed:', authError?.message || 'No user found')
      return { success: false, error: "Authentication required" }
    }

    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const published = formData.get("published") === "on"

    if (!title || !content) {
      return { success: false, error: "Title and content are required" }
    }

    // Create the post with authenticated user info
    await prisma.post.create({
      data: {
        title,
        content,
        published,
        authorId: user.id,
        authorEmail: user.email || 'unknown@example.com',
      },
    })

    revalidatePath("/blogs")
    return { success: true }
  } catch (error) {
    console.error("Error creating post:", error)
    return { success: false, error: "Failed to create post" }
  }
}

export async function getAllPosts() {
  try {
    return await getPostsWithAuthors()
  } catch (error) {
    console.error("Error fetching posts:", error)
    return []
  }
}

export async function getPublishedPostsAction() {
  try {
    return await getPublishedPosts()
  } catch (error) {
    console.error("Error fetching published posts:", error)
    return []
  }
}

export async function updatePost(id: number, data: { title?: string; content?: string; published?: boolean }) {
  try {
    // Get current authenticated user
    const { user, error: authError } = await getServerUser()
    
    if (authError || !user) {
      return { success: false, error: "Authentication required" }
    }

    // Check if user owns the post
    const existingPost = await prisma.post.findUnique({
      where: { id }
    })

    if (!existingPost || existingPost.authorId !== user.id) {
      return { success: false, error: "Not authorized to edit this post" }
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data,
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
    })

    revalidatePath("/blogs")
    return { success: true, post: updatedPost }
  } catch (error) {
    console.error("Error updating post:", error)
    return { success: false, error: "Failed to update post" }
  }
}

export async function deletePost(id: number) {
  try {
    // Get current authenticated user
    const { user, error: authError } = await getServerUser()
    
    if (authError || !user) {
      return { success: false, error: "Authentication required" }
    }

    // Check if user owns the post
    const existingPost = await prisma.post.findUnique({
      where: { id }
    })

    if (!existingPost || existingPost.authorId !== user.id) {
      return { success: false, error: "Not authorized to delete this post" }
    }

    await prisma.post.delete({
      where: { id },
    })

    revalidatePath("/blogs")
    return { success: true }
  } catch (error) {
    console.error("Error deleting post:", error)
    return { success: false, error: "Failed to delete post" }
  }
}
