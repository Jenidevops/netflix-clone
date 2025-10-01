import { ChevronLeft, ChevronRight } from 'lucide-react'
import MovieCard from './MovieCard'
import { forwardRef } from 'react'

const ContentRow = forwardRef(({ category, onSelectContent = () => {}, myList = [], toggleMyList = () => {} }, ref) => {
  const scroll = (direction) => {
    const container = document.getElementById(`row-${category.id}`)
    const scrollAmount = direction === 'left' ? -800 : 800
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  const isInMyList = (itemId) => myList.some(item => item.id === itemId)

  return (
    <div ref={ref} className="px-4 md:px-12">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">{category.title}</h2>
      <div className="relative group">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-0 z-10 bg-black/50 w-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-black/70"
        >
          <ChevronLeft size={40} />
        </button>
        <div
          id={`row-${category.id}`}
          className="flex space-x-4 overflow-x-scroll scrollbar-hide scroll-smooth"
        >
          {category.items.map((item) => (
            <MovieCard
              key={item.id}
              item={item}
              onSelect={onSelectContent}
              isInMyList={isInMyList(item.id)}
              toggleMyList={toggleMyList}
            />
          ))}
        </div>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 z-10 bg-black/50 w-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-black/70"
        >
          <ChevronRight size={40} />
        </button>
      </div>
    </div>
  )
})

export default ContentRow
