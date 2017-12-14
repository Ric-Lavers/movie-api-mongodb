const passport = require('passport')
const User = require('../models/user');
const JWT = require('jsonwebtoken');
const PassportJWT = require('passport-JWT');
// const ExtractJwt = PassportJWT.ExtractJwt;

//ADD COOKIE MIDDDLEWARE FOR cookie
//https://github.com/peerism/peerai/compare/feat/mix-jwt-cookies

passport.use(User.createStrategy());
/* this is for Cookiess
passport.serializeUser(function (user, done) {
  // this is store the userId instead of the whole user to provide authenication
    done(null, user.id);
});
passport.deserializeUser(function (user, done) {
    // this will close the authorization session by finding the
    User.findById(user.id, function (err, user) {
        done(err, user);
    });
});
*/

passport.use(new PassportJWT.Strategy(
  {//bearer is a computer term foudn in the http header or OAuth
    jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'topsecret',
    algorithms: ['HS256']
  },
  (payload, done) => {
    User.findById(payload.sub)
    .then((user) => {
      if (user) {
        done(null, user)
      }else{
        done(null, false)
      }
    })
    .catch( (error) => {
      done(error, false)
    });
  }
));
function checkJWT() {
  ExtractJwt.fromAuthHeader()
}

function signJWTForUser(req, res) {
  const user = req.user
  // user.id = User.find({email:user.email})
  const token = JWT.sign({
    email:user.email
  },
  'topsecret',
  {
    algorithm:'HS256',
    expiresIn: '7 days',
    subject: user._id.toString()
  });
  console.log("JWT",token);
  res.body = token;
  res.json({ token });
}

function register(req,res,next) {
  const user =  new User({
    // attributes coming in form the wire
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  })
  console.log('user create is: ', user);
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

function signIn(req,res,next) {
  const theUser = User.find({email:req.email}, function (err, user) {
        done(err, user);
    });
  req.user._id = theUser._id;
  next()
}

module.exports = {
  initialize: [passport.initialize(), passport.session()],
  register,
  signIn: passport.authenticate('local' ,{session:false} ),
  signJWTForUser,
  requireJWT: passport.authenticate('jwt', {session:false})
}
