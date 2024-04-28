// src/controllers/review.js

const Review = require('../models/Review');

// Controller function to create a new review
async function createReview (req, res) {
  const { title, description, rating, userId, bookId, genreId } = req.body;

  try {
    const newReview = new Review({
      title,
      description,
      rating,
      userId,
      bookId,
      genreId,
      date_posted: new Date() // Automatically set the current date
    });

    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Failed to create review', error: error.message });
  }
}

// Controller function to get all reviews
async function getAllReviews (req, res) {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Failed to fetch reviews', error: error.message });
  }
}

// Controller function to get a single review by ID
async function getReviewById (req, res) {
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
}

// Controller function to update a review by ID
async function updateReview (req, res) {
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
}

// Controller function to delete a review by ID
async function deleteReview (req, res) {
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
}

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview
};
