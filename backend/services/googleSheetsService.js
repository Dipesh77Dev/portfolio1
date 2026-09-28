const { google } = require('googleapis')

// Helper function to format duration
const formatTimeSpent = seconds => {
  const sec = parseInt(seconds, 10) || 0
  if (sec < 60) return `${sec}s`
  const hrs = Math.floor(sec / 3600)
  const mins = Math.floor((sec % 3600) / 60)
  const remainderSecs = sec % 60

  let result = ''
  if (hrs > 0) result += `${hrs}h `
  if (mins > 0) result += `${mins}m `
  if (remainderSecs > 0 || result === '') result += `${remainderSecs}s`
  return result.trim()
}

// Helper function to format date/time nicely (e.g., "28/09/2026, 01:25 PM")
const formatTimestamp = () => {
  return new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  })
}

const appendToGoogleSheet = async data => {
  try {
    if (
      !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ||
      !process.env.GOOGLE_PRIVATE_KEY
    ) {
      console.log('Google Sheets credentials not set. Skipping sheet log.')
      return
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    })

    const sheets = google.sheets({ version: 'v4', auth })

    // Append columns: Timestamp, IP Address, City, Country, Device & OS, Time Spent, Visit Count
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'VisitorTrack!A:H',
      // range: 'Sheet1!A:G',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [
          [
            formatTimestamp(),
            data.ip || 'Unknown',
            data.city || 'Unknown',
            data.country || 'Unknown',
            data.deviceInfo || 'Unknown',
            formatTimeSpent(data.timeSpentSeconds),
            `Visit #${data.visitCount || 1}`
          ]
        ]
      }
    })
    console.log('Data successfully pushed to Google Sheet')
  } catch (error) {
    console.error('Google Sheet Append Error:', error.message)
  }
}

module.exports = { appendToGoogleSheet }
