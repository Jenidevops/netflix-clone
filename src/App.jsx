import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import GetStarted from './pages/GetStarted'
import SignUp from './pages/SignUp'
import Browse from './pages/Browse'
import SubscriptionPlans from './pages/SubscriptionPlans'
import PaymentMethod from './pages/PaymentMethod'
import PaymentConfirmation from './pages/PaymentConfirmation'
import { SubscriptionProvider } from './context/SubscriptionContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { useState } from 'react'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Initialize from localStorage
    return localStorage.getItem('netflix-authenticated') === 'true'
  });

  return (
    <SubscriptionProvider>
      <Router basename="/netflix-clone">
        <Routes>
          <Route path="/" element={<GetStarted />} />
          <Route path="/signup" element={<SignUp setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/subscription-plans" element={<SubscriptionPlans />} />
          <Route path="/payment-method" element={<PaymentMethod />} />
          <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
          <Route
            path="/browse"
            element={
              <ProtectedRoute>
                <Browse />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </SubscriptionProvider>
  )
}

export default App
