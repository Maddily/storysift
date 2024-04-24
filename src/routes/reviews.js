// src/routes/review.js

const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Route to create a new review
router.post('/', async (req, res) => {
  const {
    title,
    description,
    rating,
    user_id,
    book_id,
    genre_id
  } = req.body;

  try {
    const newReview = new Review({
      title,
      description,
      rating,
      user_id,
      book_id,
      genre_id,
      date_posted: new Date() // Automatically set the current date
    });

    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Failed to create review', error: error.message });
  }
});

// Route to get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Failed to fetch reviews', error: error.message });
  }
});

// Route to get a single review by ID
router.get('/:id', async (req, res) => {
  const reviewId = req.params.id;

  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json(review);
  } catch (error) {
    console.error('Error fetching review:', error);
    res.status(500).json({ message: 'Failed to fetch review', error: error.message });
  }
});

// Route to update a review by ID
router.put('/:id', async (req, res) => {
  const reviewId = req.params.id;
  const updateFields = req.body;

  try {
    const updatedReview = await Review.findByIdAndUpdate(reviewId, updateFields, { new: true });
    if (!updatedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json(updatedReview);
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ message: 'Failed to update review', error: error.message });
  }
});

// Route to delete a review by ID
router.delete('/:id', async (req, res) => {
  const reviewId = req.params.id;

  try {
    const deletedReview = await Review.findByIdAndDelete(reviewId);
    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json({ message: 'Review deleted' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: 'Failed to delete review', error: error.message });
  }
});

module.exports = router;