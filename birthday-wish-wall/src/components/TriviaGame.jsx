import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Trophy, Play, RotateCcw, Star, Heart, CheckCircle, XCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const TriviaGame = () => {
  const [gameState, setGameState] = useState('start') // 'start', 'playing', 'finished'
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [userAnswers, setUserAnswers] = useState([])

  // Trivia questions database
  const questions = [
    {
      id: 1,
      question: "What's the birthday person's favorite color?",
      options: ["Blue", "Purple", "Green", "Pink"],
      correct: 1,
      explanation: "Purple has always been their favorite since childhood!"
    },
    {
      id: 2,
      question: "In which month were they born?",
      options: ["January", "July", "September", "December"],
      correct: 1,
      explanation: "A summer baby born in the beautiful month of July!"
    },
    {
      id: 3,
      question: "What's their favorite type of music?",
      options: ["Pop", "Rock", "Jazz", "Classical"],
      correct: 0,
      explanation: "They love singing along to catchy pop songs!"
    },
    {
      id: 4,
      question: "What's their dream vacation destination?",
      options: ["Paris", "Tokyo", "New York", "Bali"],
      correct: 2,
      explanation: "The city that never sleeps has always fascinated them!"
    },
    {
      id: 5,
      question: "What's their favorite food?",
      options: ["Pizza", "Sushi", "Tacos", "Ice Cream"],
      correct: 0,
      explanation: "Nothing beats a good slice of pizza for them!"
    },
    {
      id: 6,
      question: "What hobby do they enjoy most?",
      options: ["Reading", "Gaming", "Cooking", "Photography"],
      correct: 3,
      explanation: "They love capturing beautiful moments through their lens!"
    },
    {
      id: 7,
      question: "What's their favorite season?",
      options: ["Spring", "Summer", "Fall", "Winter"],
      correct: 2,
      explanation: "The beautiful colors of autumn always make them happy!"
    },
    {
      id: 8,
      question: "What's their biggest fear?",
      options: ["Heights", "Spiders", "Public Speaking", "Dark"],
      correct: 0,
      explanation: "They prefer to keep their feet firmly on the ground!"
    },
    {
      id: 9,
      question: "What's their favorite movie genre?",
      options: ["Comedy", "Horror", "Romance", "Action"],
      correct: 2,
      explanation: "They're a hopeless romantic who loves a good love story!"
    },
    {
      id: 10,
      question: "What superpower would they choose?",
      options: ["Flying", "Invisibility", "Time Travel", "Mind Reading"],
      correct: 2,
      explanation: "They'd love to visit different time periods and meet historical figures!"
    }
  ]

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null) return // Prevent changing answer
    
    setSelectedAnswer(answerIndex)
    setShowResult(true)
    
    const isCorrect = answerIndex === questions[currentQuestion].correct
    if (isCorrect) {
      setScore(score + 1)
    }
    
    setUserAnswers([...userAnswers, {
      questionId: questions[currentQuestion].id,
      selected: answerIndex,
      correct: questions[currentQuestion].correct,
      isCorrect
    }])
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setGameState('finished')
    }
  }

  const resetGame = () => {
    setGameState('start')
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setUserAnswers([])
  }

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100
    if (percentage === 100) return "Perfect! You know them incredibly well! 🏆"
    if (percentage >= 80) return "Amazing! You're definitely a close friend! ⭐"
    if (percentage >= 60) return "Great job! You know them pretty well! 👏"
    if (percentage >= 40) return "Not bad! There's still more to learn! 😊"
    return "Time to spend more time together! 💝"
  }

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 80) return "from-yellow-400 to-orange-500"
    if (percentage >= 60) return "from-green-400 to-blue-500"
    if (percentage >= 40) return "from-blue-400 to-purple-500"
    return "from-pink-400 to-red-500"
  }

  if (gameState === 'start') {
    return (
      <motion.div
        className="max-w-4xl mx-auto text-center space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white rounded-3xl p-12 shadow-xl border-2 border-purple-200">
          <motion.div 
            className="text-8xl mb-6"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            🎯
          </motion.div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Birthday Trivia Challenge
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Test your knowledge about the birthday person! Answer questions about their favorites, 
            memories, and fun facts. Can you get a perfect score?
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <motion.div 
              className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-2xl"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl mb-2">❓</div>
              <h3 className="font-bold text-lg">{questions.length} Questions</h3>
              <p className="text-sm text-gray-600">Multiple choice format</p>
            </motion.div>
            <motion.div 
              className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-2xl"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl mb-2">⏱️</div>
              <h3 className="font-bold text-lg">No Time Limit</h3>
              <p className="text-sm text-gray-600">Take your time to think</p>
            </motion.div>
            <motion.div 
              className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-6 rounded-2xl"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl mb-2">🏆</div>
              <h3 className="font-bold text-lg">Score & Celebrate</h3>
              <p className="text-sm text-gray-600">See how well you know them</p>
            </motion.div>
          </div>

          <Button 
            onClick={() => setGameState('playing')}
            className="px-12 py-4 text-xl font-bold rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <Play className="w-6 h-6 mr-3" />
            Start Trivia Game
          </Button>
        </div>
      </motion.div>
    )
  }

  if (gameState === 'playing') {
    const question = questions[currentQuestion]
    const progress = ((currentQuestion + 1) / questions.length) * 100

    return (
      <motion.div
        className="max-w-3xl mx-auto space-y-8"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Progress Bar */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-gray-700">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-lg font-semibold text-purple-600">
              Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-purple-200">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🤔</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {question.question}
            </h3>
          </div>

          {/* Answer Options */}
          <div className="grid gap-4 mb-8">
            {question.options.map((option, index) => {
              let buttonClass = "w-full p-4 text-left rounded-2xl border-2 transition-all duration-300 "
              
              if (selectedAnswer === null) {
                buttonClass += "border-gray-200 hover:border-purple-300 hover:bg-purple-50"
              } else if (index === question.correct) {
                buttonClass += "border-green-500 bg-green-100 text-green-800"
              } else if (index === selectedAnswer && selectedAnswer !== question.correct) {
                buttonClass += "border-red-500 bg-red-100 text-red-800"
              } else {
                buttonClass += "border-gray-200 bg-gray-50 text-gray-500"
              }

              return (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={buttonClass}
                  disabled={selectedAnswer !== null}
                  whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
                  whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{option}</span>
                    {selectedAnswer !== null && (
                      <div>
                        {index === question.correct && <CheckCircle className="w-6 h-6 text-green-600" />}
                        {index === selectedAnswer && selectedAnswer !== question.correct && (
                          <XCircle className="w-6 h-6 text-red-600" />
                        )}
                      </div>
                    )}
                  </div>
                </motion.button>
              )
            })}
          </div>

          {/* Result Explanation */}
          <AnimatePresence>
            {showResult && (
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className={`p-6 rounded-2xl ${
                  selectedAnswer === question.correct 
                    ? 'bg-green-100 border-2 border-green-300' 
                    : 'bg-red-100 border-2 border-red-300'
                }`}>
                  <div className="flex items-center gap-3 mb-3">
                    {selectedAnswer === question.correct ? (
                      <>
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        <span className="text-lg font-bold text-green-800">Correct!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-6 h-6 text-red-600" />
                        <span className="text-lg font-bold text-red-800">Not quite!</span>
                      </>
                    )}
                  </div>
                  <p className="text-gray-700">{question.explanation}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Next Button */}
          {showResult && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                onClick={handleNextQuestion}
                className="px-8 py-3 text-lg font-semibold rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    )
  }

  if (gameState === 'finished') {
    return (
      <motion.div
        className="max-w-4xl mx-auto text-center space-y-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white rounded-3xl p-12 shadow-xl border-2 border-yellow-200">
          {/* Celebration Animation */}
          <motion.div
            className="text-8xl mb-6"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎉
          </motion.div>

          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Game Complete!
          </h2>

          {/* Score Display */}
          <div className={`inline-block px-8 py-4 rounded-3xl bg-gradient-to-r ${getScoreColor()} text-white mb-6`}>
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8" />
              <span className="text-3xl font-bold">
                {score} / {questions.length}
              </span>
            </div>
          </div>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {getScoreMessage()}
          </p>

          {/* Score Breakdown */}
          <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-2xl">
              <div className="text-3xl mb-2">✅</div>
              <h3 className="font-bold text-lg text-green-800">Correct Answers</h3>
              <p className="text-2xl font-bold text-green-600">{score}</p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-2xl">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-bold text-lg text-blue-800">Accuracy</h3>
              <p className="text-2xl font-bold text-blue-600">
                {Math.round((score / questions.length) * 100)}%
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={resetGame}
              className="px-8 py-3 text-lg font-semibold rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Play Again
            </Button>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="px-8 py-3 text-lg font-semibold rounded-full border-2"
            >
              <Heart className="w-5 h-5 mr-2" />
              Back to Wish Wall
            </Button>
          </div>

          {/* Confetti Effect */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b'][i % 6],
                  left: `${Math.random() * 100}%`,
                  top: `-10px`,
                }}
                animate={{
                  y: [0, window.innerHeight + 50],
                  rotate: [0, 360],
                  opacity: [1, 0]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  repeatDelay: 5
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    )
  }
}

export default TriviaGame

