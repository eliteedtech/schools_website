import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

// Public website components
import Navbar from './componetes/layout/Navbar';
import Home from './componetes/Home';
import About from './componetes/About';
import Gallery from './componetes/Gallery';
import Apply from './componetes/Apply';
import Results from './componetes/Results';
import Price from './componetes/Price';
import Contact from './componetes/Contact';
import Footer from './componetes/Footer';
import ScrollToTop from './componetes/ScrollToTop';
import NotFound from './components/NotFound';

// Admin components
import { AuthProvider, useAuth } from './admin/contexts/AuthContext';
import AdminLogin from './admin/pages/Login';
import AdminLayout from './admin/components/Layout';
import AdminDashboard from './admin/pages/Dashboard';
import AdminGallery from './admin/pages/Gallery';
import Events from './admin/pages/Events';
import Statistics from './admin/pages/Statistics';
import AdminContact from './admin/pages/Contact';
import SuperAdminDashboard from './admin/pages/SuperAdminDashboard';
import Schools from './admin/pages/Schools';
import Themes from './admin/pages/Themes';
import LoadingSpinner from './admin/components/LoadingSpinner';

// Test components
import Test from './admin/pages/Test';
import SimpleLogin from './admin/pages/SimpleLogin';
import LoginNoAuth from './admin/pages/LoginNoAuth';

import { Navigate } from 'react-router-dom';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function ProtectedRoute({ children, requiredRole = null }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Test Routes - Outside AuthProvider for debugging */}
          <Route path="/admin/test" element={<Test />} />
          <Route path="/admin/simple" element={<SimpleLogin />} />
          <Route path="/admin/noauth" element={<LoginNoAuth />} />
          
          {/* Admin Routes - With AuthProvider */}
          <Route path="/admin/*" element={
            <AuthProvider>
              <Routes>
                <Route path="login" element={<AdminLoginWrapper />} />
                
                <Route path="" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
                  <Route index element={<Navigate to="/admin/dashboard" replace />} />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="gallery" element={<AdminGallery />} />
                  <Route path="events" element={<Events />} />
                  <Route path="statistics" element={<Statistics />} />
                  <Route path="contact" element={<AdminContact />} />
                  
                  {/* Super Admin Routes */}
                  <Route 
                    path="super-admin" 
                    element={
                      <ProtectedRoute requiredRole="super_admin">
                        <SuperAdminDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="schools" 
                    element={
                      <ProtectedRoute requiredRole="super_admin">
                        <Schools />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="themes/:schoolId" 
                    element={
                      <ProtectedRoute>
                        <Themes />
                      </ProtectedRoute>
                    } 
                  />
                </Route>
              </Routes>
            </AuthProvider>
          } />
          
          {/* Public Routes */}
          <Route path="/*" element={<PublicRoutes />} />
        </Routes>
        
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </Router>
    </QueryClientProvider>
  );
}

function AdminLoginWrapper() {
  const { user } = useAuth();
  
  if (user) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  
  return <AdminLogin />;
}

function PublicRoutes() {
  return (
    <div className='font-poppins bg-background dark:bg-gray-900 text-gray-800 dark:text-white min-h-screen'>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/results" element={<Results />} />
        <Route path="/price" element={<Price />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
