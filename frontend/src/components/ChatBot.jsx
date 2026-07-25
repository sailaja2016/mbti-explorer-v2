import React, { useState } from 'react'
import axios from 'axios'
import '../styles/ChatBot.css'

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi! I\'m Mello, your MBTI guide. Ask me anything about personality types!' }
  ])
  const [input, setInput] = useState('')

  const handleSend = async () => {
  if (!input.trim()) return

  setMessages(prev => [...prev, { type: 'user', text: input }])
  setInput('')

  try {
    // Fetch knowledge base
    const kbRes = await fetch('/mello_knowledge_base.json')
    const kb = await kbRes.json()

    const userText = input.toLowerCase().trim()
    let bestMatch = null
    let bestScore = 0

    // Search through all categories
    for (const category in kb) {
      const items = kb[category]
      for (const item of items) {
        // Score each item based on keyword matches
        let score = 0
        for (const keyword of item.keywords) {
          if (userText.includes(keyword)) {
            score += keyword.length // Longer keywords = higher priority
          }
        }
        
        // Keep track of best match
        if (score > bestScore) {
          bestScore = score
          bestMatch = item.answer
        }
      }
    }

    // If no exact match, try looser matching
    if (!bestMatch) {
      for (const category in kb) {
        const items = kb[category]
        for (const item of items) {
          let score = 0
          for (const keyword of item.keywords) {
            // Check if keyword words appear anywhere in user text
            const keywordWords = keyword.split(' ')
            for (const word of keywordWords) {
              if (word.length > 3 && userText.includes(word)) {
                score += 1
              }
            }
          }
          
          if (score > bestScore) {
            bestScore = score
            bestMatch = item.answer
          }
        }
      }
    }

    // Fallback response
    let reply = bestMatch || `I'm not sure about that one! Try asking about:\n• Understanding MBTI\n• Your personality type (like "What is INFJ?")\n• Type descriptions\n• Career fit\n• Relationships & compatibility\n• Population & rare types\n• Why take the test?\n\nOr take our MBTI test for instant insights! 🧠`

    setMessages(prev => [...prev, { type: 'bot', text: reply }])
  } catch (err) {
    console.error('Error:', err)
    setMessages(prev => [...prev, { 
      type: 'bot', 
      text: 'Oops! I had a little hiccup 😅 Try again in a moment!' 
    }])
  }
}

  return (
    <div className="chatbot-container">
      <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        🤖 Mello
      </button>
      {isOpen && (
        <div className="chatbot-window">
          <div className="chat-header">
            <h4>Mello - MBTI Guide</h4>
            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.type}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  )
}
