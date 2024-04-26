// src/routes/users.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const isAuthenticated = require('../middleware/auth');

// Authentication check endpoint
router.get('/check-authentication', isAuthenticated, (req, res) => {
  res.json({ authenticated: true, user: req.userId });
});

// User profile route (move this above the generic routes)
router.get('/profile', isAuthenticated, userController.getUserProfile);

router.post('/signup', userController.createUser);
router.post('/signin', userController.signInUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
