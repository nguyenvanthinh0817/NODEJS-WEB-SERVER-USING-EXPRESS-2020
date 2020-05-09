var express = require('express');


var bodyParser = require('body-parser');

var userRoutes = require('./routes/user.route')

var db = require('./db');
// Set some defaults (required if your JSON file is empty)


var port = 3000;

var app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded



app.use('/users', userRoutes);

app.get('/', (req, res)=>{
	res.render('index');
});






app.listen(port, ()=>{console.log('server listen on port ' + port)});