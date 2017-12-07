const express = require('express');
const bodyParser = require('body-parser');

// Create server
const server = express()

// Movies router/controllerw
const moviesRouter = require('./routes/movies');

//set to a JSON response
server.use(bodyParser.json()); //
server.use(bodyParser.urlencoded());// does this by the header.

server.use('/movies', moviesRouter);

server.get('/',(req,res) => {
    res.status(404).end();
});
// Set port
const port = 7000;
server.listen(port, () => {
    console.log(`Movies API server running on ${port}`);
});


/*

*/
