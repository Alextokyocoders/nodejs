var shortid = require('shortid');

var db = require('../db');

module.exports = function(req, res, next) {
  var sessionId = req.signedCookies.sessionId;
  if (!sessionId) {
    var sessionId = shortid.generate();
    res.cookie('sessionId', sessionId, {
      signed: true      
    });

    db.get('sessions').push({
      id: sessionId
    }).write();
  }


  var cart = db
  .get('sessions')
  .find({ id: sessionId })
  .get('cart',0)
  .value();

  var count = cart ? Object.values(cart).reduce((a, b) => a + b) : 0;

  res.locals.countItem = count;

  next();
};