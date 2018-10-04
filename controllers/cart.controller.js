var db = require('../db');
var Product = require('../models/product.model');
var Session = require('../models/session.model');

module.exports.add = function(req, res, next) {
  var productId = req.params.id;
  var sessionId = req.signedCookies.sessionId;

  if (!sessionId) {
    res.redirect('/products');
    return;
  }

  // add product with productId
  Session.findByIdAndUpdate(sessionId, { $inc: { totalProduct: 1 } }, {new: true }, function(err, doc) {
    for (let i = 0; i < doc.cart.length; i++) {
      if (doc.cart[i].productId == productId) {
        doc.cart[i].quanity += 1;
      }
      return;
    }
    doc.cart.push({productId: productId, quanity: 1});
    doc.save();
  });


  res.redirect('/cart/checkout');
};

module.exports.checkout = async function(req, res, next) {
  var sessionId = req.signedCookies.sessionId;
  // // pass productInCart to Pug file
  var productInCart = [];
try {
  var session = await Session.findById(sessionId);
} catch (err) {
  console.log('has error!');
}
  // for (let item of session.cart) {
  //   var product = await Product.findById(item.productId);
  //   productInCart.push(product);
  // }

  res.render('cart/checkout', {
    productInCart: productInCart
  });
}