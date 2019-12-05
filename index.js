const express = require('express'); 
const app = express(); 

app.use(express.json()); //idk what is going on here. parsing of data?

const movieGenres = [
    { id: 1, name: 'horror'}, 
    { id: 2, name: 'romance'}, 
    { id: 3, name: 'action'}, 
    { id: 4, name: 'sci-fi'}
]


app.get('/api/genres', (req, res) => {
    res.send(movieGenres); 
});

app.get('/api/genres/:id', (req, res) => {
    res.send(req.params.id); 
});

app.post('/api/genres', (req, res) => {
    
    const newMovie = {
        id: movieGenres.length + 1, 
        name: req.body.name, //what is going on here? why body?
        }; 
        movieGenres.push(newMovie); 
        res.send(newMovie); 
});

//use environment variable to access port we use
//
const port = process.env.PORT || 3000; 
app.listen(port, (req, res) => {
    console.log(`Listening on port ${ port }`);
}); 