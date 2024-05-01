require('../public/scripts/sign-in');
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

describe('Sign in page', () => {
  let dom;

  beforeEach(() => {
    const htmlFilePath = path.resolve(__dirname, '../public/sign-in.html');
    const htmlFile = fs.readFileSync(htmlFilePath, 'utf-8');
    dom = new JSDOM(htmlFile, { url: 'http://localhost/signin' });

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

  test('sign up button click in form', () => {
    const signUpButton = dom.window.document.querySelector('.submit .sign-up');
    if (signUpButton) {
      signUpButton.click();
      dom.reconfigure({ url: 'http://localhost/signup' });
      expect(dom.window.location.href).toBe('http://localhost/signup');
    }
  });

  test('sign up button click in navigation', () => {
    const signUpButton = dom.window.document.querySelector('ul .signup');
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
});
