import { Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

export function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null) // null = loading, false = not auth, true = auth

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = localStorage.getItem('netflix-authenticated') === 'true'
      console.log('ProtectedRoute: Checking auth, authenticated =', authenticated)
      setIsAuthenticated(authenticated)
    }

    checkAuth()

    // Listen for storage changes
    const handleStorageChange = () => {
      console.log('ProtectedRoute: Storage changed, rechecking auth')
      checkAuth()
    }

    window.addEventListener('storage', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  // Show loading or nothing while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  // Redirect to signup if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/signup" replace />
  }

  // Render children if authenticated
  return children
}
