var Product = require('../models/product.model');

module.exports.index = async function(req, res){
  var page = parseInt(req.query.page) || 1; // ?=page
  var perPage = 8; // 
  var drop = (page - 1) * perPage;

  // var start = (page - 1) * perPage;
  // var end = page * perPage;
  // var totalProducts = db.get('products').value();
  // var productsPerPage = db.get('products').drop(drop).take(perPage).value();
  
  // res.render('products/index', {
    // cach 1:
    // products: db.get('products').value().slice(start, end)
    // cach 2:
  //   products: productsPerPage,
  //   page: page,
  //   total: totalProducts.length
  // });

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

  var matchedProducts = await Product.find();
  matchedProducts = matchedProducts.filter(function (product) {
    return product.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
// Danh so trang moi page
  var page = parseInt(req.query.page) || 1; // n
  var perPage = 8; // x


  var start = (page - 1) * perPage;
  var end = page * perPage;
//link goc
  var baseUrl = '?q=' + q + '\&';
// in ra cac phan tu
  res.render('products/index', {
    products: matchedProducts.slice(start, end),
    keyWord: q,
    page: page,
    baseUrl: baseUrl,
    total: matchedProducts.length
  });
};

module.exports.get = async function(req, res) {
  var id = req.params.id;

  var product = await Product.findById(id);

  res.render('products/view', {
    product: product
  });

  app.locals.localProductId = id;
  // res.locals.localProductId = id;
};