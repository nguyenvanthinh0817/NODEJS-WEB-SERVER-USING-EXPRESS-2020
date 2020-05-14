require('dotenv').config();

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var csurf = require('csurf')

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});


var userRoutes = require('./routes/user.route');
var authRoutes = require('./routes/auth.route');
var productRoutes = require('./routes/product.route');
var cartRoutes = require('./routes/cart.route');


var authMiddlewave = require('./middlewaves/auth.middlewave');
var sessionMiddlewave = require('./middlewaves/session.middlewave');

var port = 3000;

var app = express();

app.set('view engine', 'pug');
app.set('views', './views');



app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddlewave);
app.use(express.static('public'));
// app.use(csurf({cookie: true}));

app.use('/users', authMiddlewave.requireAuth, userRoutes);
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

app.get('/', (req, res)=>{
	res.render('index');
});




app.listen(port, ()=>{console.log('server listen on port ' + port)});