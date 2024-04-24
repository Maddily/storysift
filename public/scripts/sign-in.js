document.addEventListener('DOMContentLoaded', () => {
  const signInForm = document.querySelector('form');
  let email = document.getElementById('email');

  email.focus();

  signInForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    email = email.value.trim();
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
        throw new Error(data.error || 'Failed to sign up');
      }

      // Sign-up successful, redirect to a page
      /* window.location.href = '/signin'; */
      errorMessage.style.display = 'none';
      console.log('Sign in successful');
    } catch (error) {
      errorMessage.style.display = 'flex';
      console.error('Sign-up error:', error.message);
    }
  });

  // Function to handle redirecting to the landing page when the Home button is clicked.
  const handleHomeButtonClick = () => {
    const homeButton = document.querySelector('.home');

    homeButton.addEventListener('click', (event) => {
      event.preventDefault();
      // Redirect to the landing page
      window.location.href = '/';
    });
  };

  // Function to handle redirecting to the landing page when the logo is clicked.
  const handleLogoClick = () => {
    const logos = document.querySelectorAll('.logo');

    logos.forEach((logo) => {
      logo.addEventListener('click', (event) => {
        // Redirect to the landing page
        window.location.href = '/';
      });
    })
  };

  const signUpButtons = document.querySelectorAll('.sign-up');
  const signInButton = document.querySelector('.sign-in');

  // Function to handle redirecting to the sign up page when the sign up button is clicked.
  function handleSignUpButtonClick() {
    signUpButtons.forEach(button => {
      button.addEventListener('click', () => {
        window.location.href = '/signup';
      });
    });
    // the smaller sign up button isn't working
  }

  // Function to handle redirecting to the sign in page when the sign in button is clicked.
  function handleSignInButtonClick() {
    signInButton.addEventListener('click', () => {
      window.location.href = '/signin';
    });
  }

  handleHomeButtonClick();
  handleLogoClick();
  handleSignUpButtonClick();
  handleSignInButtonClick();
});
