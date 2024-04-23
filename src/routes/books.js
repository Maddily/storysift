// src/routes/books.js

const express = require('express');
const router = express.Router();
const axios = require('axios');
const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

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

module.exports = router;
