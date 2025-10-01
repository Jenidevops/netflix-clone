import { useState, useRef } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ContentRow from '../components/ContentRow'
import Modal from '../components/Modal'
import Footer from '../components/Footer'
import { categories, heroContent } from '../data/mockData'

export default function Browse() {
  const [selectedContent, setSelectedContent] = useState(null)
  const [myList, setMyList] = useState([])
  const [currentHeroContent, setCurrentHeroContent] = useState(heroContent)
  const sectionRefs = useRef({})

  const toggleMyList = (item) => {
    setMyList(prev => 
      prev.some(i => i.id === item.id) 
        ? prev.filter(i => i.id !== item.id)
        : [...prev, item]
    )
  }

  const isInMyList = (itemId) => myList.some(item => item.id === itemId)

  const handleNavClick = (link) => {
    let category

    switch (link) {
      case 'Home':
        setCurrentHeroContent(heroContent)
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      case 'Trending':
        category = categories.find(cat => cat.id === 'trending')
        break
      case 'Top 10':
        category = categories.find(cat => cat.id === 'top10')
        break
      case 'Action':
        category = categories.find(cat => cat.id === 'action')
        break
      case 'Comedies':
        category = categories.find(cat => cat.id === 'comedy')
        break
      case 'Horror':
        category = categories.find(cat => cat.id === 'horror')
        break
      case 'Sci-Fiction':
        category = categories.find(cat => cat.id === 'sci-fi')
        break
      default:
        category = null
    }

    if (category && category.items && category.items.length > 0) {
      const firstItem = category.items[0]
      
      setCurrentHeroContent({
        title: firstItem.title,
        description: `Explore the best in ${category.title}. Featuring amazing content that will keep you entertained for hours.`,
        image: firstItem.image,
        rating: firstItem.rating || 'TV-14',
        duration: firstItem.duration || 'Various',
        genres: ['Drama', 'Thriller', 'Adventure']
      })

      // Scroll to the category section
      setTimeout(() => {
        const sectionElement = sectionRefs.current[category.id]
        if (sectionElement) {
          sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar showLinks={true} onNavClick={handleNavClick} />
      <Hero content={currentHeroContent} />
      
      <div className="relative -mt-32 z-20 space-y-12 pb-20">
        {categories.map((category) => (
          <div 
            key={category.id} 
            ref={(el) => (sectionRefs.current[category.id] = el)}
            id={category.id}
          >
            <ContentRow
              category={category}
              onSelectContent={setSelectedContent}
              myList={myList}
              toggleMyList={toggleMyList}
            />
          </div>
        ))}
      </div>

      <Modal
        content={selectedContent}
        onClose={() => setSelectedContent(null)}
        isInMyList={selectedContent ? isInMyList(selectedContent.id) : false}
        toggleMyList={toggleMyList}
      />

      <Footer />
    </div>
  )
}
