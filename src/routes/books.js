// src/routes/books.js

const express = require('express');
const router = express.Router();
const axios = require('axios');
const Book = require('../models/Book');
const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

/* 
Google book api routes
*/

// Route to search books using Google Books API
router.get('/search', async (req, res) => {
  const { query, startIndex, maxResults } = req.query;

  try {
    const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
      params: {
        q: query,
        startIndex: startIndex,
        maxResults: maxResults,
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
        publisher: publisher,
        thumbnailURL: bookInfo.imageLinks?.thumbnail,
        ISBN: bookInfo.industryIdentifiers ? bookInfo.industryIdentifiers[0].identifier : null,
        volumeId: volumeId
      };
    });

    res.status(200).json({ totalItems: response.data.totalItems, items: books });
  } catch (error) {
    console.error('Error searching books:', error);
    res.status(500).json({ message: 'Failed to search books', error: error.message });
  }
});

/* 
Sttorysift backend routes
*/

// Route to create a new book
router.post('/', async (req, res) => {
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
});

// Route to get all books
router.get('/', async (req, res) => {
  try {
      const books = await Book.find();
      res.status(200).json(books);
  } catch (error) {
      console.error('Error fetching books:', error);
      res.status(500).json({ message: 'Failed to fetch books', error: error.message });
  }
});

// Route to get a single book by ID
router.get('/:id', async (req, res) => {
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
});

// Route to update a book by ID
router.put('/:id', async (req, res) => {
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
});

// Route to delete a book by ID
router.delete('/:id', async (req, res) => {
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
});

module.exports = router;
