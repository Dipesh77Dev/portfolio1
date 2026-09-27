import React, { useState, useRef, useEffect } from 'react';
import styles from './Chatbot.module.css';

// 1. ADD THIS LINE AT THE TOP (OUTSIDE THE COMPONENT):
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [step, setStep] = useState('ASK_NAME'); 
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hello! I am Dipesh's Senior AI Assistant. Before we begin exploring his technical experience, MERN projects, and skills—may I know your name?"
    }
  ]);
  
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const triggerAutoClose = (thankMessage) => {
    setIsClosing(true);
    setMessages(prev => [...prev, { sender: 'bot', text: thankMessage }]);

    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      setWrongAttempts(0);
      setStep('ASK_NAME');
      setUserName('');
      setMessages([
        {
          sender: 'bot',
          text: "Hello! I am Dipesh's Senior AI Assistant. Before we begin exploring his technical experience, MERN projects, and skills—may I know your name?"
        }
      ]);
    }, 2200);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const userText = input.trim();
    if (!userText || loading || isClosing) return;

    if (step === 'ASK_NAME') {
      const capturedName = userText;
      setUserName(capturedName);
      setMessages(prev => [
        ...prev,
        { sender: 'user', text: capturedName },
        {
          sender: 'bot',
          text: `Pleased to meet you, ${capturedName}! As Dipesh's AI assistant, I can detail his full-stack MERN expertise, production work, or contact info. What would you like to know?`
        }
      ]);
      setStep('CHAT');
      setInput('');
      return;
    }

    const lowerInput = userText.toLowerCase();
    if (['exit', 'quit', 'close', 'bye', 'clear'].includes(lowerInput)) {
      setMessages(prev => [...prev, { sender: 'user', text: userText }]);
      setInput('');
      triggerAutoClose(`Thank you for connecting, ${userName || 'there'}! Have a great day ahead!`);
      return;
    }

    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInput('');
    setLoading(true);

    try {
      // 2. UPDATE THIS FETCH CALL TO USE API_URL:
      const res = await fetch(`${API_URL}/api/chatbot/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, userName })
      });

      const data = await res.json();

      if (data.isExit) {
        triggerAutoClose(data.reply);
      } else if (data.matched) {
        setWrongAttempts(0);
        setMessages(prev => [...prev, { sender: 'bot', text: data.reply }]);
      } else {
        const newCount = wrongAttempts + 1;
        setWrongAttempts(newCount);

        if (newCount >= 3) {
          triggerAutoClose(`Thank you for connecting with Dipesh's portfolio, ${userName || 'friend'}! Closing chat for now. Feel free to re-open if you need anything else.`);
        } else {
          setMessages(prev => [
            ...prev,
            {
              sender: 'bot',
              text: `${data.reply} (Attempt ${newCount}/3)`
            }
          ]);
        }
      }
    } catch {
      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: "Error connecting to AI service. Please try again." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        className={styles.chatFloatingBtn} 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Chatbot"
      >
        💬
      </button>

      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <div className={styles.chatTitle}>
              <span style={{ width: 8, height: 8, background: '#00dfd8', borderRadius: '50%' }}></span>
              Dipesh AI Assistant
            </div>
            <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className={styles.chatMessages}>
            {messages.map((m, idx) => (
              <div 
                key={idx} 
                className={`${styles.msg} ${m.sender === 'user' ? styles.userMsg : styles.botMsg}`}
              >
                {m.text}
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
              type="text"
              disabled={isClosing}
              placeholder={
                isClosing 
                  ? "Closing session..." 
                  : step === 'ASK_NAME' 
                    ? "Enter your name..." 
                    : "Ask about skills, work..."
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={styles.chatInput}
            />
            <button type="submit" className={styles.sendBtn} disabled={loading || isClosing}>
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}