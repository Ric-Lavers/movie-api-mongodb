const passport = require('passport')
const User = require('../models/user');


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

function register(req,res,next) {
  console.log("in authMiddleware.register");
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
  signIn: passport.authenticate('local', {session: true} )
}
