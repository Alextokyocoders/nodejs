var Session = require('../models/session.model');

module.exports = async function(req, res, next) {
  var sessionId = req.signedCookies.sessionId;
  
  if (!sessionId) {

    var session = new Session;
    session.save();
    var sessionId = session._id;

    res.cookie('sessionId', sessionId, {
      signed: true
    });
  }

  var session = await Session.findById(sessionId);
  res.locals.countItem = session.totalProduct ? session.totalProduct : 0;
  res.locals.delivery = req.signedCookies.deliveryId ? req.signedCookies.deliveryId : 0;
  // res.locals.user = user;
  next();
};