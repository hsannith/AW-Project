var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var bcrypt=require('bcrypt-nodejs');

var userstable=new Schema({
	username:{type:String,unique:true,required:true},
	password:{type:String,required:true},
	email:{type:String,unique:true,required:true}


	});
userstable.pre('save',function(next){
	var user=this;
	bcrypt.hash(user.password,null,null,function(err,hash){
if(err) return next(err);
		user.password=hash;
		next();
	});
	
});


bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
});



// Method to compare passwords in API (when user logs in) 
userstable.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password); // Returns true if password matches, false if doesn't
};

module.exports=mongoose.model('user',userstable);