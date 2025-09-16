# Movie Watchlist Application

A single-page web application for searching movies and managing a personal watchlist. This project was built using vanilla HTML, CSS, and JavaScript to practice core front-end development skills, including API interaction and client-side storage.

![Screenshot of the Movie Watchlist Application](./screenshot.png)
*(Note: You should replace `screenshot.png` with an actual screenshot of your application.)*

## Features

*   **Movie Search:** Users can search for movies by title using the OMDb API.
*   **Detailed Information:** Search results display key movie details, including the poster, rating, runtime, genre, and plot summary.
*   **Watchlist Management:** Users can add movies from the search results to a personal watchlist.
*   **Data Persistence:** The watchlist is saved to the browser's `localStorage`, so the user's selections persist across sessions.
*   **View Toggling:** The application allows users to switch between the movie search view and their personal watchlist view.

## Tech Stack

*   **HTML5:** For the structure and content of the application.
*   **CSS3:** For styling and layout. Flexbox is used for positioning elements.
*   **JavaScript (ES6+):** For application logic, including:
    *   **Fetch API:** To make asynchronous requests to the external movie database.
    *   **Async/Await:** For handling asynchronous operations cleanly.
    *   **DOM Manipulation:** To dynamically render search results and watchlist items.
    *   **localStorage API:** To store and retrieve the user's watchlist on the client-side.

### External API

*   **[OMDb API](http://www.omdbapi.com/):** Used to fetch movie data. The application first performs a general search and then makes individual requests for each movie's detailed information.

## How to Run

This project does not require any build steps or dependencies.

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/your-repository-name.git
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd your-repository-name
    ```

3.  **Open the `index.html` file in your web browser.**

The application should now be running locally.

## Project Purpose and Learning Outcomes

This project served as a practical exercise to reinforce several key front-end development concepts:

*   **API Integration:** Gained experience in making requests to a third-party REST API, handling responses, and processing JSON data.
*   **Asynchronous JavaScript:** Utilized `async/await` and `Promise.all` to manage multiple network requests efficiently without blocking the main thread.
*   **State Management:** Implemented a simple state management system using `localStorage` to persist user data and vanilla JavaScript to control the UI (toggling between the search page and the watchlist).
*   **Dynamic UI:** Practiced dynamically creating and rendering HTML elements based on user interaction and data fetched from an API.