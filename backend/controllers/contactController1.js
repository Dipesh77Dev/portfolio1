const Contact = require('../models/Contact')
const nodemailer = require('nodemailer')
const { google } = require('googleapis')
// const twilio = require('twilio');

// Initialize Twilio Client
// const twilioClient = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// Setup Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // Prevents SMTP connection hangs on Render
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
      ? process.env.EMAIL_PASS.replace(/\s+/g, '')
      : '' // Automatically strips spaces
  }
});

// Setup Google Sheets Auth
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

  // const client = await auth.getClient()
  // return google.sheets({ version: 'v4', auth: client })
}

exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, message: 'All fields are required.' })
    }

    // 1. SAVE TO MONGODB DATABASE
    const newContact = await Contact.create({ name, email, message })
    const formattedDate = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata'
    })

    // 2. SEND EMAIL NOTIFICATION VIA NODEMAILER
    const mailOptions = {
      from: `"Portfolio Alert" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `🚀 New Contact Form Submission from ${name}`,
      html: `
        <h3>New Portfolio Connection</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Submitted At:</strong> ${formattedDate}</p>      
        `
    }

    const emailPromise = transporter.sendMail(mailOptions).catch(err => {
      console.error('Nodemailer Error:', err.message)
    })

    // 3. APPEND ROW TO GOOGLE SHEET
    const sheetsPromise = (async () => {
      if (!process.env.GOOGLE_SHEET_ID) return
      const sheets = getGoogleSheetsClient()
      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'FormSubmissions!A:D',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [
            [
              name,
              email,
              message,
              formattedDate
              // new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
            ]
          ]
        }
      })
    })().catch(err => {
      console.error('Google Sheets Error:', err.message)
      throw err
    })

    // 4. SEND WHATSAPP MESSAGE VIA TWILIO
    // const whatsappPromise = twilioClient.messages.create({
    //   from: process.env.TWILIO_WHATSAPP_NUMBER,
    //   to: process.env.MY_WHATSAPP_NUMBER,
    //   body: `📩 *New Portfolio Lead!*\n\n*Name:* ${name}\n*Email:* ${email}\n*Message:* ${message}`
    // });

    // Execute Notifications Concurrently
    await Promise.allSettled([emailPromise, sheetsPromise])
    // await Promise.allSettled([emailPromise, sheetsPromise, whatsappPromise]);

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
