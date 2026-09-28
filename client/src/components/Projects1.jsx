import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Projects.module.css'

gsap.registerPlugin(ScrollTrigger)

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'mern', label: 'MERN Project' },
  { id: 'client', label: 'Client Project' }
]

const projects = [
  {
    id: 'mindscan-client',
    title: 'Mind Scan Centre',
    desc: 'Mind Scan is a center for healing, inner transformation, and life evolution founded by Dr. Prameela Sreemangalam.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'PHP Forms'],
    category: ['all', 'client', 'frontend'],
    link: 'https://www.mindscancentre.com/',
    mockGradient: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
  },
  {
    id: 'nemera-client',
    title: 'Nemera Technologies',
    desc: 'Nemera Technologies is a globally recognized leader in integrated IT and Telecom Solutions and Services, established since 2000 with headquarters in Bangkok, Thailand.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'PHP Forms'],
    category: ['all', 'client', 'frontend'],
    link: 'https://www.nemera.com/',
    mockGradient: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)'
  },
  {
    id: 'mern-contact-app',
    title: 'MERN Contact Management App',
    desc: 'Full CRUD application built with React frontend and Express/Node/MongoDB backend. Live hosted REST API integration.',
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'REST API'],
    category: ['all', 'mern', 'frontend', 'backend'],
    link: 'https://contact-management-app-mern.netlify.app',
    mockGradient: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)'
  },
  {
    id: 'cleanhedge-client',
    title: 'CleanHedge Verde',
    desc: 'CleanHedge Verde Pvt Ltd is a leading renewable energy solutions provider headquartered in Mumbai.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'PHP Forms'],
    category: ['all', 'client', 'frontend'],
    link: 'https://clean-hedge.com/',
    mockGradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)'
  },
  {
    id: 'react-address-app',
    title: 'React Address Book App',
    desc: 'Interactive state and address management web app featuring live data lookup, addition, updates, and deletion.',
    tech: ['React.js', 'JSON State Engine', 'Netlify Deployment'],
    category: ['all', 'frontend'],
    link: 'https://address-state.netlify.app',
    mockGradient: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)'
  },
  {
    id: 'kirtanlal-client',
    title: 'Kirtanlal Industrial Solutions',
    desc: 'High-quality forged and machined parts, seamless pipes, structural tubulars, premium polymers, PVC resins and advanced construction solutions.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'PHP Forms'],
    category: ['all', 'client', 'frontend'],
    link: 'https://kirtanlal.ae/',
    mockGradient: 'linear-gradient(135deg, #334155 0%, #1e293b 100%)'
  },
  {
    id: 'ejs-product-manager',
    title: 'EJS Product Manager',
    desc: 'Server-side rendered CRUD platform featuring category filtering, database pagination, and schema relations.',
    tech: ['Node.js', 'Express.js', 'MongoDB', 'EJS'],
    category: ['all', 'backend'],
    link: '#',
    mockGradient: 'linear-gradient(135deg, #475569 0%, #0f172a 100%)'
  }
]

export default function Projects () {
  const [activeTab, setActiveTab] = useState('all')
  const sectionRef = useRef(null)
  const gridRef = useRef(null)

  const filteredProjects = projects.filter(proj =>
    proj.category.includes(activeTab)
  )

  useEffect(() => {
    // Fade in animation for section
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

  useEffect(() => {
    // Re-trigger subtle stagger fade animation on filter switch
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out' }
      )
    }
  }, [activeTab])

  return (
    <section className={styles.section} id='projects' ref={sectionRef}>
      <div className={styles.container}>
        {/* Section Header Continuity */}
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>// SELECTED WORKS</div>
          <h2 className={styles.title}>
            FEATURED <span className={styles.orangeText}>PROJECTS</span>
          </h2>
          <div className={styles.headerBar}></div>
          <p className={styles.subtitle}>
            A showcase of client web applications, MERN full-stack builds, and
            frontend engineering solutions.
          </p>
        </div>

        {/* TAB FILTER BUTTONS */}
        <div className={styles.tabWrapper}>
          <div className={styles.tabContainer}>
            {TABS.map(tab => (
              <button
                key={tab.id}
                type='button'
                className={`${styles.tabBtn} ${
                  activeTab === tab.id ? styles.activeTab : ''
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* PROJECTS GRID */}
        <div className={styles.projectsGrid} ref={gridRef}>
          {filteredProjects.map(proj => (
            <div key={proj.id} className={styles.card}>
              <div className={styles.topAccentLine}></div>

              {/* WEBSITE SNAPSHOT / BROWSER FRAME PREVIEW */}
              <div className={styles.snapshotContainer}>
                <div className={styles.browserHeader}>
                  <div className={styles.browserDots}>
                    <span className={styles.dotRed}></span>
                    <span className={styles.dotYellow}></span>
                    <span className={styles.dotGreen}></span>
                  </div>
                  <span className={styles.browserAddress}>
                    {proj.link !== '#'
                      ? proj.link.replace('https://', '')
                      : 'internal-build'}
                  </span>
                </div>
                <div
                  className={styles.snapshotPreview}
                  style={{ background: proj.mockGradient }}
                >
                  <div className={styles.previewOverlay}>
                    <span className={styles.previewTitle}>{proj.title}</span>
                  </div>
                </div>
              </div>

              <div className={styles.cardContent}>
                <div className={styles.projectHeader}>
                  <span className={styles.projectFolder}>⚡</span>
                  {proj.link !== '#' && (
                    <a
                      href={proj.link}
                      target='_blank'
                      rel='noreferrer'
                      className={styles.projectLink}
                    >
                      Live Demo <span className={styles.arrow}>↗</span>
                    </a>
                  )}
                </div>

                <h3 className={styles.projectTitle}>{proj.title}</h3>
                <p className={styles.projectDesc}>{proj.desc}</p>

                <div className={styles.techStack}>
                  {proj.tech.map((t, i) => (
                    <span key={i} className={styles.techTag}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
