const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Route to fetch all books
router.get('/books', bookController.getBooks);

// Route to search books via Google Books API
router.get('/books/search', bookController.searchBooks);

module.exports = router;