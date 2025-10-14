import { createContext, useContext, useState, useEffect } from 'react'

const SubscriptionContext = createContext()

export const useSubscription = () => {
  const context = useContext(SubscriptionContext)
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider')
  }
  return context
}

export const SubscriptionProvider = ({ children }) => {
  const [subscription, setSubscription] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load subscription from localStorage on mount
    const savedSubscription = localStorage.getItem('netflix-subscription')
    if (savedSubscription) {
      try {
        setSubscription(JSON.parse(savedSubscription))
      } catch (error) {
        console.error('Error parsing subscription data:', error)
        localStorage.removeItem('netflix-subscription')
      }
    }
    setIsLoading(false)
  }, [])

  const createSubscription = (subscriptionData) => {
    const newSubscription = {
      id: `sub_${Date.now()}`,
      ...subscriptionData,
      createdAt: new Date().toISOString(),
      status: 'active',
      nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    }
    
    setSubscription(newSubscription)
    localStorage.setItem('netflix-subscription', JSON.stringify(newSubscription))
    return newSubscription
  }

  const updateSubscription = (updates) => {
    if (!subscription) return null
    
    const updatedSubscription = {
      ...subscription,
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    
    setSubscription(updatedSubscription)
    localStorage.setItem('netflix-subscription', JSON.stringify(updatedSubscription))
    return updatedSubscription
  }

  const cancelSubscription = () => {
    if (!subscription) return null
    
    const cancelledSubscription = {
      ...subscription,
      status: 'cancelled',
      cancelledAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    setSubscription(cancelledSubscription)
    localStorage.setItem('netflix-subscription', JSON.stringify(cancelledSubscription))
    return cancelledSubscription
  }

  const deleteSubscription = () => {
    setSubscription(null)
    localStorage.removeItem('netflix-subscription')
  }

  const isSubscriptionActive = () => {
    if (!subscription) return false
    if (subscription.status !== 'active') return false
    
    // Check if subscription has expired (for demo purposes)
    const nextBilling = new Date(subscription.nextBillingDate)
    const now = new Date()
    return nextBilling > now
  }

  const getSubscriptionStatus = () => {
    if (!subscription) return 'none'
    if (subscription.status === 'cancelled') return 'cancelled'
    if (!isSubscriptionActive()) return 'expired'
    return 'active'
  }

  const getRemainingDays = () => {
    if (!subscription || !isSubscriptionActive()) return 0
    
    const nextBilling = new Date(subscription.nextBillingDate)
    const now = new Date()
    const diffTime = nextBilling - now
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(0, diffDays)
  }

  const value = {
    // State
    subscription,
    isLoading,
    
    // Actions
    createSubscription,
    updateSubscription,
    cancelSubscription,
    deleteSubscription,
    
    // Computed values
    isSubscriptionActive: isSubscriptionActive(),
    subscriptionStatus: getSubscriptionStatus(),
    remainingDays: getRemainingDays(),
  }

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  )
}

export default SubscriptionContext