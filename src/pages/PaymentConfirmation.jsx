import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Check, CreditCard, Mail, Calendar, Gift, Smartphone } from 'lucide-react'
import { useSubscription } from '../context/SubscriptionContext'

const PaymentConfirmation = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { email, selectedPlan, paymentMethod, paymentDetails } = location.state || {}
  const { createSubscription } = useSubscription()
  
  const [countdown, setCountdown] = useState(3)
  const [autoRedirect, setAutoRedirect] = useState(true)

  // Create subscription when component mounts
  useEffect(() => {
    if (selectedPlan && email && paymentMethod) {
      createSubscription({
        email,
        plan: selectedPlan,
        paymentMethod,
        paymentDetails
      })
    }
  }, [selectedPlan, email, paymentMethod, paymentDetails, createSubscription])

  useEffect(() => {
    if (autoRedirect && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (autoRedirect && countdown === 0) {
      // Set authentication in localStorage to allow access to browse page
      localStorage.setItem('netflix-authenticated', 'true')
      console.log('Auto-redirect: Authentication set, navigating to browse...')
      navigate('/browse')
    }
  }, [countdown, autoRedirect, navigate])

  const getPaymentIcon = () => {
    switch (paymentMethod) {
      case 'credit-card':
        return <CreditCard className="w-6 h-6" />
      case 'paypal':
        return <Smartphone className="w-6 h-6" />
      case 'gift-card':
        return <Gift className="w-6 h-6" />
      default:
        return <CreditCard className="w-6 h-6" />
    }
  }

  const getPaymentMethodName = () => {
    switch (paymentMethod) {
      case 'credit-card':
        return 'Credit Card'
      case 'paypal':
        return 'PayPal'
      case 'gift-card':
        return 'Gift Card'
      default:
        return 'Payment Method'
    }
  }

  const getPaymentDetails = () => {
    switch (paymentMethod) {
      case 'credit-card':
        return `•••• •••• •••• ${paymentDetails?.cardLast4 || '1234'}`
      case 'paypal':
        return paymentDetails?.paypalEmail || 'PayPal Account'
      case 'gift-card':
        return `Gift Card Balance: $${paymentDetails?.remainingBalance?.toFixed(2) || '45.01'}`
      default:
        return ''
    }
  }

  const startWatching = () => {
    setAutoRedirect(false)
    // Set authentication in localStorage to allow access to browse page
    localStorage.setItem('netflix-authenticated', 'true')
    console.log('Authentication set, navigating to browse...')
    navigate('/browse')
  }

  if (!selectedPlan) {
    navigate('/subscription-plans')
    return null
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 px-4 py-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-netflix text-2xl font-bold">NETFLIX</div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Success icon and message */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Netflix!
          </h1>
          
          <p className="text-lg text-gray-600 mb-2">
            Your subscription is now active!
          </p>
          
          <p className="text-gray-600">
            Get ready to enjoy unlimited movies and TV shows.
          </p>
        </div>

        {/* Subscription details */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Subscription Details
          </h2>

          <div className="space-y-4">
            {/* Plan */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-netflix rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{selectedPlan.name} Plan</p>
                  <p className="text-sm text-gray-600">{selectedPlan.resolution} • {selectedPlan.devices} device{selectedPlan.devices > 1 ? 's' : ''}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{selectedPlan.price}</p>
                <p className="text-sm text-gray-600">/month</p>
              </div>
            </div>

            {/* Payment method */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  {getPaymentIcon()}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{getPaymentMethodName()}</p>
                  <p className="text-sm text-gray-600">{getPaymentDetails()}</p>
                </div>
              </div>
              <button className="text-blue-600 text-sm hover:underline">
                Change
              </button>
            </div>

            {/* Email */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Account Email</p>
                  <p className="text-sm text-gray-600">{email || 'user@example.com'}</p>
                </div>
              </div>
              <button className="text-blue-600 text-sm hover:underline">
                Change
              </button>
            </div>
          </div>
        </div>

        {/* Next billing */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <h3 className="font-medium text-blue-900 mb-2">Next Billing Date</h3>
          <p className="text-blue-800">
            {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          <p className="text-sm text-blue-700 mt-1">
            You can cancel anytime before your next billing date.
          </p>
        </div>

        {/* What's included */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            What's included with your {selectedPlan.name} plan
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedPlan.features?.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-4">
          <button
            onClick={startWatching}
            className="w-full bg-netflix text-white py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Start Watching Now
          </button>

          {autoRedirect && (
            <div className="text-center">
              <p className="text-gray-600 text-sm">
                Automatically redirecting in {countdown} seconds
              </p>
              <button
                onClick={() => setAutoRedirect(false)}
                className="text-blue-600 text-sm hover:underline"
              >
                Cancel auto-redirect
              </button>
            </div>
          )}
        </div>

        {/* Additional info */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="font-medium text-gray-900 mb-4">Getting Started</h3>
          
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-netflix rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <p>
                <strong>Download the Netflix app</strong> on your devices to watch anywhere
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-netflix rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <p>
                <strong>Create up to 5 profiles</strong> for different family members
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-netflix rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">3</span>
              </div>
              <p>
                <strong>Set up parental controls</strong> to keep kids safe
              </p>
            </div>
          </div>
        </div>

        {/* Support links */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
          <p>
            Need help? Visit our{' '}
            <span className="text-blue-600 cursor-pointer hover:underline">Help Center</span>{' '}
            or{' '}
            <span className="text-blue-600 cursor-pointer hover:underline">contact us</span>.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PaymentConfirmation