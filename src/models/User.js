// storysift/src/models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type:  String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 12
    },
    joining_date: {
        type: Date,
        default: Date.now,
        required: true
    }
});

// Defines the User model using the schema
const User = mongoose.model('User', userSchema);

module.exports = User;