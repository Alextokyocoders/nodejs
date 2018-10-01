var mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  avatar: String,
  phone: String,
});

var Session = mongoose.model('Session', sessionSchema, 'sessions');

module.exports = Session;