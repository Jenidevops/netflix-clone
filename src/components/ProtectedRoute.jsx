import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }) {
  // TODO: Replace with actual authentication logic
  const isAuthenticated = true; // Set to true to allow access without redirect

  return isAuthenticated ? children : <Navigate to="/get-started" />;
}
