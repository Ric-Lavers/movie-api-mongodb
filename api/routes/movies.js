const express = require('express');
const Movie = require('../models/movie.js')
const router = express.Router()
const Person =  require('../models/person')
const CountLog =  require('../models/countLog')
var colors = require('colors');

const logger = (req, res, next) => {
    CountLog.find()
    next();
}

router.get('/',[logger],(req,res) => {
    Movie.find()
    .populate('director')
    .then(movies => {
        // console.log(`movies are: ${movies}`)
        res.json({ movies });
    })
    .catch(error => res.json({error}))
})

;

router.post('/', (req,res)=> {
    Person.create(req.body.director,function (err, director) {
      req.body.director = director._id
      const id = director._id

      Movie.create(req.body)
      .then(movies => {
          res.status(201).json( movies ).end();
      })
    })
})

router.get('/:movieId', (req,res) => {
  Movie.findById(req.params.movieId)
  .then(movie => {
      res.json({ movie });
  })
  .catch(error => res.json({error}))
});
router.put('/:movieId', (req,res) => {
  console.log(req.body);
  Movie.findOneAndUpdate( {_id: req.params.movieId} ,
  req.body, { new:true })
  .then(movie => {
    console.log("then");
    res.json(movie)
  })
  .catch(error => {console.log("catch",error);res.json(error)})
});
router.delete('/:movieId', (req,res) => {
  Movie.remove({_id: req.params.movieId})
  .then(movie => {
    res.json({message: `successfully deleted movie with id:${req.params.movieId}`})
  })
  .catch(error => res.json(error))
});



module.exports = router;
