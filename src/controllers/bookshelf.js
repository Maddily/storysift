// src/controllers/bookshelf.js
const Book = require('../models/Book');
const Bookshelf = require('../models/Bookshelf');
const axios = require('axios');

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
      if (bookshelf.books.includes(volumeId)) {
        continue;
      }

      bookshelf.books.push(volumeId);
      addedBooks.push(volumeId);
    }
    await bookshelf.save();

    res.status(200).json({ message: 'VolumeIds added to bookshelf successfully', addedBooks });
  } catch (error) {
    console.error('Error adding volumeIds to bookshelf:', error);
    res.status(500).json({ message: 'Failed to add volumeIds to bookshelf', error: error.message });
  }
}

// Controller function to get a single bookshelf by ID with book details
async function getBookshelfByIdWithBooks(req, res) {
  const bookshelfId = req.params.id;

  try {
    const bookshelf = await Bookshelf.findById(bookshelfId);
    if (!bookshelf) {
      return res.status(404).json({ message: 'Bookshelf not found' });
    }

    // Fetch details for all books in the bookshelf
    const booksDetails = [];
    for (const volumeId of bookshelf.books) {
      console.log(`Fetching details for volumeId: ${volumeId}`);
      try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${volumeId}`);
        console.log('Response data:', response.data);
        const bookInfo = response.data.volumeInfo;
        booksDetails.push({
          volumeId: volumeId,
          title: bookInfo.title,
          authors: bookInfo.authors,
          description: bookInfo.description,
        });
      } catch (error) {
        console.error(`Error fetching book details for volumeId ${volumeId}:`, error.message);
      }
    }

    console.log('Books details:', booksDetails);
    res.status(200).json({ bookshelf, books: booksDetails });
  } catch (error) {
    console.error('Error fetching bookshelf with books:', error);
    res.status(500).json({ message: 'Failed to fetch bookshelf with books', error: error.message });
  }
}

// Controller function to get a single book from a bookshelf by its volumeId
async function getBookFromBookshelf(req, res) {
  const { bookshelfId, volumeId } = req.params;

  try {
    const bookshelf = await Bookshelf.findById(bookshelfId);
    
    if (!bookshelf) {
      return res.status(404).json({ message: 'Bookshelf not found' });
    }

    // Check if the book exists in the bookshelf
    const bookIndex = bookshelf.books.indexOf(volumeId);
    if (bookIndex === -1) {
      return res.status(404).json({ message: 'Book not found in the bookshelf' });
    }

    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${volumeId}`);
    const bookInfo = response.data.volumeInfo;

    const bookDetails = {
      volumeId: volumeId,
      title: bookInfo.title,
      authors: bookInfo.authors,
      description: bookInfo.description,
      language: bookInfo.language,
      pageCount: bookInfo.pageCount || 0,
      datePublished: bookInfo.publishedDate,
      publisher: bookInfo.publisher || 'Unknown',
      ISBN: bookInfo.industryIdentifiers ? bookInfo.industryIdentifiers[0].identifier : null,
    };

    res.status(200).json(bookDetails);
  } catch (error) {
    console.error('Error fetching book from bookshelf:', error);
    res.status(500).json({ message: 'Failed to fetch book from bookshelf', error: error.message });
  }
}

module.exports = {
  createBookshelf,
  getAllBookshelves,
  getBookshelfById,
  updateBookshelf,
  deleteBookshelf,
  addBooksToBookshelf,
  getBookshelfByIdWithBooks,
  getBookFromBookshelf
};
