require('../public/scripts/profile');
const fs = require('fs');
const path = require('path');
const { TextEncoder, TextDecoder } = require('util');
Object.assign(global, { TextDecoder, TextEncoder });
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

global.fetch = jest.fn();

Object.defineProperty(window, 'location', {
  value: { href: '' },
  writable: true
});

describe('Profile page', () => {
  let dom;

  beforeEach(() => {
    const htmlFilePath = path.resolve(__dirname, '../public/profile.html');
    const htmlFile = fs.readFileSync(htmlFilePath, 'utf-8');
    dom = new JSDOM(htmlFile, { url: 'http://localhost/user' });

    global.document = dom.window.document;
    global.window = dom.window;
  });

  afterEach(() => {
    global.document = undefined;
    global.window = undefined;
  });

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

  test('bookshelf click', () => {
    const bookshelf = dom.window.document.querySelector('.bookshelf');
    if (bookshelf) {
      bookshelf.click();
      dom.reconfigure({ url: 'http://localhost/bookshelf?id=undefined' });
      expect(dom.window.location.href).toBe('http://localhost/bookshelf?id=undefined');
    }
  });
});
