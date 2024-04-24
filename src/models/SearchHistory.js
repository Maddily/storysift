// src/models/SearchHistory.js

const mongoose = require('mongoose');

const searchhistorySchema = new mongoose.Schema({
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
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to User model
        required: true
    }
});

const SearchHistory = mongoose.model('SearchHistory', searchhistorySchema);
module.exports = SearchHistory;