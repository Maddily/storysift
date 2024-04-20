const Book = require('../models/book');

// Controller to fetch books from the database
exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch books', error: error.message });
    }
};

// Controller to search books via Google Books API
exports.searchBooks = async (req, res) => {
    try {
        const { query } = req.query;
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
        const books = response.data.items;
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Failed to search books', error: error.message });
    }
};