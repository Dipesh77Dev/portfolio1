import { useEffect, useRef } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function useVisitorTracking () {
  const startTimeRef = useRef(Date.now())

  useEffect(() => {
    // 1. Send initial visit ping when page opens
    const sendLog = (timeSpentSeconds = 0) => {
      const payload = JSON.stringify({
        timeSpentSeconds: timeSpentSeconds,
        referrer: document.referrer || 'Direct / Bookmark',
        path: window.location.pathname
      })

      // Use sendBeacon if available on page unload for reliability
      if (navigator.sendBeacon && timeSpentSeconds > 0) {
        const blob = new Blob([payload], { type: 'application/json' })
        navigator.sendBeacon(`${API_URL}/api/tracking/log`, blob)
      } else {
        fetch(`${API_URL}/api/tracking/log`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true
        }).catch(err => console.error('Tracking log error:', err))
      }
    }

    // Log initial page view on load
    sendLog(0)

    // 2. Log time spent when the user leaves or switches tabs
    const handleUnload = () => {
      const durationInSeconds = Math.round(
        (Date.now() - startTimeRef.current) / 1000
      )
      if (durationInSeconds > 2) {
        sendLog(durationInSeconds)
      }
    }

    window.addEventListener('beforeunload', handleUnload)

    return () => {
      window.removeEventListener('beforeunload', handleUnload)
    }
  }, [])
}
