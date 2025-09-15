const mainContainer = document.querySelector('main')
const form = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')
const myWatchlistEl = document.getElementById('my-watchlist')
const myWatchlist = []

form.addEventListener('submit', searchMovie)
mainContainer.addEventListener('click', function(e) {
    if (e.target.parentElement.classList.contains('watchlist')) {
        console.log("Add to watchlist button clicked")
        addToWatchlist(e.target.parentElement.dataset.imdbId)
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
    searchResultsHtml = ""

    movieArr.forEach(movie => {
        // Use placeholder if Poster is "N/A" or empty
        movie.Poster = movie.Poster === 'N/A' ? "" : movie.Poster

        searchResultsHtml += `
            <div class="movie-item">
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
                        <div class="watchlist" data-imdb-id="${movie.imdbID}">
                            <img src="./images/plus-icon.png" class="plus-icon">
                            <p>Watchlist</p>
                        </div>
                    </h4>
                    <p class="movie-description">${movie.Plot}</p>
                </div>
            </div>
            
        `
    })

    mainContainer.innerHTML = searchResultsHtml
}


function addToWatchlist(imdbId) {
    // Prevent duplicates
    if (!myWatchlist.includes(imdbId)) {
        // Add imdbID to local storage
        myWatchlist.push(imdbId)
        localStorage.setItem("myWatchlist", JSON.stringify(myWatchlist))
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
    // Read from local storage
    const movieIdArr = JSON.parse(localStorage.getItem("myWatchlist"))
    console.log(movieIdArr)
    const movieArr = await Promise.all(movieIdArr.map(populateMovieObj))

    console.log(movieArr)

    // Render HTML in the main container
    renderMovieList(movieArr)
    myWatchlistEl.textContent = "Search for movies"
}

function renderMain() {
    mainContainer.style.background = `url('./images/start-exploring.png')`
    mainContainer.style.backgroundRepeat = "no-repeat"
    mainContainer.style.backgroundPosition = "center"
    mainContainer.style.backgroundSize = "15rem"
}

renderMain()