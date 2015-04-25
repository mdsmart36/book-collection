var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var todo = require('./todo');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('edit', { title: "Edit your To-Do Item" });
});

router.put('/', function(req, res) {
  console.log("Hello from router.put");
  console.log(req.body);
  console.log("req.body");

  var found = Todo.find({ _id: req.body.todo_id });
  console.log(found);

  // render the edit page with defaults in the form
  res.render('edit', { title: "Edit your To-Do Item" });

      // .remove(function (err, item) {
      //   if(err) {
      //     res.render("error", {
      //       error: {
      //         status: 500,
      //         stack: JSON.stringify(err.errors)
      //       },
      //       message: "You failed!"
      //     })
      //     console.log(err);
      //   } else {
      //     console.log("Item has been deleted.");
      //     //res.send('Success!');
      //   }
      // });
});



module.exports = router;
