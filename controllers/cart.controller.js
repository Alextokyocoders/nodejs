var db = require('../db');

module.exports.add = function(req, res, next) {
  var productId = req.params.id;
  var sessionId = req.signedCookies.sessionId;

  if (!sessionId) {
    res.redirect('/products');
    return;
  }

  var count = db
    .get('sessions')
    .find({ id: sessionId })
    .get('cart.' + productId, 0)
    .value();

  db.get('sessions')
    .find({ id: sessionId })
    .set('cart.' + productId, count + 1)
    .write();

  res.redirect('/cart/checkout');
};

module.exports.checkout = function(req, res, next) {
  var sessionId = req.signedCookies.sessionId;

  var cart = db
  .get('sessions')
  .find({ id: sessionId })
  .get('cart', 0)
  .value();

  var productInCart = [];

  var arrIdOfProduct = Object.keys(cart);

  for (let idProduct of arrIdOfProduct) {
    var product = db.get('products').find({ id: idProduct }).value();
    productInCart.push(product);
  }

  res.render('cart/checkout', {
    productInCart: productInCart
  });
}