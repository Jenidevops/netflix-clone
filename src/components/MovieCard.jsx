import { Play, Plus, Check, ThumbsUp } from 'lucide-react'

export default function MovieCard({ item, onSelect, isInMyList, toggleMyList }) {
  return (
    <div
      className="relative flex-none w-48 h-48 cursor-pointer transition-transform duration-300 hover:scale-110 hover:z-30 group"
      onClick={() => onSelect(item)}
    >
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-contain rounded-lg shadow-2xl transition-transform duration-300 group-hover:scale-105"
      />
      {item.rank && (
        <div className="absolute bottom-0 left-0 text-8xl font-black text-white/20 -mb-4 -ml-2" style={{ textShadow: '2px 2px 4px black' }}>
          {item.rank}
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition rounded flex flex-col justify-end p-4">
        <h3 className="font-semibold text-sm mb-2">{item.title}</h3>
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-green-500 font-semibold">{item.match}% Match</span>
          <span className="border border-gray-400 px-1">{item.rating}</span>
          <span>{item.duration}</span>
        </div>
        <div className="flex space-x-2 mt-2">
          <button 
            onClick={(e) => {
              e.stopPropagation()
            }}
            className="bg-white text-black rounded-full p-1 hover:bg-gray-200"
          >
            <Play size={16} fill="black" />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation()
              toggleMyList(item)
            }}
            className="border-2 border-gray-400 rounded-full p-1 hover:border-white"
          >
            {isInMyList ? <Check size={16} /> : <Plus size={16} />}
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation()
            }}
            className="border-2 border-gray-400 rounded-full p-1 hover:border-white"
          >
            <ThumbsUp size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}