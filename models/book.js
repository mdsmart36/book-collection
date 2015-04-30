
var mongoose = require('mongoose');
var bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  publisher: String,
  isbn: String,
  ddc: String, // Dewey Decimal category
  rating: Number,
  review: String,
  pubYear: Number,
  category: String,
  haveRead: Boolean,
  user: {
    type: String,
    required: true
  }
});

var Book = mongoose.model('Book', bookSchema);

module.exports = Book;
