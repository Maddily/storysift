// src/models/Bookshelf.js

const mongoose = require('mongoose');

const bookshelfSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 30
  },
  creationDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to User model
    required: true
  },
  books: [String]
});

const BookShelf = mongoose.model('Bookshelf', bookshelfSchema);
module.exports = BookShelf;
