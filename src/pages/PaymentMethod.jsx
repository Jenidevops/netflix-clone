import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { CreditCard, Smartphone, Gift, ArrowLeft } from 'lucide-react'

const PaymentMethod = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { email, selectedPlan } = location.state || {}
  
  const [selectedMethod, setSelectedMethod] = useState('')

  const paymentMethods = [
    {
      id: 'credit-card',
      name: 'Credit or Debit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, American Express, Discover, Diners Club',
      popular: true
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: Smartphone,
      description: 'Connect your PayPal account'
    },
    {
      id: 'gift-card',
      name: 'Gift Code or Promotional Code',
      icon: Gift,
      description: 'Enter a Netflix gift card or promo code'
    }
  ]

  const handleContinue = () => {
    if (!selectedMethod) return
    
    // Skip detailed payment forms and go directly to confirmation
    navigate('/payment-confirmation', {
      state: {
        email,
        selectedPlan,
        paymentMethod: selectedMethod,
        paymentDetails: {
          // Mock payment details based on method
          ...(selectedMethod === 'credit-card' && { cardLast4: '1234', nameOnCard: 'Demo User' }),
          ...(selectedMethod === 'paypal' && { paypalEmail: email || 'demo@paypal.com' }),
          ...(selectedMethod === 'gift-card' && { giftCardCode: 'DEMO123456', remainingBalance: 50.00 })
        }
      }
    })
  }

  const goBack = () => {
    navigate('/subscription-plans', { state: { email } })
  }

  if (!selectedPlan) {
    navigate('/subscription-plans')
    return null
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
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-medium text-gray-900 mb-2">
            Set up your payment
          </h1>
          <p className="text-gray-600">
            Your membership starts as soon as you set up payment.
          </p>
        </div>

        {/* Plan summary */}
        <div className="bg-gray-50 rounded-lg p-4 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-900">{selectedPlan.name} Plan</h3>
              <p className="text-gray-600 text-sm">{selectedPlan.resolution}</p>
              <p className="text-gray-600 text-sm">
                {selectedPlan.devices} device{selectedPlan.devices > 1 ? 's' : ''} at a time
              </p>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold">{selectedPlan.price}</div>
              <div className="text-gray-600 text-sm">/month</div>
            </div>
          </div>
        </div>

        {/* Payment methods */}
        <div className="space-y-3 mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Choose how to pay
          </h2>
          
          {paymentMethods.map((method) => (
            <div key={method.id} className="relative">
              {method.popular && (
                <div className="absolute -top-2 left-4 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium z-10">
                  Most Popular
                </div>
              )}
              <div 
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  selectedMethod === method.id 
                    ? 'border-netflix bg-red-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${
                    selectedMethod === method.id ? 'bg-netflix text-white' : 'bg-gray-100'
                  }`}>
                    <method.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{method.name}</h3>
                    <p className="text-gray-600 text-sm">{method.description}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedMethod === method.id 
                      ? 'border-netflix bg-netflix' 
                      : 'border-gray-300'
                  }`}>
                    {selectedMethod === method.id && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Security notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5">
              <span className="text-yellow-800 text-xs font-bold">!</span>
            </div>
            <div className="text-sm text-yellow-800">
              <p className="font-medium mb-1">Secure and encrypted</p>
              <p>Your payment information is encrypted and secure. Cancel anytime.</p>
            </div>
          </div>
        </div>

        {/* Continue button */}
        <button
          onClick={handleContinue}
          disabled={!selectedMethod}
          className={`w-full py-4 rounded text-lg font-medium transition-colors ${
            selectedMethod
              ? 'bg-netflix text-white hover:bg-red-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Activate Membership
        </button>

        {/* Terms */}
        <div className="text-xs text-gray-600 text-center mt-6">
          <p>
            <strong>Demo Mode:</strong> Selecting a payment method will instantly activate your membership and grant access to Netflix.
          </p>
          <p className="mt-2">
            By continuing, you agree to the Netflix{' '}
            <span className="text-blue-600 cursor-pointer">Terms of Use</span> and that you are over 18.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PaymentMethod