// storysift/src/models/SearchHistory.js

const mongoose = require('mongoose');

const searchhhistorySchema = new mongoose.Schema({
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
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to User model
        required: true
    }
});

// Defines the SearchHistory model using the schema
const SearchHistory = mongoose.model('SearchHistory', searchhisorySchema);

module.exports = SearchHistory;