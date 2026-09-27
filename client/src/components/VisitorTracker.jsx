import { useEffect } from 'react';

export default function VisitorTracker({ userInfo }) {
  useEffect(() => {
    const startTime = Date.now();

    const sendTrackingData = async () => {
      const timeSpentSeconds = Math.round((Date.now() - startTime) / 1000);
      try {
        const geoRes = await fetch('https://ipapi.co/json/').catch(() => null);
        const geoData = geoRes ? await geoRes.json() : {};

        await fetch('http://localhost:5000/api/tracking/log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ip: geoData.ip || 'Anonymous',
            city: geoData.city || 'Unknown',
            country: geoData.country_name || 'Unknown',
            userAgent: navigator.userAgent,
            referrer: document.referrer || 'Direct Visit',
            timeSpentSeconds,
            name: userInfo?.name || 'Anonymous Visitor',
            email: userInfo?.email || 'N/A'
          })
        });
      } catch (err) {
        console.error('Tracking error:', err);
      }
    };

    window.addEventListener('beforeunload', sendTrackingData);
    return () => window.removeEventListener('beforeunload', sendTrackingData);
  }, [userInfo]);

  return null;
}