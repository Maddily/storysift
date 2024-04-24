// src/routes/authors.js (optional - it may not be necessary to create an author)

const express = require('express');
const router = express.Router();
const Author = require('../models/Author');

// Route to create a new author
router.post('/', async (req, res) => {
    try {
        const author = await Author.create(req.body);
        res.status(201).json(author);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create author', error: error.message });
    }
});

// Route to get all authors
router.get('/', async (req, res) => {
    try {
        const authors = await Author.find();
        res.json(authors);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch authors', error: error.message });
    }
});

// Other routes for retrieving a single author, updating, and deleting

module.exports = router;