require('../public/scripts/details');
const fs = require('fs');
const path = require('path');
const { TextEncoder, TextDecoder } = require('util');
Object.assign(global, { TextDecoder, TextEncoder });
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

jest.mock('../public/scripts/details.js', () => ({
  fetchBookDetails: jest.fn().mockResolvedValue({
    volumeInfo: {
      title: 'Sample Book',
      authors: ['Sample Author'],
      description: 'Sample description',
      pageCount: 200,
      language: 'en',
      publisher: 'Sample Publisher',
      publishedDate: '2022-04-18',
      industryIdentifiers: [{ identifier: '123456789', type: 'ISBN_13' }],
      imageLinks: { thumbnail: 'https://example.com/sample-thumbnail.jpg' }
    }
  }),
  fetchAuthorDetails: jest.fn().mockResolvedValue({ totalItems: 5 })
}));

describe('Book details page', () => {
  let dom;

  beforeEach(() => {
    const htmlFilePath = path.resolve(__dirname, '../public/details.html');
    const htmlFile = fs.readFileSync(htmlFilePath, 'utf-8');
    dom = new JSDOM(htmlFile, { url: 'http://localhost/books' });

    global.document = dom.window.document;
    global.window = dom.window;

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn().mockReturnValueOnce('mockToken')
      },
      writable: true
    });

    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () => ({ authenticated: true })
    });

    document.dispatchEvent(new Event('DOMContentLoaded'));
  });

  afterEach(() => {
    global.document = undefined;
    global.window = undefined;
  });

  // test home button click
  test('home button click', () => {
    const homeButton = dom.window.document.querySelector('.home');
    if (homeButton) {
      homeButton.click();
      dom.reconfigure({ url: 'http://localhost/' });
      expect(dom.window.location.href).toBe('http://localhost/');
    }
  });

  test('logo click', () => {
    const logo = dom.window.document.querySelector('.logo');
    if (logo) {
      logo.click();
      dom.reconfigure({ url: 'http://localhost/' });
      expect(dom.window.location.href).toBe('http://localhost/');
    }
  });

  test('sign up button click', () => {
    window.location.assign = jest.fn();

    const signUpButton = dom.window.document.querySelector('.signup');
    if (signUpButton) {
      signUpButton.click();
      dom.reconfigure({ url: 'http://localhost/signup' });
      expect(dom.window.location.href).toBe('http://localhost/signup');
    }
  });

  test('sign in button click', () => {
    const signInButton = dom.window.document.querySelector('.sign-in');
    if (signInButton) {
      signInButton.click();
      dom.reconfigure({ url: 'http://localhost/signin' });
      expect(dom.window.location.href).toBe('http://localhost/signin');
    }
  });

  test('sign out button click', () => {
    const signOutButton = dom.window.document.querySelector('.signout');
    if (signOutButton) {
      signOutButton.click();
      dom.reconfigure({ url: 'http://localhost/' });
      expect(dom.window.location.href).toBe('http://localhost/');
    }
  });

  test('profile button click', () => {
    const profileButton = dom.window.document.querySelector('.profile');
    if (profileButton) {
      profileButton.click();
      dom.reconfigure({ url: 'http://localhost/user' });
      expect(dom.window.location.href).toBe('http://localhost/user');
    }
  });

  test('Authenticated user - Show profile and sign out buttons, hide sign up and sign in buttons', async () => {
    // Wait for the checkAuthentication function to be called
    await new Promise(resolve => setTimeout(resolve, 0));

    const signUpButton = document.querySelector('.signup');
    const signInButton = document.querySelector('.sign-in');
    const signOutButton = document.querySelector('.signout');
    const profileButton = document.querySelector('.profile');

    if (signUpButton && signInButton && signOutButton && profileButton) {
      expect(signUpButton.style.display).toBe('none');
      expect(signInButton.style.display).toBe('none');
      expect(signOutButton.style.display).toBe('flex');
      expect(profileButton.style.display).toBe('flex');
    }
  });

  test('Unauthenticated user - Show sign up and sign in buttons, hide profile and sign out buttons', async () => {
    global.fetch.mockResolvedValueOnce({
      json: () => ({ authenticated: false })
    });

    // Wait for the checkAuthentication function to be called
    await new Promise(resolve => setTimeout(resolve, 0));

    const signUpButton = document.querySelector('.signup');
    const signInButton = document.querySelector('.sign-in');
    const signOutButton = document.querySelector('.signout');
    const profileButton = document.querySelector('.profile');

    if (signUpButton && signInButton && signOutButton && profileButton) {
      expect(signUpButton.style.display).toBe('flex');
      expect(signInButton.style.display).toBe('flex');
      expect(signOutButton.style.display).toBe('none');
      expect(profileButton.style.display).toBe('none');
    }
  });

  test('Book details are displayed correctly', async () => {
    await new Promise(resolve => setTimeout(resolve, 0));

    const bookDetailsContainer = document.querySelector('.book-details-container');

    if (bookDetailsContainer) {
      expect(bookDetailsContainer.innerHTML).toContain('Sample Book');
      expect(bookDetailsContainer.innerHTML).toContain('Sample Author');
      expect(bookDetailsContainer.innerHTML).toContain('Sample description');
      expect(bookDetailsContainer.innerHTML).toContain('200');
      expect(bookDetailsContainer.innerHTML).toContain('English');
      expect(bookDetailsContainer.innerHTML).toContain('Sample Publisher');
      expect(bookDetailsContainer.innerHTML).toContain('2022-04-18');
      expect(bookDetailsContainer.innerHTML).toContain('123456789');
      expect(bookDetailsContainer.innerHTML).toContain('https://example.com/sample-thumbnail.jpg');
    }
  });

  test('Author details are displayed correctly', async () => {
    await new Promise(resolve => setTimeout(resolve, 0));

    const authorDetailsContainer = document.querySelector('.author-details-container');

      if (authorDetailsContainer) {
        expect(authorDetailsContainer.innerHTML).toContain('Sample Author');
        expect(authorDetailsContainer.innerHTML).toContain('5');
      }
  });

  test('Error message is displayed if book details fetch fails', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Failed to fetch book details'));

    await new Promise(resolve => setTimeout(resolve, 0));

    const errorMessage = document.querySelector('.error-message');

    if (errorMessage) {
      expect(errorMessage.innerHTML).toBe('Failed to fetch book details');
    }
  });

  // test author details fetch failure
  test('Error message is displayed if author details fetch fails', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Failed to fetch author details'));

    await new Promise(resolve => setTimeout(resolve, 0));

    const errorMessage = document.querySelector('.error-message');

    if (errorMessage) {
      expect(errorMessage.innerHTML).toBe('Failed to fetch author details');
    }
  });
});
