const express = require('express');
const authMiddleware = require('../middleware/auth.js');

const router =  new express.Router();

// Register new user
router.post('/register',
// first regester
  authMiddleware.register,
// this returnes user details.
  (req,res,next) => {
// provide the response
    res.json({user: req.user})
  }
);

// Sign in user
router.post('/signin',
  // middleware that allows us to sign in
  authMiddleware.signIn,
  (req,res) => {
    res.json({user:req.user})
  }
)

module.exports =  router;
