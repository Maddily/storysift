// src/controllers/book.js

const axios = require('axios');
const Book = require('../models/Book');
const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

// Controller function to search books using Google Books API
async function searchBooks (req, res) {
  const { query, startIndex, maxResults } = req.query;

  try {
    const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
      params: {
        q: query,
        startIndex,
        maxResults,
        key: GOOGLE_BOOKS_API_KEY
      }
    });

    const books = response.data.items.map(item => {
      const bookInfo = item.volumeInfo;
      const volumeId = item.id;
      const publisher = bookInfo.publisher || 'Unknown';
      const authors = bookInfo.authors ? bookInfo.authors.join(', ') : 'Unknown';
      return {
        title: bookInfo.title,
        author: authors,
        description: bookInfo.description,
        language: bookInfo.language,
        page_count: bookInfo.pageCount || 0,
        date_published: bookInfo.publishedDate,
        publisher,
        thumbnailURL: bookInfo.imageLinks?.thumbnail,
        ISBN: bookInfo.industryIdentifiers ? bookInfo.industryIdentifiers[0].identifier : null,
        volumeId
      };
    });

    res.status(200).json({ totalItems: response.data.totalItems, items: books });
  } catch (error) {
    console.error('Error searching books:', error);
    res.status(500).json({ message: 'Failed to search books', error: error.message });
  }
}

// Controller function to get book details by volumeId
async function getBookDetails (req, res) {
  const { volumeId } = req.params;

  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${volumeId}`, {
      params: {
        key: GOOGLE_BOOKS_API_KEY
      }
    });

    const bookInfo = response.data.volumeInfo;
    const publisher = bookInfo.publisher || 'Unknown';
    const authors = bookInfo.authors ? bookInfo.authors.join(', ') : 'Unknown';

    const bookDetails = {
      title: bookInfo.title,
      author: authors,
      description: bookInfo.description,
      language: bookInfo.language,
      page_count: bookInfo.pageCount || 0,
      date_published: bookInfo.publishedDate,
      publisher,
      thumbnailURL: bookInfo.imageLinks?.thumbnail,
      ISBN: bookInfo.industryIdentifiers ? bookInfo.industryIdentifiers[0].identifier : null,
      volumeId
    };

    res.status(200).json(bookDetails);
  } catch (error) {
    console.error('Error fetching book details:', error);
    res.status(500).json({ message: 'Failed to fetch book details', error: error.message });
  }
}

// Controller function to create a new book
async function createBook (req, res) {
  const {
    title,
    description,
    language,
    page_count,
    date_published,
    publisher,
    ISBN,
    volumeId,
    author_id,
    genre_id
  } = req.body;

  try {
    const newBook = new Book({
      title,
      description,
      language,
      page_count,
      date_published,
      publisher,
      ISBN,
      volumeId,
      author_id,
      genre_id
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ message: 'Failed to create book', error: error.message });
  }
}

// Controller function to get all books
async function getAllBooks (req, res) {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Failed to fetch books', error: error.message });
  }
}

// Controller function to get a single book by ID
async function getBookById (req, res) {
  const bookId = req.params.id;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ message: 'Failed to fetch book', error: error.message });
  }
}

// Controller function to update a book by ID
async function updateBook (req, res) {
  const bookId = req.params.id;

  try {
    const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, { new: true });
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ message: 'Failed to update book', error: error.message });
  }
}

// Controller function to delete a book by ID
async function deleteBook (req, res) {
  const bookId = req.params.id;

  try {
    const deletedBook = await Book.findByIdAndDelete(bookId);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: 'Failed to delete book', error: error.message });
  }
}

module.exports = {
  searchBooks,
  getBookDetails,
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook
};
