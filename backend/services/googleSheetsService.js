const { google } = require('googleapis');

const appendToGoogleSheet = async (data) => {
  try {
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      console.log('Google Sheets credentials not set. Skipping sheet log.');
      return;
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:F',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [
          [
            new Date().toISOString(),
            data.ip || 'Unknown',
            data.city || 'Unknown',
            data.country || 'Unknown',
            data.userAgent || 'Unknown',
            `${data.timeSpentSeconds || 0}s`
          ]
        ],
      },
    });
    console.log('Data successfully pushed to Google Sheet');
  } catch (error) {
    console.error('Google Sheet Append Error:', error.message);
  }
};

module.exports = { appendToGoogleSheet };