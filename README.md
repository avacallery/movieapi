Movie genre api

//npm init
//npm i express 
    Express - a framework used for building web applications ontop of Node 
//create index.js 
//create express application by using express() function 
    var express = require('express');
    var app = express(); 
//Specify your routes / route handlers using HTTP requests (req, res) 
    //The req object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on. The object is always referred to as req (and the HTTP response is res) but its actual name is determined by the parameters to the callback function in which you're working. 
//create Middleware
    //Middleware functions are functions that have access to the request object (req), the response object (res), and the next function in the application’s request-response cycle. 
    //The next function is a function in the Express router which, when invoked, executes the middleware succeeding the current middleware.
//Use environment variable PORT to listen to the app using process.env.PORT
    //const port = process.env.PORT || 3000; 
    app.listen(port, () => { console.log('Listening on port ${port}')});
