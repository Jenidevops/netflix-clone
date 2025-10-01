import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, Tv, Download, Users, Smartphone, ChevronLeft, ChevronRight as ChevronRightIcon, X, Play, Plus, ThumbsUp } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function GetStarted() {
  const [email, setEmail] = useState('')
  const [selectedMovie, setSelectedMovie] = useState(null)
  const navigate = useNavigate()
  const carouselRef = useRef(null)

  const handleGetStarted = (e) => {
    e.preventDefault()
    if (email) {
      navigate('/signup', { state: { email } })
    }
  }

  const top10Movies = [
    { id: 7, title: 'Wednesday', image: '/src/images/top10inUStoday/wednesday.png', rank: 1, match: 96, year: 2024, rating: 'TV-14', duration: '1 Season' },
    { id: 8, title: 'Alice in Wonderland', image: '/src/images/top10inUStoday/Aliceinwonderland.png', rank: 2, match: 94, year: 2023, rating: 'TV-MA', duration: '2 Seasons' },
    { id: 9, title: 'Beauty in Black', image: '/src/images/top10inUStoday/Beautyinblack.png', rank: 3, match: 88, year: 2024, rating: 'TV-MA', duration: '4 Seasons' },
    { id: 10, title: 'Black Rabbit', image: '/src/images/top10inUStoday/BlackRabbit.png', rank: 4, match: 93, year: 2023, rating: 'TV-MA', duration: '4 Seasons' },
    { id: 11, title: 'Happy Gilmore 2', image: '/src/images/top10inUStoday/HappyGilmore2.png', rank: 5, match: 90, year: 2023, rating: 'TV-MA', duration: '3 Seasons' },
    { id: 12, title: 'Kpop Hunters', image: '/src/images/top10inUStoday/Kpophunters.png', rank: 6, match: 99, year: 2024, rating: 'TV-MA', duration: '1 Season' },
    { id: 13, title: 'NCIS', image: '/src/images/top10inUStoday/NCIS.png', rank: 7, match: 95, year: 2023, rating: 'TV-14', duration: '20 Seasons' },
    { id: 14, title: 'Nepeece', image: '/src/images/top10inUStoday/Nepeece.png', rank: 8, match: 92, year: 2024, rating: 'TV-MA', duration: '1 Season' },
    { id: 15, title: 'Ruth & Boaz', image: '/src/images/top10inUStoday/Ruth&boaz.png', rank: 9, match: 89, year: 2023, rating: 'TV-MA', duration: '1 Season' },
    { id: 16, title: 'Unknown Numbers', image: '/src/images/top10inUStoday/Unknownnumbers.png', rank: 10, match: 91, year: 2024, rating: 'TV-MA', duration: '1 Season' },
  ]

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <div className="bg-black text-white">
      <Navbar showLinks={false} />
      
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="/src/images/heroimage.png"
            alt="Netflix Background"
            className="w-full h-full object-cover brightness-110"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/10 via-white/5 to-transparent rounded-t-full shadow-2xl shadow-white/20"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 max-w-4xl">
            Unlimited movies, TV shows, and more
          </h1>
          <p className="text-xl md:text-2xl mb-6">
            Watch anywhere. Cancel anytime.
          </p>
          <p className="text-lg md:text-xl mb-8">
            Ready to watch? Enter your email to create or restart your membership.
          </p>
          
          <form onSubmit={handleGetStarted} className="flex flex-col md:flex-row gap-4 w-full max-w-2xl">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 text-lg bg-black/50 border border-gray-400 rounded focus:outline-none focus:border-white"
              required
            />
            <button 
              type="submit"
              className="flex items-center justify-center space-x-2 bg-netflix px-8 py-4 text-lg font-semibold rounded hover:bg-red-700 transition"
            >
              <span>Get Started</span>
              <ChevronRight size={24} />
            </button>
          </form>
        </div>
      </div>

      {/* Top 10 Movies Carousel */}
      <div className="border-t-8 border-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Top 10 Movies Today</h2>
          <div className="relative group">
            <button
              onClick={() => scrollCarousel('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 p-3 rounded-full opacity-0 group-hover:opacity-100 transition"
            >
              <ChevronLeft size={32} />
            </button>
            <div
              ref={carouselRef}
              className="flex space-x-4 overflow-x-scroll scrollbar-hide scroll-smooth px-12"
            >
              {top10Movies.map((movie) => (
                <div 
                  key={movie.id} 
                  className="relative flex-none w-48 group/card cursor-pointer"
                  onClick={() => setSelectedMovie(movie)}
                >
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-full object-contain rounded-lg shadow-2xl transition-transform duration-300 group-hover/card:scale-105"
                  />
                  <div className="absolute -bottom-4 -left-4 text-8xl font-black text-white" style={{ 
                    textShadow: '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, 0 0 20px rgba(0,0,0,0.8)' 
                  }}>
                    {movie.rank}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition rounded-lg flex items-end p-4">
                    <h3 className="text-lg font-semibold">{movie.title}</h3>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => scrollCarousel('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 p-3 rounded-full opacity-0 group-hover:opacity-100 transition"
            >
              <ChevronRightIcon size={32} />
            </button>
          </div>
        </div>
      </div>

      {/* Features Section - 4 Grid in a Row */}
      <div className="border-t-8 border-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">More Reasons to Join</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-purple-900 to-purple-700 rounded-lg p-6 text-center hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
              <div className="flex justify-center mb-4">
                <Tv size={64} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Enjoy on your TV</h3>
              <p className="text-sm text-gray-200">
                Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, and more.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-red-900 to-red-700 rounded-lg p-6 text-center hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
              <div className="flex justify-center mb-4">
                <Download size={64} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Download shows</h3>
              <p className="text-sm text-gray-200">
                Save your favorites easily and always have something to watch.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg p-6 text-center hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
              <div className="flex justify-center mb-4">
                <Smartphone size={64} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Watch everywhere</h3>
              <p className="text-sm text-gray-200">
                Stream on your phone, tablet, laptop, and TV without paying more.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-yellow-900 to-yellow-700 rounded-lg p-6 text-center hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
              <div className="flex justify-center mb-4">
                <Users size={64} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Create profiles for kids</h3>
              <p className="text-sm text-gray-200">
                Send kids on adventures with their favorite characters in a safe space.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="border-t-8 border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {[
              { q: 'What is Netflix?', a: 'Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.' },
              { q: 'How much does Netflix cost?', a: 'Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from $6.99 to $19.99 a month.' },
              { q: 'Where can I watch?', a: 'Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device.' },
              { q: 'How do I cancel?', a: 'Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks.' },
            ].map((faq, index) => (
              <details key={index} className="bg-gray-800 mb-2">
                <summary className="text-xl md:text-2xl p-6 cursor-pointer hover:bg-gray-700 transition">
                  {faq.q}
                </summary>
                <div className="p-6 pt-0 text-lg md:text-xl text-gray-300 border-t border-black">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-lg md:text-xl mb-8">
              Ready to watch? Enter your email to create or restart your membership.
            </p>
            <form onSubmit={handleGetStarted} className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 text-lg bg-black/50 border border-gray-400 rounded focus:outline-none focus:border-white"
                required
              />
              <button 
                type="submit"
                className="flex items-center justify-center space-x-2 bg-netflix px-8 py-4 text-lg font-semibold rounded hover:bg-red-700 transition"
              >
                <span>Get Started</span>
                <ChevronRight size={24} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Movie Modal */}
      {selectedMovie && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={() => setSelectedMovie(null)}>
          <div className="bg-zinc-900 rounded-lg max-w-4xl w-full mx-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-96">
              <img
                src={selectedMovie.image}
                alt={selectedMovie.title}
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
              <button
                onClick={() => setSelectedMovie(null)}
                className="absolute top-4 right-4 bg-zinc-900 rounded-full p-2 hover:bg-zinc-800"
              >
                <X size={24} />
              </button>
              <div className="absolute bottom-8 left-8 right-8">
                <h2 className="text-4xl font-bold mb-4">{selectedMovie.title}</h2>
                <div className="flex space-x-4">
                  <button className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded hover:bg-gray-200 font-semibold">
                    <Play size={24} fill="black" />
                    <span>Play</span>
                  </button>
                  <button className="border-2 border-white rounded-full p-3 hover:bg-white/10">
                    <Plus size={24} />
                  </button>
                  <button className="border-2 border-white rounded-full p-3 hover:bg-white/10">
                    <ThumbsUp size={24} />
                  </button>
                </div>
              </div>
            </div>
            <div className="p-8">
              <div className="flex space-x-8">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-4 text-sm">
                    <span className="text-green-500 font-semibold">{selectedMovie.match}% Match</span>
                    <span>{selectedMovie.year}</span>
                    <span className="border border-gray-400 px-2">{selectedMovie.rating}</span>
                    <span>{selectedMovie.duration}</span>
                    <span className="border border-gray-400 px-2">HD</span>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Experience an incredible story filled with suspense, drama, and unforgettable characters. This critically acclaimed series has captivated audiences worldwide with its gripping narrative and stunning visuals.
                  </p>
                </div>
                <div className="w-64 text-sm space-y-3">
                  <div>
                    <span className="text-gray-400">Cast: </span>
                    <span>Talented ensemble cast</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Genres: </span>
                    <span>Drama, Thriller, Mystery</span>
                  </div>
                  <div>
                    <span className="text-gray-400">This show is: </span>
                    <span>Suspenseful, Thrilling, Captivating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
