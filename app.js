const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const User = require('./src/models/User');
const Author = require('./src/models/Author');
const Book = require('./src/models/Book');
const Rating = require('./src/models/Rating');
const SearchHistory = require('./src/models/SearchHistory');
const Bookshelf = require('./src/models/Bookshelf');

const app = express();

// Connect to MongoDB
const dbURI = "mongodb+srv://senhlema:12345@cluster0.d4v5esk.mongodb.net/Storysift_db?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Successfully connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the 'assets' directory
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Route to create a new user
app.post('/api/users', async (req, res) => {
    try {
        const userData = req.body;
        const newUser = new User(userData);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create user', error: error.message });
    }
});

// Route to fetch all users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', error: error.message });
    }
});

// Route to create a new author
app.post('/api/authors', async (req, res) => {
    try {
        const authorData = req.body;
        const newAuthor = new Author(authorData);
        const savedAuthor = await newAuthor.save();
        res.status(201).json(savedAuthor);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create author', error: error.message });
    }
});

// Route to fetch all authors
app.get('/api/authors', async (req, res) => {
    try {
        const authors = await Author.find();
        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch authors', error: error.message });
    }
});

// Route to create a new book
app.post('/api/books', async (req, res) => {
    try {
        const bookData = req.body;
        const newBook = new Book(bookData);
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create book', error: error.message });
    }
});

// Route to fetch all books
app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.find().populate('author');
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch books', error: error.message });
    }
});

// Route to create a new rating
app.post('/api/ratings', async (req, res) => {
    try {
        const ratingData = req.body;
        const newRating = new Rating(ratingData);
        const savedRating = await newRating.save();
        res.status(201).json(savedRating);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create rating', error: error.message });
    }
});

// Route to create a new review

// Route to create a new search history
app.post('/api/search-history', async (req, res) => {
    try {
        const searchHistoryData = req.body;
        const newSearchHistory = new SearchHistory(searchHistoryData);
        const savedSearchHistory = await newSearchHistory.save();
        res.status(201).json(savedSearchHistory);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create search history', error: error.message });
    }
});

// Route to create a new bookshelf
app.post('/api/bookshelves', async (req, res) => {
    try {
        const bookshelfData = req.body;
        const newBookshelf = new Bookshelf(bookshelfData);
        const savedBookshelf = await newBookshelf.save();
        res.status(201).json(savedBookshelf);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create bookshelf', error: error.message });
    }
});

// Default route - add the landing page here
app.get('/', (req, res) => {
    res.send('Welcome to Storysift');
});

// Route to handle search query and redirect to results page
app.get('/books/search', (req, res) => {
  // Extract the search query from the query parameters
  const query = req.query.query;

  // Redirect to the results page with the search query as a query parameter
  /* res.redirect(`/results.html?query=${encodeURIComponent(query)}`); */
  res.sendFile(path.join(__dirname, 'public', 'results.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
