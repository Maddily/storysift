// src/routes/searchHistories.js

const express = require('express');
const router = express.Router();
const searchHistoryController = require('../controllers/searchHistory');

router.post('/', searchHistoryController.createSearchHistory);
router.get('/', searchHistoryController.getAllSearchHistories);
router.get('/user/:user_id', searchHistoryController.getSearchHistoriesByUserId);
router.delete('/:id', searchHistoryController.deleteSearchHistory);

module.exports = router;