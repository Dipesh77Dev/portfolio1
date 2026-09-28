import React, { useState, useEffect } from 'react'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import { InteractiveCLI } from './components/StorySections'
import ConnectSection from './components/ConnectSection'
import Chatbot from './components/Chatbot'
import ScrollToTop from './components/ScrollToTop'
import VisitorTracker from './components/VisitorTracker'
import Footer from './components/Footer'

import useVisitorTracking from './hooks/useVisitorTracking';

export default function App () {
  useVisitorTracking();
  
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <>
      {/* 1. INITIAL LOADING SCREEN */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <div
        style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.6s ease' }}
      >
        <VisitorTracker />
        <Navbar theme={theme} onToggleTheme={toggleTheme} />

        {/* SEQUENTIAL NARRATIVE FLOW */}
        <main style={{ position: 'relative' }}>
          <section>
            <Hero />
          </section>

          {/* 2. ABOUT ME */}
          <section id='about'>
            <About />
          </section>

          {/* 3. SKILLS */}
          <section id='skills'>
            <Skills />
          </section>

          {/* 4. EXPERIENCE */}
          <section id='experience'>
            <Experience />
          </section>

          {/* 5. PROJECTS */}
          <section id='projects'>
            <Projects />
          </section>

          {/* 6. CONTACT ME */}
          {/* <section id='contact'>
            <Contact />
          </section> */}

          {/* 7. INTERACTIVE TERMINAL */}
          {/* <section id='terminal'>
            <InteractiveCLI />
          </section> */}

          <section id='contact'>
            <ConnectSection />
          </section>
        </main>

        <ScrollToTop />
        {/* 8. FLOATING INTERACTIVE CHATBOT */}
        <Chatbot />
        
        <Footer />
        {/* <footer
          style={{
            textAlign: 'center',
            padding: '3rem',
            borderTop: '1px solid var(--border-color)',
            color: 'var(--text-muted)',
            fontSize: '0.85rem',
            background: 'var(--bg-secondary)'
          }}
        >
          © 2026 Dipesh Devrukhkar. Engineered with React & Modern MERN Stack.
        </footer> */}
      </div>
    </>
  )
}
