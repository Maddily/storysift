// storysift/src/models/Rating.js

const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to User model
        required: true
    },
    book_id: {
        type: Schema.Types.ObjectId,
        ref: 'Book', // Reference to Book model
        required: true
    },
    genre_id: {
        type: Schema.Types.ObjectID,
        ref: 'Genre', // Reference to Genre model
        required: true
    },
    rating: {
        type: Number
    }
    
});

// Defines the Rating model using the schema
const Rating = mongoose.model('Review', ratingSchema);

module.exports = Rating;