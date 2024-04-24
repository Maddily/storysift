// src/controllers/user.js

const User = require('../models/User');

// Controller function to create a new user (Sign-up)
async function createUser(req, res) {
    const { first_name, last_name, username, email, password } = req.body;

    try {
        const newUser = new User({ first_name, last_name, username, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Failed to create user', error: error.message });
    }
}

// Controller function to authenticate and sign in user (Sign-in)
async function signInUser(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).select('+password'); // Include password field in query

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        // Authentication successful, store user data in session
        req.session.userId = user._id; // Store user ID in session
        res.status(200).json({ message: 'Authentication successful' });
    } catch (error) {
        console.error('Error signing in user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Controller function to get all users
async function getAllUsers(req, res) {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', error: error.message });
    }
}

// Controller function to get a single user by ID
async function getUserById(req, res) {
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
}

// Controller function to update a user by ID
async function updateUser(req, res) {
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
}

// Controller function to delete a user by ID
async function deleteUser(req, res) {
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
}

// Controller function to retrieve a user's profile
async function getUserProfile(req, res) {
    const userId = req.session.userId;
    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const userProfile = await User.findById(userId);
        if (!userProfile) {
            return res.status(404).json({ message: 'User profile not found' });
        }
        res.status(200).json(userProfile);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user profile', error: error.message });
    }
}

module.exports = {
    createUser,
    signInUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserProfile
};