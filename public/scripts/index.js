// public/scripts/index.js

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('book-search');
  const searchButton = document.querySelector('.search-button');

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
    const logo = document.querySelector('.logo-img');

    logo.addEventListener('click', (event) => {
      // Redirect to the landing page
      window.location.href = '/';
    });
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

  handleHomeButtonClick();
  handleLogoClick();
  handleDiscoverButtonClick();

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
