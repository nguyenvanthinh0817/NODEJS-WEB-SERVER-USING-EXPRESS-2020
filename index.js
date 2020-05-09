var express = require('express');
var app = express();
var shortid = require('shortid');
var bodyParser = require('body-parser');
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');

var db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: []})
  .write();

var port = 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded





app.get('/', (req, res)=>{
	res.render('index');
});




app.get('/users',function(req, res){
	res.render('users/index',{
		users: db.get('users').value()
	});
});



app.get('/users/search',(req, res)=>{
	var q = req.query.q;
	var matchdUsers = db.get('users').value().filter((user)=>{
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	res.render('users/index',{
		users:matchdUsers
	});
});

app.get('/users/create',(req, res)=>{
	res.render('users/create');
});

app.post('/users/create',(req, res)=>{
	req.body.id = shortid.generate();
	db.get('users').push(req.body).write();
	res.redirect('/users')
});


app.get('/users/:id',(req, res)=>{
	var id = req.params.id;

	var user = db.get('users').find({id: id}).value();
	res.render('users/view',{
		user: user
	});
});

app.listen(port, ()=>{console.log('server listen on port ' + port)});