// public/scripts/results.js

document.addEventListener('DOMContentLoaded', async () => {
  // Extract search query parameter from URL
  const searchParams = new URLSearchParams(window.location.search);
  let query = searchParams.get('query');
  const countContainer = document.querySelector('.count-container');
  const bookList = document.querySelector('.book-list');
  const prevPageButton = document.querySelector('.prev-page-button');
  const nextPageButton = document.querySelector('.next-page-button');
  const searchInput = document.getElementById('book-search');
  const searchButton = document.querySelector('.search-button');

  // Global variables for pagination
  let startIndex = 0;
  const maxResults = 10;
  let totalResults = 0;

  // Handle redirecting to the book details page when a book is clicked.
  function handleBookClick() {
    bookList.addEventListener('click', (event) => {
      const book = event.target.closest('.book');
      if (book) {
        // Extract volumeId
        const volumeId = book.id;
        if (volumeId) {
          window.location.href = `/books?id=${encodeURIComponent(volumeId)}`;
        } else {
          console.log('No book found');
        }
      }
    });
  }

  /**
   * Handle search query submission
   */
  async function handleSearchQuery () {
    query = searchInput.value.trim();

    if (query) {
      window.location.href = `/books/search?query=${encodeURIComponent(query)}`;
      const searchInput = document.getElementById('book-search');
      searchInput.value = query;
    } else {
      console.error('No search query found in URL');
    }
  }

  // Function to fetch books from the Google Books API
  async function fetchBooks(query, startIndex, maxResults) {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?key=AIzaSyDEv9J97e4e_ln5uYEtrt639fKBxyrREtU&q=${encodeURIComponent(query)}&startIndex=${startIndex}&maxResults=${maxResults}`, {mode: 'cors'});

    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }

    const data = await response.json();
    return data;
  }

  // Function to display books in the results section
  function displayBooks(books) {
    // Clear the existing content in the results section
    bookList.innerHTML = '';

    if (books.length === 0) {
      const noResultsMessage = document.createElement('p');
      noResultsMessage.textContent = 'No results found.';
      bookList.appendChild(noResultsMessage);
    } else {
      if (query)
      {
        // Calculate the current page number
        const currentPageNumber = Math.floor(startIndex / maxResults) + 1;
        // Calculate the total number of pages
        const totalPages = Math.ceil(totalResults / maxResults);

        // Create a paragraph element to display book count information
        const bookCountParagraph = document.createElement('p');
        bookCountParagraph.classList.add('count');
        bookCountParagraph.textContent = `Page ${currentPageNumber} out of ${totalPages}`;
        countContainer.innerHTML = '';
        countContainer.appendChild(bookCountParagraph);
      }
      // Loop through the books and create HTML elements to display them
      books.forEach((book) => {
        const title = book.volumeInfo.title;
        const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown';
        const thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150';
        const volumeId = book.id;

        // Create HTML elements for each book
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');
        bookElement.setAttribute('id', volumeId);
        bookElement.innerHTML = `
          <img src="${thumbnail}" alt="${title}">
          <div class="book-details">
            <h3>${title}</h3>
            <p>Authors: ${authors}</p>
          </div>
        `;

        // Append the book element to the results section
        bookList.appendChild(bookElement);
      });
    }
  }

  // Function to handle pagination
  function handlePagination() {
    // Next Page button
    nextPageButton.addEventListener('click', async () => {
      startIndex += maxResults;
      const data = await fetchBooks(query, startIndex, maxResults);
      displayBooks(data.items);
    });

    // Previous Page button
    prevPageButton.addEventListener('click', async () => {
      startIndex = Math.max(0, startIndex - maxResults);
      const data = await fetchBooks(query, startIndex, maxResults);
      displayBooks(data.items);
    });
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

  // Display the initial set of books
  if (query) {
    const initialBooks = await fetchBooks(query, startIndex, maxResults);
    totalResults = initialBooks.totalItems;
    displayBooks(initialBooks.items);
  } else {
    console.error('No search query found in URL');
  }

  // Initialize pagination
  handlePagination();

  handleHomeButtonClick();
  handleLogoClick();

  handleBookClick();

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