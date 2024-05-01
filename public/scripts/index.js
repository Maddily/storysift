// public/scripts/index.js

document.addEventListener('DOMContentLoaded', () => {
  const homeButton = document.querySelector('.home');
  const searchInput = document.getElementById('book-search');
  const searchButton = document.querySelector('.search-button');
  const signUpButton = document.querySelector('.signup');
  const signInButton = document.querySelector('.sign-in');
  const signOutButton = document.querySelector('.signout');
  const profileButton = document.querySelector('.profile');

  // Handle search query submission
  async function handleSearchQuery () {
    const query = searchInput.value.trim();
    if (query) {
      try {
        window.location.href = `/books/search?query=${encodeURIComponent(query)}`;
      } catch (err) {
        console.error(err);
      }
    }
  }

  // Handle redirecting to the landing page when the Home button is clicked.
  const handleHomeButtonClick = () => {
    homeButton.addEventListener('click', (event) => {
      // Prevent the default link behavior
      event.preventDefault();
      // Redirect to the landing page
      window.location.href = '/';
    });
  };

  // Handle redirecting to the landing page when the logo is clicked.
  const handleLogoClick = () => {
    const logos = document.querySelectorAll('.logo');

    logos.forEach((logo) => {
      logo.addEventListener('click', (event) => {
        // Redirect to the landing page
        window.location.href = '/';
      });
    });
  };

  // Put the search bar in focus when Discover button is clicked.
  function handleDiscoverButtonClick () {
    document.addEventListener('click', (event) => {
      const discoverButton = event.target.closest('.discover');
      if (discoverButton) {
        event.preventDefault();
        searchInput.focus();
      }
    });
  }

  // Handle redirecting to the sign up page when the sign up button is clicked.
  function handleSignUpButtonClick () {
    signUpButton.addEventListener('click', () => {
      window.location.href = '/signup';
    });
  }

  // Handle redirecting to the sign in page when the sign in button is clicked.
  function handleSignInButtonClick () {
    signInButton.addEventListener('click', () => {
      window.location.href = '/signin';
    });
  }

  // Function to check authentication status using JWT
  const checkAuthentication = async () => {
    try {
      const token = localStorage.getItem('token');

      const authResponse = await fetch('/api/users/check-authentication', {
        headers: {
          Authorization: token
        }
      });

      const authData = await authResponse.json();

      if (authData.authenticated) {
        // Token is valid, user is authenticated
        showAuthenticatedNav();
      } else {
        // Token is invalid or expired, user is not authenticated
        showGuestNav();
      }
    } catch (error) {
      console.error('Error checking authentication status:', error);
    }
  };

  // Function to show navigation buttons for authenticated users
  const showAuthenticatedNav = () => {
    signInButton.style.display = 'none';
    signUpButton.style.display = 'none';
    profileButton.style.display = 'flex';
    signOutButton.style.display = 'flex';
  };

  // Function to show navigation buttons for guest users
  const showGuestNav = () => {
    signInButton.style.display = 'flex';
    signUpButton.style.display = 'flex';
    profileButton.style.display = 'none';
    signOutButton.style.display = 'none';
  };

  // Check authentication status when the DOM is loaded
  checkAuthentication();

  signInButton.addEventListener('click', () => {
    window.location.href = '/signin';
  });

  signUpButton.addEventListener('click', () => {
    window.location.href = '/signup';
  });

  handleHomeButtonClick();
  handleLogoClick();
  handleDiscoverButtonClick();
  handleSignUpButtonClick();
  handleSignInButtonClick();

  // Event listener for search button click
  searchButton.addEventListener('click', handleSearchQuery);

  // Event listener for pressing Enter key
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchQuery();
    }
  });

  // Function to handle sign out
  const handleSignOut = async () => {
    localStorage.setItem('token', null);
    localStorage.setItem('userId', null);
    window.location.reload();
  };

  // Event listener for sign out button click
  signOutButton.addEventListener('click', handleSignOut);

  // Event listener for profile button click
  profileButton.addEventListener('click', () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      window.location.href = `/user?id=${userId}`;
    } else {
      console.error('User ID not found');
    }
  });
});
