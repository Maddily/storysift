// public/scripts/index.js

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('book-search');
  const searchButton = document.querySelector('.search-button');

  /**
   * Handles search query submission
   */
  function handleSearchQuery () {
    const query = searchInput.value.trim();
    if (query) {
      // Redirect to results page with search query as query parameter
      window.location.href = `/books/search?query=${encodeURIComponent(query)}`;
      // Update page title
      document.title += ` for "${query}"`;
    }
  }

  /**
   * Handles redirecting to the landing page when the Home button is clicked.
   */
  const handleHomeButtonClick = () => {
    const homeButton = document.querySelector('.home a');

    homeButton.addEventListener('click', (event) => {
      // Prevent the default link behavior
      event.preventDefault();
      // Redirect to the landing page
      window.location.href = '/';
    });
  };

  /**
   * Handles redirecting to /books when Discover button is clicked.
   */
  const handleDiscoverButtonClick = () => {
    const discoverButton = document.querySelector('.discover');

    discoverButton.addEventListener('click', (event) => {
      // Prevent the default link behavior
      event.preventDefault();
      // Redirect to the landing page
      window.location.href = '/books';
    });
  };

  handleHomeButtonClick();
  handleDiscoverButtonClick();

  // Event listener for search button click
  searchButton.addEventListener('click', handleSearchQuery);
});
