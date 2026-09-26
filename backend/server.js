const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

// Connect to MongoDB if MONGO_URI is provided
if (process.env.MONGO_URI) {
  connectDB();
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/tracking', require('./routes/trackingRoutes'));
app.use('/api/chatbot', require('./routes/chatbotRoutes'));

// Public Dev/Test API Route
app.get('/api/dev/info', (req, res) => {
  res.json({
    developer: "Dipesh Devrukhkar",
    role: "MERN Stack / Frontend Developer",
    status: "Backend API is running live!"
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));