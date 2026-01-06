# Database Setup Guide for Supabase

## Required Tables

### 1. Users Table
For storing user profile information

```sql
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  age INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for email lookup
CREATE INDEX idx_users_email ON public.users(email);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can read their own data
CREATE POLICY "Users can read own data"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

-- RLS Policy: Users can update their own data
CREATE POLICY "Users can update own data"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policy: Allow insert during signup
CREATE POLICY "Allow insert on signup"
  ON public.users FOR INSERT
  WITH CHECK (auth.uid() = id);
```

### 2. Items Table
For storing user-added data with auto-sync to GitHub

```sql
CREATE TABLE public.items (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for user_id lookup
CREATE INDEX idx_items_user_id ON public.items(user_id);

-- Enable RLS
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only see their own items
CREATE POLICY "Users can read own items"
  ON public.items FOR SELECT
  USING (auth.uid() = user_id);

-- RLS Policy: Users can insert their own items
CREATE POLICY "Users can insert own items"
  ON public.items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policy: Users can update their own items
CREATE POLICY "Users can update own items"
  ON public.items FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policy: Users can delete their own items
CREATE POLICY "Users can delete own items"
  ON public.items FOR DELETE
  USING (auth.uid() = user_id);
```

## How to Create Tables

### Option 1: Supabase Dashboard (Recommended)
1. Go to your Supabase project dashboard
2. Click "SQL Editor" in the left sidebar
3. Create a new query
4. Copy and paste the SQL above
5. Run the query

### Option 2: Supabase CLI
```bash
supabase db push
```

## Testing
Run the Flutter app and use the "Test Supabase API" screen to:
1. Create new users with email, name, password, and age
2. Verify data is saved to the database
3. Retrieve all users
4. Test the admin sign-in (admin@example.com / Admin)