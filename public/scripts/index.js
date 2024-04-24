// public/scripts/index.js

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('book-search');
  const searchButton = document.querySelector('.search-button');
  const signUpButton = document.querySelector('.signup');
  const signInButton = document.querySelector('.sign-in');

  /**
   * Handle search query submission
   */
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

  /**
   * Handle redirecting to the landing page when the Home button is clicked.
   */
  const handleHomeButtonClick = () => {
    const homeButton = document.querySelector('.home');

    homeButton.addEventListener('click', (event) => {
      // Prevent the default link behavior
      event.preventDefault();
      // Redirect to the landing page
      window.location.href = '/';
    });
  };

  /**
   * Handle redirecting to the landing page when the logo is clicked.
   */
  const handleLogoClick = () => {
    const logos = document.querySelectorAll('.logo');

    logos.forEach((logo) => {
      logo.addEventListener('click', (event) => {
        // Redirect to the landing page
        window.location.href = '/';
      });
    })
  };

  /**
   * Put the search bar in focus when Discover button is clicked.
   */
  function handleDiscoverButtonClick () {
    document.addEventListener('click', (event) => {
      const discoverButton = event.target.closest('.discover');
      if (discoverButton) {
        event.preventDefault();
        searchInput.focus();
      }
    });
  };

  /**
   * Handle redirecting to the sign up page when the sign up button is clicked.
   */
  function handleSignUpButtonClick() {
    signUpButton.addEventListener('click', () => {
      window.location.href = '/signup';
    });
  }

  /**
   * Handle redirecting to the sign in page when the sign in button is clicked.
   */
  function handleSignInButtonClick() {
    signInButton.addEventListener('click', () => {
      window.location.href = '/signin';
    });
  }

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
});
