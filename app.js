// sets the environment variables
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

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

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the 'assets' directory
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Route imports
const usersRoutes = require('./src/routes/users');
const booksRoutes = require('./src/routes/books');
const authorsRoutes = require('./src/routes/authors');
const reviewsRoutes = require('./src/routes/reviews');
const ratingsRoutes = require('./src/routes/ratings');
const bookshelvesRoutes = require('./src/routes/bookshelves');
const searchHistoriesRoutes = require('./src/routes/searchHistories');
const bookshelfRoutes = require('./src/routes/bookshelves');

// Routes for different models
app.use('/api/users', usersRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/authors', authorsRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/ratings', ratingsRoutes);
app.use('/api/bookshelves', bookshelvesRoutes);
app.use('/api/searchHistories', searchHistoriesRoutes);
app.use('/api/bookshelves', bookshelfRoutes);

// Default route to the landing page
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: './public' });
});

// Route to handle search query and redirect to results page
app.get('/books/search', (req, res) => {
  // Validate user input in the search bar
  const query = req.query.q;
  if (!query || query.trim() === '') {
    return res.status(400).json({ message: 'Invalid search query' });
  }

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

// Route to handle redirecting to a user's profile
app.get('/user', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
