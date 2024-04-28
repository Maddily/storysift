document.addEventListener('DOMContentLoaded', async () => {
  const homeButton = document.querySelector('.home');
  const signOutButton = document.querySelector('.signout');
  const profileButton = document.querySelector('.profile');
  const searchParams = new URLSearchParams(window.location.search);
  const userId = searchParams.get('id');
  const fullName = document.querySelector('.full-name');
  const userName = document.querySelector('.username');
  const email = document.querySelector('.email');
  const joiningDate = document.querySelector('.joining-date');
  const addBookShelf = document.querySelector('.create-shelf');
  const bookshelfInput = document.getElementById('bookshelf');
  const bookShelvesHead = document.querySelector('.user-book-shelves');
  const bookShelvesContainer = document.querySelector('.book-shelves');

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
  } catch (error) {
    console.error('Failed to fetch user data.');
  }

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

  // Create a bookshelf
  addBookShelf.addEventListener('click', async () => {
    if (bookshelfInput.value) {
      try {
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
        await fetchBookshelves();
        bookshelfInput.value = '';
        /* if (response.ok) {
          window.location.reload();
        } */
      } catch (error) {
        console.error('Error:', error);
      }
    }
  });

  // Fetch bookshelves
  async function fetchBookshelves () {
    try {
    const response = await fetch(`/api/bookshelves?userId=${userId}`);
    const bookshelves = await response.json();

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

  await fetchBookshelves();

  const bookshelves = document.querySelectorAll('.bookshelf');
  const bookshelf = document.querySelector('.bookshelf');
  if (bookshelves) {
    bookshelves.forEach(bookshelf => {
      bookshelf.addEventListener('click', () => {
        window.location.href = `/bookshelf?id=${bookshelf.dataset.id}`;
      });
    });
  } else if (bookshelf) {
    bookshelf.addEventListener('click', () => {
      // Redirect to bookshelf page
      window.location.href = `/bookshelf?id=${bookshelf.dataset.id}`;
    });
  }

  // Handle redirecting to the landing page when the logo is clicked.
  const handleLogoClick = () => {
    const logos = document.querySelectorAll('.logo');

    logos.forEach((logo) => {
      logo.addEventListener('click', (event) => {
        // Redirect to the landing page
        window.location.href = '/';
      });
    })
  };

  // Function to handle sign out
  const handleSignOut = async () => {
    localStorage.setItem('token', null);
    localStorage.setItem('userId', null);
    window.location.href = '/';
  };

  // Add event listeners to navigation buttons
  homeButton.addEventListener('click', () => {
    window.location.href = '/';
  });

  handleLogoClick();

  // Event listener for sign out button click
  signOutButton.addEventListener('click', handleSignOut);

  // Event listener for profile button click
  profileButton.addEventListener('click', () => {
    window.location.reload();
  });
});
