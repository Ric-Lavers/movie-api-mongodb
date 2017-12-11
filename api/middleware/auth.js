const passport = require('passport')
const User = require('../models/user');
console.log(Object.getOwnPropertyNames(passport));
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
