// public/scripts/details.js

document.addEventListener('DOMContentLoaded', async () => {
  // Extract search query parameter from URL
  const searchParams = new URLSearchParams(window.location.search);
  let volumeId = searchParams.get('id');
  const languageNames = {
    'af': 'Afrikaans',
    'am': 'Amharic',
    'ar': 'Arabic',
    'az': 'Azerbaijani',
    'be': 'Belarusian',
    'bg': 'Bulgarian',
    'bn': 'Bengali',
    'bs': 'Bosnian',
    'ca': 'Catalan',
    'ceb': 'Cebuano',
    'co': 'Corsican',
    'cs': 'Czech',
    'cy': 'Welsh',
    'da': 'Danish',
    'de': 'German',
    'el': 'Greek',
    'en': 'English',
    'eo': 'Esperanto',
    'es': 'Spanish',
    'et': 'Estonian',
    'eu': 'Basque',
    'fa': 'Persian',
    'fi': 'Finnish',
    'fr': 'French',
    'fy': 'Western Frisian',
    'ga': 'Irish',
    'gd': 'Scottish Gaelic',
    'gl': 'Galician',
    'gu': 'Gujarati',
    'ha': 'Hausa',
    'haw': 'Hawaiian',
    'he': 'Hebrew',
    'hi': 'Hindi',
    'hmn': 'Hmong',
    'hr': 'Croatian',
    'ht': 'Haitian Creole',
    'hu': 'Hungarian',
    'hy': 'Armenian',
    'id': 'Indonesian',
    'ig': 'Igbo',
    'is': 'Icelandic',
    'it': 'Italian',
    'ja': 'Japanese',
    'jv': 'Javanese',
    'ka': 'Georgian',
    'kk': 'Kazakh',
    'km': 'Khmer',
    'kn': 'Kannada',
    'ko': 'Korean',
    'ku': 'Kurdish (Kurmanji)',
    'ky': 'Kyrgyz',
    'la': 'Latin',
    'lb': 'Luxembourgish',
    'lo': 'Lao',
    'lt': 'Lithuanian',
    'lv': 'Latvian',
    'mg': 'Malagasy',
    'mi': 'Maori',
    'mk': 'Macedonian',
    'ml': 'Malayalam',
    'mn': 'Mongolian',
    'mr': 'Marathi',
    'ms': 'Malay',
    'mt': 'Maltese',
    'my': 'Burmese',
    'ne': 'Nepali',
    'nl': 'Dutch',
    'no': 'Norwegian',
    'ny': 'Chichewa',
    'or': 'Odia (Oriya)',
    'pa': 'Punjabi',
    'pl': 'Polish',
    'ps': 'Pashto',
    'pt': 'Portuguese',
    'ro': 'Romanian',
    'ru': 'Russian',
    'rw': 'Kinyarwanda',
    'sd': 'Sindhi',
    'si': 'Sinhala',
    'sk': 'Slovak',
    'sl': 'Slovenian',
    'sm': 'Samoan',
    'sn': 'Shona',
    'so': 'Somali',
    'sq': 'Albanian',
    'sr': 'Serbian',
    'st': 'Southern Sotho',
    'su': 'Sundanese',
    'sv': 'Swedish',
    'sw': 'Swahili',
    'ta': 'Tamil',
    'te': 'Telugu',
    'tg': 'Tajik',
    'th': 'Thai',
    'tk': 'Turkmen',
    'tl': 'Filipino',
    'tr': 'Turkish',
    'tt': 'Tatar',
    'ug': 'Uyghur',
    'uk': 'Ukrainian',
    'ur': 'Urdu',
    'uz': 'Uzbek',
    'vi': 'Vietnamese',
    'xh': 'Xhosa',
    'yi': 'Yiddish',
    'yo': 'Yoruba',
    'zh': 'Chinese',
    'zu': 'Zulu'
  };

  /**
   * Fetch book details from the Google Books API
   */
  async function fetchBookDetails() {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${volumeId}`, {mode: 'cors'});

    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }

    const data = await response.json();
    return data;
  }

  /**
   * Fetch author details from the Google Books API
   */
  async function fetchAuthorDetails(author) {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?key=AIzaSyDEv9J97e4e_ln5uYEtrt639fKBxyrREtU&q=inauthor:${encodeURIComponent(author)}`, {mode: 'cors'});

    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }

    const data = await response.json();
    return data;
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
    })
  };

  if (volumeId) {
    const bookData = await fetchBookDetails();
    // Fetch book details
    try {
      const thumbnail = bookData.volumeInfo.imageLinks ? bookData.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150';
      const title = bookData.volumeInfo.title;
      const authors = bookData.volumeInfo.authors ? bookData.volumeInfo.authors : 'Unknown';
      const description = bookData.volumeInfo.description ? bookData.volumeInfo.description : 'Unknown';
      const pageCount = bookData.volumeInfo.pageCount? bookData.volumeInfo.pageCount : 'Unknown';
      const languageCode = bookData.volumeInfo.language ? bookData.volumeInfo.language : 'Unknown';
      const publisher = bookData.volumeInfo.publisher ? bookData.volumeInfo.publisher : 'Unknown';
      const publishedDate = bookData.volumeInfo.publishedDate ? bookData.volumeInfo.publishedDate : 'Unknown';
      const isbn = bookData.volumeInfo.industryIdentifiers ? bookData.volumeInfo.industryIdentifiers[1].identifier : 'unknown';

      const bookDetailsContainer = document.querySelector('.book-details-container');

      bookDetailsContainer.innerHTML = `
        <img src="${thumbnail}" alt="${title}">
        <div class="book-details">
          <h1>${title}</h1>
          <p class="author">${authors.join(', ')}</p>
          <p class="description">${description}</p>
          <div>
            <p>Pages</p>
            <p>${pageCount}</p>
          </div>
          <div class="language">
            <p>Language</p>
            <p>${languageNames[languageCode]}</p>
          </div>
          <div class="publisher">
            <p>Publisher</p>
            <p>${publisher}</p>
          </div>
          <div class="published">
            <p>Published</p>
            <p>${publishedDate}</p>
          </div>
          <div class="isbn">
            <p>ISBN</p>
            <p>${isbn}</p>
          </div>
        </div>
      `;
      document.title = title + ' by ' + authors[0] + ' | StorySift';
    } catch (error) {
      const detailsSection = document.querySelector('.details');
      detailsSection.textContent = 'Service temporarily unavailable.';
      detailsSection.style.textAlign = 'center';
      detailsSection.style.color = '#152d34';
    }

    // Fetch author details
    const authorDetailsSection = document.querySelector('.author-details-container');
    try {
      const authors = bookData.volumeInfo.authors ? bookData.volumeInfo.authors : undefined;
      const authorData = await fetchAuthorDetails(authors[0]);
      const thumbnail = document.querySelector('.book-details-container img');

      authorDetailsSection.innerHTML = `
        <span style="width: ${thumbnail.width}px;"></span>
        <div class="author-details">
          <h2>About the author</h2>
          <div>
            <p>Author Name</p>
            <p>${authors[0]}</p>
          </div>
          <div>
            <p>Books Written</p>
            <p>${authorData.totalItems}</p>
          </div>
        </div>
      `;
    } catch (error) {
      authorDetailsSection.textContent = 'Unknown';
      authorDetailsSection.style.textAlign = 'center';
      authorDetailsSection.style.color = '#152d34';
    }
  }

  const signUpButton = document.querySelector('.signup');
  const signInButton = document.querySelector('.sign-in');

  /**
   * Handle redirecting to the sign up page when the sign up button is clicked.
   */
  function handleSignUpButtonClick() {
    signUpButton.addEventListener('click', () => {
      window.location.href = '/signup';
    });
  }

  /**
   * Handle redirecting to the sign in page when the sign in button is clicked.
   */
  function handleSignInButtonClick() {
    signInButton.addEventListener('click', () => {
      window.location.href = '/signin';
    });
  }

  handleHomeButtonClick();
  handleLogoClick();
  handleSignUpButtonClick();
  handleSignInButtonClick();
});
