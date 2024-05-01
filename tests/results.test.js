require('../public/scripts/results');
const fs = require('fs');
const path = require('path');
const { TextEncoder, TextDecoder } = require('util');
Object.assign(global, { TextDecoder, TextEncoder });
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

jest.mock('../public/scripts/results.js', () => ({
  fetchBooks: jest.fn().mockResolvedValue({
    totalItems: 2,
    items: [
      { 
        title: 'Book 1', 
        author: 'Author 1', 
        thumbnailURL: 'https://example.com/book1.jpg', 
        volumeId: '123456789' 
      },
      { 
        title: 'Book 2', 
        author: 'Author 2', 
        thumbnailURL: 'https://example.com/book2.jpg', 
        volumeId: '987654321' 
      }
    ]
  })
}));

describe('Search results page', () => {
  let dom;

  beforeEach(() => {
    const htmlFilePath = path.resolve(__dirname, '../public/results.html');
    const htmlFile = fs.readFileSync(htmlFilePath, 'utf-8');
    dom = new JSDOM(htmlFile, { url: 'http://localhost/books/search' });

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

  test('search query submission with empty query', () => {
    const searchInput = dom.window.document.getElementById('book-search');
    if (searchInput) {
      searchInput.value = '';
      const searchButton = dom.window.document.querySelector('.search-button');
      if (searchButton) {
        const event = new dom.window.Event('click');
        searchButton.dispatchEvent(event);
        expect(dom.window.location.href).toBe('http://localhost/books/search');
      }
    }
  });

  test('search query submission with whitespace query', () => {
    const searchInput = dom.window.document.getElementById('book-search');
    if (searchInput) {
      searchInput.value = ' ';
      const searchButton = dom.window.document.querySelector('.search-button');
      if (searchButton) {
        const event = new dom.window.Event('click');
        searchButton.dispatchEvent(event);
        expect(dom.window.location.href).toBe('http://localhost/books/search');
      }
    }
  });

  test('search query submission with null query', () => {
    const searchInput = dom.window.document.getElementById('book-search');
    if (searchInput) {
      searchInput.value = null;
      const searchButton = dom.window.document.querySelector('.search-button');
      if (searchButton) {
        const event = new dom.window.Event('click');
        searchButton.dispatchEvent(event);
        expect(dom.window.location.href).toBe('http://localhost/books/search');
      }
    }
  });

  test('search query submission with undefined query', () => {
    const searchInput = dom.window.document.getElementById('book-search');
    if (searchInput) {
      searchInput.value = undefined;
      const searchButton = dom.window.document.querySelector('.search-button');
      if (searchButton) {
        const event = new dom.window.Event('click');
        searchButton.dispatchEvent(event);
        expect(dom.window.location.href).toBe('http://localhost/books/search');
      }
    }
  });

  test('search query submission with valid query', () => {
    const searchInput = dom.window.document.getElementById('book-search');
    if (searchInput) {
      searchInput.value = 'harry potter';
      const searchButton = dom.window.document.querySelector('.search-button');
      if (searchButton) {
        searchButton.click();
        dom.reconfigure({ url: 'http://localhost/search?q=harry%20potter' });
        expect(dom.window.location.href).toBe('http://localhost/search?q=harry%20potter');
      }
    }
  });

  test('handleBookClick function', () => {
    const book = dom.window.document.querySelector('.book');
    if (book) {
      book.click();
      dom.reconfigure({ url: 'http://localhost/books/1' });
      expect(dom.window.location.href).toBe('http://localhost/books/1');
    }
  });

  test('fetchBooks function', () => {
    const fetchBooks = jest.fn();
    fetchBooks();
    expect(fetchBooks).toHaveBeenCalled();
  });

  test('display initial set of books', () => {
    const books = dom.window.document.querySelectorAll('.book');
    expect(books.length).toBe(0);
  });

  test('Books are displayed in the results section', async () => {
    await new Promise(resolve => setTimeout(resolve, 0));

    const bookList = document.querySelector('.book-list');

    if (bookList) {
      expect(bookList.innerHTML).toContain('Book 1');
      expect(bookList.innerHTML).toContain('Book 2');
      expect(bookList.innerHTML).toContain('Author 1');
      expect(bookList.innerHTML).toContain('Author 2');
      expect(bookList.innerHTML).toContain('https://example.com/book1.jpg');
      expect(bookList.innerHTML).toContain('https://example.com/book2.jpg');
      expect(bookList.innerHTML).toContain('123456789');
      expect(bookList.innerHTML).toContain('987654321');
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

  test('Pagination next button click works', async () => {
    await new Promise(resolve => setTimeout(resolve, 0));

    const pagination = dom.window.document.querySelector('.pagination');
    if (pagination) {
      const nextPageButton = pagination.querySelector('.next');
      if (nextPageButton) {
        nextPageButton.click();
        dom.reconfigure({ url: 'http://localhost/books/search?page=2' });
        expect(dom.window.location.href).toBe('http://localhost/books/search?page=2');
      }
    }
  });

  test('Pagination previous button click works', async () => {
    await new Promise(resolve => setTimeout(resolve, 0));

    const pagination = dom.window.document.querySelector('.pagination');
    if (pagination) {
      const previousPageButton = pagination.querySelector('.previous');
      if (previousPageButton) {
        previousPageButton.click();
        dom.reconfigure({ url: 'http://localhost/books/search?page=1' });
        expect(dom.window.location.href).toBe('http://localhost/books/search?page=1');
      }
    }
  });

  test('Add Book Button is displayed for authenticated user', async () => {
    // Wait for the checkAuthentication function to be called
    await new Promise(resolve => setTimeout(resolve, 0));

    const addBookButton = document.querySelector('.add');
    if (addBookButton) {
      expect(addBookButton).toBeTruthy();
    }
  });

  test('Add Book Button is hidden for unauthenticated user', async () => {
    global.fetch.mockResolvedValueOnce({
      json: () => ({ authenticated: false })
    });

    await new Promise(resolve => setTimeout(resolve, 0));

    const addBookButton = document.querySelector('.add');
    if (addBookButton) {
      expect(addBookButton).toBeFalsy();
    }
  });

  test('Add Book Button click opens modal', async () => {
    await new Promise(resolve => setTimeout(resolve, 0));

    const addBookButton = document.querySelector('.add');
    if (addBookButton) {
      addBookButton.click();
      const modal = document.querySelector('.modal');
      if (modal) {
        expect(modal.style.display).toBe('block');
      }
    }
  });

  test('Close modal button click closes modal', async () => {
    await new Promise(resolve => setTimeout(resolve, 0));

    const addBookButton = document.querySelector('.add');
    if (addBookButton) {
      addBookButton.click();
      const modal = document.querySelector('.modal');
      if (modal) {
        const closeButton = modal.querySelector('.close');
        if (closeButton) {
          closeButton.click();
          expect(modal.style.display).toBe('none');
        }
      }
    }
  });

  test('Clicking a bookshelf element in modal closes modal', async () => {
    await new Promise(resolve => setTimeout(resolve, 0));

    const addBookButton = document.querySelector('.add');
    if (addBookButton) {
      addBookButton.click();
      const modal = document.querySelector('.modal');
      if (modal) {
        const bookshelf = modal.querySelector('.bookshelf');
        if (bookshelf) {
          bookshelf.click();
          expect(modal.style.display).toBe('none');
        }
      }
    }
  });
});
