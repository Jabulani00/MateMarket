import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, ShoppingBag, Heart, Settings, Package, CreditCard, MapPin, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '../ui/separator';
import { getSupabaseClient } from '../../utils/supabase/client';
import { toast } from 'sonner';

const supabase = getSupabaseClient();

interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'vendor' | 'admin';
}

interface DashboardPageProps {
  user: User;
}

// Mock data for demonstration
const mockOrders = [
  {
    id: 'MM123456',
    date: '2024-01-15',
    status: 'delivered',
    total: 2850.00,
    items: [
      { name: 'Portland Cement 42.5N - 50kg Bag', quantity: 10, price: 89.99 },
      { name: 'IBR Roof Sheets - Galvanised Steel', quantity: 5, price: 245.00 }
    ]
  },
  {
    id: 'MM123455',
    date: '2024-01-10',
    status: 'shipped',
    total: 1560.50,
    items: [
      { name: '110mm PVC Pipe Class 6', quantity: 2, price: 156.50 },
      { name: 'Premium Exterior Paint - Pure White 20L', quantity: 3, price: 449.99 }
    ]
  },
  {
    id: 'MM123454',
    date: '2024-01-05',
    status: 'processing',
    total: 649.99,
    items: [
      { name: 'Bosch Angle Grinder GWS 750-100', quantity: 1, price: 649.99 }
    ]
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered': return 'bg-green-100 text-green-800';
    case 'shipped': return 'bg-blue-100 text-blue-800';
    case 'processing': return 'bg-yellow-100 text-yellow-800';
    case 'cancelled': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export function DashboardPage({ user }: DashboardPageProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [orders] = useState(mockOrders);
  const [isLoading, setIsLoading] = useState(false);

  // Check for order success message
  useEffect(() => {
    const state = location.state as any;
    if (state?.orderSuccess) {
      toast.success(`Order ${state.orderNumber} placed successfully! Total: R${state.total.toFixed(2)}`);
      // Clear the state
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate, location.pathname]);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      navigate('/');
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Error logging out');
      console.error('Logout error:', error);
    }
    setIsLoading(false);
  };

  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
  const completedOrders = orders.filter(order => order.status === 'delivered').length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
              <p className="text-gray-600 mt-1">Manage your orders and account settings</p>
            </div>
            <Button variant="outline" onClick={handleLogout} disabled={isLoading}>
              {isLoading ? 'Logging out...' : 'Logout'}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <ShoppingBag className="h-8 w-8 mx-auto mb-2 text-orange-500" />
              <div className="text-2xl font-bold text-gray-900">{orders.length}</div>
              <div className="text-sm text-gray-600">Total Orders</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold text-gray-900">{completedOrders}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <CreditCard className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold text-gray-900">R{totalSpent.toFixed(2)}</div>
              <div className="text-sm text-gray-600">Total Spent</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 mx-auto mb-2 text-red-500" />
              <div className="text-2xl font-bold text-gray-900">0</div>
              <div className="text-sm text-gray-600">Saved Items</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <nav className="space-y-2">
                  <Link to="/dashboard" className="flex items-center space-x-3 p-2 rounded-md bg-orange-50 text-orange-600">
                    <User className="h-5 w-5" />
                    <span>Overview</span>
                  </Link>
                  <Link to="/dashboard/orders" className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50">
                    <Package className="h-5 w-5" />
                    <span>Orders</span>
                  </Link>
                  <Link to="/dashboard/addresses" className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50">
                    <MapPin className="h-5 w-5" />
                    <span>Addresses</span>
                  </Link>
                  <Link to="/dashboard/settings" className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50">
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="orders" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="orders">Recent Orders</TabsTrigger>
                <TabsTrigger value="account">Account Info</TabsTrigger>
              </TabsList>
              
              <TabsContent value="orders" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {orders.length === 0 ? (
                      <div className="text-center py-8">
                        <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                        <p className="text-gray-500 mb-4">You haven't placed any orders yet</p>
                        <Link to="/products">
                          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                            Start Shopping
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <div key={order.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <h3 className="font-medium">Order #{order.id}</h3>
                                <p className="text-sm text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
                              </div>
                              <div className="text-right">
                                <Badge className={getStatusColor(order.status)}>
                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </Badge>
                                <p className="text-lg font-bold mt-1">R{order.total.toFixed(2)}</p>
                              </div>
                            </div>
                            
                            <Separator className="mb-3" />
                            
                            <div className="space-y-2">
                              {order.items.map((item, index) => (
                                <div key={index} className="flex justify-between text-sm">
                                  <span>{item.name} × {item.quantity}</span>
                                  <span>R{(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                              ))}
                            </div>
                            
                            <div className="mt-3 flex justify-between items-center">
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                              {order.status === 'delivered' && (
                                <Button variant="outline" size="sm">
                                  Reorder
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="account" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Name</Label>
                        <p className="text-gray-900">{user.name}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Email</Label>
                        <p className="text-gray-900">{user.email}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Account Type</Label>
                        <Badge variant="secondary" className="ml-2">
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </Badge>
                      </div>
                      <div className="pt-4">
                        <Button variant="outline">
                          Edit Profile
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add Label component since it's being used
function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}