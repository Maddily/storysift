const request = require('supertest');
const app = require('../app'); // Assuming your Express app is exported from app.js

describe('Bookshelves API', () => {
  it('should create bookshelves for a user and retrieve them', async () => {
    // Create bookshelves
    const bookshelfData = [
      { name: 'Fantasy', userId: 'user1' },
      { name: 'Science Fiction', userId: 'user1' },
    ];

    // Create bookshelves
    await Promise.all(bookshelfData.map(async (shelf) => {
      await request(app)
        .post('/api/bookshelves')
        .send(shelf)
        .expect(201);
    }));

    // Retrieve bookshelves for the user
    const response = await request(app)
      .get('/api/bookshelves')
      .expect(200);

    // Assert that the response contains the expected bookshelves
    expect(response.body.length).toBe(2); // Assuming there are two bookshelves created
    expect(response.body.map(shelf => shelf.name)).toContain('Fantasy');
    expect(response.body.map(shelf => shelf.name)).toContain('Science Fiction');
  });
});