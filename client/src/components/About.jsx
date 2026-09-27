import React, { useState, useEffect, useRef } from 'react'
import styles from './About.module.css'

export default function About () {
  const [activeTab, setActiveTab] = useState('summary')
  const [activePill, setActivePill] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const sectionRef = useRef(null)

  const tabs = [
    'summary',
    'workflow',
    'upgrading',
    'education',
    'certifications'
  ]

  // Observer applies fade-in reveal to the WHOLE section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current)
    }
  }, [])

  // 5-Second Autoplay Timer (Pauses on hover)
  useEffect(() => {
    if (!isVisible || isHovered) return

    const timer = setInterval(() => {
      setActiveTab(prevTab => {
        const currentIndex = tabs.indexOf(prevTab)
        const nextIndex = (currentIndex + 1) % tabs.length
        return tabs[nextIndex]
      })
    }, 5000)

    return () => clearInterval(timer)
  }, [isVisible, isHovered])

  const marqueeItems = [
    'HTML5 & CSS3',
    'JavaScript (ES6+)',
    'React.js',
    'Node.js',
    'Express.js',
    'MongoDB',
    'MySQL',
    'REST APIs',
    'Git & GitHub',
    'EJS',
    'Cross-Browser QA',
    'AI-Assisted Dev'
  ]

  const educationData = [
    {
      degree: 'BSc – Computer Science',
      institution: 'Bhavans College, Andheri (W), India',
      period: '2018 – 2021',
      score: 'CGPA: 8.23'
    },
    {
      degree: 'HSC',
      institution: 'Viva College, Virar (W), India',
      period: '2016 – 2018',
      score: 'Final Grade: 63.40%'
    },
    {
      degree: 'SSC',
      institution: 'Sacred Heart High School, Nallasopara (W), India',
      period: '2006 – 2016',
      score: 'Final Grade: 79.80%'
    }
  ]

  const certificationData = [
    {
      title: 'EOQ — Think Technology Services',
      period: 'Jan–Mar 2025, Jan–Mar 2026',
      details: 'Think Technology Services'
    },
    {
      title: 'Web Development (MERN Stack)',
      period: 'Sep 2021 – Apr 2022',
      details: 'Board Infinity'
    },
    {
      title: 'HTML, CSS & MERN Stack Blog Project',
      period: 'Course Completion',
      details: 'Udemy Certificate'
    }
  ]

  const terminalData = {
    summary: {
      cmd: 'cat dipesh_profile.json',
      type: 'list',
      content: [
        '// PROFESSIONAL SUMMARY',
        'Frontend & MERN Stack Developer with 3+ years of experience.',
        'Building responsive, user-focused web applications.',
        'Hands-on experience with REST APIs & CRUD architecture.',
        'Comfortable owning features end-to-end.'
      ]
    },
    workflow: {
      cmd: 'git log --oneline --status',
      type: 'list',
      content: [
        '// WORKFLOW & DELIVERY',
        '✔ Design Review & UI Specs',
        '✔ Clean Component Architecture',
        '✔ Integration Testing & Cross-Browser QA',
        '✔ Deployment & Performance Audits'
      ]
    },
    upgrading: {
      cmd: 'npm run check-skills --target=fullstack',
      type: 'list',
      content: [
        '// ACTIVE GOALS & UPGRADES',
        '→ Deepening Node.js & Express architecture',
        '→ Advanced React State Management',
        '→ Transitioning to Full-Stack Developer roles',
        '→ Integrating AI workflows into development'
      ]
    },
    education: {
      cmd: 'cat academic_records.db',
      type: 'education',
      data: educationData
    },
    certifications: {
      cmd: 'ls -la /credentials/certs',
      type: 'certifications',
      data: certificationData
    }
  }

  const skillCards = [
    {
      title: 'Frontend Mastery',
      tag: 'UI / UX Architecture',
      icon: '🎨',
      skills: [
        'HTML5',
        'CSS3',
        'JavaScript (ES6+)',
        'React.js',
        'Responsive Web Design'
      ],
      desc: 'Crafting responsive, high-performance interfaces with modern React architectures.'
    },
    {
      title: 'Backend & Data',
      tag: 'Server & APIs',
      icon: '⚡',
      skills: ['Node.js', 'Express.js', 'REST APIs', 'MongoDB', 'MySQL', 'EJS'],
      desc: 'Building reliable server-side endpoints and managing database schemas.'
    },
    {
      title: 'Tooling & AI Workflow',
      tag: 'QA & Productivity',
      icon: '🤖',
      skills: [
        'Git',
        'GitHub',
        'CRUD Design',
        'Cross-Browser QA',
        'Claude / ChatGPT / Gemini'
      ],
      desc: 'Optimizing development speed with Git workflows and AI-assisted tooling.'
    }
  ]

  return (
    <section
      ref={sectionRef}
      className={`${styles.aboutSection} ${
        isVisible ? styles.fadeInVisible : styles.fadeInHidden
      }`}
      id='about'
    >
      <div className={styles.radialGlow}></div>

      {/* HIGH-CONTRAST MARQUEE */}
      <div className={styles.marqueeWrapper}>
        <div className={styles.marqueeTrack}>
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <button
              key={`${item}-${idx}`}
              className={`${styles.marqueePill} ${
                activePill === idx ? styles.activeMarqueePill : ''
              }`}
              onClick={() => setActivePill(activePill === idx ? null : idx)}
            >
              <span className={styles.sparkle}>✦</span>
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.container}>
        {/* RESTRUCTURED & CLEAN HEADER */}
        <div className={styles.headerGroup}>
          <h2 className={styles.mainTitle}>ABOUT 
          <span className={styles.orangeText}> ME</span></h2>
          <div className={styles.titleGlowLine}></div>
          <p className={styles.subHeading}>
            Crafting Scalable, Interactive & High-Performance Web Solutions
          </p>
          <p className={styles.descriptionText}>
            Passionate about transforming complex design specs into smooth,
            responsive user interfaces and robust end-to-end full-stack
            applications.
          </p>
        </div>

        {/* INTERACTIVE HUD & METRICS */}
        <div className={styles.interactiveGrid}>
          <div
            className={styles.terminalContainer}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className={styles.terminalHeader}>
              <div className={styles.terminalDots}>
                <span className={styles.dotRed}></span>
                <span className={styles.dotYellow}></span>
                <span className={styles.dotGreen}></span>
              </div>
              <span className={styles.terminalTitle}>dipesh@developer:~</span>
            </div>

            <div className={styles.terminalTabs}>
              <button
                className={activeTab === 'summary' ? styles.activeTab : ''}
                onMouseEnter={() => setActiveTab('summary')}
                onClick={() => setActiveTab('summary')}
              >
                Profile Summary
              </button>
              <button
                className={activeTab === 'workflow' ? styles.activeTab : ''}
                onMouseEnter={() => setActiveTab('workflow')}
                onClick={() => setActiveTab('workflow')}
              >
                Workflow
              </button>
              <button
                className={activeTab === 'upgrading' ? styles.activeTab : ''}
                onMouseEnter={() => setActiveTab('upgrading')}
                onClick={() => setActiveTab('upgrading')}
              >
                Current Focus
              </button>
              <button
                className={activeTab === 'education' ? styles.activeTab : ''}
                onMouseEnter={() => setActiveTab('education')}
                onClick={() => setActiveTab('education')}
              >
                Education
              </button>
              <button
                className={
                  activeTab === 'certifications' ? styles.activeTab : ''
                }
                onMouseEnter={() => setActiveTab('certifications')}
                onClick={() => setActiveTab('certifications')}
              >
                Certs
              </button>
            </div>

            <div className={styles.terminalBody}>
              <p className={styles.terminalPrompt}>
                <span className={styles.promptUser}>dipesh@dev:~$</span>{' '}
                {terminalData[activeTab].cmd}
              </p>

              <div className={styles.terminalOutput}>
                {terminalData[activeTab].type === 'list' &&
                  terminalData[activeTab].content.map((line, index) => (
                    <p key={index} className={styles.terminalLine}>
                      {line}
                    </p>
                  ))}

                {terminalData[activeTab].type === 'education' && (
                  <div className={styles.terminalGrid}>
                    {terminalData[activeTab].data.map((edu, idx) => (
                      <div key={idx} className={styles.terminalItem}>
                        <div className={styles.itemHeader}>
                          <span className={styles.itemTitle}>
                            [DEGREE]: {edu.degree}
                          </span>
                          <span className={styles.itemBadge}>{edu.period}</span>
                        </div>
                        <div className={styles.itemHeader1}>
                        <p className={styles.itemSub}>{edu.institution}</p>
                        <p className={styles.itemDetail}>▶ {edu.score}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {terminalData[activeTab].type === 'certifications' && (
                  <div className={styles.terminalGrid}>
                    {terminalData[activeTab].data.map((cert, idx) => (
                      <div key={idx} className={styles.terminalItem}>
                        <div className={styles.itemHeader}>
                          <span className={styles.itemTitle}>
                            [CERT]: {cert.title}
                          </span>
                          <span className={styles.itemBadge}>
                            {cert.period}
                          </span>
                        </div>
                        <p className={styles.itemSub}>
                          Issued by: {cert.details}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.metricsStack}>
            <div className={styles.glassStatCard}>
              <div className={styles.statHeader}>
                <span className={styles.statNumber}>3+</span>
                <span className={styles.statPlus}>Years</span>
              </div>
              <p className={styles.statDesc}>
                Experience building responsive, user-focused web applications.
              </p>
            </div>

            <div className={styles.glassStatCard}>
              <div className={styles.statHeader}>
                <span className={styles.statNumber}>100%</span>
              </div>
              <p className={styles.statDesc}>
                End-to-End Ownership: From design review through testing &
                delivery.
              </p>
            </div>

            <div className={styles.highlightBadgeCard}>
              <div className={styles.pulseContainer}>
                <span className={styles.pulseDot}></span>
                <span className={styles.pulseText}>FULL-STACK TRANSITION</span>
              </div>
              <p>
                Deepening MERN stack proficiency with hands-on real-world
                projects.
              </p>
            </div>
          </div>
        </div>

        {/* SKILLS CARDS */}
        <div className={styles.cardsGrid}>
          {skillCards.map((card, idx) => (
            <div key={idx} className={styles.glowCard}>
              <div className={styles.cardTop}>
                <span className={styles.cardIcon}>{card.icon}</span>
                <span className={styles.cardTag}>{card.tag}</span>
              </div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDescription}>{card.desc}</p>
              <div className={styles.tagsContainer}>
                {card.skills.map((skill, sIdx) => (
                  <span key={sIdx} className={styles.glowTag}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* EDUCATION & CREDENTIALS */}
        <div className={styles.credentialsContainer}>
          <div className={styles.credentialsBlock}>
            <div className={styles.blockTitleRow}>
              <span className={styles.blockIcon}>🎓</span>
              <h3 className={styles.blockTitle}>ACADEMIC BACKGROUND</h3>
            </div>
            <div className={styles.credentialsList}>
              {educationData.map((edu, idx) => (
                <div key={idx} className={styles.credCard}>
                  <div className={styles.credTop}>
                    <h4 className={styles.credDegree}>{edu.degree}</h4>
                    <span className={styles.credPeriod}>{edu.period}</span>
                  </div>
                  <p className={styles.credInst}>{edu.institution}</p>
                  <span className={styles.credScore}>{edu.score}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.credentialsBlock}>
            <div className={styles.blockTitleRow}>
              <span className={styles.blockIcon}>📜</span>
              <h3 className={styles.blockTitle}>COURSES & CERTIFICATIONS</h3>
            </div>
            <div className={styles.credentialsList}>
              {certificationData.map((cert, idx) => (
                <div key={idx} className={styles.credCard}>
                  <div className={styles.credTop}>
                    <h4 className={styles.credDegree}>{cert.title}</h4>
                    <span className={styles.credPeriod}>{cert.period}</span>
                  </div>
                  <p className={styles.credInst}>{cert.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
