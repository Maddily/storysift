document.addEventListener('DOMContentLoaded', () => {
  const signUpForm = document.querySelector('form');
  const firstName = document.getElementById('first-name');

  // Focus the first name field on page load
  firstName.focus();

  // On form submission, handle input data to create an account
  signUpForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const firstName = document.getElementById('first-name').value.trim();;
    const lastName = document.getElementById('last-name').value.trim();
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Validate form input
    if (!isFormValid()) {
      return; // Do not submit the form if it's invalid
    }

    // Check if passwords don't match
    if (password !== confirmPassword) {
      setError(document.getElementById('confirm-password'), 'Passwords do not match.');
      return;
    }

    // User data to be sent to the backend
    const user = {
      first_name: firstName,
      last_name: lastName,
      username,
      email,
      password
    };

    try {
      // Send sign-up request to the backend
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to sign up');
      }

      // Sign-up successful, redirect to sign-in page
      window.location.href = '/signin';
    } catch (error) {
      const errorMessage = document.querySelector('.err');
      errorMessage.style.display = 'flex';
      console.error('Sign-up error:', error.message);
    }
  });

  // Validate input
  const firstNameInput = document.getElementById('first-name');
  firstNameInput.addEventListener('input', () => {
    validateFirstName();
    updateSubmitButton();
  });

  const lastNameInput = document.getElementById('last-name');
  lastNameInput.addEventListener('input', () => {
    validateLastName();
    updateSubmitButton();
  });

  const usernameInput = document.getElementById('username');
  usernameInput.addEventListener('input', () => {
    validateUsername();
    updateSubmitButton();
  });

  const emailInput = document.getElementById('email');
  emailInput.addEventListener('input', () => {
    validateEmail();
    updateSubmitButton();
  });

  const passwordInput = document.getElementById('password');
  passwordInput.addEventListener('input', () => {
    validatePassword();
    updateSubmitButton();
  });

  const confirmPasswordInput = document.getElementById('confirm-password');
  confirmPasswordInput.addEventListener('input', () => {
    validateConfirmPassword();
    updateSubmitButton();
  });

  // Validation functions for input fields that check if input matches requirements
  function validateFirstName () {
    const firstNameValue = firstNameInput.value.trim();
    if (firstNameValue.length < 3) {
      setError(firstNameInput, 'First name must be at least 3 characters long.');
    } else {
      clearError(firstNameInput);
    }
  }

  function validateLastName () {
    const lastNameValue = lastNameInput.value.trim();
    if (lastNameValue.length < 2) {
      setError(lastNameInput, 'Last name must be at least 2 characters long.');
    } else {
      clearError(lastNameInput);
    }
  }

  function validateUsername () {
    const usernameValue = usernameInput.value.trim();
    if (usernameValue.length < 3) {
      setError(usernameInput, 'Username must be at least 3 characters long.');
    } else if (usernameValue.length > 30) {
      setError(usernameInput, 'Username cannot exceed 30 characters.');
    } else {
      clearError(usernameInput);
    }
  }

  function validateEmail () {
    const emailValue = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValue && !emailRegex.test(emailValue)) {
      setError(emailInput, 'Enter a valid email address.');
      return false;
    } else {
      clearError(emailInput);
      return true;
    }
  }

  function validatePassword () {
    const passwordValue = passwordInput.value;
    if (passwordValue.length < 6) {
      setError(passwordInput, 'Password must be at least 6 characters long.');
    } else if (passwordValue.length > 100) {
      setError(passwordInput, 'Password cannot exceed 100 characters.');
    } else {
      clearError(passwordInput);
    }
  }

  function validateConfirmPassword () {
    const confirmPasswordValue = confirmPasswordInput.value;
    const passwordValue = passwordInput.value;
    if (confirmPasswordValue !== passwordValue) {
      setError(confirmPasswordInput, 'Passwords do not match.');
    } else {
      clearError(confirmPasswordInput);
    }
  }

  // Set error message
  function setError (input, message) {
    const errorMessage = input.parentElement.querySelector('.error-message');
    errorMessage.textContent = message;
    input.classList.add('error');
  }

  // Clear error message
  function clearError (input) {
    const errorMessage = input.parentElement.querySelector('.error-message');
    errorMessage.textContent = '';
    input.classList.remove('error');
  }

  const submitButton = document.querySelector('.submit button');

  // Enable or disable submit button based on form validity
  function updateSubmitButton () {
    if (isFormValid()) {
      submitButton.removeAttribute('disabled');
    } else {
      submitButton.setAttribute('disabled', 'disabled');
    }
  }

  // Check if the form is valid
  function isFormValid () {
    return (
      firstNameInput.value.trim().length >= 3 &&
      lastNameInput.value.trim().length >= 2 &&
      usernameInput.value.trim().length >= 3 &&
      usernameInput.value.trim().length <= 30 &&
      validateEmail() &&
      passwordInput.value.length >= 6 &&
      passwordInput.value.length <= 100 &&
      confirmPasswordInput.value === passwordInput.value
    );
  }

  // Redirect to the homepage.
  function redirectHome () {
    window.location.href = '/';
  };

  // Redirect to the homepage when Home button is clicked
  const homeButton = document.querySelector('.home');
  homeButton.addEventListener('click', redirectHome);

  // Redirect to the homepage when the logo is clicked
  const logos = document.querySelectorAll('.logo');
  logos.forEach((logo) => {
    logo.addEventListener('click', redirectHome);
  });

  const signUpButton = document.querySelector('.signup');
  // Handle redirecting to the sign up page when the sign up button is clicked.
  signUpButton.addEventListener('click', () => {
    window.location.href = '/signup';
  });

  const signInButtons = document.querySelectorAll('.signin');
  // Handle redirecting to the sign in page when the sign in button is clicked.
  signInButtons.forEach(button => {
    button.addEventListener('click', () => {
      window.location.href = '/signin';
    });
  });

  // Update submit button initially
  updateSubmitButton();

  submitButton.addEventListener('click', () => {
    updateSubmitButton();
  });
});
