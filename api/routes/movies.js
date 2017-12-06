const express = require('express');
const Movie = require('../models/movie.js')
const router = express.Router()
const Person =  require('../models/person')

router.get('/', (req,res) => {
    Movie.find()
    .populate('director')
    .then(movies => {
        // console.log(`movies are: ${movies}`)
        res.json({ movies });
    })
    .catch(error => res.json({error}))
});

router.post('/', (req,res)=> {
    // Movie.create({title: "reed", year:2022, lead:'tessax'})
    Movie.create(req.body)
    .then(movies => {
        console.log({ movies })
        res.json({ movies })
    })
})



module.exports = router;
