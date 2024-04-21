// Import required modules
const axios = require('axios');

// Define Google Books API key
const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

// Define the search query
const query = 'harry potter';

// Make API request to Google Books API
axios.get('https://www.googleapis.com/books/v1/volumes', {
    params: {
        q: query,
        key: GOOGLE_BOOKS_API_KEY
    }
})
.then(response => {
    // Extract and log book information from the API response
    const books = response.data.items.map(item => {
        const bookInfo = item.volumeInfo;
        return {
            title: bookInfo.title,
            authors: bookInfo.authors,
            description: bookInfo.description,
            publishedDate: bookInfo.publishedDate,
            thumbnail: bookInfo.imageLinks?.thumbnail,
            previewLink: bookInfo.previewLink
        };
    });

    console.log('Search Results:');
    console.log(books);
})
.catch(error => {
    console.error('Error searching books:', error.message);
});