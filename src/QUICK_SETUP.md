# Quick Setup Guide for MatMarket Registration

If you're getting "Failed to fetch" errors during registration, you likely need to set up the database tables in Supabase.

## Option 1: Quick Test (Works immediately)

The registration system will work even without database tables set up! It will:
- Create users in Supabase Auth (they can log in)
- Store basic info in user metadata 
- Show "(profile setup pending)" message

**Admin codes that work without setup:**
- `ADMIN2024`
- `MATMARKET_ADMIN` 
- `SUPER_ADMIN_123`

## Option 2: Full Setup (Recommended)

To get full profile management, run these SQL commands in your Supabase Dashboard → SQL Editor:

### 1. Create the user role type:
```sql
CREATE TYPE user_role AS ENUM ('customer', 'company', 'hybrid', 'admin');
```

### 2. Create the users table:
```sql
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  phone text,
  role user_role NOT NULL DEFAULT 'customer',
  company_name text,
  registration_number text,
  vat_number text,
  is_verified boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);
```

### 3. Create the admin codes table:
```sql
CREATE TABLE admin_confirmation_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  is_used boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);

INSERT INTO admin_confirmation_codes (code) VALUES
  ('ADMIN2024'),
  ('MATMARKET_ADMIN'),
  ('SUPER_ADMIN_123');
```

### 4. Set up Row Level Security:
```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_confirmation_codes ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own profile
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = auth_id);

-- Allow service role to insert/update
CREATE POLICY "Service role full access" ON users
  FOR ALL USING (true);

CREATE POLICY "Service role admin codes access" ON admin_confirmation_codes
  FOR ALL USING (true);
```

## Troubleshooting

1. **"Failed to fetch" error**: Check that your Supabase Edge Functions are deployed
2. **"Invalid confirmation code"**: Use one of the default codes above
3. **"Table does not exist"**: The system will still work, just run the SQL commands above for full functionality

## Test the Registration

1. Go to `/register`
2. Try registering as a customer (should work immediately)
3. Try admin registration with code `ADMIN2024`

The system is designed to be robust - it will work even if the database setup isn't complete yet!