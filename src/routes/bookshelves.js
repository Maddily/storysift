// src/routes/bookshelves.js

const express = require('express');
const router = express.Router();
const Bookshelf = require('../models/Bookshelf');

// Route to create a new bookshelf
router.post('/', async (req, res) => {
    const { name, user_id } = req.body;

    try {
        const newBookshelf = new Bookshelf({ name, user_id });
        const savedBookshelf = await newBookshelf.save();
        res.status(201).json(savedBookshelf);
    } catch (error) {
        console.error('Error creating bookshelf:', error);
        res.status(500).json({ message: 'Failed to create bookshelf', error: error.message });
    }
});

// Route to get all bookshelves
router.get('/', async (req, res) => {
    try {
        const bookshelves = await Bookshelf.find();
        res.status(200).json(bookshelves);
    } catch (error) {
        console.error('Error fetching bookshelves:', error);
        res.status(500).json({ message: 'Failed to fetch bookshelves', error: error.message });
    }
});

// Route to get a single bookshelf by ID
router.get('/:id', async (req, res) => {
    const bookshelfId = req.params.id;

    try {
        const bookshelf = await Bookshelf.findById(bookshelfId);
        if (!bookshelf) {
            return res.status(404).json({ message: 'Bookshelf not found' });
        }
        res.status(200).json(bookshelf);
    } catch (error) {
        console.error('Error fetching bookshelf:', error);
        res.status(500).json({ message: 'Failed to fetch bookshelf', error: error.message });
    }
});

// Route to update a bookshelf by ID
router.put('/:id', async (req, res) => {
    const bookshelfId = req.params.id;
    const updateFields = req.body;

    try {
        const updatedBookshelf = await Bookshelf.findByIdAndUpdate(bookshelfId, updateFields, { new: true });
        if (!updatedBookshelf) {
            return res.status(404).json({ message: 'Bookshelf not found' });
        }
        res.status(200).json(updatedBookshelf);
    } catch (error) {
        console.error('Error updating bookshelf:', error);
        res.status(500).json({ message: 'Failed to update bookshelf', error: error.message });
    }
});

// Route to delete a bookshelf by ID
router.delete('/:id', async (req, res) => {
    const bookshelfId = req.params.id;

    try {
        const deletedBookshelf = await Bookshelf.findByIdAndDelete(bookshelfId);
        if (!deletedBookshelf) {
            return res.status(404).json({ message: 'Bookshelf not found' });
        }
        res.status(200).json({ message: 'Bookshelf deleted' });
    } catch (error) {
        console.error('Error deleting bookshelf:', error);
        res.status(500).json({ message: 'Failed to delete bookshelf', error: error.message });
    }
});

module.exports = router;