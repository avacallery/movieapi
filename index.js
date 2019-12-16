const debug = require('debug')('app:startup');
const config = require('config'); 
const morgan = require('morgan'); 
const helmet = require('helmet'); //how do we know if a dependent is a function? Are all middlewares functions?
const Joi = require('joi');
const logger = require('./middleware/logger');
const express = require('express'); //returns a function 
const app = express(); //call the function (which returns the object express()) and store it in a const app 
const genres = require('./routes/genres'); 
const home = require('./routes/home');


app.set('view engine', 'pug'); 
app.set('views', './views'); 

//how to determine what your environment variable
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled...');
    }
    //uses process.env.NODE_ENV to get environment variable 
    //app:development is default


//MIDDLEWARE
app.use(express.json()); //in order for req.body.name to work, we must enable the parsing of a json object in the body of the request. if there's a json object in the body of the request it will parse into a json object and set req.body property 
//REQUEST PROCESSING PIPELINE 
//request => ( json() ) => ( route() ) => response to client
app.use(express.urlencoded( { extended: true})); 
app.use(express.static('public'));
app.use(helmet()); 
app.use(morgan('tiny')); //development/production environment? 
app.use(logger);
app.use('/api/genres', genres); 
app.use('/', home); 

//Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host')); //config object uses the get method, for the argument we use "name" as the configuration property
// console.log('Mail Server: ' + config.get('mail.host')); 

//use environment variable to access  port we use
//
const port = process.env.PORT || 3000; 
app.listen(port, (req, res) => {
    console.log(`Listening on port ${ port }`);
}); 