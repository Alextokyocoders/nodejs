require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

var usersRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var productsRoute = require('./routes/products.route');
var cartRoute = require('./routes/cart.route');
var paymentRoute = require('./routes/payment.route');

var authMiddleware = require('./middlewares/auth.middlewares');
var sessionMiddleware = require('./middlewares/session.middleware');

var port = 3000;

var app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);

app.use(express.static('public'));

//Routes
app.get('/',function(req, res){
  res.render('index', {
    name: 'Alex'
  });
});

app.use('/users', authMiddleware.requireAuth, usersRoute);
app.use('/auth', authRoute);
app.use('/products', productsRoute);
app.use('/cart', cartRoute);
app.use('/payment', authMiddleware.requireAuth, paymentRoute);

app.listen(port, function () {
  console.log('Server listening on port', + port);
});