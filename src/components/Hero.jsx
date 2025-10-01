import { Play, Info, Volume2, VolumeX } from 'lucide-react'
import { useState } from 'react'

export default function Hero({ content }) {
  const [isMuted, setIsMuted] = useState(true)

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0">
        <img
          src={content.image}
          alt={content.title}
          className="w-full h-full object-cover brightness-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
      <div className="relative z-10 flex flex-col justify-center h-full px-4 md:px-12 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{content.title}</h1>
        <p className="text-lg md:text-xl mb-6 text-gray-200">
          {content.description}
        </p>
        <div className="flex space-x-4">
          <button className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded hover:bg-gray-200 transition font-semibold">
            <Play size={24} fill="black" />
            <span>Play</span>
          </button>
          <button className="flex items-center space-x-2 bg-gray-500/70 px-8 py-3 rounded hover:bg-gray-500/50 transition font-semibold">
            <Info size={24} />
            <span>More Info</span>
          </button>
        </div>
        <div className="flex items-center space-x-2 mt-4">
          <span className="border border-gray-400 px-2 py-1 text-sm">{content.rating}</span>
          <span className="text-sm">{content.duration}</span>
          <span className="text-sm">• {content.genres.join(' • ')}</span>
        </div>
      </div>
      <button 
        onClick={() => setIsMuted(!isMuted)}
        className="absolute bottom-32 right-12 z-20 border-2 border-white rounded-full p-2 hover:bg-white/10 transition"
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>
    </div>
  )
}
