document.addEventListener('DOMContentLoaded', async () => {
  const searchParams = new URLSearchParams(window.location.search);
  const userId = searchParams.get('id');
  const fullName = document.querySelector('.full-name');
  const userName = document.querySelector('.username');
  const email = document.querySelector('.email');
  const joiningDate = document.querySelector('.joining-date');
  const bookShelvesHead = document.querySelector('.user-book-shelves');

  // Get user data
  try {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const userData = await response.json();

    fullName.innerHTML = userData.first_name + ' ' + userData.last_name;
    userName.innerHTML = userData.username;
    email.innerHTML = userData.email;
    joiningDate.innerHTML = formatDate(userData.joining_date);
    bookShelvesHead.innerHTML = `${userData.first_name}'s Bookshelves`;
    document.title = `${userData.first_name}'s Profile`;
  } catch (error) {
    console.error('Failed to fetch user data.');
  }

  // Change the joining date format to "Joined in <month> <year>"
  function formatDate (dateString) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // Parse the date string to a JavaScript Date object
    const date = new Date(dateString);

    // Get the month and year from the parsed date
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    // Format the output string
    const formattedDate = `Joined in ${month} ${year}`;

    return formattedDate;
  }

  const bookshelfInput = document.getElementById('bookshelf');

  // Create a bookshelf
  async function createBookshelf() {
    if (bookshelfInput.value) {
      try {
        // Fetch stored bookshelves and only add a new one if it doesn't already exist
        const bookshelfResponse = await fetch(`/api/bookshelves?userId=${userId}`);
        const bookshelves = await bookshelfResponse.json();

        if (bookshelves.some((bookshelf) => bookshelf.name === bookshelfInput.value)) {
          bookshelfInput.value = '';
          return;
        }

        // Create a new bookshelf
        const response = await fetch('/api/bookshelves', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: bookshelfInput.value,
            user_id: userId
          })
        });

        // Refresh the displayed bookshelves to show the newly added one
        await fetchBookshelves();
        bookshelfInput.value = '';
        window.location.reload();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }

  // Create a bookshelf on button click or enter key press
  const addShelfButton = document.querySelector('.create-shelf');

  addShelfButton.addEventListener('click', createBookshelf);

  bookshelfInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      createBookshelf();
    }
  });

  // Fetch bookshelves
  async function fetchBookshelves () {
    try {
    const response = await fetch(`/api/bookshelves?userId=${userId}`);
    const bookshelves = await response.json();
    const bookShelvesContainer = document.querySelector('.book-shelves');

    bookShelvesContainer.innerHTML = '';
    for (let i = 0; i < bookshelves.length; i++) {
      const bookshelf = document.createElement('div');
      bookshelf.classList.add('bookshelf');
      bookshelf.setAttribute('data-id', bookshelves[i]._id);
      bookshelf.innerHTML = bookshelves[i].name;
      bookShelvesContainer.appendChild(bookshelf);
    }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Initially fetch and display a user's stored bookshelves
  await fetchBookshelves();

  const bookshelves = document.querySelectorAll('.bookshelf');
  const bookshelf = document.querySelector('.bookshelf');

  // Handle selecting a bookshelf in the cases when a user has
  // only one bookshelf or more than one
  if (bookshelves) {
    bookshelves.forEach(bookshelf => {
      bookshelf.addEventListener('click', () => {
        // Redirect to bookshelf page
        window.location.href = `/bookshelf?id=${bookshelf.dataset.id}`;
      });
    });
  } else if (bookshelf) {
    bookshelf.addEventListener('click', () => {
      // Redirect to bookshelf page
      window.location.href = `/bookshelf?id=${bookshelf.dataset.id}`;
    });
  }

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

  // Function to handle sign out
  function handleSignOut () {
    localStorage.setItem('token', null);
    localStorage.setItem('userId', null);
    window.location.href = '/';
  }

  const signOutButton = document.querySelector('.signout');
  // Event listener for sign out button click
  signOutButton.addEventListener('click', handleSignOut);

  const profileButton = document.querySelector('.profile');
  // Event listener for profile button click
  profileButton.addEventListener('click', () => {
    window.location.reload();
  });

  // If a user isn't authenticated, redirect them to the homepage
  try {
    const token = localStorage.getItem('token');

    const authResponse = await fetch('/api/users/check-authentication', {
      headers: {
        Authorization: token
      }
    });

    const authData = await authResponse.json();

    if (!authData.authenticated) {
      window.location.href = '/';
    }
  } catch (error) {
    console.error('Error checking authentication status:', error);
  }
});
