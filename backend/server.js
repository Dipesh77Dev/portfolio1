const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

dotenv.config()

// Connect to MongoDB if MONGO_URI is provided
if (process.env.MONGO_URI) {
  connectDB()
}

const app = express()

// Allowed Origins for CORS
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL // Netlify URL set in Render env vars (e.g., https://your-site.netlify.app)
].filter(Boolean)

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, Postman, or server-to-server)
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        allowedOrigins.includes('*')
      ) {
        callback(null, true)
      } else {
        callback(new Error('CORS policy violation: Origin not allowed'))
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
)

app.use(express.json())

// API Health Check & Root Endpoint (For Render Deployment Checks)
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Dipesh Devrukhkar Portfolio API is running live 🚀',
    status: 'Healthy'
  })
})

// API Routes
app.use('/api/tracking', require('./routes/trackingRoutes'));
app.use('/api/chatbot', require('./routes/chatbotRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

// Public Dev/Test API Route
app.get('/api/dev/info', (req, res) => {
  res.json({
    developer: 'Dipesh Devrukhkar',
    role: 'MERN Stack / Frontend Developer',
    status: 'Backend API is running live!'
  })
})

// Port & Host Configuration for Production Hosting (Render/Heroku/Vercel)
const PORT = process.env.PORT || 5000
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
