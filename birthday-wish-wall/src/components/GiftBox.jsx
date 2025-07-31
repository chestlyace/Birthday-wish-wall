import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, User, Calendar } from 'lucide-react'

const GiftBox = ({ message, onReveal }) => {
  const [isRevealed, setIsRevealed] = useState(message.revealed || false)
  const [showContent, setShowContent] = useState(false)

  const handleClick = () => {
    if (!isRevealed) {
      setIsRevealed(true)
      onReveal(message.id)
      // Delay showing content to allow box animation to complete
      setTimeout(() => setShowContent(true), 800)
    } else {
      setShowContent(true)
    }
  }

  const closeMessage = () => {
    setShowContent(false)
  }

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <>
      {/* Gift Box */}
      <motion.div
        className={`aspect-square cursor-pointer relative overflow-hidden rounded-2xl shadow-lg ${
          isRevealed 
            ? 'bg-gradient-to-br from-green-400 to-emerald-500' 
            : 'bg-gradient-to-br from-red-400 to-pink-500'
        }`}
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={isRevealed ? { 
          rotateY: [0, 180, 360],
          scale: [1, 1.1, 1]
        } : {}}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Gift Box Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
          {!isRevealed ? (
            <>
              {/* Ribbon */}
              <div className="absolute inset-x-0 top-1/2 h-4 bg-yellow-400 transform -translate-y-1/2 opacity-80"></div>
              <div className="absolute inset-y-0 left-1/2 w-4 bg-yellow-400 transform -translate-x-1/2 opacity-80"></div>
              
              {/* Gift Icon */}
              <div className="text-4xl mb-2 relative z-10">🎁</div>
              <div className="text-sm font-semibold text-center relative z-10">
                Click to Open!
              </div>
            </>
          ) : (
            <>
              {/* Opened Gift */}
              <div className="text-4xl mb-2">✨</div>
              <div className="text-sm font-semibold text-center">
                Message Revealed!
              </div>
              <div className="text-xs mt-1 opacity-80">
                Click to read
              </div>
            </>
          )}
        </div>

        {/* Confetti Effect for Revealed Gifts */}
        {isRevealed && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b'][i % 5],
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, -40, -20],
                  opacity: [1, 0.5, 0],
                  scale: [1, 0.5, 0]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Message Modal */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMessage}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 max-w-md w-full max-h-[80vh] overflow-y-auto relative"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeMessage}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Message Header */}
              <div className="mb-6">
                <div className="text-4xl text-center mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-center text-gray-800 mb-2">
                  Birthday Message
                </h3>
                
                {/* Author and Date */}
                <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{message.author || 'Anonymous'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(message.timestamp)}</span>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div className="space-y-4">
                {message.type === 'text' && (
                  <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-2xl">
                    <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </div>
                )}

                {message.type === 'image' && (
                  <div className="space-y-4">
                    <img 
                      src={message.content} 
                      alt="Birthday message" 
                      className="w-full rounded-2xl shadow-lg"
                    />
                    {message.text && (
                      <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-2xl">
                        <p className="text-gray-800 leading-relaxed">
                          {message.text}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Celebration Footer */}
              <div className="mt-6 text-center">
                <div className="text-2xl mb-2">🎂✨🎈</div>
                <p className="text-sm text-gray-600">
                  Hope your special day is amazing!
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default GiftBox

