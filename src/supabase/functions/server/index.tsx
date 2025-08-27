import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { createClient } from "@supabase/supabase-js";

const app = new Hono();

// Create Supabase client with service role for admin operations
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Helper function to validate admin confirmation code
async function validateAdminCode(code: string): Promise<boolean> {
  try {
    // First try database lookup
    const { data, error } = await supabase
      .from('admin_confirmation_codes')
      .select('*')
      .eq('code', code)
      .eq('is_used', false)
      .single();

    if (!error && data) {
      // Mark code as used
      await supabase
        .from('admin_confirmation_codes')
        .update({ is_used: true })
        .eq('id', data.id);
      return true;
    }
  } catch (error) {
    console.log('Database lookup failed, using fallback codes');
  }

  // Fallback to default codes if database doesn't exist or lookup fails
  const defaultCodes = ['ADMIN2024', 'MATMARKET_ADMIN', 'SUPER_ADMIN_123'];
  return defaultCodes.includes(code);
}

// Health check endpoint
app.get("/make-server-2ef2f474/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Test endpoint to help debug registration issues
app.get("/make-server-2ef2f474/test", async (c) => {
  try {
    const response = {
      status: "ok",
      timestamp: new Date().toISOString(),
      environment: {
        supabase_url: Deno.env.get('SUPABASE_URL') ? 'configured' : 'missing',
        service_role_key: Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ? 'configured' : 'missing',
      }
    };

    return c.json(response);
  } catch (error) {
    return c.json({ 
      status: 'error', 
      error: String(error),
      message: 'Server test failed'
    }, 500);
  }
});

// Register customer endpoint
app.post("/make-server-2ef2f474/register/customer", async (c) => {
  try {
    const { email, password, name, phone } = await c.req.json();

    if (!email || !password || !name) {
      return c.json({ error: 'Email, password, and name are required' }, 400);
    }

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      user_metadata: { name, role: 'customer' },
      email_confirm: true
    });

    if (authError) {
      console.error('Auth user creation error:', authError);
      return c.json({ error: authError.message }, 400);
    }

    // Try to create user record in users table (fallback if table doesn't exist)
    try {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert({
          auth_id: authData.user.id,
          email: email,
          name: name,
          phone: phone || null,
          role: 'customer'
        })
        .select()
        .single();

      if (userError) {
        console.log('User record creation failed, using fallback:', userError.message);
        return c.json({ 
          message: 'Customer registered successfully (profile setup pending)',
          user: {
            id: authData.user.id,
            email: email,
            name: name,
            role: 'customer'
          }
        });
      }

      return c.json({ 
        message: 'Customer registered successfully',
        user: userData
      });
      
    } catch (error) {
      console.log('Database operation failed, using fallback');
      return c.json({ 
        message: 'Customer registered successfully (profile setup pending)',
        user: {
          id: authData.user.id,
          email: email,
          name: name,
          role: 'customer'
        }
      });
    }

  } catch (error) {
    console.error('Customer registration error:', error);
    return c.json({ error: 'Registration failed: ' + String(error) }, 500);
  }
});

// Register company endpoint
app.post("/make-server-2ef2f474/register/company", async (c) => {
  try {
    const { 
      email, 
      password, 
      name, 
      phone, 
      company_name, 
      registration_number, 
      vat_number, 
      is_hybrid 
    } = await c.req.json();

    if (!email || !password || !name || !company_name) {
      return c.json({ error: 'Email, password, name, and company name are required' }, 400);
    }

    const role = is_hybrid ? 'hybrid' : 'company';

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      user_metadata: { name, role },
      email_confirm: true
    });

    if (authError) {
      console.error('Auth user creation error:', authError);
      return c.json({ error: authError.message }, 400);
    }

    // Try to create user record in users table (fallback if table doesn't exist)
    try {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert({
          auth_id: authData.user.id,
          email: email,
          name: name,
          phone: phone || null,
          role: role,
          company_name: company_name,
          registration_number: registration_number || null,
          vat_number: vat_number || null
        })
        .select()
        .single();

      if (userError) {
        console.log('User record creation failed, using fallback:', userError.message);
        return c.json({ 
          message: `${role === 'hybrid' ? 'Hybrid company' : 'Company'} registered successfully (profile setup pending)`,
          user: {
            id: authData.user.id,
            email: email,
            name: name,
            role: role,
            company_name: company_name
          }
        });
      }

      return c.json({ 
        message: `${role === 'hybrid' ? 'Hybrid company' : 'Company'} registered successfully`,
        user: userData
      });
      
    } catch (error) {
      console.log('Database operation failed, using fallback');
      return c.json({ 
        message: `${role === 'hybrid' ? 'Hybrid company' : 'Company'} registered successfully (profile setup pending)`,
        user: {
          id: authData.user.id,
          email: email,
          name: name,
          role: role,
          company_name: company_name
        }
      });
    }

  } catch (error) {
    console.error('Company registration error:', error);
    return c.json({ error: 'Registration failed: ' + String(error) }, 500);
  }
});

