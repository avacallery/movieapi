const express = require('express'); //returns a function 
const app = express(); //call the function (which returns the object express()) and store it in a const app 

//MIDDLEWARE
app.use(express.json()); //in order for req.body.name to work, we must enable the parsing of a json object in the body of the request


const movieGenres = [
    { id: 1, name: 'horror'}, 
    { id: 2, name: 'romance'}, 
    { id: 3, name: 'action'}, 
    { id: 4, name: 'sci-fi'}
];

//HTTP methods get/put/post/delete 
app.get('/', (req, res) => {
    res.send('We are on the home of the movie api')
});

//get list of genres
app.get('/api/genres', (req, res) => {
    res.send(movieGenres); 
});

//create a new genre
app.post('/api/genres', (req, res) => {
    
    const newMovie = {
        id: movieGenres.length + 1, 
        name: req.body.name, //we need to read this from the body of the request (assuming there is an object in the req body with a name property) 
        }; 
        movieGenres.push(newMovie); 
        res.send(newMovie); //when we post an object to the server, or when the server creates a new object, you return that object in the body of the response. Client should know the new id of this object 
});

//get a single genre using id parameter 
app.get('/api/genres/:id', (req, res) => {
    const findGenre = movieGenres.find(c => c.id === 
        parseInt(req.params.id)); //this req will return a string, so we must parse into an integer
    if (!findGenre) res.status(404).send('The genre with the given ID was not found in our collection.') //404 object not found
    res.send(findGenre) //if genre is found, we use this method to return the genre back to the user 
});

//use environment variable to access port we use
//
const port = process.env.PORT || 3000; 
app.listen(port, (req, res) => {
    console.log(`Listening on port ${ port }`);
}); 