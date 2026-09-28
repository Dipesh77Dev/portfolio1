import { useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function useVisitorTracking () {
  useEffect(() => {
    const startTime = Date.now()

    // 1. Initial Ping on Page Open (0s duration)
    fetch(`${API_URL}/api/tracking/log`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        referrer: document.referrer || 'Direct Visit',
        timeSpentSeconds: 0
      })
    }).catch(console.error)

    // 2. Log actual duration when visitor leaves or switches tabs
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        const durationSeconds = Math.round((Date.now() - startTime) / 1000)

        if (durationSeconds > 1) {
          const payload = JSON.stringify({
            referrer: document.referrer || 'Direct Visit',
            timeSpentSeconds: durationSeconds
          })

          if (navigator.sendBeacon) {
            const blob = new Blob([payload], { type: 'application/json' })
            navigator.sendBeacon(`${API_URL}/api/tracking/log`, blob)
          }
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])
}
