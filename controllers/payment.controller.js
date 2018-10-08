var md5 = require('md5');

var db = require('../db');

module.exports.payment = function(req, res){
  res.render('payment/payment');
};
