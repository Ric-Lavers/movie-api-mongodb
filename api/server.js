const express = require('express');
const bodyParser = require('body-parser');
// Create server
const server = express()
// Movies router/controllerw
const moviesRouter = require('./routes/movies');
const authMiddleware = require('./middleware/auth')

server.use(require('cookie-parser')());
//set to a JSON response
server.use(bodyParser.json()); //
server.use(bodyParser.urlencoded());// does this by the header.
server.use(require('express-session')(
  //screct is a crutial part of express
  {secret: 'secret', resave: false, saveUninitialized: false}
));
server.use(authMiddleware.initialize);

server.use('/movies', moviesRouter);
server.use('/auth', require('./routes/auth'));

server.get('/',(req,res) => {
    res.status(404).end();
});
// Set port
const port = 7000;
server.listen(port, () => {
    console.log(`Movies API server running on ${port}`);
});
