const express = require('express'); 
const router = express.Router(); 

const movieGenres = [
    { id: 1, name: 'horror'}, 
    { id: 2, name: 'romance'}, 
    { id: 3, name: 'action'}, 
    { id: 4, name: 'sci-fi'}
];

//HTTP methods get/put/post/delete 
router.get('/', (req, res) => {
    res.send('We are on the home of the movie api')
});

//get list of genres
router.get('/', (req, res) => {
    res.send(movieGenres); 
});

//create a new genre
router.post('/', (req, res) => {
    const { error } = validateGenre(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    
    const genre = {
        id: movieGenres.length + 1, 
        name: req.body.name, //we need to read this from the body of the request (assuming there is an object in the req body with a name property) 
        }; 
        movieGenres.push(genre); 
        res.send(genre); //when we post an object to the server, or when the server creates a new object, you return that object in the body of the response. Client should know the new id of this object 
});

//get a single genre using id parameter 
router.get('/:id', (req, res) => {
    const genre = movieGenres.find(c => c.id === 
        parseInt(req.params.id)); //this req will return a string, so we must parse into an integer
    if (!genre) return res.status(404).send('The genre with the given ID was not found in our collection.'); //404 object not found
    res.send(genre) //if genre is found, we use this method to return the genre back to the user 
});

//update a genre
router.put('/:id', (req, res) => {
    const genre = movieGenres.find(c => c.id === 
        parseInt(req.params.id)); 
    if (!genre) return res.status(404).send('The genre with the given ID was not found in our collection.') 
        
    const { error } = validateGenre(req.body); 
    if (error) return res.status(400).send(error.details[0].message)
     
    genre.name = req.body.name; 
    res.send(genre);
});

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(genre, schema); 
};

router.delete('/:id', (req, res) => {
    const genre = movieGenres.find(c => c.id === 
        parseInt(req.params.id)); 
    if (!genre) return res.status(404).send('The genre with the given ID was not found in our collection.') 

    const index = movieGenres.indexOf(genre);
    movieGenres.splice(index, 1); 
    
    res.send(genre);
});

module.exports = router; 