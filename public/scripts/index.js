// public/scripts/index.js
document.addEventListener('DOMContentLoaded', async () => {
  const searchInput = document.getElementById('book-search');
  const searchButton = document.querySelector('.search-button');
  const signUpButton = document.querySelector('.signup');
  const signInButton = document.querySelector('.sign-in');
  const signOutButton = document.querySelector('.signout');
  const profileButton = document.querySelector('.profile');

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

  // Put the search bar in focus when Discover button is clicked.
  document.addEventListener('click', (event) => {
    const discoverButton = event.target.closest('.discover');
    if (discoverButton) {
      event.preventDefault();
      searchInput.focus();
    }
  });

  // Handle redirecting to the sign up page when the sign up button is clicked.
  signUpButton.addEventListener('click', () => {
    window.location.href = '/signup';
  });

  // Handle redirecting to the sign in page when the sign in button is clicked.
  signInButton.addEventListener('click', () => {
    window.location.href = '/signin';
  });

  // Check authentication status using JWT
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

  // Show navigation buttons for authenticated users
  function showAuthenticatedNav () {
    signInButton.style.display = 'none';
    signUpButton.style.display = 'none';
    profileButton.style.display = 'flex';
    signOutButton.style.display = 'flex';
  };

  // Show navigation buttons for guest users
  function showGuestNav () {
    signInButton.style.display = 'flex';
    signUpButton.style.display = 'flex';
    profileButton.style.display = 'none';
    signOutButton.style.display = 'none';
  };

  // Handle search query submission
  function handleSearchQuery () {
    const query = searchInput.value.trim();
    if (query) {
      try {
        window.location.href = `/books/search?query=${encodeURIComponent(query)}`;
      } catch (err) {
        console.error(err);
      }
    }
  }

  // Event listener for search button click
  searchButton.addEventListener('click', handleSearchQuery);

  // Event listener for pressing Enter key
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchQuery();
    }
  });

  // Handle sign out by resetting the stored token and userId, then reloading the page
  function handleSignOut () {
    localStorage.setItem('token', null);
    localStorage.setItem('userId', null);
    window.location.reload();
  };

  // Event listener for sign out button click
  signOutButton.addEventListener('click', handleSignOut);

  // Redirect to profile page
  function redirectToProfile () {
    const userId = localStorage.getItem('userId');
    if (userId) {
      window.location.href = `/user?id=${userId}`;
    } else {
      console.error('User ID not found');
    }
  }

  // Event listener for profile button click
  profileButton.addEventListener('click', redirectToProfile);
});
