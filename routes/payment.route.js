var express = require('express');

var controller = require('../controllers/payment.controller');

var router = express.Router();

router.get('/', controller.payment);

module.exports = router;