# MatMarket Supabase Database Setup Instructions

This document provides step-by-step instructions for setting up the MatMarket database schema in your Supabase project.

## Required Setup Steps

You need to execute these SQL commands in your Supabase Dashboard → SQL Editor to set up the database:

### 1. Create User Role Enum

```sql
CREATE TYPE user_role AS ENUM ('customer', 'company', 'hybrid', 'admin');
```

### 2. Create Users Table

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

-- Create indexes for better performance
CREATE INDEX idx_users_auth_id ON users(auth_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

### 3. Create Admin Confirmation Codes Table

```sql
CREATE TABLE admin_confirmation_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  is_used boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX idx_admin_codes_code ON admin_confirmation_codes(code);
CREATE INDEX idx_admin_codes_is_used ON admin_confirmation_codes(is_used);
```

### 4. Insert Default Admin Confirmation Codes

```sql
INSERT INTO admin_confirmation_codes (code) VALUES
  ('ADMIN2024'),
  ('MATMARKET_ADMIN'),
  ('SUPER_ADMIN_123')
ON CONFLICT (code) DO NOTHING;
```

### 5. Set Row Level Security (RLS) Policies

```sql
-- Enable RLS on users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own profile
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = auth_id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = auth_id);

-- Allow service role to insert new users (for registration)
CREATE POLICY "Service role can insert users" ON users
  FOR INSERT WITH CHECK (true);

-- Enable RLS on admin_confirmation_codes table
ALTER TABLE admin_confirmation_codes ENABLE ROW LEVEL SECURITY;

-- Only allow service role to read admin codes
CREATE POLICY "Service role can read admin codes" ON admin_confirmation_codes
  FOR SELECT USING (true);

-- Only allow service role to update admin codes
CREATE POLICY "Service role can update admin codes" ON admin_confirmation_codes
  FOR UPDATE USING (true);
```

## User Roles Explained

- **customer**: Individual customers who buy products
- **company**: Businesses that sell products (vendors)
- **hybrid**: Companies that can both sell and buy products
- **admin**: Administrative users with full access

## Admin Confirmation Codes

The system includes pre-defined admin confirmation codes:
- `ADMIN2024`
- `MATMARKET_ADMIN` 
- `SUPER_ADMIN_123`

These codes are required during admin registration and are marked as used after successful registration.

## API Endpoints

The backend provides the following registration endpoints:

- `POST /make-server-2ef2f474/register/customer` - Register a customer
- `POST /make-server-2ef2f474/register/company` - Register a company (can be hybrid)
- `POST /make-server-2ef2f474/register/admin` - Register an admin (requires confirmation code)
- `GET /make-server-2ef2f474/user/profile` - Get user profile (requires auth)
- `POST /make-server-2ef2f474/verify-admin-code` - Verify admin confirmation code

## Environment Variables

Make sure these environment variables are set in your Supabase Edge Functions:

- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key
- `SUPABASE_ANON_KEY` - Your Supabase anon key

## Testing the Setup

After running the SQL commands above, you can test the registration system by:

1. Going to the registration page
2. Selecting different account types
3. For admin registration, use one of the confirmation codes listed above
4. Verifying that users are created in both `auth.users` and `users` tables

## Troubleshooting

If you encounter issues:

1. Ensure all SQL commands were executed successfully
2. Check that RLS policies are set up correctly
3. Verify environment variables are configured in Edge Functions
4. Check the Supabase logs for any error messages