const mainContainer = document.querySelector('main')
const form = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')
const myWatchlist = document.getElementById('my-watchlist')


form.addEventListener('submit', searchMovie)
myWatchlist.addEventListener('click', renderWatchlist)



async function searchMovie(e) {
    e.preventDefault()

    let res = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=dfef5489&s=${searchInput.value}&type=movie`)
    let data = await res.json()
    if (data.Response === "False") {
        renderNoResults()
        return
    }
    
    const movieArr = data.Search

    // Update each movie with extra properties: duration, genres, description...
    movieArr.forEach(async function(movie){
        res = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=dfef5489&t=${movie.Title}&type=movie`)
        data = await res.json()
        
        movie.Genre = data.Genre
        movie.Plot = data.Plot
        movie.Runtime = data.Runtime
        movie.imdbRating = data.imdbRating        
        
    });

    await Promise.all(movieArr.map(async movie => {
        // Fetch the movie details
        res = await fetch(`http://www.omdbapi.com/?apikey=dfef5489&i=${movie.imdbID}&type=movie`)
        data = await res.json()
        console.log(data)

        // Add new properties to movie object
        movie.Genre = data.Genre || "N/A"
        movie.Plot = data.Plot || "No description available"
        movie.Runtime = data.Runtime || "N/A"
        movie.imdbRating = data.imdbRating || "N/A"
    }))

    // Clear search input and background
    searchInput.value = ""
    mainContainer.style.background = "none"
    console.log(movieArr)

    // Render search results
    renderSearchResults(movieArr)
    console.log("Now rendering search results...")
    
}

function renderNoResults() {
    // Found 0 search results
    mainContainer.innerHTML = "<p class='search-failed'>Unable to find what you're looking for. Please try another search.</p>"
    mainContainer.style.justifyContent = "center"
    mainContainer.style.background = "none"
}

function renderSearchResults(movieArr) {
    console.log(movieArr)
    searchResultsHtml = ""

    movieArr.forEach(movie => {
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
                        <div class="watchlist">
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

function renderMain() {
    mainContainer.style.background = `url('./images/start-exploring.png')`
    mainContainer.style.backgroundRepeat = "no-repeat"
    mainContainer.style.backgroundPosition = "center"
    mainContainer.style.backgroundSize = "15rem"
}

renderMain()