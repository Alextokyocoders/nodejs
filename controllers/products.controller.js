var Product = require('../models/product.model');

module.exports.index = async function(req, res){
  var page = parseInt(req.query.page) || 1; // ?=page
  var perPage = 8; // 
  var drop = (page - 1) * perPage;

  var products = await Product.find();
  var numProducts = await Product.estimatedDocumentCount();
  var productsPerPage = await Product.find(null, null, { skip: drop }).limit(perPage);

  res.render('products/index', {
    products: productsPerPage,
    page: page,
    total: numProducts
  });
};

module.exports.search = async function (req, res) {
  // Loc cac phan tu co tu khoa q
  var q = req.query.q;
  var page = parseInt(req.query.page) || 1; // ?=page
  var perPage = 8; // 
  var drop = (page - 1) * perPage;

  var matchedProducts = await Product.find({ title: new RegExp(q, 'i') }, null, { skip: drop }).limit(perPage);
  var total = await Product.find({ title: new RegExp(q, 'i') });
//link goc
  var baseUrl = '?q=' + q + '\&';
// in ra cac phan tu
  res.render('products/index', {
    products: matchedProducts,
    keyWord: q,
    page: page,
    baseUrl: baseUrl,
    total: total.length
  });
};

module.exports.get = async function(req, res) {
  var id = req.params.id;
  var product = await Product.findById(id);

  res.render('products/view', {
    product: product
  });
  
  app.locals.localProductId = id;
};