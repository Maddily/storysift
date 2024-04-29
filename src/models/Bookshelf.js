// src/models/Bookshelf.js

const mongoose = require('mongoose');

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
    books: [String]
});

const BookShelf = mongoose.model('Bookshelf', bookshelfSchema);
module.exports = BookShelf;
