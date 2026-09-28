const Contact = require('../models/Contact')
const { google } = require('googleapis')
const { Resend } = require('resend')

// Initialize Resend Client (uses HTTPS - 100% compatible with Render)
const resend = new Resend(process.env.RESEND_API_KEY)

// Setup Google Sheets Client
const getGoogleSheetsClient = () => {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY
    ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
    : undefined

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: privateKey
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  })

  return google.sheets({ version: 'v4', auth })
}

exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, message: 'All fields are required.' })
    }

    const formattedDate = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata'
    })

    // 1. SAVE TO MONGODB DATABASE
    const newContact = await Contact.create({ name, email, message })

    // 2. APPEND TO GOOGLE SHEETS
    if (process.env.GOOGLE_SHEET_ID) {
      try {
        const sheets = getGoogleSheetsClient()
        await sheets.spreadsheets.values.append({
          spreadsheetId: process.env.GOOGLE_SHEET_ID,
          range: 'FormSubmissions!A:D',
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [[name, email, message, formattedDate]]
          }
        })
      } catch (sheetErr) {
        console.error('Google Sheets Error:', sheetErr.message)
      }
    }

    // 3. SEND INSTANT EMAIL VIA RESEND HTTPS API
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: 'rajpersonal777@gmail.com',
          subject: `🚀 New Contact Form Submission from ${name}`,
          html: `
            <h3>New Portfolio Connection</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong> ${message}</p>
            <p><strong>Submitted At:</strong> ${formattedDate}</p>
          `
        })
      } catch (emailErr) {
        console.error('Resend Email Error:', emailErr.message)
      }
    }

    // 4. INSTANT RESPONSE TO FRONTEND (< 1 SECOND)
    return res.status(200).json({
      success: true,
      message: 'Message sent successfully!',
      data: newContact
    })
  } catch (error) {
    console.error('Error handling contact submission:', error)
    return res.status(500).json({
      success: false,
      message:
        'Server error while processing your message. Please try again later.'
    })
  }
}
