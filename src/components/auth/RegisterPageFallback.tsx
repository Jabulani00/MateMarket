import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Eye, EyeOff, Mail, Lock, User, Building, Phone, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { getSupabaseClient } from '../../utils/supabase/client';
import logoImage from '../../assets/290ff4d7eb75fcc7af80bc9d188bd9db39ca7d9e.png';

const supabase = getSupabaseClient();

type UserType = 'customer' | 'company' | 'admin';

// This is a fallback registration component that works without Edge Functions
export function RegisterPageFallback() {
  const [userType, setUserType] = useState<UserType>('customer');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    companyName: '',
    registrationNumber: '',
    vatNumber: '',
    isHybrid: false,
    confirmationCode: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateAdminCode = (code: string): boolean => {
    const validCodes = ['ADMIN2024', 'MATMARKET_ADMIN', 'SUPER_ADMIN_123'];
    return validCodes.includes(code);
  };

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.name) {
      toast.error('Please fill in all required fields');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return false;
    }

    if (userType === 'company' && !formData.companyName) {
      toast.error('Company name is required for business accounts');
      return false;
    }

    if (userType === 'admin' && !validateAdminCode(formData.confirmationCode)) {
      toast.error('Invalid admin confirmation code');
      return false;
    }

    if (!formData.agreeToTerms) {
      toast.error('Please accept the terms and conditions');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      const role = userType === 'company' && formData.isHybrid ? 'hybrid' : userType;
      
      // Use direct Supabase Auth registration
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            role: role,
            phone: formData.phone || null,
            company_name: userType === 'company' ? formData.companyName : null,
            registration_number: userType === 'company' ? formData.registrationNumber : null,
            vat_number: userType === 'company' ? formData.vatNumber : null,
            is_hybrid: userType === 'company' ? formData.isHybrid : false,
            is_verified: userType === 'admin',
          }
        }
      });

      if (error) {
        toast.error('Registration failed: ' + error.message);
        return;
      }

      if (data.user) {
        toast.success('Registration successful! You can now sign in.');
        navigate('/login');
      }

    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 flex items-center justify-center">
            <img 
              src={logoImage} 
              alt="Company Logo" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-orange-500 hover:text-orange-600">
            Sign in here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Account Type Selection */}
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-3">
                Account Type
              </Label>
              <RadioGroup
                value={userType}
                onValueChange={(value) => setUserType(value as UserType)}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="customer" id="customer" />
                  <Label htmlFor="customer" className="text-sm">
                    Personal Account - For individual customers
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="company" id="company" />
                  <Label htmlFor="company" className="text-sm">
                    Business Account - For companies and vendors
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="admin" id="admin" />
                  <Label htmlFor="admin" className="text-sm">
                    Admin Account - Requires confirmation code
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address *
              </Label>
              <div className="mt-1 relative">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10"
                  placeholder="Enter your email"
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Name */}
            <div>
              <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
                {userType === 'customer' ? 'Full Name' : 'Contact Person'} *
              </Label>
              <div className="mt-1 relative">
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="pl-10"
                  placeholder={userType === 'customer' ? 'Enter your full name' : 'Enter contact person name'}
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </Label>
              <div className="mt-1 relative">
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="pl-10"
                  placeholder="e.g., 082 123 4567"
                />
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Company Fields */}
            {userType === 'company' && (
              <>
                <div>
                  <Label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                    Company Name *
                  </Label>
                  <div className="mt-1 relative">
                    <Input
                      id="companyName"
                      name="companyName"
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="pl-10"
                      placeholder="Enter company name"
                    />
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700">
                      Registration Number
                    </Label>
                    <Input
                      id="registrationNumber"
                      name="registrationNumber"
                      type="text"
                      value={formData.registrationNumber}
                      onChange={handleInputChange}
                      placeholder="e.g., 2021/123456/07"
                    />
                  </div>

                  <div>
                    <Label htmlFor="vatNumber" className="block text-sm font-medium text-gray-700">
                      VAT Number
                    </Label>
                    <Input
                      id="vatNumber"
                      name="vatNumber"
                      type="text"
                      value={formData.vatNumber}
                      onChange={handleInputChange}
                      placeholder="e.g., 4123456789"
                    />
                  </div>
                </div>

                {/* Hybrid Role Option */}
                <div className="flex items-start">
                  <Checkbox
                    id="isHybrid"
                    name="isHybrid"
                    checked={formData.isHybrid}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, isHybrid: Boolean(checked) }))
                    }
                    className="mt-1"
                  />
                  <Label htmlFor="isHybrid" className="ml-2 block text-sm text-gray-900">
                    Also act as a buyer (Hybrid account - can both sell and purchase)
                  </Label>
                </div>
              </>
            )}

            {/* Admin Confirmation Code */}
            {userType === 'admin' && (
              <div>
                <Label htmlFor="confirmationCode" className="block text-sm font-medium text-gray-700">
                  Admin Confirmation Code *
                </Label>
                <div className="mt-1 relative">
                  <Input
                    id="confirmationCode"
                    name="confirmationCode"
                    type="text"
                    required
                    value={formData.confirmationCode}
                    onChange={handleInputChange}
                    className="pl-10"
                    placeholder="Use: ADMIN2024, MATMARKET_ADMIN, or SUPER_ADMIN_123"
                  />
                  <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Valid codes: ADMIN2024, MATMARKET_ADMIN, SUPER_ADMIN_123
                </p>
              </div>
            )}

            {/* Password */}
            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password *
              </Label>
              <div className="mt-1 relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 pr-10"
                  placeholder="Create a password"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password *
              </Label>
              <div className="mt-1 relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="pl-10 pr-10"
                  placeholder="Confirm your password"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <Checkbox
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, agreeToTerms: Boolean(checked) }))
                }
                className="mt-1"
              />
              <Label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-900">
                I agree to the{' '}
                <Link to="/terms" className="text-orange-500 hover:text-orange-600">
                  Terms and Conditions
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-orange-500 hover:text-orange-600">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create account'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}