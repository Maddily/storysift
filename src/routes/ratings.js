// src/routes/rating.js

const express = require('express');
const router = express.Router();
const Rating = require('../models/Rating');

// Route to create a new rating
router.post('/', async (req, res) => {
  const {
    user_id,
    author_id,
    book_id,
    genre_id,
    rating
  } = req.body;

  try {
    const newRating = new Rating({
      user_id,
      author_id,
      book_id,
      genre_id,
      rating
    });

    const savedRating = await newRating.save();
    res.status(201).json(savedRating);
  } catch (error) {
    console.error('Error creating rating:', error);
    res.status(500).json({ message: 'Failed to create rating', error: error.message });
  }
});

// Route to get all ratings
router.get('/', async (req, res) => {
  try {
    const ratings = await Rating.find();
    res.status(200).json(ratings);
  } catch (error) {
    console.error('Error fetching ratings:', error);
    res.status(500).json({ message: 'Failed to fetch ratings', error: error.message });
  }
});

// Route to get a single rating by ID
router.get('/:id', async (req, res) => {
  const ratingId = req.params.id;

  try {
    const rating = await Rating.findById(ratingId);
    if (!rating) {
      return res.status(404).json({ message: 'Rating not found' });
    }
    res.status(200).json(rating);
  } catch (error) {
    console.error('Error fetching rating:', error);
    res.status(500).json({ message: 'Failed to fetch rating', error: error.message });
  }
});

// Route to update a rating by ID
router.put('/:id', async (req, res) => {
  const ratingId = req.params.id;
  const updateFields = req.body;

  try {
    const updatedRating = await Rating.findByIdAndUpdate(ratingId, updateFields, { new: true });
    if (!updatedRating) {
      return res.status(404).json({ message: 'Rating not found' });
    }
    res.status(200).json(updatedRating);
  } catch (error) {
    console.error('Error updating rating:', error);
    res.status(500).json({ message: 'Failed to update rating', error: error.message });
  }
});

// Route to delete a rating by ID
router.delete('/:id', async (req, res) => {
  const ratingId = req.params.id;

  try {
    const deletedRating = await Rating.findByIdAndDelete(ratingId);
    if (!deletedRating) {
      return res.status(404).json({ message: 'Rating not found' });
    }
    res.status(200).json({ message: 'Rating deleted' });
  } catch (error) {
    console.error('Error deleting rating:', error);
    res.status(500).json({ message: 'Failed to delete rating', error: error.message });
  }
});

module.exports = router;