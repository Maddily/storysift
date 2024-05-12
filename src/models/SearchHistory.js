// src/models/SearchHistory.js

const mongoose = require('mongoose');

// Define the search history schema
const searchHistorySchema = new mongoose.Schema({
  query: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 30
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to User model
    required: true
  }
});

// Define the SearchHistory model using the schema
const SearchHistory = mongoose.model('SearchHistory', searchHistorySchema);

// Export the SearchHistory model
module.exports = SearchHistory;