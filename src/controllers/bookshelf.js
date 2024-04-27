// src/controllers/bookshelf.js

const Bookshelf = require('../models/Bookshelf');

// Controller function to create a new bookshelf
async function createBookshelf (req, res) {
  const { name, userId } = req.body;

  try {
    const newBookshelf = new Bookshelf({ name, userId });
    const savedBookshelf = await newBookshelf.save();
    res.status(201).json(savedBookshelf);
  } catch (error) {
    console.error('Error creating bookshelf:', error);
    res.status(500).json({ message: 'Failed to create bookshelf', error: error.message });
  }
}

// Controller function to get all bookshelves belonging to a specific user
async function getAllBookshelves (req, res) {
  const userId = req.query.userId; // Access userId from query parameters

  try {
    const bookshelves = await Bookshelf.find({ userId });
    res.status(200).json(bookshelves);
  } catch (error) {
    console.error('Error fetching bookshelves:', error);
    res.status(500).json({ message: 'Failed to fetch bookshelves', error: error.message });
  }
}

// Controller function to get a single bookshelf by ID
async function getBookshelfById (req, res) {
  const bookshelfId = req.params.id;

  try {
    const bookshelf = await Bookshelf.findById(bookshelfId);
    if (!bookshelf) {
      return res.status(404).json({ message: 'Bookshelf not found' });
    }
    res.status(200).json(bookshelf);
  } catch (error) {
    console.error('Error fetching bookshelf:', error);
    res.status(500).json({ message: 'Failed to fetch bookshelf', error: error.message });
  }
}

// Controller function to update a bookshelf by ID
async function updateBookshelf (req, res) {
  const bookshelfId = req.params.id;
  const updateFields = req.body;

  try {
    const updatedBookshelf = await Bookshelf.findByIdAndUpdate(bookshelfId, updateFields, { new: true });
    if (!updatedBookshelf) {
      return res.status(404).json({ message: 'Bookshelf not found' });
    }
    res.status(200).json(updatedBookshelf);
  } catch (error) {
    console.error('Error updating bookshelf:', error);
    res.status(500).json({ message: 'Failed to update bookshelf', error: error.message });
  }
}

// Controller function to delete a bookshelf by ID
async function deleteBookshelf (req, res) {
  const bookshelfId = req.params.id;

  try {
    const deletedBookshelf = await Bookshelf.findByIdAndDelete(bookshelfId);
    if (!deletedBookshelf) {
      return res.status(404).json({ message: 'Bookshelf not found' });
    }
    res.status(200).json({ message: 'Bookshelf deleted' });
  } catch (error) {
    console.error('Error deleting bookshelf:', error);
    res.status(500).json({ message: 'Failed to delete bookshelf', error: error.message });
  }
}

async function addBooksToBookshelf(req, res) {
  const { bookshelfId, volumeIds } = req.body;

  try {
    const bookshelf = await Bookshelf.findById(bookshelfId);
    if (!bookshelf) {
      return res.status(404).json({ message: 'Bookshelf not found' });
    }

    const addedBooks = [];

    // Iterate over the volumeIds array and add each book to the bookshelf
    for (const volumeId of volumeIds) {
      // Check if the book is already in the bookshelf
      if (bookshelf.books.includes(volumeId)) {
        continue; // Skip adding duplicate books
      }

      // Push the bookId into the books array
      bookshelf.books.push(volumeId);
      addedBooks.push(volumeId); // Optionally, you can push the volumeId into the addedBooks array

      // Note: You might want to perform additional validation or fetch book details from the Google Books API here
    }

    // Save the updated bookshelf with the added volumeIds
    await bookshelf.save();

    // Respond with success message and added volumeIds
    res.status(200).json({ message: 'VolumeIds added to bookshelf successfully', addedBooks });
  } catch (error) {
    console.error('Error adding volumeIds to bookshelf:', error);
    res.status(500).json({ message: 'Failed to add volumeIds to bookshelf', error: error.message });
  }
}


module.exports = {
  createBookshelf,
  getAllBookshelves,
  getBookshelfById,
  updateBookshelf,
  deleteBookshelf,
  addBooksToBookshelf
};
