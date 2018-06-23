var mongoose = require("mongoose");
var bookSchema = new mongoose.Schema({
  books: [
    {
      title: String,
      price: String
    }
  ]
});

let Book = mongoose.model("Book", bookSchema);

module.exports = Book;
