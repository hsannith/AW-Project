//console.log('testing user controller');


angular.module('userControllers',[])


.controller('onRegister',function($http,$location,$timeout){

var app=this;

    this.registerUser=function(data)
    {
        app.errorMessage=false;
        // console.log(this.data);

          $http.post('/api/users',this.data).then(function(responsedata){
          	console.log(responsedata.data.message);
          	console.log(responsedata.data.success);

           if(responsedata.data.success)
           {
                app.successMessage=responsedata.data.message;
                  
                $timeout(function() {
                	 $location.path('/login');
                }, 2000);

               
           }
           else
           {
                app.errorMessage=responsedata.data.message;
           }


          });
    };

});