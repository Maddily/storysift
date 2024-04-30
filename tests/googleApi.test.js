// googleApi.test.js

const fetch = require('node-fetch');
require('dotenv').config(); // Ensure dotenv is properly configured to access environment variables

describe('Google API Connection', () => {
  it('should connect to the Google API', async () => {
    // Construct the URL with the API key
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=flowers&key=${process.env.GOOGLE_BOOKS_API_KEY}`;

    try {
      // Make the request to the Google API
      const response = await fetch(apiUrl);

      // Log the constructed URL for debugging
      console.log('API URL:', apiUrl);

      // Check if the response is successful (status code 200)
      expect(response.status).toBe(200);

      // Parse the response body as JSON
      const data = await response.json();

      // Add additional assertions here if needed
    } catch (error) {
      // Log any errors that occur during the request
      console.error('Error connecting to Google API:', error);
      throw error; // Rethrow the error to fail the test
    }
  });
});