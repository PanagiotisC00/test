# Next.js 15 + Prisma + Supabase Blog Platform

A modern blog platform built with Next.js 15, Prisma ORM, and Supabase for the backend.

## Features

- **Next.js 15** with App Router
- **Prisma ORM** for type-safe database operations
- **Supabase** for PostgreSQL database and real-time features
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Server Actions** for form handling
- **Real-time updates** with Supabase subscriptions

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Prisma ORM, Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (ready for integration)
- **Real-time**: Supabase Realtime

## Quick Start

### 1. Environment Setup

Create a `.env` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Database Configuration (include pgbouncer parameters)
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres?pgbouncer=true&connect_timeout=10
DIRECT_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres?pgbouncer=true&connect_timeout=10

# Optional: Service Role Key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 2. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed the database
npm run db:seed
```

### 3. Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### 4. Database Management

```bash
# Open Prisma Studio
npm run db:studio

# Reset database (careful!)
npx prisma db push --force-reset
```

## Project Structure

```
├── app/
│   ├── actions/          # Server actions
│   ├── api/             # API routes
│   ├── blogs/           # Blog pages
│   └── admin/           # Admin pages
├── components/          # React components
├── lib/
│   ├── database.ts      # Database utilities
│   ├── prisma.ts        # Prisma client
│   └── supabase.ts      # Supabase client
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Database seeding
└── scripts/
    └── seed.sql         # SQL seed file (legacy)
```

## Database Schema

### User Model
- `id`: Primary key
- `email`: Unique email address
- `name`: User's display name
- `posts`: Related blog posts
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

### Post Model
- `id`: Primary key
- `title`: Post title
- `content`: Post content
- `published`: Publication status
- `authorId`: Foreign key to User
- `author`: Related user
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## API Endpoints

### Health Check
- `GET /api/health` - Database connection status

### Server Actions
- `createPost` - Create a new blog post
- `getAllPosts` - Get all posts with authors
- `getPublishedPostsAction` - Get only published posts
- `updatePost` - Update an existing post
- `deletePost` - Delete a post

## Database Utilities

The `lib/database.ts` file provides:

- **Prisma Client**: Type-safe database operations
- **Supabase Clients**: Both client-side and server-side
- **Utility Functions**: Common database queries
- **Health Check**: Database connection verification

## Supabase Integration

### Features Available
- **PostgreSQL Database**: Full SQL database
- **Real-time Subscriptions**: Live updates
- **Authentication**: User management (ready for integration)
- **Storage**: File uploads (ready for integration)
- **Edge Functions**: Serverless functions (ready for integration)

### Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Public API key
- `SUPABASE_SERVICE_ROLE_KEY`: Admin API key (server-side only)

## Development Commands

```bash
# Database
npm run db:generate    # Generate Prisma client
npm run db:push        # Push schema changes
npm run db:seed        # Seed database
npm run db:studio      # Open Prisma Studio

# Development
npm run dev            # Start development server
npm run build          # Build for production
npm run start          # Start production server
npm run lint           # Run ESLint
```

## Next Steps

1. **Authentication**: Integrate Supabase Auth
2. **Real-time**: Add live updates for posts
3. **File Uploads**: Add image uploads with Supabase Storage
4. **Comments**: Add comment system
5. **Categories**: Add post categories and tags
6. **Search**: Implement full-text search
7. **Pagination**: Add pagination for posts
8. **SEO**: Add meta tags and sitemap

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check your `DATABASE_URL` in `.env`
   - Verify Supabase project is active
   - Run `npm run db:generate` to regenerate client

2. **Prisma Schema Issues**
   - Run `npx prisma format` to format schema
   - Run `npx prisma validate` to check for errors

3. **Environment Variables**
   - Ensure all required variables are set in `.env`
   - Restart development server after changes

### Health Check

Visit `/api/health` to check database connection status.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details. 