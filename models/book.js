let mongoose = require('mongoose');

// Book Schema
let bookSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  author:{
    type: String,
    required: true
  },
  amount:{
    type: Number,
    required: true
  }
});

let Book = module.exports = mongoose.model('Book', bookSchema);
