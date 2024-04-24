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

        // Authentication successful, store user data in session
        req.session.userId = user._id; // Store user ID in session
        res.status(200).json({ message: 'Authentication successful' });
    } catch (error) {
        console.error('Error signing in user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route to get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', error: error.message });
    }
});

// Route to get a single user by ID
router.get('/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user', error: error.message });
    }
});

// Route to update a user by ID
router.put('/:id', async (req, res) => {
    const userId = req.params.id;
    const { first_name, last_name, username, email, password } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.first_name = first_name;
        user.last_name = last_name;
        user.username = username;
        user.email = email;
        user.password = password; // You may want to hash the new password here

        await user.save();
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update user', error: error.message });
    }
});

// Route to delete a user by ID
router.delete('/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.deleteOne();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user', error: error.message });
    }
});

// Route to a user's profile
router.get('/profile', (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
  }

  // Fetch user profile based on user ID
  // Then send the user profile data in the response
});

module.exports = router;
