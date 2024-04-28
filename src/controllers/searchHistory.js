// src/controllers/searchHistory.js

const SearchHistory = require('../models/SearchHistory');

// Controller function to create a new search history entry
async function createSearchHistory (req, res) {
  const { query, userId } = req.body;

  try {
    const newSearchHistory = new SearchHistory({ query, userId });
    const savedSearchHistory = await newSearchHistory.save();
    res.status(201).json(savedSearchHistory);
  } catch (error) {
    console.error('Error creating search history:', error);
    res.status(500).json({ message: 'Failed to create search history', error: error.message });
  }
}

// Controller function to get all search history entries
async function getAllSearchHistories (req, res) {
  try {
    const searchHistories = await SearchHistory.find();
    res.status(200).json(searchHistories);
  } catch (error) {
    console.error('Error fetching search histories:', error);
    res.status(500).json({ message: 'Failed to fetch search histories', error: error.message });
  }
}

// Controller function to get search history entries by user ID
async function getSearchHistoriesByUserId (req, res) {
  const { userId } = req.params;

  try {
    const searchHistories = await SearchHistory.find({ userId });
    res.status(200).json(searchHistories);
  } catch (error) {
    console.error('Error fetching search histories:', error);
    res.status(500).json({ message: 'Failed to fetch search histories', error: error.message });
  }
}

// Controller function to delete a search history entry by ID
async function deleteSearchHistory (req, res) {
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
}

module.exports = {
  createSearchHistory,
  getAllSearchHistories,
  getSearchHistoriesByUserId,
  deleteSearchHistory
};
