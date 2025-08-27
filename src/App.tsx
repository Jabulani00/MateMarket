import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { ForgotPasswordPage } from './components/auth/ForgotPasswordPage';
import { ProductListingPage } from './components/products/ProductListingPage';
import { ProductDetailPage } from './components/products/ProductDetailPage';
import { VendorDirectoryPage } from './components/vendors/VendorDirectoryPage';
import { VendorStorePage } from './components/vendors/VendorStorePage';
import { CartPage } from './components/cart/CartPage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { FavoritesPage } from './components/FavoritesPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { Navigation } from './components/layout/Navigation';
import { Footer } from './components/layout/Footer';
import { CartProvider } from './contexts/CartContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { ProductsProvider } from './contexts/ProductsContext';
import { Toaster } from 'sonner';
import { getSupabaseClient } from './utils/supabase/client';
import { projectId } from './utils/supabase/info';

const supabase = getSupabaseClient();

interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'company' | 'hybrid' | 'admin';
  phone?: string;
  company_name?: string;
  registration_number?: string;
  vat_number?: string;
  is_verified?: boolean;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async (accessToken: string) => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-2ef2f474/user/profile`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const { user: userProfile } = await response.json();
        return userProfile;
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
    return null;
  };

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          // Try to fetch user profile from our backend
          const userProfile = await fetchUserProfile(session.access_token);
          
          if (userProfile) {
            setUser({
              id: userProfile.id,
              email: userProfile.email,
              name: userProfile.name,
              role: userProfile.role,
              phone: userProfile.phone,
              company_name: userProfile.company_name,
              registration_number: userProfile.registration_number,
              vat_number: userProfile.vat_number,
              is_verified: userProfile.is_verified
            });
          } else {
            // Fallback to auth metadata if profile fetch fails
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              name: session.user.user_metadata?.name || session.user.email || 'User',
              role: session.user.user_metadata?.role || 'customer'
            });
          }
        }
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        // Try to fetch user profile from our backend
        const userProfile = await fetchUserProfile(session.access_token);
        
        if (userProfile) {
          setUser({
            id: userProfile.id,
            email: userProfile.email,
            name: userProfile.name,
            role: userProfile.role,
            phone: userProfile.phone,
            company_name: userProfile.company_name,
            registration_number: userProfile.registration_number,
            vat_number: userProfile.vat_number,
            is_verified: userProfile.is_verified
          });
        } else {
          // Fallback to auth metadata if profile fetch fails
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.name || session.user.email || 'User',
            role: session.user.user_metadata?.role || 'customer'
          });
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <ProductsProvider>
      <CartProvider>
        <FavoritesProvider>
          <Router>
            <div className="min-h-screen bg-white">
              <Navigation user={user} />
              
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/dashboard" />} />
                  <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/dashboard" />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="/products" element={<ProductListingPage />} />
                  <Route path="/products/:id" element={<ProductDetailPage />} />
                  <Route path="/vendors" element={<VendorDirectoryPage />} />
                  <Route path="/vendors/:id" element={<VendorStorePage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/favorites" element={<FavoritesPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route 
                    path="/dashboard" 
                    element={user ? <DashboardPage user={user} /> : <Navigate to="/login" />} 
                  />
                  {/* Catch-all route for unmatched paths */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>

              <Footer />
              <Toaster position="top-right" />
            </div>
          </Router>
        </FavoritesProvider>
      </CartProvider>
    </ProductsProvider>
  );
}