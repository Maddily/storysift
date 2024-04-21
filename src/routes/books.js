const express = require('express');
const router = express.Router();
const axios = require('axios');
const User = require('../models/Book');
const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

// Route to handle search query and redirect to results page
router.get('/books/search', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'results.html'));
  });
  
// Route to handle discover button click and redirect to results page
router.get('/books', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'results.html'));
});

// Route to create a new book
router.post('/api/books', async (req, res) => {
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
router.get('/api/books', async (req, res) => {
    try {
        const books = await Book.find().populate('author');
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch books', error: error.message });
    }
});

// Route to search books using Google Books API
router.get('/search', async (req, res) => {
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

// Route to fetch detailed information about a specific book via its ID
router.get('/api/books/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`, {
            params: {
                key: GOOGLE_BOOKS_API_KEY
            }
        });

        const bookInfo = response.data.volumeInfo;
        const publisher = bookInfo.publisher || 'Unknown';
        const book = {
            title: bookInfo.title,
            description: bookInfo.description,
            language: bookInfo.language,
            page_count: bookInfo.pageCount || 0,
            date_published: bookInfo.publishedDate,
            publisher: publisher,
            thumbnailURL: bookInfo.imageLinks?.thumbnail,
            ISBN: bookInfo.industryIdentifiers ? bookInfo.industryIdentifiers[0].identifier : null
        };

        res.status(200).json(book);
    } catch (error) {
        console.error('There was an error fetching book details:', error);
        res.status(500).json({ message: 'Failed to fetch book details', error: error.message });
    }
});

module.exports = router;