document.addEventListener('DOMContentLoaded', () => {
  const signInForm = document.querySelector('form');
  // const profileButton = document.querySelector('.profile');
  const email = document.getElementById('email');

  email.focus();

  signInForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const errorMessage = document.querySelector('.error');

    // Validate form input
    if (!email || !password) {
      return; // Do not submit the form if it's invalid
    }

    const user = {
      email,
      password
    };

    try {
      // Send sign-up request to the backend
      const response = await fetch('/api/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to sign in');
      }
      const { token, userId } = await response.json();
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);

      // Sign-in successful, redirect to home page
      window.location.href = '/';
      console.log('Sign in successful');
    } catch (error) {
      errorMessage.style.display = 'flex';
      console.error('Sign-in error:', error.message);
    }
  });

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

  const signUpButtons = document.querySelectorAll('.sign-up');
  const signInButton = document.querySelector('.sign-in');

  // Function to handle redirecting to the sign up page when the sign up button is clicked.
  function handleSignUpButtonClick () {
    signUpButtons.forEach(button => {
      button.addEventListener('click', () => {
        console.log('Sign-in form submitted');
        window.location.href = '/signup';
      });
    });
    // the smaller sign up button isn't working
  }

  // Function to handle redirecting to the sign in page when the sign in button is clicked.
  function handleSignInButtonClick () {
    signInButton.addEventListener('click', () => {
      console.log('Sign-in button clicked');
      window.location.href = '/signin';
    });
  }

  handleSignUpButtonClick();
  handleSignInButtonClick();

  // fetching user profile using the stored JWT token
  (async () => {
    try {
      const token = localStorage.getItem('token');
      const authResponse = await fetch('/api/users/check-authentication', {
        headers: {
          Authorization: token
        }
      });

      const authData = await authResponse.json();

      if (authData.authenticated) {
        // User is authenticated, hide sign-in and sign-up buttons
        const signInButton = document.querySelector('.sign-in');
        const signUpButtons = document.querySelectorAll('.sign-up');

        signInButton.style.display = 'none';
        signUpButtons.forEach((button) => {
          button.style.display = 'none';
        });

        console.log('Session started');
      }
    } catch (error) {
      console.error('Authentication check failed:', error.message);
    }
  })();
});
