// src/models/Review.js
const mongoose = require('mongoose');

// Define the review schema
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
  datePosted: {
    type: Date
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to User model
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
  }

});

// Define the Review model using the schema
const Review = mongoose.model('Review', reviewSchema);

// Export the Review model
module.exports = Review;