//console.log('testting mainctrl');

angular.module('mainControl',['authService'])


.controller('mainCtrl',function(Auth,$timeout,$location,$http,$rootScope){
	//console.log('testing main control');

	var app=this;



	$rootScope.$on('$routeChangeStart',function(){

		if(Auth.isLoggedIn())
  		{
  		//console.log('user is logged in');

  		app.LoggedIn=true;

  		Auth.getUser().then(function(data){
  		//console.log(data.data.username);

		 /* $http.post('/api/loginhist',data.data).then(function(data){

		  });   */


		  console.log('return data');
		  console.log(data);
  		  app.username=data.data.username;
		  app.usermail=data.data.email;
		  app.lastlogin=data.data.lastlogin;
		  app.firstname=data.data.firstname;
		  app.lastname=data.data.lastname;
		  app.contact=data.data.contact;
  		
  		});
  		}
  		else
  		{
  		//console.log('user is not logged in');
  		app.username="";
  		app.LoggedIn=false;
  		}

	});

  

    this.dologin=function(logindata)
    {
        app.errorMessage=false;
        // console.log(this.data);
       // console.log('hitesh');

          Auth.login(app.logindata).then(function(responsedata){
          //	console.log(responsedata.data.message);
          //	console.log(responsedata.data.success);

           if(responsedata.data.success)
           {
                app.successMessage=responsedata.data.message;
                  
                

                $timeout(function() {
                	 $location.path('/home');
                	 app.logindata="";
                	app.successMessage=false;
                }, 2000);

               
           }
           else
           {
                app.errorMessage=responsedata.data.message;
           }


          });
    };

    this.logout=function(){
    	Auth.logout();
    	$location.path('/logout');
    	$timeout(function() {

    		$location.path('/login');

    	},1000);
    };

});




