
function log(req, res, next) {
    console.log('Logging...')
    next(); //passes control to the next middleware in the pipeline
}; 

module.exports = log; 