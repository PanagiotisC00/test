-- Remove User table and update Post table
-- Run this in your Supabase SQL editor

-- First, drop the foreign key constraint
ALTER TABLE "Post" DROP CONSTRAINT IF EXISTS "Post_authorId_fkey";

-- Drop the User table
DROP TABLE IF EXISTS "User";

-- Update Post table to use String for authorId
ALTER TABLE "Post" ALTER COLUMN "authorId" TYPE TEXT;

-- Add authorEmail column
ALTER TABLE "Post" ADD COLUMN IF NOT EXISTS "authorEmail" TEXT;

-- Remove the unique constraint that references the old User table
ALTER TABLE "Post" DROP CONSTRAINT IF EXISTS "Post_title_authorId_key";

-- Add new unique constraint for title and authorId
ALTER TABLE "Post" ADD CONSTRAINT "Post_title_authorId_key" UNIQUE ("title", "authorId"); 