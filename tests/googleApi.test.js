const fetch = require('node-fetch');
require('dotenv').config();

describe('Google API Connection', () => {
  it('should connect to the Google API', async () => {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=flowers&key=${process.env.GOOGLE_BOOKS_API_KEY}`;

    try {
      const response = await fetch(apiUrl);

      console.log('API URL:', apiUrl);

      expect(response.status).toBe(200);

      const data = await response.json();

    } catch (error) {
      console.error('Error connecting to Google API:', error);
      throw error;
    }
  });
});