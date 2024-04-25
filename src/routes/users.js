// src/routes/users.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const authMiddleware = require('../middleware/auth');

router.post('/signup', userController.createUser);
router.post('/signin', userController.signInUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.get('/profile', userController.getUserProfile);
router.get('/check-authentication', authMiddleware, (req, res) => {
  res.json({ authenticated: true, user: req.session.user });
});

module.exports = router;
