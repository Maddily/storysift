// src/routes/bookshelves.js

const express = require('express');
const router = express.Router();
const bookshelvesController = require('../controllers/bookshelf');

router.post('/', bookshelvesController.createBookshelf);
router.get('/', bookshelvesController.getAllBookshelves);
router.get('/:id', bookshelvesController.getBookshelfById);
router.put('/:id', bookshelvesController.updateBookshelf);
router.delete('/:id', bookshelvesController.deleteBookshelf);
router.post('/:id/add-book', bookshelfController.addBookToBookshelf);

module.exports = router;
