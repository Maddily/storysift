// src/routes/authors.js

const express = require('express');
const router = express.Router();
const authorController = require('../controllers/author');

router.post('/', authorController.createAuthor);
router.get('/:id', authorController.getAuthorById);
router.put('/:id', authorController.updateAuthor);
router.delete('/:id', authorController.deleteAuthor);
router.get('/', authorController.getAllAuthors);

module.exports = router;