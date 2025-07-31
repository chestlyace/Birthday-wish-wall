import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Plus, Gift } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'
import GiftBox from './GiftBox'
import MessageForm from './MessageForm'
import { db } from '../lib/firebase'
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  doc,
  serverTimestamp,
  query,
  orderBy
} from 'firebase/firestore'

const WishWall = () => {
  const [messages, setMessages] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)


  // Real-time Firestore listener
  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setMessages(msgs)
    })
    return () => unsubscribe()
  }, [])


  const handleAddMessage = async (newMessage) => {
    // Remove id and timestamp, use Firestore's serverTimestamp
    const { id: _id, timestamp: _timestamp, ...rest } = newMessage // ignore unused
    await addDoc(collection(db, 'messages'), {
      ...rest,
      revealed: false,
      timestamp: serverTimestamp(),
    })
    setShowAddForm(false)
  }


  const handleRevealMessage = async (messageId) => {
    const messageRef = doc(db, 'messages', messageId)
    await updateDoc(messageRef, { revealed: true })
  }

  const revealedCount = messages.filter(msg => msg.revealed).length
  const totalCount = messages.length

  return (
    <div className="space-y-8">
      {/* Stats and Add Button */}
      <div className="text-center space-y-4">
        <div className="flex justify-center items-center gap-8 text-lg">
          <div className="bg-white px-6 py-3 rounded-full shadow-lg border-2 border-purple-200">
            <Gift className="w-5 h-5 inline mr-2 text-purple-500" />
            <span className="font-semibold text-gray-700">
              {totalCount} Messages
            </span>
          </div>
          <div className="bg-white px-6 py-3 rounded-full shadow-lg border-2 border-green-200">
            <span className="text-2xl mr-2">✨</span>
            <span className="font-semibold text-gray-700">
              {revealedCount} Revealed
            </span>
          </div>
        </div>

        <Button 
          onClick={() => setShowAddForm(true)}
          className="px-8 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-lg"
        >
          <Plus className="w-6 h-6 mr-2" />
          Add Your Birthday Wish
        </Button>
      </div>

      {/* Gift Boxes Grid */}
      {messages.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {messages.map(message => (
            <GiftBox
              key={message.id}
              message={message}
              onReveal={handleRevealMessage}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🎁</div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">
            No Messages Yet
          </h3>
          <p className="text-gray-600 mb-6">
            Be the first to leave a birthday message!
          </p>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="px-8 py-3 text-lg font-semibold rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
          >
            <Plus className="w-5 h-5 mr-2" />
            Leave First Message
          </Button>
        </div>
      )}

      {/* Instructions */}
      <div className="text-center bg-white p-6 rounded-3xl shadow-lg border-2 border-yellow-200 max-w-2xl mx-auto">
        <div className="text-3xl mb-3">🎉</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          How It Works
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Click on any gift box to reveal the birthday message inside! Each message comes with a delightful 
          animation and confetti celebration. Add your own message to join the birthday celebration!
        </p>
      </div>

      {/* Message Form Modal */}
      <AnimatePresence>
        {showAddForm && (
          <MessageForm
            onSubmit={handleAddMessage}
            onClose={() => setShowAddForm(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default WishWall

