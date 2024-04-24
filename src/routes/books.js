// src/routes/books.js

const express = require('express');
const router = express.Router();
const booksController = require('../controllers/book');

// Route to search books using Google Books API
router.get('/search', booksController.searchBooks);
// Route to get book details by volumeId
router.get('/:volumeId/details', booksController.getBookDetails);


router.post('/', booksController.createBook);
router.get('/', booksController.getAllBooks);
router.get('/:id', booksController.getBookById);
router.put('/:id', booksController.updateBook);
router.delete('/:id', booksController.deleteBook);

module.exports = router;
