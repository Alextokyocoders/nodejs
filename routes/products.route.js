var express = require('express');

var controller = require('../controllers/products.controller');

var router = express.Router();

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/:id', controller.get);  // view an product

module.exports = router;

