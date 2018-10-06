var db = require('../db');
var Product = require('../models/product.model');
var Session = require('../models/session.model');

module.exports.add = async function(req, res, next) {
  var productId = req.params.id;
  var sessionId = req.signedCookies.sessionId;

  if (!sessionId) {
    res.redirect('/products');
    return;
  }

  var product = await Product.findById(productId);

  // add product with productId
  Session.findByIdAndUpdate(sessionId, { $inc: { totalProduct: 1 } }, {new: true }, function(err, doc) {
    for (let i = 0; i < doc.cart.length; i++) {
      if (doc.cart[i].productId == productId) {
        doc.cart[i].quanity += 1;
        doc.save();
        return;
      }
    }

    doc.cart.push({
      productId: productId,
      quanity: 1,
      name: product.name,
      image: product.image,
      description: product.description,
      title: product.title,
      price: product.price
    });

    doc.save();
  });

  res.redirect('/cart/checkout');
};

module.exports.checkout = async function(req, res, next) {
  var sessionId = req.signedCookies.sessionId;
  var session = await Session.findById(sessionId);

  res.render('cart/checkout', {
    productInCart: session.cart,
  });
};

module.exports.updateSelectedQuanity = function(req, res) {
  var sessionId = req.signedCookies.sessionId;

  var productId = req.body.productId;
  var quanity = req.body.quanity;

  Session.findById(sessionId, function(err, doc) {
    for (let i = 0; i < doc.cart.length; i++) {
      if (doc.cart[i].productId == productId) {
        doc.totalProduct += (req.body.quanity - doc.cart[i].quanity);
        doc.cart[i].quanity = req.body.quanity;
        doc.save();
      }
    }
  })

};

module.exports.delete = async function(req, res) {
  var sessionId = req.signedCookies.sessionId;
  var productId = req.body.productId;
  var doc = await Session.findByIdAndUpdate(sessionId, {$pull: {'cart' : {'productId': productId}}});
  console.log(doc);
  console.log(productId);
}