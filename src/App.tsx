import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './features/auth/Login';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './features/dashboard/Dashboard';
import Courses from './features/courses/CourseList';
import Assignments from './features/assignments/AssignmentPage';

const queryClient = new QueryClient();

// Guard to protect internal pages (redirects to Login if no token)
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('learnGround_auth') === 'true';
  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

// Guard to protect the login page (redirects to Dashboard if already logged in)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('learnGround_auth') === 'true';
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          
          {/* PUBLIC ROUTE */}
          <Route 
            path="/" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          
          {/* PROTECTED ROUTES */}
          <Route 
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/assignments" element={<Assignments />} />
          </Route>

          {/* CATCH-ALL ROUTE (Handles 404s sending users back to the root) */}
          <Route path="*" element={<Navigate to="/" replace />} />
          
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
