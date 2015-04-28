var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, required: true, default: ''},
    password: {type: String, required: true, default: ''}
});

var User = mongoose.model('User', userSchema);

module.exports = User;
