// storysift/src/models/Author.js

const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        minlength: 3
    },
    last_name: {
        type: String,
        required: true,
        minlength: 2
    },
    number_of_books_written: {
        type: Number
    },
    date_of_birth: {
        type: Date
    },
    date_of_death: {
        type: Date  // Corrected type to Date
    },
    bio: {
        type: String,  // Added type as String
        minlength: 5
    },
    thumbnailURL: {
        type: String,  // Added type as String
        minlength: 10
    },
    books_written: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }]
});

// Defines the Author model using the schema
const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
