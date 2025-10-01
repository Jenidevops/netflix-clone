import { X, Play, Plus, Check, ThumbsUp } from 'lucide-react'

export default function Modal({ content, onClose, isInMyList, toggleMyList }) {
  if (!content) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={onClose}>
      <div className="bg-zinc-900 rounded-lg max-w-4xl w-full mx-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="relative h-96">
          <img
            src={content.image}
            alt={content.title}
            className="w-full h-full object-contain bg-black"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-zinc-900 rounded-full p-2 hover:bg-zinc-800"
          >
            <X size={24} />
          </button>
          <div className="absolute bottom-8 left-8 right-8">
            <h2 className="text-4xl font-bold mb-4">{content.title}</h2>
            <div className="flex space-x-4">
              <button className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded hover:bg-gray-200 font-semibold">
                <Play size={24} fill="black" />
                <span>Play</span>
              </button>
              <button 
                onClick={() => toggleMyList(content)}
                className="border-2 border-white rounded-full p-3 hover:bg-white/10"
              >
                {isInMyList ? <Check size={24} /> : <Plus size={24} />}
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
                <span className="text-green-500 font-semibold">{content.match}% Match</span>
                <span>{content.year}</span>
                <span className="border border-gray-400 px-2">{content.rating}</span>
                <span>{content.duration}</span>
                <span className="border border-gray-400 px-2">HD</span>
              </div>
              <p className="text-gray-300 mb-4">
                Experience an incredible story filled with suspense, drama, and unforgettable characters. This critically acclaimed series has captivated audiences worldwide with its gripping narrative and stunning visuals.
              </p>
            </div>
            <div className="w-64 text-sm space-y-3">
              <div>
                <span className="text-gray-400">Cast: </span>
                <span>Millie Bobby Brown, Finn Wolfhard, Winona Ryder</span>
              </div>
              <div>
                <span className="text-gray-400">Genres: </span>
                <span>Sci-Fi, Horror, Drama, Mystery</span>
              </div>
              <div>
                <span className="text-gray-400">This show is: </span>
                <span>Suspenseful, Dark, Thrilling</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
