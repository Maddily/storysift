/**
 * Handles user input and triggering search queries.
 */
const handleSearch = (function () {
  const searchInput = document.getElementById('book-search');
  const searchButton = document.querySelector('.search-button');

  function handleInput () {
    searchButton.addEventListener('click', () => {
      const input = searchInput.value.trim();
      console.log(input);
    });
  }

  return {handleInput};
})();

handleSearch.handleInput();

// When book search is requested with, fetch data from the google books api
// Process the response data by ierating over each book item in the response
// Extract relevant book information
// Display book information (results) in the page with correct endpoints
// Add event listeners to the search results for user interaction
// Handle user interaction with the search results (e.g. click, hover, etc)
