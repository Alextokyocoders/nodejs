require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var usersRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var reviewsRoute = require('./routes/reviews.route');

var authMiddleware = require('./middlewares/auth.middlewares');

var port = 3000;

var app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(express.static('public'));

//Routes
app.get('/',function(req, res){
  res.render('index', {
    name: 'Alex'
  });
});

app.use('/users', authMiddleware.requireAuth, usersRoute);
app.use('/auth', authRoute);
app.use('/reviews', reviewsRoute);

app.listen(port, function () {
  console.log('Server listening on port', + port);
});
