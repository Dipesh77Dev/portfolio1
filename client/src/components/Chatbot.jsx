import React, { useState, useRef, useEffect } from 'react'
import styles from './Chatbot.module.css'

const API_URL =
  import.meta.env.VITE_API_URL || 'https://dipesh-portfolio-api.onrender.com'

const DEFAULT_SUGGESTIONS = [
  'About',
  'Skills',
  'Projects',
  'Experience',
  'Contact',
]

export default function Chatbot () {
  const [isOpen, setIsOpen] = useState(false)
  const [userName, setUserName] = useState('')
  const [step, setStep] = useState('ASK_NAME')
  const [wrongAttempts, setWrongAttempts] = useState(0)
  const [isClosing, setIsClosing] = useState(false)

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hello! I am Dipesh's Senior AI Assistant. Before we begin exploring his technical experience, MERN projects, and skills—may I know your name?"
    }
  ])

  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  // Prevent background scroll on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
    } else {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
  }, [isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const triggerAutoClose = thankMessage => {
    setIsClosing(true)
    setMessages(prev => [...prev, { sender: 'bot', text: thankMessage }])

    setTimeout(() => {
      setIsOpen(false)
      setIsClosing(false)
      setWrongAttempts(0)
      setStep('ASK_NAME')
      setUserName('')
      setMessages([
        {
          sender: 'bot',
          text: "Hello! I am Dipesh's Senior AI Assistant. Before we begin exploring his technical experience, MERN projects, and skills—may I know your name?"
        }
      ])
    }, 2200)
  }

  // Helper function to send messages from both form submit and suggestion chip clicks
  const processUserQuery = async queryText => {
    const userText = queryText.trim()
    if (!userText || loading || isClosing) return

    if (step === 'ASK_NAME') {
      const capturedName = userText
      setUserName(capturedName)
      setMessages(prev => [
        ...prev,
        { sender: 'user', text: capturedName },
        {
          sender: 'bot',
          text: `Pleased to meet you, ${capturedName}! What would you like to know about Dipesh?`,
          suggestions: DEFAULT_SUGGESTIONS
        }
      ])
      setStep('CHAT')
      setInput('')
      return
    }

    const lowerInput = userText.toLowerCase()
    if (['exit', 'quit', 'close', 'bye', 'clear'].includes(lowerInput)) {
      setMessages(prev => [...prev, { sender: 'user', text: userText }])
      setInput('')
      triggerAutoClose(
        `Thank you for connecting, ${
          userName || 'there'
        }! Have a great day ahead!`
      )
      return
    }

    setMessages(prev => [...prev, { sender: 'user', text: userText }])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch(`${API_URL}/api/chatbot/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, userName })
      })

      if (!res.ok) throw new Error(`Server error: ${res.status}`)

      const data = await res.json()

      if (data.isExit) {
        triggerAutoClose(data.reply)
      } else if (data.matched) {
        setWrongAttempts(0)
        setMessages(prev => [...prev, { sender: 'bot', text: data.reply }])
      } else {
        const newCount = wrongAttempts + 1
        setWrongAttempts(newCount)

        if (newCount >= 3) {
          triggerAutoClose(
            `Thank you for connecting with Dipesh's portfolio, ${
              userName || 'friend'
            }! Feel free to re-open if you need anything else.`
          )
        } else {
          setMessages(prev => [
            ...prev,
            {
              sender: 'bot',
              text: `${
                data.reply ||
                "I didn't quite catch that. Try asking about one of these topics:"
              } (Attempt ${newCount}/3)`,
              suggestions: data.suggestions || DEFAULT_SUGGESTIONS
            }
          ])
        }
      }
    } catch (err) {
      console.error('Chatbot error:', err)
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: 'Error connecting to AI service. Try clicking one of the suggested topics below:',
          suggestions: DEFAULT_SUGGESTIONS
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleSend = e => {
    e.preventDefault()
    processUserQuery(input)
  }

  const handleChipClick = suggestion => {
    processUserQuery(suggestion)
  }

  return (
    <>
      <button
        className={styles.chatFloatingBtn}
        onClick={() => setIsOpen(!isOpen)}
        aria-label='Toggle Chatbot'
      >
        💬
      </button>

      {isOpen && (
        <div className={styles.overlay} onClick={() => setIsOpen(false)}>
          <div className={styles.chatWindow} onClick={e => e.stopPropagation()}>
            <div className={styles.chatHeader}>
              <div className={styles.chatTitle}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    background: '#00dfd8',
                    borderRadius: '50%'
                  }}
                ></span>
                Dipesh AI Assistant
              </div>
              <button
                className={styles.closeBtn}
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className={styles.chatMessages}>
              {messages.map((m, idx) => (
                <div key={idx} className={styles.msgContainer}>
                  <div
                    className={`${styles.msg} ${
                      m.sender === 'user' ? styles.userMsg : styles.botMsg
                    }`}
                  >
                    {m.text}
                  </div>

                  {/* Render Clickable Keyword Chips */}
                  {m.suggestions && m.suggestions.length > 0 && (
                    <div className={styles.chipGroup}>
                      {m.suggestions.map((chip, chipIdx) => (
                        <button
                          key={chipIdx}
                          type='button'
                          className={styles.chipBtn}
                          onClick={() => handleChipClick(chip)}
                          disabled={loading || isClosing}
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className={`${styles.msg} ${styles.botMsg}`}>
                  <em>Thinking...</em>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className={styles.chatInputArea}>
              <input
                type='text'
                disabled={isClosing}
                placeholder={
                  isClosing
                    ? 'Closing session...'
                    : step === 'ASK_NAME'
                    ? 'Enter your name...'
                    : 'Ask about skills, work...'
                }
                value={input}
                onChange={e => setInput(e.target.value)}
                className={styles.chatInput}
              />
              <button
                type='submit'
                className={styles.sendBtn}
                disabled={loading || isClosing}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
