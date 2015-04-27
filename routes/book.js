var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bookCollection');

var db = mongoose.connection;

// check for errors on database connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("connected to book database");
});

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
  haveRead: Boolean
});

var Book = mongoose.model('Book', bookSchema);

// find book by id in order to edit

router.get('/:id', function (req, res) {
  
  Book.find({ _id: req.params.id }, function (err, item) {
    console.log("looking for book in database");
    console.log(item[0]);
    var editItem = item[0];
    if (err) {
      console.log(err);
    }
    else {
      res.render('index', { 
        title: "Edit a Book in Your Book Collection",
        item_props: editItem
      });
    }
  });
});


// GET book listing page
router.get('/', function(req, res, next) {
  // return all matching documents sorted is ascending order by priority  
  var sortKey = 'title';

  return Book.find().sort(sortKey).exec(function (err, books) {
    if(!err) {
      res.render('book', {
        greeting: "Your current Book Collection",
        books: books
      });
    } else {
      return console.error(err);
    }
  });
});

router.delete('/', function(req, res) {
  //console.log(req.body);

  Book.find({ _id: req.body.book_id })
      .remove(function (err, item) {
        if(err) {
          res.render("error", {
            error: {
              status: 500,
              stack: JSON.stringify(err.errors)
            },
            message: "You failed!"
          })
          console.log(err);
        } else {
          //console.log("Item has been deleted.");
          }
      });
});

// POST form

router.post('/', function(req, res) {

  if (req.body._id) { // item already had an _id, so it needs to be updated
    
    Book.findOne({ _id: req.body._id}, function(err, item) {
      if (err) {
        console.log(err);
      } else {
        // once it is found, update it
        item.title = req.body.title;
        item.author = req.body.author;
        item.publisher = req.body.publisher;
        item.isbn = req.body.isbn;
        item.ddc = req.body.ddc;
        item.rating = req.body.rating;
        item.review = req.body.review;
        item.pubYear = req.body.pubYear;
        item.category = req.body.category;
        // CHECKBOX VALUES sent through a form ARE EITHER 'on' or 'undefined'
        
        item.haveRead = (req.body.haveRead) ? true : false;

        item.save(function(err, updateItem) {
          if (err) {
            console.log(err)
          } else {
            res.redirect('book');
          }
        });
      }
    });
  }
  else {
    // do initial save
    console.log(req.body);

    new Book({
      title: req.body.title,
      author: req.body.author,
      publisher: req.body.publisher,
      isbn: req.body.isbn,
      ddc: req.body.ddc,
      rating: req.body.rating,
      review: req.body.review,
      pubYear: req.body.pubYear,
      category: req.body.category,
      haveRead: (req.body.haveRead == 'on') ? true : false
    }).save(function (err, item) {
      if(err) {
        res.render("error", {
          error: {
            status: 500,
            stack: JSON.stringify(err.errors)
          },
          message: "You failed!"
        })
        console.log(err);
      } else {
        console.log("book saved");
        console.log(req.body.review);
        res.redirect('book');
      }
    });

  }
  

});

module.exports = router;