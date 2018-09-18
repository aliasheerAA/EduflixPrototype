var express = require('express');
var router = express.Router();
var Movie = require('../models/movie');
var mongoose = require('mongoose');

/* GET home page. */
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

router.get('/start-learning/:movieUrl', function (req, res, next) {

  var url = req.params.movieUrl;
  console.log(url);

  res.render('learn2', {link: url});


});

router.get('/test2', function (req, res, next) {
  res.send('test');
});

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
