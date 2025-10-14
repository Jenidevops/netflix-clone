import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import heroimage from '../images/heroimage.png'

export default function SignUp({ setIsAuthenticated }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(false)
  const [formData, setFormData] = useState({
    email: location.state?.email || '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simple mock authentication - accept any email/password
    if (formData.email && formData.password.length >= 4) {
      // Set authentication in localStorage and state
      localStorage.setItem('netflix-authenticated', 'true')
      setIsAuthenticated(true)
      // Redirect to subscription plans instead of directly to browse
      navigate('/subscription-plans', { state: { email: formData.email } })
    } else {
      alert('Please enter a valid email and password (min 4 characters)')
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background with overlay */}
      <div className="fixed inset-0 z-0">
        <img
          src={heroimage}
          alt="Netflix Background"
          className="w-full h-full object-cover brightness-125"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Navbar */}
      <div className="relative z-10">
        <Navbar showLinks={false} />
      </div>
      
      {/* Content */}
      <div className="relative z-5 flex-1 flex items-center justify-center px-4 py-20">
          <div className="bg-black/75 backdrop-blur-sm rounded-lg p-12 w-full max-w-md border border-gray-800 min-h-[700px]">
            <h1 className="text-3xl font-bold text-white mb-8">
              {isLogin ? 'Sign In' : 'Sign Up'}
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className="w-full px-4 py-4 border border-gray-600 rounded focus:outline-none focus:border-white text-white bg-gray-800/50 placeholder-gray-400"
                  required
                />
              </div>
              
              <div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full px-4 py-4 border border-gray-600 rounded focus:outline-none focus:border-white text-white bg-gray-800/50 placeholder-gray-400"
                  required
                  minLength={4}
                />
              </div>

              <div className="flex items-center justify-between text-sm text-gray-400">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-netflix rounded" />
                  <span>Remember me</span>
                </label>
                <button type="button" className="hover:underline">Forgot Password?</button>
              </div>

              <button
                type="submit"
                className="w-full bg-netflix text-white py-4 rounded text-lg font-semibold hover:bg-red-700 transition"
              >
                {isLogin ? 'Sign In' : 'Sign Up'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                {isLogin ? "New to Netflix? " : "Already have an account? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-white hover:underline font-semibold"
                >
                  {isLogin ? 'Sign up now' : 'Sign in'}
                </button>
              </p>
            </div>

          <div className="mt-8 text-xs text-gray-500">
            <p className="mb-2">
              This is a demo. Enter any email and password (min 4 characters) to continue.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-auto">
        <Footer />
      </div>
    </div>
  )
}