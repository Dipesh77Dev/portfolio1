import React, { useState, useEffect, useRef } from 'react'
import styles from './Skills.module.css'

const categories = [
  {
    id: 'frontend',
    title: '01. FRONTEND ENGINEERING',
    skills: [
      {
        id: 'react-eco',
        name: 'React.js & Ecosystem',
        level: '92%',
        experience: '1 Year',
        pills: ['Hooks', 'Context API', 'Virtual DOM', 'SPA Architecture'],
        specs: [
          'Custom hooks, global state management, and component profiling.',
          'Building single-page web applications with reactive data binding.',
          'Seamless integration with RESTful backend services.'
        ],
        codeSnippet: `// Custom State Hook\nconst useAsyncData = (fetcher) => {\n  const [state, setState] = useState({ loading: true, data: null });\n  useEffect(() => {\n    fetcher().then(data => setState({ loading: false, data }));\n  }, [fetcher]);\n  return state;\n};`
      },
      {
        id: 'html-css',
        name: 'HTML5, CSS3 & Responsive Web Design',
        level: '95%',
        experience: '3+ Yrs',
        pills: [
          'Flexbox/Grid',
          'CSS Modules',
          'Fluid Typography',
          'Media Queries'
        ],
        specs: [
          'Cross-device mobile-first layout development.',
          'CSS animations, fluid clamp sizing, and clean design token systems.',
          'Pixel-perfect responsive implementation from design specs.'
        ],
        codeSnippet: `.responsiveGrid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 1.5rem;\n}`
      },
      {
        id: 'javascript-es6',
        name: 'JavaScript (ES6+)',
        level: '90%',
        experience: '2+ Yrs',
        pills: ['Async/Await', 'Promises', 'DOM Engine', 'ES Modules'],
        specs: [
          'Asynchronous execution control, closures, and scoping.',
          'Dynamic DOM manipulation and event handling.',
          'Modern ES syntax writing modular and clean JavaScript code.'
        ],
        codeSnippet: `async function fetchPayload(url) {\n  const res = await fetch(url);\n  if (!res.ok) throw new Error('Network error');\n  return await res.json();\n}`
      }
    ]
  },
  {
    id: 'backend-db',
    title: '02. BACKEND & DATABASES',
    skills: [
      {
        id: 'node-express',
        name: 'Node.js & Express.js',
        level: '82%',
        experience: '1 Year',
        pills: [
          'REST API',
          'Middleware Pipelines',
          'Routing',
          'Controller Pattern'
        ],
        specs: [
          'Building scalable server-side REST API endpoints.',
          'Middleware execution for request handling and error processing.',
          'Modular architecture design using Express controllers.'
        ],
        codeSnippet: `const express = require('express');\nconst app = express();\n\napp.use(express.json());\napp.use('/api/v1/data', dataRoutes);\napp.listen(5000);`
      },
      {
        id: 'ejs-ssr',
        name: 'EJS Template Engine',
        level: '85%',
        experience: '1 Year',
        pills: ['SSR', 'Dynamic Views', 'Layout Partials'],
        specs: [
          'Server-side dynamic template rendering with Node.js.',
          'Modular UI structures with reusable header, footer, and navigation partials.',
          'Passing data smoothly between controller logic and template views.'
        ],
        codeSnippet: `<% include('./partials/header') %>\n<main class="content">\n  <h1><%= title %></h1>\n</main>`
      },
      {
        id: 'databases',
        name: 'Databases (MongoDB & MySQL)',
        level: '80%',
        experience: '1 Year',
        pills: ['Mongoose', 'Schema Design', 'SQL Queries', 'CRUD Operations'],
        specs: [
          'Designing structured document collections in MongoDB and relational schemas in MySQL.',
          'Building efficient query pipelines and data validation rules.',
          'Integrating database layer with Express services using Mongoose.'
        ],
        codeSnippet: `const UserSchema = new mongoose.Schema({\n  username: { type: String, required: true },\n  email: { type: String, unique: true }\n});`
      }
    ]
  },
  {
    id: 'tools-growth',
    title: '03. TOOLS, PRACTICE, UPGRADING & AI',
    skills: [
      {
        id: 'tools-qa',
        name: 'Tools, Git & Cross-Browser QA',
        level: '89%',
        experience: '3+ Yrs',
        pills: ['Git', 'GitHub', 'CRUD Design', 'Cross-Browser Testing & QA'],
        specs: [
          'Version control using Git branching and GitHub repository management.',
          'Building reliable CRUD application workflows with client-side state.',
          'Performing cross-browser testing and fixing rendering discrepancies across devices.'
        ],
        codeSnippet: `# Git Workflow\ngit checkout -b feature/ui-upgrade\ngit add .\ngit commit -m "feat: upgrade skills layout"`
      },
      {
        id: 'currently-upgrading',
        name: 'Currently Upgrading',
        level: '88%',
        experience: 'Active',
        pills: [
          'MERN Architecture',
          'React State Management',
          'API Integration'
        ],
        specs: [
          'Deep-diving into production-grade MERN Stack architecture patterns.',
          'Advancing full-stack state synchronization across client and server.',
          'Optimizing complex third-party API data pipelines.'
        ],
        codeSnippet: `// MERN Pipeline Focus\n// Frontend -> Context API -> Express Controller -> MongoDB Collection`
      },
      {
        id: 'ai-assisted-dev',
        name: 'AI-Assisted Development',
        level: '94%',
        experience: 'Daily',
        pills: ['Claude', 'Gemini', 'ChatGPT', 'Perplexity'],
        specs: [
          'Leveraging LLMs for prompt engineering, rapid UI prototyping, and code reviews.',
          'Debugging complex algorithmic issues and syntax edge cases rapidly.',
          'Accelerating research and documentation lookup across technical stacks.'
        ],
        codeSnippet: `/* AI-driven workflow optimization */\nPrompt -> Code Generation -> Refactoring -> Testing`
      }
    ]
  }
]

