var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded



var users = [
			{id: 1, name: 'Thinh'},
			{id: 2, name: 'Chung'}
];



app.get('/', (req, res)=>{
	res.render('index');
});




app.get('/users',function(req, res){
	res.render('users/index',{
		users:users
	});
});



app.get('/users/search',(req, res)=>{
	var q = req.query.q;
	var matchdUsers = users.filter((user)=>{
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
	users.push(req.body);
	res.redirect('/users')
});




app.listen(port, ()=>{console.log('server listen on port ' + port)});