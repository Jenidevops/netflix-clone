import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, Lock } from 'lucide-react'

const PayPalPayment = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { email, selectedPlan, paymentMethod } = location.state || {}

  const [isProcessing, setIsProcessing] = useState(false)
  const [showPayPalLogin, setShowPayPalLogin] = useState(false)
  const [paypalCredentials, setPaypalCredentials] = useState({
    email: '',
    password: ''
  })

  const handlePayPalLogin = async (e) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate PayPal authentication
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Mock successful authentication
    navigate('/payment-confirmation', {
      state: {
        email,
        selectedPlan,
        paymentMethod,
        paymentDetails: {
          paypalEmail: paypalCredentials.email || 'user@paypal.com'
        }
      }
    })
  }

  const handleContinueWithPayPal = () => {
    setShowPayPalLogin(true)
  }

  const goBack = () => {
    navigate('/payment-method', { state: { email, selectedPlan } })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 px-4 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button 
              onClick={goBack}
              className="text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="text-netflix text-2xl font-bold">NETFLIX</div>
          </div>
          <button 
            onClick={() => navigate('/signup')}
            className="text-gray-600 hover:text-gray-800"
          >
            Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 py-8">
        {/* Progress indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-netflix rounded-full"></div>
            <div className="w-12 h-1 bg-netflix"></div>
            <div className="w-3 h-3 bg-netflix rounded-full"></div>
            <div className="w-12 h-1 bg-netflix"></div>
            <div className="w-3 h-3 bg-netflix rounded-full"></div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-medium text-gray-900 mb-2">
            Set up PayPal
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Lock className="w-4 h-4" />
            <span className="text-sm">Secured with PayPal</span>
          </div>
        </div>

        {/* Plan summary */}
        <div className="bg-gray-50 rounded-lg p-4 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-900">{selectedPlan?.name} Plan</h3>
              <p className="text-gray-600 text-sm">{selectedPlan?.resolution}</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold">{selectedPlan?.price}</div>
              <div className="text-gray-600 text-sm">/month</div>
            </div>
          </div>
        </div>

        {!showPayPalLogin ? (
          /* PayPal intro */
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="text-center">
                <div className="text-blue-600 text-3xl font-bold mb-4">PayPal</div>
                <h2 className="text-lg font-medium text-gray-900 mb-2">
                  Pay with your PayPal account
                </h2>
                <p className="text-gray-600 text-sm mb-6">
                  You'll be redirected to PayPal to complete your payment securely.
                </p>
                
                <div className="space-y-3 text-sm text-gray-600 mb-6">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Pay with your PayPal balance or linked cards</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Secure PayPal encryption</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Automatic monthly billing</span>
                  </div>
                </div>

                <button
                  onClick={handleContinueWithPayPal}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Continue with PayPal
                </button>
              </div>
            </div>

            <div className="text-xs text-gray-600 text-center">
              <p>
                By continuing, you agree to Netflix's{' '}
                <span className="text-blue-600 cursor-pointer">Terms of Use</span>{' '}
                and PayPal's{' '}
                <span className="text-blue-600 cursor-pointer">User Agreement</span>.
              </p>
            </div>
          </div>
        ) : (
          /* Mock PayPal login */
          <div className="space-y-6">
            <div className="bg-blue-600 text-white p-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">PayPal</div>
                <button 
                  onClick={() => setShowPayPalLogin(false)}
                  className="text-blue-200 hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="border border-gray-200 border-t-0 rounded-b-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Log in to your PayPal account
              </h2>

              <form onSubmit={handlePayPalLogin} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={paypalCredentials.email}
                    onChange={(e) => setPaypalCredentials(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Email or mobile number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <input
                    type="password"
                    value={paypalCredentials.password}
                    onChange={(e) => setPaypalCredentials(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    isProcessing
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Processing...
                    </span>
                  ) : (
                    'Log In'
                  )}
                </button>
              </form>

              <div className="text-center mt-4">
                <button className="text-blue-600 text-sm hover:underline">
                  Forgot your password?
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <p className="text-gray-600 text-sm mb-3">
                  Don't have a PayPal account?
                </p>
                <button className="text-blue-600 text-sm hover:underline">
                  Sign up for PayPal
                </button>
              </div>
            </div>

            <div className="text-xs text-gray-600 text-center">
              <p>
                <strong>Demo Mode:</strong> Use any email and password to continue.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PayPalPayment