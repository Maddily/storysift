// src/models/Review.js

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
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
    rating: {
        type: Number
    },
    date_posted: {
        type: Date,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to User model
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
    }
    
});

// Defines the Review model using the schema
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
