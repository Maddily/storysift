// src/routes/searchHistories.js

const express = require('express');
const router = express.Router();
const searchHistoryController = require('../controllers/searchHistory');

// Define routes
router.post('/', searchHistoryController.createSearchHistory);
router.get('/', searchHistoryController.getAllSearchHistories);
router.get('/user/:user_id', searchHistoryController.getSearchHistoriesByUserId);
router.delete('/:id', searchHistoryController.deleteSearchHistory);

// Export the router
module.exports = router;