export default function SkillsBlueprint () {
  const [activeSkillId, setActiveSkillId] = useState('react-eco')
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current)
          }
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleToggle = id => {
    setActiveSkillId(prev => (prev === id ? null : id))
  }

  return (
    <section
      ref={sectionRef}
      className={`${styles.skillsSection} ${isVisible ? styles.visible : ''}`}
      id='skills'
    >
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>
            TECHNICAL <span className={styles.orangeText}>SKILLS</span>
          </h2>
          <div className={styles.headerBar}></div>
          <p className={styles.subtitle}>
            A structured index across modern web engineering, server pipelines,
            workflow tools, and AI instrumentation. Hover or click any skill row
            to view details.
          </p>
        </div>

        {/* Blueprint Matrix */}
        <div className={styles.matrixWrapper}>
          {categories.map((cat, catIdx) => (
            <div
              key={cat.id}
              className={styles.categoryGroup}
              style={{ animationDelay: `${0.1 + catIdx * 0.1}s` }}
            >
              <div className={styles.categoryLabel}>
                <span>{cat.title}</span>
                <div className={styles.categoryLine}></div>
              </div>

              <div className={styles.rowsContainer}>
                {cat.skills.map(skill => {
                  const isActive = activeSkillId === skill.id

                  return (
                    <div
                      key={skill.id}
                      className={`${styles.skillRowWrapper} ${
                        isActive ? styles.activeRowWrapper : ''
                      }`}
                    >
                      {/* Row Main Header */}
                      <div
                        className={styles.skillRowHeader}
                        onClick={() => handleToggle(skill.id)}
                      >
                        <div className={styles.nameBlock}>
                          <span className={styles.indicatorSymbol}>
                            {isActive ? '◢' : '▶'}
                          </span>
                          <span className={styles.skillTitle}>
                            {skill.name}
                          </span>
                        </div>

                        <div className={styles.pillsBlock}>
                          {skill.pills.slice(0, 3).map((pill, i) => (
                            <span key={i} className={styles.pill}>
                              {pill}
                            </span>
                          ))}
                        </div>

                        <div className={styles.metricsBlock}>
                          <span className={styles.expBadge}>
                            {skill.experience}
                          </span>
                          <div className={styles.progressTrack}>
                            <div
                              className={styles.progressFill}
                              style={{ width: skill.level }}
                            ></div>
                          </div>
                          <span className={styles.levelNum}>{skill.level}</span>
                        </div>
                      </div>

                      {/* Animated Drawer Panel */}
                      <div
                        className={`${styles.drawerWrapper} ${
                          isActive ? styles.drawerExpanded : ''
                        }`}
                      >
                        <div className={styles.drawerInner}>
                          <div className={styles.drawerGrid}>
                            {/* Left: Engineering Deliverables */}
                            <div className={styles.specsColumn}>
                              <h4 className={styles.drawerHeading}>
                                // KEY COMPETENCIES & EXECUTION
                              </h4>
                              <ul className={styles.specList}>
                                {skill.specs.map((spec, idx) => (
                                  <li key={idx}>
                                    <span className={styles.listBullet}>↳</span>
                                    <span>{spec}</span>
                                  </li>
                                ))}
                              </ul>
                              <div className={styles.allPillsRow}>
                                {skill.pills.map((pill, idx) => (
                                  <span key={idx} className={styles.subPill}>
                                    #{pill}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Right: Code Pattern Terminal */}
                            <div className={styles.codeColumn}>
                              <div className={styles.terminalHeader}>
                                <span className={styles.termTitle}>
                                  {skill.id}_spec.js
                                </span>
                                <span className={styles.termTag}>
                                  ES6+ ENGINE
                                </span>
                              </div>
                              <pre className={styles.codeBlock}>
                                <code>{skill.codeSnippet}</code>
                              </pre>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
