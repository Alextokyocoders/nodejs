var mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
  totalProduct: Number,
  cart: [
    {
      productId: String,
      quanity: Number
    }
  ]
});

var Session = mongoose.model('Session', sessionSchema, 'sessions');

module.exports = Session;