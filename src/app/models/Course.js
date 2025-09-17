const { default: mongoose } = require('mongoose');
const mongodb = require('mongoose');
const Schema = mongoose.Schema;


const Course = new Schema({
  name: {type: String, maxLenght: 255 },
  desciption: {type: String, maxLenght: 600},
  image: {type: String, maxLenght: 255},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Course',Course);