const passport = require('passport')
const User = require('../models/user');
const JWT = require('jsonwebtoken');


//ADD COOKIE MIDDDLEWARE FOR cookie
//https://github.com/peerism/peerai/compare/feat/mix-jwt-cookies

passport.use(User.createStrategy());
passport.serializeUser(function (user, done) {
  // this is store the userId instead of the whole user to provide authenication
    done(null, user.id);
});
passport.deserializeUser(function (user, done) {
    // this will close the authorization session by finding the
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

function signJWTForUser(req, res) {
  // creates a JWT
  const user = req.user;
  const token = JWT.sign({
    email:user.email
  },
  'topsecret',
  {
    algorithm:'HS256',
    expiresIn: '7 days',
    subject: user.id.toString()
  });
  console.log(token);
  res.json({ token });
}

function register(req,res,next) {
  const user =  new User({
    // attributes coming in form the wire
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  })
  User.register(user, req.body.password, (error, user) => {
    if (error) {
      next(error);
      return;
    }
    // Store user in req object itself so that it is acessaible by the following authMiddleware
    req.user = user;
    next();
  })
}



module.exports = {
  initialize: [passport.initialize(), passport.session()],
  register,
  signIn: passport.authenticate('local', {session: true} ),
  signJWTForUser
}
