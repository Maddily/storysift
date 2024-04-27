// src/models/Author.js

const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2
  },
  numberOfBooksWritten: {
    type: Number
  },
  dateOfBirth: {
    type: Date
  },
  dateOfDeath: {
    type: Date
  },
  bio: {
    type: String,
    minlength: 5
  },
  thumbnailURL: {
    type: String,
    minlength: 10
  },
  booksWritten: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }]
});

const Author = mongoose.model('Author', authorSchema);
module.exports = Author;
