import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, Gift, Info } from 'lucide-react'

const GiftCardPayment = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { email, selectedPlan, paymentMethod } = location.state || {}

  const [formData, setFormData] = useState({
    giftCode: '',
    pin: ''
  })
  const [errors, setErrors] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [giftCardBalance, setGiftCardBalance] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    let formattedValue = value.toUpperCase()

    if (name === 'giftCode') {
      // Remove all non-alphanumeric characters
      formattedValue = value.replace(/[^A-Z0-9]/g, '').substring(0, 16)
    } else if (name === 'pin') {
      // Only allow digits
      formattedValue = value.replace(/\D/g, '').substring(0, 4)
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateGiftCard = () => {
    const newErrors = {}

    if (!formData.giftCode) {
      newErrors.giftCode = 'Gift code is required'
    } else if (formData.giftCode.length < 10) {
      newErrors.giftCode = 'Invalid gift code format'
    }

    if (!formData.pin) {
      newErrors.pin = 'PIN is required'
    } else if (formData.pin.length !== 4) {
      newErrors.pin = 'PIN must be 4 digits'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCheckBalance = async () => {
    if (!validateGiftCard()) return

    setIsProcessing(true)

    // Simulate API call to check gift card balance
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Mock gift card validation
    const mockBalance = Math.floor(Math.random() * 100) + 50 // Random balance between $50-150
    setGiftCardBalance(mockBalance)
    setIsProcessing(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!giftCardBalance) {
      await handleCheckBalance()
      return
    }

    if (giftCardBalance < selectedPlan.pricePerMonth) {
      setErrors({ general: `Insufficient balance. Your gift card has $${giftCardBalance.toFixed(2)} but the plan costs ${selectedPlan.price}/month.` })
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    navigate('/payment-confirmation', {
      state: {
        email,
        selectedPlan,
        paymentMethod,
        paymentDetails: {
          giftCardCode: formData.giftCode,
          remainingBalance: giftCardBalance - selectedPlan.pricePerMonth
        }
      }
    })
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
          <div className="flex items-center justify-center gap-2 mb-4">
            <Gift className="w-8 h-8 text-netflix" />
            <h1 className="text-2xl font-medium text-gray-900">
              Redeem Gift Card
            </h1>
          </div>
          <p className="text-gray-600 text-sm">
            Enter your Netflix gift card or promotional code
          </p>
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

        {/* Gift card form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gift Code
              </label>
              <input
                type="text"
                name="giftCode"
                value={formData.giftCode}
                onChange={handleInputChange}
                placeholder="Enter gift code"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-netflix text-center text-lg font-mono tracking-wider ${
                  errors.giftCode ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.giftCode && (
                <p className="text-red-500 text-sm mt-1">{errors.giftCode}</p>
              )}
              <p className="text-gray-500 text-xs mt-1">
                Typically 10-16 characters (letters and numbers)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PIN (if required)
              </label>
              <input
                type="text"
                name="pin"
                value={formData.pin}
                onChange={handleInputChange}
                placeholder="****"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-netflix text-center text-lg font-mono tracking-wider ${
                  errors.pin ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.pin && (
                <p className="text-red-500 text-sm mt-1">{errors.pin}</p>
              )}
              <p className="text-gray-500 text-xs mt-1">
                4-digit PIN (scratch off the coating to reveal)
              </p>
            </div>
          </div>

          {/* Balance display */}
          {giftCardBalance !== null && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Gift className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-800">Gift Card Balance</span>
              </div>
              <div className="text-2xl font-bold text-green-900">
                ${giftCardBalance.toFixed(2)}
              </div>
              {giftCardBalance >= selectedPlan.pricePerMonth ? (
                <p className="text-green-700 text-sm mt-1">
                  ✓ Sufficient balance for {selectedPlan.name} plan
                </p>
              ) : (
                <p className="text-red-600 text-sm mt-1">
                  ⚠ Insufficient balance (need {selectedPlan.price}/month)
                </p>
              )}
            </div>
          )}

          {/* Error message */}
          {errors.general && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm">{errors.general}</p>
            </div>
          )}

          {/* Info box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">How it works:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Gift card balance will be applied to your monthly subscription</li>
                  <li>• When balance runs out, you'll need to add a payment method</li>
                  <li>• No expiration date on unused balance</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full py-4 rounded text-lg font-medium transition-colors ${
              isProcessing
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                : giftCardBalance === null
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-netflix text-white hover:bg-red-700'
            }`}
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                {giftCardBalance === null ? 'Checking Balance...' : 'Starting Membership...'}
              </span>
            ) : giftCardBalance === null ? (
              'Check Balance'
            ) : (
              'Start Membership'
            )}
          </button>
        </form>

        {/* Demo note */}
        <div className="text-xs text-gray-600 text-center mt-6">
          <p className="mb-2">
            <strong>Demo Mode:</strong> Use any gift code (min 10 characters) and PIN (4 digits) to continue.
          </p>
          <p>
            By continuing, you agree to Netflix's{' '}
            <span className="text-blue-600 cursor-pointer">Terms of Use</span>.
          </p>
        </div>
      </div>
    </div>
  )
}

export default GiftCardPayment