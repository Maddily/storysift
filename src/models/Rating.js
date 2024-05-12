// /models/Rating.js

const mongoose = require('mongoose');

// Define the rating schema
const ratingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to User model
    required: true
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author', // Reference to Author Model
    required: true
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book', // Reference to Book model
    required: true
  },
  genreId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre', // Reference to Genre model
    required: true
  },
  // Numeric rating value
  rating: {
    type: Number
  }

});

// Define the Rating model using the schema
const Rating = mongoose.model('Rating', ratingSchema);

// Export the Rating model
module.exports = Rating;