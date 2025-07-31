import { useState, useRef } from 'react'
import { storage } from '../lib/firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { Button } from '@/components/ui/button.jsx'
import { X, Send, Image, Type, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const MessageForm = ({ onSubmit, onClose }) => {
  const [messageType, setMessageType] = useState('text')
  const [textMessage, setTextMessage] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [imageText, setImageText] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const fileInputRef = useRef(null)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (messageType === 'text' && !textMessage.trim()) {
      alert('Please enter a message!')
      return
    }
    if (messageType === 'image' && !imageFile) {
      alert('Please select an image!')
      return
    }

    let content = textMessage
    if (messageType === 'image') {
      // Upload image to Firebase Storage
      const fileRef = ref(storage, `messages/${Date.now()}_${imageFile.name}`)
      await uploadBytes(fileRef, imageFile)
      content = await getDownloadURL(fileRef)
    }

    const message = {
      id: Date.now().toString(),
      type: messageType,
      content,
      text: messageType === 'image' ? imageText : '',
      author: authorName.trim() || 'Anonymous',
      timestamp: Date.now(),
      revealed: false
    }

    await onSubmit(message)

    // Show success popup, then close after delay
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      onClose()
    }, 1500)

    // Reset form
    setTextMessage('')
    setAuthorName('')
    setImageFile(null)
    setImagePreview('')
    setImageText('')
    setMessageType('text')
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => { if (!showSuccess) onClose() }}
    >
      <motion.div
        className="bg-white rounded-3xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto relative"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => { if (!showSuccess) onClose() }}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          disabled={showSuccess}
          style={showSuccess ? { opacity: 0.5, pointerEvents: 'none' } : {}}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Popup */}
        {showSuccess && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-green-100 border border-green-400 text-green-800 px-8 py-6 rounded-2xl shadow-lg text-center">
              <div className="text-4xl mb-2">🎉</div>
              <div className="text-lg font-bold mb-1">Message Sent!</div>
              <div>Your birthday wish has been uploaded successfully.</div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <div className="text-4xl text-center mb-4">💝</div>
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Leave a Birthday Message
          </h2>
          <p className="text-center text-gray-600">
            Share your wishes and make their day special!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Message Type Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              Message Type
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setMessageType('text')}
                className={`flex-1 p-4 rounded-2xl border-2 transition-all ${
                  messageType === 'text'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Type className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                <div className="font-semibold">Text Message</div>
              </button>
              <button
                type="button"
                onClick={() => setMessageType('image')}
                className={`flex-1 p-4 rounded-2xl border-2 transition-all ${
                  messageType === 'image'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Image className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                <div className="font-semibold">Photo Message</div>
              </button>
            </div>
          </div>

          {/* Author Name */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Your Name (Optional)
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Enter your name or leave anonymous"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Text Message Input */}
          {messageType === 'text' && (
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Birthday Message *
              </label>
              <textarea
                value={textMessage}
                onChange={(e) => setTextMessage(e.target.value)}
                placeholder="Write your heartfelt birthday message here..."
                rows={6}
                className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none transition-colors resize-none"
              />
            </div>
          )}

          {/* Image Upload */}
          {messageType === 'image' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Upload Photo *
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full p-8 border-2 border-dashed border-gray-300 rounded-2xl hover:border-purple-500 transition-colors text-center"
                >
                  {imagePreview ? (
                    <div className="space-y-3">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="max-h-32 mx-auto rounded-lg"
                      />
                      <p className="text-sm text-gray-600">Click to change photo</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Image className="w-12 h-12 mx-auto text-gray-400" />
                      <p className="text-gray-600">Click to upload a photo</p>
                      <p className="text-sm text-gray-500">JPG, PNG or GIF</p>
                    </div>
                  )}
                </button>
              </div>

              {/* Optional text for image */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Caption (Optional)
                </label>
                <textarea
                  value={imageText}
                  onChange={(e) => setImageText(e.target.value)}
                  placeholder="Add a caption to your photo..."
                  rows={3}
                  className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:outline-none transition-colors resize-none"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full py-4 text-lg font-semibold rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <Send className="w-5 h-5 mr-2" />
            Send Birthday Message
          </Button>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default MessageForm

