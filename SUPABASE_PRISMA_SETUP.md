# Prisma + Supabase Integration Guide

## Environment Variables Setup

Create a `.env` file in your project root with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Database Configuration (for Prisma)
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres?pgbouncer=true&connect_timeout=10
DIRECT_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres?pgbouncer=true&connect_timeout=10

# Optional: Supabase Service Role Key (for server-side operations)
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## Getting Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy the following values:
   - **Project URL**: Use this for `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key**: Use this for `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key**: Use this for `SUPABASE_SERVICE_ROLE_KEY` (server-side only)

## Database URL Format

For the `DATABASE_URL` and `DIRECT_URL`, use this format:
```
postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres?pgbouncer=true&connect_timeout=10
```

**Important**: The `?pgbouncer=true&connect_timeout=10` parameters are required for Supabase's connection pooling.

You can find this in your Supabase dashboard under Settings > Database.

## Database Setup Commands

After setting up your environment variables, run these commands:

```bash
# Generate Prisma client
npx prisma generate

# Push the schema to your Supabase database
npx prisma db push

# Seed the database (optional)
npx prisma db seed
```

## Current Integration Status

✅ Prisma schema configured for PostgreSQL
✅ Supabase client configured
✅ Server actions using Prisma
✅ Database seeding script ready

## Next Steps

1. Set up your environment variables
2. Run the database setup commands
3. Test the integration with your existing blog functionality 