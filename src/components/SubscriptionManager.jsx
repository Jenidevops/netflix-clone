import { useState } from 'react'
import { useSubscription } from '../context/SubscriptionContext'
import { Check, CreditCard, Calendar, AlertTriangle, Gift, Smartphone, Settings, X } from 'lucide-react'

const SubscriptionManager = ({ isOpen, onClose }) => {
  const { 
    subscription, 
    isSubscriptionActive, 
    subscriptionStatus, 
    remainingDays,
    cancelSubscription,
    updateSubscription
  } = useSubscription()

  const [showCancelConfirm, setShowCancelConfirm] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  if (!isOpen) return null

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'cancelled': return 'text-orange-600 bg-orange-100'
      case 'expired': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Active'
      case 'cancelled': return 'Cancelled'
      case 'expired': return 'Expired'
      default: return 'Unknown'
    }
  }

  const getPaymentIcon = () => {
    switch (subscription?.paymentMethod) {
      case 'credit-card':
        return <CreditCard className="w-5 h-5" />
      case 'paypal':
        return <Smartphone className="w-5 h-5" />
      case 'gift-card':
        return <Gift className="w-5 h-5" />
      default:
        return <CreditCard className="w-5 h-5" />
    }
  }

  const getPaymentMethodName = () => {
    switch (subscription?.paymentMethod) {
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
    switch (subscription?.paymentMethod) {
      case 'credit-card':
        return `•••• •••• •••• ${subscription?.paymentDetails?.cardLast4 || '****'}`
      case 'paypal':
        return subscription?.paymentDetails?.paypalEmail || 'PayPal Account'
      case 'gift-card':
        return `Balance: $${subscription?.paymentDetails?.remainingBalance?.toFixed(2) || '0.00'}`
      default:
        return 'No payment method'
    }
  }

  const handleCancelSubscription = async () => {
    setIsUpdating(true)
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
    cancelSubscription()
    setShowCancelConfirm(false)
    setIsUpdating(false)
  }

  const handleReactivate = async () => {
    setIsUpdating(true)
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
    updateSubscription({ status: 'active' })
    setIsUpdating(false)
  }

  if (!subscription) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">No Subscription Found</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-gray-600 mb-4">
            You don't have an active subscription. Please sign up for a plan to continue.
          </p>
          <button
            onClick={onClose}
            className="w-full bg-netflix text-white py-2 rounded hover:bg-red-700"
          >
            Close
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-semibold">Manage Subscription</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium mb-2">Subscription Status</h3>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(subscriptionStatus)}`}>
                  {getStatusText(subscriptionStatus)}
                </span>
                {isSubscriptionActive && (
                  <span className="text-gray-600 text-sm">
                    {remainingDays} days remaining
                  </span>
                )}
              </div>
            </div>
            <Settings className="w-6 h-6 text-gray-400" />
          </div>

          {/* Plan Details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium mb-3">Current Plan</h3>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-lg">{subscription.plan?.name} Plan</p>
                <p className="text-gray-600">{subscription.plan?.resolution}</p>
                <p className="text-gray-600">
                  {subscription.plan?.devices} device{subscription.plan?.devices > 1 ? 's' : ''} at a time
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">{subscription.plan?.price}</p>
                <p className="text-gray-600 text-sm">/month</p>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="font-medium mb-3">Payment Method</h3>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  {getPaymentIcon()}
                </div>
                <div>
                  <p className="font-medium">{getPaymentMethodName()}</p>
                  <p className="text-gray-600 text-sm">{getPaymentDetails()}</p>
                </div>
              </div>
              <button className="text-blue-600 hover:underline text-sm">
                Update
              </button>
            </div>
          </div>

          {/* Billing Info */}
          <div>
            <h3 className="font-medium mb-3">Billing Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Next billing date:</span>
                <span>{new Date(subscription.nextBillingDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Account email:</span>
                <span>{subscription.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Member since:</span>
                <span>{new Date(subscription.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Plan Features */}
          <div>
            <h3 className="font-medium mb-3">What's included</h3>
            <div className="grid grid-cols-1 gap-2">
              {subscription.plan?.features?.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t">
            {subscriptionStatus === 'active' ? (
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  Change Plan
                </button>
                <button 
                  onClick={() => setShowCancelConfirm(true)}
                  className="w-full border border-red-300 text-red-600 py-3 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Cancel Subscription
                </button>
              </div>
            ) : subscriptionStatus === 'cancelled' ? (
              <button 
                onClick={handleReactivate}
                disabled={isUpdating}
                className="w-full bg-netflix text-white py-3 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {isUpdating ? 'Reactivating...' : 'Reactivate Subscription'}
              </button>
            ) : (
              <button className="w-full bg-netflix text-white py-3 rounded-lg hover:bg-red-700 transition-colors">
                Renew Subscription
              </button>
            )}
          </div>
        </div>

        {/* Cancel Confirmation Modal */}
        {showCancelConfirm && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
              <div className="text-center">
                <AlertTriangle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Cancel Subscription?</h3>
                <p className="text-gray-600 mb-6">
                  You'll continue to have access until your next billing date on{' '}
                  {new Date(subscription.nextBillingDate).toLocaleDateString()}.
                </p>
                <div className="space-y-2">
                  <button
                    onClick={handleCancelSubscription}
                    disabled={isUpdating}
                    className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 disabled:opacity-50"
                  >
                    {isUpdating ? 'Cancelling...' : 'Yes, Cancel'}
                  </button>
                  <button
                    onClick={() => setShowCancelConfirm(false)}
                    className="w-full border border-gray-300 py-2 rounded hover:bg-gray-50"
                  >
                    Keep Subscription
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SubscriptionManager