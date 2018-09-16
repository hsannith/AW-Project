var express=require('express');
var app=express();

/*app.get('/',function(req,res){
	res.send('hitesh');
});*/
var morgan=require('morgan');
app.use(morgan('dev'));
var mongoose=require('mongoose');

var bodyParser=require('body-parser');
var port=process.env.PORT || 8080;
var router=express.Router();
var appRoutes=require('./app/routes/api')(router);
var path= require('path');

//middle ware --order is very important
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));
app.use('/api',appRoutes);


mongoose.connect('mongodb://localhost:27017/hiteshdb',function(err){
	if(err)
	{
		console.log('not connected to database');
	}
	else
	{
		console.log('connected to db');
	}
});

/*app.get('/home',function(req,res){
	res.send('hello from home');
});*/




app.get('*',function(req,res){
	res.sendFile(path.join(__dirname+'/public/app/views/index.html'));
})

app.listen(port,function(){
	console.log('running the server!!!!!'+port);
});