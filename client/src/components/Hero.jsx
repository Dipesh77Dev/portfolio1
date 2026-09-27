import React, { useState, useEffect } from 'react'
import styles from './Hero.module.css'

export default function Hero () {
  const roles = [
    'Web Developer',
    'Frontend Specialist',
    'MERN Developer',
    // 'UI/UX & Motion Enthusiast'
  ]

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  // Active tech index for orbit autoplay & hover interactions
  const [activeTechIndex, setActiveTechIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const defaultDeveloperImage =
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'

  // Tech Stack with adaptive themes & SVG icons
  const techIcons = [
    {
      id: 'html',
      name: 'HTML5 & SEO',
      color: '#E34F26',
      image:
        'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80',
      codeSnippet:
        '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <title>Dipesh</title>\n  </head>\n</html>',
      svg: (
        <svg viewBox='0 0 24 24' width='22' height='22' fill='currentColor'>
          <path d='M12 17.56l4.07-1.13.55-6.1H8.02l-.18-2h9.12l.18-2H5.66l.54 6h7.62l-.23 2.56-1.59.44-1.59-.44-.1-.11h-2l.25 2.82L12 17.56zM3 2l1.6 18L12 22l7.4-2L21 2H3z' />
        </svg>
      )
    },
    {
      id: 'css',
      name: 'Modern CSS3',
      color: '#1572B6',
      image:
        'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
      codeSnippet:
        '.hero-card {\n  display: flex;\n  backdrop-filter: blur(16px);\n}',
      svg: (
        <svg viewBox='0 0 24 24' width='22' height='22' fill='currentColor'>
          <path d='M5 3l-.54 6h11.08l-.23 2.56-3.31.92-3.31-.92-.21-2.36H6.46l.43 4.8 5.11 1.42 5.11-1.42.71-7.8H4.46L4.2 3H20l-.18 2H5z' />
        </svg>
      )
    },
    {
      id: 'js',
      name: 'JavaScript',
      color: '#F7DF1E',
      image:
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      codeSnippet:
        'const initApp = async () => {\n  await loadAssets();\n  renderApp();\n};',
      svg: (
        <svg viewBox='0 0 24 24' width='20' height='20' fill='currentColor'>
          <path d='M3 3h18v18H3V3zm10.5 13.5v-6H12v6h1.5zm3.5 0c1.1 0 2-.9 2-2v-4h-1.5v4H16v-4h-1.5v4c0 1.1.9 2 2 2z' />
        </svg>
      )
    },
    {
      id: 'react',
      name: 'React.js',
      color: '#61DAFB',
      image:
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
      codeSnippet:
        'export default function Portfolio() {\n  return <Hero />;\n}',
      svg: (
        <svg viewBox='0 0 24 24' width='22' height='22' fill='currentColor'>
          <circle cx='12' cy='12' r='2.2' />
          <path d='M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z' />
        </svg>
      )
    },
    {
      id: 'node',
      name: 'Node & Express',
      color: '#339933',
      image:
        'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=800&q=80',
      codeSnippet:
        'const express = require("express");\nconst app = express();',
      svg: (
        <svg viewBox='0 0 24 24' width='20' height='20' fill='currentColor'>
          <path d='M12 0L1.75 5.92v11.84L12 23.68l10.25-5.92V5.92L12 0zm0 2.31l8.25 4.76v9.52L12 21.36l-8.25-4.77V7.07L12 2.31z' />
        </svg>
      )
    },
    {
      id: 'github',
      name: 'GitHub',
      color: 'var(--github-icon-color)',
      image:
        'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80',
      codeSnippet:
        'git commit -m "feat: mobile responsive hero"\ngit push origin main',
      svg: (
        <svg viewBox='0 0 24 24' width='20' height='20' fill='currentColor'>
          <path d='M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z' />
        </svg>
      )
    }
  ]

  // Typewriter effect
  useEffect(() => {
    const currentFullText = roles[currentRoleIndex]
    let typingSpeed = isDeleting ? 45 : 90

    if (!isDeleting && displayText === currentFullText) {
      typingSpeed = 2000
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false)
      setCurrentRoleIndex(prev => (prev + 1) % roles.length)
      typingSpeed = 250
    }

    const timer = setTimeout(() => {
      setDisplayText(prev =>
        isDeleting
          ? currentFullText.substring(0, prev.length - 1)
          : currentFullText.substring(0, prev.length + 1)
      )

      if (!isDeleting && displayText === currentFullText) {
        setIsDeleting(true)
      }
    }, typingSpeed)

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, currentRoleIndex])

  // Autoplay cycle for orbit items
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setActiveTechIndex(prev => (prev + 1) % techIcons.length)
    }, 4500)

    return () => clearInterval(interval)
  }, [isPaused, techIcons.length])

  const currentTech = techIcons[activeTechIndex]

  return (
    <section className={styles.heroSection} id='about'>
      {/* LEFT CONTENT */}
      <div className={styles.textContent}>
        <span className={styles.greeting}>
          👋 Welcome! I'm{' '}
          <span className={styles.accentText}>Dipesh Devrukhkar</span>
        </span>

        {/* Dynamic Typewriter Title */}
        <div className={styles.headingWrapper}>
          <h1 className={styles.mainHeading}>
            <span>{displayText}</span>
            <span className={styles.cursor}>|</span>
          </h1>
        </div>

        {/* Hero Copy */}
        <p className={styles.subHeading}>
          Frontend &amp; MERN Stack Developer with over{' '}
          <strong>3+ years of experience</strong> building fast, scalable, and
          responsive web applications. Passionate about modern React
          architectures and intuitive UI design.
        </p>

        {/* Action Buttons & Pills */}
        <div className={styles.actionButtons}>
          <a href='#contact' className={styles.primaryBtn}>
            Hire Me ➔
          </a>
          <a
            href='mailto:rajpersonal777@gmail.com'
            className={styles.iconBtn}
            aria-label='Send Email'
            title='Send Email'
          >
            <svg
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <rect x='2' y='4' width='20' height='16' rx='2' />
              <path d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7' />
            </svg>
          </a>
        </div>

        {/* HOBBIES & BEYOND CODE CARD */}
        <div className={styles.glassCard}>
          <div className={styles.cardHeader}>
            <span className={styles.badgeLabel}>
              🎮 Beyond The Code &amp; Hobbies
            </span>
          </div>
          <p className={styles.quoteText}>
            Besides full-stack development, I love diving into{' '}
            <strong>Game Testing</strong>, exploring{' '}
            <strong>Digital Marketing strategies</strong>,
            and <strong>experimenting with creative UI design trends.</strong>
          </p>
          <div className={styles.authorTag}>
            <div className={styles.authorAvatar}>
              <span>⚡</span>
            </div>
            <div>
              <div className={styles.authorName}>
                My Hobbies &amp; Interests
              </div>
              <div className={styles.authorRole}>
                Game Testing • Marketing • Motion Graphics
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT VISUAL ORBIT */}
      <div className={styles.visualContent}>
        <div
          className={styles.orbitContainer}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className={styles.orbitRing}></div>
          <div className={`${styles.orbitRing} ${styles.innerRing}`}></div>

          {/* Orbiting Badges */}
          {techIcons.map((icon, index) => (
            <div
              key={icon.id}
              className={styles.orbitItem}
              style={{ '--i': index, '--total': techIcons.length }}
            >
              <div
                className={`${styles.iconBadge} ${
                  activeTechIndex === index ? styles.activeBadge : ''
                }`}
                style={{ color: icon.color }}
                data-title={icon.name}
                onMouseEnter={() => setActiveTechIndex(index)}
              >
                {icon.svg}
              </div>
            </div>
          ))}

          {/* Center Circle Content */}
          <div className={styles.avatarWrapper}>
            <img
              src={currentTech ? currentTech.image : defaultDeveloperImage}
              alt='Developer Workspace'
              className={styles.avatarImg}
            />

            {/* Code Snippet Overlay */}
            <div className={styles.codeOverlay}>
              <div className={styles.codeHeader}>
                <span className={styles.codeTitle}>{currentTech.name}</span>
                {/* <span className={styles.liveIndicator}>AUTOPLAY</span> */}
              </div>
              <pre className={styles.codeBody}>{currentTech.codeSnippet}</pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
