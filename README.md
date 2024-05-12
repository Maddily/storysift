# StorySift

StorySift is a user-friendly book lookup/finder app designed to simplify the process of discovering and engaging with books. With streamlined search features, StorySift caters to book enthusiasts, students, and researchers alike.

## Table of Contents

- [Features](#features)
- [Installation](#how-to-install)
- [Technologies Used](#technologies-used)
- [Data Model](#data-model)
- [Inspiration and Vision](#inspiration-and-vision)
- [Technical Challenges](#technical-challenges)
- [Next Iteration](#what-we-envision-for-a-next-iteration)
- [Timeline](#timeline)
- [Contributing](#contributing)
- [Authors](#authors)
- [Acknowledgments](#acknowledgments)
- [Related projects](#related-projects)
- [License](#license)

## Features

- **Search for Books**: Users can search for books by entering keywords or phrases in a search bar.


![Alt Text](assets/images/Landing-page.png)


- **View Search Results**: Users can view a list of search results containing relevant book titles and authors.


![Alt Text](assets/images/search-results.png)


- **Book Details**: Users can click on a book from the search results to view detailed information, including the book summary and cover image.


![Alt Text](assets/images/Book-details.png)


- **User Authentication**: Users can sign up for an account and sign in to access personalized features such as saving favorite books.


![Alt Text](assets/images/sign-up.png)


![Alt Text](assets/images/sign-in.png)


- **View profile details**: Users that have signed up will have access to personalized features such as saving favorite books.


![Alt Text](assets/images/profile-page.png)


- **Bookshelves**: Users can organize their saved books by category with the bookshelves feature.

![Alt Text](assets/images/bookshelf.png)

## How to Install

To install and run StorySift locally on your machine, follow these steps:

1. Clone the repository to your local machine:
```bash
git clone https://github.com/Maddily/storysift.git
```
2. Navigate to the project directory:
```bash
cd storysift
```
3. Install the necessary dependencies using npm (Node Package Manager):
```bash
npm install
```
4. Create a `.env` file in the root directory of the project and add your Google Books API key:
```
GOOGLE_BOOKS_API_KEY=your_api_key_here
```
5. Start the server:
```bash
node app.js
```
6. Once the server is running, open your web browser and navigate to `http://localhost:3000` to access StorySift.

That's it! You can now use StorySift to search for books, view search results, and explore book details.

## Technologies Used

StorySift is built using the following technologies:
* Frontend:
  * HTML
  * CSS
  * JavaScript
* Backend:
  * Node.js
  * Express.js
  * MongoDB (with Mongoose for database modeling)
* Libraries:
  * Axios
  * CORS (Cross-Origin Resource Sharing) middleware for Express.js
* API:
  * Google Books API

## Data Model
![new data models](https://github.com/Maddily/storysift/assets/68620670/72891c19-6638-4d7b-a34d-24dbbe7cfd9f)

## Inspiration and Vision

At StorySift, our mutual interest in books sparked the creation of this project. Inspired by our shared passion for reading, we envisioned a platform where fellow book enthusiasts could effortlessly discover their next literary adventure.

## Technical Challenges

Throughout our journey with StorySift, we encountered unexpected challenges that put our problem-solving skills to the test.

Firstly, tackling user authentication and managing sessions presented complexities. However, we viewed it as an opportunity to explore alternative methods, leading us to robust solutions with minimal overhead.

Additionally, during deployment, we initially considered using Netlify for hosting. However, realizing the complexity within our timeframe, we opted to host locally temporarily, allowing flexibility in finding a suitable hosting solution.

Despite these challenges, perseverance and innovative thinking led us to effective solutions, ensuring a polished and user-friendly experience with StorySift.

## What We Envision for a Next Iteration

As we envision the future of StorySift, here's what lies ahead:

* **User Reviews and Ratings:** Introducing a feature for users to share insights through reviews and ratings, enriching our platform.
* **Enhanced Search Functionality:** Improving search capabilities for seamless discovery, offering precise results by genre, author, and more.
* **Profile Personalization:** Empowering users with options to personalize their profiles, including uploading pictures and customizing bookshelf colors.
* **Machine Learning Recommendations:** Delivering personalized book recommendations based on individual reading history and preferences.

With these updates, we're committed to enhancing the StorySift experience, making it more enjoyable and personalized for our users.

## Timeline

The journey of crafting StorySift was a dynamic two-week endeavor, where each day presented new challenges and triumphs. From the initial conceptualization to the final touches, we poured our hearts and minds into this project, striving to create a seamless experience for book enthusiasts worldwide. Within this timeframe, we meticulously designed and developed the platform, overcoming hurdles with determination and ingenuity. Our collaborative efforts and unwavering dedication culminated in the birth of StorySift—a testament to our commitment to excellence and innovation in the realm of book discovery and exploration.

## Contributing

To contribute to StorySift, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-name`).
6. Create a new pull request.

## Authors

Mayada Saeed - <a href="https://github.com/Maddily">Github</a> / <a href="https://www.linkedin.com/in/mayadase/">LinkedIn</a><br>
Sibongile Nhlema - <a href="https://github.com/Sibongile-Nhlema">Github</a> / <a href="https://www.linkedin.com/in/sibongile-nhlema/">LinkedIn</a><br>

## Acknowledgments

* The logo is by ©Rizelle Anne Galvez via <a href="https://www.canva.com/" target="_blank">Canva.com</a>
* The landing page's background photo is by <a href="https://unsplash.com/@olia?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Olia Gozha</a> on <a href="https://unsplash.com/photos/white-book-marker-on-book-page-J4kK8b9Fgj8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

## Related-projects

* Airbnb Clone - <a href="https://github.com/Sibongile-Nhlema/AirBnB_clone_v4">HBNB Airbnb_v4</a> 

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
