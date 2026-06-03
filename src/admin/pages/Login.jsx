import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FaGraduationCap, FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from '../../assets/school.png';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  // Debug: Log environment variables
  console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
  console.log('Environment variables:', import.meta.env);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    console.log('Attempting login with:', formData);

    const result = await login(formData.email, formData.password);
    
    console.log('Login result:', result);
    
    if (!result.success) {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Demo credentials for easy testing
  const demoCredentials = [
    { email: 'superadmin@school.com', password: 'password123', role: 'Super Admin' },
    { email: 'admin@school.com', password: 'password123', role: 'School Admin' }
  ];

  const fillDemoCredentials = (email, password) => {
    setFormData({ email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Dr. Kabiru Gwarzo Academy" className="h-20 w-20" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Dr. Kabiru Gwarzo Academy
          </h2>
          <p className="mt-2 text-lg font-semibold text-blue-950 dark:text-yellow-400">
            Admin Dashboard
          </p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Sign in to manage your school
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 py-8 px-6 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950 dark:focus:ring-yellow-400 focus:border-transparent sm:text-sm"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="appearance-none relative block w-full px-3 py-3 pr-10 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950 dark:focus:ring-yellow-400 focus:border-transparent sm:text-sm"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-950 hover:bg-blue-900 dark:bg-yellow-400 dark:text-blue-950 dark:hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-950 dark:focus:ring-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white dark:border-blue-950 border-t-transparent mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  <>
                    <FaGraduationCap className="mr-2 h-5 w-5" />
                    Sign in to Dashboard
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Demo credentials */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Demo Credentials</span>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {demoCredentials.map((cred, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => fillDemoCredentials(cred.email, cred.password)}
                  className="w-full text-left px-4 py-3 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  <div className="font-medium text-gray-900 dark:text-white">{cred.role}</div>
                  <div className="text-gray-500 dark:text-gray-400">{cred.email}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Dr. Kabiru Gwarzo Academy & Tahfeez - Admin Portal v1.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;