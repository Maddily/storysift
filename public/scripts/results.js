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
      let bookId = addButton.parentElement.getAttribute('id');
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

          // Handle closing the modal
          const cancelButton = document.querySelector('.cancel');
          cancelButton.addEventListener('click', () => {
            modal.close();
          });
          document.addEventListener('click', (event) => {
            if (event.target === modal) modal.close();
          });

          // Handle choosing a bookshelf and placing a book in it
          bookshelves = document.querySelectorAll('.bookshelf');
          bookshelves.forEach(bookshelf => {
            bookshelf.addEventListener('click', async () => {
              const bookshelfId = bookshelf.dataset.id;
              // Fetch the clicked bookshelf Object and add the book to its books array
              const bookshelfObjectResponse = await fetch(`/api/bookshelves/${bookshelfId}`);
              const bookshelfObject = await bookshelfObjectResponse.json();
              const booksArray = bookshelfObject.books;
              if (booksArray.includes(bookId)) {
                return;
              }
              booksArray.push(bookId);
              // Add the book to the bookshelf
              const bookshelfResponse = await fetch(`/api/bookshelves/${bookshelfId}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  books: booksArray
                })
              });
              if (!bookshelfResponse.ok) {
                throw new Error('Failed to update bookshelf.');
              }
              modal.close();
            });
          });
          } catch (error) {
            console.error('Error:', error);
          }
        })();
      }
    });
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

  // Display the next page of books
  async function displayNextPage () {
    startIndex += maxResults;
    const data = await fetchBooks(query, startIndex, maxResults);
    if (data && data.items && data.items.length > 0) {
      books = data.items || [];
      displayBooks(books);
    } else {
      console.log('No more books to display.');
    }
  }

  // Display the next page of books when Next button is clicked
  nextPageButton.addEventListener('click', displayNextPage);

  // Display the previous page of books
  async function displayPreviousPage () {
    startIndex = Math.max(0, startIndex - maxResults);
    const data = await fetchBooks(query, startIndex, maxResults);
    if (data && data.items && data.items.length > 0) {
      books = data.items || [];
      displayBooks(books);
    } else {
      console.log('No more books to display.');
    }
  }
  // Display the previous page of books when Previous button is clicked
  prevPageButton.addEventListener('click', displayPreviousPage);

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

  const signUpButton = document.querySelector('.signup');
  // Handle redirecting to the sign up page when the sign up button is clicked.
  signUpButton.addEventListener('click', () => {
    window.location.href = '/signup';
  });

  const signInButton = document.querySelector('.sign-in');
  // Handle redirecting to the sign in page when the sign in button is clicked.
  signInButton.addEventListener('click', () => {
    window.location.href = '/signin';
  });

  const signOutButton = document.querySelector('.signout');
  // Handle sign out
  function handleSignOut () {
    localStorage.setItem('token', null);
    window.location.reload();
  };

  // Event listener for sign out button click
  signOutButton.addEventListener('click', handleSignOut);

  handleBookClick();

  // Handle search query submission
  function handleSearchQuery () {
    query = searchInput.value.trim();

    if (query) {
      window.location.href = `/books/search?query=${encodeURIComponent(query)}`;
    } else {
      console.error('No search query found in URL');
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

  // Redirect to profile page
  function redirectToProfile () {
    const userId = localStorage.getItem('userId');
    if (userId) {
      window.location.href = `/user?id=${userId}`;
    } else {
      console.error('User ID not found');
    }
  }

  const profileButton = document.querySelector('.profile');
  // Event listener for profile button click
  profileButton.addEventListener('click', redirectToProfile);

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
});
