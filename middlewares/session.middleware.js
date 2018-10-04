var Session = require('../models/session.model');

var db = require('../db');

module.exports = function(req, res, next) {
  var sessionId = req.signedCookies.sessionId;
  
  if (!sessionId) {

    var session = new Session();
    
    session.save();
    // var sessionId  = session._id;

    // res.cookie('sessionId', sessionId, {
    //   signed: true
    // });
  }

  // tinh toan tong gia tri san pham
  Session.findById(sessionId, function (err, doc) {
    res.locals.countItem = doc.totalProduct ? doc.totalProduct : 0;
  });

  next();
};