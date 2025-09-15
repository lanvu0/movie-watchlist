const mainContainer = document.querySelector('main')
const form = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')
const myWatchlistEl = document.getElementById('my-watchlist')
const myWatchlist = []

form.addEventListener('submit', searchMovie)
mainContainer.addEventListener('click', function(e) {
    if (e.target.parentElement.classList.contains('add-movie')) {
        console.log("Add movie to watchlist button clicked")
        addToWatchlist(e.target.parentElement.dataset.imdbId)
    } else if (e.target.parentElement.classList.contains('remove-movie')) {
        console.log(`Remove movie with ID ${e.target.parentElement.dataset.imdbId} from watchlist button clicked`)
        removeFromWatchlist(e.target.parentElement.dataset.imdbId)
        
    }
})
myWatchlistEl.addEventListener('click', renderWatchlist)


async function searchMovie(e) {
    e.preventDefault()

    let res = await fetch(`http://www.omdbapi.com/?apikey=dfef5489&s=${searchInput.value}&type=movie`)
    let data = await res.json()

    if (data.Response === "False") {
        renderNoResults()
        return
    }

    // Create array of imdbIDs
    const movieIdArr = data.Search.map(movie => movie.imdbID)
    
    // Update each movie with extra properties: duration, genres, description...
    const movieArr = await Promise.all(movieIdArr.map(populateMovieObj))

    // Clear search input and background
    searchInput.value = ""
    mainContainer.style.background = "none"
    console.log(movieArr)

    // Render search results
    renderMovieList(movieArr)
    console.log("Now rendering search results...")
}

function renderNoResults() {
    // Found 0 search results
    mainContainer.innerHTML = "<p class='search-failed'>Unable to find what you're looking for. Please try another search.</p>"
    mainContainer.style.justifyContent = "center"
    mainContainer.style.background = "none"
}

function renderMovieList(movieArr) {
    console.log(movieArr)
    movieListHtml = ""

    movieArr.forEach(movie => {
        // Use placeholder if Poster is "N/A" or empty
        movie.Poster = movie.Poster === 'N/A' ? "" : movie.Poster

        movieListHtml += `
            <div class="movie-item" data-imdb-id="${movie.imdbID}">
                <div class="left">
                    <img src="${movie.Poster}" alt="Movie poster for ${movie.Title}">
                </div>
                <div class="right">
                    <div class="movie-header">
                        <h3>${movie.Title}</h3>
                        <img src="./images/star.png" class="star-icon">
                        <p class="movie-rating">${movie.imdbRating}</p>
                    </div>
                    <h4 class="movie-data">
                        <p>${movie.Runtime}<p>
                        <p>${movie.Genre}<p>
        `
        if (myWatchlistEl.textContent === "My Watchlist") {
            movieListHtml += `
                <div class="add-movie action-btn" data-imdb-id="${movie.imdbID}">
                <img src="./images/plus-icon.png" class="action-icon">
                <p>Watchlist</p>
            `
        } else {
            movieListHtml += `
                <div class="remove-movie action-btn" data-imdb-id="${movie.imdbID}">
                <img src="./images/subtract-icon.png" class="action-icon">
                <p>Remove</p>
            `
        }
        
        movieListHtml += `
                        </div>
                    </h4>
                    <p class="movie-description">${movie.Plot}</p>
                </div>
            </div>
            
        `
    })

    mainContainer.innerHTML = movieListHtml
}


function addToWatchlist(imdbId) {
    // Prevent duplicates
    if (!myWatchlist.includes(imdbId)) {
        // Add imdbID to local storage
        myWatchlist.push(imdbId)
        localStorage.setItem("myWatchlist", JSON.stringify(myWatchlist))
    }
}

function removeFromWatchlist(imdbId) {
    console.log(myWatchlist)
    console.log(imdbId)
    if (myWatchlist.includes(imdbId)) {
        // Delete array element
        delete myWatchlist[myWatchlist.indexOf(imdbId)]

        // Update local storage
        localStorage.setItem("myWatchlist", JSON.stringify(myWatchlist))

        // Delete the HTML element with imdbId
        document.querySelector(`[data-imdb-id="${imdbId}"]`).remove()
        console.log(`Deleted ${imdbId}`)
    }
}


async function populateMovieObj(imdbId) {
    // Fetch the movie details
    res = await fetch(`http://www.omdbapi.com/?apikey=dfef5489&i=${imdbId}&type=movie`)
    data = await res.json()
    console.log(data)

    // Add new properties to movie object
    return {
        imdbID: data.imdbID || "N/A",
        Poster: data.Poster || "N/A",
        Title: data.Title || "N/A",
        Genre: data.Genre || "N/A",
        Plot: data.Plot || "No description available",
        Runtime: data.Runtime || "N/A",
        imdbRating: data.imdbRating || "N/A"
    }
}


async function renderWatchlist() {
    // Hide search bar
    form.classList.toggle('hidden')

    // Read from local storage
    const movieIdArr = JSON.parse(localStorage.getItem("myWatchlist"))
    console.log(movieIdArr)
    const movieArr = await Promise.all(movieIdArr.map(populateMovieObj))

    console.log(movieArr)

    // Render HTML in the main container
    myWatchlistEl.textContent = "Search for movies"
    renderMovieList(movieArr)
}

function renderMain() {
    mainContainer.style.background = `url('./images/start-exploring.png')`
    mainContainer.style.backgroundRepeat = "no-repeat"
    mainContainer.style.backgroundPosition = "center"
    mainContainer.style.backgroundSize = "15rem"
}

renderMain()