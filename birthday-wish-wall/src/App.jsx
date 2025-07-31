import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import WishWall from './components/WishWall'
import TriviaGame from './components/TriviaGame'
import Header from './components/Header'
import './App.css'

function App() {
  const [currentSection, setCurrentSection] = useState('wishwall')

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-yellow-100">
      <Header />
      
      {/* Navigation */}
      <nav className="flex justify-center gap-4 p-6">
        <Button 
          onClick={() => setCurrentSection('wishwall')}
          variant={currentSection === 'wishwall' ? 'default' : 'outline'}
          className="px-8 py-3 text-lg font-semibold rounded-full"
        >
          🎁 Wish Wall
        </Button>
        <Button 
          onClick={() => setCurrentSection('trivia')}
          variant={currentSection === 'trivia' ? 'default' : 'outline'}
          className="px-8 py-3 text-lg font-semibold rounded-full"
        >
          🎯 Trivia Game
        </Button>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-8">
        {currentSection === 'wishwall' && <WishWall />}
        {currentSection === 'trivia' && <TriviaGame />}
      </main>
    </div>
  )
}

export default App

