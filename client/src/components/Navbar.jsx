import React, { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

const NAV_ITEMS = [
  { id: 'about', label: 'About', num: '01.' },
  { id: 'skills', label: 'Skills', num: '02.' },
  { id: 'experience', label: 'Experience', num: '03.' },
  { id: 'projects', label: 'Projects', num: '04.' },
  { id: 'contact', label: 'Contact', num: '05.' }
]

export default function Navbar ({ theme, onToggleTheme }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('about')

  // SCROLL-SPY: Track active section based on scroll position
  useEffect(() => {
    const handleObserver = entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '-30% 0px -50% 0px', // Triggers when section top enters upper viewport
      threshold: 0
    })

    NAV_ITEMS.forEach(item => {
      const element = document.getElementById(item.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  // LOCK BODY SCROLL WHEN MOBILE DRAWER IS OPEN
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const closeMenu = () => setIsMobileMenuOpen(false)

  return (
    <header className={styles.navHeader}>
      <div className={styles.navContainer}>
        {/* 1. LEFT BRAND LOGO */}
        <div className={styles.leftCol}>
          <a href='#' className={styles.logo} onClick={closeMenu}>
            <span className={styles.codeTag}>&lt;/&gt;</span>
            <span className={styles.logoText}>Dipesh Devrukhkar</span>
          </a>
        </div>

        {/* 2. CENTER NAVIGATION */}
        <nav
          className={`${styles.navMenu} ${
            isMobileMenuOpen ? styles.mobileOpen : ''
          }`}
        >
          <div className={styles.mobileDrawerHeader}>
            <span className={styles.mobileDrawerTitle}>// Navigation</span>
          </div>

          <ul className={styles.navLinks}>
            {NAV_ITEMS.map(item => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={closeMenu}
                  className={`${styles.navLink} ${
                    activeSection === item.id ? styles.activeLink : ''
                  }`}
                >
                  <span className={styles.navNum}>{item.num}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.mobileCtaWrapper}>
            <a
              href='#contact'
              className={styles.mobileCtaBtn}
              onClick={closeMenu}
            >
              Let's Talk ➔
            </a>
          </div>
        </nav>

        {/* 3. RIGHT ACTION CONTROLS */}
        <div className={styles.rightCol}>
          <button
            onClick={onToggleTheme}
            className={styles.themeToggleBtn}
            title='Toggle Theme'
            aria-label='Toggle Theme'
          >
            {theme === 'light' ? (
              <svg
                width='19'
                height='19'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' />
              </svg>
            ) : (
              <svg
                width='19'
                height='19'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <circle cx='12' cy='12' r='5' />
                <line x1='12' y1='1' x2='12' y2='3' />
                <line x1='12' y1='21' x2='12' y2='23' />
                <line x1='4.22' y1='4.22' x2='5.64' y2='5.64' />
                <line x1='18.36' y1='18.36' x2='19.78' y2='19.78' />
                <line x1='1' y1='12' x2='3' y2='12' />
                <line x1='21' y1='12' x2='23' y2='12' />
                <line x1='4.22' y1='19.78' x2='5.64' y2='18.36' />
                <line x1='18.36' y1='5.64' x2='19.78' y2='4.22' />
              </svg>
            )}
          </button>

          <a href='#contact' className={styles.desktopCtaBtn}>
            Let's Talk
          </a>

          <button
            className={`${styles.hamburgerBtn} ${
              isMobileMenuOpen ? styles.hamburgerActive : ''
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label='Toggle Navigation Menu'
            aria-expanded={isMobileMenuOpen}
          >
            <span className={`${styles.bar} ${styles.barTop}`}></span>
            <span className={`${styles.bar} ${styles.barMid}`}>
              <span className={styles.barDot}></span>
            </span>
            <span className={`${styles.bar} ${styles.barBot}`}></span>
          </button>
        </div>
      </div>
    </header>
  )
}
