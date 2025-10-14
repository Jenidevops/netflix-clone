import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Check } from 'lucide-react'

const SubscriptionPlans = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const userEmail = location.state?.email || ''
  
  const [selectedPlan, setSelectedPlan] = useState('standard') // Default to Standard like Netflix

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '$6.99',
      pricePerMonth: 6.99,
      features: [
        'Watch on 1 device at a time',
        'Download on 1 device at a time',
        'Good video quality',
        'Resolution: 720p',
        'Supported devices: Phone, Tablet, Computer, TV'
      ],
      quality: 'Good',
      resolution: '720p',
      devices: 1
    },
    {
      id: 'standard',
      name: 'Standard',
      price: '$15.49',
      pricePerMonth: 15.49,
      features: [
        'Watch on 2 devices at the same time',
        'Download on 2 devices at a time',
        'Better video quality',
        'Resolution: 1080p',
        'Supported devices: Phone, Tablet, Computer, TV',
        'Ad-free experience'
      ],
      quality: 'Better',
      resolution: '1080p',
      devices: 2,
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$22.99',
      pricePerMonth: 22.99,
      features: [
        'Watch on 4 devices at the same time',
        'Download on 6 devices at a time',
        'Best video and audio quality',
        'Resolution: 4K + HDR',
        'Supported devices: Phone, Tablet, Computer, TV',
        'Spatial audio experience'
      ],
      quality: 'Best',
      resolution: '4K + HDR',
      devices: 4
    }
  ]

  const handleContinue = () => {
    const plan = plans.find(p => p.id === selectedPlan)
    navigate('/payment-method', { 
      state: { 
        email: userEmail,
        selectedPlan: plan 
      } 
    })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 px-4 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-netflix text-2xl font-bold">NETFLIX</div>
          <button 
            onClick={() => navigate('/signup')}
            className="text-gray-600 hover:text-gray-800"
          >
            Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-netflix rounded-full"></div>
            <div className="w-12 h-1 bg-netflix"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-12 h-1 bg-gray-300"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        {/* Title section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium text-gray-900 mb-4">
            Choose the plan that's right for you
          </h1>
          <div className="flex flex-wrap justify-center gap-4 text-lg text-gray-700">
            <div className="flex items-center gap-2">
              <Check className="w-6 h-6 text-netflix" />
              <span>Watch all you want. Ad-free.</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-6 h-6 text-netflix" />
              <span>Recommendations just for you.</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-6 h-6 text-netflix" />
              <span>Change or cancel your plan anytime.</span>
            </div>
          </div>
        </div>

        {/* Plans comparison table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
          {/* Mobile view - Cards */}
          <div className="md:hidden space-y-4 p-4">
            {plans.map((plan) => (
              <div key={plan.id} className="relative">
                {plan.popular && (
                  <div className="absolute -top-2 left-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                    Most Popular
                  </div>
                )}
                <div 
                  className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                    selectedPlan === plan.id 
                      ? 'border-netflix shadow-lg' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                      <p className="text-gray-600">{plan.quality} quality</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{plan.price}</div>
                      <div className="text-gray-600 text-sm">/month</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-gray-700">
                        <Check className="w-4 h-4 text-netflix flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Resolution:</span>
                      <span className="font-medium">{plan.resolution}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-gray-600">Devices:</span>
                      <span className="font-medium">{plan.devices}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop view - Table */}
          <div className="hidden md:block">
            <div className="grid grid-cols-4 gap-4 p-6 bg-gray-50 border-b">
              <div></div>
              {plans.map((plan) => (
                <div key={plan.id} className="text-center relative">
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <div 
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      selectedPlan === plan.id 
                        ? 'bg-netflix text-white' 
                        : 'bg-white border border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
                    <div className="text-2xl font-bold">{plan.price}</div>
                    <div className="text-sm opacity-75">/month</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="divide-y divide-gray-200">
              <div className="grid grid-cols-4 gap-4 p-4">
                <div className="font-medium text-gray-700">Monthly price</div>
                {plans.map((plan) => (
                  <div key={plan.id} className="text-center font-medium">{plan.price}</div>
                ))}
              </div>
              
              <div className="grid grid-cols-4 gap-4 p-4">
                <div className="font-medium text-gray-700">Video and sound quality</div>
                {plans.map((plan) => (
                  <div key={plan.id} className="text-center">{plan.quality}</div>
                ))}
              </div>
              
              <div className="grid grid-cols-4 gap-4 p-4">
                <div className="font-medium text-gray-700">Resolution</div>
                {plans.map((plan) => (
                  <div key={plan.id} className="text-center">{plan.resolution}</div>
                ))}
              </div>
              
              <div className="grid grid-cols-4 gap-4 p-4">
                <div className="font-medium text-gray-700">Watch on your TV, computer, mobile phone and tablet</div>
                {plans.map((plan) => (
                  <div key={plan.id} className="text-center">
                    <Check className="w-6 h-6 text-netflix mx-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Fine print */}
        <div className="text-sm text-gray-600 mb-8 space-y-2">
          <p>HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject to your internet service and device capabilities. Not all content is available in all resolutions. See our <span className="text-blue-600 cursor-pointer">Terms of Use</span> for more details.</p>
          <p>Only people who live with you may use your account. Watch on 4 different devices at the same time with Premium, 2 with Standard, and 1 with Basic.</p>
        </div>

        {/* Continue button */}
        <div className="flex justify-center">
          <button
            onClick={handleContinue}
            className="bg-netflix text-white px-8 py-4 rounded text-lg font-medium hover:bg-red-700 transition-colors min-w-[200px]"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionPlans