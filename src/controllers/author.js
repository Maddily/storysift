// src/controllers/authorController.js

const Author = require('../models/Author');

// Controller function to create a new author
async function createAuthor (req, res) {
  try {
    const author = await Author.create(req.body);
    res.status(201).json(author);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create author', error: error.message });
  }
}

// Controller function to get all authors
async function getAllAuthors (req, res) {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch authors', error: error.message });
  }
}

// Controller function to get a single author by ID
async function getAuthorById (req, res) {
  const { id } = req.params;
  try {
    const author = await Author.findById(id);
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    res.json(author);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch author', error: error.message });
  }
}

// Controller function to update an author by ID
async function updateAuthor (req, res) {
  const { id } = req.params;
  try {
    const updatedAuthor = await Author.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedAuthor) {
      return res.status(404).json({ message: 'Author not found' });
    }
    res.json(updatedAuthor);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update author', error: error.message });
  }
}

// Controller function to delete an author by ID
async function deleteAuthor (req, res) {
  const { id } = req.params;
  try {
    const deletedAuthor = await Author.findByIdAndDelete(id);
    if (!deletedAuthor) {
      return res.status(404).json({ message: 'Author not found' });
    }
    res.json({ message: 'Author deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete author', error: error.message });
  }
}

// Export all controller functions
module.exports = {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor
};
