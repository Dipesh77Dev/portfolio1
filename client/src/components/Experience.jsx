import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Experience.module.css'

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    role: 'Executive Web Developer',
    company: 'Think Technology Services, Mumbai',
    date: 'Oct 2023 - Aug 2026',
    bullets: [
      'Design, build, and maintain company and client web applications, handling full-cycle feature updates.',
      'Conduct website audits to identify performance bottlenecks, SEO, and usability issues.',
      'Plan and execute seamless site migrations with minimal downtime and data integrity.',
      'Build and manage marketing emailers, coordinating layout, content, and delivery.',
      'Progressed from Junior Web Developer to Executive Web Developer, driving client-facing tech strategies.'
    ]
  },
  {
    role: 'Web Developer - Internship',
    company: 'ProcMart, Noida (Remote)',
    date: 'Jun 2023 - Aug 2023',
    bullets: [
      'Contributed to engineering the core ProcMart B2B web portal as part of the dev team.',
      'Conducted testing and design reviews ensuring responsiveness and multi-device clarity.'
    ]
  },
  {
    role: 'Web Developer - Internship',
    company: 'Desani-XR, Surat (Remote)',
    date: 'Sep 2022 - Jan 2023',
    bullets: [
      'Built high-conversion client web pages using HTML, CSS, and JavaScript.',
      'Tested site designs for responsiveness, cross-browser consistency, and usability.',
      'Collaborated with EOE (East of Emirates) stakeholders on project goals and milestones.'
    ]
  },
  {
    role: 'HTML/CSS Developer',
    company: 'Artists Association Of India (Remote)',
    date: 'Dec 2021 - Feb 2022',
    bullets: [
      'Designed and built small-scale web pages using clean HTML and CSS.',
      'Tested and reviewed website designs for visual clarity and effectiveness prior to release.'
    ]
  },
  {
    role: 'Social Media Intern',
    company: 'MB Softech Consultants (Remote)',
    date: 'Feb 2022 - Apr 2022',
    bullets: [
      'Managed daily social media updates to strengthen online presence.',
      'Researched and published curated crypto/trading content across Telegram, Twitter, and partner channels.'
    ]
  },
  {
    role: 'Game Tester',
    company: 'MB Softech Consultants (Remote)',
    date: 'Nov 2021 - Feb 2022',
    bullets: [
      'Tested multi-platform game builds across 4–5 devices simultaneously for cross-version consistency.',
      'Collaborated with QA to validate multiplayer functionality and log defects.'
    ]
  }
]

export default function Experience () {
  const containerRef = useRef(null)
  const progressBarRef = useRef(null)
  const itemsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. LEFT VERTICAL TRACK FILL ON SCROLL
      gsap.to(progressBarRef.current, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          end: 'bottom 80%',
          scrub: 0.5
        }
      })

      // 2. SYNCHRONIZED CARD SVG BORDER TRACE + OPACITY ANIMATION
      itemsRef.current.forEach(item => {
        if (!item) return

        const path = item.querySelector(`.${styles.boxPath}`)
        const content = item.querySelector(`.${styles.cardInner}`)

        if (path) {
          const pathLength = path.getTotalLength()

          gsap.set(path, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength
          })

          gsap
            .timeline({
              scrollTrigger: {
                trigger: item,
                start: 'top 75%',
                end: 'top 30%',
                scrub: 0.5,
                onEnter: () => item.classList.add(styles.activeState),
                onLeaveBack: () => item.classList.remove(styles.activeState)
              }
            })
            .to(path, { strokeDashoffset: 0, ease: 'none', duration: 1 })
            .to(content, { opacity: 1, y: 0, ease: 'none', duration: 1 }, '<')
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className={styles.section} id='experience' ref={containerRef}>
      <div className={styles.container}>
        {/* Section Header matching Portfolio Theme Continuity */}
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTag}>// CAREER EVOLUTION</div>
          <h2 className={styles.title}>
            PROFESSIONAL <span className={styles.orangeText}>EXPERIENCE</span>
          </h2>
          <div className={styles.headerBar}></div>
          <p className={styles.subtitle}>
            A timeline of roles, web development engineering experience, and
            technical accomplishments.
          </p>
        </div>

        <div className={styles.timelineWrapper}>
          {/* LEFT VERTICAL TRACK */}
          <div className={styles.verticalTrack}>
            <div className={styles.lineBase}></div>
            <div className={styles.lineProgress} ref={progressBarRef}></div>
          </div>

          {/* CARDS LIST WITH TRACING SVG BOXES */}
          <div className={styles.itemsList}>
            {experiences.map((exp, index) => (
              <div
                key={index}
                ref={el => (itemsRef.current[index] = el)}
                className={styles.timelineItem}
              >
                {/* BLINKING NODE CIRCLE */}
                <div className={styles.nodeCircle}></div>

                {/* CARD CONTAINER WITH DYNAMIC BORDER TRACE */}
                <div className={styles.cardBox}>
                  {/* SVG TRACING BORDER RECTANGLE */}
                  <svg className={styles.svgBorder} width='100%' height='100%'>
                    <rect
                      x='2'
                      y='2'
                      width='calc(100% - 4px)'
                      height='calc(100% - 4px)'
                      rx='12'
                      className={styles.boxPath}
                    />
                  </svg>

                  {/* CARD CONTENT */}
                  <div className={styles.cardInner}>
                    <div className={styles.cardHeader}>
                      <div>
                        <h3 className={styles.roleTitle}>{exp.role}</h3>
                        <div className={styles.companyName}>{exp.company}</div>
                      </div>
                      <span className={styles.dateBadge}>{exp.date}</span>
                    </div>

                    <ul className={styles.bulletList}>
                      {exp.bullets.map((bullet, idx) => (
                        <li key={idx}>
                          <span className={styles.bulletIcon}>✦</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
