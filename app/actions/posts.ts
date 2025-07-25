"use server"

import { prisma, getPostsWithAuthors, getPublishedPosts } from "@/lib/database"
import { revalidatePath } from "next/cache"

export async function createPost(formData: FormData) {
  try {
    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const authorName = formData.get("author") as string
    const published = formData.get("published") === "on"

    if (!title || !content || !authorName) {
      return { success: false, error: "All fields are required" }
    }

    // Find or create author
    let author = await prisma.user.findFirst({
      where: { name: authorName },
    })

    if (!author) {
      author = await prisma.user.create({
        data: {
          name: authorName,
          email: `${authorName.toLowerCase().replace(/\s+/g, ".")}@example.com`,
        },
      })
    }

    // Create the post
    await prisma.post.create({
      data: {
        title,
        content,
        published,
        authorId: author.id,
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
    const updatedPost = await prisma.post.update({
      where: { id },
      data,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
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
