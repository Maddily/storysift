// /models/Rating.js

const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to User model
        required: true
    },
    author_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author', // Reference to Author Model
        required: true
    },
    book_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book', // Reference to Book model
        required: true
    },
    genre_id: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Genre', // Reference to Genre model
        required: true
    },
    rating: {
        type: Number
    }
    
});

// Defines the Rating model using the schema
const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;