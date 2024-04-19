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
        requierd: true,
        minlength: 2
    },
    number_of_books_written: {
        type: Number
    },
    date_of_birth: {
        type: date
    },
    date_of_death: {
        type: Number
    },
    bio: {
        minlength: 5
    },
    thumbnailURL: {
        minlength: 10
    },
    books_written: {
        type: Number
    }
});

// Defines the Author model using the schema
const User = mongoose.model('Author', authorSchema);

module.exports = Author;
