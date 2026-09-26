const Visitor = require('../models/Visitor');
const { appendToGoogleSheet } = require('../services/googleSheetsService');

exports.trackVisitor = async (req, res) => {
  try {
    const { ip, city, country, userAgent, referrer, timeSpentSeconds } = req.body;

    const visitorData = {
      ip: ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      city: city || 'Unknown',
      country: country || 'Unknown',
      userAgent: userAgent || req.headers['user-agent'],
      referrer: referrer || 'Direct Visit',
      timeSpentSeconds: timeSpentSeconds || 0
    };

    // Save to MongoDB
    const visitor = new Visitor(visitorData);
    await visitor.save();

    // Append to Google Sheets
    await appendToGoogleSheet(visitorData);

    res.status(201).json({ success: true, message: 'Visitor data logged successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};