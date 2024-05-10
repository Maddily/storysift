// src/models/Bookshelf.js

const mongoose = require('mongoose');

// Define the bookshelf schema
const bookshelfSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    creation_date: {
        type: Date,
        default: Date.now,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to User model
        required: true
    },
    // Array of book titles in the bookshelf
    books: [String]
});

// Define the BookShelf model using the schema
const BookShelf = mongoose.model('Bookshelf', bookshelfSchema);

// Export the BookShelf model
module.exports = BookShelf;
