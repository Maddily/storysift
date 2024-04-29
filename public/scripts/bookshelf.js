document.addEventListener('DOMContentLoaded', async () => {
  const homeButton = document.querySelector('.home');
  const signOutButton = document.querySelector('.signout');
  const profileButton = document.querySelector('.profile');
  const searchParams = new URLSearchParams(window.location.search);
  const bookshelfId = searchParams.get('id');
  const bookList = document.querySelector('.book-list');

  const retrieveBooks = (async function () {
    const bookshelfObjectResponse = await fetch(`/api/bookshelves/${bookshelfId}`);
    const bookshelfObject = await bookshelfObjectResponse.json();
    const booksArray = bookshelfObject.books;
    document.title = `${bookshelfObject.name} Bookshelf`;

    await displayBooks(booksArray);
  })();

  async function displayBooks (books) {
    if (books.length === 0) {
      const noResultsMessage = document.createElement('p');
      noResultsMessage.textContent = 'Your bookshelf is empty.';
      bookList.appendChild(noResultsMessage);
    } else {
      for (let i = 0; i < books.length; i++) {
        try {
          const response = await fetch(`/api/books/${books[i]}/details`);
          if (!response.ok) {
            throw new Error('Failed to fetch book.');
          }

          const book = await response.json();
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

        bookList.appendChild(bookElement);

        } catch (error) {
          console.error('Error:', error);
        }
      }
    }
  }

  const handleBookClick = (function () {
    bookList.addEventListener('click', (event) => {
      const book = event.target.closest('.book');
      if (book) {
        const volumeId = book.id;
        if (volumeId) {
          window.location.href = `/books?id=${encodeURIComponent(volumeId)}`;
        } else {
          console.log('No book found');
        }
      }
    });
  })();

  const handleLogoClick = () => {
    const logos = document.querySelectorAll('.logo');

    logos.forEach((logo) => {
      logo.addEventListener('click', (event) => {
        window.location.href = '/';
      });
    })
  };

  const handleSignOut = async () => {
    localStorage.setItem('token', null);
    localStorage.setItem('userId', null);
    window.location.href = '/';
  };

  homeButton.addEventListener('click', () => {
    window.location.href = '/';
  });

  handleLogoClick();

  signOutButton.addEventListener('click', handleSignOut);

  profileButton.addEventListener('click', () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      window.location.href = `/user?id=${userId}`;
    } else {
      console.error('User ID not found');
    }
  });
});
