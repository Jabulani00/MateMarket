import { createClient } from "npm:@supabase/supabase-js@2.39.3";

// Create Supabase client with service role for admin operations
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

export async function initializeDatabase() {
  try {
    console.log('Initializing database schema...');
    
    // Create user_role enum
    await createUserRoleEnum();
    
    // Create users table
    await createUsersTable();
    
    // Create admin_confirmation_codes table
    await createAdminConfirmationCodesTable();

    // Insert default admin confirmation codes
    await insertDefaultAdminCodes();
    
    console.log('Database initialization completed');
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}

async function createUserRoleEnum() {
  try {
    const { error } = await supabase.rpc('exec_sql', {
      sql: `
        DO $$ BEGIN
          CREATE TYPE user_role AS ENUM ('customer', 'company', 'hybrid', 'admin');
        EXCEPTION
          WHEN duplicate_object THEN null;
        END $$;
      `
    });
    
    if (error) {
      console.error('Error creating user_role enum:', error);
    } else {
      console.log('user_role enum created or already exists');
    }
  } catch (error) {
    console.error('Error in createUserRoleEnum:', error);
  }
}

async function createUsersTable() {
  try {
    const { error } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS users (
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
        CREATE INDEX IF NOT EXISTS idx_users_auth_id ON users(auth_id);
        CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
        CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
      `
    });
    
    if (error) {
      console.error('Error creating users table:', error);
    } else {
      console.log('users table created or already exists');
    }
  } catch (error) {
    console.error('Error in createUsersTable:', error);
  }
}

async function createAdminConfirmationCodesTable() {
  try {
    const { error } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS admin_confirmation_codes (
          id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
          code text UNIQUE NOT NULL,
          is_used boolean DEFAULT false,
          created_at timestamp with time zone DEFAULT now()
        );

        -- Create index for better performance
        CREATE INDEX IF NOT EXISTS idx_admin_codes_code ON admin_confirmation_codes(code);
        CREATE INDEX IF NOT EXISTS idx_admin_codes_is_used ON admin_confirmation_codes(is_used);
      `
    });
    
    if (error) {
      console.error('Error creating admin_confirmation_codes table:', error);
    } else {
      console.log('admin_confirmation_codes table created or already exists');
    }
  } catch (error) {
    console.error('Error in createAdminConfirmationCodesTable:', error);
  }
}

async function insertDefaultAdminCodes() {
  const defaultCodes = ['ADMIN2024', 'MATMARKET_ADMIN', 'SUPER_ADMIN_123'];
  
  for (const code of defaultCodes) {
    try {
      const { error } = await supabase
        .from('admin_confirmation_codes')
        .insert({ code })
        .select();
      
      if (error && !error.message.includes('duplicate')) {
        console.error('Error inserting admin code:', error);
      } else if (!error) {
        console.log(`Admin code ${code} inserted successfully`);
      }
    } catch (error) {
      console.error(`Error inserting admin code ${code}:`, error);
    }
  }
}

// Helper function to validate admin confirmation code
export async function validateAdminCode(code: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('admin_confirmation_codes')
      .select('*')
      .eq('code', code)
      .eq('is_used', false)
      .single();

    if (error || !data) {
      return false;
    }

    // Mark code as used
    await supabase
      .from('admin_confirmation_codes')
      .update({ is_used: true })
      .eq('id', data.id);

    return true;
  } catch (error) {
    console.error('Admin code validation error:', error);
    return false;
  }
}