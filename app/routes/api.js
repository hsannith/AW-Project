
var User=require('../models/user');
var jwt=require('jsonwebtoken');

var secret='hitesh';

module.exports=function(router){


router.post('/users',function(req,res)
{
		//res.send('testing ');

		//http://localhost:8080/api/users
		//USER REGISTRATION ROUTE
		var user=new User();
		user.username=req.body.username;
		user.password=req.body.password;
		user.email=req.body.email;
		user.firstname=req.body.firstname;
		user.lastname=req.body.lastname;
		user.contact=req.body.contact;
		//user.upvotes=0;

		var d=new Date();
		var n = d.toDateString()+" "+d.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' });
		n=n.substr(0,25);
		// var n = $filter('date')(new Date(), 'medium');
		user.lastlogin = [];

		if(req.body.username==null || req.body.username=='' || req.body.password==''|| req.body.password==null || req.body.email=='' || req.body.email==null
	 || req.body.firstname==null || req.body.firstname=='' || req.body.lastname==null || req.body.lastname==''|| req.body.contact==null || req.body.contact==''){
		   
		   res.json({success:false,message:'Please fill all the fields'});

		} else{
		user.save(function(err){
			if(err)  res.json({success:false,message:'username or email already exists'});
			else
				res.json({success:true,message:'user is registered'});
				
				                    });
				           }
		});
		
		//USER LOGIN ROUTE
		//http://localhost:8080/api/authenticate
 router.post('/authenticate', function(req, res) {
        var loginUser = (req.body.username).toLowerCase(); // Ensure username is checked in lowercase against database
        User.findOne({ username: loginUser }).select('email username password lastlogin firstname lastname contact active').exec(function(err, user) {
            if (err) {
              throw err;
            } 
                // Check if user is found in the database (based on username)           
                if (!user) {
                    res.json({ success: false, message: 'Username not found' }); // Username not found in database
                } else if (user) {
                    // Check if user does exist, then compare password provided by user
                    if (!req.body.password) {
                        res.json({ success: false, message: 'No password provided' }); // Password was not provided
                    } else {
                        //var validPassword = user.comparePassword(req.body.password); // Check if password matches password provided by user 
                        if (!(user.password===req.body.password)) {
                            res.json({ success: false, message: 'Could not authenticate password' }); // Password does not match password in database
                        } else  {
                        	//user.lastlogin.add(new Date());
							//Users.save(user);
							
                        	var d=new Date();
							var n = d.toDateString()+" "+d.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' });
							n=n.substr(0,25);
							//User.findOneAndUpdate({username: loginUser }, { $push:{ lastlogin : n}});
							user.lastlogin.push(n);
							user.save();

                        	var token=jwt.sign({ username: user.username ,email:user.email, lastlogin: user.lastlogin,firstname:user.firstname,lastname: user.lastname,contact: user.contact}, secret, { expiresIn: '24h' });
                            res.json({ success: true, message: 'User authenticated',token: token}); // Account is not activated 
                        } 
                    }
                }
            
        });
    });



	// router.post('/upvotes',function(req,res){
	// 	var loginUser = (req.body.username).toLowerCase();
	// 	res.send(loginUser);
	// 	console.log(loginuser+"   api");
	// 	User.findOne({ username: loginUser }).select('email username password lastlogin upvotes active').exec(function(err, user) {
		
	// 	if(user)
	// 	{

	// 		user.upvotes=user.upvotes+req.body.upvotes;
	// 		user.save();
	// 		res.json({success:true ,message :'up voted'});
	// 	}
		
	// 	});
	//  });

	/*	router.post('/loginhist',function(req,res){

		var username=req.body.username;
		console.log('hitesh');
		res.send('hitesh');
	 });   */


		 router.use(function(req,res,next){

		 	var token=req.body.token || req.body.query || req.headers['x-access-token'];

		 	if(token)
		 	{
		 		jwt.verify(token,secret,function(err,decoded){
		 			if(err) 	
		 				{
		 					res.json({ success:false ,message:'Token invalid'});
		 				}
		 				else
		 				{
		 					req.decoded=decoded;
		 					next();
		 				}

		 		});
		 	}
		 	else
		 	{
		 		res.json({success:false ,message :'no token provided'});
		 	}
		 });

		 router.post('/me',function(req,res){
		 	res.send(req.decoded);
		 });



		

return router;
}