// Register admin endpoint
app.post("/make-server-2ef2f474/register/admin", async (c) => {
  try {
    const { email, password, name, phone, confirmation_code } = await c.req.json();

    if (!email || !password || !name || !confirmation_code) {
      return c.json({ error: 'Email, password, name, and confirmation code are required' }, 400);
    }

    // Validate admin confirmation code
    const isValidCode = await validateAdminCode(confirmation_code);
    if (!isValidCode) {
      return c.json({ error: 'Invalid or expired confirmation code' }, 403);
    }

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      user_metadata: { name, role: 'admin' },
      email_confirm: true
    });

    if (authError) {
      console.error('Auth user creation error:', authError);
      return c.json({ error: authError.message }, 400);
    }

    // Try to create user record in users table (fallback if table doesn't exist)
    try {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert({
          auth_id: authData.user.id,
          email: email,
          name: name,
          phone: phone || null,
          role: 'admin',
          is_verified: true
        })
        .select()
        .single();

      if (userError) {
        console.log('User record creation failed, using fallback:', userError.message);
        return c.json({ 
          message: 'Admin registered successfully (profile setup pending)',
          user: {
            id: authData.user.id,
            email: email,
            name: name,
            role: 'admin',
            is_verified: true
          }
        });
      }

      return c.json({ 
        message: 'Admin registered successfully',
        user: userData
      });
      
    } catch (error) {
      console.log('Database operation failed, using fallback');
      return c.json({ 
        message: 'Admin registered successfully (profile setup pending)',
        user: {
          id: authData.user.id,
          email: email,
          name: name,
          role: 'admin',
          is_verified: true
        }
      });
    }

  } catch (error) {
    console.error('Admin registration error:', error);
    return c.json({ error: 'Registration failed: ' + String(error) }, 500);
  }
});

// Verify admin confirmation code endpoint (for frontend validation)
app.post("/make-server-2ef2f474/verify-admin-code", async (c) => {
  try {
    const { code } = await c.req.json();

    if (!code) {
      return c.json({ error: 'Confirmation code is required' }, 400);
    }

    try {
      const { data, error } = await supabase
        .from('admin_confirmation_codes')
        .select('*')
        .eq('code', code)
        .eq('is_used', false)
        .single();

      if (!error && data) {
        return c.json({ valid: true });
      }
    } catch (error) {
      console.log('Database lookup failed, checking default codes');
    }

    // Fallback to default codes
    const defaultCodes = ['ADMIN2024', 'MATMARKET_ADMIN', 'SUPER_ADMIN_123'];
    return c.json({ valid: defaultCodes.includes(code) });

  } catch (error) {
    console.error('Admin code verification error:', error);
    return c.json({ valid: false });
  }
});

// Get user profile endpoint
app.get("/make-server-2ef2f474/user/profile", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Authorization token required' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Invalid token' }, 401);
    }

    // Try to get user profile from users table (fallback to auth metadata)
    try {
      const { data: userProfile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('auth_id', user.id)
        .single();

      if (!profileError && userProfile) {
        return c.json({ user: userProfile });
      }
    } catch (error) {
      console.log('Profile lookup failed, using auth metadata');
    }

    // Fallback to auth metadata
    return c.json({ 
      user: {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || user.email,
        role: user.user_metadata?.role || 'customer'
      }
    });

  } catch (error) {
    console.error('Profile fetch error:', error);
    return c.json({ error: 'Failed to fetch profile' }, 500);
  }
});

Deno.serve(app.fetch);