const express = require('express');
const connectDB = require('./config/db.js');
const authRoutes = require('./routes/auth.js');
const ensureAuthenticated = require('./Middleware/authMiddleWare');
const quizroutes=require('./routes/quizroutes');
const Journalroutes=require('./routes/Journalroutes');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');

dotenv.config();

const app = express();
app.use(express.json());

// Database connection
connectDB();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type'], // Allowed headers
  credentials: true, // Allow credentials (e.g., cookies)
};

app.use(cors(corsOptions));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'o0uONwmL3NJbXIGmuANiSgbL3', // Replace with a strong secret
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true in production with HTTPS
      httpOnly: true, // Helps mitigate XSS attacks by restricting cookie access
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    },
  })
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/assessment',quizroutes);
app.use('/api/GratitudeJournal',Journalroutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
