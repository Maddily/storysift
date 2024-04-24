// src/controllers/bookshelf.js

const Bookshelf = require('../models/Bookshelves');

// Controller function to create a new bookshelf
async function createBookshelf(req, res) {
    const { name, user_id } = req.body;

    try {
        const newBookshelf = new Bookshelf({ name, user_id });
        const savedBookshelf = await newBookshelf.save();
        res.status(201).json(savedBookshelf);
    } catch (error) {
        console.error('Error creating bookshelf:', error);
        res.status(500).json({ message: 'Failed to create bookshelf', error: error.message });
    }
}

// Controller function to get all bookshelves
async function getAllBookshelves(req, res) {
    try {
        const bookshelves = await Bookshelf.find();
        res.status(200).json(bookshelves);
    } catch (error) {
        console.error('Error fetching bookshelves:', error);
        res.status(500).json({ message: 'Failed to fetch bookshelves', error: error.message });
    }
}

// Controller function to get a single bookshelf by ID
async function getBookshelfById(req, res) {
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
}

// Controller function to update a bookshelf by ID
async function updateBookshelf(req, res) {
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
}

// Controller function to delete a bookshelf by ID
async function deleteBookshelf(req, res) {
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
}

module.exports = {
    createBookshelf,
    getAllBookshelves,
    getBookshelfById,
    updateBookshelf,
    deleteBookshelf
};