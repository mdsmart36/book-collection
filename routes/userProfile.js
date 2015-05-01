var express = require('express');
var router = express.Router();
var UserController = require('../userController');
//var user = require('./userProfile');

/* GET user profile page. */
router.get('/', function(req, res, next) {
  res.render('userProfile', { 
  	username: UserController.getCurrentUser().username,
  	numberOfBooks:  5});
});

module.exports = router;
