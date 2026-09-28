const Visitor = require('../models/Visitor')
const { appendToGoogleSheet } = require('../services/googleSheetsService')
const { UAParser } = require('ua-parser-js')

exports.trackVisitor = async (req, res) => {
  try {
    const { ip, city, country, userAgent, referrer, timeSpentSeconds } =
      req.body

    const rawIp =
      ip ||
      req.headers['x-forwarded-for'] ||
      req.socket.remoteAddress ||
      'Anonymous'
    const rawUserAgent = userAgent || req.headers['user-agent'] || ''

    // 1. Parse User Agent into readable Device / OS / Browser
    const parser = new UAParser(rawUserAgent)
    const uaResult = parser.getResult()

    const deviceType = uaResult.device.type
      ? uaResult.device.type.charAt(0).toUpperCase() +
        uaResult.device.type.slice(1)
      : 'Desktop'
    const osName = uaResult.os.name || 'Unknown OS'
    const browserName = uaResult.browser.name || 'Browser'

    const deviceInfo = `${deviceType} (${osName} / ${browserName})`

    // 2. Count existing visits for this IP address
    const previousVisits = await Visitor.countDocuments({ ip: rawIp })
    const currentVisitCount = previousVisits + 1

    const visitorData = {
      ip: rawIp,
      city: city || 'Unknown',
      country: country || 'Unknown',
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
