// src/middleware/authMiddleware.js

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.userId) {
        // User is authenticated
        next();
    } else {
        // User is not authenticated
        res.status(401).json({ error: 'Unauthorized' });
    }
};

module.exports = isAuthenticated;