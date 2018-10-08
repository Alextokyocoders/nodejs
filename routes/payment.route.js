var express = require('express');

var controller = require('../controllers/payment.controller');

var router = express.Router();

router.get('/', controller.payment);

router.get('/delivery', controller.delivery);

module.exports = router;