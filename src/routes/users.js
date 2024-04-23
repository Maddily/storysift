// src/routes/users.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route to create a new user (Sign-up)
router.post('/signup', async (req, res) => {
    const { first_name, last_name, username, email, password } = req.body;

    try {
        const newUser = new User({ first_name, last_name, username, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Failed to create user', error: error.message });
    }
});

// Route to authenticate and sign in user (Sign-in)
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email }).select('+password'); // Include password field in query

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        // Compare passwords
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        // Authentication successful
        res.status(200).json({ message: 'Authentication successful' });
    } catch (error) {
        console.error('Error signing in user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;