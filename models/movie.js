var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const movieSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  imagePath: String,
  description: String,
  title: String,
  url: String,
  message: {

    timeStart: Number,
    timeEnd: Number,
    text: String

  }

});

module.exports = mongoose.model('Movie', movieSchema);
