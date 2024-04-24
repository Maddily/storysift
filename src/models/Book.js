// src/models/Book.js

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        maxlength: 300
    },
    language: {
        type: String,
        required: true,
        maxlength: 50
    },
    page_count: {
        type: Number,
        default: 0
    },
    date_published: {
        type: Date,
    },
    publisher: {
        type: String,
        required: true,
        maxlength: 50
    },
    ISBN: {
        type: String,
        required: true,
        maxlength: 50
    },
    volumeId: {
        type: String,
        required: true,
        maxlength: 50
    },
    author_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author', // Reference to Author model
        required: true
    },
    genre_id: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Genre', // Reference to Genre model
        required: true
    }
    
});

// Defines the Book model using the schema
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;