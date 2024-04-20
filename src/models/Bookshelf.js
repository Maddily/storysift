// storysift/src/models/Bookshelf.js

const mongoose = require('mongoose');

const bookshelfSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 30
    },
    creation_date: {
        type: Date,
        default: Date.now,
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to User model
        required: true
    }
});

// Defines the Bookshelf model using the schema
const BookShelf = mongoose.model('Bookshelf', bookshelfSchema);

module.exports = BookShelf;