// src/routes/authors.js

// Import required modules
const express = require('express');
const router = express.Router();
const authorController = require('../controllers/author');

// Define routes
router.post('/', authorController.createAuthor);
router.get('/:id', authorController.getAuthorById);
router.put('/:id', authorController.updateAuthor);
router.delete('/:id', authorController.deleteAuthor);
router.get('/', authorController.getAllAuthors);

// Export the router
module.exports = router;
