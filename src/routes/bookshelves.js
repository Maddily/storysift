// src/routes/bookshelves.js

const express = require('express');
const router = express.Router();
const bookshelvesController = require('../controllers/bookshelf');

// Define routes
router.post('/', bookshelvesController.createBookshelf);
router.get('/', bookshelvesController.getAllBookshelves);
router.get('/:id', bookshelvesController.getBookshelfById);
router.put('/:id', bookshelvesController.updateBookshelf);
router.delete('/:id', bookshelvesController.deleteBookshelf);

// Export the router
module.exports = router;
