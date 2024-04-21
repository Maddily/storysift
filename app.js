// sets the environment variables
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const axios = require('axios');
const cors = require('cors');
const User = require('./src/models/User');
const Author = require('./src/models/Author');
const Book = require('./src/models/Book');
const Rating = require('./src/models/Rating');
const SearchHistory = require('./src/models/SearchHistory');
const Bookshelf = require('./src/models/Bookshelf');
// const Review --- add later

const app = express();

// Environment variables
const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;
const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

// Connect to MongoDB
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
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

// Route to search books using Google Books API
app.get('/api/books/search', async (req, res) => {
    const { query } = req.query;

    try {
        const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
            params: {
                q: query,
                key: GOOGLE_BOOKS_API_KEY
            }
        });

        const books = response.data.items.map(item => {
            const bookInfo = item.volumeInfo;
            const publisher = bookInfo.publisher || 'Unknown';
            return {
                title: bookInfo.title,
                description: bookInfo.description,
                language: bookInfo.language,
                page_count: bookInfo.pageCount || 0,
                date_published: bookInfo.publishedDate,
                publisher: publisher,
                thumbnailURL: bookInfo.imageLinks?.thumbnail,
                ISBN: bookInfo.industryIdentifiers ? bookInfo.industryIdentifiers[0].identifier : null,
                // author_id: bookData.author_id, / will be provided later
                // genre_id: bookData.genre_id / will be provided later
                // is this needed?? previewLink: bookInfo.previewLink,
            };
        });

        res.status(200).json(books);
    } catch (error) {
        console.error('Error searching books:', error);
        res.status(500).json({ message: 'Failed to search books', error: error.message });
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

// Route to create a new review TODO...

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

// Default route to the landing page
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: './public' });
});

// Route to handle search query and redirect to results page
app.get('/books/search', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'results.html'));
  });
  
// Route to handle discover button click and redirect to results page
app.get('/books', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'results.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
