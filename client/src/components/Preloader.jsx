import React, { useEffect, useState, useCallback } from 'react'
import styles from './Preloader.module.css'

const LOADING_STEPS = [
  {
    threshold: 20,
    step: '01/05',
    label: 'INITIALIZING_CORE_ENV',
    sub: '< Dipesh Devrukhkar /> Portfolio Engine'
  },
  {
    threshold: 40,
    step: '02/05',
    label: 'LOADING_MERN_STACK_SERVICES',
    sub: 'Connecting REST APIs & MongoDB Services'
  },
  {
    threshold: 60,
    step: '03/05',
    label: 'CONFIGURING_GSAP_&_WEBGL',
    sub: 'Setting up 3D Canvas & Scroll Animations'
  },
  {
    threshold: 80,
    step: '04/05',
    label: 'OPTIMIZING_PERFORMANCE_&_ASSETS',
    sub: 'Compiling Smooth Scroll & Responsive Layouts'
  },
  {
    threshold: 100,
    step: '05/05',
    label: 'SYSTEM_READY',
    sub: 'Launching Interactive Developer Experience...'
  }
]

export default function Preloader ({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [speed, setSpeed] = useState(25) // Speed in ms

  const getCurrentStep = useCallback(() => {
    return (
      LOADING_STEPS.find(s => progress <= s.threshold) ||
      LOADING_STEPS[LOADING_STEPS.length - 1]
    )
  }, [progress])

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            if (onComplete) onComplete()
          }, 350)
          return 100
        }
        return prev + 1
      })
    }, speed)

    return () => clearInterval(interval)
  }, [speed, onComplete])

  // Keyboard shortcut (Enter / Space) to boost speed
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Enter' || e.key === ' ') {
        setSpeed(6)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleBoost = () => {
    setSpeed(6) // Turbo boost progress speed on click/tap
  }

  const currentStepInfo = getCurrentStep()

  return (
    <div
      className={styles.preloaderOverlay}
      onClick={handleBoost}
      title='Click anywhere to fast-forward loading'
    >
      {/* Background Grid Accent */}
      <div className={styles.gridBackground}></div>

      <div className={styles.loaderCard}>
        {/* TERMINAL HEADER BAR */}
        <div className={styles.windowHeader}>
          <div className={styles.windowDots}>
            <span className={`${styles.dot} ${styles.red}`}></span>
            <span className={`${styles.dot} ${styles.yellow}`}></span>
            <span className={`${styles.dot} ${styles.green}`}></span>
          </div>
          <div className={styles.windowTitle}>
            <span className={styles.codeIcon}>&lt;/&gt;</span>
            <span className={styles.developerName}>Dipesh Devrukhkar</span>
          </div>
          <span className={styles.versionBadge}>v2.4.0</span>
        </div>

        {/* LOADER CONTENT */}
        <div className={styles.loaderContent}>
          {/* STEP COUNTER & PERCENTAGE */}
          <div className={styles.telemetryRow}>
            <div className={styles.stepBadge}>
              <span className={styles.stepIndicator}>
                STEP {currentStepInfo.step}
              </span>
            </div>
            <div className={styles.percentageBox}>
              <span className={styles.percentValue}>{progress}</span>
              <span className={styles.percentSymbol}>%</span>
            </div>
          </div>

          {/* PROGRESS BAR */}
          <div className={styles.barContainer}>
            <div className={styles.barFill} style={{ width: `${progress}%` }}>
              <div className={styles.barGlow}></div>
            </div>
          </div>

          {/* DYNAMIC 5-STAGE STATUS TEXT */}
          <div className={styles.statusBlock}>
            <div className={styles.statusLabelRow}>
              <span className={styles.statusPulse}></span>
              <span className={styles.statusLabel}>
                {currentStepInfo.label}
              </span>
            </div>
            <p className={styles.statusSubtext}>{currentStepInfo.sub}</p>
          </div>

          {/* INTERACTIVE CONTROLS */}
          <div className={styles.interactiveFooter}>
            <span className={styles.hintText}>
              <span className={styles.keyBadge}>CLICK</span> or press{' '}
              <span className={styles.keyBadge}>SPACE</span> to turbo-load
            </span>
            <button
              type='button'
              className={styles.skipBtn}
              onClick={e => {
                e.stopPropagation()
                setProgress(100)
              }}
            >
              SKIP INTRO ➔
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
