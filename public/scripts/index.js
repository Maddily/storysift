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
      window.location.href = `/results.html?query=${encodeURIComponent(query)}`;
    }
  }

  // Event listener for search button click
  searchButton.addEventListener('click', handleSearchQuery);
});
