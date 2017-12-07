const express = require('express');
const Movie = require('../models/movie.js')
const router = express.Router()
const Person =  require('../models/person')
const CountLog =  require('../models/countLog')

const logger = (req, res, next) => {
    console.log("MIDDLE WARE");
    CountLog.find()
    next();
}
//
/*
function logger (req, res, next) {
        console.log("this is a log ")
        next()
    };
*/
router.get('/',[logger],(req,res) => {
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




// movies API
// function getAllMovies() {
//   console.log("Mock API processing request data response");
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(Object.assign([], movies));
//     }, 3000);
//   });
// }
//
// const middleware = {
//     getDataFromMockAPI: function(req, res, next){
//
//         console.log("getDataFromMockAPI running");
//         // FIXME - Modify the res.body
//
//         next();
//     },
//     logger: function(req, res, next){
//        console.log(new Date(), req.method, req.originalUrl, req.body);
//        next();
//     }
// }

// server.get('/', [
//               middleware.getDataFromMockAPI,
//               middleware.logger
//             ], function(req, res) {
//     res.status(200).json(res.body);
// });


module.exports = router;
