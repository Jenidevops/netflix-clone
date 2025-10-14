import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, CreditCard, Lock, Info } from 'lucide-react'

const CreditCardPayment = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { email, selectedPlan, paymentMethod } = location.state || {}

  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    // Billing address
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    phone: ''
  })

  const [errors, setErrors] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)

  const formatCardNumber = (value) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '')
    // Add spaces every 4 digits
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ')
  }

  const formatExpiryDate = (value) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '')
    // Add slash after month
    if (digits.length >= 2) {
      return digits.substring(0, 2) + '/' + digits.substring(2, 4)
    }
    return digits
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    let formattedValue = value

    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value).substring(0, 19) // 16 digits + 3 spaces
    } else if (name === 'expiryDate') {
      formattedValue = formatExpiryDate(value)
    } else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4)
    } else if (name === 'zipCode') {
      formattedValue = value.replace(/\D/g, '').substring(0, 5)
    } else if (name === 'phone') {
      formattedValue = value.replace(/\D/g, '').substring(0, 10)
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

  const validateForm = () => {
    const newErrors = {}

    // Card validation
    if (!formData.cardNumber.replace(/\s/g, '')) {
      newErrors.cardNumber = 'Card number is required'
    } else if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Card number must be 16 digits'
    }

    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required'
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Invalid expiry date format'
    } else {
      // Check if date is in the future
      const [month, year] = formData.expiryDate.split('/')
      const currentDate = new Date()
      const cardDate = new Date(2000 + parseInt(year), parseInt(month) - 1)
      if (cardDate <= currentDate) {
        newErrors.expiryDate = 'Card has expired'
      }
    }

    if (!formData.cvv) {
      newErrors.cvv = 'CVV is required'
    } else if (formData.cvv.length < 3) {
      newErrors.cvv = 'CVV must be 3-4 digits'
    }

    if (!formData.nameOnCard) {
      newErrors.nameOnCard = 'Name on card is required'
    }

    // Billing address validation
    if (!formData.firstName) newErrors.firstName = 'First name is required'
    if (!formData.lastName) newErrors.lastName = 'Last name is required'
    if (!formData.address) newErrors.address = 'Address is required'
    if (!formData.city) newErrors.city = 'City is required'
    if (!formData.state) newErrors.state = 'State is required'
    if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required'
    if (!formData.phone) newErrors.phone = 'Phone number is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Mock payment success
    navigate('/payment-confirmation', {
      state: {
        email,
        selectedPlan,
        paymentMethod,
        paymentDetails: {
          cardLast4: formData.cardNumber.slice(-4),
          nameOnCard: formData.nameOnCard
        }
      }
    })
  }

  const goBack = () => {
    navigate('/payment-method', { state: { email, selectedPlan } })
  }

  const getCardType = (number) => {
    const cleaned = number.replace(/\s/g, '')
    if (cleaned.startsWith('4')) return 'Visa'
    if (cleaned.startsWith('5')) return 'Mastercard'
    if (cleaned.startsWith('3')) return 'American Express'
    return 'Card'
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
            Set up your credit or debit card
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Lock className="w-4 h-4" />
            <span className="text-sm">Secured with SSL encryption</span>
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

        {/* Payment form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Card Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900">Card Information</h2>
            
            <div>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="Card number"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-netflix ${
                  errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.cardNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
              )}
              {formData.cardNumber && (
                <p className="text-gray-600 text-sm mt-1">{getCardType(formData.cardNumber)}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-netflix ${
                    errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.expiryDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
                )}
              </div>
              <div>
                <div className="relative">
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="CVV"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-netflix ${
                      errors.cvv ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  <Info className="w-4 h-4 absolute right-3 top-4 text-gray-400" />
                </div>
                {errors.cvv && (
                  <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                )}
              </div>
            </div>

            <div>
              <input
                type="text"
                name="nameOnCard"
                value={formData.nameOnCard}
                onChange={handleInputChange}
                placeholder="Name on card"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-netflix ${
                  errors.nameOnCard ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.nameOnCard && (
                <p className="text-red-500 text-sm mt-1">{errors.nameOnCard}</p>
              )}
            </div>
          </div>

          {/* Billing Address */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900">Billing Address</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First name"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-netflix ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last name"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-netflix ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Address"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-netflix ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-netflix ${
                  errors.city ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="State"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-netflix ${
                    errors.state ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  placeholder="ZIP code"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-netflix ${
                    errors.zipCode ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.zipCode && (
                  <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
                )}
              </div>
            </div>

            <div>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone number"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-netflix ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full py-4 rounded text-lg font-medium transition-colors ${
              isProcessing
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                : 'bg-netflix text-white hover:bg-red-700'
            }`}
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Processing Payment...
              </span>
            ) : (
              'Start Membership'
            )}
          </button>
        </form>

        {/* Security notice */}
        <div className="text-xs text-gray-600 text-center mt-6">
          <p>
            By clicking "Start Membership", you agree to our{' '}
            <span className="text-blue-600 cursor-pointer">Terms of Use</span> and that you are over 18. Netflix will automatically continue your membership and charge the membership fee to your payment method until you cancel.
          </p>
        </div>
      </div>
    </div>
  )
}

export default CreditCardPayment