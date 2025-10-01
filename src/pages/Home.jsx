import { useState, useRef } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ContentRow from '../components/ContentRow'
import Footer from '../components/Footer'
import { categories, heroContent } from '../data/mockData'

export default function Home() {
  const [currentContent, setCurrentContent] = useState(heroContent)
  const sectionRefs = useRef({})

  const handleNavClick = (link) => {
    let category
    switch (link) {
      case 'Trending':
        category = categories.find(cat => cat.id === 'trending')
        break
      case 'Top 10':
        category = categories.find(cat => cat.id === 'top10')
        break
      case 'Action':
        category = categories.find(cat => cat.id === 'actionthrillers')
        break
      case 'Comedies':
        category = categories.find(cat => cat.id === 'comedies')
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
    if (category) {
      setCurrentContent({
        title: category.title,
        description: category.items[0]?.description || 'Enjoy the best content',
        image: category.items[0]?.image || heroContent.image,
        rating: category.items[0]?.rating || 'TV-14',
        duration: category.items[0]?.duration || 'Various',
        genres: category.items[0]?.genres || ['Various']
      })
      const sectionElement = sectionRefs.current[category.id]
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth' })
      }
    } else if (link === 'Home') {
      setCurrentContent(heroContent)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <>
      <Navbar onNavClick={handleNavClick} />
      <Hero content={currentContent} />
      <main className="bg-black min-h-screen pt-24">
        {categories.map((category) => (
          <ContentRow
            key={category.id}
            category={category}
            ref={(el) => (sectionRefs.current[category.id] = el)}
          />
        ))}
      </main>
      <Footer />
    </>
  )
}
