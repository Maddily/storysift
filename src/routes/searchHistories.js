// src/routes/searchHistories.js

const express = require('express');
const router = express.Router();
const SearchHistory = require('../models/SearchHistory');

// Route to create a new search history entry
router.post('/', async (req, res) => {
    const { query, user_id } = req.body;

    try {
        const newSearchHistory = new SearchHistory({ query, user_id });
        const savedSearchHistory = await newSearchHistory.save();
        res.status(201).json(savedSearchHistory);
    } catch (error) {
        console.error('Error creating search history:', error);
        res.status(500).json({ message: 'Failed to create search history', error: error.message });
    }
});

// Route to get all search history entries
router.get('/', async (req, res) => {
    try {
        const searchHistories = await SearchHistory.find();
        res.status(200).json(searchHistories);
    } catch (error) {
        console.error('Error fetching search histories:', error);
        res.status(500).json({ message: 'Failed to fetch search histories', error: error.message });
    }
});

// Route to get search history entries by user ID
router.get('/user/:user_id', async (req, res) => {
    const { user_id } = req.params;

    try {
        const searchHistories = await SearchHistory.find({ user_id });
        res.status(200).json(searchHistories);
    } catch (error) {
        console.error('Error fetching search histories:', error);
        res.status(500).json({ message: 'Failed to fetch search histories', error: error.message });
    }
});

// Route to delete a search history entry by ID
router.delete('/:id', async (req, res) => {
    const searchHistoryId = req.params.id;

    try {
        const deletedSearchHistory = await SearchHistory.findByIdAndDelete(searchHistoryId);
        if (!deletedSearchHistory) {
            return res.status(404).json({ message: 'Search history not found' });
        }
        res.status(200).json({ message: 'Search history deleted' });
    } catch (error) {
        console.error('Error deleting search history:', error);
        res.status(500).json({ message: 'Failed to delete search history', error: error.message });
    }
});

module.exports = router;