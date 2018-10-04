var mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
  totalProduct: Number,
  cart: [
    {
      productId: String,
      name: String,
      image: String,
      description: String,
      title: String,
      price: Number,
      quanity: Number
    }
  ]
});

var Session = mongoose.model('Session', sessionSchema, 'sessions');

module.exports = Session;