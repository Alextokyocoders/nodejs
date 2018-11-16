var md5 = require('md5');

var Product = require('../models/product.model');
var Session = require('../models/session.model');

module.exports.payment = async function(req, res){

  var sessionId = req.signedCookies.sessionId;
  var session = await Session.findById(sessionId);

  res.render('payment/payment', {
    productInCart: session.cart,
  });
};

module.exports.delivery = function(req, res) {

  if (!req.signedCookies.deliveryId) {
    res.cookie('deliveryId', 1, {
      signed: true
    });
  }

  res.render('payment/delivery');
  res.redirect(req.get('referer'));
};