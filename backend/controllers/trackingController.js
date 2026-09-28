const Visitor = require('../models/Visitor')
const { appendToGoogleSheet } = require('../services/googleSheetsService')
const { UAParser } = require('ua-parser-js')

exports.trackVisitor = async (req, res) => {
  try {
    const { ip, city, country, userAgent, referrer, timeSpentSeconds } =
      req.body

    // 1. Clean the IP Address (Extract only the primary client IP)
    const headerIp =
      req.headers['x-forwarded-for'] || req.socket.remoteAddress || ''
    const rawIp = ip || headerIp || 'Anonymous'
    const cleanIp = rawIp.split(',')[0].trim() // Takes the first real client IP

    // 2. Fetch City & Country server-side if not provided by frontend
    let finalCity = city || 'Unknown'
    let finalCountry = country || 'Unknown'

    if (
      (finalCity === 'Unknown' || finalCountry === 'Unknown') &&
      cleanIp &&
      cleanIp !== '127.0.0.1' &&
      cleanIp !== '::1' &&
      cleanIp !== 'Anonymous'
    ) {
      try {
        const geoRes = await fetch(
          `http://ip-api.com/json/${cleanIp}?fields=status,country,city`
        )
        const geoData = await geoRes.json()
        if (geoData.status === 'success') {
          finalCity = geoData.city || finalCity
          finalCountry = geoData.country || finalCountry
        }
      } catch (geoErr) {
        console.error('Geo API lookup error:', geoErr.message)
      }
    }

    const rawUserAgent = userAgent || req.headers['user-agent'] || ''

    // 3. Parse User Agent into readable Device / OS / Browser
    const parser = new UAParser(rawUserAgent)
    const uaResult = parser.getResult()

    const deviceType = uaResult.device.type
      ? uaResult.device.type.charAt(0).toUpperCase() +
        uaResult.device.type.slice(1)
      : 'Desktop'
    const osName = uaResult.os.name || 'Unknown OS'
    const browserName = uaResult.browser.name || 'Browser'

    const deviceInfo = `${deviceType} (${osName} / ${browserName})`

    // 4. Count existing visits for this IP address
    const previousVisits = await Visitor.countDocuments({ ip: cleanIp })
    const currentVisitCount = previousVisits + 1

    const visitorData = {
      ip: cleanIp,
      city: finalCity,
      country: finalCountry,
      userAgent: rawUserAgent,
      deviceInfo: deviceInfo,
      referrer: referrer || 'Direct Visit',
      timeSpentSeconds: timeSpentSeconds || 0,
      visitCount: currentVisitCount
    }

    // Save to MongoDB
    const visitor = new Visitor(visitorData)
    await visitor.save()

    // Append formatted record to Google Sheets
    await appendToGoogleSheet(visitorData)

    res
      .status(201)
      .json({ success: true, message: 'Visitor data logged successfully' })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}
