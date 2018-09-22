//import expree library
var express = require('express');
//import router library
var router = express.Router();
//imports the schema for inserting movies
var Movie = require('../models/movie');
//import mongoose library
var mongoose = require('mongoose');

// route to home page.
router.get('/', function (req, res, next) {
  Movie.find(function (err, docs) {
    var movieChunks = [];
    var chunkSize = 3;
    for (var i = 0; i < docs.length; i += chunkSize) {
      movieChunks.push(docs.slice(i, i + chunkSize));
    }
    res.render('movieList/index', { title: 'Movies', movies: movieChunks });
  });
});

// route to learn page
router.get('/start-learning/:movieID', function (req, res, next) {

  var id = req.params.movieID;
  var movieContents;
// search database based on id
  Movie.findById(id)
  .exec()
  .then(doc=>{
    if(doc){
    movieContents = doc;
// render the learn page
    res.render('learn', {movie: movieContents});
    }
    else {
      res.status(404).json({
        message: 'no valid movie id entered'
      });
    }
  })
  .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// route to handle post pages to the database.
router.post('/movies', (req, res, next) => {
    const movie = new Movie({
      _id: new mongoose.Types.ObjectId(),
      imagePath: req.body.imagePath,
      description: req.body.description,
      title: req.body.title,
      url: req.body.url,
      message:{
        timeStart: req.body.message.timeStart ,
        timeEnd: req.body.message.timeEnd,
        text: req.body.message.text
      }
    });
    // save to database
      movie.save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          createdmovies: result
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
});

module.exports = router;
