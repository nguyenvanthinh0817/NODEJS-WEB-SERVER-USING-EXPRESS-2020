var express = require('express');
var app = express();
var port = 3000;

app.set('view engine', 'ejs');
app.set('views', './views');



app.get('/', (req, res)=>{
	res.render('index');
});


app.get('/users',function(req, res){
	res.render('users/index',{
		users:[
			{id: 1, name: 'Thinh'},
			{id: 2, name: 'Chung'}
		]
	});
});









app.listen(port, ()=>{console.log('server listen on port ' + port)});