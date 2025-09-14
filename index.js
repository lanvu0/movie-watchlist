const mainContainer = document.querySelector('main')


fetch('http://www.omdbapi.com/?i=tt3896198&apikey=dfef5489')
    .then(res => res.json())
    .then(data => console.log(data))



function renderMain() {
    mainContainer.style.background = `url('start-exploring.png')`
    mainContainer.style.backgroundRepeat = "no-repeat"
    mainContainer.style.backgroundPosition = "center"
    mainContainer.style.backgroundSize = "15rem"
}

renderMain()