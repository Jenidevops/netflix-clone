import { useState, useEffect, useRef } from 'react'
import { Search, Bell, ChevronDown, User, Settings, LogOut, CreditCard } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import netflixLogo from '../images/logo/netflixLogo.png'

export default function Navbar({ showLinks = true, onNavClick, onManageSubscription }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navLinks = ['Home', 'Trending', 'Top 10', 'Action', 'Comedies', 'Horror', 'Sci-Fiction']

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black to-transparent'}`}>
      <div className="flex items-center justify-between px-4 md:px-12 py-4">
        <div className="flex items-center space-x-8">
          <Link to="/">
            <img src={netflixLogo} alt="Netflix Logo" style={{ width: '167px', height: '45px', filter: 'brightness(1.2)' }} className="cursor-pointer" />
          </Link>
          {showLinks && (
            <div className="hidden md:flex space-x-6 text-sm">
              {navLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => onNavClick && onNavClick(link)}
                  className="hover:text-gray-300 focus:outline-none"
                >
                  {link}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
          {showLinks ? (
            <>
              <button className="hover:text-gray-300">
                <Search size={20} />
              </button>
              <button className="hover:text-gray-300">
                <Bell size={20} />
              </button>
              <div
                className="flex items-center space-x-2 cursor-pointer hover:text-gray-300"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className="w-8 h-8 bg-gray-600 rounded flex items-center justify-center">
                  <User size={20} className="text-white" />
                </div>
                <ChevronDown size={16} />
              </div>
              {showDropdown && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-black border border-gray-700 rounded shadow-lg z-50">
                  <ul className="text-sm text-gray-300">
                    <li className="px-4 py-2 hover:bg-gray-700 flex items-center space-x-2 cursor-pointer">
                      <User size={16} />
                      <span>Profile</span>
                    </li>
                    <li 
                      className="px-4 py-2 hover:bg-gray-700 flex items-center space-x-2 cursor-pointer"
                      onClick={() => {
                        setShowDropdown(false)
                        onManageSubscription && onManageSubscription()
                      }}
                    >
                      <CreditCard size={16} />
                      <span>Manage Subscription</span>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-700 flex items-center space-x-2 cursor-pointer">
                      <Settings size={16} />
                      <span>Settings</span>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-700 flex items-center space-x-2 cursor-pointer" onClick={() => {
                      // Clear authentication
                      localStorage.removeItem('netflix-authenticated')
                      localStorage.removeItem('netflix-subscription')
                      navigate('/')
                    }}>
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <button 
              onClick={() => navigate('/signup')}
              className="bg-netflix text-white px-4 py-2 rounded font-semibold hover:bg-red-700 transition"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
