const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  ip: { type: String, default: 'Anonymous' },
  city: { type: String, default: 'Unknown' },
  country: { type: String, default: 'Unknown' },
  userAgent: { type: String },
  referrer: { type: String },
  timeSpentSeconds: { type: Number, default: 0 },
  visitedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Visitor', visitorSchema);