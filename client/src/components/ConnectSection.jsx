import React, { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './ConnectSection.module.css'

gsap.registerPlugin(ScrollTrigger)

const INITIAL_STATE = [
  {
    cmd: 'welcome',
    output:
      "👋 Welcome! Type 'help' to view commands or click any quick command below."
  }
]

export default function ConnectSection () {
  const sectionRef = useRef(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')

  // GSAP Scroll Trigger Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    setStatus('Sending...')
    setTimeout(() => {
      setStatus('Message sent successfully!')
      setFormData({ name: '', email: '', message: '' })
    }, 1200)
  }

  // --- TERMINAL LOGIC ---
  const [input, setInput] = useState('')
  const [history, setHistory] = useState(INITIAL_STATE)
  const [isTyping, setIsTyping] = useState(false)
  const terminalBodyRef = useRef(null)

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight
    }
  }, [history, input])

  const processCommand = cmdText => {
    const cmd = cmdText.trim().toLowerCase()
    if (!cmd) return

    let response = ''

    switch (cmd) {
      case 'help':
        response = `Available commands:\n ➔ skills     - View technical skill set\n ➔ experience - View work history & roles\n ➔ projects   - View featured MERN & Web projects\n ➔ contact    - Display email, phone & socials\n ➔ clear      - Reset terminal screen`
        break
      case 'skills':
        response =
          'Frontend: HTML5, CSS3, JavaScript, React.js, GSAP\nBackend: Node.js, Express.js, MongoDB, REST APIs'
        break
      case 'experience':
        response =
          '3+ Years Web Engineering & Full-Stack Development Experience'
        break
      case 'projects':
        response =
          '1. Interactive Websites - Mindscan, Nemera, CleanHedge, Kirtanlal\n2. MERN Stack Web Applications'
        break
      case 'contact':
        response = 'Email: rajpersonal777@gmail.com | Phone: +91 9607745035'
        break
      case 'clear':
        setHistory([
          {
            cmd: 'system',
            output:
              "✨ Terminal screen cleared. Type 'help' to view available commands."
          }
        ])
        setInput('')
        return
      default:
        response = `❌ Command not recognized: '${cmdText}'\n💡 Need assistance? Type 'help' to see all available commands.`
    }

    setHistory(prev => [...prev, { cmd: cmdText, output: response }])
    setInput('')
  }

  const handleFormSubmit = e => {
    e.preventDefault()
    if (isTyping) return
    processCommand(input)
  }

  const handleChipClick = cmdName => {
    if (isTyping) return
    setIsTyping(true)
    setInput('')

    let index = 0
    const interval = setInterval(() => {
      setInput(cmdName.slice(0, index + 1))
      index++

      if (index === cmdName.length) {
        clearInterval(interval)
        setTimeout(() => {
          processCommand(cmdName)
          setIsTyping(false)
        }, 250)
      }
    }, 60)
  }

  const waMessage = encodeURIComponent(
    'Hi Dipesh, I saw your portfolio and would like to connect!'
  )

  return (
    <section className={styles.section} id='connect' ref={sectionRef}>
      <div className={styles.container}>
        {/* SECTION HEADER CONTINUITY */}
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>// GET IN TOUCH</div>
          <h2 className={styles.title}>
            LET'S <span className={styles.orangeText}>CONNECT</span>
          </h2>
          <div className={styles.headerBar}></div>
          <p className={styles.subtitle}>
            Have a project in mind or looking for a Web Developer? Send a
            message or use interactive terminal mode!
          </p>
        </div>

        <div className={styles.grid}>
          {/* LEFT COL: CONTACT FORM + CONTACT INFO + SOCIALS */}
          <div className={styles.leftCol}>
            <div className={styles.blockHeader}>
              <span className={styles.subTag}>// Let's Connect</span>
              <h3 className={styles.blockTitle}>Start A Conversation</h3>
              <p className={styles.desc}>
                Available for high-impact Frontend, MERN Stack, and Web
                Engineering opportunities.
              </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <input
                  type='text'
                  required
                  placeholder='Your Name'
                  value={formData.name}
                  onChange={e =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={styles.input}
                />
                <input
                  type='email'
                  required
                  placeholder='Your Email'
                  value={formData.email}
                  onChange={e =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={styles.input}
                />
              </div>

              <textarea
                rows='4'
                required
                placeholder='Tell me about your project or opportunity...'
                value={formData.message}
                onChange={e =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className={styles.textarea}
              ></textarea>

              <button type='submit' className={styles.submitBtn}>
                Send Message ➔
              </button>

              {status && <p className={styles.status}>{status}</p>}
            </form>

            {/* LEFT SIDE CONTACT INFO CARDS */}
            <div className={styles.infoSection}>
              <div className={styles.infoCardsGroup}>
                <a
                  href='mailto:rajpersonal777@gmail.com'
                  className={styles.infoCard}
                >
                  <div className={styles.iconBox}>
                    <svg
                      width='18'
                      height='18'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                    >
                      <rect x='2' y='4' width='20' height='16' rx='3' />
                      <path d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7' />
                    </svg>
                  </div>
                  <div>
                    <span className={styles.infoLabel}>EMAIL</span>
                    <div className={styles.infoValue}>
                      rajpersonal777@gmail.com
                    </div>
                  </div>
                </a>

                <a href='tel:+919607745035' className={styles.infoCard}>
                  <div className={styles.iconBox}>
                    <svg
                      width='18'
                      height='18'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                    >
                      <path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' />
                    </svg>
                  </div>
                  <div>
                    <span className={styles.infoLabel}>PHONE / WHATSAPP</span>
                    <div className={styles.infoValue}>+91 9607745035</div>
                  </div>
                </a>
              </div>

              {/* SOCIAL ICONS (RESUME, GITHUB, LINKEDIN, INSTAGRAM, WHATSAPP, FACEBOOK) */}
              <div className={styles.socialGroup}>
                {/* RESUME DOWNLOAD */}
                <a
                  href='https://dipesh-devrukhkar-resume.tiiny.site'
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
                  href='https://github.com/Dipesh77Dev'
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
                  href='https://www.linkedin.com/in/dipesh-devrukhkar-1aa912214/'
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
                  href='https://www.instagram.com/dipesh_067/'
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

          {/* RIGHT COL: EQUAL HEIGHT INTERACTIVE TERMINAL */}
          <div className={styles.rightCol}>
            <div className={styles.blockHeader}>
              <span className={styles.subTag}>// Developer Mode</span>
              <h3 className={styles.blockTitle}>Interactive Terminal</h3>
              <p className={styles.desc}>
                Type commands or click quick actions below to inspect details.
              </p>
            </div>

            {/* FULL HEIGHT TERMINAL CONTAINER */}
            <div className={styles.terminalBox}>
              <div className={styles.terminalTop}>
                <span className={`${styles.dot} ${styles.red}`}></span>
                <span className={`${styles.dot} ${styles.yellow}`}></span>
                <span className={`${styles.dot} ${styles.green}`}></span>
                <span className={styles.terminalTitle}>
                  dipesh@portfolio:~ (bash)
                </span>
              </div>

              <div className={styles.terminalBody} ref={terminalBodyRef}>
                {history.map((item, idx) => (
                  <div key={idx} className={styles.historyBlock}>
                    <div>
                      <span style={{ color: '#7ee787' }}>
                        guest@dipesh-dev:~$
                      </span>{' '}
                      {item.cmd}
                    </div>
                    <div className={styles.cliOutput}>{item.output}</div>
                  </div>
                ))}

                {/* CLI INPUT */}
                {/* <form onSubmit={handleFormSubmit} className={styles.cliForm}>
                  <span className={styles.cliPrompt}>guest@dipesh-dev:~$</span>
                  <input
                    type='text'
                    className={styles.cliInput}
                    value={input}
                    disabled={isTyping}
                    onChange={e => setInput(e.target.value)}
                    placeholder={
                      isTyping ? '' : "Type 'help' and press Enter..."
                    }
                  />
                </form> */}
                {/* CLI INPUT */}
                <form onSubmit={handleFormSubmit} className={styles.cliForm}>
                  <span className={styles.cliPrompt}>dev:~$</span>
                  <input
                    type='text'
                    className={styles.cliInput}
                    value={input}
                    disabled={isTyping}
                    onChange={e => setInput(e.target.value)}
                    placeholder={
                      isTyping ? '' : "Type 'help' and press Enter..."
                    }
                  />
                </form>
              </div>

              {/* QUICK CHIPS */}
              <div className={styles.terminalFooter}>
                <span className={styles.chipLabel}>Quick Commands:</span>
                <div className={styles.chipGroup}>
                  <button
                    type='button'
                    disabled={isTyping}
                    onClick={() => handleChipClick('help')}
                    className={styles.chipBtn}
                  >
                    help
                  </button>
                  <button
                    type='button'
                    disabled={isTyping}
                    onClick={() => handleChipClick('skills')}
                    className={styles.chipBtn}
                  >
                    skills
                  </button>
                  <button
                    type='button'
                    disabled={isTyping}
                    onClick={() => handleChipClick('projects')}
                    className={styles.chipBtn}
                  >
                    projects
                  </button>
                  <button
                    type='button'
                    disabled={isTyping}
                    onClick={() => handleChipClick('clear')}
                    className={styles.chipBtn}
                  >
                    clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
