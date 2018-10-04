var mongoose = require('mongoose');


var productSchema = new mongoose.Schema({
  productId: String,
  quanity: Number
})

var sessionSchema = new mongoose.Schema({
  totalProduct: Number,
  cart: [productSchema],
  product: productSchema
});

var Session = mongoose.model('Session', sessionSchema, 'sessions');

module.exports = Session;