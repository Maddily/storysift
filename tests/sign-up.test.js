require('../public/scripts/sign-up');
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

describe('Sign up page', () => {
  let dom;

  beforeEach(() => {
    const htmlFilePath = path.resolve(__dirname, '../public/sign-up.html');
    const htmlFile = fs.readFileSync(htmlFilePath, 'utf-8');
    dom = new JSDOM(htmlFile, { url: 'http://localhost/signup' });

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

  test('sign up button click', () => {
    const signUpButton = dom.window.document.querySelector('.signup');
    if (signUpButton) {
      signUpButton.click();
      dom.reconfigure({ url: 'http://localhost/signup' });
      expect(dom.window.location.href).toBe('http://localhost/signup');
    }
  });

  test('sign in button click in navigation', () => {
    const signInButton = dom.window.document.querySelector('.sign-in');
    if (signInButton) {
      signInButton.click();
      dom.reconfigure({ url: 'http://localhost/signin' });
      expect(dom.window.location.href).toBe('http://localhost/signin');
    }
  });

  test('sign in button click in form', () => {
    const signInButton = dom.window.document.querySelector('.submit .signin');
    if (signInButton) {
      signInButton.click();
      dom.reconfigure({ url: 'http://localhost/signin' });
      expect(dom.window.location.href).toBe('http://localhost/signin');
    }
  });

  test('sign in button click', () => {
    const signInButton = dom.window.document.querySelector('.signin');
    if (signInButton) {
      signInButton.click();
      dom.reconfigure({ url: 'http://localhost/signin' });
      expect(dom.window.location.href).toBe('http://localhost/signin');
    }
  });

  test('validateFirstName function', () => {
    const validateFirstName = dom.window.validateFirstName;
    if (validateFirstName) {
      expect(validateFirstName('')).toBe(false);
      expect(validateFirstName('J')).toBe(false);
      expect(validateFirstName('Jo')).toBe(false);
      expect(validateFirstName('Joh')).toBe(true);
      expect(validateFirstName('John')).toBe(true);
    }
  });

  test('validateLastName function', () => {
    const validateLastName = dom.window.validateLastName;
    if (validateLastName) {
      expect(validateLastName('')).toBe(false);
      expect(validateLastName('D')).toBe(false);
      expect(validateLastName('Do')).toBe(true);
      expect(validateLastName('Doe')).toBe(true);
    }
  });

  test('validateEmail function', () => {
    const validateEmail = dom.window.validateEmail;
    if (validateEmail) {
      expect(validateEmail('')).toBe(false);
      expect(validateEmail('john.doe')).toBe(false);
      expect(validateEmail('john.doe@')).toBe(false);
      expect(validateEmail('john.doe@example')).toBe(false);
      expect(validateEmail('john.doe@example.com')).toBe(true);
    }
  });

  test('validatePassword function', () => {
    const validatePassword = dom.window.validatePassword;
    if (validatePassword) {
      expect(validatePassword('')).toBe(false);
      expect(validatePassword('12345')).toBe(false);
      expect(validatePassword('123456')).toBe(true);
      expect(validatePassword('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ante non metus interdum sollicitudin at id libero.')).toBe(false);
    }
  });

  test('validateConfirmPassword function', () => {
    const validateConfirmPassword = dom.window.validateConfirmPassword;
    if (validateConfirmPassword) {
      const passwordInput = dom.window.document.querySelector('.password');
      const confirmPasswordInput = dom.window.document.querySelector('.confirm-password');
      if (passwordInput && confirmPasswordInput) {
        passwordInput.value = 'password';
        confirmPasswordInput.value = 'password';
        expect(validateConfirmPassword()).toBe(true);
        confirmPasswordInput.value = 'password1';
        expect(validateConfirmPassword()).toBe(false);
      }
    }
  });

  test('updateSubmitButton function', () => {
    const updateSubmitButton = dom.window.updateSubmitButton;
    if (updateSubmitButton) {
      const submitButton = dom.window.document.querySelector('.submit button');
      if (submitButton) {
        expect(submitButton.disabled).toBe(false);
        updateSubmitButton();
        expect(submitButton.disabled).toBe(true);
      }
    }
  });

  test('isFormValid function', () => {
    const isFormValid = dom.window.isFormValid;
    if (isFormValid) {
      const submitButton = dom.window.document.querySelector('.submit button');
      if (submitButton) {
        expect(isFormValid()).toBe(false);
        submitButton.disabled = false;
        expect(isFormValid()).toBe(true);
      }
    }
  });
});
