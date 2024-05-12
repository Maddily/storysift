// src/routes/review.js

const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review');

// Define routes
router.post('/', reviewController.createReview);
router.get('/', reviewController.getAllReviews);
router.get('/:id', reviewController.getReviewById);
router.put('/:id', reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);

// Export the router
module.exports = router;
