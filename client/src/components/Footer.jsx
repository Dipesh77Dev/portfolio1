import React, { useState, useEffect } from 'react'
import styles from './Footer.module.css'

export default function Footer () {
  const [copied, setCopied] = useState(false)
  const [currentTime, setCurrentTime] = useState('')

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }
      setCurrentTime(now.toLocaleTimeString('en-US', options))
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('rajpersonal777@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  const scrollToSection = id => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const waMessage = encodeURIComponent(
    'Hi Dipesh, I checked your portfolio and would love to connect!'
  )

  return (
    <footer className={styles.footer}>
      {/* GLOW DECORATIONS */}
      <div className={styles.topGlow}></div>

      <div className={styles.container}>
        {/* TOP ROW: BRAND & LIVE TELEMETRY */}
        <div className={styles.topRow}>
          <div className={styles.brandGroup}>
            <div className={styles.logoBadge}>
              <span className={styles.codeTag}>&lt;/&gt;</span>
              <span className={styles.brandName}>Dipesh Devrukhkar</span>
            </div>
            <p className={styles.brandTagline}>
              Crafting interactive 3D web experiences, MERN stack web
              applications, and high-performance UI systems.
            </p>
          </div>

          <div className={styles.statusBox}>
            <div className={styles.statusBadge}>
              <span className={styles.livePulse}></span>
              <span>AVAILABLE FOR NEW OPPORTUNITIES</span>
            </div>
            <div className={styles.clockWidget}>
              <span className={styles.clockIcon}>⚡</span>
              <span className={styles.timeText}>
                {currentTime || '12:00:00 AM'} IST
              </span>
              <span className={styles.locationTag}>(India)</span>
            </div>
          </div>
        </div>

        <div className={styles.divider}></div>

        {/* MIDDLE ROW: NAV LINKS, INTERACTIVE ACTIONS & TECH BADGES */}
        <div className={styles.middleRow}>
          {/* QUICK NAV */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>// NAVIGATION</h4>
            <ul className={styles.navList}>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className={styles.navBtn}
                >
                  About Me
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('skills')}
                  className={styles.navBtn}
                >
                  Tech Stack
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('experience')}
                  className={styles.navBtn}
                >
                  Experience
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('projects')}
                  className={styles.navBtn}
                >
                  Featured Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className={styles.navBtn}
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* INTERACTIVE CONNECT ACTION */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>// DIRECT CONTACT</h4>
            <div className={styles.interactiveCopyBox}>
              <span className={styles.emailLabel}>GET IN TOUCH</span>
              <button
                onClick={handleCopyEmail}
                className={styles.copyEmailBtn}
                title='Click to copy email'
              >
                <span className={styles.emailText}>
                  rajpersonal777@gmail.com
                </span>
                <span className={styles.copyBadge}>
                  {copied ? '✓ COPIED' : 'COPY'}
                </span>
              </button>
            </div>

            <div className={styles.phoneLinkGroup}>
              <a href='tel:+919607745035' className={styles.phoneLink}>
                📞 +91 9607745035
              </a>
            </div>
          </div>

          {/* TECH STACK CHIPS */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>// ENGINE STACK</h4>
            <div className={styles.techPills}>
              <span className={styles.pill}>React.js</span>
              <span className={styles.pill}>Node.js</span>
              <span className={styles.pill}>Express</span>
              <span className={styles.pill}>MongoDB</span>
              <span className={styles.pill}>GSAP</span>
            </div>
          </div>
        </div>

        <div className={styles.divider}></div>

        {/* BOTTOM ROW: SOCIAL LINKS & COPYRIGHT */}
        <div className={styles.bottomRow}>
          <p className={styles.copyright}>
            © 2026{' '}
            <strong className={styles.highlightName}>Dipesh Devrukhkar</strong>.
            Built with React, GSAP & MERN Stack.
          </p>

          <div className={styles.socialGroup}>
            {/* RESUME DOWNLOAD */}
            <a
              href='/resume.pdf'
              download
              className={styles.socialBtn}
              title='Download Resume'
            >
              <svg
                width='18'
                height='18'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
                <polyline points='7 10 12 15 17 10' />
                <line x1='12' y1='15' x2='12' y2='3' />
              </svg>
            </a>

            {/* GITHUB */}
            <a
              href='https://github.com'
              target='_blank'
              rel='noreferrer'
              className={styles.socialBtn}
              title='GitHub'
            >
              <svg
                width='18'
                height='18'
                viewBox='0 0 24 24'
                fill='currentColor'
              >
                <path d='M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z' />
              </svg>
            </a>

            {/* LINKEDIN */}
            <a
              href='https://linkedin.com'
              target='_blank'
              rel='noreferrer'
              className={styles.socialBtn}
              title='LinkedIn'
            >
              <svg
                width='18'
                height='18'
                viewBox='0 0 24 24'
                fill='currentColor'
              >
                <path d='M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z' />
              </svg>
            </a>

            {/* INSTAGRAM */}
            <a
              href='https://instagram.com'
              target='_blank'
              rel='noreferrer'
              className={styles.socialBtn}
              title='Instagram'
            >
              <svg
                width='18'
                height='18'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <rect x='2' y='2' width='20' height='20' rx='5' ry='5' />
                <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />
                <line x1='17.5' y1='6.5' x2='17.51' y2='6.5' />
              </svg>
            </a>

            {/* WHATSAPP API CHAT */}
            <a
              href={`https://wa.me/919607745035?text=${waMessage}`}
              target='_blank'
              rel='noreferrer'
              className={styles.socialBtn}
              title='Chat on WhatsApp'
            >
              <svg
                width='18'
                height='18'
                viewBox='0 0 24 24'
                fill='currentColor'
              >
                <path d='M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z' />
              </svg>
            </a>

            {/* FACEBOOK */}
            {/* <a
              href='https://facebook.com'
              target='_blank'
              rel='noreferrer'
              className={styles.socialBtn}
              title='Facebook'
            >
              <svg
                width='18'
                height='18'
                viewBox='0 0 24 24'
                fill='currentColor'
              >
                <path d='M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.5C10 7.01 11.49 5.6 13.78 5.6c1.1 0 2.25.2 2.25.2v2.48h-1.27c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 3h-2.33v6.8c4.56-.93 8-4.96 8-9.8z' />
              </svg>
            </a> */}
          </div>
        </div>
      </div>
    </footer>
  )
}
