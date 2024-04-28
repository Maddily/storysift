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
  const signUpButton = document.querySelector('.signup');
  const signInButton = document.querySelector('.sign-in');

  // Global variables for pagination
  let startIndex = 0;
  const maxResults = 10;
  let totalResults = 0;
  let books = [];

  // Handle redirecting to the book details page when a book is clicked.
  function handleBookClick () {
    bookList.addEventListener('click', (event) => {
      // Handle clicking on book details section
      const bookDetails = event.target.closest('.book-details');
      if (bookDetails) {
        // Extract volumeId
        const volumeId = bookDetails.id;
        if (volumeId) {
          window.location.href = `/books?id=${encodeURIComponent(volumeId)}`;
        } else {
          console.log('No book found');
        }
      }
      // Handle clicking on book cover
      const bookCover = event.target.closest('.book img');
      if (bookCover) {
        // Extract volumeId
        const volumeId = bookCover.id;
        if (volumeId) {
          window.location.href = `/books?id=${encodeURIComponent(volumeId)}`;
        } else {
          console.log('No book found');
        }
      }
      // Handle clicking on add button
      const addButton = event.target.closest('.add');
      if (addButton) {
        const modal = document.querySelector("dialog");
        modal.showModal();
        // With user id, retrieve bookshelves
        const userId = localStorage.getItem('userId');
        const fetchBookshelves = (async function () {
          try {
          const response = await fetch(`/api/bookshelves?userId=${userId}`);
          let bookshelves = await response.json();
          const bookShelvesContainer = document.querySelector('.bookshelves');
          bookShelvesContainer.innerHTML = '';
          for (let i = 0; i < bookshelves.length; i++) {
            const bookshelf = document.createElement('div');
            bookshelf.classList.add('bookshelf');
            bookshelf.setAttribute('data-id', bookshelves[i]._id);
            bookshelf.innerHTML = bookshelves[i].name;
            bookShelvesContainer.appendChild(bookshelf);
          }

          /* // Handle choosing a bookshelf
          bookshelves = document.querySelectorAll('.bookshelf');
          bookshelf.forEach(bookshelf => {
            bookshelf.addEventListener('click', () => {
              // Add book to the user's bookshelf
              // Get bookshelf's id
              // Fetch /api/bookshelves/:id PUT
                // Pass data in request
            });
          }); */

          // Handle closing the modal
          const cancelButton = document.querySelector('.cancel');
          cancelButton.addEventListener('click', () => {
            modal.close();
          });
          document.addEventListener('click', (event) => {
            if (event.target === modal) modal.close();
          });
          } catch (error) {
            console.error('Error:', error);
          }
        })();
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
    } else {
      console.error('No search query found in URL');
    }
  }

  // Function to fetch books from the backend
  async function fetchBooks (query, startIndex, maxResults) {
    const response = await fetch(`/api/books/search?query=${encodeURIComponent(query)}&startIndex=${startIndex}&maxResults=${maxResults}`);

    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }

    const data = await response.json();
    return data;
  }

  // Function to display books in the results section
  function displayBooks (books) {
    // Clear the existing content in the results section
    bookList.innerHTML = '';

    if (books.length === 0) {
      const noResultsMessage = document.createElement('p');
      noResultsMessage.textContent = 'No results found.';
      bookList.appendChild(noResultsMessage);
    } else {
      if (query) {
        // Calculate the current page number
        const currentPageNumber = Math.floor(startIndex / maxResults) + 1;
        // Calculate the total number of pages
        const totalPages = Math.ceil(totalResults / maxResults);

        // Create a paragraph element to display book count information
        const bookCountParagraph = document.createElement('p');
        bookCountParagraph.classList.add('count');
        bookCountParagraph.textContent = `Search results for "${query}" - Page ${currentPageNumber} out of ${totalPages}`;
        countContainer.innerHTML = '';
        countContainer.appendChild(bookCountParagraph);
      }
      // Loop through the books and create HTML elements to display them
      books.forEach(async (book) => {
        const title = book.title;
        const authors = book.author;
        const thumbnail = book.thumbnailURL ? book.thumbnailURL : 'https://via.placeholder.com/150';
        const volumeId = book.volumeId;

        // Create HTML elements for each book
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');
        bookElement.setAttribute('id', volumeId);
        bookElement.innerHTML = `
          <img src="${thumbnail}" alt="${title}" id=${volumeId}>
          <div class="book-details" id=${volumeId}>
            <h3>${title}</h3>
            <p>Authors: ${authors}</p>
          </div>
        `;

        // Append the book element to the results section
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
            const addBookToShelf = document.createElement('p');
            addBookToShelf.innerHTML = 'Add';
            addBookToShelf.classList.add('add');
            bookElement.appendChild(addBookToShelf);
            bookElement.style.gridTemplateColumns = '1fr 7fr 1fr';
          }
          } catch (error) {
            console.error('Error checking authentication status:', error);
          }
        bookList.appendChild(bookElement);
      });
    }
  }

  // Function to handle pagination
  function handlePagination () {
    // Next Page button
    nextPageButton.addEventListener('click', async () => {
      startIndex += maxResults;
      const data = await fetchBooks(query, startIndex, maxResults);
      if (data && data.items && data.items.length > 0) {
        books = data.items || [];
        displayBooks(books);
      } else {
        console.log('No more books to display.');
      }
    });

    // Previous Page button
    prevPageButton.addEventListener('click', async () => {
      startIndex = Math.max(0, startIndex - maxResults);
      const data = await fetchBooks(query, startIndex, maxResults);
      if (data && data.items && data.items.length > 0) {
        books = data.items || [];
        displayBooks(books);
      } else {
        console.log('No more books to display.');
      }
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
    const logos = document.querySelectorAll('.logo');

    logos.forEach((logo) => {
      logo.addEventListener('click', (event) => {
        // Redirect to the landing page
        window.location.href = '/';
      });
    });
  };

  // Display the initial set of books
  if (query) {
    document.title = `Search results for "${query}"`;
    try {
      const initialBooks = await fetchBooks(query, startIndex, maxResults);
      if (initialBooks && initialBooks.items && initialBooks.items.length > 0) {
        totalResults = initialBooks.totalItems;
        books = initialBooks.items || [];
        displayBooks(books);
      } else {
        console.log('No books found for the given query.');
        displayBooks([]);
      }
    } catch (error) {
      console.error('Failed to fetch books:', error);
    }
  } else {
    console.error('No search query found in URL');
  }

  /**
   * Handle redirecting to the sign up page when the sign up button is clicked.
   */
  function handleSignUpButtonClick () {
    signUpButton.addEventListener('click', () => {
      window.location.href = '/signup';
    });
  }

  /**
   * Handle redirecting to the sign in page when the sign in button is clicked.
   */
  function handleSignInButtonClick () {
    signInButton.addEventListener('click', () => {
      window.location.href = '/signin';
    });
  }

  const signOutButton = document.querySelector('.signout');
  const profileButton = document.querySelector('.profile');

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

  // Function to handle sign out
  const handleSignOut = async () => {
    localStorage.setItem('token', null);
    window.location.reload();
  };

  // Event listener for sign out button click
  signOutButton.addEventListener('click', handleSignOut);

  // Initialize pagination
  handlePagination();

  handleHomeButtonClick();
  handleLogoClick();

  handleBookClick();

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

  // Event listener for profile button click
  profileButton.addEventListener('click', () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      window.location.href = `/user?id=${userId}`;
    } else {
      console.error('User ID not found');
    }
  });

  const addBookButtons = document.querySelectorAll('.add');

  if (addBookButtons) {
    addBookButtons.forEach(button => {
      button.addEventListener('click', () => {
        console.log('it works');
      });
    });
  }
});
