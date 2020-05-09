var express = require('express');
var app = express();
var port = 3000;

app.set('view engine', 'ejs');
app.set('views', './views');

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
		users:matchdUsers,
		q
	});
});






app.listen(port, ()=>{console.log('server listen on port ' + port)});