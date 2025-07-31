import { useState, useEffect } from 'react'

const Header = () => {
  const [confetti, setConfetti] = useState([])

  // Generate confetti particles
  useEffect(() => {
    const particles = []
    for (let i = 0; i < 50; i++) {
      particles.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 2,
        color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b'][Math.floor(Math.random() * 6)]
      })
    }
    setConfetti(particles)
  }, [])

  return (
    <header className="relative text-center py-12 overflow-hidden">
      {/* Confetti Animation */}
      {confetti.map(particle => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full animate-bounce"
          style={{
            left: `${particle.left}%`,
            backgroundColor: particle.color,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`
          }}
        />
      ))}
      
      {/* Main Title */}
      <div className="relative z-10">
        <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 bg-clip-text text-transparent mb-4">
          🎉 Happy Birthday! 🎂
        </h1>
        <p className="text-2xl md:text-3xl text-gray-700 font-semibold mb-2">
          Welcome to Your Special Day
        </p>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Friends and family have left you special messages! Click on the gift boxes to reveal their birthday wishes, 
          and test your knowledge in the trivia game.
        </p>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-4 left-4 text-4xl animate-bounce">🎈</div>
      <div className="absolute top-8 right-8 text-4xl animate-bounce" style={{animationDelay: '0.5s'}}>🎈</div>
      <div className="absolute bottom-4 left-8 text-3xl animate-pulse">⭐</div>
      <div className="absolute bottom-8 right-4 text-3xl animate-pulse" style={{animationDelay: '1s'}}>⭐</div>
    </header>
  )
}

export default Header

