


fetch('http://www.omdbapi.com/?i=tt3896198&apikey=dfef5489')
    .then(res => res.json())
    .then(data => console.log(data))