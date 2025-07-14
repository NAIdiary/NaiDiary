import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { useOnboardingStatus } from './hooks/useOnboardingStatus';
import LoginPage from './components/auth/LoginPage';
import OnboardingFlow from './components/onboarding/OnboardingFlow';
import Dashboard from './components/dashboard/Dashboard';
import Community from './components/community/Community';
import LoadingSpinner from './components/ui/LoadingSpinner';

const AppRoutes = () => {
  const { user, loading } = useAuth();
  const { profileCompleted, loading: onboardingLoading } = useOnboardingStatus();
  const navigate = useNavigate();

  if (loading || onboardingLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      <Route 
        path="/login" 
        element={user ? <Navigate to="/" /> : <LoginPage />} 
      />
      <Route 
        path="/onboarding" 
        element={
          user ? (
            profileCompleted ? <Navigate to="/" /> : <OnboardingFlow />
          ) : (
            <Navigate to="/login" />
          )
        } 
      />
      <Route 
        path="/*" 
        element={
          user ? (
            profileCompleted ? <Dashboard /> : <Navigate to="/onboarding" />
          ) : (
            <Navigate to="/login" />
          )
        } 
      />
      <Route 
        path="/community" 
        element={
          profileCompleted ? <Community /> : <Navigate to="/login" />
        } 
      />
    </Routes>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-x-hidden transition-colors duration-300 ease-in-out">
            <AppRoutes />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;