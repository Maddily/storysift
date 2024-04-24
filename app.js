// sets the environment variables
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const axios = require('axios');
const cors = require('cors');
const session = require('express-session');
const crypto = require('crypto');

const app = express();

// Environment variables
const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;

// Connect to MongoDB
mongoose.connect(DB_URI, {})
    .then(() => {
        console.log('Successfully connected to MongoDB!');
    })
    .catch((err) => {
        console.error('There was an error connecting to MongoDB:', err);
    });

// Generate a random string of specified length
const generateRandomString = (length) => {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
};

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the 'assets' directory
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(session({
  secret: generateRandomString(32), // A random secret key
  resave: false,
  saveUninitialized: false,
  cookie: {
      secure: true, // Using HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 24 hours in milliseconds
  }
}));

// Route imports
const usersRoutes = require('./src/routes/users');
const booksRoutes = require('./src/routes/books');

// Routes for different models
app.use('/api/users', usersRoutes);
app.use('/api/books', booksRoutes);

// Default route to the landing page
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: './public' });
});

// Route to handle search query and redirect to results page
app.get('/books/search', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'results.html'));
  });

// Route to handle clicking a book and redirect to book details page
app.get('/books', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'details.html'));
  });

// Route to handle redirecting to sign up page
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'sign-up.html'));
  });

// Route to handle redirecting to sign in page
app.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'sign-in.html'));
  });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
