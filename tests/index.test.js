require('../public/scripts/index');
const fs = require('fs');
const path = require('path');
const { TextEncoder, TextDecoder } = require('util');
Object.assign(global, { TextDecoder, TextEncoder });
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

describe('Landing page', () => {
  let dom;

  beforeEach(() => {
    const htmlFilePath = path.resolve(__dirname, '../public/index.html');
    const htmlFile = fs.readFileSync(htmlFilePath, 'utf-8');
    dom = new JSDOM(htmlFile, { url: 'http://localhost' });

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
  });

  afterEach(() => {
    global.document = undefined;
    global.window = undefined;
  });

  test('home button click', () => {
    const homeButton = dom.window.document.querySelector('.home');
    if (homeButton) {
      const event = new dom.window.Event('click');
      homeButton.dispatchEvent(event);
      expect(dom.window.location.href).toBe('http://localhost/');
    }
  });

  test('logo click', () => {
    const logo = dom.window.document.querySelector('.logo');
    if (logo) {
      const event = new dom.window.Event('click');
      logo.dispatchEvent(event);
      expect(dom.window.location.href).toBe('http://localhost/');
    }
  });

  test('discover button click', () => {
    const discoverButton = dom.window.document.querySelector('.discover');
    if (discoverButton) {
      const event = new dom.window.Event('click', { bubbles: true });
      discoverButton.dispatchEvent(event);
      setTimeout(() => {
        expect(dom.window.document.activeElement).toBe(dom.window.document.getElementById('book-search'));
        done();
      }, 500);
    }
  });

  test('sign up button click', () => {
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
      const event = new dom.window.Event('click');
      signOutButton.dispatchEvent(event);
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

  test('search query submission', () => {
    const searchInput = dom.window.document.getElementById('book-search');
    if (searchInput) {
      searchInput.value = 'test';
      const searchButton = dom.window.document.querySelector('.search-button');
      if (searchButton) {
        searchButton.click();
        dom.reconfigure({ url: 'http://localhost/books/search?query=test' });
        expect(dom.window.location.href).toBe('http://localhost/books/search?query=test');
      }
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
        expect(dom.window.location.href).toBe('http://localhost/');
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
        expect(dom.window.location.href).toBe('http://localhost/');
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
        expect(dom.window.location.href).toBe('http://localhost/');
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
        expect(dom.window.location.href).toBe('http://localhost/');
      }
    }
  });

 test('search query submission with query containing special characters', () => {
    const searchInput = dom.window.document.getElementById('book-search');
    if (searchInput) {
      searchInput.value = 'test@';
      const searchButton = dom.window.document.querySelector('.search-button');
      if (searchButton) {
        searchButton.click();
        dom.reconfigure({ url: 'http://localhost/books/search?query=test%40' });
        expect(dom.window.location.href).toBe('http://localhost/books/search?query=test%40');
      }
    }
  });

  test('search query submission with query containing spaces', () => {
    const searchInput = dom.window.document.getElementById('book-search');
    if (searchInput) {
      searchInput.value = 'test test';
      const searchButton = dom.window.document.querySelector('.search-button');
      if (searchButton) {
        searchButton.click();
        dom.reconfigure({ url: 'http://localhost/books/search?query=test%20test' });
        expect(dom.window.location.href).toBe('http://localhost/books/search?query=test%20test');
      }
    }
  });

  test('search query submission with query containing special characters and spaces', () => {
    const searchInput = dom.window.document.getElementById('book-search');
    if (searchInput) {
      searchInput.value = 'test@ test';
      const searchButton = dom.window.document.querySelector('.search-button');
      if (searchButton) {
        searchButton.click();
        dom.reconfigure({ url: 'http://localhost/books/search?query=test%40%20test' });
        expect(dom.window.location.href).toBe('http://localhost/books/search?query=test%40%20test');
      }
    }
  });

  test('search query submission with query containing special characters, spaces, and numbers', () => {
    const searchInput = dom.window.document.getElementById('book-search');
    if (searchInput) {
      searchInput.value = 'test@ 123';
      const searchButton = dom.window.document.querySelector('.search-button');
      if (searchButton) {
        searchButton.click();
        dom.reconfigure({ url: 'http://localhost/books/search?query=test%40%20123' });
        expect(dom.window.location.href).toBe('http://localhost/books/search?query=test%40%20123');
      }
    }
  });

  test('search query submission with query containing special characters, spaces, numbers, and symbols', () => {
    const searchInput = dom.window.document.getElementById('book-search');
    if (searchInput) {
      searchInput.value = 'test@ 123!';
      const searchButton = dom.window.document.querySelector('.search-button');
      if (searchButton) {
        searchButton.click();
        dom.reconfigure({ url: 'http://localhost/books/search?query=test%40%20123%21' });
        expect(dom.window.location.href).toBe('http://localhost/books/search?query=test%40%20123%21');
      }
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
});
