
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

if(req.body.username==null || req.body.username=='' || req.body.password==''|| req.body.password==null || req.body.email=='' || req.body.email==null){
   
   res.json({success:false,message:'Please fill all the fields'});

} else{
user.save(function(err){
	if(err)  res.json({success:false,message:'username or email already exists'});
	else
		res.json({success:true,message:'user i{s registered'});
		
		                    });
		           }
		});
		
		//USER LOGIN ROUTE
		//http://localhost:8080/api/authenticate
		 router.post('/authenticate', function(req, res) {
        var loginUser = (req.body.username).toLowerCase(); // Ensure username is checked in lowercase against database
        User.findOne({ username: loginUser }).select('email username password active').exec(function(err, user) {
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
                        var validPassword = user.comparePassword(req.body.password); // Check if password matches password provided by user 
                        if (!validPassword) {
                            res.json({ success: false, message: 'Could not authenticate password' }); // Password does not match password in database
                        } else  {

                        	var token=jwt.sign({ username: user.username ,email:user.email }, secret, { expiresIn: '24h' });
                            res.json({ success: true, message: 'User authenticated',token: token}); // Account is not activated 
                        } 
                    }
                }
            
        });
    });



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



